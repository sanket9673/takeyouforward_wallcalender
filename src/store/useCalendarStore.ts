import { create } from 'zustand';
import { addMonths, subMonths, startOfMonth, isBefore } from 'date-fns';
import type { Note } from '../lib/types';

interface CalendarState {
  currentMonth: Date;
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  hoveredDate: Date | null;
  notes: Note[];
  darkMode: boolean;
  setMonth: (date: Date) => void;
  nextMonth: () => void;
  prevMonth: () => void;
  selectDate: (date: Date) => void;
  setHoverDate: (date: Date | null) => void;
  resetSelection: () => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  editNote: (id: string, text: string) => void;
  deleteNote: (id: string) => void;
  toggleDarkMode: () => void;
}

export const useCalendarStore = create<CalendarState>((set) => {
  const storedNotes = typeof window !== 'undefined' ? localStorage.getItem('calendar-notes') : null;
  const initialNotes = storedNotes ? JSON.parse(storedNotes) : [];
  const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('calendar-theme') : null;
  const initialDarkMode = storedTheme === 'dark';

  return {
    currentMonth: startOfMonth(new Date()),
    selectedStartDate: null,
    selectedEndDate: null,
    hoveredDate: null,
    notes: initialNotes,
    darkMode: initialDarkMode,
    setMonth: (date) => set({ currentMonth: startOfMonth(date) }),
    nextMonth: () => set((state) => ({ currentMonth: addMonths(state.currentMonth, 1) })),
    prevMonth: () => set((state) => ({ currentMonth: subMonths(state.currentMonth, 1) })),
    selectDate: (date) => set((state) => {
      if (!state.selectedStartDate || (state.selectedStartDate && state.selectedEndDate)) {
        return { selectedStartDate: date, selectedEndDate: null };
      }
      if (isBefore(date, state.selectedStartDate)) {
        return { selectedStartDate: date, selectedEndDate: state.selectedStartDate };
      }
      return { selectedEndDate: date };
    }),
    setHoverDate: (date) => set({ hoveredDate: date }),
    resetSelection: () => set({ selectedStartDate: null, selectedEndDate: null }),
    addNote: (note) => set((state) => {
      const newNote = { ...note, id: crypto.randomUUID(), createdAt: Date.now() };
      const newNotes = [...state.notes, newNote];
      localStorage.setItem('calendar-notes', JSON.stringify(newNotes));
      return { notes: newNotes };
    }),
    editNote: (id, text) => set((state) => {
      const newNotes = state.notes.map(n => n.id === id ? { ...n, text } : n);
      localStorage.setItem('calendar-notes', JSON.stringify(newNotes));
      return { notes: newNotes };
    }),
    deleteNote: (id) => set((state) => {
      const newNotes = state.notes.filter(n => n.id !== id);
      localStorage.setItem('calendar-notes', JSON.stringify(newNotes));
      return { notes: newNotes };
    }),
    toggleDarkMode: () => set((state) => {
      const isDark = !state.darkMode;
      localStorage.setItem('calendar-theme', isDark ? 'dark' : 'light');
      return { darkMode: isDark };
    })
  };
});
