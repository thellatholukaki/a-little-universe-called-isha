import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Scene2BirthdayRevealProps {
  onNext: () => void;
}

export const Scene2BirthdayReveal: React.FC<Scene2BirthdayRevealProps> = ({ onNext }) => {
  useEffect(() => {
    // Elegant soft confetti on entrance
    const timer = setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D9A6A0', '#C9C0E8', '#A9B7A0', '#E9DCCB', '#C59B27'],
      });
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleConfettiBurst = () => {
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#D9A6A0', '#C9C0E8', '#A9B7A0', '#C59B27'],
    });
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 py-12 select-none overflow-y-auto no-scrollbar">
      {/* Decorative Wreath SVG Background Outline */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
        <svg width="480" height="480" viewBox="0 0 200 200" className="animate-spin-slow">
          <circle cx="100" cy="100" r="85" fill="none" stroke="#252641" strokeWidth="0.75" strokeDasharray="4,6" />
          <circle cx="100" cy="100" r="92" fill="none" stroke="#D9A6A0" strokeWidth="0.5" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-20 max-w-2xl w-full text-center flex flex-col items-center"
      >
        {/* Date Milestone Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne/70 border border-dustyRose/40 text-xs sm:text-sm font-sans tracking-widest uppercase text-midnight/80 mb-5 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-dustyRose-dark" />
          <span>24 November 2026</span>
          <span className="w-1.5 h-1.5 rounded-full bg-dustyRose" />
          <span>A Special Milestone</span>
        </motion.div>

        {/* Milestone Number '23' with Botanical Wreath Accent */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative my-2"
        >
          <span className="font-display italic text-6xl sm:text-7xl md:text-8xl rose-gold-shimmer font-semibold drop-shadow-sm select-none">
            23
          </span>
        </motion.div>

        {/* Main Grand Birthday Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-midnight font-normal tracking-wide uppercase leading-tight sm:leading-snug mb-6"
        >
          Happy 23<sup className="text-xl sm:text-2xl md:text-3xl normal-case">rd</sup> Birthday,
          <br />
          <span className="font-serif italic font-medium text-dustyRose-dark">
            Isha
          </span>
        </motion.h1>

        {/* Decorative Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '80px' }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-px bg-gradient-to-r from-transparent via-dustyRose to-transparent mb-6"
        />

        {/* Supporting Message Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="vintage-card p-6 sm:p-8 rounded-2xl max-w-xl mx-auto shadow-md border border-dustyRose/20 relative"
        >
          {/* Corner Flourish Accents */}
          <span className="absolute top-2 left-2 text-dustyRose/40 text-xs">✦</span>
          <span className="absolute top-2 right-2 text-dustyRose/40 text-xs">✦</span>
          <span className="absolute bottom-2 left-2 text-dustyRose/40 text-xs">✦</span>
          <span className="absolute bottom-2 right-2 text-dustyRose/40 text-xs">✦</span>

          <p className="font-serif text-lg sm:text-xl md:text-2xl text-midnight/90 leading-relaxed italic font-normal">
            "Today isn't just another date on the calendar. It's a little reminder that the world became a little more interesting 23 years ago."
          </p>

          <p className="font-handwriting text-xl sm:text-2xl text-dustyRose-dark mt-4 font-semibold">
            May this year bloom softly for you.
          </p>
        </motion.div>

        {/* Action Controls */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8"
        >
          {/* Confetti tap */}
          <button
            onClick={handleConfettiBurst}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-ivory-300 hover:bg-champagne/80 border border-dustyRose/30 text-midnight text-xs sm:text-sm font-sans font-medium tracking-wide transition-all shadow-sm active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-dustyRose" />
            <span>Celebrate with petals</span>
          </button>

          {/* Turn the page */}
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-midnight hover:bg-midnight-light text-ivory text-xs sm:text-sm font-sans font-medium tracking-wide transition-all shadow-md active:scale-95 hover:shadow-lg group"
          >
            <span>Turn the page</span>
            <ArrowRight className="w-4 h-4 text-champagne group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
