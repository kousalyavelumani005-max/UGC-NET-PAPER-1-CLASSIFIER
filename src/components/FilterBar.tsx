import React, { useMemo } from "react";
import { Search, X, Filter, RefreshCw, Layers, Folder, Tag, FileText, CheckCircle2, ChevronRight } from "lucide-react";
import { UGC_NET_SYLLABUS } from "../data/syllabus";
import { FilterState, PYQQuestion } from "../types";

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
  totalQuestionsCount: number;
  availablePapers: { id: string; name: string }[];
  questions?: PYQQuestion[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFilteredCount,
  totalQuestionsCount,
  availablePapers,
  questions = [],
}) => {
  // Base questions filtered by paperId and reviewStatus (for accurate dropdown counts)
  const baseScopedQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (filters.paperId !== "all" && q.paperId !== filters.paperId) return false;
      if (filters.reviewStatus !== "all" && q.status !== filters.reviewStatus) return false;
      return true;
    });
  }, [questions, filters.paperId, filters.reviewStatus]);

  // Dynamic Units with exact question counts
  const unitsList = useMemo(() => {
    return UGC_NET_SYLLABUS.map((u) => {
      const count = baseScopedQuestions.filter((q) => q.unitNumber === u.unitNumber).length;
      return {
        unitNumber: u.unitNumber,
        unitTitle: u.unitTitle,
        shortName: u.shortName,
        count,
      };
    });
  }, [baseScopedQuestions]);

  // Dynamic Topics based on active unit (or all units if no unit is selected)
  const topicsList = useMemo(() => {
    const topicMap = new Map<
      string,
      {
        name: string;
        unitNumber: number;
        unitShortName: string;
        count: number;
      }
    >();

    // 1. If unit is selected, seed topics from that unit; otherwise seed from all units
    const relevantSyllabusUnits = filters.unitNumber !== null
      ? UGC_NET_SYLLABUS.filter((u) => u.unitNumber === filters.unitNumber)
      : UGC_NET_SYLLABUS;

    relevantSyllabusUnits.forEach((u) => {
      if (u.topics) {
        u.topics.forEach((t) => {
          const key = t.name.toLowerCase().trim();
          if (!topicMap.has(key)) {
            topicMap.set(key, {
              name: t.name,
              unitNumber: u.unitNumber,
              unitShortName: u.shortName,
              count: 0,
            });
          }
        });
      }
    });

    // 2. Include any topics from actual questions
    const relevantQuestions = filters.unitNumber !== null
      ? baseScopedQuestions.filter((q) => q.unitNumber === filters.unitNumber)
      : baseScopedQuestions;

    relevantQuestions.forEach((q) => {
      const key = q.topic.toLowerCase().trim();
      if (!topicMap.has(key)) {
        const sylUnit = UGC_NET_SYLLABUS.find((u) => u.unitNumber === q.unitNumber);
        topicMap.set(key, {
          name: q.topic,
          unitNumber: q.unitNumber,
          unitShortName: sylUnit ? sylUnit.shortName : `Unit ${q.unitNumber}`,
          count: 0,
        });
      }
    });

    // 3. Calculate exact question count for each topic
    for (const [key, entry] of topicMap.entries()) {
      entry.count = baseScopedQuestions.filter((q) => {
        const matchUnit = filters.unitNumber !== null ? q.unitNumber === filters.unitNumber : q.unitNumber === entry.unitNumber;
        const matchTopic = q.topic.toLowerCase().trim() === key;
        return matchUnit && matchTopic;
      }).length;
    }

    return Array.from(topicMap.values());
  }, [baseScopedQuestions, filters.unitNumber]);

  // Dynamic Subtopics based on active Topic and/or Unit
  const subtopicsList = useMemo(() => {
    const subtopicMap = new Map<
      string,
      {
        name: string;
        topicName: string;
        unitNumber: number;
        count: number;
      }
    >();

    // 1. Seed from syllabus
    const relevantSyllabusUnits = filters.unitNumber !== null
      ? UGC_NET_SYLLABUS.filter((u) => u.unitNumber === filters.unitNumber)
      : UGC_NET_SYLLABUS;

    relevantSyllabusUnits.forEach((u) => {
      if (u.topics) {
        u.topics.forEach((t) => {
          if (filters.topic !== null && t.name.toLowerCase().trim() !== filters.topic.toLowerCase().trim()) {
            return;
          }
          t.subtopics.forEach((st) => {
            const key = st.toLowerCase().trim();
            if (!subtopicMap.has(key)) {
              subtopicMap.set(key, {
                name: st,
                topicName: t.name,
                unitNumber: u.unitNumber,
                count: 0,
              });
            }
          });
        });
      }
    });

    // 2. Include any subtopics from actual question records
    const relevantQuestions = baseScopedQuestions.filter((q) => {
      if (filters.unitNumber !== null && q.unitNumber !== filters.unitNumber) return false;
      if (filters.topic !== null && q.topic.toLowerCase().trim() !== filters.topic.toLowerCase().trim()) return false;
      return true;
    });

    relevantQuestions.forEach((q) => {
      const key = q.subtopic.toLowerCase().trim();
      if (!subtopicMap.has(key)) {
        subtopicMap.set(key, {
          name: q.subtopic,
          topicName: q.topic,
          unitNumber: q.unitNumber,
          count: 0,
        });
      }
    });

    // 3. Compute exact counts
    for (const [key, entry] of subtopicMap.entries()) {
      entry.count = baseScopedQuestions.filter((q) => {
        if (filters.unitNumber !== null && q.unitNumber !== filters.unitNumber) return false;
        if (filters.topic !== null && q.topic.toLowerCase().trim() !== filters.topic.toLowerCase().trim()) return false;
        return q.subtopic.toLowerCase().trim() === key;
      }).length;
    }

    return Array.from(subtopicMap.values());
  }, [baseScopedQuestions, filters.unitNumber, filters.topic]);

  // Handler when Unit changes
  const handleUnitChange = (newUnitNum: number | null) => {
    if (newUnitNum === null) {
      onFilterChange({
        unitNumber: null,
        topic: null,
        subtopic: null,
      });
      return;
    }

    // Check if currently selected topic belongs to the new unit
    let preservedTopic: string | null = null;
    let preservedSubtopic: string | null = null;

    if (filters.topic) {
      const topicMatchesInNewUnit = questions.some(
        (q) => q.unitNumber === newUnitNum && q.topic.toLowerCase().trim() === filters.topic!.toLowerCase().trim()
      ) || (UGC_NET_SYLLABUS.find((u) => u.unitNumber === newUnitNum)?.topics.some(
        (t) => t.name.toLowerCase().trim() === filters.topic!.toLowerCase().trim()
      ) ?? false);

      if (topicMatchesInNewUnit) {
        preservedTopic = filters.topic;
        if (filters.subtopic) {
          const subtopicMatches = questions.some(
            (q) =>
              q.unitNumber === newUnitNum &&
              q.topic.toLowerCase().trim() === filters.topic!.toLowerCase().trim() &&
              q.subtopic.toLowerCase().trim() === filters.subtopic!.toLowerCase().trim()
          );
          if (subtopicMatches) {
            preservedSubtopic = filters.subtopic;
          }
        }
      }
    }

    onFilterChange({
      unitNumber: newUnitNum,
      topic: preservedTopic,
      subtopic: preservedSubtopic,
    });
  };

  // Handler when Topic changes
  const handleTopicChange = (newTopicName: string | null) => {
    if (!newTopicName) {
      onFilterChange({
        topic: null,
        subtopic: null,
      });
      return;
    }

    // Find which unit this topic belongs to if unit wasn't chosen
    const matchedTopicObj = topicsList.find(
      (t) => t.name.toLowerCase().trim() === newTopicName.toLowerCase().trim()
    );

    let targetUnit = filters.unitNumber;
    if (targetUnit === null && matchedTopicObj) {
      targetUnit = matchedTopicObj.unitNumber;
    }

    // Check if currently selected subtopic belongs to this topic
    let preservedSubtopic: string | null = null;
    if (filters.subtopic) {
      const subMatches = questions.some(
        (q) =>
          q.topic.toLowerCase().trim() === newTopicName.toLowerCase().trim() &&
          q.subtopic.toLowerCase().trim() === filters.subtopic!.toLowerCase().trim()
      );
      if (subMatches) {
        preservedSubtopic = filters.subtopic;
      }
    }

    onFilterChange({
      unitNumber: targetUnit,
      topic: newTopicName,
      subtopic: preservedSubtopic,
    });
  };

  // Handler when Subtopic changes
  const handleSubtopicChange = (newSubtopicName: string | null) => {
    if (!newSubtopicName) {
      onFilterChange({ subtopic: null });
      return;
    }

    // If unit or topic were not set, auto-fill them from matching question/syllabus
    const matchedSubtopicObj = subtopicsList.find(
      (s) => s.name.toLowerCase().trim() === newSubtopicName.toLowerCase().trim()
    );

    let targetUnit = filters.unitNumber;
    let targetTopic = filters.topic;

    if (matchedSubtopicObj) {
      if (targetUnit === null) targetUnit = matchedSubtopicObj.unitNumber;
      if (targetTopic === null) targetTopic = matchedSubtopicObj.topicName;
    }

    onFilterChange({
      unitNumber: targetUnit,
      topic: targetTopic,
      subtopic: newSubtopicName,
    });
  };

  const hasActiveFilters =
    filters.searchQuery !== "" ||
    filters.unitNumber !== null ||
    filters.topic !== null ||
    filters.subtopic !== null ||
    filters.paperId !== "all" ||
    filters.reviewStatus !== "all";

  // Active unit name
  const activeUnitObj = filters.unitNumber !== null ? UGC_NET_SYLLABUS.find((u) => u.unitNumber === filters.unitNumber) : null;
  const activePaperObj = filters.paperId !== "all" ? availablePapers.find((p) => p.id === filters.paperId) : null;

  return (
    <div className="bg-white border-b border-slate-200 p-4 space-y-3.5 shadow-xs">
      {/* Top row: Search input & quick stats */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Box */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="global-search-input"
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search questions by keyword, topic, subtopic, formula, Q ID, or shift..."
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-2xs"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => onFilterChange({ searchQuery: "" })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Question count feedback & Reset button */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 border border-slate-200/60 shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-indigo-600" />
            <span>
              Showing <strong className="text-indigo-600 font-bold">{totalFilteredCount}</strong> of{" "}
              <strong>{totalQuestionsCount}</strong> questions
            </span>
          </div>

          {hasActiveFilters && (
            <button
              id="reset-all-filters-btn"
              type="button"
              onClick={onResetFilters}
              className="text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Clear all active filters"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Second row: Cascading Dropdowns for Unit, Topic, Subtopic, and Paper */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        {/* 1. Unit Selector */}
        <div>
          <label
            htmlFor="filter-unit-select"
            className="flex items-center gap-1 text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1"
          >
            <Layers className="w-3 h-3 text-indigo-600" />
            <span>1. Unit (1 - 10)</span>
          </label>
          <select
            id="filter-unit-select"
            value={filters.unitNumber ?? ""}
            onChange={(e) => {
              const val = e.target.value === "" ? null : Number(e.target.value);
              handleUnitChange(val);
            }}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-2.5 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-2xs cursor-pointer"
          >
            <option value="">All 10 Units ({totalQuestionsCount} Qs)</option>
            {unitsList.map((u) => (
              <option key={u.unitNumber} value={u.unitNumber}>
                Unit {u.unitNumber}: {u.shortName} ({u.count} Qs)
              </option>
            ))}
          </select>
        </div>

        {/* 2. Topic Selector (Cascading & Contextual) */}
        <div>
          <label
            htmlFor="filter-topic-select"
            className="flex items-center gap-1 text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1"
          >
            <Folder className="w-3 h-3 text-indigo-600" />
            <span>2. Topic</span>
            {filters.unitNumber !== null && (
              <span className="text-[10px] font-normal text-indigo-600 lowercase">
                (in Unit {filters.unitNumber})
              </span>
            )}
          </label>
          <select
            id="filter-topic-select"
            value={filters.topic ?? ""}
            onChange={(e) => {
              const val = e.target.value === "" ? null : e.target.value;
              handleTopicChange(val);
            }}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-2.5 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-2xs cursor-pointer"
          >
            <option value="">
              {filters.unitNumber !== null
                ? `All Topics in Unit ${filters.unitNumber} (${topicsList.reduce((sum, t) => sum + t.count, 0)} Qs)`
                : `All Topics across Syllabus (${topicsList.length} Topics)`}
            </option>
            {topicsList.map((t) => (
              <option key={`${t.unitNumber}-${t.name}`} value={t.name}>
                {filters.unitNumber === null ? `[U${t.unitNumber}] ` : ""}
                {t.name} ({t.count} Qs)
              </option>
            ))}
          </select>
        </div>

        {/* 3. Subtopic Selector (Cascading & Contextual) */}
        <div>
          <label
            htmlFor="filter-subtopic-select"
            className="flex items-center gap-1 text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1"
          >
            <Tag className="w-3 h-3 text-indigo-600" />
            <span>3. Subtopic</span>
            {filters.topic !== null && (
              <span className="text-[10px] font-normal text-indigo-600 truncate max-w-[110px]" title={filters.topic}>
                ({filters.topic})
              </span>
            )}
          </label>
          <select
            id="filter-subtopic-select"
            value={filters.subtopic ?? ""}
            onChange={(e) => {
              const val = e.target.value === "" ? null : e.target.value;
              handleSubtopicChange(val);
            }}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-2.5 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-2xs cursor-pointer"
          >
            <option value="">
              {filters.topic !== null
                ? `All Subtopics in ${filters.topic} (${subtopicsList.reduce((sum, s) => sum + s.count, 0)} Qs)`
                : filters.unitNumber !== null
                ? `All Subtopics in Unit ${filters.unitNumber} (${subtopicsList.reduce((sum, s) => sum + s.count, 0)} Qs)`
                : `All Subtopics (${subtopicsList.length} Subtopics)`}
            </option>
            {subtopicsList.map((s) => (
              <option key={`${s.unitNumber}-${s.topicName}-${s.name}`} value={s.name}>
                {s.name} ({s.count} Qs)
              </option>
            ))}
          </select>
        </div>

        {/* 4. Paper / Shift Selector */}
        <div>
          <label
            htmlFor="filter-paper-select"
            className="flex items-center gap-1 text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1"
          >
            <FileText className="w-3 h-3 text-indigo-600" />
            <span>4. Paper / Shift</span>
          </label>
          <select
            id="filter-paper-select"
            value={filters.paperId}
            onChange={(e) => onFilterChange({ paperId: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-2.5 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-2xs cursor-pointer"
          >
            <option value="all">All 13 Papers (650 Qs)</option>
            {availablePapers.map((p) => {
              const paperCount = questions.filter((q) => q.paperId === p.id).length;
              return (
                <option key={p.id} value={p.id}>
                  {p.name} ({paperCount} Qs)
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Third row: Active Filter Hierarchy Breadcrumbs & Dismissible Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            Active Filter:
          </span>

          {/* Unit Tag */}
          {filters.unitNumber !== null && activeUnitObj && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-medium shadow-2xs">
              <Layers className="w-3 h-3 text-indigo-600" />
              <span>
                Unit {filters.unitNumber}: {activeUnitObj.shortName}
              </span>
              <button
                type="button"
                onClick={() => handleUnitChange(null)}
                className="hover:bg-indigo-200/60 p-0.5 rounded text-indigo-600 hover:text-indigo-900 cursor-pointer"
                title="Remove Unit filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Hierarchy arrow */}
          {filters.unitNumber !== null && filters.topic !== null && (
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          )}

          {/* Topic Tag */}
          {filters.topic !== null && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-violet-50 text-violet-800 border border-violet-200 text-xs font-medium shadow-2xs">
              <Folder className="w-3 h-3 text-violet-600" />
              <span>Topic: {filters.topic}</span>
              <button
                type="button"
                onClick={() => handleTopicChange(null)}
                className="hover:bg-violet-200/60 p-0.5 rounded text-violet-600 hover:text-violet-900 cursor-pointer"
                title="Remove Topic filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Hierarchy arrow */}
          {filters.topic !== null && filters.subtopic !== null && (
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          )}

          {/* Subtopic Tag */}
          {filters.subtopic !== null && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-xs font-medium shadow-2xs">
              <Tag className="w-3 h-3 text-amber-600" />
              <span>Subtopic: {filters.subtopic}</span>
              <button
                type="button"
                onClick={() => handleSubtopicChange(null)}
                className="hover:bg-amber-200/60 p-0.5 rounded text-amber-600 hover:text-amber-900 cursor-pointer"
                title="Remove Subtopic filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Paper Tag */}
          {filters.paperId !== "all" && activePaperObj && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-50 text-sky-800 border border-sky-200 text-xs font-medium shadow-2xs">
              <FileText className="w-3 h-3 text-sky-600" />
              <span>Paper: {activePaperObj.name}</span>
              <button
                type="button"
                onClick={() => onFilterChange({ paperId: "all" })}
                className="hover:bg-sky-200/60 p-0.5 rounded text-sky-600 hover:text-sky-900 cursor-pointer"
                title="Remove Paper filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Review Status Tag */}
          {filters.reviewStatus !== "all" && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-200 text-xs font-medium shadow-2xs">
              <span>Status: {filters.reviewStatus === "classified" ? "Fully Classified" : "Needs Review"}</span>
              <button
                type="button"
                onClick={() => onFilterChange({ reviewStatus: "all" })}
                className="hover:bg-slate-200 p-0.5 rounded text-slate-600 hover:text-slate-900 cursor-pointer"
                title="Remove Status filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Search Query Tag */}
          {filters.searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-200 text-xs font-medium shadow-2xs">
              <Search className="w-3 h-3 text-slate-500" />
              <span>Search: &ldquo;{filters.searchQuery}&rdquo;</span>
              <button
                type="button"
                onClick={() => onFilterChange({ searchQuery: "" })}
                className="hover:bg-slate-200 p-0.5 rounded text-slate-600 hover:text-slate-900 cursor-pointer"
                title="Clear search query"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
