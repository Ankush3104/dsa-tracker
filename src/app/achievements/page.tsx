'use client';
import { useStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { calculateStreak } from '@/lib/store';
import { Lock } from 'lucide-react';

interface Badge {
  id: string;
  icon: string;
  name: string;
  desc: string;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const rarityStyles = {
  common:    'border-white/10 shadow-none',
  rare:      'border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]',
  epic:      'border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.15)]',
  legendary: 'border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.2)]',
};

const rarityLabel = {
  common:    'text-white/40',
  rare:      'text-cyan-400',
  epic:      'text-purple-400',
  legendary: 'text-yellow-400',
};

export default function Achievements() {
  const { problems, dailyLogs, topics, pomodoroSessions } = useStore();
  const { currentStreak, longestStreak } = calculateStreak(dailyLogs);

  const easyCount   = problems.filter(p => p.difficulty === 'Easy').length;
  const mediumCount = problems.filter(p => p.difficulty === 'Medium').length;
  const hardCount   = problems.filter(p => p.difficulty === 'Hard').length;
  const favCount    = problems.filter(p => p.isFavorite).length;

  const topicCounts: Record<string, number> = {};
  problems.forEach(p => { topicCounts[p.topic] = (topicCounts[p.topic] || 0) + 1; });

  const badges: Badge[] = [
    // Starter
    { id: 'b1',  icon: '🌱', name: 'First Step',        desc: 'Solve your first problem',               unlocked: problems.length >= 1,  rarity: 'common'    },
    { id: 'b2',  icon: '🔥', name: 'On Fire',            desc: 'Solve 10 problems',                      unlocked: problems.length >= 10, rarity: 'common'    },
    { id: 'b3',  icon: '⚡', name: 'Momentum',           desc: 'Solve 25 problems',                      unlocked: problems.length >= 25, rarity: 'rare'      },
    { id: 'b4',  icon: '💫', name: 'Century',            desc: 'Solve 100 problems',                     unlocked: problems.length >= 100,rarity: 'epic'      },
    { id: 'b5',  icon: '🏆', name: 'DSA Master',         desc: 'Solve 200 problems',                     unlocked: problems.length >= 200,rarity: 'legendary' },
    // Difficulty
    { id: 'b6',  icon: '🟢', name: 'Easy Rider',         desc: 'Solve 20 Easy problems',                 unlocked: easyCount >= 20,       rarity: 'common'    },
    { id: 'b7',  icon: '🟡', name: 'Medium Ranger',      desc: 'Solve 20 Medium problems',               unlocked: mediumCount >= 20,     rarity: 'rare'      },
    { id: 'b8',  icon: '🔴', name: 'Hard Hitter',        desc: 'Solve 10 Hard problems',                 unlocked: hardCount >= 10,       rarity: 'epic'      },
    // Topics
    { id: 'b9',  icon: '🧩', name: 'Array Ninja',        desc: 'Solve 20 Array problems',                unlocked: (topicCounts['Arrays'] || 0) >= 20,      rarity: 'rare'    },
    { id: 'b10', icon: '🕸️', name: 'Graph Explorer',     desc: 'Solve 20 Graph problems',                unlocked: (topicCounts['Graphs'] || 0) >= 20,      rarity: 'epic'    },
    { id: 'b11', icon: '🧙', name: 'DP Wizard',           desc: 'Solve 30 DP problems',                   unlocked: (topicCounts['Dynamic Programming'] || 0) >= 30, rarity: 'legendary' },
    { id: 'b12', icon: '🌳', name: 'Tree Whisperer',     desc: 'Solve 15 Tree & BST problems',           unlocked: (topicCounts['Trees & BST'] || 0) >= 15, rarity: 'rare'    },
    // Consistency
    { id: 'b13', icon: '📅', name: '7-Day Streak',       desc: 'Maintain a 7 day study streak',          unlocked: longestStreak >= 7,    rarity: 'rare'      },
    { id: 'b14', icon: '🗓️', name: '30-Day Streak',      desc: 'Maintain a 30 day study streak',         unlocked: longestStreak >= 30,   rarity: 'epic'      },
    { id: 'b15', icon: '🔱', name: 'Streak God',          desc: 'Maintain a 60 day study streak',         unlocked: longestStreak >= 60,   rarity: 'legendary' },
    // Pomodoro
    { id: 'b16', icon: '🍅', name: 'Tomato Farmer',      desc: 'Complete 10 Pomodoro sessions',          unlocked: pomodoroSessions >= 10,    rarity: 'common' },
    { id: 'b17', icon: '⏱️', name: 'Deep Work',          desc: 'Complete 50 Pomodoro sessions',          unlocked: pomodoroSessions >= 50,    rarity: 'rare'   },
    // Roadmap
    { id: 'b18', icon: '🎓', name: 'Basics Graduate',    desc: 'Complete all Basics topics',             unlocked: topics.filter(t => t.category === 'Basics' && t.status === 'Completed').length === topics.filter(t => t.category === 'Basics').length && topics.filter(t => t.category === 'Basics').length > 0,  rarity: 'rare' },
    { id: 'b19', icon: '⭐', name: 'Star Collector',     desc: 'Mark 10 problems as favorite',           unlocked: favCount >= 10,        rarity: 'common'    },
    { id: 'b20', icon: '🌟', name: 'Completionist',      desc: 'Complete all topics in the roadmap',     unlocked: topics.every(t => t.status === 'Completed') && topics.length > 0, rarity: 'legendary' },
  ];

  const unlocked = badges.filter(b => b.unlocked).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Achievements</h1>
          <p className="text-white/50 text-sm mt-1">Earn badges as you progress through your DSA journey.</p>
        </div>
        <div className="glass px-5 py-3 text-center rounded-xl">
          <p className="text-2xl font-bold">{unlocked} / {badges.length}</p>
          <p className="text-xs text-white/40">Badges Earned</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="glass p-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white/60">Overall Achievement Progress</span>
          <span className="font-semibold">{Math.round((unlocked / badges.length) * 100)}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
          <motion.div className="h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400"
            initial={{ width: 0 }} animate={{ width: `${(unlocked / badges.length) * 100}%` }} transition={{ duration: 1 }} />
        </div>
        <div className="flex gap-6 mt-3 text-xs text-white/40">
          {(['common','rare','epic','legendary'] as const).map(r => (
            <span key={r} className={`flex items-center gap-1.5 ${rarityLabel[r]}`}>
              <span className="w-2 h-2 rounded-full bg-current inline-block" /> {r}
            </span>
          ))}
        </div>
      </div>

      {/* Badge grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {badges.map((badge, i) => (
          <motion.div key={badge.id}
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
            className={`glass border p-4 flex flex-col items-center text-center transition-all duration-300 ${
              badge.unlocked ? rarityStyles[badge.rarity] : 'opacity-30 grayscale border-white/5'
            }`}
          >
            <div className="text-5xl mb-3 leading-none">
              {badge.unlocked ? badge.icon : <Lock size={40} className="text-white/20" />}
            </div>
            <h3 className="font-semibold text-sm leading-tight">{badge.name}</h3>
            <p className="text-xs text-white/40 mt-1 leading-snug">{badge.desc}</p>
            {badge.unlocked && (
              <span className={`mt-2 text-xs font-semibold capitalize ${rarityLabel[badge.rarity]}`}>{badge.rarity}</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
