'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';

type Mode = 'work' | 'shortBreak' | 'longBreak';

const MODES: Record<Mode, { label: string; minutes: number }> = {
  work:        { label: 'Focus',       minutes: 25 },
  shortBreak:  { label: 'Short Break', minutes: 5  },
  longBreak:   { label: 'Long Break',  minutes: 15 },
};

const GLOW: Record<Mode, string> = {
  work:       'bg-orange-500/25',
  shortBreak: 'bg-cyan-500/20',
  longBreak:  'bg-blue-600/20',
};

const RING_COLOR: Record<Mode, string> = {
  work:       '#f97316',
  shortBreak: '#06b6d4',
  longBreak:  '#3b82f6',
};

function beep() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    [0, 200, 400].forEach(delay => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime + delay / 1000);
      gain.gain.setValueAtTime(0.4, ctx.currentTime + delay / 1000);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay / 1000 + 0.3);
      osc.start(ctx.currentTime + delay / 1000);
      osc.stop(ctx.currentTime + delay / 1000 + 0.3);
    });
  } catch { /* silently fail */ }
}

export default function Pomodoro() {
  const { pomodoroSessions, incrementPomodoro } = useStore();

  const [mode,    setMode]    = useState<Mode>('work');
  const [minutes, setMinutes] = useState(MODES.work.minutes);
  const [seconds, setSeconds] = useState(0);
  const [active,  setActive]  = useState(false);
  const [muted,   setMuted]   = useState(false);
  const [round,   setRound]   = useState(1); // rounds within the current set

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalSecs   = MODES[mode].minutes * 60;
  const remainSecs  = minutes * 60 + seconds;
  const progress    = ((totalSecs - remainSecs) / totalSecs) * 100;
  const circum      = 2 * Math.PI * 120;

  const switchMode = useCallback((m: Mode) => {
    setActive(false);
    setMode(m);
    setMinutes(MODES[m].minutes);
    setSeconds(0);
  }, []);

  const complete = useCallback(() => {
    setActive(false);
    if (!muted) beep();

    if (mode === 'work') {
      incrementPomodoro();
      const next = round % 4 === 0 ? 'longBreak' : 'shortBreak';
      setRound(r => r + 1);
      switchMode(next);
    } else {
      switchMode('work');
    }
  }, [mode, muted, round, incrementPomodoro, switchMode]);

  useEffect(() => {
    if (!active) { if (intervalRef.current) clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => {
      setSeconds(s => {
        if (s > 0) return s - 1;
        setMinutes(m => {
          if (m > 0) { return m - 1; }
          complete();
          return 0;
        });
        return 59;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [active, complete]);

  const reset = () => { setActive(false); setMinutes(MODES[mode].minutes); setSeconds(0); };
  const skip  = () => complete();

  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] space-y-8 overflow-hidden rounded-2xl">
      {/* Ambient glow */}
      <motion.div
        key={mode}
        className={`absolute w-[480px] h-[480px] rounded-full blur-[120px] -z-10 ${GLOW[mode]}`}
        animate={{ scale: active ? [1, 1.15, 1] : 1, opacity: active ? [0.2, 0.35, 0.2] : 0.15 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold">Focus Timer</h1>
        <p className="text-white/40 text-sm mt-1">Use the Pomodoro technique to stay in flow.</p>
      </div>

      {/* Mode tabs */}
      <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 gap-1">
        {(Object.keys(MODES) as Mode[]).map(m => (
          <button key={m} onClick={() => switchMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === m ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white/70'}`}>
            {MODES[m].label}
          </button>
        ))}
      </div>

      {/* Clock ring */}
      <div className="relative w-72 h-72 flex items-center justify-center">
        <svg className="absolute w-full h-full -rotate-90">
          <circle cx="144" cy="144" r="120" stroke="rgba(255,255,255,0.06)" strokeWidth="10" fill="none" />
          <motion.circle cx="144" cy="144" r="120"
            stroke={RING_COLOR[mode]} strokeWidth="10" fill="none" strokeLinecap="round"
            strokeDasharray={circum}
            animate={{ strokeDashoffset: circum - (progress / 100) * circum }}
            transition={{ ease: 'linear', duration: 0.5 }}
          />
        </svg>
        <div className="text-center z-10 select-none">
          <span className="text-7xl font-bold font-mono tracking-tight">{mm}:{ss}</span>
          <p className="text-xs text-white/40 uppercase tracking-widest mt-2">{MODES[mode].label}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button onClick={() => setMuted(!muted)} className="glass p-3 rounded-full text-white/40 hover:text-white/70 transition-colors" title={muted ? 'Unmute' : 'Mute'}>
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <button onClick={reset} className="glass p-4 rounded-full text-white/50 hover:text-white/80 transition-all active:scale-95" title="Reset">
          <RotateCcw size={24} />
        </button>
        <button onClick={() => setActive(!active)} className="glass p-5 rounded-full text-white transition-all active:scale-95 shadow-xl"
          style={{ backgroundColor: `${RING_COLOR[mode]}30`, borderColor: `${RING_COLOR[mode]}50`, borderWidth: 1 }}>
          {active ? <Pause size={32} /> : <Play size={32} className="translate-x-0.5" />}
        </button>
        <button onClick={skip} className="glass p-4 rounded-full text-white/50 hover:text-white/80 transition-all active:scale-95" title="Skip">
          <SkipForward size={24} />
        </button>
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>

      {/* Session info */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-1.5 text-white/50">
          Round: <strong className="text-white/80">{round}</strong>
        </div>
        <div className="w-px h-4 bg-white/20" />
        <div className="flex items-center gap-1.5 text-white/50">
          Total sessions: <strong className="text-orange-400">{pomodoroSessions}</strong>
        </div>
      </div>

      {/* Tips */}
      <div className="glass px-5 py-3 max-w-sm text-center text-xs text-white/30 rounded-xl">
        {mode === 'work'
          ? '💡 Silence notifications and give full focus to one problem at a time.'
          : mode === 'shortBreak'
          ? '☕ Stand up, stretch, or grab a drink — you earned it!'
          : '🌿 Take a longer break — walk, rest your eyes, and reset fully.'}
      </div>
    </div>
  );
}
