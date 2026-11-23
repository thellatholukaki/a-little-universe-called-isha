import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Feather, Sparkles, ArrowRight, BookOpen } from 'lucide-react';

interface Scene4HeartfeltLetterProps {
  onNext: () => void;
}

const LETTER_PARAGRAPHS = [
  "Dear My Bangaram,",
  "On your special day, I just wanted to remind you how wonderful it is to have someone like you around.",
  "There is something beautiful about the way certain people make ordinary moments feel a little different. Sometimes, without even realizing it, they bring a smile to someone's face.",
  "I hope this new chapter of your life brings you countless reasons to smile, unexpected adventures, wonderful opportunities and moments that make your heart genuinely happy.",
  "Never stop being the person you are.",
  "You deserve all the happiness, kindness and beautiful things life has to offer.",
  "Have the most wonderful 23rd birthday!",
  "With warm wishes."
];

export const Scene4HeartfeltLetter: React.FC<Scene4HeartfeltLetterProps> = ({ onNext }) => {
  const [revealedCount, setRevealedCount] = useState<number>(0);
  const [instantReveal, setInstantReveal] = useState<boolean>(false);

  useEffect(() => {
    if (instantReveal) {
      setRevealedCount(LETTER_PARAGRAPHS.length);
      return;
    }

    // Gradually reveal each paragraph
    const interval = setInterval(() => {
      setRevealedCount((prev) => {
        if (prev < LETTER_PARAGRAPHS.length) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 900);

    return () => clearInterval(interval);
  }, [instantReveal]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 py-10 select-none overflow-y-auto no-scrollbar">
      <div className="relative z-20 max-w-2xl w-full flex flex-col items-center">
        {/* Section Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-champagne/70 border border-dustyRose/30 text-xs font-sans tracking-widest uppercase text-midnight/80 mb-3"
        >
          <BookOpen className="w-3.5 h-3.5 text-dustyRose-dark" />
          <span>A Written Note</span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl text-midnight font-normal text-center mb-5"
        >
          A Few Words for You
        </motion.h2>

        {/* Vintage Handwritten Letter Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative w-full rounded-2xl bg-[#FFFDF9] border border-[#E8DDCC] shadow-xl p-6 sm:p-10 md:p-12 overflow-hidden"
          style={{
            backgroundImage: `repeating-linear-gradient(transparent, transparent 31px, rgba(217, 166, 160, 0.12) 31px, rgba(217, 166, 160, 0.12) 32px)`
          }}
        >
          {/* Decorative Pressed Lavender / Wildflower Accent in Corner */}
          <div className="absolute top-4 right-5 opacity-35 pointer-events-none hidden sm:block">
            <svg width="60" height="80" viewBox="0 0 60 80" fill="none" stroke="#A9B7A0">
              <path d="M30,80 Q25,40 30,10 M30,40 Q40,30 50,35 M30,55 Q15,45 10,50 M30,25 Q45,15 48,20" strokeWidth="1.5" />
              <circle cx="30" cy="10" r="3" fill="#D9A6A0" opacity="0.6" />
              <circle cx="50" cy="35" r="2.5" fill="#C9C0E8" opacity="0.6" />
              <circle cx="10" cy="50" r="2.5" fill="#D9A6A0" opacity="0.6" />
            </svg>
          </div>

          {/* Letter Body Text */}
          <div className="space-y-4 font-serif text-midnight/90 leading-relaxed text-base sm:text-lg">
            {LETTER_PARAGRAPHS.map((paragraph, index) => {
              const isVisible = index < revealedCount;
              const isGreeting = index === 0;
              const isSignature = index === LETTER_PARAGRAPHS.length - 1;
              const isHighlighted = index === 4 || index === 6;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  {isGreeting ? (
                    <p className="font-handwriting text-3xl sm:text-4xl text-midnight font-bold pb-2">
                      {paragraph}
                    </p>
                  ) : isSignature ? (
                    <div className="pt-4 flex flex-col items-start">
                      <p className="font-handwriting text-2xl sm:text-3xl text-dustyRose-dark font-semibold">
                        {paragraph}
                      </p>
                      <span className="font-serif italic text-xs text-graphite mt-1">
                        A Little Universe Called My Bangaram • 2026
                      </span>
                    </div>
                  ) : isHighlighted ? (
                    <p className="font-serif italic text-lg sm:text-xl text-dustyRose-dark font-medium py-1">
                      {paragraph}
                    </p>
                  ) : (
                    <p className="leading-relaxed">
                      {paragraph}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Reveal Controls */}
          {revealedCount < LETTER_PARAGRAPHS.length && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setInstantReveal(true)}
                className="text-xs font-sans text-graphite/70 hover:text-midnight underline decoration-dotted underline-offset-4 focus:outline-none"
              >
                Read all at once
              </button>
            </div>
          )}
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex items-center justify-center"
        >
          <button
            onClick={onNext}
            className="flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-midnight hover:bg-midnight-light text-ivory text-xs sm:text-sm font-sans font-medium tracking-wide transition-all shadow-md hover:shadow-lg group"
          >
            <span>Unfold 23 Birthday Wishes</span>
            <ArrowRight className="w-4 h-4 text-champagne group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
