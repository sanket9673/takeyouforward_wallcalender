import { HeroImageSection } from './HeroImageSection';
import { CalendarGrid } from './CalendarGrid';
import { NotesPanel } from './NotesPanel';

export function WallCalendar() {
  return (
    <div className="w-full max-w-[1000px] mx-auto bg-white rounded-3xl shadow-2xl shadow-slate-900/10 overflow-hidden flex flex-col ring-1 ring-slate-900/5 calendar-shadow">
      <HeroImageSection />
      {/* Container for bottom part to make it fit nice like the reference */}
      <div className="flex flex-col md:flex-row bg-white relative z-10 w-full">
         <NotesPanel />
         <CalendarGrid />
      </div>
    </div>
  );
}
