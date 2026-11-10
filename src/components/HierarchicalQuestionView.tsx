import React, { useState } from "react";
import { UGC_NET_SYLLABUS } from "../data/syllabus";
import { PYQQuestion, FilterState } from "../types";
import { QuestionCard } from "./QuestionCard";
import { 
  ChevronDown, 
  ChevronRight, 
  BookOpen, 
  Layers, 
  Folder, 
  HelpCircle,
  Expand,
  Shrink,
  GraduationCap
} from "lucide-react";

interface HierarchicalQuestionViewProps {
  questions: PYQQuestion[];
  filters: FilterState;
  onEditClassification: (question: PYQQuestion) => void;
  onToggleStatus: (id: string) => void;
  onSaveNotes: (id: string, notes: string) => void;
}

export const HierarchicalQuestionView: React.FC<HierarchicalQuestionViewProps> = ({
  questions,
  filters,
  onEditClassification,
  onToggleStatus,
  onSaveNotes,
}) => {
  // State for collapsed/expanded units & topics
  const [collapsedUnits, setCollapsedUnits] = useState<{ [unitNum: number]: boolean }>({});
  const [collapsedTopics, setCollapsedTopics] = useState<{ [topicKey: string]: boolean }>({});

  const toggleUnit = (unitNum: number) => {
    setCollapsedUnits((prev) => ({ ...prev, [unitNum]: !prev[unitNum] }));
  };

  const toggleTopic = (unitNum: number, topicName: string) => {
    const key = `${unitNum}-${topicName}`;
    setCollapsedTopics((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExpandAll = () => {
    setCollapsedUnits({});
    setCollapsedTopics({});
  };

  const handleCollapseAll = () => {
    const allUnitsCollapsed: { [key: number]: boolean } = {};
    UGC_NET_SYLLABUS.forEach((u) => {
      allUnitsCollapsed[u.unitNumber] = true;
    });
    setCollapsedUnits(allUnitsCollapsed);
  };

  // Filtered syllabus units based on current filters
  const displayedUnits = UGC_NET_SYLLABUS.filter((unit) => {
    if (filters.unitNumber !== null && unit.unitNumber !== filters.unitNumber) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Bar for View Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Master Hierarchical View (Unit → Topic → Subtopic)
          </span>
          <span className="text-xs text-slate-500 hidden sm:inline">
            — All questions from all uploaded papers mapped to official syllabus
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExpandAll}
            className="text-xs text-slate-600 hover:text-indigo-600 font-medium px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Expand className="w-3.5 h-3.5" />
            <span>Expand All</span>
          </button>
          <button
            type="button"
            onClick={handleCollapseAll}
            className="text-xs text-slate-600 hover:text-indigo-600 font-medium px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Shrink className="w-3.5 h-3.5" />
            <span>Collapse All</span>
          </button>
        </div>
      </div>

      {/* Zero match message */}
      {questions.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-800">
            No questions matched your current filter
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try adjusting your search query, clearing subtopic selections, or choosing &quot;All Papers&quot; in the filter bar.
          </p>
        </div>
      )}

      {/* Render Each Unit */}
      {displayedUnits.map((unit) => {
        // Questions belonging to this unit in the current filtered questions dataset
        const unitQuestions = questions.filter((q) => q.unitNumber === unit.unitNumber);
        const isUnitCollapsed = !!collapsedUnits[unit.unitNumber];

        // Dynamically collect all topics for this unit (from syllabus + actual question records)
        const topicsMap = new Map<string, { name: string; subtopicsMap: Map<string, string> }>();

        // 1. Seed with official syllabus topics
        if (unit.topics) {
          unit.topics.forEach((t) => {
            const key = t.name.toLowerCase().trim();
            const subMap = new Map<string, string>();
            t.subtopics.forEach((st) => subMap.set(st.toLowerCase().trim(), st));
            topicsMap.set(key, {
              name: t.name,
              subtopicsMap: subMap,
            });
          });
        }

        // 2. Include any actual question topics and subtopics
        unitQuestions.forEach((q) => {
          const key = q.topic.toLowerCase().trim();
          if (!topicsMap.has(key)) {
            topicsMap.set(key, {
              name: q.topic,
              subtopicsMap: new Map(),
            });
          }
          const tEntry = topicsMap.get(key)!;
          const subKey = q.subtopic.toLowerCase().trim();
          if (!tEntry.subtopicsMap.has(subKey)) {
            tEntry.subtopicsMap.set(subKey, q.subtopic);
          }
        });

        // Convert to array and filter if specific topic filter is active
        const displayedTopics = Array.from(topicsMap.values()).filter((t) => {
          if (filters.topic && t.name.toLowerCase().trim() !== filters.topic.toLowerCase().trim()) {
            return false;
          }
          return true;
        });

        // Check if there are questions in this unit matching the search/filter
        const hasQuestionsInUnit = unitQuestions.length > 0;

        // Skip unit if it has no matching questions
        if (!hasQuestionsInUnit) {
          return null;
        }

        return (
          <section
            key={unit.unitNumber}
            id={`unit-section-${unit.unitNumber}`}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
          >
            {/* UNIT Header Banner */}
            <div
              onClick={() => toggleUnit(unit.unitNumber)}
              className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white px-5 py-4 flex items-center justify-between cursor-pointer select-none transition-colors hover:brightness-110"
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="p-1 rounded bg-white/10 hover:bg-white/20 transition-colors text-white"
                >
                  {isUnitCollapsed ? (
                    <ChevronRight className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-bold uppercase tracking-wider">
                      Unit {unit.unitNumber}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {unit.unitTitle.replace(/^Unit\s+\d+\s+–\s+/, "")}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-300 font-normal mt-0.5 line-clamp-1">
                    {unit.description}
                  </p>
                </div>
              </div>

              {/* Unit question count badge (Exact count from actual question records) */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 py-1 bg-white/15 border border-white/20 rounded-full text-xs font-bold text-white shadow-2xs">
                  {unitQuestions.length} Questions
                </span>
              </div>
            </div>

            {/* UNIT Content: Topics & Subtopics */}
            {!isUnitCollapsed && (
              <div className="p-4 sm:p-6 space-y-6 bg-slate-50/40">
                {displayedTopics.map((topic) => {
                  const topicKey = `${unit.unitNumber}-${topic.name}`;
                  const isTopicCollapsed = !!collapsedTopics[topicKey];

                  // Questions belonging to this exact topic
                  const topicQuestions = unitQuestions.filter(
                    (q) => q.topic.toLowerCase().trim() === topic.name.toLowerCase().trim()
                  );

                  // Convert subtopics map values to array and filter if subtopic filter is selected
                  const displayedSubtopics = Array.from(topic.subtopicsMap.values()).filter((sub) => {
                    if (filters.subtopic && sub.toLowerCase().trim() !== filters.subtopic.toLowerCase().trim()) {
                      return false;
                    }
                    return true;
                  });

                  // If topic has no questions, skip
                  if (topicQuestions.length === 0) {
                    return null;
                  }

                  return (
                    <div
                      key={topic.name}
                      id={`topic-section-${unit.unitNumber}-${topic.name.replace(/\s+/g, "-")}`}
                      className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-2xs"
                    >
                      {/* Topic Header Bar */}
                      <div
                        onClick={() => toggleTopic(unit.unitNumber, topic.name)}
                        className="bg-slate-100/90 px-4 py-3 border-b border-slate-200 flex items-center justify-between cursor-pointer select-none hover:bg-slate-200/70 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            className="text-slate-500 hover:text-slate-800"
                          >
                            {isTopicCollapsed ? (
                              <ChevronRight className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                          <Folder className="w-4 h-4 text-indigo-600" />
                          <h3 className="text-sm font-bold text-slate-800 tracking-tight">
                            Topic: <span className="text-indigo-950">{topic.name}</span>
                          </h3>
                        </div>

                        {/* Topic question count (Exact count from actual question records) */}
                        <span className="text-xs font-semibold text-slate-600 bg-white px-2.5 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                          {topicQuestions.length} Qs
                        </span>
                      </div>

                      {/* Subtopics List */}
                      {!isTopicCollapsed && (
                        <div className="p-4 sm:p-5 space-y-6">
                          {displayedSubtopics.map((subtopic) => {
                            // Find all questions belonging to this exact subtopic
                            const subtopicQuestions = topicQuestions.filter(
                              (q) =>
                                q.subtopic.toLowerCase().trim() ===
                                subtopic.toLowerCase().trim()
                            );

                            // If subtopic has no questions, skip
                            if (subtopicQuestions.length === 0) {
                              return null;
                            }

                            // Group questions by Paper to give extra clarity
                            const papersRepresented = Array.from(
                              new Set(subtopicQuestions.map((q) => q.paperName))
                            );

                            return (
                              <div
                                key={subtopic}
                                id={`subtopic-${unit.unitNumber}-${subtopic.replace(/\s+/g, "-")}`}
                                className="space-y-3 pl-1 sm:pl-3 border-l-2 border-indigo-200"
                              >
                                {/* Subtopic Title & Stats Header */}
                                <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-indigo-600" />
                                    <h4 className="text-sm font-bold text-slate-900">
                                      Subtopic: <span className="text-indigo-700">{subtopic}</span>
                                    </h4>
                                  </div>

                                  <div className="flex items-center gap-2 text-xs">
                                    {papersRepresented.length > 0 && (
                                      <span className="text-slate-500 text-[11px] hidden md:inline">
                                        Covered across {papersRepresented.length} Paper(s):{" "}
                                        <strong className="text-slate-700">
                                          {papersRepresented.join(", ")}
                                        </strong>
                                      </span>
                                    )}
                                    {/* Subtopic question count (Exact count from actual question records) */}
                                    <span
                                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                        subtopicQuestions.length > 0
                                          ? "bg-indigo-100 text-indigo-800 border border-indigo-200"
                                          : "bg-slate-100 text-slate-400"
                                      }`}
                                    >
                                      {subtopicQuestions.length} {subtopicQuestions.length === 1 ? "Question" : "Questions"}
                                    </span>
                                  </div>
                                </div>

                                {/* Questions Container under this Subtopic */}
                                {subtopicQuestions.length > 0 ? (
                                  <div className="space-y-3">
                                    {subtopicQuestions.map((question) => (
                                      <QuestionCard
                                        key={question.id}
                                        question={question}
                                        onEditClassification={onEditClassification}
                                        onToggleStatus={onToggleStatus}
                                        onSaveNotes={onSaveNotes}
                                      />
                                    ))}
                                  </div>
                                ) : (
                                  <div className="p-3 bg-slate-50 rounded-lg border border-dashed border-slate-200 text-xs text-slate-400 text-center italic">
                                    No questions currently uploaded under this subtopic.
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};
