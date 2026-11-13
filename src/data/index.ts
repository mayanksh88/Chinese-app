import { HSKWord } from "../lib/types";
import { hsk1Words } from "./hsk1";
import { hsk2Words } from "./hsk2";

// Combine all HSK levels
export const allWords: HSKWord[] = [...hsk1Words, ...hsk2Words];

// Get words by HSK level
export function getWordsByLevel(level: number): HSKWord[] {
  return allWords.filter((w) => w.hskLevel === level);
}

// Get a word by ID
export function getWordById(id: string): HSKWord | undefined {
  return allWords.find((w) => w.id === id);
}

// Get words by IDs
export function getWordsByIds(ids: string[]): HSKWord[] {
  return ids.map((id) => getWordById(id)).filter((w): w is HSKWord => w !== undefined);
}

// Get total word count per level
export function getLevelWordCount(level: number): number {
  return allWords.filter((w) => w.hskLevel === level).length;
}

// HSK level info
export const hskLevels = [
  { level: 1, name: "HSK 1", description: "Beginner - Basic daily communication", totalWords: getLevelWordCount(1) },
  { level: 2, name: "HSK 2", description: "Elementary - Simple conversations", totalWords: getLevelWordCount(2) },
  { level: 3, name: "HSK 3", description: "Intermediate - Daily life & travel", totalWords: 0 },
  { level: 4, name: "HSK 4", description: "Intermediate - Broad topics", totalWords: 0 },
  { level: 5, name: "HSK 5", description: "Advanced - Reading Chinese newspapers", totalWords: 0 },
  { level: 6, name: "HSK 6", description: "Advanced - Fluent communication", totalWords: 0 },
];

// Get the next N words for a level that haven't been learned yet
export function getNextWordsToLearn(
  level: number,
  learnedIds: string[],
  count: number
): HSKWord[] {
  const levelWords = getWordsByLevel(level);
  const unlearned = levelWords.filter((w) => !learnedIds.includes(w.id));
  return unlearned.slice(0, count);
}

// Shuffle array helper (for quiz answers)
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get random wrong answers for quiz
export function getQuizOptions(
  correctWord: HSKWord,
  allWordsPool: HSKWord[],
  count: number = 4
): HSKWord[] {
  const wrong = allWordsPool.filter((w) => w.id !== correctWord.id);
  const shuffled = shuffleArray(wrong);
  const options = shuffleArray([correctWord, ...shuffled.slice(0, count - 1)]);
  return options;
}
