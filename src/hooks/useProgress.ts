"use client";

import { useState, useEffect, useCallback } from "react";
import { UserProgress } from "../lib/types";

const STORAGE_KEY = "chinese-learning-progress";
const TODAY = () => new Date().toISOString().split("T")[0];

const defaultProgress: UserProgress = {
  learnedWordIds: [],
  masteredWordIds: [],
  quizScores: [],
  currentStreak: 0,
  longestStreak: 0,
  lastStudyDate: "",
  totalStudyDays: 0,
  currentHSKLevel: 1,
  wordsLearnedToday: [],
  dailyGoal: 10,
  studyDates: [],
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as UserProgress;
        // Check if it's a new day - reset daily words
        const today = TODAY();
        if (parsed.lastStudyDate !== today) {
          parsed.wordsLearnedToday = [];
        }
        setProgress({ ...defaultProgress, ...parsed });
      }
    } catch (e) {
      console.error("Failed to load progress:", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever progress changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error("Failed to save progress:", e);
    }
  }, [progress, isLoaded]);

  // Mark a word as learned
  const markWordLearned = useCallback((wordId: string) => {
    setProgress((prev) => {
      const today = TODAY();
      const isNewDay = prev.lastStudyDate !== today;

      // Update streak
      let currentStreak = prev.currentStreak;
      if (isNewDay) {
        const yesterday = new Date(Date.now() - 86400000)
          .toISOString()
          .split("T")[0];
        if (prev.lastStudyDate === yesterday) {
          currentStreak = prev.currentStreak + 1;
        } else {
          currentStreak = 1;
        }
      } else if (currentStreak === 0) {
        currentStreak = 1;
      }

      const newStudyDates = isNewDay && !prev.studyDates.includes(today)
        ? [...prev.studyDates, today]
        : prev.studyDates;

      return {
        ...prev,
        learnedWordIds: prev.learnedWordIds.includes(wordId)
          ? prev.learnedWordIds
          : [...prev.learnedWordIds, wordId],
        wordsLearnedToday: prev.wordsLearnedToday.includes(wordId)
          ? prev.wordsLearnedToday
          : [...prev.wordsLearnedToday, wordId],
        lastStudyDate: today,
        currentStreak,
        longestStreak: Math.max(prev.longestStreak, currentStreak),
        totalStudyDays: newStudyDates.length,
        studyDates: newStudyDates,
      };
    });
  }, []);

  // Mark a word as mastered (correct in quiz)
  const markWordMastered = useCallback((wordId: string) => {
    setProgress((prev) => ({
      ...prev,
      masteredWordIds: prev.masteredWordIds.includes(wordId)
        ? prev.masteredWordIds
        : [...prev.masteredWordIds, wordId],
    }));
  }, []);

  // Record a quiz score
  const recordQuizScore = useCallback(
    (total: number, correct: number, hskLevel: number) => {
      setProgress((prev) => ({
        ...prev,
        quizScores: [
          ...prev.quizScores,
          {
            date: TODAY(),
            total,
            correct,
            hskLevel,
          },
        ],
      }));
    },
    []
  );

  // Set daily goal
  const setDailyGoal = useCallback((goal: number) => {
    setProgress((prev) => ({ ...prev, dailyGoal: goal }));
  }, []);

  // Set current HSK level
  const setCurrentHSKLevel = useCallback((level: 1 | 2 | 3 | 4 | 5 | 6) => {
    setProgress((prev) => ({ ...prev, currentHSKLevel: level }));
  }, []);

  // Reset all progress
  const resetProgress = useCallback(() => {
    setProgress({ ...defaultProgress });
  }, []);

  return {
    progress,
    isLoaded,
    markWordLearned,
    markWordMastered,
    recordQuizScore,
    setDailyGoal,
    setCurrentHSKLevel,
    resetProgress,
  };
}
