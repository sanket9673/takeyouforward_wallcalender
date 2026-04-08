import { useCalendarStore } from '../store/useCalendarStore';
import { isWithinInterval, isSameDay, isBefore } from 'date-fns';

export function useDateRange() {
  const { selectedStartDate, selectedEndDate, hoveredDate, selectDate, setHoverDate, resetSelection } = useCalendarStore();

  const isSelected = (date: Date) => {
    if (selectedStartDate && isSameDay(date, selectedStartDate)) return true;
    if (selectedEndDate && isSameDay(date, selectedEndDate)) return true;
    return false;
  };

  const isInRange = (date: Date) => {
    // Exact selected range
    if (selectedStartDate && selectedEndDate) {
      if (isSameDay(date, selectedStartDate) || isSameDay(date, selectedEndDate)) return false;
      return isWithinInterval(date, { start: selectedStartDate, end: selectedEndDate });
    }
    // Hover preview range
    if (selectedStartDate && !selectedEndDate && hoveredDate) {
      if (isSameDay(date, selectedStartDate) || isSameDay(date, hoveredDate)) return false;
      // Ensure hoverDate is after startDate for forward highlighting
      if (!isBefore(hoveredDate, selectedStartDate)) {
        return isWithinInterval(date, { start: selectedStartDate, end: hoveredDate });
      }
    }
    return false;
  };

  const isStart = (date: Date) => selectedStartDate ? isSameDay(date, selectedStartDate) : false;
  const isEnd = (date: Date) => {
    if (selectedEndDate) return isSameDay(date, selectedEndDate);
    if (selectedStartDate && !selectedEndDate && hoveredDate && !isBefore(hoveredDate, selectedStartDate)) {
      return isSameDay(date, hoveredDate);
    }
    return false;
  };

  return {
    selectedStartDate,
    selectedEndDate,
    hoveredDate,
    selectDate,
    setHoverDate,
    resetSelection,
    isSelected,
    isInRange,
    isStart,
    isEnd
  };
}
