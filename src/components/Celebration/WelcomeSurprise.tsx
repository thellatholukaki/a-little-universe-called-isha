import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../../services/audioEngine';

interface WelcomeSurpriseProps {
  onStartCelebration: () => void;
}

export const WelcomeSurprise: React.FC<WelcomeSurpriseProps> = ({ onStartCelebration }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const handleCelebrate = () => {
    if (isOpening || hasOpened) return;
    setIsOpening(true);

    // Start background romantic music & play sound effects
    audioEngine.playGiftOpen();
    audioEngine.start();

    // Release beautiful rose and gold petal confetti
    confetti({
      particleCount: 55,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D9485F', '#E07085', '#F4D06F', '#FFF9F0', '#C9C0E8', '#BA2D44'],
      scalar: 1.1,
      ticks: 200,
    });

    setTimeout(() => {
      setHasOpened(true);
      setTimeout(() => {
        onStartCelebration();
      }, 1100);
    }, 900);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 py-8 select-none text-center">
      {/* Fairy Lights Garland along top */}
      <div className="absolute top-2 left-0 right-0 flex justify-around pointer-events-none opacity-80 px-4">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [0.9, 1.1, 0.9]
            }}
            transition={{
              duration: 2.2 + (i % 3) * 0.4,
              repeat: Infinity,
              delay: i * 0.25
            }}
            className="flex flex-col items-center"
          >
            <div className="w-px h-3 bg-champagne-dark/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFDF80] shadow-[0_0_10px_#FFAE19]" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-20 max-w-xl w-full flex flex-col items-center">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-4 sm:mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dustyRose/20 border border-dustyRose/40 mb-3 text-xs tracking-widest uppercase font-sans text-midnight font-medium backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-dustyRose-dark" />
            <span>A Milestone Surprise • 24 November 2026</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-midnight font-normal tracking-tight leading-tight">
            Hey Isha! Today is your day!
          </h1>
        </motion.div>

        {/* Giant Interactive Gift Box */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative my-4 cursor-pointer group"
          onClick={handleCelebrate}
        >
          {/* Box Shadow & Glow */}
          <div className="absolute inset-0 rounded-3xl bg-dustyRose/30 filter blur-2xl transform translate-y-6 group-hover:translate-y-8 transition-transform duration-500" />

          {/* 3D Luxury Birthday Gift Box */}
          <div className="relative w-64 h-56 sm:w-80 sm:h-64 rounded-3xl bg-gradient-to-br from-[#A83244] via-[#851E2E] to-[#59101C] border-2 border-[#F2B6BE] shadow-2xl overflow-visible flex items-center justify-center p-2">
            {/* Box Texture & Gilded Foil Pattern */}
            <div className="absolute inset-0 rounded-3xl opacity-35 bg-[radial-gradient(#F4D06F_1.5px,transparent_1.5px)] [background-size:16px_16px]" />

            {/* Vertical Golden Satin Ribbon */}
            <div className="absolute top-0 bottom-0 w-12 sm:w-14 bg-gradient-to-r from-[#FFDF80] via-[#F4D06F] to-[#D4A737] shadow-md z-10 flex items-center justify-center">
              <div className="w-0.5 h-full bg-[#FFEBB3]/60" />
            </div>

            {/* Horizontal Golden Satin Ribbon */}
            <div className="absolute left-0 right-0 h-12 sm:h-14 bg-gradient-to-b from-[#FFDF80] via-[#F4D06F] to-[#D4A737] shadow-md z-10 flex items-center justify-center">
              <div className="h-0.5 w-full bg-[#FFEBB3]/60" />
            </div>

            {/* Animated Box Lid (Lifts on Open) */}
            <motion.div
              animate={isOpening ? { y: -90, rotateX: 30, opacity: 0 } : { y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute -top-3 left-0 right-0 h-14 bg-gradient-to-r from-[#942636] to-[#751624] rounded-2xl border-2 border-[#F2B6BE] shadow-lg z-20 flex items-center justify-center"
            >
              {/* Grand Golden Satin Ribbon Bow */}
              <div className="absolute -top-6 flex items-center justify-center">
                <div className="relative w-16 h-12">
                  {/* Left Loop */}
                  <div className="absolute left-0 top-0 w-8 h-10 rounded-full border-4 border-[#F4D06F] bg-[#FFE085] shadow-md transform -rotate-30" />
                  {/* Right Loop */}
                  <div className="absolute right-0 top-0 w-8 h-10 rounded-full border-4 border-[#F4D06F] bg-[#FFE085] shadow-md transform rotate-30" />
                  {/* Center Knot */}
                  <div className="absolute left-1/2 top-4 -translate-x-1/2 w-6 h-6 rounded-full bg-[#E5B53D] border-2 border-[#FFF0B8] shadow-sm z-30 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Interior Reveal: Golden Glow and Birthday Crest */}
            <motion.div
              animate={isOpening ? { scale: 1.1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-30 flex flex-col items-center justify-center text-ivory"
            >
              <span className="font-serif italic text-xl sm:text-2xl font-semibold text-[#FFE085]">
                Happy 23rd, Isha!
              </span>
              <p className="text-xs font-sans tracking-widest uppercase text-ivory/90 mt-1">
                Your Celebration Begins ✨
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Narrative Card (Warm Personal Voice) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="vintage-card p-5 sm:p-6 rounded-2xl max-w-lg mx-auto shadow-md border border-dustyRose/30 my-3"
        >
          <p className="font-serif text-base sm:text-lg text-midnight/90 leading-relaxed italic">
            "I couldn't be there to celebrate with you in person, but I didn't want the day to pass without doing something special."
          </p>
          <p className="font-handwriting text-xl sm:text-2xl text-dustyRose-dark font-bold mt-2">
            So, I arranged a little celebration for you here. Ready?
          </p>
        </motion.div>

        {/* Let's Celebrate Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-3"
        >
          <button
            onClick={handleCelebrate}
            disabled={isOpening}
            className="flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#B22234] to-[#8C1625] hover:from-[#C72A3E] hover:to-[#A31D2E] text-ivory font-sans text-sm sm:text-base font-semibold tracking-wide shadow-xl active:scale-95 transition-all hover:shadow-[0_0_25px_rgba(217,72,95,0.45)] group cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-[#FFE085] group-hover:rotate-12 transition-transform" />
            <span>Let's Celebrate! 🎁</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
