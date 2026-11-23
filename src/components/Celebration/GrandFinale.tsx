import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Eye, EyeOff, Cake, Gift, Heart, Feather } from 'lucide-react';
import { CelebrationStage } from '../../types';

interface GrandFinaleProps {
  onRestart: () => void;
  onNavigateStage: (stage: CelebrationStage) => void;
}

export const GrandFinale: React.FC<GrandFinaleProps> = ({ 
  onRestart,
  onNavigateStage 
}) => {
  const [stargazingMode, setStargazingMode] = useState<boolean>(false);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start sm:justify-center px-4 sm:px-6 py-6 sm:py-8 select-none text-center overflow-y-auto no-scrollbar text-ivory">
      {/* Luminous Crescent Moon */}
      <div className="absolute top-6 right-6 sm:top-10 sm:right-20 pointer-events-none z-10 flex flex-col items-center">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            filter: [
              'drop-shadow(0 0 20px rgba(255, 249, 240, 0.45))',
              'drop-shadow(0 0 35px rgba(201, 192, 232, 0.65))',
              'drop-shadow(0 0 20px rgba(255, 249, 240, 0.45))'
            ]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="52" height="52" viewBox="0 0 100 100" fill="none">
            <path
              d="M75,20 C50,25 35,45 40,70 C43,85 55,95 70,98 C45,102 20,85 18,55 C16,28 38,10 75,20 Z"
              fill="#FFFDF7"
            />
            <circle cx="35" cy="45" r="4" fill="#E8DCC9" opacity="0.3" />
            <circle cx="38" cy="62" r="3" fill="#E8DCC9" opacity="0.25" />
          </svg>
        </motion.div>
      </div>

      <div className="relative z-20 max-w-2xl w-full flex flex-col items-center my-auto">
        {/* Stargazing Mode Switch */}
        <div className="mb-3">
          <button
            onClick={() => setStargazingMode(!stargazingMode)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[11px] font-sans tracking-widest uppercase text-ivory/80 transition-all backdrop-blur-sm cursor-pointer"
          >
            {stargazingMode ? (
              <>
                <Eye className="w-3 h-3 text-lavender" />
                <span>Show Celebration</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3 h-3 text-lavender" />
                <span>Stargazing Mode</span>
              </>
            )}
          </button>
        </div>

        <AnimatePresence>
          {!stargazingMode && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center w-full"
            >
              {/* Star Medallion with Long-Hair Girl Sketch (Backside View) */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 mb-3 shadow-2xl border-2 border-lavender/40 bg-gradient-to-br from-lavender/30 via-dustyRose/20 to-midnight">
                <div className="w-full h-full rounded-full overflow-hidden border border-white/30 relative">
                  <img
                    src="./illustrations/sketch-stars.jpg"
                    alt="Graphite pencil sketch of girl with long flowing hair looking at the night sky"
                    className="w-full h-full object-cover filter contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-midnight/20 pointer-events-none" />
                </div>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-4xl text-ivory font-normal mb-3 tracking-wide">
                Until Next Time, Isha ✨
              </h2>

              {/* Final Blessing Message Card */}
              <div className="p-5 sm:p-7 rounded-2xl bg-[#1C1D36]/80 backdrop-blur-md border border-lavender/25 shadow-2xl space-y-3 font-serif text-base sm:text-lg text-ivory/95 leading-relaxed max-w-xl text-center">
                <p>
                  "Among all the ordinary days, some people quietly become the reason certain moments feel special."
                </p>

                <p className="font-handwriting text-2xl sm:text-3xl text-dustyRose-light font-bold py-1">
                  Keep smiling, keep shining and never stop being wonderfully you.
                </p>

                <div className="w-12 h-px bg-lavender/40 mx-auto my-1" />

                <p className="font-serif italic text-base sm:text-lg text-champagne-light">
                  Happy Birthday once again, Isha.
                  <br />
                  May your 23<sup className="text-xs">rd</sup> chapter be your most beautiful one yet.
                </p>
              </div>

              {/* Tagline */}
              <p className="mt-4 font-handwriting text-xl sm:text-2xl text-champagne-light italic flex items-center justify-center gap-2">
                <span>Made with a little extra thought, just for you.</span>
                <Sparkles className="w-4 h-4 text-dustyRose-light inline" />
              </p>

              {/* Celebration Revisit Corner (Quick Access Hub) */}
              <div className="mt-5 w-full max-w-md pt-3 border-t border-white/15">
                <p className="text-[11px] font-sans uppercase tracking-widest text-ivory/60 mb-2">
                  Revisit Any Part of Your Celebration
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={() => onNavigateStage('cake')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-sans text-ivory/90 transition-all cursor-pointer"
                  >
                    <Cake className="w-3.5 h-3.5 text-[#FFE085]" />
                    <span>The Cake</span>
                  </button>

                  <button
                    onClick={() => onNavigateStage('chocolates')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-sans text-ivory/90 transition-all cursor-pointer"
                  >
                    <span>🍫 Chocolates</span>
                  </button>

                  <button
                    onClick={() => onNavigateStage('gifts')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-sans text-ivory/90 transition-all cursor-pointer"
                  >
                    <Gift className="w-3.5 h-3.5 text-[#FFD166]" />
                    <span>23 Gifts</span>
                  </button>

                  <button
                    onClick={() => onNavigateStage('sketches')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-sans text-ivory/90 transition-all cursor-pointer"
                  >
                    <Feather className="w-3.5 h-3.5 text-lavender" />
                    <span>Sketches</span>
                  </button>

                  <button
                    onClick={() => onNavigateStage('letter')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-sans text-ivory/90 transition-all cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 text-dustyRose" />
                    <span>Letter</span>
                  </button>
                </div>
              </div>

              {/* Revisit from Beginning Button */}
              <div className="mt-5 pb-4">
                <button
                  onClick={onRestart}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-ivory text-midnight hover:bg-champagne text-xs sm:text-sm font-sans font-medium tracking-wide shadow-lg active:scale-95 transition-all group cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-dustyRose-dark group-hover:-rotate-90 transition-transform duration-300" />
                  <span>Revisit from the Beginning</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {stargazingMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <p className="font-serif italic text-xl sm:text-2xl text-ivory/80">
              "Some moments are meant to simply be enjoyed under the quiet stars..."
            </p>
            <p className="font-handwriting text-2xl text-lavender-light mt-3">
              Happy 23rd Birthday, Isha.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
