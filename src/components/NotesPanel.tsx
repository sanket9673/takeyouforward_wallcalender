import { useState, useMemo } from 'react';
import { useCalendarStore } from '../store/calendarStore';
import { useSelectionStore } from '../store/selectionStore';
import { useNotesStore } from '../store/notesStore';
import { format } from 'date-fns';
import { Plus, X, NotebookPen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export function NotesPanel() {
  const darkMode = useCalendarStore((s) => s.darkMode);
  const startTs = useSelectionStore(s => s.startTs);
  const endTs = useSelectionStore(s => s.endTs);
  
  const notes = useNotesStore(s => s.notes);
  const addNote = useNotesStore(s => s.addNote);
  const deleteNote = useNotesStore(s => s.deleteNote);

  const [newNote, setNewNote] = useState('');

  const displayDate = useMemo(() => {
    if (!startTs) return null;
    if (endTs) return `${format(startTs, 'MMM d')} - ${format(endTs, 'MMM d')}`;
    return format(startTs, 'MMM d');
  }, [startTs, endTs]);

  const activeDateStr = useMemo(() => startTs ? format(startTs, 'yyyy-MM-dd') : null, [startTs]);
  
  // Memoized exact notes lookup
  const activeNotes = useMemo(() => {
    if (!activeDateStr) return [];
    return notes.filter(n => n.dateStr === activeDateStr);
  }, [notes, activeDateStr]);
  
  const charLimit = 150;

  const handleAddMode = () => {
    if (!activeDateStr || !newNote.trim() || newNote.length > charLimit) return;
    addNote({ dateStr: activeDateStr, text: newNote.trim() });
    setNewNote('');
  };

  return (
    <div className={cn(
      "flex-[1.2] w-full lg:max-w-[340px] p-6 sm:p-10 flex flex-col shrink-0 min-h-[400px] lg:border-l relative z-20 backdrop-blur-xl transition-colors duration-500",
      darkMode ? "border-slate-800 bg-slate-900/50" : "border-slate-200/50 bg-white/50"
    )}>
       <div className="flex items-center justify-between mb-8 z-10">
         <h3 className={cn(
           "text-xl sm:text-2xl font-extrabold tracking-tight transition-colors",
           darkMode ? "text-slate-100" : "text-slate-800"
         )}>Event Notes</h3>
       </div>
       
       <div className="flex-1 overflow-y-auto mb-6 pr-2 custom-scrollbar min-h-[200px] relative">
         <AnimatePresence mode="wait">
           {!startTs ? (
             <motion.div 
               key="empty-state"
               initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
               className="h-full flex flex-col items-center justify-center space-y-4 pt-10"
             >
               <div className={cn(
                 "w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-colors",
                 darkMode ? "bg-slate-800/80 text-slate-600" : "bg-slate-100 text-slate-300"
               )}>
                 <NotebookPen className="w-8 h-8 opacity-80" />
               </div>
               <p className={cn(
                 "text-sm font-medium text-center",
                 darkMode ? "text-slate-400" : "text-slate-500"
               )}>Select a date or range <br/> to view and add notes.</p>
             </motion.div>
           ) : (
             <motion.div 
               key="active-notes"
               initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
               className="space-y-5"
             >
               <div className="flex items-center space-x-2 border-b pb-3 transition-colors border-slate-200/50 dark:border-slate-700/50">
                 <div className={cn(
                   "text-[10px] font-bold uppercase tracking-[0.15em] px-2 py-1 rounded truncate transition-colors",
                   darkMode ? "bg-primary-900/40 text-primary-400" : "bg-primary-50 text-primary-600"
                 )}>
                   {displayDate}
                 </div>
               </div>
               
               {activeNotes.length === 0 ? (
                  <div className="flex flex-col space-y-4 pt-4">
                    <p className={cn(
                      "text-sm italic",
                      darkMode ? "text-slate-500" : "text-slate-400"
                    )}>No entries for this selection.</p>
                    <div className="w-full space-y-4 opacity-50 pointer-events-none mt-2">
                       {[1, 2, 3].map(i => (
                         <div key={i} className={cn(
                           "w-full h-px",
                           darkMode ? "bg-slate-700" : "bg-slate-200/80"
                         )} />
                       ))}
                    </div>
                  </div>
               ) : (
                  <div className="space-y-3 pb-4">
                    <AnimatePresence>
                      {activeNotes.map(n => (
                        <motion.div 
                          key={n.id} 
                          initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: -10 }}
                          layout
                          className={cn(
                            "group relative p-3 sm:p-4 rounded-2xl text-sm shadow-sm leading-relaxed border transition-colors",
                            darkMode ? "bg-amber-900/20 border-amber-900/50 text-slate-300" : "bg-amber-50/70 border-amber-100 text-slate-700"
                          )}
                        >
                          <p className="pr-5">{n.text}</p>
                          <button 
                            onClick={() => deleteNote(n.id)} 
                            className={cn(
                              "absolute top-2 right-2 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm",
                              darkMode ? "bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-slate-700" : "bg-white text-slate-400 hover:text-red-500 hover:bg-red-50"
                            )}>
                            <X className="w-3.5 h-3.5" />
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

       {/* Form Area */}
       <div className="mt-auto pt-4 relative z-10">
         <motion.div 
           animate={!startTs ? { opacity: 0.4, pointerEvents: 'none' } : { opacity: 1, pointerEvents: 'auto' }}
           className="relative"
         >
           <textarea
             value={newNote}
             onChange={(e) => setNewNote(e.target.value)}
             onKeyDown={(e) => {
               if (e.key === 'Enter' && !e.shiftKey) {
                 e.preventDefault();
                 handleAddMode();
               }
             }}
             placeholder="Jot down something..."
             className={cn(
               "w-full p-4 sm:p-5 text-sm rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/50 mb-3 h-28 sm:h-32 transition-colors font-medium border shadow-inner custom-scrollbar",
               darkMode 
                 ? "bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500 focus:bg-slate-800/80" 
                 : "bg-white/80 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:bg-white"
             )}
           />
           <div className="absolute bottom-6 right-3 flex items-center space-x-2">
              <span className={cn(
                "text-[10px] font-bold tracking-wider",
                newNote.length > charLimit ? "text-red-500" : (darkMode ? "text-slate-500" : "text-slate-400")
              )}>
                {newNote.length}/{charLimit}
              </span>
           </div>
           
           <button
             onClick={handleAddMode}
             disabled={!newNote.trim() || !startTs || newNote.length > charLimit}
             className={cn(
               "w-full py-3.5 rounded-xl text-sm font-bold transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]",
               darkMode ? "bg-primary-600 hover:bg-primary-500 text-white shadow-primary-900/50" : "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20"
             )}
           >
             <Plus className="w-4 h-4" /> Save Entry
           </button>
         </motion.div>
       </div>
    </div>
  );
}
