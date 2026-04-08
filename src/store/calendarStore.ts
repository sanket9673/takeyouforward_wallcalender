import { create } from 'zustand';
import { addMonths, subMonths, startOfMonth } from 'date-fns';

interface CalendarState {
  currentMonthTs: number;
  darkMode: boolean;
  setMonth: (ts: number) => void;
  nextMonth: () => void;
  prevMonth: () => void;
  toggleDarkMode: () => void;
}

export const useCalendarStore = create<CalendarState>((set) => {
  const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('calendar-theme') : null;
  const initialDarkMode = storedTheme === 'dark';

  return {
    currentMonthTs: startOfMonth(new Date()).getTime(),
    darkMode: initialDarkMode,
    setMonth: (ts) => set({ currentMonthTs: startOfMonth(new Date(ts)).getTime() }),
    nextMonth: () => set((state) => ({ currentMonthTs: addMonths(new Date(state.currentMonthTs), 1).getTime() })),
    prevMonth: () => set((state) => ({ currentMonthTs: subMonths(new Date(state.currentMonthTs), 1).getTime() })),
    toggleDarkMode: () => set((state) => {
      const isDark = !state.darkMode;
      localStorage.setItem('calendar-theme', isDark ? 'dark' : 'light');
      return { darkMode: isDark };
    })
  };
});
