import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { useCalendarStore } from '../store/useCalendarStore';

export function useCalendar() {
  const currentMonth = useCalendarStore((state) => state.currentMonth);
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  
  const days = eachDayOfInterval({
    start: startDate,
    end: endDate
  });

  return {
    currentMonth,
    days,
    monthStart,
    monthEnd
  };
}
