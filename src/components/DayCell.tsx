import { memo, useCallback } from 'react';
import { isSameMonth, isToday } from 'date-fns';
import { cn } from '../lib/utils';

interface DayCellProps {
  dayTs: number;
  monthStartTs: number;
  startTs: number | null;
  endTs: number | null;
  hoverTs: number | null;
  hasNotes: boolean;
  onSelect: (ts: number) => void;
  onHover: (ts: number | null) => void;
  darkMode: boolean;
}

export const DayCell = memo(function DayCell({
  dayTs,
  monthStartTs,
  startTs,
  endTs,
  hoverTs,
  hasNotes,
  onSelect,
  onHover,
  darkMode
}: DayCellProps) {
  const day = new Date(dayTs);
  const monthStart = new Date(monthStartTs);
  
  // Computed stats inside the memoized cell

  const isCurrentMonthStrict = isSameMonth(day, monthStart);
  
  const today = isToday(day);
  const selected = dayTs === startTs || dayTs === endTs;
  
  const isStart = dayTs === startTs;
  const isEnd = endTs ? dayTs === endTs : (startTs && !endTs && hoverTs && dayTs === hoverTs && hoverTs >= startTs);

  let inRange = false;
  if (startTs && endTs) {
    inRange = dayTs > startTs && dayTs < endTs;
  } else if (startTs && !endTs && hoverTs && hoverTs > startTs) {
    inRange = dayTs > startTs && dayTs < hoverTs;
  }

  const handleClick = useCallback(() => onSelect(dayTs), [dayTs, onSelect]);
  const handleMouseEnter = useCallback(() => onHover(dayTs), [dayTs, onHover]);
  const handleMouseLeave = useCallback(() => onHover(null), [onHover]);

  return (
    <div 
      className="relative flex items-center justify-center h-10 sm:h-12 lg:h-14 group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Range Highlight with will-change for performance */}
      {inRange && (
         <div 
           className={cn(
             "absolute inset-0 my-1 pointer-events-none will-change-transform opacity-100",
             darkMode ? "bg-primary-500/20" : "bg-primary-100/60"
           )} 
         />
      )}
      {isStart && (
         <div className={cn(
           "absolute inset-0 rounded-l-full my-1 ml-2 pointer-events-none will-change-transform",
           darkMode ? "bg-primary-500/20" : "bg-primary-100/60"
         )} />
      )}
      {isEnd && (
         <div className={cn(
           "absolute inset-0 rounded-r-full my-1 mr-2 pointer-events-none will-change-transform",
           darkMode ? "bg-primary-500/20" : "bg-primary-100/60"
         )} />
      )}

      <button
        onClick={handleClick}
        className={cn(
          "relative z-10 w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full text-sm sm:text-base font-semibold transition-all duration-200 active:scale-95 will-change-transform",
          
          !isCurrentMonthStrict && (darkMode ? "text-slate-700 font-medium" : "text-slate-300 font-medium"),
          isCurrentMonthStrict && !selected && !today && (darkMode ? "text-slate-300 hover:bg-slate-800" : "text-slate-700 hover:bg-slate-100"),
          today && !selected && (darkMode ? "bg-slate-800 text-primary-400 ring-2 ring-primary-500/50" : "bg-white text-primary-600 ring-2 ring-primary-200 shadow-sm"),
          selected && "bg-primary-500 text-white shadow-lg shadow-primary-500/40 scale-105"
        )}
        title={!startTs ? "Select start date" : "Select end date"}
      >
        {day.getDate()}
        
        {/* Notes Indicator */}
        {hasNotes && (
          <span className={cn(
            "absolute bottom-1 right-1/2 translate-x-1/2 translate-y-1 sm:translate-y-2 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-colors will-change-transform",
            selected ? "bg-white" : "bg-amber-400 shadow-[0_0_4px_rgba(251,191,36,0.6)]"
          )} />
        )}
      </button>
    </div>
  );
});
