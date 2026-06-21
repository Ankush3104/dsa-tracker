'use client';
import { useStore } from '@/lib/store';
import { A2Z_SHEET, ALL_A2Z_PROBLEMS, TOTAL_A2Z_PROBLEMS, type A2ZDifficulty, type A2ZStep, type A2ZProblem } from '@/lib/a2z-data';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useCallback } from 'react';
import {
  ChevronDown, ChevronRight, CheckCircle2, Circle, Bookmark, BookmarkCheck,
  ExternalLink, Search, StickyNote, X, RotateCcw, Trophy, Filter,
} from 'lucide-react';

// ─── Types & constants ────────────────────────────────────────────────────────
type DiffFilter  = 'All' | A2ZDifficulty;
type SolvedFilter = 'All' | 'Solved' | 'Unsolved' | 'Bookmarked';

const DIFF_COLORS: Record<A2ZDifficulty, string> = {
  Easy:   'bg-emerald-500/20 text-emerald-400 border-emerald-500/10',
  Medium: 'bg-orange-500/20  text-orange-400  border-orange-500/10',
  Hard:   'bg-red-500/20     text-red-400     border-red-500/10',
};

const STEP_COLORS = [
  'from-emerald-500 to-teal-500',
  'from-cyan-500    to-blue-500',
  'from-violet-500  to-purple-500',
  'from-orange-500  to-red-500',
  'from-pink-500    to-rose-500',
  'from-yellow-500  to-amber-500',
  'from-lime-500    to-green-500',
  'from-sky-500     to-indigo-500',
  'from-fuchsia-500 to-pink-500',
  'from-teal-500    to-cyan-500',
  'from-amber-500   to-orange-500',
  'from-indigo-500  to-violet-500',
  'from-rose-500    to-pink-500',
  'from-green-500   to-emerald-500',
  'from-blue-500    to-sky-500',
  'from-purple-500  to-fuchsia-500',
  'from-red-500     to-rose-500',
  'from-slate-500   to-gray-500',
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProblemRow({ prob, onMark, onNote, progress }: {
  prob: A2ZProblem;
  progress: { solved: boolean; bookmarked: boolean; notes: string };
  onMark: (id: string, data: object) => void;
  onNote: (prob: A2ZProblem) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      className={`group flex items-center gap-3 px-4 py-2.5 border-b border-white/5 last:border-0 transition-colors ${
        progress.solved ? 'bg-emerald-500/5' : 'hover:bg-white/3'
      }`}
    >
      {/* Solved toggle */}
      <button
        onClick={() => onMark(prob.id, { solved: !progress.solved })}
        title={progress.solved ? 'Mark unsolved' : 'Mark solved'}
        className="shrink-0 transition-transform active:scale-90"
      >
        {progress.solved
          ? <CheckCircle2 size={20} className="text-emerald-400" />
          : <Circle size={20} className="text-white/20 group-hover:text-white/40 transition-colors" />
        }
      </button>

      {/* Name */}
      <span className={`flex-1 text-sm font-medium min-w-0 truncate transition-colors ${
        progress.solved ? 'text-white/40 line-through' : ''
      }`}>
        {prob.name}
      </span>

      {/* Hint / note tag */}
      {prob.note && (
        <span className="hidden lg:block text-xs text-white/25 truncate max-w-[180px] shrink-0">
          {prob.note}
        </span>
      )}

      {/* Difficulty */}
      <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold border ${DIFF_COLORS[prob.difficulty]}`}>
        {prob.difficulty}
      </span>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Bookmark */}
        <button
          onClick={() => onMark(prob.id, { bookmarked: !progress.bookmarked })}
          title={progress.bookmarked ? 'Remove bookmark' : 'Bookmark'}
          className={`p-1.5 rounded transition-colors ${
            progress.bookmarked ? 'text-yellow-400' : 'text-white/20 hover:text-yellow-400/70 opacity-0 group-hover:opacity-100'
          }`}
        >
          {progress.bookmarked
            ? <BookmarkCheck size={15} />
            : <Bookmark size={15} />
          }
        </button>

        {/* Notes */}
        <button
          onClick={() => onNote(prob)}
          title="Add notes"
          className={`p-1.5 rounded transition-colors opacity-0 group-hover:opacity-100 ${
            progress.notes ? 'text-cyan-400 opacity-100' : 'text-white/20 hover:text-cyan-400/70'
          }`}
        >
          <StickyNote size={15} />
        </button>

        {/* LeetCode link */}
        {prob.leetcode && (
          <a
            href={prob.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded text-white/20 hover:text-white/60 transition-colors opacity-0 group-hover:opacity-100"
            title="Open on LeetCode"
          >
            <ExternalLink size={15} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

function SubStepBlock({ sub, a2zProgress, onMark, onNote, filterDiff, filterSolved }: {
  sub: A2ZStep['subSteps'][number];
  a2zProgress: Record<string, { solved: boolean; bookmarked: boolean; notes: string }>;
  onMark: (id: string, data: object) => void;
  onNote: (prob: A2ZProblem) => void;
  filterDiff: DiffFilter;
  filterSolved: SolvedFilter;
}) {
  const [open, setOpen] = useState(false);

  const visible = useMemo(() => sub.problems.filter(p => {
    if (filterDiff !== 'All' && p.difficulty !== filterDiff) return false;
    const prog = a2zProgress[p.id] ?? { solved: false, bookmarked: false, notes: '' };
    if (filterSolved === 'Solved'     && !prog.solved)      return false;
    if (filterSolved === 'Unsolved'   && prog.solved)        return false;
    if (filterSolved === 'Bookmarked' && !prog.bookmarked)   return false;
    return true;
  }), [sub.problems, filterDiff, filterSolved, a2zProgress]);

  const solvedCount = sub.problems.filter(p => a2zProgress[p.id]?.solved).length;
  const pct = (solvedCount / sub.problems.length) * 100;

  if (visible.length === 0 && (filterDiff !== 'All' || filterSolved !== 'All')) return null;

  return (
    <div className="border border-white/5 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center gap-3 p-3 text-left hover:bg-white/3 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <ChevronRight size={15} className={`shrink-0 text-white/30 transition-transform duration-200 ${open ? 'rotate-90' : ''}`} />
        <span className="flex-1 text-sm font-medium text-white/80">{sub.title}</span>
        <div className="flex items-center gap-3">
          <div className="w-20 bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div className="h-1.5 rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-xs text-white/40 tabular-nums w-14 text-right">{solvedCount}/{sub.problems.length}</span>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/5"
          >
            {visible.map(prob => (
              <ProblemRow
                key={prob.id}
                prob={prob}
                progress={a2zProgress[prob.id] ?? { solved: false, bookmarked: false, notes: '' }}
                onMark={onMark}
                onNote={onNote}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StepCard({ step, a2zProgress, onMark, onNote, filterDiff, filterSolved, colorClass }: {
  step: A2ZStep;
  a2zProgress: Record<string, { solved: boolean; bookmarked: boolean; notes: string }>;
  onMark: (id: string, data: object) => void;
  onNote: (prob: A2ZProblem) => void;
  filterDiff: DiffFilter;
  filterSolved: SolvedFilter;
  colorClass: string;
}) {
  const [open, setOpen] = useState(false);

  const totalProbs  = step.subSteps.reduce((s, sub) => s + sub.problems.length, 0);
  const solvedProbs = step.subSteps.reduce(
    (s, sub) => s + sub.problems.filter(p => a2zProgress[p.id]?.solved).length, 0
  );
  const pct = (solvedProbs / totalProbs) * 100;
  const isComplete = solvedProbs === totalProbs;

  return (
    <div className="glass overflow-hidden">
      {/* Step header */}
      <button
        className="w-full flex flex-wrap items-center gap-4 p-5 text-left hover:bg-white/2 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        {/* Step number badge */}
        <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm bg-gradient-to-br ${colorClass}`}>
          {step.stepNo}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-base truncate">{step.title}</h3>
            {isComplete && <Trophy size={16} className="text-yellow-400 shrink-0" />}
          </div>
          <p className="text-xs text-white/40 mt-0.5">{step.subSteps.length} sections · {totalProbs} problems</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <p className="text-base font-bold">{solvedProbs}<span className="text-white/30 font-normal text-sm">/{totalProbs}</span></p>
            <p className="text-xs text-white/40">{Math.round(pct)}% done</p>
          </div>
          <div className="w-24 bg-white/10 rounded-full h-2.5 overflow-hidden">
            <motion.div
              className={`h-2.5 rounded-full bg-gradient-to-r ${colorClass}`}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <ChevronDown size={18} className={`text-white/40 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Sub-steps */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-white/10 p-4 space-y-3 bg-black/20"
          >
            {step.subSteps.map(sub => (
              <SubStepBlock
                key={sub.id}
                sub={sub}
                a2zProgress={a2zProgress}
                onMark={onMark}
                onNote={onNote}
                filterDiff={filterDiff}
                filterSolved={filterSolved}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Notes Modal ──────────────────────────────────────────────────────────────
function NoteModal({ prob, initial, onSave, onClose }: {
  prob: A2ZProblem;
  initial: string;
  onSave: (notes: string) => void;
  onClose: () => void;
}) {
  const [val, setVal] = useState(initial);
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <motion.div initial={{ opacity: 0, scale: 0.93, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.93 }}
          className="w-full max-w-md bg-neutral-950/95 border border-white/10 rounded-2xl shadow-2xl p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-base">{prob.name}</h3>
              <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs border ${DIFF_COLORS[prob.difficulty]}`}>{prob.difficulty}</span>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors"><X size={18} /></button>
          </div>
          <textarea
            className="w-full bg-white/5 border border-white/10 focus:border-emerald-500 rounded-xl p-3 text-sm outline-none h-36 resize-none font-mono"
            placeholder="Approach, complexity, key insight..."
            value={val}
            onChange={e => setVal(e.target.value)}
            autoFocus
          />
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors">Cancel</button>
            <button onClick={() => { onSave(val); onClose(); }}
              className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-semibold transition-colors">
              Save Note
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function StriverSheet() {
  const { a2zProgress, markA2ZProblem, resetA2ZProgress } = useStore();

  const [search,      setSearch]      = useState('');
  const [filterDiff,  setFilterDiff]  = useState<DiffFilter>('All');
  const [filterSolved,setFilterSolved]= useState<SolvedFilter>('All');
  const [expandAll,   setExpandAll]   = useState(false);
  const [noteProb,    setNoteProb]    = useState<A2ZProblem | null>(null);

  const totalSolved     = useMemo(() => Object.values(a2zProgress).filter(p => p.solved).length, [a2zProgress]);
  const totalBookmarked = useMemo(() => Object.values(a2zProgress).filter(p => p.bookmarked).length, [a2zProgress]);
  const overallPct      = (totalSolved / TOTAL_A2Z_PROBLEMS) * 100;

  const handleMark = useCallback((id: string, data: object) => markA2ZProblem(id, data), [markA2ZProblem]);

  // Search results — flat list
  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return ALL_A2Z_PROBLEMS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.note?.toLowerCase().includes(q) ||
      p.subStepTitle.toLowerCase().includes(q)
    ).slice(0, 30);
  }, [search]);

  const visibleSteps = useMemo(() => {
    if (filterDiff === 'All' && filterSolved === 'All') return A2Z_SHEET;
    return A2Z_SHEET.filter(step =>
      step.subSteps.some(sub =>
        sub.problems.some(prob => {
          if (filterDiff !== 'All' && prob.difficulty !== filterDiff) return false;
          const prog = a2zProgress[prob.id];
          if (filterSolved === 'Solved'     && !prog?.solved)      return false;
          if (filterSolved === 'Unsolved'   && prog?.solved)        return false;
          if (filterSolved === 'Bookmarked' && !prog?.bookmarked)   return false;
          return true;
        })
      )
    );
  }, [filterDiff, filterSolved, a2zProgress]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Striver A2Z DSA Sheet</h1>
          <p className="text-white/50 text-sm mt-1">
            {TOTAL_A2Z_PROBLEMS} curated problems across 18 steps — your complete roadmap to DSA mastery.
          </p>
        </div>
        <button
          onClick={() => { if (confirm('Reset ALL A2Z progress? This cannot be undone.')) resetA2ZProgress(); }}
          className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-red-500/10 text-white/40 hover:text-red-400 rounded-lg text-sm transition-colors border border-white/5 hover:border-red-500/20"
        >
          <RotateCcw size={15} /> Reset Progress
        </button>
      </div>

      {/* Overall progress banner */}
      <div className="glass p-5">
        <div className="flex flex-wrap items-center gap-6 mb-3">
          <div>
            <p className="text-4xl font-bold">{totalSolved}<span className="text-white/30 text-2xl font-normal">/{TOTAL_A2Z_PROBLEMS}</span></p>
            <p className="text-white/40 text-sm">Problems Solved</p>
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="flex justify-between text-xs text-white/40">
              <span>Overall A2Z Progress</span>
              <span>{overallPct.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-3 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400"
                initial={{ width: 0 }}
                animate={{ width: `${overallPct}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            <div className="text-center">
              <p className="text-xl font-bold text-yellow-400">{totalBookmarked}</p>
              <p className="text-white/40 text-xs">Bookmarked</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-white/60">{TOTAL_A2Z_PROBLEMS - totalSolved}</p>
              <p className="text-white/40 text-xs">Remaining</p>
            </div>
          </div>
        </div>

        {/* Per-step mini-bars */}
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-2 mt-4">
          {A2Z_SHEET.map((step, i) => {
            const total  = step.subSteps.reduce((s, sub) => s + sub.problems.length, 0);
            const solved = step.subSteps.reduce((s, sub) => s + sub.problems.filter(p => a2zProgress[p.id]?.solved).length, 0);
            const pct = (solved / total) * 100;
            return (
              <div key={step.id} title={`Step ${step.stepNo}: ${step.title} (${solved}/${total})`} className="text-center">
                <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden mb-1">
                  <div className={`h-1 rounded-full bg-gradient-to-r ${STEP_COLORS[i % STEP_COLORS.length]}`} style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs text-white/30">{step.stepNo}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter bar */}
      <div className="glass p-4 flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search problems…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 pl-9 pr-4 py-2 rounded-lg border border-white/10 focus:border-emerald-500 outline-none text-sm"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Difficulty filter */}
        <div className="flex gap-1">
          {(['All', 'Easy', 'Medium', 'Hard'] as const).map(d => (
            <button key={d} onClick={() => setFilterDiff(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filterDiff === d ? 'bg-white/15 text-white' : 'text-white/40 hover:bg-white/5'}`}>
              {d}
            </button>
          ))}
        </div>

        {/* Solved filter */}
        <select
          value={filterSolved}
          onChange={e => setFilterSolved(e.target.value as SolvedFilter)}
          className="bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
        >
          <option value="All">All Problems</option>
          <option value="Solved">✓ Solved</option>
          <option value="Unsolved">○ Unsolved</option>
          <option value="Bookmarked">🔖 Bookmarked</option>
        </select>

        <div className="flex items-center gap-1 ml-auto text-xs text-white/40">
          <Filter size={13} /> {visibleSteps.length} steps visible
        </div>
      </div>

      {/* Search results panel */}
      <AnimatePresence>
        {search.trim() && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="glass overflow-hidden">
            <div className="p-3 border-b border-white/10 text-sm text-white/50">
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for &quot;{search}&quot;
            </div>
            {searchResults.length === 0 ? (
              <p className="p-6 text-center text-white/30 text-sm">No problems match your search.</p>
            ) : (
              searchResults.map(prob => (
                <ProblemRow
                  key={prob.id}
                  prob={prob}
                  progress={a2zProgress[prob.id] ?? { solved: false, bookmarked: false, notes: '' }}
                  onMark={handleMark}
                  onNote={setNoteProb}
                />
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Steps list */}
      {!search.trim() && (
        <div className="space-y-3">
          {visibleSteps.map((step, i) => (
            <StepCard
              key={step.id}
              step={step}
              a2zProgress={a2zProgress}
              onMark={handleMark}
              onNote={setNoteProb}
              filterDiff={filterDiff}
              filterSolved={filterSolved}
              colorClass={STEP_COLORS[i % STEP_COLORS.length]}
            />
          ))}
        </div>
      )}

      {/* Note modal */}
      <AnimatePresence>
        {noteProb && (
          <NoteModal
            prob={noteProb}
            initial={a2zProgress[noteProb.id]?.notes ?? ''}
            onSave={notes => handleMark(noteProb.id, { notes })}
            onClose={() => setNoteProb(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
