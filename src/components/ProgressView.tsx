"use client";

import { useState } from "react";
import { UserProgress } from "../lib/types";
import { getWordsByIds, getWordsByLevel, hskLevels } from "../data";

interface ProgressViewProps {
  progress: UserProgress;
  resetProgress: () => void;
}

export default function ProgressView({
  progress,
  resetProgress,
}: ProgressViewProps) {
  const learnedWords = getWordsByIds(progress.learnedWordIds);
  const masteredWords = getWordsByIds(progress.masteredWordIds);
  const currentLevelWords = getWordsByLevel(progress.currentHSKLevel);

  const learnedInLevel = currentLevelWords.filter((w) =>
    progress.learnedWordIds.includes(w.id)
  );
  const masteredInLevel = currentLevelWords.filter((w) =>
    progress.masteredWordIds.includes(w.id)
  );

  const masteryRate =
    learnedWords.length > 0
      ? Math.round((masteredWords.length / learnedWords.length) * 100)
      : 0;

  const recentScores = progress.quizScores.slice(-10);
  const avgScore =
    recentScores.length > 0
      ? Math.round(
          (recentScores.reduce((sum, s) => sum + s.correct / s.total, 0) /
            recentScores.length) *
            100
        )
      : 0;

  return (
    <div className="pt-6 space-y-6 slide-in">
      <h2 className="text-xl font-bold text-text-primary">Your Progress</h2>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatBox label="Total Learned" value={learnedWords.length} icon="📚" color="text-blue-600 bg-blue-50" />
        <StatBox label="Mastered" value={masteredWords.length} icon="🎓" color="text-green-600 bg-green-50" />
        <StatBox label="Mastery Rate" value={`${masteryRate}%`} icon="📈" color="text-purple-600 bg-purple-50" />
        <StatBox label="Day Streak" value={progress.currentStreak} icon="🔥" color="text-orange-600 bg-orange-50" />
      </div>

      {/* Current Level Progress */}
      <div className="bg-surface rounded-2xl p-5 shadow-sm border border-border">
        <h3 className="font-bold text-text-primary mb-4">
          HSK {progress.currentHSKLevel} Progress
        </h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-text-secondary">Words Learned</span>
              <span className="font-medium text-text-primary">
                {learnedInLevel.length} / {currentLevelWords.length}
              </span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700"
                style={{
                  width: `${currentLevelWords.length > 0 ? (learnedInLevel.length / currentLevelWords.length) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-text-secondary">Words Mastered</span>
              <span className="font-medium text-text-primary">
                {masteredInLevel.length} / {currentLevelWords.length}
              </span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-700"
                style={{
                  width: `${currentLevelWords.length > 0 ? (masteredInLevel.length / currentLevelWords.length) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quiz History */}
      <div className="bg-surface rounded-2xl p-5 shadow-sm border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-text-primary">Quiz History</h3>
          <span className="text-sm text-text-secondary">
            Avg: {avgScore}%
          </span>
        </div>

        {recentScores.length === 0 ? (
          <p className="text-text-secondary text-sm text-center py-6">
            No quizzes taken yet. Take your first quiz!
          </p>
        ) : (
          <div className="space-y-2">
            {recentScores.reverse().map((score, idx) => {
              const percentage = Math.round((score.correct / score.total) * 100);
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                      percentage >= 80
                        ? "bg-green-100 text-green-600"
                        : percentage >= 60
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {percentage}%
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">
                      {score.correct}/{score.total} correct
                    </p>
                    <p className="text-xs text-text-secondary">
                      HSK {score.hskLevel} · {score.date}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* All HSK Levels Overview */}
      <div className="bg-surface rounded-2xl p-5 shadow-sm border border-border">
        <h3 className="font-bold text-text-primary mb-4">All HSK Levels</h3>
        <div className="space-y-3">
          {hskLevels.map((level) => {
            const levelWords = getWordsByLevel(level.level);
            const learned = levelWords.filter((w) =>
              progress.learnedWordIds.includes(w.id)
            ).length;
            const mastered = levelWords.filter((w) =>
              progress.masteredWordIds.includes(w.id)
            ).length;
            const pct =
              levelWords.length > 0 ? (learned / levelWords.length) * 100 : 0;

            return (
              <div key={level.level} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-text-primary">
                    HSK {level.level}
                  </span>
                  <span className="text-text-secondary">
                    {learned}/{levelWords.length} learned · {mastered} mastered
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      level.level === progress.currentHSKLevel
                        ? "bg-gradient-to-r from-primary to-accent"
                        : "bg-gradient-to-r from-blue-400 to-blue-500"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Study Calendar */}
      <div className="bg-surface rounded-2xl p-5 shadow-sm border border-border">
        <h3 className="font-bold text-text-primary mb-4">Study Calendar</h3>
        <div className="grid grid-cols-7 gap-1.5">
          {getLast30Days().map((date) => {
            const studied = progress.studyDates.includes(date);
            const isToday = date === new Date().toISOString().split("T")[0];
            return (
              <div
                key={date}
                className={`aspect-square rounded-md flex items-center justify-center text-xs ${
                  studied
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-text-light"
                } ${isToday ? "ring-2 ring-primary ring-offset-1" : ""}`}
                title={date}
              >
                {parseInt(date.split("-")[2])}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs text-text-secondary">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <span>Studied</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
            <span>No study</span>
          </div>
        </div>
      </div>

      {/* Reset */}
      <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
        <h3 className="font-bold text-red-600 mb-2">Danger Zone</h3>
        <p className="text-sm text-red-500 mb-3">
          Reset all progress, streaks, and learned words. This cannot be undone.
        </p>
        <ResetButton onReset={resetProgress} />
      </div>
    </div>
  );
}

function ResetButton({ onReset }: { onReset: () => void }) {
  const [confirming, setConfirming] = useState(false);
  // We need useState from react
  return (
    <div>
      {!confirming ? (
        <button
          onClick={() => setConfirming(true)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-all"
        >
          Reset All Progress
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => {
              onReset();
              setConfirming(false);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-all"
          >
            Yes, Reset Everything
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="px-4 py-2 bg-gray-200 text-text-primary rounded-lg text-sm font-medium hover:bg-gray-300 transition-all"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

function StatBox({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}) {
  return (
    <div className="bg-surface rounded-xl p-4 shadow-sm border border-border">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-base mb-2 ${color}`}>
        {icon}
      </div>
      <p className="text-xl font-bold text-text-primary">{value}</p>
      <p className="text-xs text-text-secondary">{label}</p>
    </div>
  );
}

function getLast30Days(): string[] {
  const dates: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}


