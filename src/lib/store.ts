import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { differenceInDays } from 'date-fns';

export type Status = 'Not Started' | 'In Progress' | 'Completed';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Source = 'Striver A2Z' | 'Apna College' | 'LeetCode' | 'GeeksForGeeks' | 'Codeforces';
export type Mood = '😊' | '😐' | '😔';

export interface Problem {
  id: string;
  name: string;
  topic: string;
  difficulty: Difficulty;
  source: Source;
  dateSolved: string;
  revisionCount: number;
  isFavorite: boolean;
  notes: string;
  url?: string; // Optional link to problem
}

export interface Topic {
  id: string;
  name: string;
  category: 'Basics' | 'Intermediate' | 'Advanced';
  status: Status;
  totalProblems: number;
  solvedProblems: number;
  lastStudied: string | null;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  revisionCount: number;
}

export interface DayLog {
  date: string;
  hoursStudied: number;
  problemsSolved: number;
  notes: string;
  mood: Mood;
  isCompleted: boolean;
}

export const TOPICS: Topic[] = [
  { id: 't1',  name: 'Time Complexity',          category: 'Basics',        status: 'Not Started', totalProblems: 10,  solvedProblems: 0, lastStudied: null, easySolved: 0, mediumSolved: 0, hardSolved: 0, revisionCount: 0 },
  { id: 't2',  name: 'Arrays',                   category: 'Basics',        status: 'Not Started', totalProblems: 30,  solvedProblems: 0, lastStudied: null, easySolved: 0, mediumSolved: 0, hardSolved: 0, revisionCount: 0 },
  { id: 't3',  name: 'Sorting',                  category: 'Basics',        status: 'Not Started', totalProblems: 15,  solvedProblems: 0, lastStudied: null, easySolved: 0, mediumSolved: 0, hardSolved: 0, revisionCount: 0 },
  { id: 't4',  name: 'Binary Search',             category: 'Basics',        status: 'Not Started', totalProblems: 20,  solvedProblems: 0, lastStudied: null, easySolved: 0, mediumSolved: 0, hardSolved: 0, revisionCount: 0 },
  { id: 't5',  name: 'Strings',                  category: 'Intermediate',  status: 'Not Started', totalProblems: 15,  solvedProblems: 0, lastStudied: null, easySolved: 0, mediumSolved: 0, hardSolved: 0, revisionCount: 0 },
  { id: 't6',  name: 'Recursion & Backtracking', category: 'Intermediate',  status: 'Not Started', totalProblems: 25,  solvedProblems: 0, lastStudied: null, easySolved: 0, mediumSolved: 0, hardSolved: 0, revisionCount: 0 },
  { id: 't7',  name: 'Linked List',              category: 'Intermediate',  status: 'Not Started', totalProblems: 20,  solvedProblems: 0, lastStudied: null, easySolved: 0, mediumSolved: 0, hardSolved: 0, revisionCount: 0 },
  { id: 't8',  name: 'Stacks & Queues',          category: 'Intermediate',  status: 'Not Started', totalProblems: 15,  solvedProblems: 0, lastStudied: null, easySolved: 0, mediumSolved: 0, hardSolved: 0, revisionCount: 0 },
  { id: 't9',  name: 'Trees & BST',              category: 'Advanced',      status: 'Not Started', totalProblems: 30,  solvedProblems: 0, lastStudied: null, easySolved: 0, mediumSolved: 0, hardSolved: 0, revisionCount: 0 },
  { id: 't10', name: 'Graphs',                   category: 'Advanced',      status: 'Not Started', totalProblems: 40,  solvedProblems: 0, lastStudied: null, easySolved: 0, mediumSolved: 0, hardSolved: 0, revisionCount: 0 },
  { id: 't11', name: 'Dynamic Programming',       category: 'Advanced',      status: 'Not Started', totalProblems: 50,  solvedProblems: 0, lastStudied: null, easySolved: 0, mediumSolved: 0, hardSolved: 0, revisionCount: 0 },
  { id: 't12', name: 'Heaps & Priority Queue',   category: 'Advanced',      status: 'Not Started', totalProblems: 15,  solvedProblems: 0, lastStudied: null, easySolved: 0, mediumSolved: 0, hardSolved: 0, revisionCount: 0 },
];

// Spaced repetition revision intervals (in days)
export const REVISION_INTERVALS = [1, 3, 7, 15, 30];

