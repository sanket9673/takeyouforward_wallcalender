import { HeroImageSection } from './HeroImageSection';
import { CalendarGrid } from './CalendarGrid';
import { NotesPanel } from './NotesPanel';
import { useCalendarStore } from '../store/calendarStore';
import { Moon, Sun } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export function WallCalendar() {
  const darkMode = useCalendarStore(s => s.darkMode);
  const toggleDarkMode = useCalendarStore(s => s.toggleDarkMode);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative w-full max-w-[1240px] mx-auto rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col md:flex-row ring-1 transition-colors duration-500 will-change-transform",
        darkMode ? "bg-slate-900 border-slate-800 ring-slate-800/50 shadow-black/50 text-slate-100" : "bg-white/80 border-white ring-slate-900/5 calendar-shadow"
      )}
    >
      {/* Dark Mode Toggle */}
      <button 
        onClick={toggleDarkMode}
        className={cn(
          "absolute top-6 left-6 md:left-auto md:right-6 z-50 p-2.5 rounded-full backdrop-blur-xl shadow-lg transition-transform hover:scale-105 active:scale-95 border",
          darkMode ? "bg-black/30 text-yellow-500 border-white/10" : "bg-white/30 text-slate-800 border-white/40"
        )}
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Desktop Left / Mobile Top -> Image */}
      <div className="md:w-[400px] lg:w-[460px] shrink-0 relative z-20">
        <HeroImageSection />
      </div>

      {/* Right Content Area -> Calendar + Notes */}
      <div className={cn(
        "flex-1 flex flex-col lg:flex-row relative z-10 w-full backdrop-blur-2xl transition-colors duration-500",
        darkMode ? "bg-slate-900/80" : "bg-white/60"
      )}>
         <div className="flex-1 layout-panel">
           <CalendarGrid />
         </div>
         <NotesPanel />
      </div>
    </motion.div>
  );
}
