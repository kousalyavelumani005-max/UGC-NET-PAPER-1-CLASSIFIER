import React, { useState, useEffect, useMemo } from "react";
import { INITIAL_QUESTIONS, AVAILABLE_PAPERS } from "./data/initialData";
import { PYQQuestion, FilterState } from "./types";
import { Header } from "./components/Header";
import { SidebarNav } from "./components/SidebarNav";
import { FilterBar } from "./components/FilterBar";
import { HierarchicalQuestionView } from "./components/HierarchicalQuestionView";
import { TableView } from "./components/TableView";
import { UploadPaperModal } from "./components/UploadPaperModal";
import { EditQuestionModal } from "./components/EditQuestionModal";
import { PrintView } from "./components/PrintView";
import { exportQuestionsToExcel } from "./utils/excelExport";

const STORAGE_KEY_QUESTIONS_V2 = "ugc_net_2026_questions_v2";
const STORAGE_KEY_PAPERS_V2 = "ugc_net_2026_papers_v2";
const STORAGE_KEY_QUESTIONS_V1 = "ugc_net_2026_questions_v1";
const STORAGE_KEY_PAPERS_V1 = "ugc_net_2026_papers_v1";

function loadInitialQuestions(): PYQQuestion[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_QUESTIONS_V2);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Map baseline questions first (all 650 questions across 13 papers)
        const questionMap = new Map<string, PYQQuestion>();
        for (const q of INITIAL_QUESTIONS) {
          questionMap.set(q.id, { ...q });
        }
        // Merge user edits on baseline questions and newly uploaded custom papers
        const officialPaperIds = new Set(AVAILABLE_PAPERS.map((p) => p.id));
        for (const q of parsed) {
          if (!q || !q.id) continue;
          if (questionMap.has(q.id)) {
            questionMap.set(q.id, { ...questionMap.get(q.id)!, ...q });
          } else if (!officialPaperIds.has(q.paperId)) {
            // Custom paper added by user
            questionMap.set(q.id, q);
          }
        }
        return Array.from(questionMap.values());
      }
    }
  } catch (e) {
    console.error("Failed to load saved questions from localStorage:", e);
  }
  return INITIAL_QUESTIONS;
}

function loadInitialPapers(): { id: string; name: string; subject?: string; date?: string; time?: string; count: number }[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PAPERS_V2);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const paperMap = new Map<string, { id: string; name: string; subject?: string; date?: string; time?: string; count: number }>();
        for (const p of AVAILABLE_PAPERS) {
          paperMap.set(p.id, { ...p });
        }
        for (const p of parsed) {
          if (!p || !p.id) continue;
          if (paperMap.has(p.id)) {
            paperMap.set(p.id, { ...paperMap.get(p.id)!, ...p });
          } else {
            paperMap.set(p.id, p);
          }
        }
        return Array.from(paperMap.values());
      }
    }
  } catch (e) {
    console.error("Failed to load saved papers from localStorage:", e);
  }
  return AVAILABLE_PAPERS;
}

