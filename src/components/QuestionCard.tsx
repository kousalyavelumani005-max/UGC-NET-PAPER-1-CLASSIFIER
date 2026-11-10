import React, { useState } from "react";
import { 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  Edit3, 
  FileText, 
  Calendar, 
  Clock, 
  Bookmark, 
  Check, 
  HelpCircle,
  Tag
} from "lucide-react";
import { PYQQuestion } from "../types";

interface QuestionCardProps {
  question: PYQQuestion;
  onEditClassification: (question: PYQQuestion) => void;
  onToggleStatus: (id: string) => void;
  onSaveNotes: (id: string, notes: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onEditClassification,
  onToggleStatus,
  onSaveNotes,
}) => {
  const [showPassage, setShowPassage] = useState<boolean>(false);
  const [showNotesInput, setShowNotesInput] = useState<boolean>(false);
  const [notesText, setNotesText] = useState<string>(question.userNotes || "");
  const [showAnswerDetails, setShowAnswerDetails] = useState<boolean>(true);

  const isChosenCorrect =
    question.chosenOption &&
    question.correctOption &&
    question.chosenOption.trim() === question.correctOption.trim();

  const handleSaveNotes = () => {
    onSaveNotes(question.id, notesText);
    setShowNotesInput(false);
  };

  return (
    <div
      id={`question-card-${question.id}`}
      className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden shadow-xs hover:shadow-sm ${
        question.status === "needs_review"
          ? "border-amber-300 ring-1 ring-amber-200"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      {/* Question Header: Paper source badge, Question ID, and status */}
      <div className="bg-slate-50/80 px-4 py-2.5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Left: Source metadata badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
            {question.questionNumber}
          </span>

          <div className="flex items-center gap-1.5 font-medium text-slate-700 bg-indigo-50/70 border border-indigo-100 px-2 py-0.5 rounded">
            <Bookmark className="w-3.5 h-3.5 text-indigo-600" />
            <span className="font-semibold text-indigo-900">{question.paperName}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">{question.paperSubject}</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-slate-500 text-[11px]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              {question.testDate}
            </span>
            {question.testTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {question.testTime}
              </span>
            )}
          </div>
        </div>

        {/* Right: Question ID & Status Badge */}
        <div className="flex items-center gap-2">
          {question.questionId && (
            <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              Q.ID: {question.questionId}
            </span>
          )}

          {question.status === "needs_review" ? (
            <button
              type="button"
              onClick={() => onToggleStatus(question.id)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200 transition-colors cursor-pointer"
              title="Click to mark as resolved/classified"
            >
              <AlertCircle className="w-3 h-3 text-amber-600" />
              <span>Needs Review</span>
            </button>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Classified</span>
            </span>
          )}

          {/* Edit Classification Button */}
          <button
            type="button"
            onClick={() => onEditClassification(question)}
            className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors cursor-pointer"
            title="Edit Unit, Topic, or Subtopic Classification"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Breadcrumb Classification Pill Bar */}
      <div className="px-4 py-1.5 bg-slate-100/50 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-600 flex-wrap gap-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-semibold text-indigo-700">Unit {question.unitNumber}</span>
          <span className="text-slate-400">›</span>
          <span className="font-medium text-slate-700">{question.topic}</span>
          <span className="text-slate-400">›</span>
          <span className="font-semibold text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200">
            {question.subtopic}
          </span>
        </div>

        {question.reviewReason && (
          <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Reason: {question.reviewReason}
          </span>
        )}
      </div>

      {/* Main Body */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Optional Passage / Context Box (for RC or DI) */}
        {question.passageText && (
          <div className="bg-amber-50/50 border border-amber-200/80 rounded-lg p-3 text-xs text-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold uppercase tracking-wider text-[11px] text-amber-900 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-700" />
                Reading Passage / Data Context
              </span>
              <button
                type="button"
                onClick={() => setShowPassage(!showPassage)}
                className="text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-1 text-[11px] cursor-pointer"
              >
                {showPassage ? (
                  <>
                    <span>Collapse Passage</span>
                    <ChevronUp className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    <span>Expand Full Context</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
            <div
              className={`font-sans whitespace-pre-line leading-relaxed text-slate-700 overflow-hidden transition-all ${
                showPassage ? "max-h-none" : "max-h-20 line-clamp-3 text-ellipsis"
              }`}
            >
              {question.passageText}
            </div>
          </div>
        )}

        {/* Question Text */}
        <div className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed whitespace-pre-line">
          {question.questionText}
        </div>

        {/* 4 Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {question.options.map((opt, idx) => {
            const optNum = (idx + 1).toString();
            const isCorrect = question.correctOption === optNum;
            const isChosen = question.chosenOption === optNum;

            let borderStyle = "border-slate-200 bg-slate-50/60 text-slate-800";
            let badgeStyle = "bg-slate-200 text-slate-700";

            if (showAnswerDetails) {
              if (isCorrect) {
                borderStyle = "border-emerald-400 bg-emerald-50/70 text-emerald-950 font-medium ring-1 ring-emerald-300";
                badgeStyle = "bg-emerald-600 text-white font-bold";
              } else if (isChosen && !isChosenCorrect) {
                borderStyle = "border-red-300 bg-red-50/50 text-red-950";
                badgeStyle = "bg-red-500 text-white";
              }
            }

            return (
              <div
                key={idx}
                className={`p-3 rounded-lg border text-xs sm:text-sm flex items-start gap-2.5 transition-all ${borderStyle}`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5 ${badgeStyle}`}
                >
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="leading-snug">{opt}</div>
                  {showAnswerDetails && isCorrect && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 mt-1">
                      <Check className="w-3 h-3" /> Official Correct Answer
                    </span>
                  )}
                  {showAnswerDetails && isChosen && !isChosenCorrect && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-red-600 mt-1">
                      Candidate Marked ({isChosen ? "Wrong" : ""})
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info: Answer summary & Notes */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 flex-wrap">
            {question.correctOption && (
              <div className="flex items-center gap-1.5 font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Correct Option: ({question.correctOption})</span>
              </div>
            )}

            {question.chosenOption && (
              <div className="flex items-center gap-1.5 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                <span>Candidate Chosen: ({question.chosenOption})</span>
                {isChosenCorrect ? (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1 py-0.2 rounded">
                    +2 Marks
                  </span>
                ) : (
                  <span className="text-[10px] font-medium text-slate-500 bg-slate-200 px-1 py-0.2 rounded">
                    0 Marks
                  </span>
                )}
              </div>
            )}
          </div>

          {/* User Notes Toggle */}
          <div>
            {!showNotesInput && !question.userNotes ? (
              <button
                type="button"
                onClick={() => setShowNotesInput(true)}
                className="text-slate-500 hover:text-indigo-600 text-xs font-medium flex items-center gap-1 cursor-pointer"
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Add Study Note</span>
              </button>
            ) : !showNotesInput && question.userNotes ? (
              <div className="flex items-center gap-2">
                <span className="text-slate-600 italic bg-amber-50/70 border border-amber-200/60 px-2 py-0.5 rounded text-[11px]">
                  Note: {question.userNotes}
                </span>
                <button
                  type="button"
                  onClick={() => setShowNotesInput(true)}
                  className="text-indigo-600 hover:text-indigo-800 text-[11px] font-medium underline cursor-pointer"
                >
                  Edit
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {/* Note input field if toggled */}
        {showNotesInput && (
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2 text-xs">
            <label className="font-semibold text-slate-700 block">
              Study Note / Shortcut / Concept Reference:
            </label>
            <input
              type="text"
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="e.g. Important formula or frequently repeated concept in 2026..."
              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNotesInput(false)}
                className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNotes}
                className="px-3 py-1 bg-indigo-600 text-white font-medium rounded hover:bg-indigo-700 cursor-pointer shadow-2xs"
              >
                Save Note
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
