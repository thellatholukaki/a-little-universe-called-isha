import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Flower2, Heart, Moon, BookOpen, X, ArrowRight, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WISHES } from '../../data/wishes';
import { Wish } from '../../types';
import { audioEngine } from '../../services/audioEngine';

interface Scene5TwentyThreeWishesProps {
  onNext: () => void;
}

export const Scene5TwentyThreeWishes: React.FC<Scene5TwentyThreeWishesProps> = ({ onNext }) => {
  const [openedWishIds, setOpenedWishIds] = useState<Set<number>>(new Set([1]));
  const [activeWish, setActiveWish] = useState<Wish | null>(null);

  const handleOpenWish = (wish: Wish) => {
    setActiveWish(wish);
    if (!openedWishIds.has(wish.id)) {
      const nextOpened = new Set(openedWishIds);
      nextOpened.add(wish.id);
      setOpenedWishIds(nextOpened);

      // Play celestial chime
      audioEngine.playWishChime();

      // Confetti burst on reaching all 23 wishes
      if (nextOpened.size === 23) {
        confetti({
          particleCount: 60,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#D9A6A0', '#C9C0E8', '#A9B7A0', '#C59B27', '#E9DCCB'],
        });
      }
    }
  };

  const handleNextWishInModal = () => {
    if (!activeWish) return;
    const nextIndex = (activeWish.id % 23); // 1-based to next index
    const nextWish = WISHES[nextIndex];
    handleOpenWish(nextWish);
  };

  const getWishIcon = (type: Wish['iconType'], isOpened: boolean) => {
    const className = `w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
      isOpened ? 'text-dustyRose-dark scale-110' : 'text-midnight/60'
    }`;
    switch (type) {
      case 'flower': return <Flower2 className={className} />;
      case 'star': return <Star className={className} />;
      case 'heart': return <Heart className={className} />;
      case 'moon': return <Moon className={className} />;
      case 'book': return <BookOpen className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-3 sm:px-6 py-10 select-none overflow-y-auto no-scrollbar">
      <div className="relative z-20 max-w-4xl w-full flex flex-col items-center">
        {/* Section Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-champagne/70 border border-dustyRose/30 text-xs font-sans tracking-widest uppercase text-midnight/80 mb-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-dustyRose-dark" />
          <span>Milestone Constellation</span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl text-midnight font-normal text-center mb-1"
        >
          23 Wishes for 23
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-handwriting text-lg sm:text-2xl text-dustyRose-dark text-center mb-4"
        >
          Tap any star to unfold a personal birthday wish
        </motion.p>

        {/* Progress Tracker */}
        <div className="w-full max-w-xs sm:max-w-md flex flex-col items-center mb-5">
          <div className="flex items-center justify-between w-full text-xs font-sans text-midnight/70 mb-1.5 px-1">
            <span>Wishes Unfolded</span>
            <span className="font-semibold text-dustyRose-dark">{openedWishIds.size} of 23</span>
          </div>
          <div className="w-full h-2 bg-champagne-light rounded-full overflow-hidden border border-champagne">
            <motion.div
              className="h-full bg-gradient-to-r from-dustyRose via-lavender to-dustyRose-dark rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(openedWishIds.size / 23) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* 23 Wishes Interactive Celestial Constellation Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-3 p-3 sm:p-5 rounded-2xl vintage-card border border-dustyRose/25 max-w-3xl w-full justify-items-center"
        >
          {WISHES.map((wish) => {
            const isOpened = openedWishIds.has(wish.id);
            return (
              <motion.button
                key={wish.id}
                onClick={() => handleOpenWish(wish)}
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.92 }}
                className={`relative w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
                  isOpened
                    ? 'bg-ivory-100 border border-dustyRose/50 shadow-sm'
                    : 'bg-champagne/40 border border-dashed border-champagne-dark/60 hover:bg-champagne/80 hover:border-dustyRose'
                }`}
                title={`Wish #${wish.id}: ${wish.title}`}
                aria-label={`Wish ${wish.id}`}
              >
                {/* Number in corner */}
                <span className="absolute top-0.5 left-1 text-[9px] font-mono text-midnight/50">
                  {wish.id}
                </span>

                {/* Wish Icon */}
                <div className="mt-1">
                  {getWishIcon(wish.iconType, isOpened)}
                </div>

                {/* Soft Unopened Pulse Ping */}
                {!isOpened && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dustyRose opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-dustyRose"></span>
                  </span>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Completion Banner */}
        {openedWishIds.size === 23 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 px-4 py-2 rounded-full bg-lavender-light/70 border border-lavender text-midnight font-serif text-sm italic flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-dustyRose-dark" />
            <span>All 23 wishes have been released into your universe!</span>
          </motion.div>
        )}

        {/* Next Scene Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 flex items-center justify-center"
        >
          <button
            onClick={onNext}
            className="flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-midnight hover:bg-midnight-light text-ivory text-xs sm:text-sm font-sans font-medium tracking-wide transition-all shadow-md hover:shadow-lg group"
          >
            <span>One last little thought</span>
            <ArrowRight className="w-4 h-4 text-champagne group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Interactive Wish Modal */}
      <AnimatePresence>
        {activeWish && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative w-full max-w-md rounded-2xl bg-ivory border-2 border-[#E3D6C1] shadow-2xl p-6 sm:p-8 text-center overflow-hidden"
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-dustyRose via-lavender to-dustyRose-dark" />

              {/* Close Button */}
              <button
                onClick={() => setActiveWish(null)}
                className="absolute top-4 right-4 p-1.5 text-midnight/50 hover:text-midnight hover:bg-champagne/40 rounded-full transition-all focus:outline-none"
                aria-label="Close wish"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Wish Number Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne/70 border border-dustyRose/30 text-[11px] font-sans tracking-widest uppercase text-midnight/80 mb-4">
                <Sparkles className="w-3 h-3 text-dustyRose-dark" />
                <span>Wish #{activeWish.id} of 23</span>
              </div>

              {/* Wish Title */}
              <h3 className="font-serif text-2xl sm:text-3xl text-midnight font-medium mb-3 leading-snug">
                {activeWish.title}
              </h3>

              {/* Wish Reflection */}
              <p className="font-serif italic text-base sm:text-lg text-midnight/85 leading-relaxed px-2 mb-6">
                "{activeWish.reflection}"
              </p>

              {/* Bottom Buttons */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setActiveWish(null)}
                  className="px-4 py-2 rounded-full border border-champagne-dark/60 text-midnight text-xs font-sans font-medium hover:bg-champagne/40 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={handleNextWishInModal}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-dustyRose hover:bg-dustyRose-dark text-ivory text-xs font-sans font-medium tracking-wide shadow-sm hover:shadow transition-all"
                >
                  <span>Next Wish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
