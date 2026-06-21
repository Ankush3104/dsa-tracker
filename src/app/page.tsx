'use client';
import { useStore, calculateStreak, getTotalProblemCount } from '@/lib/store';
import { motion } from 'framer-motion';
import { differenceInDays, subDays, format } from 'date-fns';
import { CheckCircle2, Clock, Target, AlertTriangle, Flame, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

const QUOTES = [
  "Consistency beats intensity.",
  "Small progress every day compounds.",
  "Don't count days, make days count.",
  "The secret of getting ahead is getting started.",
  "Focus on the process, not the outcome.",
  "Hard problems build strong programmers.",
  "Every line of code is a step forward.",
];

const CircularProgress = ({ value, size = 120, stroke = '#10b981' }: { value: number; size?: number; stroke?: string }) => {
  const r = size / 2 - 10;
  const circ = r * 2 * Math.PI;
  const offset = circ - (Math.min(value, 100) / 100) * circ;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} stroke={stroke} strokeWidth="8" fill="none"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{Math.round(value)}%</span>
      </div>
    </div>
  );
};

const GoalBar = ({ label, current, target, color }: { label: string; current: number; target: number; color: string }) => {
  const pct = Math.min((current / Math.max(target, 1)) * 100, 100);
  return (
    <div>
      <div className="flex justify-between mb-1 text-sm">
        <span className="text-white/70">{label} <span className="text-white/40">({current}/{target})</span></span>
        <span className="font-semibold">{Math.round(pct)}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
        <motion.div
          className="h-2.5 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { topics, problems, startDate, dailyLogs, pomodoroSessions, getTodayRevisions } = useStore();

  const totalProblems = getTotalProblemCount(topics);
  const solved = problems.length;
  const completedTopics = topics.filter(t => t.status === 'Completed').length;
  const overallPct = (solved / Math.max(totalProblems, 1)) * 100;

  const daysPassed    = differenceInDays(new Date(), new Date(startDate));
  const daysRemaining = Math.max(0, 180 - daysPassed);

  const today     = new Date().toISOString().split('T')[0];
  const solvedToday  = problems.filter(p => p.dateSolved === today).length;
  const solvedWeek   = problems.filter(p => new Date(p.dateSolved) >= subDays(new Date(), 7)).length;
  const solvedMonth  = problems.filter(p => new Date(p.dateSolved) >= subDays(new Date(), 30)).length;

  const revisions = getTodayRevisions();
  const { currentStreak } = calculateStreak(dailyLogs);

  const recentProblems = useMemo(() =>
    [...problems].sort((a, b) => new Date(b.dateSolved).getTime() - new Date(a.dateSolved).getTime()).slice(0, 4),
    [problems]
  );

  const todayQuote = QUOTES[new Date().getDate() % QUOTES.length];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap gap-4 justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-white/50 text-sm mt-1">{format(new Date(), 'EEEE, dd MMMM yyyy')}</p>
        </div>
        <div className="glass px-5 py-3 rounded-xl max-w-sm">
          <p className="text-xs text-white/40 uppercase tracking-widest">Today's Thought</p>
          <p className="text-emerald-400 font-medium italic text-sm mt-1">"{todayQuote}"</p>
        </div>
      </div>

      {/* Stat pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Day', value: daysPassed, sub: 'of 180', icon: <Clock size={18} />, color: 'text-orange-400' },
          { label: 'Streak', value: currentStreak, sub: 'days 🔥', icon: <Flame size={18} />, color: 'text-red-400' },
          { label: 'Pomodoros', value: pomodoroSessions, sub: 'sessions', icon: <Target size={18} />, color: 'text-cyan-400' },
          { label: 'Favorites', value: problems.filter(p => p.isFavorite).length, sub: 'problems ⭐', icon: <Star size={18} />, color: 'text-yellow-400' },
        ].map(stat => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass p-4 flex flex-col gap-1">
            <div className={`flex items-center gap-1 text-xs font-medium ${stat.color}`}>{stat.icon} {stat.label}</div>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-xs text-white/40">{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Revision Banner */}
      {revisions.length > 0 && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass border border-orange-500/30 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400"><AlertTriangle size={22} /></div>
            <div>
              <p className="font-semibold text-orange-400">Revision Due Today</p>
              <p className="text-sm text-white/60">{revisions.length} problem{revisions.length > 1 ? 's' : ''} scheduled for spaced repetition.</p>
            </div>
          </div>
          <Link href="/problems" className="shrink-0 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg text-sm transition-colors">
            Start Revisions →
          </Link>
        </motion.div>
      )}

      {/* Empty state hint */}
      {problems.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass border border-emerald-500/20 p-6 text-center space-y-3">
          <p className="text-2xl">🚀</p>
          <p className="font-semibold text-lg">Ready to start your DSA journey?</p>
          <p className="text-white/50 text-sm">Log your first solved problem to unlock all the progress insights on this dashboard.</p>
          <Link href="/problems" className="inline-flex items-center gap-2 mt-2 px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors text-sm">
            Add First Problem <ArrowRight size={16} />
          </Link>
        </motion.div>
      )}

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall progress */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">Overall Progress</h3>
          <CircularProgress value={overallPct} />
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold">{solved} <span className="text-white/40 text-lg">/ {totalProblems}</span></p>
            <p className="text-white/50 text-sm mt-0.5">Problems Solved</p>
          </div>
          <div className="mt-4 w-full text-xs text-white/40 flex justify-between">
            <span>Topics done: {completedTopics}/{topics.length}</span>
            <span>{daysRemaining}d left</span>
          </div>
        </motion.div>

        {/* Goal tracker */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-6 space-y-5">
          <h3 className="text-lg font-semibold flex items-center gap-2"><Target size={18} /> Goals</h3>
          <GoalBar label="Today"   current={solvedToday}  target={2}  color="#10b981" />
          <GoalBar label="Week"    current={solvedWeek}   target={14} color="#06b6d4" />
          <GoalBar label="Month"   current={solvedMonth}  target={60} color="#f97316" />
          <GoalBar label="Overall" current={solved}       target={totalProblems} color="#a855f7" />
        </motion.div>

        {/* Topic overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass p-6">
          <h3 className="text-lg font-semibold mb-4">Topic Overview</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {topics.map(t => {
              const pct = (t.solvedProblems / t.totalProblems) * 100;
              return (
                <div key={t.id}>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-white/70">{t.name}</span>
                    <span className="text-white/40">{t.solvedProblems}/{t.totalProblems}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      className="h-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <Link href="/roadmap" className="mt-4 flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
            View full roadmap <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>

      {/* Recent solutions */}
      {recentProblems.length > 0 && (
        <div className="glass p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Solutions</h3>
            <Link href="/problems" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1">View all <ArrowRight size={14} /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recentProblems.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                className="flex items-center justify-between gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                <div className="min-w-0">
                  <p className="font-medium truncate">{p.name}</p>
                  <p className="text-xs text-white/40 mt-0.5">{p.topic} · {p.dateSolved}</p>
                </div>
                <span className={`shrink-0 px-2 py-1 rounded-full text-xs font-semibold ${
                  p.difficulty === 'Easy'   ? 'bg-emerald-500/20 text-emerald-400' :
                  p.difficulty === 'Medium' ? 'bg-orange-500/20  text-orange-400'  :
                                              'bg-red-500/20     text-red-400'}`}>
                  {p.difficulty}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
