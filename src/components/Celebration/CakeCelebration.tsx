import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Wind } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../../services/audioEngine';

interface CakeCelebrationProps {
  onContinueToChocolates: () => void;
}

export const CakeCelebration: React.FC<CakeCelebrationProps> = ({ onContinueToChocolates }) => {
  const [candlesBlown, setCandlesBlown] = useState<boolean>(false);
  const [isBlowing, setIsBlowing] = useState<boolean>(false);

  const handleBlowCandles = () => {
    if (candlesBlown || isBlowing) return;
    setIsBlowing(true);

    // Audio effect: whoosh of breath + celebration chimes
    audioEngine.playCandleBlow();

    // Trigger golden and rose celebration confetti burst
    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#FFD166', '#D9485F', '#E07085', '#FFF9F0', '#C9C0E8'],
      scalar: 1.1,
      ticks: 220,
    });

    setTimeout(() => {
      setCandlesBlown(true);
      setIsBlowing(false);
    }, 600);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 py-8 select-none text-center overflow-y-auto no-scrollbar">
      <div className="relative z-20 max-w-xl w-full flex flex-col items-center">
        {/* Narrative Intro */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-2"
        >
          <p className="text-xs sm:text-sm font-sans tracking-widest uppercase text-midnight/70 font-medium">
            A Moment for You
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl text-midnight font-normal mt-1">
            Before we open all your surprises, there's one important thing...
          </h2>
          <p className="font-handwriting text-2xl sm:text-3xl text-dustyRose-dark font-bold mt-1">
            Make a wish, Bangaram!
          </p>
        </motion.div>

        {/* 3D Tiered Floral Celebration Cake with 23 Milestone & Glowing Candles */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative my-4 flex flex-col items-center"
        >
          {/* Ambient Candlelight Golden Glow Aura */}
          <motion.div
            animate={{
              opacity: candlesBlown ? [0.5, 0] : [0.35, 0.65, 0.35],
              scale: candlesBlown ? [1, 1.2] : [0.96, 1.05, 0.96]
            }}
            transition={{
              duration: candlesBlown ? 0.8 : 2.4,
              repeat: candlesBlown ? 0 : Infinity,
              ease: 'easeInOut'
            }}
            className="absolute -top-12 w-64 h-64 rounded-full bg-radial from-[#FFE085]/35 via-[#FF9E4A]/15 to-transparent blur-2xl pointer-events-none z-0"
          />

          {/* Milestone 23 Golden Monogram Cake Topper */}
          <div className="relative z-20 -mb-2 flex items-center justify-center">
            <span className="font-display italic text-3xl sm:text-4xl font-bold text-[#C59B27] drop-shadow-[0_2px_8px_rgba(255,223,128,0.7)]">
              23
            </span>
          </div>

          {/* Golden Birthday Candles (3 primary decorative candles with glowing flames) */}
          <div className="flex items-end justify-center gap-4 sm:gap-6 z-20 -mb-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Flame with subtle animated flicker or smoke */}
                <AnimatePresence>
                  {!candlesBlown ? (
                    <motion.div
                      animate={{
                        scale: [1, 1.15, 0.95, 1.1, 1],
                        rotate: [-2, 3, -1, 2, -2],
                        filter: [
                          'drop-shadow(0 0 10px rgba(255, 200, 80, 0.9))',
                          'drop-shadow(0 0 16px rgba(255, 120, 40, 0.8))',
                          'drop-shadow(0 0 10px rgba(255, 200, 80, 0.9))',
                        ]
                      }}
                      transition={{ duration: 1.4 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="relative w-3.5 h-6 rounded-full bg-gradient-to-t from-[#FF6B35] via-[#FFAE19] to-[#FFF3B0] shadow-md"
                    >
                      <div className="absolute inset-1 rounded-full bg-[#FFFBEA] opacity-80" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 0, scale: 0.5 }}
                      animate={{ opacity: [0.8, 0], y: -25, scale: [1, 1.6] }}
                      transition={{ duration: 1.8 }}
                      className="w-2.5 h-6 rounded-full bg-slate-300/60 blur-[1px]"
                    />
                  )}
                </AnimatePresence>

                {/* Candle Wick */}
                <div className="w-0.5 h-2 bg-slate-800" />

                {/* Candle Pillar */}
                <div className="w-2.5 sm:w-3 h-9 sm:h-11 rounded-t-sm bg-gradient-to-r from-[#FFF1E0] via-[#F4D06F] to-[#E5B53D] shadow-sm border border-[#D4A737]" />
              </div>
            ))}
          </div>

          {/* Tier 1 (Top Tier - Rose Cream Frosting) */}
          <div className="relative z-10 w-44 sm:w-52 h-14 sm:h-16 rounded-t-xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF0E4] to-[#F2E0D0] border-2 border-[#E8D4C0] shadow-md flex items-center justify-center overflow-hidden">
            {/* Scalloped Frosting Drips */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-[#E5A8B2]/50 rounded-b-full flex justify-around">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-3 h-2.5 rounded-b-full bg-[#D97085]" />
              ))}
            </div>
            {/* Floral accents */}
            <span className="text-xs text-[#BA2D44] font-serif italic pt-3">
              ❀ Made for Bangaram ❀
            </span>
          </div>

          {/* Tier 2 (Bottom Tier - Champagne Vanilla with Rose Rosettes) */}
          <div className="relative w-64 sm:w-76 h-20 sm:h-24 rounded-t-2xl bg-gradient-to-b from-[#F9EFE2] via-[#EEDCC7] to-[#E2C7AF] border-2 border-[#D6BC9E] shadow-xl flex items-center justify-between px-4 overflow-hidden">
            {/* Rosette Garland */}
            <div className="absolute -top-1 left-0 right-0 h-4 flex justify-around">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-4 h-3.5 rounded-full bg-gradient-to-br from-[#E07085] to-[#B22234] shadow-sm" />
              ))}
            </div>

            <div className="w-full text-center pt-2">
              <span className="font-handwriting text-xl sm:text-2xl text-[#8C1625] font-bold">
                Twenty-Three Beautiful Years
              </span>
            </div>
          </div>

          {/* Ornate Gilded Cake Stand Pedestal */}
          <div className="relative w-72 sm:w-84 h-5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F4D06F] to-[#B38C22] shadow-2xl border border-[#FFEBB3] -mt-0.5" />
          <div className="w-24 sm:w-28 h-4 bg-gradient-to-b from-[#C59B27] to-[#8C6D15] rounded-b-lg shadow-md" />
        </motion.div>

        {/* Blow Out The Candle Button */}
        <AnimatePresence mode="wait">
          {!candlesBlown ? (
            <motion.div
              key="blow-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-3"
            >
              <button
                onClick={handleBlowCandles}
                disabled={isBlowing}
                className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D9485F] via-[#B22234] to-[#851E2E] hover:from-[#E6566D] hover:to-[#A32336] text-ivory font-sans text-sm sm:text-base font-semibold tracking-wide shadow-xl active:scale-95 transition-all hover:shadow-[0_0_25px_rgba(217,72,95,0.5)] cursor-pointer"
              >
                <Wind className="w-4 h-4 text-[#FFE085]" />
                <span>Blow Out the Candles! 🎂</span>
              </button>
              <p className="text-[11px] font-sans text-midnight/60 mt-2">
                Click the button to make your wish
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="wish-revealed"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-3 flex flex-col items-center w-full"
            >
              {/* Grand Birthday Message Card */}
              <div className="vintage-card p-5 sm:p-7 rounded-2xl max-w-lg mx-auto shadow-xl border border-dustyRose/40 space-y-2.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne/80 text-xs font-sans uppercase tracking-widest text-[#BA2D44] font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Wish Released Into The Universe</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-midnight font-normal tracking-wide">
                  23 looks beautiful on you, Bangaram.
                </h3>

                <p className="font-serif text-base sm:text-lg text-midnight/90 leading-relaxed italic">
                  "I hope that whatever you wished for finds its way to you. You deserve so many beautiful things."
                </p>

                <p className="font-handwriting text-xl sm:text-2xl text-dustyRose-dark font-bold pt-1">
                  Happy 23rd Birthday, Bangaram! May this chapter be your most joyful one yet.
                </p>
              </div>

              {/* Natural Flow Transition to Chocolates */}
              <div className="mt-5">
                <button
                  onClick={onContinueToChocolates}
                  className="flex items-center gap-2.5 px-7 py-3 rounded-full bg-midnight hover:bg-midnight-light text-ivory text-sm font-sans font-medium tracking-wide shadow-lg hover:shadow-xl active:scale-95 transition-all group cursor-pointer"
                >
                  <span>Now, time for something sweet... 🍫</span>
                  <ArrowRight className="w-4 h-4 text-[#FFE085] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
