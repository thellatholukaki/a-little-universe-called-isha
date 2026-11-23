import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Moon, RotateCcw, Heart, Eye, EyeOff } from 'lucide-react';

interface Scene6StarryNightProps {
  onRestart: () => void;
}

export const Scene6StarryNight: React.FC<Scene6StarryNightProps> = ({ onRestart }) => {
  const [stargazingMode, setStargazingMode] = useState<boolean>(false);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start sm:justify-center px-4 sm:px-6 py-6 sm:py-10 select-none overflow-y-auto no-scrollbar text-ivory">
      {/* Luminous Crescent Moon in Corner */}
      <div className="absolute top-6 right-6 sm:top-12 sm:right-20 pointer-events-none z-10 flex flex-col items-center">
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
          <svg width="56" height="56" viewBox="0 0 100 100" fill="none">
            <path
              d="M75,20 C50,25 35,45 40,70 C43,85 55,95 70,98 C45,102 20,85 18,55 C16,28 38,10 75,20 Z"
              fill="#FFFDF7"
            />
            <circle cx="35" cy="45" r="4" fill="#E8DCC9" opacity="0.3" />
            <circle cx="38" cy="62" r="3" fill="#E8DCC9" opacity="0.25" />
          </svg>
        </motion.div>
      </div>

      {/* Main Container */}
      <div className="relative z-20 max-w-2xl w-full flex flex-col items-center text-center my-auto">
        {/* Toggle Stargazing View */}
        <div className="mb-3">
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
              {/* Star Medallion with Long-Hair Girl Sketch (Backside View) */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 mb-4 shadow-2xl border-2 border-lavender/40 bg-gradient-to-br from-lavender/30 via-dustyRose/20 to-midnight"
              >
                <div className="w-full h-full rounded-full overflow-hidden border border-white/30 relative">
                  <img
                    src="./illustrations/sketch-stars.jpg"
                    alt="Graphite pencil sketch of girl with long flowing hair looking at the night sky"
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
                className="font-serif text-2xl sm:text-3xl md:text-4xl text-ivory font-normal mb-4 tracking-wide"
              >
                One Last Little Thought
              </motion.h2>

              {/* Intimate Letter Card with Indirect Confession & Birthday Blessing */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4 }}
                className="p-6 sm:p-8 rounded-2xl bg-[#1C1D36]/80 backdrop-blur-md border border-lavender/25 shadow-2xl space-y-4 font-serif text-base sm:text-lg text-ivory/95 leading-relaxed max-w-xl text-left sm:text-center relative overflow-hidden"
              >
                {/* Subtle Botanical Sketch Border Accent */}
                <div className="absolute top-2 left-3 opacity-25 pointer-events-none text-dustyRose text-xs">
                  ✦ ─── ❀ ─── ✦
                </div>
                <div className="absolute top-2 right-3 opacity-25 pointer-events-none text-dustyRose text-xs">
                  ✦ ─── ❀ ─── ✦
                </div>

                {/* Opening Reflection */}
                <p className="text-ivory/85 italic pt-1">
                  "Among all the ordinary days, some people quietly become the reason certain moments feel special."
                </p>

                {/* The Indirect Confession Passage */}
                <div className="py-2 space-y-3.5 border-t border-b border-lavender/20 my-2">
                  <p className="font-handwriting text-2xl sm:text-3xl text-dustyRose-light font-bold text-left sm:text-center leading-snug">
                    "Sometimes, there are people who become a little more special without even trying.
                  </p>

                  <p className="text-sm sm:text-base leading-relaxed text-ivory/90">
                    You don't necessarily need countless conversations or extraordinary moments. Sometimes, just knowing that someone exists, sharing a little conversation, or seeing their name appear can bring an unexpected smile.
                  </p>

                  <p className="text-sm sm:text-base leading-relaxed text-ivory/90">
                    I don't know exactly how to put it into words, but there's something about you that makes you stand out in the most beautiful way.
                  </p>

                  <p className="text-sm sm:text-base leading-relaxed text-ivory/90">
                    Perhaps some feelings are better expressed through little gestures than grand words.
                  </p>

                  <p className="font-serif italic text-base sm:text-lg text-champagne-light">
                    So, consider this website one of those little gestures.
                  </p>

                  <p className="text-sm sm:text-base leading-relaxed text-ivory/90">
                    No expectations, no explanations needed. Just a small reminder that someone thinks you're pretty special.
                  </p>

                  <p className="font-handwriting text-2xl sm:text-3xl text-lavender-light font-bold text-left sm:text-center pt-1">
                    And I hope that makes you smile."
                  </p>
                </div>

                {/* Closing Birthday Wish */}
                <div className="pt-1">
                  <p className="font-serif text-lg sm:text-xl text-dustyRose-light font-medium text-center">
                    Happy Birthday once again, My Bangaram.
                  </p>
                  <p className="font-serif italic text-sm sm:text-base text-ivory/80 text-center mt-1">
                    May your 23<sup className="text-xs">rd</sup> chapter be your most beautiful one yet.
                  </p>
                </div>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-5 font-handwriting text-xl sm:text-2xl text-champagne-light italic flex items-center justify-center gap-2"
              >
                <span>Made with a little extra thought, just for you.</span>
                <Sparkles className="w-4 h-4 text-dustyRose-light inline" />
              </motion.p>

              {/* Revisit Experience Button */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-6 flex items-center justify-center gap-4 pb-4"
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
              Happy 23rd, My Bangaram.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
