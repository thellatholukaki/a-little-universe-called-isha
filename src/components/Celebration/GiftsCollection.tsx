import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift as GiftIcon, Heart, X, ArrowRight, Check, Star, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CELEBRATION_GIFTS } from '../../data/gifts';
import { CelebrationGift } from '../../types';
import { audioEngine } from '../../services/audioEngine';

interface GiftsCollectionProps {
  onContinueToSketches: () => void;
  onContinueToLetter: () => void;
}

export const GiftsCollection: React.FC<GiftsCollectionProps> = ({ 
  onContinueToSketches, 
  onContinueToLetter 
}) => {
  const [openedGiftIds, setOpenedGiftIds] = useState<Set<number>>(() => {
    const saved = sessionStorage.getItem('isha_opened_gifts');
    return saved ? new Set(JSON.parse(saved)) : new Set([1]);
  });
  const [activeGift, setActiveGift] = useState<CelebrationGift | null>(null);

  const handleOpenGiftModal = (gift: CelebrationGift) => {
    setActiveGift(gift);
    audioEngine.playGiftOpen();

    if (!openedGiftIds.has(gift.id)) {
      const nextOpened = new Set(openedGiftIds).add(gift.id);
      setOpenedGiftIds(nextOpened);
      sessionStorage.setItem('isha_opened_gifts', JSON.stringify([...nextOpened]));

      if (nextOpened.size === 23) {
        confetti({
          particleCount: 65,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#D9485F', '#FFD166', '#C9C0E8', '#BA2D44', '#FFF9F0'],
        });
      }
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start px-3 sm:px-6 py-6 select-none text-center overflow-y-auto no-scrollbar">
      <div className="relative z-20 max-w-4xl w-full flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-2"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-dustyRose/20 border border-dustyRose/40 text-xs font-sans tracking-widest uppercase text-midnight font-medium mb-1">
            <GiftIcon className="w-3.5 h-3.5 text-dustyRose-dark" />
            <span>23 Wishes For 23 Years</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl text-midnight font-normal">
            23 Days, 23 Different Gifts
          </h2>

          <p className="font-handwriting text-lg sm:text-2xl text-dustyRose-dark font-semibold mt-0.5">
            Each one wrapped with a special wish just for you
          </p>
        </motion.div>

        {/* Progress Pill */}
        <div className="w-full max-w-xs sm:max-w-md flex flex-col items-center mb-4">
          <div className="flex items-center justify-between w-full text-xs font-sans text-midnight/70 mb-1 px-1">
            <span>Celebration Progress</span>
            <span className="font-bold text-[#BA2D44]">
              {openedGiftIds.size} of 23 surprises opened
            </span>
          </div>
          <div className="w-full h-2 bg-champagne-light rounded-full overflow-hidden border border-champagne">
            <motion.div
              className="h-full bg-gradient-to-r from-dustyRose via-[#BA2D44] to-[#C59B27] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(openedGiftIds.size / 23) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* 23 Individually Wrapped Distinct Gift Boxes Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5 sm:gap-3.5 w-full justify-items-center mb-6">
          {CELEBRATION_GIFTS.map((gift) => {
            const isOpened = openedGiftIds.has(gift.id);
            const isSpecial = gift.isSpecialFinal;

            return (
              <motion.button
                key={gift.id}
                onClick={() => handleOpenGiftModal(gift)}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.92 }}
                className={`relative w-16 h-18 sm:w-20 sm:h-22 rounded-2xl flex flex-col items-center justify-between p-2 shadow-lg transition-all duration-300 border-2 cursor-pointer ${
                  gift.boxBorder
                } bg-gradient-to-br ${gift.boxColor} ${
                  isSpecial ? 'col-span-2 sm:col-span-2 md:col-span-2 w-full ring-2 ring-[#FFDF80] shadow-[0_0_15px_rgba(255,223,128,0.5)]' : ''
                }`}
              >
                {/* Ribbon Wrap (Cross ribbons) */}
                <div className={`absolute top-0 bottom-0 w-2.5 sm:w-3 ${gift.ribbonColor} opacity-90 shadow-sm`} />
                <div className={`absolute left-0 right-0 h-2.5 sm:h-3 ${gift.ribbonColor} opacity-90 shadow-sm`} />

                {/* Gift Ribbon Bow */}
                <div className="relative z-10 w-4 h-4 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 flex items-center justify-center text-[10px]">
                  {isSpecial ? '👑' : isOpened ? '✓' : '🎀'}
                </div>

                {/* Gift Number Badge */}
                <div className="relative z-10 px-1.5 py-0.5 rounded-full bg-black/40 text-ivory text-[10px] font-mono font-bold tracking-tight">
                  #{gift.id}
                </div>

                {/* Unopened Ping Indicator */}
                {!isOpened && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 z-20">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFDF80] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFD166]"></span>
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Natural Narrative Flow Buttons (No traditional next/prev, contextual choice) */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1 pb-6">
          <button
            onClick={onContinueToSketches}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-ivory-200 hover:bg-champagne border border-dustyRose/40 text-midnight text-xs sm:text-sm font-sans font-medium tracking-wide shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <span>Turn to the Sketchbook 🎨</span>
          </button>

          <button
            onClick={onContinueToLetter}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-midnight hover:bg-midnight-light text-ivory text-xs sm:text-sm font-sans font-medium tracking-wide shadow-md hover:shadow-lg active:scale-95 transition-all group cursor-pointer"
          >
            <span>Read your personal letter 💌</span>
            <ArrowRight className="w-4 h-4 text-[#FFE085] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Individual Gift Opening Modal */}
      <AnimatePresence>
        {activeGift && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/55 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 25 }}
              className={`relative w-full max-w-md rounded-3xl bg-[#FFFDF9] border-2 shadow-2xl p-6 sm:p-8 text-center overflow-hidden ${
                activeGift.isSpecialFinal ? 'border-[#C59B27] ring-4 ring-[#FFDF80]/40' : 'border-[#E2D4BF]'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveGift(null)}
                className="absolute top-4 right-4 p-1.5 text-midnight/50 hover:text-midnight rounded-full"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Gift Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne/70 border border-dustyRose/30 text-[11px] font-sans tracking-widest uppercase text-midnight/80 mb-3">
                <Sparkles className="w-3 h-3 text-[#BA2D44]" />
                <span>
                  {activeGift.isSpecialFinal ? 'Special Grand Gift #23' : `Gift #${activeGift.id} of 23`}
                </span>
              </div>

              {/* Gift Title */}
              <h3 className="font-serif text-2xl sm:text-3xl text-midnight font-medium mb-1">
                {activeGift.giftName}
              </h3>

              {/* Wish Highlight */}
              <div className="py-2">
                <span className="font-serif italic text-lg sm:text-xl text-[#BA2D44] font-semibold">
                  "{activeGift.wish}"
                </span>
              </div>

              <div className="w-12 h-px bg-dustyRose/30 mx-auto my-2" />

              {/* Reflection / Personal Message */}
              <p className={`font-serif leading-relaxed px-2 text-midnight/90 ${
                activeGift.isSpecialFinal ? 'font-handwriting text-2xl text-[#8C1625] font-bold py-2 leading-snug' : 'text-sm sm:text-base italic'
              }`}>
                {activeGift.reflection}
              </p>

              {/* Close / Return to Collection */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setActiveGift(null)}
                  className="px-6 py-2 rounded-full bg-midnight hover:bg-midnight-light text-ivory text-xs font-sans font-medium tracking-wide shadow-md transition-colors"
                >
                  Return to Gifts Collection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
