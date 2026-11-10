import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

// Lazy-load pdf-parse
async function parsePdfBuffer(buffer: Buffer): Promise<string> {
  try {
    const pdfParseModule = await import("pdf-parse");
    const pdfParse = (pdfParseModule as any).default || pdfParseModule;
    const data = await pdfParse(buffer);
    return data.text || "";
  } catch (err) {
    console.warn("pdf-parse extraction fallback notice:", err);
    return "";
  }
}

// Lazy initialization for Google GenAI
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const UGC_NET_SYSTEM_PROMPT = `You are an expert UGC NET Paper 1 exam analyst, parser, and syllabus classifier.
Your task is to thoroughly analyze the uploaded UGC NET 2026 Paper 1 (General Paper on Teaching and Research Aptitude) PDF document and perform two critical steps:

STEP 1: AUTOMATIC DOCUMENT METADATA EXTRACTION
Inspect the header, title, exam details, watermarks, or candidate response sheet metadata inside the document to automatically extract:
- Exam Year: "2026" (or detected year)
- Paper Title / Name: e.g. "2026 Paper - 08 Commerce" or infer from filename if not stated
- Subject Name & Code: e.g. "87 Computer Science", "08 Commerce", "01 Economics", "02 Political Science", or "General Paper 1"
- Shift / Timing: e.g. "Shift 1 (9:00 AM - 12:00 PM)", "Shift 2 (3:00 PM - 6:00 PM)", "Morning", "Evening"
- Set / Booklet Code: e.g. "Set A", "Set 1", etc.
- Exam Date: e.g. "25/06/2026" or detected date
*NOTE: If any of these fields are not explicitly stated in the document, DO NOT stop or fail. Gracefully infer from the filename or generate a clean identifier like "2026 Paper <Filename>". Never leave paperName blank.*

STEP 2: QUESTION EXTRACTION & SYLLABUS CLASSIFICATION
Extract ALL General Paper 1 questions from the document (usually Question 1 to Question 50). Skip any specialized Paper 2 subject questions (Q51-150) if present.

For each question:
1. Question Number: e.g. "Q.1", "Q.2", "Q18", "1", "2"
2. Question Text: Complete, unabridged question text including any Statements (Statement I / Statement II), List I & List II (Match the Following), Assertion-Reason (Assertion A, Reason R), or tabular data.
3. Passage/Context: If part of a Reading Comprehension (Unit 3) passage or Data Interpretation (Unit 7) table/chart, extract the passage text or table data.
4. Options: Array of all available choices (e.g. ["(1) Option text", "(2) Option text", "(3) Option text", "(4) Option text"] or ["(A)...", "(B)...", "(C)...", "(D)..."]).
5. Question ID: NTA Question ID if visible in the response sheet (e.g. "55125118951").
6. Chosen/Given Option: Chosen option if marked on response sheet (e.g. "1", "2", "3", "4").
7. Correct Option: Correct answer key if indicated in the document.

Map each question to the exact 10 Official UGC NET Paper 1 Units:
- Unit 1: Teaching Aptitude (Topics: Concept & Objectives, Levels of Teaching [Memory, Understanding, Reflective], Learner's Characteristics, Factors Affecting Teaching, Methods of Teaching [Teacher vs Learner Centred, SWAYAM, MOOCs], Teaching Support System [Traditional/ICT], Evaluation Systems [CBCS, Computer Based])
- Unit 2: Research Aptitude (Topics: Research Meaning & Types, Positivism & Post-Positivist Approach, Methods of Research [Experimental, Descriptive, Historical, Qualitative, Quantitative], Steps of Research, Thesis & Article Writing, ICT in Research, Research Ethics)
- Unit 3: Comprehension (Topics: Reading Comprehension Passages & Question Analysis)
- Unit 4: Communication (Topics: Communication Meaning & Types, Effective Communication [Verbal/Non-verbal, Inter-Cultural, Classroom], Barriers to Communication, Mass-Media and Society)
- Unit 5: Mathematical Reasoning and Aptitude (Topics: Types of Reasoning, Number Series, Letter Series, Codes and Relationships, Mathematical Aptitude [Fraction, Time & Distance, Ratio & Proportion, Percentage, Profit & Loss, Interest, Discount, Averages])
- Unit 6: Logical Reasoning (Topics: Structure of Arguments, Categorical Propositions, Mood and Figure, Formal & Informal Fallacies, Connotations & Denotations, Classical Square of Opposition, Deductive vs Inductive Reasoning, Analogies, Venn Diagrams, Indian Logic / Means of Knowledge, Pramanas [Pratyaksha, Anumana, Upamana, Shabda, Arthapatti, Anupalabddhi], Vyapti & Hetvabhasas)
- Unit 7: Data Interpretation (Topics: Sources & Classification of Data, Quantitative vs Qualitative Data, Graphical Representation [Table, Bar, Pie, Histogram, Line], Data Interpretation & Calculation, Data and Governance)
- Unit 8: Information and Communication Technology (ICT) (Topics: ICT Abbreviations & Terminology, Basics of Internet & Intranet & Email, Audio/Video Conferencing, Digital Initiatives in Higher Education, ICT and Governance / Computer Memory & Architecture)
- Unit 9: People, Development and Environment (Topics: MDGs and SDGs, Anthropogenic Activities & Environment, Environmental Issues [Air, Water, Soil, Noise, Waste, Climate Change], Pollutants & Human Health, Natural & Energy Resources [Solar, Wind, Hydro, Biomass, Nuclear], Natural Hazards & Disasters, Environmental Protection Act 1986 & International Agreements [Montreal, Kyoto, Paris, Rio, ISA])
- Unit 10: Higher Education System (Topics: Ancient Indian Higher Learning, Post-Independence Evolution, Conventional & Non-Conventional Learning, Professional / Technical / Skill Based Education, Value & Environmental Education, Policies, Governance & Administration [NEP 2020, UGC, Higher Education Commissions])

Classify with high precision into:
- unitNumber: integer 1 to 10
- unitName: full unit title (e.g. "Unit 1 – Teaching Aptitude")
- topic: specific topic name matching syllabus
- subtopic: fine-grained subtopic name matching syllabus
- explanation: 1-sentence pedagogical classification justification
- needsReview: boolean (false if confident, true if ambiguous)
`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    paperMetadata: {
      type: Type.OBJECT,
      properties: {
        paperName: { type: Type.STRING },
        subject: { type: Type.STRING },
        testDate: { type: Type.STRING },
        shift: { type: Type.STRING },
        setCode: { type: Type.STRING },
        year: { type: Type.STRING },
        detectedInfoSummary: { type: Type.STRING },
      },
      required: ["paperName", "subject", "testDate", "shift"],
    },
    totalQuestionsDetected: { type: Type.INTEGER },
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          questionNumber: { type: Type.STRING },
          questionText: { type: Type.STRING },
          passageText: { type: Type.STRING },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          questionId: { type: Type.STRING },
          chosenOption: { type: Type.STRING },
          correctOption: { type: Type.STRING },
          unitNumber: { type: Type.INTEGER },
          unitName: { type: Type.STRING },
          topic: { type: Type.STRING },
          subtopic: { type: Type.STRING },
          explanation: { type: Type.STRING },
          needsReview: { type: Type.BOOLEAN },
        },
        required: [
          "questionNumber",
          "questionText",
          "unitNumber",
          "unitName",
          "topic",
          "subtopic",
        ],
      },
    },
  },
  required: ["paperMetadata", "questions", "totalQuestionsDetected"],
};

