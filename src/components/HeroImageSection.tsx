import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { useCalendarStore } from '../store/calendarStore';
import { cn } from '../lib/utils';
import { memo } from 'react';

// Memoize HeroImage section so it doesn't re-render on hover/selection
export const HeroImageSection = memo(function HeroImageSection() {
  const currentMonthTs = useCalendarStore((s) => s.currentMonthTs);
  const darkMode = useCalendarStore((s) => s.darkMode);

  // Lazy loaded high-res climbing image
  const activeImage = 'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=2603&auto=format&fit=crop';

  return (
    <div className={cn(
      "relative w-full h-[320px] sm:h-[400px] md:h-full bg-slate-800 overflow-hidden group shrink-0 z-20 transition-colors",
      darkMode ? "border-slate-800" : "border-slate-100"
    )}>
      {/* Zoom / Parallax Wrapper */}
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

      {/* Gradient Overlays with will-change */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent mix-blend-multiply opacity-80 will-change-[opacity]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/30 via-transparent to-transparent opacity-60 will-change-[opacity]" />

      {/* Dynamic Cuts for Layout Integration */}
      <div className="hidden md:block absolute top-0 -right-px w-16 lg:w-24 h-full pointer-events-none z-10 will-change-transform">
         <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
           <path d="M100,0 L20,50 L100,100 Z" fill={darkMode ? "rgb(15, 23, 42, 0.8)" : "rgb(255, 255, 255, 0.6)"} className="transition-colors duration-500 backdrop-blur-3xl" />
         </svg>
      </div>
      
      <div className="md:hidden absolute bottom-0 left-0 w-full pointer-events-none z-10 leading-none will-change-transform">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-12 sm:h-16">
           <path d="M0,120 L0,60 L600,120 L1200,60 L1200,120 Z" fill={darkMode ? "rgb(15, 23, 42, 0.8)" : "rgb(255, 255, 255, 0.6)"} className="transition-colors duration-500 backdrop-blur-3xl" />
        </svg>
      </div>

      <div className="absolute bottom-8 left-6 sm:bottom-12 sm:left-10 md:bottom-16 md:left-12 z-20 text-white drop-shadow-2xl">
        <motion.div
           key={currentMonthTs + "text"}
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="flex flex-col items-start"
        >
          <span className="text-xl sm:text-2xl font-light tracking-[0.3em] text-white/80 uppercase">{format(currentMonthTs, 'yyyy')}</span>
          <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tighter mt-1 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">{format(currentMonthTs, 'MMMM')}</span>
        </motion.div>
      </div>

      {/* Aesthetic Binder Rings */}
      <div className="absolute top-0 left-0 w-full md:w-6 h-6 md:h-full flex flex-row md:flex-col justify-around md:justify-center px-12 md:px-0 md:py-24 pointer-events-none z-30 opacity-80 gap-1 md:gap-4 -translate-y-3 md:translate-y-0 md:-translate-x-3 will-change-transform">
         {Array.from({ length: 14 }).map((_, i) => (
           <div key={i} className="w-2 h-6 md:w-6 md:h-2 bg-gradient-to-br from-slate-300 via-slate-600 to-slate-900 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.5)] border border-slate-900/80 ring-1 ring-white/20" />
         ))}
      </div>
    </div>
  );
});
