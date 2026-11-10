import React from "react";
import { UGC_NET_SYLLABUS } from "../data/syllabus";
import { PYQQuestion } from "../types";
import { Printer, ArrowLeft } from "lucide-react";

interface PrintViewProps {
  questions: PYQQuestion[];
  onBack: () => void;
}

export const PrintView: React.FC<PrintViewProps> = ({ questions, onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  const papersCount = Array.from(new Set(questions.map((q) => q.paperName))).length;

  return (
    <div className="bg-white min-h-screen text-black p-6 sm:p-12 print:p-0">
      {/* Control bar (hidden during print) */}
      <div className="max-w-5xl mx-auto mb-8 print:hidden flex items-center justify-between bg-slate-900 text-white p-4 rounded-xl shadow-lg">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold hover:text-indigo-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to App Dashboard</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-300">
            {questions.length} questions across {papersCount} papers
          </span>
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md cursor-pointer transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Document Container */}
      <div className="max-w-5xl mx-auto space-y-8 font-serif">
        {/* Document Header */}
        <div className="border-b-2 border-black pb-4 text-center space-y-1">
          <h1 className="text-2xl font-bold uppercase tracking-wider">
            UGC NET General Paper 1 — 2026 PYQ Classification
          </h1>
          <p className="text-sm italic text-gray-700">
            Unified Master Question Compendium: Organized strictly by Unit → Topic → Subtopic
          </p>
          <div className="text-xs text-gray-600 flex justify-center gap-6 pt-1">
            <span>Total Questions: <strong>{questions.length}</strong></span>
            <span>Papers / Shifts: <strong>{papersCount}</strong></span>
            <span>Framework: <strong>Official 10-Unit Syllabus</strong></span>
          </div>
        </div>

        {/* Units Hierarchy */}
        {UGC_NET_SYLLABUS.map((unit) => {
          const unitQuestions = questions.filter((q) => q.unitNumber === unit.unitNumber);
          if (unitQuestions.length === 0) return null;

          // Dynamically collect topics for this unit (from syllabus + actual question records)
          const topicsMap = new Map<string, { name: string; subtopicsMap: Map<string, string> }>();
          if (unit.topics) {
            unit.topics.forEach((t) => {
              const subMap = new Map<string, string>();
              t.subtopics.forEach((st) => subMap.set(st.toLowerCase().trim(), st));
              topicsMap.set(t.name.toLowerCase().trim(), {
                name: t.name,
                subtopicsMap: subMap,
              });
            });
          }
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

          const displayedTopics = Array.from(topicsMap.values());

          return (
            <div key={unit.unitNumber} className="space-y-6 break-inside-avoid">
              {/* Unit Header */}
              <div className="bg-gray-100 border-y-2 border-black p-2 text-center">
                <h2 className="text-lg font-bold uppercase tracking-wide">
                  UNIT {unit.unitNumber} : {unit.unitTitle.replace(/^Unit\s+\d+\s+–\s+/, "")}
                </h2>
                <span className="text-xs text-gray-600">({unitQuestions.length} Questions)</span>
              </div>

              {/* Topics */}
              {displayedTopics.map((topic) => {
                const topicQuestions = unitQuestions.filter(
                  (q) => q.topic.toLowerCase().trim() === topic.name.toLowerCase().trim()
                );
                if (topicQuestions.length === 0) return null;

                const displayedSubtopics = Array.from(topic.subtopicsMap.values());

                return (
                  <div key={topic.name} className="space-y-4 pl-3">
                    <h3 className="text-base font-bold text-gray-900 border-b border-gray-400 pb-1">
                      TOPIC: {topic.name} ({topicQuestions.length} Qs)
                    </h3>

                    {/* Subtopics */}
                    {displayedSubtopics.map((subtopic) => {
                      const subtopicQuestions = topicQuestions.filter(
                        (q) =>
                          q.subtopic.toLowerCase().trim() ===
                          subtopic.toLowerCase().trim()
                      );
                      if (subtopicQuestions.length === 0) return null;

                      return (
                        <div key={subtopic} className="space-y-4 pl-4 border-l-2 border-gray-300">
                          <h4 className="text-sm font-semibold text-gray-800 italic">
                            Subtopic: {subtopic} ({subtopicQuestions.length} Qs)
                          </h4>

                          {/* Questions List */}
                          <div className="space-y-4">
                            {subtopicQuestions.map((q) => (
                              <div
                                key={q.id}
                                className="border border-gray-300 p-3 rounded text-xs space-y-2 bg-gray-50/50 break-inside-avoid"
                              >
                                <div className="flex justify-between items-center text-[11px] text-gray-600 border-b border-gray-200 pb-1">
                                  <span>
                                    <strong>[{q.paperName}]</strong> • {q.paperSubject} • {q.testDate}
                                  </span>
                                  <span>
                                    <strong>{q.questionNumber}</strong> {q.questionId ? `(ID: ${q.questionId})` : ""}
                                  </span>
                                </div>

                                {q.passageText && (
                                  <div className="bg-gray-100 p-2 rounded text-[11px] italic">
                                    <strong>Context:</strong> {q.passageText}
                                  </div>
                                )}

                                <div className="font-medium whitespace-pre-line text-gray-900">
                                  {q.questionText}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                                  {q.options.map((opt, oIdx) => (
                                    <div
                                      key={oIdx}
                                      className={`p-1.5 rounded text-[11px] border ${
                                        q.correctOption === (oIdx + 1).toString()
                                          ? "border-black font-bold bg-gray-200"
                                          : "border-gray-200"
                                      }`}
                                    >
                                      ({oIdx + 1}) {opt}
                                    </div>
                                  ))}
                                </div>

                                <div className="pt-1 text-[11px] text-gray-700 flex justify-between font-sans">
                                  <span>
                                    <strong>Correct Answer: Option ({q.correctOption || "-"})</strong>
                                  </span>
                                  {q.chosenOption && (
                                    <span>
                                      Candidate Marked: Option ({q.chosenOption})
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
