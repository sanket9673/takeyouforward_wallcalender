import { useCalendarStore } from '../store/useCalendarStore';
import { isWithinInterval, isSameDay } from 'date-fns';

export function useDateRange() {
  const { selectedStartDate, selectedEndDate, selectDate, resetSelection } = useCalendarStore();

  const isSelected = (date: Date) => {
    if (selectedStartDate && isSameDay(date, selectedStartDate)) return true;
    if (selectedEndDate && isSameDay(date, selectedEndDate)) return true;
    return false;
  };

  const isInRange = (date: Date) => {
    if (selectedStartDate && selectedEndDate) {
      if (isSameDay(date, selectedStartDate) || isSameDay(date, selectedEndDate)) return false;
      return isWithinInterval(date, { start: selectedStartDate, end: selectedEndDate });
    }
    return false;
  };

  const isStart = (date: Date) => selectedStartDate ? isSameDay(date, selectedStartDate) : false;
  const isEnd = (date: Date) => selectedEndDate ? isSameDay(date, selectedEndDate) : false;

  return {
    selectedStartDate,
    selectedEndDate,
    selectDate,
    resetSelection,
    isSelected,
    isInRange,
    isStart,
    isEnd
  };
}
