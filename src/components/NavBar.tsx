"use client";

import { View, UserProgress } from "../lib/types";

interface NavBarProps {
  view: View;
  setView: (view: View) => void;
  progress: UserProgress;
}

const navItems: { view: View; label: string; icon: string }[] = [
  { view: "dashboard", label: "Home", icon: "🏠" },
  { view: "learn", label: "Learn", icon: "📖" },
  { view: "sentences", label: "Phrases", icon: "💬" },
  { view: "flashcards", label: "Cards", icon: "🃏" },
  { view: "quiz", label: "Quiz", icon: "✍️" },
  { view: "progress", label: "Stats", icon: "📊" },
];

export default function NavBar({ view, setView, progress }: NavBarProps) {
  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => setView("dashboard")}
            className="flex items-center gap-2 transition-transform hover:scale-105"
          >
            <span className="text-2xl font-bold text-primary hanzi-text">学</span>
            <span className="text-lg font-semibold text-text-primary hidden sm:inline">
              Learn Chinese
            </span>
          </button>

          {/* Streak indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 text-orange-600 text-sm font-medium">
            <span>🔥</span>
            <span>{progress.currentStreak}</span>
            <span className="hidden sm:inline text-orange-400">day streak</span>
          </div>
        </div>

        {/* Navigation tabs */}
        <nav className="flex items-center gap-1 pb-2 -mb-px overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => setView(item.view)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                view === item.view
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-secondary hover:bg-gray-100 hover:text-text-primary"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
