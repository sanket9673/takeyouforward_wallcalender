import { useMemo } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { useCalendarStore } from '../store/calendarStore';

export function useCalendar() {
  const currentMonthTs = useCalendarStore((state) => state.currentMonthTs);
  
  return useMemo(() => {
    const currentMonth = new Date(currentMonthTs);
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
    
    // We store day timestamps directly for faster compares
    const dayTimestamps = eachDayOfInterval({
      start: startDate,
      end: endDate
    }).map(d => d.getTime());

    return {
      currentMonth,
      monthStartTs: monthStart.getTime(),
      monthEndTs: monthEnd.getTime(),
      dayTimestamps
    };
  }, [currentMonthTs]);
}
