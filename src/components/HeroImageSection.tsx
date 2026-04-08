import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { useCalendarStore } from '../store/useCalendarStore';

export function HeroImageSection() {
  const currentMonth = useCalendarStore((state) => state.currentMonth);
  // Using an outdoor/mountain climbing image fitting to the design
  const activeImage = 'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=2603&auto=format&fit=crop';

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-[400px] bg-slate-200 overflow-hidden shrink-0">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentMonth.toISOString()}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          src={activeImage}
          alt="Calendar Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Shapes simulating the blue polygonal cut at the bottom of the image */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-20 sm:h-28 md:h-36">
           <path d="M0,60 L400,0 L800,120 L1200,40 L1200,120 L0,120 Z" fill="#0ea5e9" opacity="0.9" />
           <path d="M0,60 L400,0 L800,120 L1200,40 L1200,120 L0,120 Z" fill="#ffffff" transform="translate(0, 15)" />
        </svg>
      </div>

      <div className="absolute bottom-8 sm:bottom-12 right-6 sm:right-10 text-right z-10 text-white drop-shadow-lg">
        <motion.div
           key={currentMonth.toISOString()}
           initial={{ y: 10, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="flex flex-col items-end"
        >
          <span className="text-xl sm:text-2xl font-medium tracking-widest">{format(currentMonth, 'yyyy')}</span>
          <span className="text-3xl sm:text-5xl font-extrabold uppercase tracking-widest">{format(currentMonth, 'MMMM')}</span>
        </motion.div>
      </div>

      {/* Spiral Binder */}
      <div className="absolute top-[-10px] left-0 w-full flex justify-between px-8 sm:px-16 pt-2 overflow-visible">
         {Array.from({ length: 28 }).map((_, i) => (
           <div key={i} className="w-1.5 sm:w-2 h-8 sm:h-10 bg-gradient-to-b from-slate-400 via-slate-600 to-slate-800 rounded-full shadow-md border border-slate-900 z-20 top-[-10px] relative" />
         ))}
      </div>
      
      {/* Hanging hook */}
      <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-slate-700 shadow-md bg-transparent z-10" />
    </div>
  );
}