export default function App() {
  // Load initial or persisted questions (guaranteeing all 300 baseline questions across 6 papers)
  const [questions, setQuestions] = useState<PYQQuestion[]>(loadInitialQuestions);

  // Available papers metadata (all 6 papers)
  const [availablePapers, setAvailablePapers] = useState<
    { id: string; name: string; subject?: string; date?: string; time?: string; count: number }[]
  >(loadInitialPapers);

  // Active view: hierarchical, table, or print
  const [activeView, setActiveView] = useState<"hierarchical" | "table" | "print">("hierarchical");

  // Multi-level Filters state
  const [filters, setFilters] = useState<FilterState>({
    paperId: "all",
    unitNumber: null,
    topic: null,
    subtopic: null,
    searchQuery: "",
    reviewStatus: "all",
  });

  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [editingQuestion, setEditingQuestion] = useState<PYQQuestion | null>(null);

  // Synchronize questions with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_QUESTIONS_V2, JSON.stringify(questions));
    } catch (e) {
      console.error("Failed to save questions to localStorage:", e);
    }
  }, [questions]);

  // Synchronize papers with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PAPERS_V2, JSON.stringify(availablePapers));
    } catch (e) {
      console.error("Failed to save papers to localStorage:", e);
    }
  }, [availablePapers]);

  // Compute paper question counts dynamically
  const paperStats = useMemo(() => {
    return availablePapers.map((paper) => {
      const count = questions.filter((q) => q.paperId === paper.id).length;
      return {
        ...paper,
        count,
      };
    });
  }, [availablePapers, questions]);

  // Update filter partially
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  // Reset all filters to default
  const handleResetFilters = () => {
    setFilters({
      paperId: "all",
      unitNumber: null,
      topic: null,
      subtopic: null,
      searchQuery: "",
      reviewStatus: "all",
    });
  };

  // Filter questions according to current active filters
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // Paper filter
      if (filters.paperId !== "all" && q.paperId !== filters.paperId) {
        return false;
      }

      // Unit filter
      if (filters.unitNumber !== null && q.unitNumber !== filters.unitNumber) {
        return false;
      }

      // Topic filter
      if (filters.topic !== null && q.topic.toLowerCase().trim() !== filters.topic.toLowerCase().trim()) {
        return false;
      }

      // Subtopic filter
      if (filters.subtopic !== null && q.subtopic.toLowerCase().trim() !== filters.subtopic.toLowerCase().trim()) {
        return false;
      }

      // Review status filter
      if (filters.reviewStatus !== "all" && q.status !== filters.reviewStatus) {
        return false;
      }

      // Search Query filter
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const inQuestion = q.questionText.toLowerCase().includes(query);
        const inPassage = q.passageText?.toLowerCase().includes(query) ?? false;
        const inTopic = q.topic.toLowerCase().includes(query);
        const inSubtopic = q.subtopic.toLowerCase().includes(query);
        const inUnit = q.unitTitle.toLowerCase().includes(query);
        const inPaper = q.paperName.toLowerCase().includes(query);
        const inSubject = q.paperSubject.toLowerCase().includes(query);
        const inQNum = q.questionNumber.toLowerCase().includes(query);
        const inQId = q.questionId?.toLowerCase().includes(query) ?? false;
        const inOptions = q.options.some((opt) => opt.toLowerCase().includes(query));
        const inNotes = q.userNotes?.toLowerCase().includes(query) ?? false;

        if (
          !inQuestion &&
          !inPassage &&
          !inTopic &&
          !inSubtopic &&
          !inUnit &&
          !inPaper &&
          !inSubject &&
          !inQNum &&
          !inQId &&
          !inOptions &&
          !inNotes
        ) {
          return false;
        }
      }

      return true;
    });
  }, [questions, filters]);

  // Handle uploading and classifying a new paper
  const handlePaperUploaded = (
    newQuestions: PYQQuestion[],
    paperMeta: { id: string; name: string; subject: string; date: string; time: string }
  ) => {
    // Append questions into the database (do NOT delete or replace previous questions)
    setQuestions((prev) => [...prev, ...newQuestions]);

    // Add paper to list of available papers if not exists
    setAvailablePapers((prev) => {
      const exists = prev.some((p) => p.id === paperMeta.id);
      if (exists) return prev;
      return [
        ...prev,
        {
          id: paperMeta.id,
          name: paperMeta.name,
          subject: paperMeta.subject,
          date: paperMeta.date,
          time: paperMeta.time,
          count: newQuestions.length,
        },
      ];
    });

    // Switch filter to show all papers or new paper
    setFilters((prev) => ({
      ...prev,
      paperId: "all",
    }));
  };

  // Toggle question status (classified <-> needs_review)
  const handleToggleStatus = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          return {
            ...q,
            status: q.status === "needs_review" ? "classified" : "needs_review",
            reviewReason: q.status === "needs_review" ? undefined : "Manual flagged for re-evaluation",
          };
        }
        return q;
      })
    );
  };

  // Save study notes for a question
  const handleSaveNotes = (id: string, notes: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          return {
            ...q,
            userNotes: notes,
          };
        }
        return q;
      })
    );
  };

  // Save edited classification
  const handleSaveClassification = (updatedQuestion: PYQQuestion) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  };

  // Reset to initial baseline dataset (650 questions across 13 papers)
  const handleResetData = () => {
    if (
      window.confirm(
        "Reset the question bank back to default 650 classified questions from 2026 Papers A through M?"
      )
    ) {
      setQuestions(INITIAL_QUESTIONS);
      setAvailablePapers(AVAILABLE_PAPERS);
      handleResetFilters();
      localStorage.removeItem(STORAGE_KEY_QUESTIONS_V2);
      localStorage.removeItem(STORAGE_KEY_PAPERS_V2);
      localStorage.removeItem(STORAGE_KEY_QUESTIONS_V1);
      localStorage.removeItem(STORAGE_KEY_PAPERS_V1);
    }
  };

  // Export to Excel handler
  const handleExportExcel = () => {
    const filename =
      filters.unitNumber !== null
        ? `UGC_NET_2026_Unit_${filters.unitNumber}_Classified_PYQs`
        : `UGC_NET_2026_All_Units_Classified_PYQs`;
    exportQuestionsToExcel(filteredQuestions, filename);
  };

  // If in Print View mode
  if (activeView === "print") {
    return (
      <PrintView
        questions={filteredQuestions}
        onBack={() => setActiveView("hierarchical")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 font-sans antialiased">
      {/* Top Header */}
      <Header
        questions={questions}
        paperCount={availablePapers.length}
        onOpenUpload={() => setIsUploadOpen(true)}
        onExportExcel={handleExportExcel}
        onTogglePrint={() => setActiveView("print")}
        onResetData={handleResetData}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main Layout: Sidebar + Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto shadow-xs">
        {/* Left Sidebar Navigation */}
        <SidebarNav
          questions={questions}
          filters={filters}
          onFilterChange={handleFilterChange}
          availablePapers={paperStats}
        />

        {/* Right Main Content */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-50">
          {/* Cascading Filter Bar */}
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalFilteredCount={filteredQuestions.length}
            totalQuestionsCount={questions.length}
            availablePapers={paperStats}
            questions={questions}
          />

          {/* Question Viewer: Hierarchical or Table View */}
          <div className="p-4 sm:p-6 flex-1">
            {activeView === "hierarchical" ? (
              <HierarchicalQuestionView
                questions={filteredQuestions}
                filters={filters}
                onEditClassification={(q) => setEditingQuestion(q)}
                onToggleStatus={handleToggleStatus}
                onSaveNotes={handleSaveNotes}
              />
            ) : (
              <TableView
                questions={filteredQuestions}
                onEditClassification={(q) => setEditingQuestion(q)}
                onToggleStatus={handleToggleStatus}
              />
            )}
          </div>
        </main>
      </div>

      {/* Upload Paper Modal */}
      <UploadPaperModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onPaperUploaded={handlePaperUploaded}
        existingQuestions={questions}
      />

      {/* Edit Question Classification Modal */}
      <EditQuestionModal
        question={editingQuestion}
        isOpen={!!editingQuestion}
        onClose={() => setEditingQuestion(null)}
        onSave={handleSaveClassification}
      />
    </div>
  );
}
