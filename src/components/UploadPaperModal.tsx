import React, { useState, useRef } from "react";
import { 
  X, 
  Upload, 
  FileText, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2, 
  Trash2,
  FileCheck,
  HelpCircle,
  Layers,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { PYQQuestion } from "../types";

interface SelectedPDF {
  file?: File;
  name: string;
  size: number;
  base64: string;
  status: "ready" | "processing" | "completed" | "error";
  error?: string;
  detectedInfo?: {
    paperName?: string;
    subject?: string;
    testDate?: string;
    shift?: string;
    questionCount?: number;
  };
}

interface UploadPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaperUploaded: (
    newQuestions: PYQQuestion[],
    paperMeta: { id: string; name: string; subject: string; date: string; time: string }
  ) => void;
  existingQuestions: PYQQuestion[];
}

// Client retry delays: ~2s, ~5s, ~10s
const CLIENT_RETRY_DELAYS = [2000, 5000, 10000];

export const UploadPaperModal: React.FC<UploadPaperModalProps> = ({
  isOpen,
  onClose,
  onPaperUploaded,
  existingQuestions,
}) => {
  const [selectedPdfs, setSelectedPdfs] = useState<SelectedPDF[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentProcessingIndex, setCurrentProcessingIndex] = useState<number>(-1);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [successSummary, setSuccessSummary] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Convert File to base64 string
  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // Handle file selection from input
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    await processSelectedFiles(Array.from(files));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Process dropped or selected files
  const processSelectedFiles = async (files: File[]) => {
    setGlobalError(null);
    setSuccessSummary(null);

    const pdfFiles = files.filter(
      (f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")
    );

    if (pdfFiles.length === 0) {
      setGlobalError("Please select valid PDF question paper files (.pdf).");
      return;
    }

    const newPdfs: SelectedPDF[] = [];
    for (const file of pdfFiles) {
      try {
        const base64 = await readFileAsBase64(file);
        newPdfs.push({
          file,
          name: file.name,
          size: file.size,
          base64,
          status: "ready",
        });
      } catch (err) {
        console.error("Error reading file:", file.name, err);
      }
    }

    setSelectedPdfs((prev) => {
      const combined = [...prev, ...newPdfs];
      // Keep up to 5 files
      return combined.slice(0, 5);
    });
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processSelectedFiles(Array.from(e.dataTransfer.files));
    }
  };

  // Remove a selected PDF
  const handleRemovePdf = (index: number) => {
    setSelectedPdfs((prev) => prev.filter((_, i) => i !== index));
  };

  // Load Built-in 2026 Sample PDFs (for quick testing without uploading a local file)
  const handleLoadSamplePdfs = () => {
    setGlobalError(null);
    setSuccessSummary(null);

    // Create realistic PDF representations for 2026 UGC NET papers
    const sample1Content = `%PDF-1.4
1 0 obj << /Title (UGC NET 2026 Paper 1 - 02 Political Science) /Subject (02 Political Science) /CreationDate (D:20260628090000) >> endobj
2 0 obj << /Length 500 >> stream
UGC NET JUNE 2026 EXAMINATION
GENERAL PAPER ON TEACHING & RESEARCH APTITUDE (PAPER-1)
Subject: 02 Political Science | Date: 28/06/2026 | Shift: Morning (9:00 AM - 12:00 PM)

Q.1 Which of the following is a key feature of the Reflective Level of Teaching (RLT)?
(1) Drill and rote memorization
(2) Problem solving and critical thinking
(3) Simple recall of facts
(4) Conditioning of habits
Correct Option: 2 | Question ID: 55125120261

Q.2 In a quantitative research design, when the researcher controls extraneous variables to determine cause and effect, which research method is being applied?
(1) Historical Research
(2) Experimental Research
(3) Ex-post Facto Research
(4) Ethnographic Research
Correct Option: 2 | Question ID: 55125120262

Q.3 Which of the following is an asynchronous communication tool used in higher education digital initiatives?
(1) Live Zoom Webinar
(2) Discussion Forum in SWAYAM
(3) Real-time audio conferencing
(4) Google Meet instant class
Correct Option: 2 | Question ID: 55125120263

Q.4 Find the next term in the series: 3, 7, 15, 31, 63, ?
(1) 95
(2) 127
(3) 128
(4) 144
Correct Option: 2 | Question ID: 55125120264

Q.5 In Indian Classical Logic (Nyaya), which pramana refers to knowledge derived through comparison and analogy?
(1) Pratyaksha
(2) Upamana
(3) Anumana
(4) Shabda
Correct Option: 2 | Question ID: 55125120265
endstream endobj
xref
0 3
0000000000 65535 f
0000000010 00000 n
0000000130 00000 n
trailer << /Root 1 0 R >>
%%EOF`;

    const sample2Content = `%PDF-1.4
1 0 obj << /Title (UGC NET 2026 Paper 1 - 06 History) /Subject (06 History) /CreationDate (D:20260627150000) >> endobj
2 0 obj << /Length 500 >> stream
UGC NET JUNE 2026 EXAMINATION
GENERAL PAPER ON TEACHING & RESEARCH APTITUDE (PAPER-1)
Subject: 06 History | Date: 27/06/2026 | Shift: Evening (3:00 PM - 6:00 PM)

Q.1 What is the primary purpose of Diagnostic Evaluation in a classroom setting?
(1) To certify students at the end of the academic term
(2) To discover the underlying learning difficulties and causes of persistent learning problems
(3) To assign grades and ranks
(4) To evaluate teacher effectiveness
Correct Option: 2 | Question ID: 55125120271

Q.2 Which of the following ancient Indian universities was renowned for its medical school and teachings of Charaka?
(1) Nalanda
(2) Takshashila
(3) Valabhi
(4) Vikramashila
Correct Option: 2 | Question ID: 55125120272

Q.3 Which international agreement directly focuses on the phase-out of ozone-depleting chlorofluorocarbons (CFCs)?
(1) Paris Climate Agreement
(2) Montreal Protocol
(3) Kyoto Protocol
(4) Rio Earth Summit
Correct Option: 2 | Question ID: 55125120273

Q.4 Convert binary 110101 to decimal equivalent:
(1) 51
(2) 53
(3) 55
(4) 57
Correct Option: 2 | Question ID: 55125120274

Q.5 The National Education Policy (NEP) 2020 recommends setting up of ABC for students. What does ABC stand for?
(1) Academic Bank of Credits
(2) Advanced Board of Curriculum
(3) Annual Benchmark of Certification
(4) Automated Bureau of Credentials
Correct Option: 1 | Question ID: 55125120275
endstream endobj
xref
0 3
0000000000 65535 f
0000000010 00000 n
0000000130 00000 n
trailer << /Root 1 0 R >>
%%EOF`;

    const sample1Base64 = "data:application/pdf;base64," + btoa(unescape(encodeURIComponent(sample1Content)));
    const sample2Base64 = "data:application/pdf;base64," + btoa(unescape(encodeURIComponent(sample2Content)));

    setSelectedPdfs([
      {
        name: "UGC_NET_2026_Paper1_Political_Science.pdf",
        size: sample1Content.length,
        base64: sample1Base64,
        status: "ready",
      },
      {
        name: "UGC_NET_2026_Paper1_History.pdf",
        size: sample2Content.length,
        base64: sample2Base64,
        status: "ready",
      },
    ]);
  };

  // Helper to call PDF classification API with automatic retry and exponential backoff on 503 / UNAVAILABLE
  const classifyPdfWithRetry = async (
    pdfBase64: string,
    filename: string,
    onRetryNotice: (msg: string) => void
  ): Promise<any> => {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= 3; attempt++) {
      try {
        const response = await fetch("/api/ai/classify-pdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pdfBase64,
            filename,
          }),
        });

        let resData: any = {};
        try {
          resData = await response.json();
        } catch (jsonErr) {
          resData = { error: `Server error HTTP ${response.status}` };
        }

        if (response.ok && resData.success && resData.data) {
          return resData.data;
        }

        // Check if 503 or retryable
        const isUnavailable =
          response.status === 503 ||
          response.status === 429 ||
          resData.retryable ||
          (resData.error &&
            (resData.error.includes("503") ||
              resData.error.includes("UNAVAILABLE") ||
              resData.error.includes("high demand") ||
              resData.error.includes("overloaded") ||
              resData.error.includes("resource")));

        if (isUnavailable && attempt < 3) {
          const delay = CLIENT_RETRY_DELAYS[attempt] || 5000;
          onRetryNotice(`Gemini is temporarily busy. Retrying automatically... (Attempt ${attempt + 1} of 3)`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        throw new Error(
          resData.error || `HTTP ${response.status}: Failed to process paper`
        );
      } catch (err: any) {
        lastError = err;
        const msg = (err.message || String(err)).toLowerCase();
        const isUnavailable =
          msg.includes("503") ||
          msg.includes("unavailable") ||
          msg.includes("high demand") ||
          msg.includes("fetch") ||
          msg.includes("network");

        if (isUnavailable && attempt < 3) {
          const delay = CLIENT_RETRY_DELAYS[attempt] || 5000;
          onRetryNotice(`Gemini is temporarily busy. Retrying automatically... (Attempt ${attempt + 1} of 3)`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          throw err;
        }
      }
    }

    throw lastError || new Error("Processing failed. Please try again.");
  };

  // Main Processing Handler: Safe, sequential processing of each PDF independently
  const handleProcessPapers = async (specificIndex?: number) => {
    if (selectedPdfs.length === 0) {
      setGlobalError("Please select or drop at least one PDF question paper.");
      return;
    }

    // Determine target indices: either specific item or all non-completed items
    const indicesToProcess: number[] = [];
    if (typeof specificIndex === "number") {
      indicesToProcess.push(specificIndex);
    } else {
      selectedPdfs.forEach((pdf, idx) => {
        if (pdf.status !== "completed") {
          indicesToProcess.push(idx);
        }
      });
    }

    if (indicesToProcess.length === 0) {
      // If all are already completed, just close or notify
      setSuccessSummary("All selected question papers have already been classified.");
      return;
    }

    setLoading(true);
    setGlobalError(null);
    setSuccessSummary(null);

    let totalImportedQuestions = 0;
    const addedPapersSummaries: string[] = [];
    let hasErrors = false;

    // Process each PDF independently in sequence (PDF 1 -> PDF 2 -> PDF 3)
    for (let step = 0; step < indicesToProcess.length; step++) {
      const idx = indicesToProcess[step];
      const pdfItem = selectedPdfs[idx];

      setCurrentProcessingIndex(idx);
      setStatusMessage(`Reading "${pdfItem.name}" and extracting Paper 1 metadata & questions...`);

      // Mark this PDF as processing
      setSelectedPdfs((prev) =>
        prev.map((item, i) =>
          i === idx ? { ...item, status: "processing", error: undefined } : item
        )
      );

      try {
        const data = await classifyPdfWithRetry(
          pdfItem.base64,
          pdfItem.name,
          (retryNotice) => {
            setStatusMessage(retryNotice);
          }
        );

        const paperMeta = data.paperMetadata || {};
        const extractedQuestions = data.questions || [];

        if (extractedQuestions.length === 0) {
          throw new Error(`No questions could be extracted from "${pdfItem.name}".`);
        }

        // Determine clean paper identifier
        const detectedYear = paperMeta.year || "2026";
        const detectedName = paperMeta.paperName || `${detectedYear} Paper - ${pdfItem.name.replace(/\.pdf$/i, "")}`;
        const detectedSubject = paperMeta.subject || "General Paper 1";
        const detectedDate = paperMeta.testDate || "2026";
        const detectedShift = paperMeta.shift || "Morning";

        const generatedPaperId = `${detectedYear}-paper-${Date.now().toString(36)}-${idx}`;

        // Format PYQQuestion objects
        const formattedQuestions: PYQQuestion[] = extractedQuestions.map((q: any, qIdx: number) => ({
          id: `${generatedPaperId}-Q${qIdx + 1}`,
          year: detectedYear,
          paperId: generatedPaperId,
          paperName: detectedName,
          paperSubject: detectedSubject,
          testDate: detectedDate,
          testTime: detectedShift,
          questionNumber: q.questionNumber || `Q.${qIdx + 1}`,
          questionNumInt: parseInt(String(q.questionNumber).replace(/\D/g, ""), 10) || qIdx + 1,
          questionText: q.questionText || "",
          passageText: q.passageText || undefined,
          options: Array.isArray(q.options) ? q.options : [],
          questionId: q.questionId || undefined,
          chosenOption: q.chosenOption || undefined,
          correctOption: q.correctOption || undefined,
          unitNumber: Number(q.unitNumber) >= 1 && Number(q.unitNumber) <= 10 ? Number(q.unitNumber) : 1,
          unitTitle: q.unitName || `Unit ${q.unitNumber || 1}`,
          topic: q.topic || "General Concepts",
          subtopic: q.subtopic || "General Analysis",
          status: q.needsReview ? "needs_review" : "classified",
          reviewReason: q.explanation || undefined,
          createdAt: new Date().toISOString(),
        }));

        // Commit to global questions state only after successful Gemini classification
        onPaperUploaded(formattedQuestions, {
          id: generatedPaperId,
          name: detectedName,
          subject: detectedSubject,
          date: detectedDate,
          time: detectedShift,
        });

        totalImportedQuestions += formattedQuestions.length;
        addedPapersSummaries.push(`${detectedName} (${formattedQuestions.length} questions)`);

        // Mark this PDF as completed
        setSelectedPdfs((prev) =>
          prev.map((item, i) =>
            i === idx
              ? {
                  ...item,
                  status: "completed",
                  error: undefined,
                  detectedInfo: {
                    paperName: detectedName,
                    subject: detectedSubject,
                    testDate: detectedDate,
                    shift: detectedShift,
                    questionCount: formattedQuestions.length,
                  },
                }
              : item
          )
        );
      } catch (err: any) {
        console.error(`Error processing ${pdfItem.name}:`, err);
        hasErrors = true;

        // Keep PDF in list, mark status as error with user-friendly retry message
        setSelectedPdfs((prev) =>
          prev.map((item, i) =>
            i === idx
              ? {
                  ...item,
                  status: "error",
                  error: "Processing failed. Please try again.",
                }
              : item
          )
        );
      }
    }

    setLoading(false);
    setCurrentProcessingIndex(-1);
    setStatusMessage("");

    if (totalImportedQuestions > 0 && !hasErrors) {
      setSuccessSummary(
        `Successfully extracted and classified ${totalImportedQuestions} questions from ${addedPapersSummaries.length} paper(s) into the Unit → Topic → Subtopic structure.`
      );
    } else if (hasErrors) {
      setGlobalError(
        "Processing failed for some papers due to temporary model demand. Click 'Retry Processing' below to retry without re-uploading."
      );
    }
  };

  const completedCount = selectedPdfs.filter((p) => p.status === "completed").length;
  const errorCount = selectedPdfs.filter((p) => p.status === "error").length;
  const readyCount = selectedPdfs.filter((p) => p.status === "ready").length;
  const pendingCount = errorCount + readyCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">
                Upload PDF Question Papers
              </h2>
              <p className="text-xs text-slate-300">
                Direct PDF upload • Automatic subject, shift, date & question classification
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Quick Preset helper button */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3.5 flex items-center justify-between flex-wrap gap-2.5">
            <div className="flex items-center gap-2 text-indigo-900 font-semibold text-xs">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Test with Built-in 2026 Sample PDFs:</span>
            </div>
            <button
              type="button"
              onClick={handleLoadSamplePdfs}
              disabled={loading}
              className="px-3 py-1.5 bg-white hover:bg-indigo-100 text-indigo-800 font-bold rounded-lg border border-indigo-200 text-xs transition-colors cursor-pointer shadow-xs disabled:opacity-50 flex items-center gap-1.5"
            >
              <span>+ Load 2 Sample 2026 PDFs</span>
            </button>
          </div>

          {/* Drag & Drop PDF Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !loading && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
              isDragging
                ? "border-indigo-600 bg-indigo-50/50 scale-[1.01]"
                : "border-slate-300 hover:border-indigo-400 bg-slate-50/60 hover:bg-slate-50"
            } ${loading ? "pointer-events-none opacity-60" : ""}`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-800">
                Click or Drag & Drop 2–3 PDF Question Papers here
              </p>
              <p className="text-xs text-slate-500 max-w-md">
                Gemini reads the PDF automatically and extracts Subject, Shift, Date, Set, and all Paper 1 questions without manual typing.
              </p>
              <div className="pt-2">
                <span className="px-3 py-1 text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 rounded-full shadow-2xs">
                  Supports .pdf files (Upload 2–3 at once)
                </span>
              </div>
            </div>
          </div>

          {/* Selected PDFs List */}
          {selectedPdfs.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600 font-semibold px-1">
                <span>Selected PDFs ({selectedPdfs.length})</span>
                <span className="text-[11px] text-slate-400">All data is preserved in memory</span>
              </div>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {selectedPdfs.map((pdf, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs transition-all ${
                      pdf.status === "completed"
                        ? "bg-emerald-50/70 border-emerald-200 text-emerald-900"
                        : pdf.status === "processing"
                        ? "bg-indigo-50/80 border-indigo-200 text-indigo-900 ring-2 ring-indigo-400/50"
                        : pdf.status === "error"
                        ? "bg-red-50/80 border-red-200 text-red-900"
                        : "bg-white border-slate-200 text-slate-800 shadow-2xs"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          pdf.status === "completed"
                            ? "bg-emerald-600 text-white"
                            : pdf.status === "processing"
                            ? "bg-indigo-600 text-white"
                            : pdf.status === "error"
                            ? "bg-red-600 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {pdf.status === "processing" ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : pdf.status === "completed" ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : pdf.status === "error" ? (
                          <AlertTriangle className="w-4 h-4" />
                        ) : (
                          <FileText className="w-4 h-4" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold truncate text-slate-900">
                          {pdf.name}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2 flex-wrap">
                          <span>{(pdf.size / 1024).toFixed(1)} KB</span>
                          {pdf.detectedInfo && (
                            <span className="font-semibold text-emerald-700">
                              • {pdf.detectedInfo.subject} ({pdf.detectedInfo.questionCount} Qs classified)
                            </span>
                          )}
                          {pdf.status === "error" && (
                            <span className="font-semibold text-red-700 bg-red-100/80 px-1.5 py-0.5 rounded text-[10px]">
                              Processing failed. Please try again.
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Individual Retry Button for failed item */}
                      {pdf.status === "error" && !loading && (
                        <button
                          type="button"
                          onClick={() => handleProcessPapers(idx)}
                          className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-800 font-bold rounded-md text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                          title="Retry processing this paper"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Retry</span>
                        </button>
                      )}

                      {!loading && (
                        <button
                          type="button"
                          onClick={() => handleRemovePdf(idx)}
                          className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors cursor-pointer shrink-0"
                          title="Remove file"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Loading Indicator with Automatic Retry Status */}
          {loading && (
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl space-y-2 text-center animate-in fade-in">
              <div className="flex items-center justify-center gap-2 text-indigo-900 font-bold text-sm">
                <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
                <span>Reading & Classifying PDF Question Papers...</span>
              </div>
              <p className="text-xs text-indigo-700 font-medium">{statusMessage}</p>
              <div className="w-full bg-indigo-200/50 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-indigo-600 h-1.5 transition-all duration-300 rounded-full"
                  style={{
                    width: `${
                      selectedPdfs.length > 0
                        ? (((currentProcessingIndex >= 0 ? currentProcessingIndex : 0) + 0.5) /
                            selectedPdfs.length) *
                          100
                        : 50
                    }%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Global Error Banner */}
          {globalError && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-800 flex items-start gap-2.5 text-xs">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong>Processing Notice:</strong> {globalError}
              </div>
            </div>
          )}

          {/* Success Summary */}
          {successSummary && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-start gap-2.5 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Classification Complete!</strong> {successSummary}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer / Action Button */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer"
          >
            {completedCount > 0 && pendingCount === 0 ? "Done & View Syllabus" : "Cancel"}
          </button>

          <button
            type="button"
            onClick={() => {
              if (completedCount > 0 && pendingCount === 0) {
                onClose();
              } else {
                handleProcessPapers();
              }
            }}
            disabled={loading || selectedPdfs.length === 0}
            className={`px-6 py-2.5 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
              errorCount > 0 && pendingCount > 0
                ? "bg-amber-600 hover:bg-amber-700 active:bg-amber-800"
                : completedCount > 0 && pendingCount === 0
                ? "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800"
                : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Reading & Classifying...</span>
              </>
            ) : errorCount > 0 && pendingCount > 0 ? (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>Retry Processing ({pendingCount} pending)</span>
              </>
            ) : completedCount > 0 && pendingCount === 0 ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Done & View Syllabus</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>PROCESS PAPERS ({selectedPdfs.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
