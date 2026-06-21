'use client';
import { useStore, calculateStreak } from '@/lib/store';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Save, CalendarCheck } from 'lucide-react';
import { format, subDays } from 'date-fns';

const MOODS = ['😊', '😐', '😔'] as const;

export default function DailyTracker() {
  const { dailyLogs, logDay } = useStore();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { currentStreak, longestStreak } = calculateStreak(dailyLogs);

  const today = new Date();
  const days = Array.from({ length: 182 }, (_, i) => {
    const d = subDays(today, 181 - i);
    return d.toISOString().split('T')[0];
  });

  const existing = dailyLogs[selectedDate];
  const [form, setForm] = useState(
    existing ?? { date: selectedDate, hoursStudied: 0, problemsSolved: 0, notes: '', mood: '😐' as const, isCompleted: false }
  );

  // Sync form when date changes
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setForm(dailyLogs[date] ?? { date, hoursStudied: 0, problemsSolved: 0, notes: '', mood: '😐', isCompleted: false });
  };

  const handleSave = (complete: boolean) => {
    logDay({ ...form, date: selectedDate, isCompleted: complete });
    if (complete) setForm(prev => ({ ...prev, isCompleted: true }));
  };

  const totalHours    = Object.values(dailyLogs).reduce((s, l) => s + l.hoursStudied, 0);
  const totalDays     = Object.values(dailyLogs).filter(l => l.isCompleted).length;
  const averageProbs  = totalDays > 0 ? (Object.values(dailyLogs).reduce((s, l) => s + l.problemsSolved, 0) / totalDays).toFixed(1) : '0';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Daily Tracker</h1>
        <p className="text-white/50 text-sm mt-1">Log your study sessions and maintain your streak.</p>
      </div>

      {/* Streak + Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: <Flame className="text-orange-400" size={28} />, value: currentStreak, label: 'Current Streak', sub: 'days 🔥' },
          { icon: <Flame className="text-red-500"    size={28} />, value: longestStreak, label: 'Longest Streak', sub: 'days 🏆' },
          { icon: <CalendarCheck className="text-cyan-400" size={28} />, value: totalDays, label: 'Days Completed', sub: 'of 180' },
          { icon: <span className="text-2xl">⏱️</span>, value: totalHours.toFixed(0), label: 'Total Hours', sub: `avg ~${averageProbs} probs/day` },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="glass p-4 flex flex-col gap-1">
            {s.icon}
            <span className="text-3xl font-bold mt-1">{s.value}</span>
            <span className="text-xs text-white/50">{s.label}</span>
            <span className="text-xs text-white/30">{s.sub}</span>
          </motion.div>
        ))}
      </div>

      {/* Heatmap */}
      <div className="glass p-5">
        <h3 className="text-base font-semibold mb-3">Consistency Heatmap</h3>
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-flow-col grid-rows-7 gap-1 w-max">
            {days.map(date => {
              const log = dailyLogs[date];
              const isSelected = date === selectedDate;
              let bg = 'bg-white/5';
              if (log?.isCompleted) bg = log.problemsSolved >= 5 ? 'bg-emerald-400' : log.problemsSolved >= 2 ? 'bg-emerald-500/60' : 'bg-emerald-500/30';
              return (
                <button key={date} onClick={() => handleDateChange(date)}
                  title={`${date}: ${log?.problemsSolved ?? 0} problems, ${log?.hoursStudied ?? 0}h`}
                  className={`w-3.5 h-3.5 rounded-sm transition-all ${bg} ${isSelected ? 'ring-2 ring-emerald-400 ring-offset-1 ring-offset-black' : 'hover:ring-1 hover:ring-white/30'}`}
                />
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 text-xs text-white/40">
          <span>Less</span>
          <span className="w-3 h-3 rounded-sm bg-white/5 inline-block" />
          <span className="w-3 h-3 rounded-sm bg-emerald-500/30 inline-block" />
          <span className="w-3 h-3 rounded-sm bg-emerald-500/60 inline-block" />
          <span className="w-3 h-3 rounded-sm bg-emerald-400 inline-block" />
          <span>More</span>
        </div>
      </div>

      {/* Log form */}
      <motion.div key={selectedDate} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass p-6 max-w-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold">
            Log: <span className="text-emerald-400">{format(new Date(selectedDate + 'T12:00:00'), 'EEEE, dd MMM')}</span>
          </h3>
          {form.isCompleted && <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/10">✓ Completed</span>}
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-white/60 font-medium block mb-1.5">Hours Studied</label>
              <input type="number" min={0} max={24} step={0.5}
                className="w-full bg-white/5 border border-white/10 focus:border-emerald-500 rounded-lg p-2.5 outline-none"
                value={form.hoursStudied}
                onChange={e => setForm(f => ({ ...f, hoursStudied: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="text-sm text-white/60 font-medium block mb-1.5">Problems Solved</label>
              <input type="number" min={0}
                className="w-full bg-white/5 border border-white/10 focus:border-emerald-500 rounded-lg p-2.5 outline-none"
                value={form.problemsSolved}
                onChange={e => setForm(f => ({ ...f, problemsSolved: Number(e.target.value) }))} />
            </div>
          </div>

          <div>
            <label className="text-sm text-white/60 font-medium block mb-2">Mood</label>
            <div className="flex gap-3">
              {MOODS.map(m => (
                <button key={m} onClick={() => setForm(f => ({ ...f, mood: m }))}
                  className={`text-2xl p-2 rounded-xl transition-all border ${form.mood === m ? 'bg-white/10 border-white/20 scale-110' : 'bg-white/3 border-transparent opacity-50 hover:opacity-80'}`}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-white/60 font-medium block mb-1.5">Session Notes</label>
            <textarea rows={3} placeholder="Topics covered, insights, problems to revisit..."
              className="w-full bg-white/5 border border-white/10 focus:border-emerald-500 rounded-lg p-2.5 outline-none resize-none"
              value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
          </div>

          <div className="flex gap-3">
            <button onClick={() => handleSave(false)} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium rounded-lg transition-colors text-sm">
              <Save size={16} /> Save Draft
            </button>
            <button onClick={() => handleSave(true)} className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors text-sm flex items-center justify-center gap-2">
              <CalendarCheck size={16} /> Mark as Complete ✓
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
