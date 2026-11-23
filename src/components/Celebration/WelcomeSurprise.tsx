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
      particleCount: 65,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#D9485F', '#E07085', '#F4D06F', '#FFF9F0', '#C9C0E8', '#BA2D44'],
      scalar: 1.15,
      ticks: 220,
    });

    setTimeout(() => {
      setHasOpened(true);
      setTimeout(() => {
        onStartCelebration();
      }, 1100);
    }, 900);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start sm:justify-center px-4 sm:px-6 py-6 sm:py-8 select-none text-center overflow-y-auto no-scrollbar">
      {/* Luminous Fairy Lights Garland along top */}
      <div className="absolute top-2 left-0 right-0 flex justify-around pointer-events-none opacity-85 px-4 z-10">
        {[...Array(11)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.45, 1, 0.45],
              scale: [0.92, 1.12, 0.92],
            }}
            transition={{
              duration: 2.2 + (i % 4) * 0.35,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
            className="flex flex-col items-center"
          >
            <div className="w-px h-3.5 bg-champagne-dark/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFDF80] shadow-[0_0_12px_#FFAE19,0_0_4px_#FFF]" />
          </motion.div>
        ))}
      </div>

      {/* Floating Golden Dust & Heart Motes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`gold-dust-${i}`}
            className="absolute rounded-full"
            style={{
              top: `${15 + (i * 11)}%`,
              left: `${8 + (i * 12)}%`,
              width: i % 2 === 0 ? '4px' : '6px',
              height: i % 2 === 0 ? '4px' : '6px',
              backgroundColor: i % 2 === 0 ? '#FFDF80' : '#F2A6B3',
            }}
            animate={{
              y: [-10, 10, -10],
              x: [-6, 6, -6],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-20 max-w-xl w-full flex flex-col items-center my-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-3 sm:mb-5"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dustyRose/20 border border-dustyRose/40 mb-2.5 text-xs tracking-widest uppercase font-sans text-midnight font-medium backdrop-blur-sm shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-dustyRose-dark" />
            <span>A Milestone Surprise • 24 November 2026</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-midnight font-normal tracking-tight leading-tight">
            A Little Universe, Created Just for You, Bangaram.
          </h1>
          <p className="font-handwriting text-xl sm:text-2xl text-dustyRose-dark font-semibold mt-1">
            Welcome to your special birthday sanctuary ❤️
          </p>
        </motion.div>

        {/* Giant Interactive Gift Box with Illuminated Wax Seal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative my-3 sm:my-4 cursor-pointer group"
          onClick={handleCelebrate}
        >
          {/* Box Shadow & Ambient Glow */}
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

            {/* Center Illuminated Wax Seal on Cross Ribbon */}
            <motion.div
              animate={{
                scale: [1, 1.06, 1],
                filter: [
                  'drop-shadow(0 0 10px rgba(255, 223, 128, 0.7))',
                  'drop-shadow(0 0 18px rgba(255, 200, 80, 0.95))',
                  'drop-shadow(0 0 10px rgba(255, 223, 128, 0.7))'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute z-20 w-12 h-12 rounded-full bg-gradient-to-br from-[#D9384E] via-[#A8182B] to-[#610713] border-2 border-[#FFE085] flex items-center justify-center shadow-lg"
            >
              <Heart className="w-6 h-6 text-[#FFE085] fill-[#FFE085]/40" />
            </motion.div>

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

            {/* Interior Reveal: Golden Glow and Birthday Message */}
            <motion.div
              animate={isOpening ? { scale: 1.1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-30 flex flex-col items-center justify-center text-ivory px-4 text-center"
            >
              <span className="font-serif italic text-xl sm:text-2xl font-semibold text-[#FFE085]">
                Happy 23rd, Bangaram!
              </span>
              <p className="text-xs font-sans tracking-widest uppercase text-ivory/95 mt-1 font-medium">
                Your Little Universe Begins ✨
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Narrative Card (Warm Personal Voice) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="vintage-card p-4 sm:p-6 rounded-2xl max-w-lg mx-auto shadow-md border border-dustyRose/30 my-2.5 sm:my-3"
        >
          <p className="font-serif text-sm sm:text-base text-midnight/90 leading-relaxed italic">
            "I couldn't be there to celebrate beside you in person today, but I wanted to make sure this milestone was truly unforgettable."
          </p>
          <p className="font-handwriting text-xl sm:text-2xl text-dustyRose-dark font-bold mt-1.5 sm:mt-2">
            So, I arranged this little universe for you here. Ready?
          </p>
        </motion.div>

        {/* Open Your Surprise Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-2 sm:mt-3"
        >
          <button
            onClick={handleCelebrate}
            disabled={isOpening}
            className="flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#B22234] to-[#8C1625] hover:from-[#C72A3E] hover:to-[#A31D2E] text-ivory font-sans text-sm sm:text-base font-semibold tracking-wide shadow-xl active:scale-95 transition-all hover:shadow-[0_0_25px_rgba(217,72,95,0.45)] group cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-[#FFE085] group-hover:rotate-12 transition-transform" />
            <span>Open Your Surprise ✨</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
