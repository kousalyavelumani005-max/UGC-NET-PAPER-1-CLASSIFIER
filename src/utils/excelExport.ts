import * as XLSX from "xlsx";
import { PYQQuestion } from "../types";

export function exportQuestionsToExcel(questions: PYQQuestion[], filenamePrefix = "UGC_NET_2026_Paper1_Classified_PYQs") {
  // Map questions into a clean, flat table format
  const rows = questions.map((q, index) => {
    return {
      "S.No.": index + 1,
      "Unit No.": q.unitNumber,
      "Unit Name": q.unitTitle,
      "Topic": q.topic,
      "Subtopic": q.subtopic,
      "Paper / Set": q.paperName,
      "Subject": q.paperSubject,
      "Exam Date": q.testDate,
      "Exam Shift": q.testTime || "",
      "Question No.": q.questionNumber,
      "NTA Question ID": q.questionId || "",
      "Passage / Context": q.passageText || "",
      "Question Text": q.questionText,
      "Option 1": q.options[0] || "",
      "Option 2": q.options[1] || "",
      "Option 3": q.options[2] || "",
      "Option 4": q.options[3] || "",
      "Correct Option": q.correctOption || "",
      "Candidate Option": q.chosenOption || "",
      "Status": q.status === "needs_review" ? "Needs Review" : "Classified",
      "Review Notes": q.reviewReason || q.userNotes || "",
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Set column widths for readability
  worksheet["!cols"] = [
    { wch: 6 },  // S.No
    { wch: 8 },  // Unit No
    { wch: 25 }, // Unit Name
    { wch: 28 }, // Topic
    { wch: 35 }, // Subtopic
    { wch: 18 }, // Paper/Set
    { wch: 20 }, // Subject
    { wch: 12 }, // Date
    { wch: 18 }, // Shift
    { wch: 12 }, // Q.No
    { wch: 15 }, // Q ID
    { wch: 30 }, // Passage
    { wch: 50 }, // Question Text
    { wch: 25 }, // Opt 1
    { wch: 25 }, // Opt 2
    { wch: 25 }, // Opt 3
    { wch: 25 }, // Opt 4
    { wch: 14 }, // Correct Opt
    { wch: 15 }, // Candidate Opt
    { wch: 14 }, // Status
    { wch: 20 }, // Notes
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Classified PYQs");

  // Generate date timestamp
  const dateStr = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, `${filenamePrefix}_${dateStr}.xlsx`);
}
