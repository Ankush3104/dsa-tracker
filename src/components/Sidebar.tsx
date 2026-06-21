'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Milestone, Calendar, Brain, Trophy, Timer, NotebookPen, BarChart3, Menu, X, BookMarked } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const navItems = [
  { name: 'Dashboard',    href: '/',            icon: LayoutDashboard },
  { name: 'A2Z Sheet',    href: '/striver',     icon: BookMarked },
  { name: 'Roadmap',      href: '/roadmap',     icon: Milestone },
  { name: 'Daily Tracker',href: '/daily',       icon: Calendar },
  { name: 'Problems',     href: '/problems',    icon: Brain },
  { name: 'Analytics',    href: '/analytics',   icon: BarChart3 },
  { name: 'Achievements', href: '/achievements',icon: Trophy },
  { name: 'Pomodoro',     href: '/pomodoro',    icon: Timer },
  { name: 'Notes',        href: '/notes',       icon: NotebookPen },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 glass border-r border-white/10 p-4 hidden md:flex flex-col z-50">
        <div className="mb-8 mt-4">
          <h1 className="text-2xl font-bold text-gradient">DSA Tracker</h1>
          <p className="text-xs text-white/50">6-Month Mastery</p>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link href={item.href} key={item.name}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-emerald-500/20 text-emerald-400 font-semibold' : 'text-white/70 hover:bg-white/5'}`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 glass border-b border-white/10 px-4 flex items-center justify-between z-40">
        <div>
          <span className="text-xl font-bold text-gradient">DSA Tracker</span>
        </div>
        <button onClick={toggleMenu} className="p-2 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors" aria-label="Toggle navigation menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed left-0 top-0 h-screen w-72 bg-neutral-950/95 backdrop-blur-xl border-r border-white/10 p-6 z-50 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8 mt-2">
                <div>
                  <h2 className="text-xl font-bold text-gradient">DSA Tracker</h2>
                  <p className="text-xs text-white/50">6-Month Mastery</p>
                </div>
                <button onClick={toggleMenu} className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link href={item.href} key={item.name} onClick={() => setIsOpen(false)}>
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-emerald-500/20 text-emerald-400 font-semibold' : 'text-white/70 hover:bg-white/5'}`}
                      >
                        <item.icon size={20} />
                        <span className="font-medium">{item.name}</span>
                      </motion.div>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
