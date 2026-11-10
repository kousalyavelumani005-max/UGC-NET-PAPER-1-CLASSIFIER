import React from "react";
import { UGC_NET_SYLLABUS } from "../data/syllabus";
import { PYQQuestion, FilterState } from "../types";
import { 
  BookOpen, 
  GraduationCap, 
  Search, 
  FileText, 
  MessageSquare, 
  Calculator, 
  Brain, 
  BarChart3, 
  Laptop, 
  Globe, 
  Building,
  CheckCircle,
  AlertTriangle,
  Layers,
  FileCheck
} from "lucide-react";

interface SidebarNavProps {
  questions: PYQQuestion[];
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  availablePapers: { id: string; name: string; count: number }[];
}

const UNIT_ICONS: { [key: number]: React.ReactNode } = {
  1: <GraduationCap className="w-4 h-4" />,
  2: <Search className="w-4 h-4" />,
  3: <FileText className="w-4 h-4" />,
  4: <MessageSquare className="w-4 h-4" />,
  5: <Calculator className="w-4 h-4" />,
  6: <Brain className="w-4 h-4" />,
  7: <BarChart3 className="w-4 h-4" />,
  8: <Laptop className="w-4 h-4" />,
  9: <Globe className="w-4 h-4" />,
  10: <Building className="w-4 h-4" />,
};

export const SidebarNav: React.FC<SidebarNavProps> = ({
  questions,
  filters,
  onFilterChange,
  availablePapers,
}) => {
  // Compute live question counts per unit (exact question records)
  const getUnitCount = (unitNum: number) => {
    return questions.filter((q) => {
      const matchUnit = q.unitNumber === unitNum;
      const matchPaper = filters.paperId === "all" || q.paperId === filters.paperId;
      const matchStatus = filters.reviewStatus === "all" || q.status === filters.reviewStatus;
      return matchUnit && matchPaper && matchStatus;
    }).length;
  };

  const getAllUnitsCount = () => {
    return questions.filter((q) => {
      const matchPaper = filters.paperId === "all" || q.paperId === filters.paperId;
      const matchStatus = filters.reviewStatus === "all" || q.status === filters.reviewStatus;
      return matchPaper && matchStatus;
    }).length;
  };

  const getPaperCount = (paperId: string) => {
    return questions.filter((q) => {
      const matchPaper = paperId === "all" || q.paperId === paperId;
      const matchUnit = filters.unitNumber === null || q.unitNumber === filters.unitNumber;
      const matchStatus = filters.reviewStatus === "all" || q.status === filters.reviewStatus;
      return matchPaper && matchUnit && matchStatus;
    }).length;
  };

  const getStatusCount = (status: "all" | "classified" | "needs_review") => {
    return questions.filter((q) => {
      const matchPaper = filters.paperId === "all" || q.paperId === filters.paperId;
      const matchUnit = filters.unitNumber === null || q.unitNumber === filters.unitNumber;
      if (status === "all") return matchPaper && matchUnit;
      return q.status === status && matchPaper && matchUnit;
    }).length;
  };

  const needsReviewCount = getStatusCount("needs_review");
  const fullyClassifiedCount = getStatusCount("classified");
  const allStatusCount = getStatusCount("all");

  return (
    <aside className="w-full lg:w-72 bg-white border-r border-slate-200 flex flex-col shrink-0 p-4 space-y-6">
      {/* Syllabus Navigation Section */}
      <div>
        <div className="flex items-center justify-between mb-2 px-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Syllabus Units
          </span>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
            10 Units
          </span>
        </div>

        {/* "All Units" Button */}
        <button
          type="button"
          onClick={() => onFilterChange({ unitNumber: null, topic: null, subtopic: null })}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all mb-1.5 cursor-pointer ${
            filters.unitNumber === null
              ? "bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs"
              : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>All Units (Unified View)</span>
          </div>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              filters.unitNumber === null
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {getAllUnitsCount()}
          </span>
        </button>

        {/* 10 Individual Units */}
        <div className="space-y-0.5">
          {UGC_NET_SYLLABUS.map((unit) => {
            const count = getUnitCount(unit.unitNumber);
            const isSelected = filters.unitNumber === unit.unitNumber;

            return (
              <button
                key={unit.unitNumber}
                type="button"
                onClick={() =>
                  onFilterChange({
                    unitNumber: unit.unitNumber,
                    topic: null,
                    subtopic: null,
                  })
                }
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all cursor-pointer ${
                  isSelected
                    ? "bg-indigo-600 text-white font-semibold shadow-xs"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-1 text-left">
                  <span className={`${isSelected ? "text-white" : "text-indigo-600"}`}>
                    {UNIT_ICONS[unit.unitNumber] || <BookOpen className="w-4 h-4" />}
                  </span>
                  <span className="truncate">
                    Unit {unit.unitNumber}: {unit.shortName}
                  </span>
                </div>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : count > 0
                      ? "bg-slate-100 text-slate-700"
                      : "bg-slate-50 text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter by Paper / Shift */}
      <div className="pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2 px-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Papers / Sets (2026)
          </span>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
            {availablePapers.length}
          </span>
        </div>

        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onFilterChange({ paperId: "all" })}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs transition-all cursor-pointer ${
              filters.paperId === "all"
                ? "bg-slate-800 text-white font-semibold"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <div className="flex items-center gap-2">
              <FileCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>All Uploaded Papers</span>
            </div>
            <span className="font-bold">{getPaperCount("all")}</span>
          </button>

          {availablePapers.map((paper) => {
            const isSelected = filters.paperId === paper.id;
            const pCount = getPaperCount(paper.id);
            return (
              <button
                key={paper.id}
                type="button"
                onClick={() => onFilterChange({ paperId: paper.id })}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs transition-all cursor-pointer ${
                  isSelected
                    ? "bg-slate-800 text-white font-semibold"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span className="truncate text-left pr-2">{paper.name}</span>
                <span
                  className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {pCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Review Queue / Quality Filter */}
      <div className="pt-3 border-t border-slate-100">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2 px-2">
          Classification Status
        </span>

        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onFilterChange({ reviewStatus: "all" })}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs transition-all cursor-pointer ${
              filters.reviewStatus === "all"
                ? "bg-slate-100 text-slate-900 font-semibold"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <span>All Statuses</span>
            <span className="font-medium text-slate-500">{allStatusCount}</span>
          </button>

          <button
            type="button"
            onClick={() => onFilterChange({ reviewStatus: "classified" })}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs transition-all cursor-pointer ${
              filters.reviewStatus === "classified"
                ? "bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Fully Classified</span>
            </div>
            <span className="font-medium text-emerald-700">
              {fullyClassifiedCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onFilterChange({ reviewStatus: "needs_review" })}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs transition-all cursor-pointer ${
              filters.reviewStatus === "needs_review"
                ? "bg-amber-50 text-amber-800 font-semibold border border-amber-200"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Needs Review</span>
            </div>
            <span
              className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${
                needsReviewCount > 0 ? "bg-amber-200 text-amber-900" : "text-slate-400"
              }`}
            >
              {needsReviewCount}
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};
