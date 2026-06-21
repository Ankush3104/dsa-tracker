'use client';
import { useStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, BookOpen } from 'lucide-react';

export default function Roadmap() {
  const { topics, topicNotes, saveTopicNotes } = useStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const categories = ['Basics', 'Intermediate', 'Advanced'] as const;

  const categoryColors = {
    Basics:       'border-emerald-500 text-emerald-400',
    Intermediate: 'border-orange-500 text-orange-400',
    Advanced:     'border-red-500    text-red-400',
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Topic Roadmap</h1>
        <p className="text-white/50 text-sm mt-1">Your 6-month path to DSA mastery. Progress updates automatically as you log problems.</p>
      </div>

      {categories.map(cat => {
        const catTopics = topics.filter(t => t.category === cat);
        const catSolved = catTopics.reduce((s, t) => s + t.solvedProblems, 0);
        const catTotal  = catTopics.reduce((s, t) => s + t.totalProblems, 0);
        return (
          <div key={cat} className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-bold border-l-4 pl-3 ${categoryColors[cat]}`}>{cat}</h2>
              <span className="text-xs text-white/40">{catSolved} / {catTotal} solved</span>
            </div>

            {catTopics.map(topic => {
              const progress   = topic.totalProblems > 0 ? (topic.solvedProblems / topic.totalProblems) * 100 : 0;
              const isExpanded = expandedId === topic.id;
              const notes      = topicNotes[topic.id] || '';

              return (
                <motion.div key={topic.id} className="glass overflow-hidden">
                  <button
                    className="w-full p-4 flex flex-wrap gap-3 items-center text-left hover:bg-white/2 transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : topic.id)}
                  >
                    <div className="flex-1 min-w-[180px]">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{topic.name}</h3>
                        {notes && <BookOpen size={13} className="text-cyan-400 shrink-0" />}
                      </div>
                      <div className="flex gap-4 mt-1 text-xs text-white/40">
                        <span>Easy: <strong className="text-white/60">{topic.easySolved}</strong></span>
                        <span>Med: <strong className="text-white/60">{topic.mediumSolved}</strong></span>
                        <span>Hard: <strong className="text-white/60">{topic.hardSolved}</strong></span>
                        {topic.lastStudied && <span>Last: <strong className="text-white/60">{topic.lastStudied}</strong></span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        topic.status === 'Completed'  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/10' :
                        topic.status === 'In Progress'? 'bg-orange-500/20  text-orange-400  border-orange-500/10'  :
                                                        'bg-white/5        text-white/40    border-white/10'
                      }`}>{topic.status}</span>

                      <div className="flex flex-col items-end gap-1">
                        <div className="w-28 sm:w-36 bg-white/10 rounded-full h-2 overflow-hidden">
                          <motion.div className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                            initial={{ width: 0 }} animate={{ width: `${Math.min(progress, 100)}%` }} transition={{ duration: 0.8 }} />
                        </div>
                        <span className="text-xs text-white/40">{topic.solvedProblems}/{topic.totalProblems}</span>
                      </div>

                      <ChevronDown size={18} className={`text-white/40 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                        className="border-t border-white/10 p-4 bg-black/20">
                        <h4 className="text-sm font-semibold text-white/60 mb-2">Study Notes (saved automatically)</h4>
                        <textarea
                          className="w-full bg-white/5 border border-white/10 focus:border-emerald-500 rounded-lg p-3 text-sm outline-none resize-none h-28 font-mono"
                          placeholder={`# ${topic.name}\n- Key patterns:\n- Time complexities:\n- Common gotchas:`}
                          value={notes}
                          onChange={e => saveTopicNotes(topic.id, e.target.value)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
