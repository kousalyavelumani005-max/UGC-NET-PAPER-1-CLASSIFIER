import React, { useState } from "react";
import { PYQQuestion } from "../types";
import { CheckCircle2, AlertCircle, Edit3, Bookmark, FileText } from "lucide-react";

interface TableViewProps {
  questions: PYQQuestion[];
  onEditClassification: (question: PYQQuestion) => void;
  onToggleStatus: (id: string) => void;
}

export const TableView: React.FC<TableViewProps> = ({
  questions,
  onEditClassification,
  onToggleStatus,
}) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
            Tabular Comparison View
          </h2>
          <p className="text-xs text-slate-500">
            Compare questions across all 2026 shifts in standard tabular format
          </p>
        </div>
        <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200">
          {questions.length} Questions
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
              <th className="py-3 px-3 w-12 text-center">#</th>
              <th className="py-3 px-3 w-36">Paper / Set</th>
              <th className="py-3 px-3 w-20">Q.No.</th>
              <th className="py-3 px-4 min-w-[320px]">Question Text & Options</th>
              <th className="py-3 px-3 w-28 text-center">Correct Ans</th>
              <th className="py-3 px-3 w-28 text-center">Candidate Ans</th>
              <th className="py-3 px-3 min-w-[200px]">Classification</th>
              <th className="py-3 px-3 w-20 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {questions.map((q, idx) => {
              const isChosenCorrect =
                q.chosenOption &&
                q.correctOption &&
                q.chosenOption.trim() === q.correctOption.trim();
              const isExpanded = expandedRow === q.id;

              return (
                <tr
                  key={q.id}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    q.status === "needs_review" ? "bg-amber-50/40" : ""
                  }`}
                >
                  <td className="py-3 px-3 text-center text-slate-400 font-mono">
                    {idx + 1}
                  </td>

                  {/* Paper Set */}
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-800">{q.paperName}</div>
                    <div className="text-[11px] text-slate-500 truncate max-w-[130px]">
                      {q.paperSubject}
                    </div>
                  </td>

                  {/* Q No */}
                  <td className="py-3 px-3">
                    <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {q.questionNumber}
                    </span>
                    {q.questionId && (
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        ID:{q.questionId}
                      </div>
                    )}
                  </td>

                  {/* Question Text & Options */}
                  <td className="py-3 px-4">
                    {q.passageText && (
                      <div className="text-[11px] text-amber-800 bg-amber-50/70 p-1.5 rounded mb-1 border border-amber-200/50 line-clamp-2">
                        <strong>Context:</strong> {q.passageText}
                      </div>
                    )}
                    <div className="font-medium text-slate-900 leading-snug line-clamp-3">
                      {q.questionText}
                    </div>

                    {/* Expand Options */}
                    <button
                      type="button"
                      onClick={() => setExpandedRow(isExpanded ? null : q.id)}
                      className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium mt-1 inline-block cursor-pointer"
                    >
                      {isExpanded ? "Hide 4 Options ▲" : "View 4 Options ▼"}
                    </button>

                    {isExpanded && (
                      <div className="mt-2 space-y-1 bg-slate-50 p-2 rounded border border-slate-200">
                        {q.options.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            className={`text-[11px] p-1 rounded ${
                              q.correctOption === (oIdx + 1).toString()
                                ? "bg-emerald-100 font-bold text-emerald-900"
                                : "text-slate-700"
                            }`}
                          >
                            ({oIdx + 1}) {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </td>

                  {/* Correct Option */}
                  <td className="py-3 px-3 text-center">
                    <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-1 rounded text-xs">
                      Option ({q.correctOption || "-"})
                    </span>
                  </td>

                  {/* Candidate Option */}
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`font-semibold px-2 py-1 rounded text-xs ${
                        isChosenCorrect
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      Option ({q.chosenOption || "-"})
                    </span>
                  </td>

                  {/* Classification */}
                  <td className="py-3 px-3">
                    <div className="font-bold text-indigo-900 text-[11px]">
                      Unit {q.unitNumber}: {q.topic}
                    </div>
                    <div className="text-slate-600 text-[11px] truncate max-w-[220px]">
                      Sub: {q.subtopic}
                    </div>
                    {q.status === "needs_review" && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 font-bold bg-amber-100 px-1.5 py-0.5 rounded mt-0.5">
                        <AlertCircle className="w-2.5 h-2.5" /> Needs Review
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => onEditClassification(q)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors cursor-pointer"
                      title="Edit Classification"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
