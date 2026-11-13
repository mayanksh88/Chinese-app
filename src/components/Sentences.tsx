"use client";

import { useState } from "react";
import { View, SentenceCategory } from "../lib/types";
import {
  practicalSentences,
  categoryInfo,
  getSentencesByCategory,
  getAllCategories,
} from "../data/sentences";

interface SentencesProps {
  setView: (view: View) => void;
}

export default function Sentences({ setView }: SentencesProps) {
  const [selectedCategory, setSelectedCategory] = useState<SentenceCategory | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = getAllCategories();
  const filteredSentences = selectedCategory
    ? getSentencesByCategory(selectedCategory)
    : searchQuery
    ? practicalSentences.filter(
        (s) =>
          s.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.pinyin.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.chinese.includes(searchQuery)
      )
    : practicalSentences;

  if (selectedCategory) {
    const catInfo = categoryInfo[selectedCategory];
    const sentences = getSentencesByCategory(selectedCategory);

    return (
      <div className="pt-6 slide-in">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setSelectedCategory(null)}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 text-text-secondary hover:bg-gray-200 transition-all"
          >
            ←
          </button>
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${catInfo.color} flex items-center justify-center text-lg`}>
            {catInfo.icon}
          </div>
          <div>
            <h2 className="text-lg font-bold text-text-primary">{catInfo.label}</h2>
            <p className="text-xs text-text-secondary">{catInfo.description}</p>
          </div>
        </div>

        {/* Sentence cards */}
        <div className="space-y-3">
          {sentences.map((sentence) => {
            const isExpanded = expandedId === sentence.id;
            return (
              <div
                key={sentence.id}
                className="bg-surface rounded-xl border border-border overflow-hidden transition-all hover:shadow-md"
              >
                {/* Main content */}
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      {/* Chinese */}
                      <div className="flex items-center gap-2 mb-1">
                        <p className="hanzi-text text-xl font-bold text-text-primary">
                          {sentence.chinese}
                        </p>
                        <button
                          onClick={() => speakText(sentence.chinese)}
                          className="text-primary hover:scale-110 transition-transform text-sm"
                        >
                          🔊
                        </button>
                      </div>
                      {/* Pinyin */}
                      <p className="text-sm text-text-secondary mb-1.5">
                        {sentence.pinyin}
                      </p>
                      {/* English */}
                      <p className="text-sm font-medium text-text-primary">
                        {sentence.english}
                      </p>
                      {/* Situation badge */}
                      {sentence.situation && (
                        <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 rounded-md">
                          <span className="text-xs text-text-light">💡</span>
                          <span className="text-xs text-text-secondary">
                            {sentence.situation}
                          </span>
                        </div>
                      )}
                    </div>
                    {/* HSK badge */}
                    <div className="flex-shrink-0 px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-md">
                      HSK {sentence.hskLevel}
                    </div>
                  </div>

                  {/* Expand button */}
                  {sentence.breakdown && (
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : sentence.id)}
                      className="mt-3 text-xs text-primary font-medium hover:underline"
                    >
                      {isExpanded ? "▲ Hide breakdown" : "▼ Word-by-word breakdown"}
                    </button>
                  )}
                </div>

                {/* Breakdown */}
                {isExpanded && sentence.breakdown && (
                  <div className="px-4 pb-4 fade-in">
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      {sentence.breakdown.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 pb-2 border-b border-gray-200 last:border-0 last:pb-0"
                        >
                          <span className="hanzi-text text-lg font-bold text-text-primary w-16">
                            {item.word}
                          </span>
                          <span className="text-xs text-text-secondary w-24">
                            {item.pinyin}
                          </span>
                          <span className="text-sm text-text-primary flex-1">
                            {item.meaning}
                          </span>
                          <button
                            onClick={() => speakText(item.word)}
                            className="text-text-light hover:text-primary transition-colors text-xs"
                          >
                            🔊
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Category selection view
  return (
    <div className="pt-6 slide-in">
      <h2 className="text-xl font-bold text-text-primary mb-2">Practical Sentences</h2>
      <p className="text-text-secondary text-sm mb-4">
        Ready-to-use Chinese sentences for real-life situations.
      </p>

      {/* Search bar */}
      <div className="relative mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search sentences... (e.g. 'how much', 'where')"
          className="w-full px-4 py-3 pl-10 bg-surface border border-border rounded-xl text-sm text-text-primary placeholder:text-text-light focus:outline-none focus:border-primary/40 transition-all"
        />
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-light text-sm">
          🔍
        </span>
      </div>

      {/* Search results */}
      {searchQuery ? (
        <div className="space-y-3">
          <p className="text-sm text-text-secondary">
            {filteredSentences.length} result(s)
          </p>
          {filteredSentences.map((sentence) => {
            const catInfo = categoryInfo[sentence.category];
            return (
              <div
                key={sentence.id}
                className="bg-surface rounded-xl border border-border p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs">{catInfo.icon}</span>
                  <span className="text-xs text-text-light">{catInfo.label}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="hanzi-text text-lg font-bold text-text-primary">
                    {sentence.chinese}
                  </p>
                  <button
                    onClick={() => speakText(sentence.chinese)}
                    className="text-primary hover:scale-110 transition-transform text-sm"
                  >
                    🔊
                  </button>
                </div>
                <p className="text-xs text-text-secondary mb-1">{sentence.pinyin}</p>
                <p className="text-sm text-text-primary">{sentence.english}</p>
              </div>
            );
          })}
          {filteredSentences.length === 0 && (
            <p className="text-center text-text-secondary text-sm py-8">
              No sentences found. Try a different search.
            </p>
          )}
        </div>
      ) : (
        /* Category grid */
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => {
            const info = categoryInfo[cat];
            const count = getSentencesByCategory(cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="bg-surface rounded-xl border border-border p-4 text-left hover:shadow-md hover:border-primary/20 transition-all group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform`}
                >
                  {info.icon}
                </div>
                <p className="font-semibold text-text-primary text-sm">{info.label}</p>
                <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">
                  {info.description}
                </p>
                <p className="text-xs text-text-light mt-1">{count} sentences</p>
              </button>
            );
          })}
        </div>
      )}

      <button
        onClick={() => setView("dashboard")}
        className="mt-6 text-sm text-text-secondary hover:text-text-primary transition-colors"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}

function speakText(text: string) {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.75;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
}
