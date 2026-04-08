import { format, isSameMonth, isToday } from 'date-fns';
import { useCalendarStore } from '../store/useCalendarStore';
import { useCalendar } from '../hooks/useCalendar';
import { useDateRange } from '../hooks/useDateRange';
import { cn } from '../lib/utils';
import { useNotes } from '../hooks/useNotes';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function CalendarGrid() {
  const { currentMonth, prevMonth, nextMonth } = useCalendarStore();
  const { days, monthStart } = useCalendar();
  const { selectDate, isSelected, isInRange, isStart, isEnd } = useDateRange();
  const { hasNotes } = useNotes();

  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div className="flex-[2] flex flex-col p-6 sm:p-10 shrink-0 min-w-0 bg-white">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-8">
         <h2 className="text-2xl font-bold text-slate-800 tracking-wide">
           {format(currentMonth, 'MMMM yyyy')}
         </h2>
         <div className="flex space-x-2">
           <button onClick={prevMonth} className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-800">
             <ChevronLeft className="w-5 h-5" />
           </button>
           <button onClick={nextMonth} className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-800">
             <ChevronRight className="w-5 h-5" />
           </button>
         </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-y-4 gap-x-1 sm:gap-2 w-full">
         {weekDays.map((day, i) => (
           <div key={day} className={cn(
             "text-center text-xs sm:text-sm font-bold tracking-widest mb-4",
             (i === 5 || i === 6) ? "text-primary-500" : "text-slate-400"
           )}>
             {day}
           </div>
         ))}

         {days.map((day) => {
           const dateStr = format(day, 'yyyy-MM-dd');
           const isCurrentMonth = isSameMonth(day, monthStart);
           const today = isToday(day);
           const selected = isSelected(day);
           const inRange = isInRange(day);
           const start = isStart(day);
           const end = isEnd(day);
           const notesExist = hasNotes(dateStr);

           return (
             <div key={day.toString()} className="relative flex items-center justify-center h-10 sm:h-12">
               {/* Highlight Background for Range */}
               {inRange && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-primary-50 my-1" 
                  />
               )}
               {start && (
                  <div className="absolute inset-0 bg-primary-50 rounded-l-full my-1 ml-2" />
               )}
               {end && (
                  <div className="absolute inset-0 bg-primary-50 rounded-r-full my-1 mr-2" />
               )}

               <button
                 onClick={() => selectDate(day)}
                 className={cn(
                   "relative z-10 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full text-sm sm:text-base font-semibold transition-all",
                   !isCurrentMonth && "text-slate-300 font-medium",
                   isCurrentMonth && !selected && !today && "text-slate-700 hover:bg-slate-100",
                   today && !selected && "bg-slate-100 text-slate-900 ring-2 ring-slate-200",
                   selected && "bg-primary-500 text-white shadow-lg shadow-primary-500/30 scale-105",
                 )}
               >
                 {format(day, 'd')}
                 
                 {/* Notes Indicator */}
                 {notesExist && !selected && (
                   <span className="absolute bottom-1 right-1/2 translate-x-1/2 translate-y-2 w-1 h-1 bg-amber-400 rounded-full" />
                 )}
                 {notesExist && selected && (
                   <span className="absolute bottom-1 right-1/2 translate-x-1/2 translate-y-2 w-1 h-1 bg-white rounded-full" />
                 )}
               </button>
             </div>
           );
         })}
      </div>
    </div>
  );
}
