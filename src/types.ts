export interface PYQQuestion {
  id: string;
  year: string; // "2026"
  paperId: string; // e.g. "2026-paper-a"
  paperName: string; // e.g. "2026 Paper A"
  paperSubject: string; // e.g. "87 Computer Science & Applications"
  testDate: string; // e.g. "22/06/2026"
  testTime?: string; // e.g. "3:00 PM - 6:00 PM"
  questionNumber: string; // e.g. "Q.18" or "Q18"
  questionNumInt: number; // 18
  questionText: string; // Complete original question with List I/II if applicable
  passageText?: string; // Comprehension passage or DI data context
  options: string[]; // Options list [Option 1, Option 2, Option 3, Option 4]
  questionId?: string; // NTA Question ID, e.g. "55125118951"
  optionIds?: string[]; // NTA Option IDs
  chosenOption?: string; // Chosen option e.g. "2"
  correctOption?: string; // Correct Answer e.g. "2"
  unitNumber: number; // 1 to 10
  unitTitle: string; // "Unit 1 – Teaching Aptitude"
  topic: string; // "Teaching"
  subtopic: string; // "Levels of Teaching"
  status: "classified" | "needs_review";
  reviewReason?: string;
  userNotes?: string;
  createdAt?: string;
}

export interface SyllabusTopic {
  name: string;
  subtopics: string[];
}

export interface SyllabusUnit {
  unitNumber: number;
  unitTitle: string;
  shortName: string;
  description: string;
  topics: SyllabusTopic[];
}

export interface PaperInfo {
  id: string;
  name: string;
  year: string;
  subject: string;
  testDate: string;
  testTime: string;
  totalQuestions: number;
  classifiedCount: number;
  needsReviewCount: number;
  uploadedAt: string;
}

export interface FilterState {
  paperId: string; // "all" or specific paper ID
  unitNumber: number | null; // null for all units
  topic: string | null;
  subtopic: string | null;
  searchQuery: string;
  reviewStatus: "all" | "classified" | "needs_review";
}
