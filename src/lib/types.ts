// Core type definitions for the Chinese learning app

export interface HSKWord {
  id: string;
  hanzi: string;          // Chinese character(s)
  pinyin: string;         // Pronunciation guide with tone marks
  meaning: string;        // English translation
  partOfSpeech: string;   // noun, verb, adjective, etc.
  hskLevel: 1 | 2 | 3 | 4 | 5 | 6;
  example?: {
    chinese: string;
    pinyin: string;
    english: string;
  };
}

export interface UserProgress {
  learnedWordIds: string[];        // Words the user has studied
  masteredWordIds: string[];       // Words the user got correct in quizzes 3+ times
  quizScores: QuizScore[];
  currentStreak: number;           // Days in a row
  longestStreak: number;
  lastStudyDate: string;           // ISO date string (YYYY-MM-DD)
  totalStudyDays: number;
  currentHSKLevel: 1 | 2 | 3 | 4 | 5 | 6;
  wordsLearnedToday: string[];     // Word IDs learned today
  dailyGoal: number;               // Target words per day (default 10)
  studyDates: string[];            // All dates the user studied
}

export interface QuizScore {
  date: string;
  total: number;
  correct: number;
  hskLevel: number;
}

// Practical sentence for everyday communication
export interface PracticalSentence {
  id: string;
  chinese: string;          // Full Chinese sentence
  pinyin: string;           // Pinyin with tone marks
  english: string;          // English translation
  category: SentenceCategory;
  hskLevel: 1 | 2 | 3 | 4 | 5 | 6;
  situation?: string;       // When/where to use this
  breakdown?: {             // Word-by-word breakdown for learning
    word: string;
    pinyin: string;
    meaning: string;
  }[];
}

export type SentenceCategory =
  | "shopping"      // prices, buying things
  | "directions"    // where, location
  | "time"          // how long, when
  | "travel"        // arrival, transport
  | "greetings"     // hello, basic interaction
  | "food"          // ordering, restaurants
  | "emergency"     // help, urgent
  | "daily";        // misc everyday phrases

export type StudyMode = "flashcard" | "quiz" | "browse";

export type View =
  | "dashboard"
  | "learn"
  | "flashcards"
  | "quiz"
  | "progress"
  | "sentences";
