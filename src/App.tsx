import { WallCalendar } from './components/WallCalendar';
import { useCalendarStore } from './store/calendarStore';
import { cn } from './lib/utils';
import { useEffect } from 'react';

function App() {
  const darkMode = useCalendarStore((s) => s.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center p-4 sm:p-8 font-sans transition-colors duration-500",
      darkMode ? "bg-slate-950" : "bg-slate-100/80"
    )}>
      <WallCalendar />
    </div>
  );
}

export default App;
