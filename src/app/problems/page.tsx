'use client';
import { useStore, Problem, Difficulty, Source, TOPICS } from '@/lib/store';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Star, CheckCircle2, Trash2, Edit2, Plus, X, Search, ExternalLink } from 'lucide-react';

type FilterDiff = 'All' | Difficulty;
type FilterSrc  = 'All' | Source;

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];
const SOURCES: Source[]          = ['LeetCode', 'Striver A2Z', 'Apna College', 'GeeksForGeeks', 'Codeforces'];

const blankForm = (): Partial<Problem> => ({
  name: '', topic: TOPICS[0].name, difficulty: 'Easy', source: 'LeetCode',
  dateSolved: new Date().toISOString().split('T')[0], notes: '', isFavorite: false, url: '',
});

const diffClass = (d: Difficulty) =>
  d === 'Easy'   ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/10' :
  d === 'Medium' ? 'bg-orange-500/20  text-orange-400  border-orange-500/10'  :
                   'bg-red-500/20     text-red-400     border-red-500/10';

export default function Problems() {
  const { problems, topics, addProblem, updateProblem, deleteProblem, getTodayRevisions } = useStore();

  const [search,   setSearch]   = useState('');
  const [diffF,    setDiffF]    = useState<FilterDiff>('All');
  const [srcF,     setSrcF]     = useState<FilterSrc>('All');
  const [topicF,   setTopicF]   = useState('All');
  const [showFavs, setShowFavs] = useState(false);
  const [sortBy,   setSortBy]   = useState<'date' | 'name' | 'difficulty'>('date');

  const [modalOpen, setModalOpen] = useState(false);
  const [form,      setForm]      = useState<Partial<Problem>>(blankForm());
  const [editId,    setEditId]    = useState<string | null>(null);

  const revisions = getTodayRevisions();

  const filtered = useMemo(() => {
    let list = [...problems];
    if (search)            list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.topic.toLowerCase().includes(search.toLowerCase()));
    if (diffF  !== 'All')  list = list.filter(p => p.difficulty === diffF);
    if (srcF   !== 'All')  list = list.filter(p => p.source     === srcF);
    if (topicF !== 'All')  list = list.filter(p => p.topic      === topicF);
    if (showFavs)          list = list.filter(p => p.isFavorite);

    if (sortBy === 'date')       list.sort((a, b) => new Date(b.dateSolved).getTime() - new Date(a.dateSolved).getTime());
    else if (sortBy === 'name')  list.sort((a, b) => a.name.localeCompare(b.name));
    else                         list.sort((a, b) => ['Easy','Medium','Hard'].indexOf(b.difficulty) - ['Easy','Medium','Hard'].indexOf(a.difficulty));

    return list;
  }, [problems, search, diffF, srcF, topicF, showFavs, sortBy]);

  const openAdd = () => {
    setForm(blankForm());
    setEditId(null);
    setModalOpen(true);
  };

  const openEdit = (p: Problem) => {
    setForm({ ...p });
    setEditId(p.id);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name?.trim()) return;
    if (editId) {
      updateProblem(editId, form);
    } else {
      addProblem({
        id: `p_${Date.now()}`,
        name: form.name!, topic: form.topic!, difficulty: form.difficulty!,
        source: form.source!, dateSolved: form.dateSolved!, notes: form.notes || '',
        isFavorite: form.isFavorite || false, revisionCount: 0, url: form.url || '',
      });
    }
    setModalOpen(false);
  };

  const easyCount   = problems.filter(p => p.difficulty === 'Easy').length;
  const mediumCount = problems.filter(p => p.difficulty === 'Medium').length;
  const hardCount   = problems.filter(p => p.difficulty === 'Hard').length;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Problem Tracker</h1>
          <p className="text-white/50 text-sm mt-1">Track every problem you solve. Review them on schedule.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-semibold transition-colors shrink-0">
          <Plus size={18} /> Add Problem
        </button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Solved',  value: problems.length, color: 'text-white' },
          { label: 'Easy',          value: easyCount,        color: 'text-emerald-400' },
          { label: 'Medium',        value: mediumCount,      color: 'text-orange-400' },
          { label: 'Hard',          value: hardCount,        color: 'text-red-400' },
        ].map(s => (
          <div key={s.label} className="glass p-4">
            <p className="text-xs text-white/50">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Revisions due */}
      <AnimatePresence>
        {revisions.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass border border-orange-500/30 p-4">
            <h3 className="font-semibold flex items-center gap-2 text-orange-400 mb-3">
              <Bell size={18} className="animate-pulse" /> Today's Revisions ({revisions.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {revisions.map(p => (
                <span key={p.id} className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/10 px-3 py-1.5 rounded-full text-sm">
                  {p.name}
                  <button onClick={() => updateProblem(p.id, { revisionCount: p.revisionCount + 1 })} className="text-emerald-400 hover:text-emerald-300 transition-colors" title="Mark revision done">
                    <CheckCircle2 size={15} />
                  </button>
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter / search bar */}
      <div className="glass p-4 space-y-3">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input type="text" placeholder="Search problems or topics…" value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 pl-9 pr-4 py-2 rounded-lg border border-white/10 focus:border-emerald-500 outline-none text-sm" />
          </div>
          <select value={topicF} onChange={e => setTopicF(e.target.value)} className="bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500">
            <option value="All">All Topics</option>
            {topics.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
          </select>
          <select value={srcF} onChange={e => setSrcF(e.target.value as FilterSrc)} className="bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500">
            <option value="All">All Sources</option>
            {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {(['All', ...DIFFICULTIES] as const).map(d => (
            <button key={d} onClick={() => setDiffF(d as FilterDiff)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${diffF === d ? 'bg-white/10 border-white/20 text-white' : 'border-transparent text-white/50 hover:bg-white/5'}`}>{d}</button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => setShowFavs(!showFavs)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${showFavs ? 'bg-yellow-500/20 border-yellow-500/20 text-yellow-400' : 'border-transparent text-white/50 hover:bg-white/5'}`}>
              <Star size={13} /> Favorites
            </button>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="bg-neutral-900 border border-white/10 rounded-lg px-2 py-1.5 text-xs outline-none">
              <option value="date">Sort: Date</option>
              <option value="name">Sort: Name</option>
              <option value="difficulty">Sort: Difficulty</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="glass overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-white/40">
            {problems.length === 0
              ? "No problems logged yet. Add your first solved problem!"
              : "No problems match your filters."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="border-b border-white/10 bg-white/2 text-white/50 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Problem</th>
                  <th className="px-4 py-3">Topic</th>
                  <th className="px-4 py-3">Difficulty</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-center">Rev.</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/3 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateProblem(p.id, { isFavorite: !p.isFavorite })} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Star size={15} className={p.isFavorite ? 'fill-yellow-400 text-yellow-400 opacity-100' : 'text-white/30'} />
                        </button>
                        {p.isFavorite && <Star size={15} className="fill-yellow-400 text-yellow-400 group-hover:hidden shrink-0" />}
                        <div className="min-w-0">
                          <p className="font-medium truncate max-w-[220px]">{p.name}</p>
                          {p.notes && <p className="text-white/40 text-xs truncate max-w-[220px]">{p.notes}</p>}
                        </div>
                        {p.url && (
                          <a href={p.url} target="_blank" rel="noopener noreferrer" className="shrink-0 text-white/30 hover:text-white/60 transition-colors">
                            <ExternalLink size={13} />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white/60">{p.topic}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${diffClass(p.difficulty)}`}>{p.difficulty}</span>
                    </td>
                    <td className="px-4 py-3 text-white/60 text-xs">{p.source}</td>
                    <td className="px-4 py-3 text-white/50 text-xs tabular-nums">{p.dateSolved}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-xs font-medium px-2 py-0.5 bg-white/5 rounded-full">{p.revisionCount}/{5}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => openEdit(p)} className="p-1.5 text-white/30 hover:text-cyan-400 rounded transition-colors" title="Edit"><Edit2 size={14} /></button>
                        <button onClick={() => deleteProblem(p.id)} className="p-1.5 text-white/30 hover:text-red-400 rounded transition-colors" title="Delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92 }}
                className="relative w-full max-w-lg bg-neutral-950/95 border border-white/10 rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-xl font-bold text-gradient">{editId ? 'Edit Problem' : 'Log Solved Problem'}</h3>
                  <button onClick={() => setModalOpen(false)} className="text-white/40 hover:text-white transition-colors"><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                  <div>
                    <label className="block text-white/60 font-medium mb-1.5">Problem Name *</label>
                    <input required placeholder="e.g. Two Sum, Longest Palindromic Substring"
                      className="w-full bg-white/5 border border-white/15 focus:border-emerald-500 rounded-lg p-2.5 outline-none"
                      value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>

                  <div>
                    <label className="block text-white/60 font-medium mb-1.5">Problem URL (optional)</label>
                    <input type="url" placeholder="https://leetcode.com/problems/..."
                      className="w-full bg-white/5 border border-white/15 focus:border-emerald-500 rounded-lg p-2.5 outline-none"
                      value={form.url || ''} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/60 font-medium mb-1.5">Topic</label>
                      <select className="w-full bg-neutral-900 border border-white/15 focus:border-emerald-500 rounded-lg p-2.5 outline-none"
                        value={form.topic} onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}>
                        {TOPICS.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-white/60 font-medium mb-1.5">Difficulty</label>
                      <select className="w-full bg-neutral-900 border border-white/15 focus:border-emerald-500 rounded-lg p-2.5 outline-none"
                        value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value as Difficulty }))}>
                        {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/60 font-medium mb-1.5">Source</label>
                      <select className="w-full bg-neutral-900 border border-white/15 focus:border-emerald-500 rounded-lg p-2.5 outline-none"
                        value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value as Source }))}>
                        {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-white/60 font-medium mb-1.5">Date Solved</label>
                      <input required type="date"
                        className="w-full bg-white/5 border border-white/15 focus:border-emerald-500 rounded-lg p-2.5 outline-none"
                        value={form.dateSolved || ''} onChange={e => setForm(f => ({ ...f, dateSolved: e.target.value }))} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/60 font-medium mb-1.5">Notes / Approach</label>
                    <textarea placeholder="Key algorithm, time complexity, edge cases..."
                      className="w-full bg-white/5 border border-white/15 focus:border-emerald-500 rounded-lg p-2.5 outline-none h-20 resize-none"
                      value={form.notes || ''} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-emerald-500 rounded"
                      checked={form.isFavorite || false} onChange={e => setForm(f => ({ ...f, isFavorite: e.target.checked }))} />
                    <span className="text-white/60 font-medium">Mark as Favorite ⭐</span>
                  </label>

                  <button type="submit" className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors">
                    {editId ? 'Save Changes' : 'Log Problem'}
                  </button>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
