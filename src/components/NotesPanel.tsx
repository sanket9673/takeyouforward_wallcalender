import { useState } from 'react';
import { useCalendarStore } from '../store/useCalendarStore';
import { useDateRange } from '../hooks/useDateRange';
import { format } from 'date-fns';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function NotesPanel() {
  const { notes, addNote, deleteNote } = useCalendarStore();
  const { selectedStartDate, selectedEndDate } = useDateRange();
  const [newNote, setNewNote] = useState('');

  const displayDate = selectedStartDate 
    ? (selectedEndDate ? `${format(selectedStartDate, 'MMM d')} - ${format(selectedEndDate, 'MMM d')}` : format(selectedStartDate, 'MMM d'))
    : null;

  const activeDateStr = selectedStartDate ? format(selectedStartDate, 'yyyy-MM-dd') : null;
  const activeNotes = activeDateStr ? notes.filter(n => n.dateStr === activeDateStr) : [];

  const handleAddMode = () => {
    if (!activeDateStr || !newNote.trim()) return;
    addNote({ dateStr: activeDateStr, text: newNote.trim() });
    setNewNote('');
  };

  return (
    <div className="flex-1 w-full md:max-w-xs p-6 sm:p-10 bg-white md:border-r border-slate-100 flex flex-col shrink-0 min-h-[300px]">
       <h3 className="text-xl font-bold text-slate-800 mb-6 font-sans">Notes</h3>
       
       <div className="flex-1 overflow-y-auto mb-6 custom-scrollbar pr-2 min-h-[150px]">
         <AnimatePresence mode="wait">
           {!selectedStartDate ? (
             <motion.div 
               key="empty"
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="h-full flex flex-col justify-start space-y-4 pt-2"
             >
               {/* Placeholder lines to mimic physical calendar notes section */}
               {[1, 2, 3, 4, 5, 6].map(i => (
                 <div key={i} className="w-full h-px bg-slate-200" />
               ))}
               <p className="text-xs text-slate-400 italic mt-4 text-center">Select a date to write notes.</p>
             </motion.div>
           ) : (
             <motion.div 
               key="notes"
               initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
               className="space-y-4"
             >
               <div className="text-xs font-bold text-primary-500 uppercase tracking-wider mb-4 border-b border-primary-100 pb-2">
                 {displayDate}
               </div>
               
               {activeNotes.length === 0 ? (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-400">No notes for this selection.</p>
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-full h-px bg-slate-200" />
                    ))}
                  </div>
               ) : (
                  <div className="space-y-3">
                    <AnimatePresence>
                      {activeNotes.map(n => (
                        <motion.div 
                          key={n.id} 
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                          className="group relative bg-amber-50/50 p-3 rounded-lg border border-amber-100/50 text-sm text-slate-700 shadow-sm leading-relaxed"
                        >
                          {n.text}
                          <button onClick={() => deleteNote(n.id)} className="absolute -top-2 -right-2 w-5 h-5 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500 hover:border-red-500 shadow-sm">
                            <X className="w-3 h-3" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
               )}
             </motion.div>
           )}
         </AnimatePresence>
       </div>

       <div className="mt-auto pt-4 relative">
         <div className={!selectedStartDate ? "opacity-50 pointer-events-none transition-opacity" : "transition-opacity"}>
           <textarea
             value={newNote}
             onChange={(e) => setNewNote(e.target.value)}
             onKeyDown={(e) => {
               if (e.key === 'Enter' && !e.shiftKey) {
                 e.preventDefault();
                 handleAddMode();
               }
             }}
             placeholder="Add a new note..."
             disabled={!selectedStartDate}
             className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/50 mb-3 h-24 transition-all placeholder:text-slate-400 font-medium"
           />
           <button
             onClick={handleAddMode}
             disabled={!newNote.trim() || !selectedStartDate}
             className="w-full py-3 bg-slate-800 text-white rounded-xl text-sm font-semibold hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
           >
             <Plus className="w-4 h-4" /> Save Entry
           </button>
         </div>
       </div>
    </div>
  );
}
