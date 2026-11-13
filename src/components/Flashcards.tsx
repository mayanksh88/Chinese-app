"use client";

import { useState, useMemo, useEffect } from "react";
import { View, UserProgress } from "../lib/types";
import { getWordsByIds, getWordsByLevel, shuffleArray } from "../data";

interface FlashcardsProps {
  progress: UserProgress;
  setView: (view: View) => void;
}

export default function Flashcards({ progress, setView }: FlashcardsProps) {
  const [flashcardMode, setFlashcardMode] = useState<"learned" | "level" | null>(null);
  const [cards, setCards] = useState<ReturnType<typeof getWordsByIds>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);
  const [unknownCount, setUnknownCount] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);

  const learnedWords = getWordsByIds(progress.learnedWordIds);

  const startSession = (mode: "learned" | "level") => {
    let wordPool;
    if (mode === "learned") {
      wordPool = learnedWords;
    } else {
      wordPool = getWordsByLevel(progress.currentHSKLevel);
    }

    if (wordPool.length === 0) return;

    setCards(shuffleArray(wordPool));
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCount(0);
    setUnknownCount(0);
    setSessionComplete(false);
    setFlashcardMode(mode);
  };

  const handleKnown = () => {
    setKnownCount(knownCount + 1);
    nextCard();
  };

  const handleUnknown = () => {
    setUnknownCount(unknownCount + 1);
    nextCard();
  };

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setSessionComplete(true);
      }
    }, 200);
  };

  // Reset flip when changing cards
  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  if (flashcardMode === null) {
    return (
      <div className="pt-6 slide-in">
        <h2 className="text-xl font-bold text-text-primary mb-2">Flashcards</h2>
        <p className="text-text-secondary text-sm mb-6">
          Choose a set of words to review with interactive flashcards.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => startSession("learned")}
            disabled={learnedWords.length === 0}
            className={`w-full p-5 rounded-2xl border text-left transition-all ${
              learnedWords.length === 0
                ? "bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed"
                : "bg-surface border-border hover:border-primary/30 hover:shadow-md"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
                📚
              </div>
              <div className="flex-1">
                <p className="font-semibold text-text-primary">
                  Review Learned Words
                </p>
                <p className="text-sm text-text-secondary">
                  {learnedWords.length} words you&apos;ve studied
                </p>
              </div>
              <span className="text-text-light">→</span>
            </div>
          </button>

          <button
            onClick={() => startSession("level")}
            className="w-full p-5 rounded-2xl border border-border bg-surface hover:border-primary/30 hover:shadow-md text-left transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
                🎯
              </div>
              <div className="flex-1">
                <p className="font-semibold text-text-primary">
                  All HSK {progress.currentHSKLevel} Words
                </p>
                <p className="text-sm text-text-secondary">
                  {getWordsByLevel(progress.currentHSKLevel).length} words in this level
                </p>
              </div>
              <span className="text-text-light">→</span>
            </div>
          </button>
        </div>

        <button
          onClick={() => setView("dashboard")}
          className="mt-6 text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  if (sessionComplete) {
    const total = cards.length;
    const accuracy = Math.round((knownCount / total) * 100);
    return (
      <div className="pt-10 text-center slide-in">
        <div className="text-6xl mb-4">
          {accuracy >= 80 ? "🎉" : accuracy >= 50 ? "💪" : "📚"}
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Session Complete!
        </h2>
        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto my-6">
          <div className="bg-green-50 rounded-xl p-3">
            <p className="text-2xl font-bold text-green-600">{knownCount}</p>
            <p className="text-xs text-green-600">Known</p>
          </div>
          <div className="bg-red-50 rounded-xl p-3">
            <p className="text-2xl font-bold text-red-500">{unknownCount}</p>
            <p className="text-xs text-red-500">Review</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-3">
            <p className="text-2xl font-bold text-blue-600">{accuracy}%</p>
            <p className="text-xs text-blue-600">Accuracy</p>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => startSession(flashcardMode)}
            className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all"
          >
            🔄 Practice Again
          </button>
          <button
            onClick={() => setFlashcardMode(null)}
            className="px-6 py-3 bg-gray-100 text-text-primary rounded-xl font-medium hover:bg-gray-200 transition-all"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="pt-6 slide-in">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => setFlashcardMode(null)}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            ← Exit
          </button>
          <span className="text-sm text-text-secondary font-medium">
            {currentIndex + 1} / {cards.length}
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div
        className="flashcard-container h-72 sm:h-80 mb-6 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`flashcard ${isFlipped ? "flipped" : ""}`}>
          {/* Front: Chinese */}
          <div className="flashcard-face bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6">
            <p className="text-white/60 text-sm mb-2">Tap to flip</p>
            <div className="hanzi-text text-7xl sm:text-8xl font-bold text-white mb-3">
              {currentCard.hanzi}
            </div>
            <div className="text-xl text-white/80 font-medium">
              {currentCard.pinyin}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                speakWord(currentCard.hanzi);
              }}
              className="mt-4 px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 transition-all"
            >
              🔊 Listen
            </button>
          </div>

          {/* Back: Meaning */}
          <div className="flashcard-face flashcard-back bg-surface rounded-2xl shadow-lg border border-border flex flex-col items-center justify-center p-6">
            <p className="text-text-light text-sm mb-2">Tap to flip back</p>
            <p className="text-2xl font-bold text-text-primary text-center mb-3">
              {currentCard.meaning}
            </p>
            <div className="inline-block px-3 py-1 bg-gray-100 text-text-secondary text-xs font-medium rounded-full mb-4">
              {currentCard.partOfSpeech}
            </div>
            {currentCard.example && (
              <div className="text-center max-w-sm">
                <p className="hanzi-text text-base text-text-primary mb-1">
                  {currentCard.example.chinese}
                </p>
                <p className="text-xs text-text-secondary italic">
                  {currentCard.example.english}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleUnknown}
          className="flex-1 py-4 bg-red-50 text-red-500 rounded-xl font-medium hover:bg-red-100 transition-all"
        >
          😅 Need Review
        </button>
        <button
          onClick={handleKnown}
          className="flex-1 py-4 bg-green-50 text-green-600 rounded-xl font-medium hover:bg-green-100 transition-all"
        >
          ✓ I Know It
        </button>
      </div>

      {/* Mini stats */}
      <div className="mt-4 flex justify-center gap-4 text-sm">
        <span className="text-green-600">✓ {knownCount} known</span>
        <span className="text-red-500">× {unknownCount} review</span>
      </div>
    </div>
  );
}

function speakWord(text: string) {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.8;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
}
