import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Heart, Feather, Mail } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

interface PersonalLetterProps {
  onContinueToFinale: () => void;
}

const LETTER_BLOCKS = [
  {
    type: 'greeting',
    text: 'Dear My Bangaram,'
  },
  {
    type: 'birthday-warmth',
    text: "Well, I couldn't be there to decorate your room or celebrate beside you today, so I wanted to bring this little celebration to your screen."
  },
  {
    type: 'highlight',
    text: "Sometimes, there are people who become a little more special without even trying."
  },
  {
    type: 'body',
    text: "You don't necessarily need countless conversations or extraordinary moments. Sometimes, just knowing that someone exists, sharing a little conversation, or seeing their name appear can bring an unexpected smile."
  },
  {
    type: 'body',
    text: "I don't know exactly how to put it into words, but there's something about you that makes you stand out in the most beautiful way."
  },
  {
    type: 'body',
    text: "Perhaps some feelings are better expressed through little gestures than grand words."
  },
  {
    type: 'emphasis',
    text: "So, consider this celebration one of those little gestures."
  },
  {
    type: 'body',
    text: "No expectations, no explanations needed. Just a small reminder that someone thinks you're pretty special."
  },
  {
    type: 'heart-line',
    text: "And I hope that makes you smile."
  },
  {
    type: 'signature',
    text: "Happy 23rd Birthday once again, My Bangaram.\nWith warm thoughts and genuine appreciation."
  }
];

