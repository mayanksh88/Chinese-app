"use client";

import { View, UserProgress } from "../lib/types";
import { hskLevels, getWordsByLevel, getLevelWordCount } from "../data";
import { useState } from "react";

interface DashboardProps {
  progress: UserProgress;
  setView: (view: View) => void;
  setDailyGoal: (goal: number) => void;
  setCurrentHSKLevel: (level: 1 | 2 | 3 | 4 | 5 | 6) => void;
}

export default function Dashboard({
  progress,
  setView,
  setDailyGoal,
  setCurrentHSKLevel,
}: DashboardProps) {
  const [showLevelSelector, setShowLevelSelector] = useState(false);
  const [showGoalSelector, setShowGoalSelector] = useState(false);

  const todayCount = progress.wordsLearnedToday.length;
  const dailyGoal = progress.dailyGoal;
  const dailyProgress = Math.min((todayCount / dailyGoal) * 100, 100);

  const currentLevelWords = getWordsByLevel(progress.currentHSKLevel);
  const learnedInLevel = currentLevelWords.filter((w) =>
    progress.learnedWordIds.includes(w.id)
  ).length;
  const levelProgress =
    currentLevelWords.length > 0
      ? (learnedInLevel / currentLevelWords.length) * 100
      : 0;

  const masteredCount = progress.masteredWordIds.length;
  const totalLearned = progress.learnedWordIds.length;

  const recentScores = progress.quizScores.slice(-5);
  const avgScore =
    recentScores.length > 0
      ? Math.round(
          (recentScores.reduce((sum, s) => sum + s.correct / s.total, 0) /
            recentScores.length) *
            100
        )
      : 0;

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return "早上好";
    if (hour < 18) return "下午好";
    return "晚上好";
  })();

  return (
    <div className="space-y-6 pt-6 slide-in">
      {/* Greeting */}
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
          <span className="hanzi-text text-primary">{greeting}</span> · Good{" "}
          {new Date().getHours() < 12
            ? "morning"
            : new Date().getHours() < 18
            ? "afternoon"
            : "evening"}
          !
        </h1>
        <p className="text-text-secondary mt-1 text-sm">
          Let&apos;s learn {dailyGoal} new words today
        </p>
      </div>

      {/* Daily Goal Card */}
      <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/80 text-sm font-medium">Today&apos;s Goal</p>
            <p className="text-3xl font-bold mt-1">
              {todayCount}{" "}
              <span className="text-white/60 text-xl">/ {dailyGoal}</span>
            </p>
            <p className="text-white/70 text-sm mt-1">words learned today</p>
          </div>
          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="34"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="6"
              />
              <circle
                cx="40"
                cy="40"
                r="34"
                fill="none"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 34}`}
                strokeDashoffset={`${2 * Math.PI * 34 * (1 - dailyProgress / 100)}`}
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold">{Math.round(dailyProgress)}%</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setView("learn")}
            disabled={todayCount >= dailyGoal}
            className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${
              todayCount >= dailyGoal
                ? "bg-white/20 text-white/60 cursor-not-allowed"
                : "bg-white text-primary hover:bg-white/90"
            }`}
          >
            {todayCount >= dailyGoal ? "✓ Goal Complete!" : "Start Learning →"}
          </button>
          <button
            onClick={() => setShowGoalSelector(!showGoalSelector)}
            className="px-3 py-2.5 rounded-lg bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition-all"
          >
            ⚙️
          </button>
        </div>

        {showGoalSelector && (
          <div className="mt-3 flex gap-2 flex-wrap">
            {[5, 10, 15, 20].map((g) => (
              <button
                key={g}
                onClick={() => {
                  setDailyGoal(g);
                  setShowGoalSelector(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  dailyGoal === g
                    ? "bg-white text-primary"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {g} words/day
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          icon="🔥"
          label="Day Streak"
          value={progress.currentStreak}
          subtitle={`Best: ${progress.longestStreak}`}
          color="bg-orange-50 text-orange-600"
        />
        <StatCard
          icon="📚"
          label="Words Learned"
          value={totalLearned}
          subtitle={`${masteredCount} mastered`}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          icon="✍️"
          label="Quiz Average"
          value={`${avgScore}%`}
          subtitle={`${progress.quizScores.length} quizzes`}
          color="bg-green-50 text-green-600"
        />
        <StatCard
          icon="📅"
          label="Study Days"
          value={progress.totalStudyDays}
          subtitle="total days"
          color="bg-purple-50 text-purple-600"
        />
      </div>

      {/* HSK Level Progress */}
      <div className="bg-surface rounded-2xl p-5 shadow-sm border border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-text-primary">Your HSK Level</h2>
          <button
            onClick={() => setShowLevelSelector(!showLevelSelector)}
            className="text-sm text-primary font-medium hover:underline"
          >
            Change Level
          </button>
        </div>

        {showLevelSelector && (
          <div className="mb-4 grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setCurrentHSKLevel(lvl as 1 | 2 | 3 | 4 | 5 | 6);
                  setShowLevelSelector(false);
                }}
                className={`py-2 rounded-lg text-sm font-bold transition-all ${
                  progress.currentHSKLevel === lvl
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-text-secondary hover:bg-gray-200"
                }`}
              >
                HSK {lvl}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg">
            {progress.currentHSKLevel}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-text-primary">
              HSK Level {progress.currentHSKLevel}
            </p>
            <p className="text-sm text-text-secondary">
              {hskLevels.find((l) => l.level === progress.currentHSKLevel)?.description}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Progress</span>
            <span className="font-medium text-text-primary">
              {learnedInLevel} / {currentLevelWords.length} words
            </span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-700"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <QuickAction
          icon="📖"
          title="Learn Words"
          subtitle={`${Math.max(dailyGoal - todayCount, 0)} remaining today`}
          onClick={() => setView("learn")}
          color="from-blue-500 to-blue-600"
        />
        <QuickAction
          icon="💬"
          title="Practical Phrases"
          subtitle="Real-life sentences"
          onClick={() => setView("sentences")}
          color="from-pink-500 to-rose-500"
        />
        <QuickAction
          icon="🃏"
          title="Flashcards"
          subtitle="Review & memorize"
          onClick={() => setView("flashcards")}
          color="from-purple-500 to-purple-600"
        />
        <QuickAction
          icon="✍️"
          title="Take Quiz"
          subtitle="Test your knowledge"
          onClick={() => setView("quiz")}
          color="from-green-500 to-green-600"
        />
      </div>

      {/* HSK Level Roadmap */}
      <div className="bg-surface rounded-2xl p-5 shadow-sm border border-border">
        <h2 className="font-bold text-text-primary mb-4">HSK Roadmap</h2>
        <div className="space-y-2">
          {hskLevels.map((level) => {
            const levelWords = getLevelWordCount(level.level);
            const learnedInThisLevel = getWordsByLevel(level.level).filter((w) =>
              progress.learnedWordIds.includes(w.id)
            ).length;
            const isCurrent = level.level === progress.currentHSKLevel;
            const isUnlocked = level.level <= progress.currentHSKLevel;

            return (
              <div
                key={level.level}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isCurrent
                    ? "bg-primary/5 border border-primary/20"
                    : isUnlocked
                    ? "bg-gray-50"
                    : "opacity-50"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                    isCurrent
                      ? "bg-primary text-white"
                      : isUnlocked
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {isUnlocked && !isCurrent ? "✓" : level.level}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text-primary text-sm">
                    {level.name}
                  </p>
                  <p className="text-xs text-text-secondary truncate">
                    {level.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-text-primary">
                    {learnedInThisLevel}/{levelWords}
                  </p>
                  <p className="text-xs text-text-light">words</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  subtitle,
  color,
}: {
  icon: string;
  label: string;
  value: string | number;
  subtitle: string;
  color: string;
}) {
  return (
    <div className="bg-surface rounded-xl p-4 shadow-sm border border-border">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-2 ${color}`}
      >
        {icon}
      </div>
      <p className="text-2xl font-bold text-text-primary">{value}</p>
      <p className="text-xs text-text-secondary font-medium">{label}</p>
      <p className="text-xs text-text-light mt-0.5">{subtitle}</p>
    </div>
  );
}

function QuickAction({
  icon,
  title,
  subtitle,
  onClick,
  color,
}: {
  icon: string;
  title: string;
  subtitle: string;
  onClick: () => void;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-surface rounded-xl p-4 shadow-sm border border-border hover:shadow-md hover:border-primary/20 transition-all text-left group"
    >
      <div
        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-lg mb-2 group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <p className="font-semibold text-text-primary text-sm">{title}</p>
      <p className="text-xs text-text-secondary mt-0.5">{subtitle}</p>
    </button>
  );
}
