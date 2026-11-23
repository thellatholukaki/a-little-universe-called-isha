import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Moon, RotateCcw, Heart, Eye, EyeOff } from 'lucide-react';

interface Scene6StarryNightProps {
  onRestart: () => void;
}

export const Scene6StarryNight: React.FC<Scene6StarryNightProps> = ({ onRestart }) => {
  const [stargazingMode, setStargazingMode] = useState<boolean>(false);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 py-12 select-none overflow-y-auto no-scrollbar text-ivory">
      {/* Crescent Moon & Celestial Glow */}
      <div className="absolute top-12 right-12 sm:top-16 sm:right-24 pointer-events-none z-10 flex flex-col items-center">
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
          className="relative"
        >
          {/* Luminous SVG Crescent Moon */}
          <svg width="64" height="64" viewBox="0 0 100 100" fill="none">
            <path
              d="M75,20 C50,25 35,45 40,70 C43,85 55,95 70,98 C45,102 20,85 18,55 C16,28 38,10 75,20 Z"
              fill="#FFFDF7"
            />
            {/* Soft inner crater shading */}
            <circle cx="35" cy="45" r="4" fill="#E8DCC9" opacity="0.3" />
            <circle cx="38" cy="62" r="3" fill="#E8DCC9" opacity="0.25" />
          </svg>
        </motion.div>
      </div>

      {/* Main Container */}
      <div className="relative z-20 max-w-2xl w-full flex flex-col items-center text-center">
        {/* Toggle Stargazing Mode */}
        <div className="mb-4">
          <button
            onClick={() => setStargazingMode(!stargazingMode)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[11px] font-sans tracking-widest uppercase text-ivory/80 transition-all backdrop-blur-sm"
            title="Toggle peaceful stargazing view"
          >
            {stargazingMode ? (
              <>
                <Eye className="w-3 h-3 text-lavender" />
                <span>Show Letter</span>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center w-full"
            >
              {/* Star Medallion with Sketch */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1.5 mb-6 shadow-2xl border-2 border-lavender/40 bg-gradient-to-br from-lavender/30 via-dustyRose/20 to-midnight"
              >
                <div className="w-full h-full rounded-full overflow-hidden border border-white/30 relative">
                  <img
                    src="./illustrations/sketch-stars.jpg"
                    alt="Pencil sketch of girl looking at the starry night sky"
                    className="w-full h-full object-cover filter contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-midnight/20 pointer-events-none" />
                </div>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-serif text-3xl sm:text-4xl text-ivory font-normal mb-5 tracking-wide"
              >
                One Last Little Thought
              </motion.h2>

              {/* Message Box */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4 }}
                className="p-6 sm:p-8 rounded-2xl bg-midnight-light/60 backdrop-blur-md border border-lavender/25 shadow-2xl space-y-4 font-serif text-base sm:text-lg text-ivory/90 leading-relaxed max-w-xl text-center"
              >
                <p>
                  "Among all the ordinary days, some people quietly become the reason certain moments feel special.
                </p>
                <p>
                  You might never know how much a simple smile, a little conversation or just your presence can brighten someone's day.
                </p>
                <p className="font-handwriting text-2xl sm:text-3xl text-lavender-light font-bold py-1">
                  So, here's a little reminder: keep smiling, keep shining and never stop being wonderfully you.
                </p>
                <div className="w-12 h-px bg-lavender/40 mx-auto my-2" />
                <p className="font-serif italic text-lg sm:text-xl text-dustyRose-light">
                  Happy Birthday once again, Isha.
                  <br />
                  May your 23<sup className="text-xs">rd</sup> chapter be your most beautiful one yet."
                </p>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-6 font-handwriting text-xl sm:text-2xl text-champagne-light italic flex items-center gap-2"
              >
                <span>Made with a little extra thought, just for you.</span>
                <Sparkles className="w-4 h-4 text-dustyRose-light inline" />
              </motion.p>

              {/* Revisit Experience Button */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-8 flex items-center justify-center gap-4"
              >
                <button
                  onClick={onRestart}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-ivory text-midnight hover:bg-champagne text-xs sm:text-sm font-sans font-medium tracking-wide transition-all shadow-lg active:scale-95 group"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-dustyRose-dark group-hover:-rotate-90 transition-transform duration-300" />
                  <span>Revisit from the Beginning</span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {stargazingMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <p className="font-serif italic text-xl sm:text-2xl text-ivory/80">
              "Some moments are meant to simply be enjoyed under the quiet stars..."
            </p>
            <p className="font-handwriting text-2xl text-lavender-light mt-3">
              Happy 23rd, Isha.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
