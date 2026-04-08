import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { useCalendarStore } from '../store/calendarStore';
import { cn } from '../lib/utils';
import { memo } from 'react';

export const HeroImageSection = memo(function HeroImageSection() {
  const currentMonthTs = useCalendarStore((s) => s.currentMonthTs);
  const darkMode = useCalendarStore((s) => s.darkMode);

  const activeImage = 'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=2603&auto=format&fit=crop';

  return (
    <div className={cn(
      "relative w-full h-48 sm:h-64 lg:h-full bg-slate-800 overflow-hidden group shrink-0 z-20 transition-colors",
      darkMode ? "border-slate-800" : "border-slate-100"
    )}>
      {/* Zoom Wrapper */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentMonthTs}
            initial={{ opacity: 0, scale: 1.15, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            src={activeImage}
            loading="lazy"
            alt="Calendar Hero"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[15s] ease-out group-hover:scale-110 will-change-transform"
          />
        </AnimatePresence>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent mix-blend-multiply opacity-80 will-change-[opacity]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/30 via-transparent to-transparent opacity-60 will-change-[opacity]" />

      {/* Right Edge Cut - Desktop Only */}
      <div className="hidden lg:block absolute top-0 -right-px w-20 xl:w-24 h-full pointer-events-none z-10 will-change-transform">
         <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
           <path d="M100,0 L20,50 L100,100 Z" fill={darkMode ? "rgb(15, 23, 42, 0.8)" : "rgb(255, 255, 255, 0.6)"} className="transition-colors duration-500 backdrop-blur-3xl" />
         </svg>
      </div>
      
      {/* Bottom Edge Cut - Mobile & Tablet only */}
      <div className="lg:hidden absolute bottom-0 left-0 w-full pointer-events-none z-10 leading-none will-change-transform translate-y-[1px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-10 sm:h-16">
           <path d="M0,120 L0,60 L600,120 L1200,60 L1200,120 Z" fill={darkMode ? "rgb(15, 23, 42, 0.8)" : "rgb(255, 255, 255, 0.6)"} className="transition-colors duration-500 backdrop-blur-3xl" />
        </svg>
      </div>

      <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 lg:bottom-16 lg:left-12 z-20 text-white drop-shadow-2xl">
        <motion.div
           key={currentMonthTs + "text"}
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="flex flex-col items-start"
        >
          <span className="text-lg sm:text-xl lg:text-2xl font-light tracking-[0.3em] text-white/80 uppercase">{format(currentMonthTs, 'yyyy')}</span>
          <span className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tighter mt-1 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">{format(currentMonthTs, 'MMMM')}</span>
        </motion.div>
      </div>

      {/* Aesthetic Binder Rings */}
      <div className="absolute top-0 left-0 w-full lg:w-6 h-6 lg:h-full flex flex-row lg:flex-col justify-around lg:justify-center px-8 lg:px-0 lg:py-24 pointer-events-none z-30 opacity-80 gap-2 lg:gap-4 -translate-y-2 lg:translate-y-0 lg:-translate-x-3 will-change-transform">
         {Array.from({ length: 14 }).map((_, i) => (
           <div key={i} className="hidden lg:block w-3 lg:w-6 h-1.5 lg:h-2 bg-gradient-to-br from-slate-300 via-slate-600 to-slate-900 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.5)] border border-slate-900/80 ring-1 ring-white/20" />
         ))}
         <div className="absolute w-full flex justify-between px-[10%] lg:hidden top-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="w-1.5 h-6 bg-gradient-to-b from-slate-400 to-slate-800 rounded-full shadow-lg border border-slate-900 ring-1 ring-white/20" />
            ))}
         </div>
      </div>
    </div>
  );
});
