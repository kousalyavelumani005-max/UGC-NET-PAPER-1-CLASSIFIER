import React from "react";
import { BookOpen, Download, Printer, PlusCircle, RotateCcw, AlertTriangle, Layers, FileText } from "lucide-react";
import { PYQQuestion } from "../types";

interface HeaderProps {
  questions: PYQQuestion[];
  paperCount: number;
  onOpenUpload: () => void;
  onExportExcel: () => void;
  onTogglePrint: () => void;
  onResetData: () => void;
  activeView: "hierarchical" | "table" | "print";
  setActiveView: (view: "hierarchical" | "table" | "print") => void;
}

export const Header: React.FC<HeaderProps> = ({
  questions,
  paperCount,
  onOpenUpload,
  onExportExcel,
  onTogglePrint,
  onResetData,
  activeView,
  setActiveView,
}) => {
  const totalCount = questions.length;
  const needsReviewCount = questions.filter((q) => q.status === "needs_review").length;
  const classifiedCount = totalCount - needsReviewCount;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-3">
          {/* Logo & Main Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                  UGC NET Paper 1 PYQ Classification
                </h1>
                <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full">
                  2026 Master Series
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Unit → Topic → Subtopic unified question bank across all shifts
              </p>
            </div>
          </div>

          {/* Key Stats Bar */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md">
              <span className="text-slate-500">Total Questions:</span>
              <span className="font-bold text-slate-800">{totalCount}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md">
              <span className="text-slate-500">Papers/Shifts:</span>
              <span className="font-bold text-slate-800">{paperCount}</span>
            </div>
            {needsReviewCount > 0 && (
              <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-md text-amber-800 font-medium">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>{needsReviewCount} Needs Review</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* View Mode Toggle */}
            <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-100 text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveView("hierarchical")}
                className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                  activeView === "hierarchical"
                    ? "bg-white text-slate-900 shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Hierarchical Syllabus View (Unit → Topic → Subtopic)"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Unit View</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveView("table")}
                className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                  activeView === "table"
                    ? "bg-white text-slate-900 shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Table Comparison View"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Table View</span>
              </button>
            </div>

            {/* Upload PDF Question Papers */}
            <button
              type="button"
              onClick={onOpenUpload}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              title="Upload 2–3 UGC NET 2026 PDF Question Papers"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Upload PDF Question Papers</span>
            </button>

            {/* Export Excel */}
            <button
              type="button"
              onClick={onExportExcel}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              title="Download full or filtered dataset as Excel file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Excel</span>
            </button>

            {/* Print / PDF View */}
            <button
              type="button"
              onClick={onTogglePrint}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              title="Open clean Print / Save-as-PDF view"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            {/* Reset Defaults */}
            <button
              type="button"
              onClick={onResetData}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Reset to default 150 classified questions"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