export const PersonalLetter: React.FC<PersonalLetterProps> = ({ onContinueToFinale }) => {
  const [isWaxBroken, setIsWaxBroken] = useState<boolean>(false);
  const [revealedIndex, setRevealedIndex] = useState<number>(0);
  const [instantReveal, setInstantReveal] = useState<boolean>(false);

  const handleBreakSeal = () => {
    audioEngine.playWaxSealBreak();
    setIsWaxBroken(true);
  };

  useEffect(() => {
    if (!isWaxBroken) return;

    if (instantReveal) {
      setRevealedIndex(LETTER_BLOCKS.length);
      return;
    }

    const interval = setInterval(() => {
      setRevealedIndex((prev) => {
        if (prev < LETTER_BLOCKS.length) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 750);

    return () => clearInterval(interval);
  }, [isWaxBroken, instantReveal]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start sm:justify-center px-4 sm:px-6 py-6 sm:py-8 select-none text-center overflow-y-auto no-scrollbar">
      {/* Ambient Candlelight Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-radial from-[#FFE8B2]/20 via-[#FFD085]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Floating Rose Petals & Heart Motes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: `${10 + i * 12}%`,
              y: '105%',
              rotate: 0,
              opacity: 0
            }}
            animate={{
              y: '-10%',
              x: `${10 + i * 12 + Math.sin(i) * 8}%`,
              rotate: [0, 90, 180, 270],
              opacity: [0, 0.6, 0.7, 0]
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: 'linear'
            }}
            className="absolute text-dustyRose/30"
          >
            {i % 2 === 0 ? (
              <Heart className="w-3.5 h-3.5 fill-current" />
            ) : (
              <span className="text-base select-none">🌸</span>
            )}
          </motion.div>
        ))}
      </div>

      <div className="relative z-20 max-w-2xl w-full flex flex-col items-center my-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-champagne/80 border border-dustyRose/30 text-xs font-sans tracking-widest uppercase text-midnight/80 mb-1">
            <Feather className="w-3.5 h-3.5 text-dustyRose-dark" />
            <span>A Letter Written Just for My Bangaram</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-midnight font-normal">
            A Thought for Your Special Day
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isWaxBroken ? (
            /* Sealed Envelope with Interactive Wax Seal */
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-md my-4 p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#F8EFE4] to-[#EFE3D3] border-2 border-[#D4AF37]/60 shadow-[0_20px_50px_rgba(40,20,15,0.2)] flex flex-col items-center cursor-pointer group"
              onClick={handleBreakSeal}
            >
              {/* Envelope Flap Lines */}
              <div className="absolute top-0 left-0 right-0 h-28 border-b border-[#D4AF37]/30 bg-gradient-to-b from-[#F2E4D2] to-[#EAD9C4] rounded-t-3xl flex items-center justify-center pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center mt-6">
                <span className="text-xs font-sans tracking-widest uppercase text-midnight/60 font-semibold mb-4">
                  Sealed with Care
                </span>

                {/* Crimson & Gold Wax Seal Button */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  whileTap={{ scale: 0.92 }}
                  className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#BA2D44] via-[#8C1625] to-[#590C16] border-2 border-[#FFE085] shadow-[0_8px_25px_rgba(186,45,68,0.5)] flex items-center justify-center"
                >
                  {/* Subtle Wax Drip Indent */}
                  <div className="absolute inset-1.5 rounded-full border border-dashed border-[#FFE8A3]/40 pointer-events-none" />
                  <Heart className="w-8 h-8 text-[#FFE085] fill-current drop-shadow-md" />

                  {/* Pulsing glow ring */}
                  <div className="absolute -inset-2 rounded-full border border-[#FFE085]/50 animate-ping opacity-30 pointer-events-none" />
                </motion.div>

                <p className="font-handwriting text-2xl text-midnight font-bold mt-5 group-hover:text-dustyRose-dark transition-colors">
                  Tap the seal to open your letter
                </p>
                <p className="text-[11px] font-sans text-graphite/70 mt-1">
                  Handwritten exclusively for My Bangaram
                </p>
              </div>
            </motion.div>
          ) : (
            /* Unfolded Vintage Deckled Stationery Letter Card */
            <motion.div
              key="letter"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full rounded-3xl bg-[#FFFDF9] border border-[#E8DDCC] shadow-2xl p-6 sm:p-10 text-left overflow-hidden space-y-4"
              style={{
                backgroundImage: `repeating-linear-gradient(transparent, transparent 31px, rgba(217, 166, 160, 0.12) 31px, rgba(217, 166, 160, 0.12) 32px)`
              }}
            >
              {/* Decorative Corner Sprig */}
              <div className="absolute top-4 right-5 opacity-30 pointer-events-none hidden sm:block">
                <svg width="60" height="70" viewBox="0 0 60 70" fill="none" stroke="#BA2D44">
                  <path d="M30,70 Q25,35 30,10 M30,35 Q40,25 50,30 M30,50 Q15,40 10,45" strokeWidth="1.5" />
                  <circle cx="30" cy="10" r="3" fill="#D9485F" />
                  <circle cx="50" cy="30" r="2.5" fill="#E07085" />
                </svg>
              </div>

              {/* Letter Content Blocks */}
              <div className="space-y-3.5 font-serif text-midnight/90 text-base sm:text-lg leading-relaxed">
                {LETTER_BLOCKS.map((block, idx) => {
                  const isVisible = idx < revealedIndex;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0 }}
                      transition={{ duration: 0.7 }}
                    >
                      {block.type === 'greeting' ? (
                        <p className="font-handwriting text-3xl sm:text-4xl text-midnight font-bold pb-1">
                          {block.text}
                        </p>
                      ) : block.type === 'highlight' ? (
                        <p className="font-handwriting text-2xl sm:text-3xl text-dustyRose-dark font-bold leading-snug py-1">
                          "{block.text}"
                        </p>
                      ) : block.type === 'emphasis' ? (
                        <p className="font-serif italic text-base sm:text-lg text-dustyRose-dark font-semibold">
                          {block.text}
                        </p>
                      ) : block.type === 'heart-line' ? (
                        <p className="font-handwriting text-2xl sm:text-3xl text-dustyRose-dark font-bold py-1">
                          {block.text}
                        </p>
                      ) : block.type === 'signature' ? (
                        <div className="pt-4 border-t border-dustyRose/20 flex flex-col items-start">
                          <p className="font-handwriting text-2xl text-midnight font-bold whitespace-pre-line">
                            {block.text}
                          </p>
                          <span className="font-serif italic text-xs text-graphite mt-1">
                            A Little Universe Called My Bangaram • 24 November 2026
                          </span>
                        </div>
                      ) : (
                        <p className="leading-relaxed">
                          {block.text}
                        </p>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {revealedIndex < LETTER_BLOCKS.length && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setInstantReveal(true)}
                    className="text-xs font-sans text-graphite/70 hover:text-midnight underline decoration-dotted cursor-pointer"
                  >
                    Read all at once
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Natural Transition to Grand Finale */}
        {isWaxBroken && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 flex justify-center pb-4"
          >
            <button
              onClick={onContinueToFinale}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-midnight hover:bg-midnight-light text-ivory text-sm sm:text-base font-sans font-semibold tracking-wide shadow-xl active:scale-95 transition-all group cursor-pointer"
            >
              <span>A final thought under the stars ✨</span>
              <ArrowRight className="w-4 h-4 text-[#FFE085] group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