// Helper: recalculate topic stats from the current problems list
export const syncTopicsWithProblems = (topics: Topic[], problems: Problem[]): Topic[] => {
  return topics.map(topic => {
    const tp = problems.filter(p => p.topic === topic.name);
    const solved     = tp.length;
    const easy       = tp.filter(p => p.difficulty === 'Easy').length;
    const medium     = tp.filter(p => p.difficulty === 'Medium').length;
    const hard       = tp.filter(p => p.difficulty === 'Hard').length;

    let status: Status = 'Not Started';
    if (solved >= topic.totalProblems) status = 'Completed';
    else if (solved > 0)               status = 'In Progress';

    const dates = tp.map(p => p.dateSolved).filter(Boolean).sort();
    const lastStudied = dates.length > 0 ? dates[dates.length - 1] : null;

    return { ...topic, solvedProblems: solved, easySolved: easy, mediumSolved: medium, hardSolved: hard, status, lastStudied };
  });
};

interface AppState {
  startDate: string;
  topics: Topic[];
  problems: Problem[];
  dailyLogs: Record<string, DayLog>;
  topicNotes: Record<string, string>;
  pomodoroSessions: number;
  a2zProgress: Record<string, { solved: boolean; bookmarked: boolean; notes: string }>;

  // Actions
  addProblem:        (problem: Problem)                    => void;
  updateProblem:     (id: string, data: Partial<Problem>)  => void;
  deleteProblem:     (id: string)                          => void;
  saveTopicNotes:    (topicId: string, notes: string)      => void;
  logDay:            (log: DayLog)                         => void;
  incrementPomodoro: ()                                    => void;
  resetAllData:      ()                                    => void;
  markA2ZProblem:    (id: string, data: Partial<{ solved: boolean; bookmarked: boolean; notes: string }>) => void;
  resetA2ZProgress:  ()                                    => void;

  // Computed helpers
  getTodayRevisions: () => Problem[];
  getTopicById:      (id: string) => Topic | undefined;
}

const FRESH_STATE = {
  startDate: new Date().toISOString(),
  topics: TOPICS,
  problems: [] as Problem[],
  dailyLogs: {} as Record<string, DayLog>,
  topicNotes: {} as Record<string, string>,
  pomodoroSessions: 0,
  a2zProgress: {} as Record<string, { solved: boolean; bookmarked: boolean; notes: string }>,
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...FRESH_STATE,

      addProblem: (problem) => set(state => {
        const problems = [...state.problems, problem];
        return { problems, topics: syncTopicsWithProblems(state.topics, problems) };
      }),

      updateProblem: (id, data) => set(state => {
        const problems = state.problems.map(p => p.id === id ? { ...p, ...data } : p);
        return { problems, topics: syncTopicsWithProblems(state.topics, problems) };
      }),

      deleteProblem: (id) => set(state => {
        const problems = state.problems.filter(p => p.id !== id);
        return { problems, topics: syncTopicsWithProblems(state.topics, problems) };
      }),

      saveTopicNotes: (topicId, notes) => set(state => ({
        topicNotes: { ...state.topicNotes, [topicId]: notes },
      })),

      logDay: (log) => set(state => ({
        dailyLogs: { ...state.dailyLogs, [log.date]: log },
      })),

      incrementPomodoro: () => set(state => ({ pomodoroSessions: state.pomodoroSessions + 1 })),

      resetAllData: () => set({ ...FRESH_STATE, startDate: new Date().toISOString() }),

      markA2ZProblem: (id, data) => set(state => {
        const current = state.a2zProgress[id] ?? { solved: false, bookmarked: false, notes: '' };
        return {
          a2zProgress: {
            ...state.a2zProgress,
            [id]: { ...current, ...data },
          },
        };
      }),

      resetA2ZProgress: () => set({ a2zProgress: {} }),

      getTodayRevisions: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return get().problems.filter(p => {
          if (p.revisionCount >= REVISION_INTERVALS.length) return false;
          const days = differenceInDays(today, new Date(p.dateSolved));
          return days >= REVISION_INTERVALS[p.revisionCount];
        });
      },

      getTopicById: (id) => get().topics.find(t => t.id === id),
    }),
    {
      name: 'dsa-tracker-v2', // new key clears old persisted data
    }
  )
);

// ─── Utility functions ────────────────────────────────────────────────────────

export const calculateStreak = (logs: Record<string, DayLog>) => {
  const dates = Object.keys(logs).sort();
  let currentStreak = 0;
  let longestStreak = 0;
  let temp = 0;

  for (let i = 0; i < dates.length; i++) {
    if (logs[dates[i]].isCompleted) {
      temp++;
      if (i === dates.length - 1) currentStreak = temp;
    } else {
      longestStreak = Math.max(longestStreak, temp);
      temp = 0;
    }
  }
  longestStreak = Math.max(longestStreak, temp);
  return { currentStreak, longestStreak };
};

export const getTotalProblemCount = (topics: Topic[]) =>
  topics.reduce((s, t) => s + t.totalProblems, 0);
