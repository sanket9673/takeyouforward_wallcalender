import { useCalendarStore } from '../store/useCalendarStore';

export function useNotes() {
  const { notes, addNote, editNote, deleteNote } = useCalendarStore();

  const getNotesForDate = (dateStr: string) => {
    return notes.filter(n => n.dateStr === dateStr);
  };

  const hasNotes = (dateStr: string) => {
    return notes.some(n => n.dateStr === dateStr);
  };

  return {
    notes,
    addNote,
    editNote,
    deleteNote,
    getNotesForDate,
    hasNotes
  };
}