// Retry delays matching user spec: ~2s, ~5s, ~10s
const RETRY_DELAYS = [2000, 5000, 10000];
const CANDIDATE_MODELS = [
  "gemini-2.5-flash",
  "gemini-3.7-flash",
  "gemini-1.5-flash",
];

function isRetryableGeminiError(err: any): boolean {
  if (!err) return false;
  const msg = (err.message || err.statusText || String(err)).toLowerCase();
  const status = Number(err.status || err.statusCode || err.code || err.response?.status);

  return (
    status === 503 ||
    status === 429 ||
    status === 500 ||
    status === 502 ||
    status === 504 ||
    msg.includes("503") ||
    msg.includes("unavailable") ||
    msg.includes("high demand") ||
    msg.includes("overloaded") ||
    msg.includes("resource_exhausted") ||
    msg.includes("resource has been exhausted") ||
    msg.includes("rate limit") ||
    msg.includes("quota") ||
    msg.includes("temporarily") ||
    msg.includes("econnreset") ||
    msg.includes("etimedout") ||
    msg.includes("fetch failed") ||
    msg.includes("network")
  );
}

// Executes generateContent with automatic retry (exponential backoff: 2s, 5s, 10s) and fallback model support
async function callGeminiWithRetryAndFallback(
  ai: GoogleGenAI,
  contents: any[],
  systemInstruction: string,
  responseSchema: any
): Promise<any> {
  let lastError: any = null;

  for (let mIdx = 0; mIdx < CANDIDATE_MODELS.length; mIdx++) {
    const model = CANDIDATE_MODELS[mIdx];
    console.log(`[Gemini Engine] Processing paper with model candidate: ${model}`);

    for (let attempt = 0; attempt <= 3; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema,
          },
        });

        const text = response.text?.trim();
        if (!text) {
          throw new Error("Empty response returned by Gemini model");
        }

        const parsed = JSON.parse(text);
        console.log(`[Gemini Engine] Successfully classified paper with ${model}`);
        return parsed;
      } catch (err: any) {
        lastError = err;
        console.warn(`[Gemini Engine] Attempt ${attempt + 1} with ${model} encountered:`, err.message || err);

        if (!isRetryableGeminiError(err)) {
          throw err;
        }

        if (attempt < 3) {
          const delay = RETRY_DELAYS[attempt] || 5000;
          console.log(`[Gemini Engine] 503 / High demand detected. Retrying in ${delay / 1000}s...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          console.log(`[Gemini Engine] Retries exhausted on ${model}. Switching to fallback model...`);
        }
      }
    }
  }

  throw lastError || new Error("503 UNAVAILABLE: The model is currently experiencing high demand after all retries and fallback models.");
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Direct PDF Ingestion & Classification Endpoint
  app.post("/api/ai/classify-pdf", async (req, res) => {
    try {
      const { pdfBase64, filename } = req.body;

      if (!pdfBase64 || typeof pdfBase64 !== "string") {
        return res.status(400).json({ error: "Missing or invalid PDF base64 payload" });
      }

      const cleanFilename = (filename || "UGC_NET_2026_Paper.pdf").replace(/[<>:"/\\|?*]+/g, "");

      // Clean base64 string
      const rawBase64 = pdfBase64.replace(/^data:application\/pdf;base64,/, "").trim();
      const pdfBuffer = Buffer.from(rawBase64, "base64");

      // Extract text with pdf-parse as contextual support
      const extractedPdfText = await parsePdfBuffer(pdfBuffer);

      const ai = getAIClient();
      if (!ai) {
        return res.status(503).json({
          error: "GEMINI_API_KEY is not configured on the server.",
          retryable: false,
        });
      }

      // Build multimodal contents for Gemini: Native PDF inlineData + any extracted text assistance
      const contentsPayload: any[] = [
        {
          inlineData: {
            mimeType: "application/pdf",
            data: rawBase64,
          },
        },
        {
          text: `Please read this uploaded UGC NET Paper 1 PDF document (Filename: "${cleanFilename}").
1. Automatically read the paper details (Subject, Shift, Date, Set, Exam title) directly from inside the document. If missing, generate a clean title from the filename "${cleanFilename}".
2. Read every single Question in Paper 1 (General Paper on Teaching and Research Aptitude). Extract question numbers, complete question statements, options, IDs, and passages.
3. Classify every question into Unit (1-10) → Topic → Subtopic based on the official UGC NET Paper 1 syllabus framework.
${extractedPdfText ? `\n[Extracted Text Hint]:\n${extractedPdfText.slice(0, 40000)}` : ""}`,
        },
      ];

      const parsedData = await callGeminiWithRetryAndFallback(
        ai,
        contentsPayload,
        UGC_NET_SYSTEM_PROMPT,
        RESPONSE_SCHEMA
      );

      res.json({ success: true, data: parsedData });
    } catch (err: any) {
      console.error("AI PDF classification error:", err);
      const isRetryable = isRetryableGeminiError(err);
      res.status(isRetryable ? 503 : 500).json({
        success: false,
        retryable: isRetryable,
        error: isRetryable
          ? "503 UNAVAILABLE — The model is currently experiencing high demand. Please try again."
          : "Failed to process and classify PDF: " + (err.message || String(err)),
      });
    }
  });

  // Batch PDF Ingestion Endpoint (processes files safely & sequentially)
  app.post("/api/ai/classify-pdf-batch", async (req, res) => {
    try {
      const { files } = req.body; // Array of { filename: string, pdfBase64: string }

      if (!Array.isArray(files) || files.length === 0) {
        return res.status(400).json({ error: "Missing or invalid files array" });
      }

      const ai = getAIClient();
      if (!ai) {
        return res.status(503).json({
          error: "GEMINI_API_KEY is not configured on the server.",
          retryable: false,
        });
      }

      const results = [];

      for (let i = 0; i < files.length; i++) {
        const fileItem = files[i];
        const cleanFilename = (fileItem.filename || `UGC_NET_2026_Paper_${i + 1}.pdf`).replace(/[<>:"/\\|?*]+/g, "");
        const rawBase64 = fileItem.pdfBase64.replace(/^data:application\/pdf;base64,/, "").trim();
        const pdfBuffer = Buffer.from(rawBase64, "base64");

        const extractedPdfText = await parsePdfBuffer(pdfBuffer);

        try {
          const contentsPayload = [
            {
              inlineData: {
                mimeType: "application/pdf",
                data: rawBase64,
              },
            },
            {
              text: `Please read this uploaded UGC NET Paper 1 PDF document (Filename: "${cleanFilename}").
1. Automatically read the paper details (Subject, Shift, Date, Set, Exam title) directly from inside the document. If missing, generate a clean title from the filename "${cleanFilename}".
2. Read every single Question in Paper 1 (General Paper on Teaching and Research Aptitude). Extract question numbers, complete question statements, options, IDs, and passages.
3. Classify every question into Unit (1-10) → Topic → Subtopic based on the official UGC NET Paper 1 syllabus framework.
${extractedPdfText ? `\n[Extracted Text Hint]:\n${extractedPdfText.slice(0, 40000)}` : ""}`,
            },
          ];

          const parsedData = await callGeminiWithRetryAndFallback(
            ai,
            contentsPayload,
            UGC_NET_SYSTEM_PROMPT,
            RESPONSE_SCHEMA
          );

          results.push({
            filename: cleanFilename,
            success: true,
            data: parsedData,
          });
        } catch (fileErr: any) {
          console.error(`Error processing file ${cleanFilename}:`, fileErr);
          const isRetryable = isRetryableGeminiError(fileErr);
          results.push({
            filename: cleanFilename,
            success: false,
            retryable: isRetryable,
            error: isRetryable
              ? "503 UNAVAILABLE — The model is currently experiencing high demand."
              : fileErr.message || String(fileErr),
          });
        }
      }

      res.json({ success: true, results });
    } catch (err: any) {
      console.error("AI Batch PDF classification error:", err);
      res.status(500).json({
        error: "Failed to process batch PDFs: " + (err.message || String(err)),
      });
    }
  });

  // Legacy Text-based Endpoint (kept for backwards compatibility)
  app.post("/api/ai/classify-paper", async (req, res) => {
    try {
      const { text, paperTitle, subject, testDate, shift } = req.body;

      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Missing or invalid paper text" });
      }

      const ai = getAIClient();
      if (!ai) {
        return res.status(503).json({
          error: "GEMINI_API_KEY not configured on server",
          retryable: false,
        });
      }

      const parsedData = await callGeminiWithRetryAndFallback(
        ai,
        [
          {
            text: `Please parse and classify the following 2026 Paper 1 text from paper "${paperTitle || "2026 Question Paper"}" (Subject: ${subject || "General Paper"}, Date: ${testDate || "2026"}, Shift: ${shift || "Morning"}):\n\n${text.slice(0, 100000)}`,
          },
        ],
        UGC_NET_SYSTEM_PROMPT,
        RESPONSE_SCHEMA
      );

      res.json({ success: true, data: parsedData });
    } catch (err: any) {
      console.error("AI classification error:", err);
      const isRetryable = isRetryableGeminiError(err);
      res.status(isRetryable ? 503 : 500).json({
        success: false,
        retryable: isRetryable,
        error: isRetryable
          ? "503 UNAVAILABLE — The model is currently experiencing high demand. Please try again."
          : "Failed to classify paper using AI: " + (err.message || String(err)),
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`UGC NET Paper 1 PYQ Server running on http://localhost:${PORT}`);
  });
}

startServer();
