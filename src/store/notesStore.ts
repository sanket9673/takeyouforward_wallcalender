import { create } from 'zustand';
import type { Note } from '../lib/types';

interface NotesState {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  editNote: (id: string, text: string) => void;
  deleteNote: (id: string) => void;
}

export const useNotesStore = create<NotesState>((set) => {
  const storedNotes = typeof window !== 'undefined' ? localStorage.getItem('calendar-notes') : null;
  const initialNotes = storedNotes ? JSON.parse(storedNotes) : [];

  return {
    notes: initialNotes,
    addNote: (note) => set((state) => {
      const newNote = { ...note, id: crypto.randomUUID(), createdAt: Date.now() };
      const newNotes = [...state.notes, newNote];
      // Note: real apps might use an async task or debounced effect to save to DB/Localstorage
      requestIdleCallback(() => localStorage.setItem('calendar-notes', JSON.stringify(newNotes)));
      return { notes: newNotes };
    }),
    editNote: (id, text) => set((state) => {
      const newNotes = state.notes.map(n => n.id === id ? { ...n, text } : n);
      requestIdleCallback(() => localStorage.setItem('calendar-notes', JSON.stringify(newNotes)));
      return { notes: newNotes };
    }),
    deleteNote: (id) => set((state) => {
      const newNotes = state.notes.filter(n => n.id !== id);
      requestIdleCallback(() => localStorage.setItem('calendar-notes', JSON.stringify(newNotes)));
      return { notes: newNotes };
    })
  };
});
