import React, { useState } from "react";
import { X, CheckCircle2, AlertCircle, Save } from "lucide-react";
import { UGC_NET_SYLLABUS } from "../data/syllabus";
import { PYQQuestion } from "../types";

interface EditQuestionModalProps {
  question: PYQQuestion | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedQuestion: PYQQuestion) => void;
}

export const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  question,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen || !question) return null;

  const [selectedUnitNum, setSelectedUnitNum] = useState<number>(question.unitNumber);
  const [selectedTopic, setSelectedTopic] = useState<string>(question.topic);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>(question.subtopic);
  const [selectedStatus, setSelectedStatus] = useState<"classified" | "needs_review">(question.status);
  const [reviewReason, setReviewReason] = useState<string>(question.reviewReason || "");
  const [notes, setNotes] = useState<string>(question.userNotes || "");

  // Unit lookup
  const unitObj = UGC_NET_SYLLABUS.find((u) => u.unitNumber === selectedUnitNum);
  const availableTopics = unitObj ? unitObj.topics : [];

  // Topic lookup
  const topicObj = availableTopics.find((t) => t.name === selectedTopic);
  const availableSubtopics = topicObj ? topicObj.subtopics : [];

  const handleUnitChange = (unitNum: number) => {
    setSelectedUnitNum(unitNum);
    const newUnit = UGC_NET_SYLLABUS.find((u) => u.unitNumber === unitNum);
    if (newUnit && newUnit.topics.length > 0) {
      setSelectedTopic(newUnit.topics[0].name);
      setSelectedSubtopic(newUnit.topics[0].subtopics[0] || "");
    }
  };

  const handleTopicChange = (topicName: string) => {
    setSelectedTopic(topicName);
    const newTopic = availableTopics.find((t) => t.name === topicName);
    if (newTopic && newTopic.subtopics.length > 0) {
      setSelectedSubtopic(newTopic.subtopics[0]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: PYQQuestion = {
      ...question,
      unitNumber: selectedUnitNum,
      unitTitle: unitObj?.unitTitle || `Unit ${selectedUnitNum}`,
      topic: selectedTopic,
      subtopic: selectedSubtopic,
      status: selectedStatus,
      reviewReason: selectedStatus === "needs_review" ? reviewReason : undefined,
      userNotes: notes,
    };
    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold">Edit Question Classification</h3>
            <p className="text-xs text-slate-400">
              {question.paperName} • {question.questionNumber}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="p-5 space-y-4 text-xs">
          {/* Question preview */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 line-clamp-2 italic">
            &quot;{question.questionText}&quot;
          </div>

          {/* Unit Selector */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
              Select Syllabus Unit (1 - 10) *
            </label>
            <select
              value={selectedUnitNum}
              onChange={(e) => handleUnitChange(Number(e.target.value))}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500"
            >
              {UGC_NET_SYLLABUS.map((u) => (
                <option key={u.unitNumber} value={u.unitNumber}>
                  Unit {u.unitNumber}: {u.unitTitle}
                </option>
              ))}
            </select>
          </div>

          {/* Topic Selector */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
              Select Topic *
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => handleTopicChange(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500"
            >
              {availableTopics.map((t) => (
                <option key={t.name} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subtopic Selector */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
              Select Subtopic *
            </label>
            <select
              value={selectedSubtopic}
              onChange={(e) => setSelectedSubtopic(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500"
            >
              {availableSubtopics.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Status Selection */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
              Classification Status
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="editStatus"
                  value="classified"
                  checked={selectedStatus === "classified"}
                  onChange={() => setSelectedStatus("classified")}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="font-semibold text-emerald-800">Classified (Resolved)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="editStatus"
                  value="needs_review"
                  checked={selectedStatus === "needs_review"}
                  onChange={() => setSelectedStatus("needs_review")}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="font-semibold text-amber-800">Needs Review</span>
              </label>
            </div>
          </div>

          {/* If Needs Review, reason */}
          {selectedStatus === "needs_review" && (
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                Review Reason
              </label>
              <input
                type="text"
                value={reviewReason}
                onChange={(e) => setReviewReason(e.target.value)}
                placeholder="e.g. Boundary overlap between Unit 1 and Unit 8"
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
              Study Notes / Concept Summary
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes..."
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
