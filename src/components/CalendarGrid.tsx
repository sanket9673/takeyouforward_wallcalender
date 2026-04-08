import { format } from 'date-fns';
import { useCalendarStore } from '../store/calendarStore';
import { useSelectionStore } from '../store/selectionStore';
import { useNotesStore } from '../store/notesStore';
import { useCalendar } from '../hooks/useCalendar';
import { cn } from '../lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DayCell } from './DayCell';
import { useCallback, useMemo } from 'react';

export function CalendarGrid() {
  const currentMonthTs = useCalendarStore((s) => s.currentMonthTs);
  const prevMonth = useCalendarStore((s) => s.prevMonth);
  const nextMonth = useCalendarStore((s) => s.nextMonth);
  const darkMode = useCalendarStore((s) => s.darkMode);

  const startTs = useSelectionStore(s => s.startTs);
  const endTs = useSelectionStore(s => s.endTs);
  const hoverTs = useSelectionStore(s => s.hoverTs);
  const selectDate = useSelectionStore(s => s.selectDate);
  const setHoverDate = useSelectionStore(s => s.setHoverDate);

  const notes = useNotesStore(s => s.notes);

  const { dayTimestamps, monthStartTs } = useCalendar();

  const weekDays = useMemo(() => ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'], []);

  // Memoize note lookup for performance (O(n) -> O(1) inside loop if mapped)
  // Converting notes array to a fast Set of strings 'YYYY-MM-DD'
  const notesSet = useMemo(() => new Set(notes.map(n => n.dateStr)), [notes]);

  const handleSelect = useCallback((ts: number) => {
    selectDate(ts);
  }, [selectDate]);

  const handleHover = useCallback((ts: number | null) => {
    setHoverDate(ts);
  }, [setHoverDate]);

  return (
    <div className="flex-[2] flex flex-col p-6 sm:p-10 shrink-0 min-w-0 bg-transparent relative z-20">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-8 z-10">
         <h2 className={cn(
           "text-2xl lg:text-3xl font-extrabold tracking-tight transition-colors duration-500",
           darkMode ? "text-slate-100" : "text-slate-800"
         )}>
           {format(new Date(currentMonthTs), 'MMMM yyyy')}
         </h2>
         <div className="flex space-x-2">
           <button onClick={prevMonth} className={cn(
             "p-2.5 rounded-xl transition-all active:scale-95 shadow-sm border",
             darkMode ? "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700/50" : "bg-white/80 hover:bg-white text-slate-600 border-slate-200/50"
           )}>
             <ChevronLeft className="w-5 h-5" />
           </button>
           <button onClick={nextMonth} className={cn(
             "p-2.5 rounded-xl transition-all active:scale-95 shadow-sm border",
             darkMode ? "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700/50" : "bg-white/80 hover:bg-white text-slate-600 border-slate-200/50"
           )}>
             <ChevronRight className="w-5 h-5" />
           </button>
         </div>
      </div>

      {/* Grid wrapping with animation */}
      <div className="relative w-full overflow-visible">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMonthTs}
            initial={{ opacity: 0, rotateX: 20, y: 15 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, rotateX: -20, y: -15, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full"
            style={{ perspective: 1000 }}
          >
            <div className="grid grid-cols-7 gap-y-4 gap-x-1 sm:gap-x-2 w-full">
               {weekDays.map((day, i) => (
                 <div key={day} className={cn(
                   "text-center text-[10px] sm:text-xs font-bold tracking-[0.2em] mb-4 uppercase",
                   (i === 5 || i === 6) 
                     ? (darkMode ? "text-primary-400" : "text-primary-500")
                     : (darkMode ? "text-slate-400" : "text-slate-400")
                 )}>
                   {day}
                 </div>
               ))}

               {dayTimestamps.map((dayTs) => {
                 const dateStr = format(dayTs, 'yyyy-MM-dd');
                 const hasNotes = notesSet.has(dateStr);

                 return (
                   <DayCell
                     key={dayTs}
                     dayTs={dayTs}
                     monthStartTs={monthStartTs}
                     startTs={startTs}
                     endTs={endTs}
                     hoverTs={hoverTs}
                     hasNotes={hasNotes}
                     onSelect={handleSelect}
                     onHover={handleHover}
                     darkMode={darkMode}
                   />
                 );
               })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
