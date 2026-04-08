import { create } from 'zustand';
import { addMonths, subMonths, startOfMonth } from 'date-fns';
import type { Note } from '../lib/types';

interface CalendarState {
  currentMonth: Date;
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  notes: Note[];
  setMonth: (date: Date) => void;
  nextMonth: () => void;
  prevMonth: () => void;
  selectDate: (date: Date) => void;
  resetSelection: () => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  editNote: (id: string, text: string) => void;
  deleteNote: (id: string) => void;
}

export const useCalendarStore = create<CalendarState>((set) => {
  const storedNotes = typeof window !== 'undefined' ? localStorage.getItem('calendar-notes') : null;
  const initialNotes = storedNotes ? JSON.parse(storedNotes) : [];

  return {
    currentMonth: startOfMonth(new Date()),
    selectedStartDate: null,
    selectedEndDate: null,
    notes: initialNotes,
    setMonth: (date) => set({ currentMonth: startOfMonth(date) }),
    nextMonth: () => set((state) => ({ currentMonth: addMonths(state.currentMonth, 1) })),
    prevMonth: () => set((state) => ({ currentMonth: subMonths(state.currentMonth, 1) })),
    selectDate: (date) => set((state) => {
      // If none selected, or both selected (reset)
      if (!state.selectedStartDate || (state.selectedStartDate && state.selectedEndDate)) {
        return { selectedStartDate: date, selectedEndDate: null };
      }
      // If start selected but new date is before it
      if (date < state.selectedStartDate) {
        return { selectedStartDate: date, selectedEndDate: state.selectedStartDate };
      }
      // Set end date
      return { selectedEndDate: date };
    }),
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
    })
  };
});
