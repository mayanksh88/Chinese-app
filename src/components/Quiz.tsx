"use client";

import { useState, useMemo } from "react";
import { View, UserProgress, HSKWord } from "../lib/types";
import {
  getWordsByLevel,
  getWordsByIds,
  shuffleArray,
  getQuizOptions,
} from "../data";

interface QuizProps {
  progress: UserProgress;
  markWordMastered: (wordId: string) => void;
  recordQuizScore: (total: number, correct: number, hskLevel: number) => void;
  setView: (view: View) => void;
}

type QuizType = "hanzi-to-meaning" | "meaning-to-hanzi" | "pinyin-to-meaning";

const QUIZ_LENGTH = 10;

export default function Quiz({
  progress,
  markWordMastered,
  recordQuizScore,
  setView,
}: QuizProps) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizType, setQuizType] = useState<QuizType>("hanzi-to-meaning");
  const [quizPool, setQuizPool] = useState<HSKWord[]>([]);
  const [questions, setQuestions] = useState<
    { word: HSKWord; options: HSKWord[] }[]
  >([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredWords, setAnsweredWords] = useState<
    { id: string; correct: boolean }[]
  >([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const learnedWords = getWordsByIds(progress.learnedWordIds);

  const startQuiz = (type: QuizType, pool: HSKWord[]) => {
    if (pool.length < 4) return;

    const selectedWords = shuffleArray(pool).slice(0, Math.min(QUIZ_LENGTH, pool.length));
    const quizQuestions = selectedWords.map((word) => ({
      word,
      options: getQuizOptions(word, pool, 4),
    }));

    setQuizType(type);
    setQuizPool(pool);
    setQuestions(quizQuestions);
    setCurrentQ(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectCount(0);
    setAnsweredWords([]);
    setQuizComplete(false);
    setQuizStarted(true);
  };

  const handleAnswer = (optionId: string) => {
    if (showResult) return;
    setSelectedAnswer(optionId);
    setShowResult(true);

    const currentQuestion = questions[currentQ];
    const isCorrect = optionId === currentQuestion.word.id;

    if (isCorrect) {
      setCorrectCount(correctCount + 1);
      markWordMastered(currentQuestion.word.id);
    }

    setAnsweredWords([
      ...answeredWords,
      { id: currentQuestion.word.id, correct: isCorrect },
    ]);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      recordQuizScore(questions.length, correctCount, progress.currentHSKLevel);
      setQuizComplete(true);
    }
  };

  if (!quizStarted) {
    const quizTypes: {
      type: QuizType;
      title: string;
      description: string;
      icon: string;
      color: string;
    }[] = [
      {
        type: "hanzi-to-meaning",
        title: "Character → Meaning",
        description: "See the Chinese character, choose the English meaning",
        icon: "🀄",
        color: "from-red-500 to-red-600",
      },
      {
        type: "meaning-to-hanzi",
        title: "Meaning → Character",
        description: "See the English meaning, choose the right character",
        icon: "🔤",
        color: "from-blue-500 to-blue-600",
      },
      {
        type: "pinyin-to-meaning",
        title: "Pinyin → Meaning",
        description: "See the pinyin, choose the correct meaning",
        icon: "📢",
        color: "from-green-500 to-green-600",
      },
    ];

    const quizSources: {
      title: string;
      subtitle: string;
      pool: HSKWord[];
      color: string;
      icon: string;
    }[] = [
      {
        title: "Learned Words Quiz",
        subtitle: `${learnedWords.length} words available`,
        pool: learnedWords,
        color: "bg-blue-100 text-blue-600",
        icon: "📚",
      },
      {
        title: `HSK ${progress.currentHSKLevel} Full Quiz`,
        subtitle: `${getWordsByLevel(progress.currentHSKLevel).length} words available`,
        pool: getWordsByLevel(progress.currentHSKLevel),
        color: "bg-green-100 text-green-600",
        icon: "🎯",
      },
    ];

    return (
      <div className="pt-6 slide-in">
        <h2 className="text-xl font-bold text-text-primary mb-2">Quiz Mode</h2>
        <p className="text-text-secondary text-sm mb-6">
          Test your knowledge. Each quiz has {QUIZ_LENGTH} questions.
        </p>

        {/* Choose word source */}
        <h3 className="text-sm font-bold text-text-secondary mb-3">
          1. Choose word source
        </h3>
        <div className="space-y-2 mb-6">
          {quizSources.map((source, idx) => (
            <button
              key={idx}
              onClick={() => setQuizPool(source.pool)}
              disabled={source.pool.length < 4}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                quizPool === source.pool
                  ? "border-primary bg-primary/5"
                  : source.pool.length < 4
                  ? "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                  : "border-border bg-surface hover:border-primary/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg ${source.color} flex items-center justify-center text-lg`}
                >
                  {source.icon}
                </div>
                <div>
                  <p className="font-semibold text-text-primary text-sm">
                    {source.title}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {source.pool.length < 4
                      ? "Need at least 4 words to start"
                      : source.subtitle}
                  </p>
                </div>
                {quizPool === source.pool && (
                  <span className="ml-auto text-primary text-lg">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Choose quiz type */}
        <h3 className="text-sm font-bold text-text-secondary mb-3">
          2. Choose quiz type
        </h3>
        <div className="space-y-2 mb-6">
          {quizTypes.map((qt) => (
            <button
              key={qt.type}
              onClick={() => setQuizType(qt.type)}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                quizType === qt.type
                  ? "border-primary bg-primary/5"
                  : "border-border bg-surface hover:border-primary/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${qt.color} text-white flex items-center justify-center text-lg`}
                >
                  {qt.icon}
                </div>
                <div>
                  <p className="font-semibold text-text-primary text-sm">
                    {qt.title}
                  </p>
                  <p className="text-xs text-text-secondary">{qt.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => startQuiz(quizType, quizPool)}
          disabled={quizPool.length < 4}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            quizPool.length < 4
              ? "bg-gray-100 text-text-light cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary-dark shadow-lg"
          }`}
        >
          Start Quiz →
        </button>

        <button
          onClick={() => setView("dashboard")}
          className="mt-4 text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  if (quizComplete) {
    const accuracy = Math.round((correctCount / questions.length) * 100);
    const grade =
      accuracy >= 90 ? "A" : accuracy >= 80 ? "B" : accuracy >= 70 ? "C" : accuracy >= 60 ? "D" : "F";

    return (
      <div className="pt-8 text-center slide-in">
        <div className="text-6xl mb-4">
          {accuracy >= 80 ? "🏆" : accuracy >= 60 ? "👍" : "💪"}
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Quiz Complete!
        </h2>
        <div className="inline-block bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl px-8 py-6 my-6 shadow-lg">
          <p className="text-5xl font-bold">{correctCount}/{questions.length}</p>
          <p className="text-white/80 text-sm mt-1">Grade: {grade}</p>
        </div>

        {/* Review answers */}
        <div className="text-left max-w-md mx-auto mb-6">
          <h3 className="text-sm font-bold text-text-secondary mb-3">
            Review
          </h3>
          <div className="space-y-2">
            {answeredWords.map((aw, idx) => {
              const word = questions[idx].word;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2 p-2 rounded-lg ${
                    aw.correct ? "bg-green-50" : "bg-red-50"
                  }`}
                >
                  <span className={aw.correct ? "text-green-600" : "text-red-500"}>
                    {aw.correct ? "✓" : "✗"}
                  </span>
                  <span className="hanzi-text text-text-primary font-medium">
                    {word.hanzi}
                  </span>
                  <span className="text-text-secondary text-sm">
                    {word.meaning}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setQuizStarted(false)}
            className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all"
          >
            🔄 New Quiz
          </button>
          <button
            onClick={() => setView("dashboard")}
            className="px-6 py-3 bg-gray-100 text-text-primary rounded-xl font-medium hover:bg-gray-200 transition-all"
          >
            🏠 Dashboard
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQ];

  // Determine what to show and what the options represent
  const getPrompt = () => {
    switch (quizType) {
      case "hanzi-to-meaning":
        return { display: question.word.hanzi, label: "What does this mean?", isHanzi: true };
      case "meaning-to-hanzi":
        return { display: question.word.meaning, label: "Which character means this?", isHanzi: false };
      case "pinyin-to-meaning":
        return { display: question.word.pinyin, label: "What does this pinyin mean?", isHanzi: false };
    }
  };

  const getOptionDisplay = (word: HSKWord) => {
    switch (quizType) {
      case "hanzi-to-meaning":
      case "pinyin-to-meaning":
        return word.meaning;
      case "meaning-to-hanzi":
        return word.hanzi;
    }
  };

  const prompt = getPrompt();

  return (
    <div className="pt-6 slide-in">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary font-medium">
            Question {currentQ + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-green-600">
            ✓ {correctCount} correct
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-surface rounded-2xl shadow-lg border border-border p-6 mb-4">
        <p className="text-sm text-text-secondary mb-4 text-center">
          {prompt.label}
        </p>
        <div className="text-center py-6">
          {prompt.isHanzi ? (
            <div className="flex flex-col items-center gap-2">
              <div className="hanzi-text text-6xl font-bold text-text-primary">
                {prompt.display}
              </div>
              {quizType === "hanzi-to-meaning" && (
                <button
                  onClick={() => speakWord(question.word.hanzi)}
                  className="mt-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-all"
                >
                  🔊 Listen
                </button>
              )}
            </div>
          ) : (
            <div className="text-3xl font-bold text-text-primary">
              {prompt.display}
            </div>
          )}
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.id;
          const isCorrect = option.id === question.word.id;
          const showCorrect = showResult && isCorrect;
          const showWrong = showResult && isSelected && !isCorrect;

          return (
            <button
              key={option.id}
              onClick={() => handleAnswer(option.id)}
              disabled={showResult}
              className={`p-4 rounded-xl border-2 font-medium transition-all text-left ${
                showCorrect
                  ? "border-green-500 bg-green-50 text-green-700"
                  : showWrong
                  ? "border-red-500 bg-red-50 text-red-600 shake"
                  : isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-surface hover:border-primary/30 hover:bg-gray-50"
              } ${!showResult && "cursor-pointer"}`}
            >
              <div className="flex items-center gap-2">
                {quizType === "meaning-to-hanzi" && (
                  <span className="hanzi-text text-lg">{getOptionDisplay(option)}</span>
                )}
                <span>{getOptionDisplay(option)}</span>
                {showCorrect && <span className="ml-auto">✓</span>}
                {showWrong && <span className="ml-auto">✗</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Next button */}
      {showResult && (
        <button
          onClick={handleNext}
          className="mt-6 w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition-all shadow-lg bounce-in"
        >
          {currentQ < questions.length - 1 ? "Next Question →" : "See Results →"}
        </button>
      )}
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
