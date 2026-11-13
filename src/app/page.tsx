"use client";

import { useState } from "react";
import { View } from "../lib/types";
import { useProgress } from "../hooks/useProgress";
import Dashboard from "../components/Dashboard";
import LearnMode from "../components/LearnMode";
import Flashcards from "../components/Flashcards";
import Quiz from "../components/Quiz";
import ProgressView from "../components/ProgressView";
import Sentences from "../components/Sentences";
import NavBar from "../components/NavBar";

export default function Home() {
  const [view, setView] = useState<View>("dashboard");
  const {
    progress,
    isLoaded,
    markWordLearned,
    markWordMastered,
    recordQuizScore,
    setDailyGoal,
    setCurrentHSKLevel,
    resetProgress,
  } = useProgress();

  if (!isLoaded) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-5xl mb-3 hanzi-text">学</div>
          <p className="text-text-secondary text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col min-h-screen">
      <NavBar view={view} setView={setView} progress={progress} />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          {view === "dashboard" && (
            <Dashboard
              progress={progress}
              setView={setView}
              setDailyGoal={setDailyGoal}
              setCurrentHSKLevel={setCurrentHSKLevel}
            />
          )}
          {view === "learn" && (
            <LearnMode
              progress={progress}
              markWordLearned={markWordLearned}
              setView={setView}
            />
          )}
          {view === "flashcards" && (
            <Flashcards progress={progress} setView={setView} />
          )}
          {view === "quiz" && (
            <Quiz
              progress={progress}
              markWordMastered={markWordMastered}
              recordQuizScore={recordQuizScore}
              setView={setView}
            />
          )}
          {view === "progress" && (
            <ProgressView progress={progress} resetProgress={resetProgress} />
          )}
          {view === "sentences" && (
            <Sentences setView={setView} />
          )}
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-text-light border-t border-border">
        学中文 — Learn Chinese Daily · HSK 1 → HSK 6
      </footer>
    </div>
  );
}
