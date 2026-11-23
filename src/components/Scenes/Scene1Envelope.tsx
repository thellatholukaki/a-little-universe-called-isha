import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../../services/audioEngine';

interface Scene1EnvelopeProps {
  onOpen: () => void;
}

export const Scene1Envelope: React.FC<Scene1EnvelopeProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpening || hasOpened) return;
    setIsOpening(true);

    // Play gentle audio chime and start background piano
    audioEngine.playEnvelopeOpen();
    audioEngine.start();

    // Trigger delicate pastel confetti burst
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.55 },
      colors: ['#D9A6A0', '#E9DCCB', '#C9C0E8', '#A9B7A0', '#C59B27'],
      scalar: 0.9,
      ticks: 180,
    });

    // Animate opening state
    setTimeout(() => {
      setHasOpened(true);
      setTimeout(() => {
        onOpen();
      }, 1400);
    }, 900);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 select-none">
      {/* Decorative Botanical Flourish Background Elements */}
      <div className="absolute top-12 left-10 opacity-20 pointer-events-none hidden md:block">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="#252641">
          <path d="M10,90 Q40,40 90,10 M40,60 Q60,40 80,60 M30,70 Q20,40 50,30" strokeWidth="1" strokeDasharray="2,3" />
        </svg>
      </div>
      <div className="absolute bottom-16 right-10 opacity-20 pointer-events-none hidden md:block">
        <svg width="140" height="140" viewBox="0 0 100 100" fill="none" stroke="#252641">
          <path d="M90,90 Q60,40 10,10 M60,60 Q40,40 20,60 M70,70 Q80,40 50,30" strokeWidth="1" strokeDasharray="2,3" />
        </svg>
      </div>

      {/* Main Content Box */}
      <div className="relative z-20 flex flex-col items-center max-w-lg w-full text-center">
        {/* Soft Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/60 border border-dustyRose/30 mb-3 text-xs tracking-widest uppercase font-sans text-midnight/80">
            <Sparkles className="w-3.5 h-3.5 text-dustyRose-dark" />
            <span>A quiet surprise</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-midnight font-normal tracking-tight">
            Hey, I have a little something for you...
          </h1>
        </motion.div>

        {/* Vintage Interactive Envelope */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative w-72 sm:w-84 md:w-96 h-48 sm:h-56 cursor-pointer group"
          onClick={handleOpenEnvelope}
          style={{ perspective: 1000 }}
        >
          {/* Outer Envelope Shadow */}
          <div className="absolute inset-0 rounded-xl bg-champagne-dark/30 filter blur-xl transform translate-y-4 group-hover:translate-y-6 transition-transform duration-500" />

          {/* Envelope Body */}
          <div className="relative w-full h-full rounded-lg bg-[#F5EEDB] border-2 border-[#E2D4BF] shadow-xl overflow-hidden flex items-center justify-center">
            {/* Vintage Parchment Texture & Subtle Diagonal Pattern */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#C59B27_0.75px,transparent_0.75px)] [background-size:16px_16px]" />
            
            {/* Envelope Bottom & Side Fold Shadows */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#E9DDC6] to-transparent pointer-events-none" />
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(45deg, rgba(217, 166, 160, 0.08) 0%, transparent 70%)'
              }}
            />

            {/* Letter Inside (Revealed on Open) */}
            <motion.div
              animate={isOpening ? { y: -70, opacity: 1 } : { y: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute -top-4 w-5/6 h-40 bg-ivory-100 rounded-md border border-[#E0D3BE] shadow-md p-4 flex flex-col items-center justify-center z-10"
            >
              <div className="w-8 h-px bg-dustyRose/60 mb-2" />
              <p className="font-handwriting text-2xl sm:text-3xl text-midnight font-bold">
                For Bangaram
              </p>
              <p className="font-serif italic text-xs text-dustyRose-dark mt-1">
                24 November 2026
              </p>
              <div className="w-8 h-px bg-dustyRose/60 mt-2" />
            </motion.div>

            {/* Envelope Flap (3D Flip Animation) */}
            <motion.div
              animate={isOpening ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
              className="absolute top-0 left-0 right-0 h-1/2 bg-[#EFE3CF] border-b border-[#DECBB1] shadow-sm flex items-center justify-center"
            >
              {/* Triangular Flap Shape using CSS clip-path */}
              <div 
                className="w-full h-full bg-[#EFE3CF] border-b border-[#D8C4A7]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
              />
            </motion.div>

            {/* Wax Seal Button */}
            <AnimatePresence>
              {!hasOpened && (
                <motion.div
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute z-30 flex flex-col items-center justify-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        "0 6px 18px rgba(180, 67, 53, 0.35)",
                        "0 8px 26px rgba(197, 155, 39, 0.5)",
                        "0 6px 18px rgba(180, 67, 53, 0.35)"
                      ]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#BF3B2B] via-[#9E2A1E] to-[#6E1C12] border-2 border-[#D97768] wax-seal-shadow flex items-center justify-center cursor-pointer transition-transform"
                  >
                    {/* Wax Rim Texture */}
                    <div className="absolute inset-1 rounded-full border border-[#FF9E90]/30" />
                    
                    {/* Embossed Monogram / Star */}
                    <div className="flex flex-col items-center justify-center text-ivory drop-shadow-md">
                      <span className="font-serif font-bold text-lg sm:text-xl tracking-tighter">
                        I
                      </span>
                      <Sparkles className="w-3 h-3 text-champagne-light -mt-1" />
                    </div>
                  </motion.div>

                  <span className="mt-2 text-[11px] font-sans font-medium tracking-widest uppercase text-midnight/70 bg-ivory/80 px-2 py-0.5 rounded-full border border-champagne">
                    Tap to open
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Subtitle Interaction Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 font-handwriting text-2xl sm:text-3xl text-midnight/80 italic"
        >
          Open when you're ready.
        </motion.p>
      </div>
    </div>
  );
};
