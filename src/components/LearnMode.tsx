"use client";

import { useState, useMemo } from "react";
import { View, UserProgress, HSKWord } from "../lib/types";
import { getNextWordsToLearn, getWordsByLevel, allWords } from "../data";

interface LearnModeProps {
  progress: UserProgress;
  markWordLearned: (wordId: string) => void;
  setView: (view: View) => void;
}

export default function LearnMode({
  progress,
  markWordLearned,
  setView,
}: LearnModeProps) {
  const wordsToLearn = useMemo(() => {
    const remaining = progress.dailyGoal - progress.wordsLearnedToday.length;
    if (remaining <= 0) return [];

    // Get next unlearned words for current HSK level
    let words = getNextWordsToLearn(
      progress.currentHSKLevel,
      progress.learnedWordIds,
      remaining
    );

    // If not enough words in current level, supplement from next levels
    if (words.length < remaining) {
      const extraNeeded = remaining - words.length;
      const learnedAndNew = [...progress.learnedWordIds, ...words.map((w) => w.id)];
      const otherWords = allWords
        .filter(
          (w) =>
            !learnedAndNew.includes(w.id) &&
            w.hskLevel > progress.currentHSKLevel
        )
        .slice(0, extraNeeded);
      words = [...words, ...otherWords];
    }

    return words;
  }, [progress]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [completedWords, setCompletedWords] = useState<string[]>([]);

  if (wordsToLearn.length === 0) {
    return (
      <div className="pt-10 text-center slide-in">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Daily Goal Complete!
        </h2>
        <p className="text-text-secondary mb-6">
          You&apos;ve learned {progress.dailyGoal} words today. Great job!
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setView("flashcards")}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-all"
          >
            🃏 Review Flashcards
          </button>
          <button
            onClick={() => setView("quiz")}
            className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all"
          >
            ✍️ Take a Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentWord = wordsToLearn[currentIndex];
  const isLastWord = currentIndex === wordsToLearn.length - 1;

  const handleNext = () => {
    if (!completedWords.includes(currentWord.id)) {
      markWordLearned(currentWord.id);
      setCompletedWords([...completedWords, currentWord.id]);
    }
    if (isLastWord) {
      setCurrentIndex(0);
      setShowMeaning(false);
    } else {
      setCurrentIndex(currentIndex + 1);
      setShowMeaning(false);
    }
  };

  return (
    <div className="pt-6 slide-in">
      {/* Progress header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-text-primary">
            Today&apos;s New Words
          </h2>
          <span className="text-sm text-text-secondary font-medium">
            {currentIndex + 1} / {wordsToLearn.length}
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
            style={{
              width: `${((currentIndex + 1) / wordsToLearn.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Word card */}
      <div
        key={currentWord.id}
        className="bg-surface rounded-2xl shadow-lg border border-border overflow-hidden bounce-in"
      >
        {/* Top section: Chinese character */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-4">
            HSK {currentWord.hskLevel} · {currentWord.partOfSpeech}
          </div>
          <div className="hanzi-text text-7xl sm:text-8xl font-bold text-text-primary mb-3">
            {currentWord.hanzi}
          </div>
          <div className="text-2xl text-text-secondary font-medium mb-2">
            {currentWord.pinyin}
          </div>
          <button
            onClick={() => speakWord(currentWord.hanzi)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-all"
          >
            🔊 Listen
          </button>
        </div>

        {/* Meaning section */}
        <div className="p-6 border-t border-border">
          {!showMeaning ? (
            <button
              onClick={() => setShowMeaning(true)}
              className="w-full py-4 bg-gray-100 text-text-secondary rounded-xl font-medium hover:bg-gray-200 transition-all"
            >
              👁️ Tap to reveal meaning
            </button>
          ) : (
            <div className="space-y-4 fade-in">
              <div>
                <p className="text-xs text-text-light uppercase tracking-wide font-medium mb-1">
                  Meaning
                </p>
                <p className="text-xl font-bold text-text-primary">
                  {currentWord.meaning}
                </p>
              </div>

              {currentWord.example && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-text-light uppercase tracking-wide font-medium mb-2">
                    Example
                  </p>
                  <p className="hanzi-text text-lg text-text-primary mb-1">
                    {currentWord.example.chinese}
                  </p>
                  <p className="text-sm text-text-secondary mb-1">
                    {currentWord.example.pinyin}
                  </p>
                  <p className="text-sm text-text-secondary italic">
                    {currentWord.example.english}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="p-6 pt-0 flex gap-3">
          <button
            onClick={() => {
              if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
                setShowMeaning(false);
              }
            }}
            disabled={currentIndex === 0}
            className={`px-4 py-3 rounded-xl font-medium transition-all ${
              currentIndex === 0
                ? "bg-gray-100 text-text-light cursor-not-allowed"
                : "bg-gray-100 text-text-primary hover:bg-gray-200"
            }`}
          >
            ← Prev
          </button>
          <button
            onClick={handleNext}
            disabled={!showMeaning}
            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
              !showMeaning
                ? "bg-gray-100 text-text-light cursor-not-allowed"
                : isLastWord
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-primary text-white hover:bg-primary-dark"
            }`}
          >
            {isLastWord ? "✓ Finish & Review" : "Got it! Next →"}
          </button>
        </div>
      </div>

      {/* Word list overview */}
      <div className="mt-6">
        <h3 className="text-sm font-bold text-text-secondary mb-3">
          Today&apos;s Word List
        </h3>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {wordsToLearn.map((word, idx) => (
            <div
              key={word.id}
              className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all ${
                idx === currentIndex
                  ? "bg-primary text-white ring-2 ring-primary ring-offset-2"
                  : completedWords.includes(word.id)
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-text-light"
              }`}
            >
              {completedWords.includes(word.id) ? "✓" : idx + 1}
            </div>
          ))}
        </div>
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
