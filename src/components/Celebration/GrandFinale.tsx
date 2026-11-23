import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Eye, EyeOff, Cake, Gift, Heart, Feather, Stars, ArrowRight, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CelebrationStage } from '../../types';
import { audioEngine } from '../../services/audioEngine';

interface GrandFinaleProps {
  onRestart: () => void;
  onNavigateStage: (stage: CelebrationStage) => void;
}

type FinalePhase = 'intro' | 'constellation' | 'proposal' | 'answered_yes' | 'answered_moment';

// 23 Celestial Star Coordinates forming an elegant connected heart constellation
const CONSTELLATION_STARS = [
  { x: 50.0, y: 35.5, id: 1 },
  { x: 50.7, y: 32.8, id: 2 },
  { x: 54.7, y: 26.9, id: 3 },
  { x: 63.1, y: 22.7, id: 4 },
  { x: 73.5, y: 23.8, id: 5 },
  { x: 81.5, y: 30.4, id: 6 },
  { x: 83.4, y: 39.9, id: 7 },
  { x: 78.1, y: 49.5, id: 8 },
  { x: 68.3, y: 58.2, id: 9 },
  { x: 58.4, y: 66.1, id: 10 },
  { x: 52.1, y: 72.7, id: 11 },
  { x: 50.1, y: 76.8, id: 12 },
  { x: 49.9, y: 76.8, id: 13 },
  { x: 47.9, y: 72.7, id: 14 },
  { x: 41.6, y: 66.1, id: 15 },
  { x: 31.7, y: 58.2, id: 16 },
  { x: 21.9, y: 49.5, id: 17 },
  { x: 16.6, y: 39.9, id: 18 },
  { x: 18.5, y: 30.4, id: 19 },
  { x: 26.5, y: 23.8, id: 20 },
  { x: 36.9, y: 22.7, id: 21 },
  { x: 45.3, y: 26.9, id: 22 },
  { x: 49.3, y: 32.8, id: 23 }
];

export const GrandFinale: React.FC<GrandFinaleProps> = ({ 
  onRestart,
  onNavigateStage 
}) => {
  const [stargazingMode, setStargazingMode] = useState<boolean>(false);
  const [phase, setPhase] = useState<FinalePhase>('intro');
  const [introStep, setIntroStep] = useState<number>(0);

  // Progressive text reveal in Phase A (Intro)
  useEffect(() => {
    if (phase !== 'intro') return;
    const timer = setInterval(() => {
      setIntroStep((prev) => {
        if (prev < 4) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 1400);
    return () => clearInterval(timer);
  }, [phase]);

  const handleStartConstellation = () => {
    setPhase('constellation');
    audioEngine.playConstellationChime();
  };

  const handleRevealRing = () => {
    setPhase('proposal');
    audioEngine.playRingRevealChime();
  };

  const handleAnswerYes = () => {
    setPhase('answered_yes');
    audioEngine.playProposalYesCelebration();

    // Multi-burst romantic confetti
    confetti({
      particleCount: 90,
      spread: 110,
      origin: { y: 0.5 },
      colors: ['#FFD166', '#D9485F', '#E07085', '#FFF9F0', '#C9C0E8', '#FF758F'],
      scalar: 1.2,
      ticks: 280,
    });

    setTimeout(() => {
      confetti({
        particleCount: 65,
        angle: 60,
        spread: 80,
        origin: { x: 0.1, y: 0.6 },
        colors: ['#FFD700', '#FF69B4', '#FFFDF9'],
      });
      confetti({
        particleCount: 65,
        angle: 120,
        spread: 80,
        origin: { x: 0.9, y: 0.6 },
        colors: ['#FFD700', '#FF69B4', '#FFFDF9'],
      });
    }, 350);
  };

  const handleAnswerMoment = () => {
    setPhase('answered_moment');
  };

  // SVG heart path string for the constellation
  const constellationPath = CONSTELLATION_STARS.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start sm:justify-center px-4 sm:px-6 py-6 sm:py-8 select-none text-center overflow-y-auto no-scrollbar text-ivory">
      {/* Ambient Cosmic Nebula Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] bg-radial from-[#9370DB]/20 via-[#4B0082]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Luminous Crescent Moon with Gentle Ambient Glow */}
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

        {/* Normal Interactive Experience */}
        <AnimatePresence mode="wait">
          {!stargazingMode && (
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center w-full"
            >
              {/* =========================================================================
                  PHASE A: ENTERING THE UNIVERSE (Sequential Storytelling)
                 ========================================================================= */}
              {phase === 'intro' && (
                <div className="flex flex-col items-center max-w-xl w-full space-y-4">
                  {/* Star Medallion with Long-Hair Girl Sketch (Backside View) */}
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 mb-2 shadow-2xl border-2 border-lavender/40 bg-gradient-to-br from-lavender/30 via-dustyRose/20 to-midnight"
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

                  <h2 className="font-serif text-2xl sm:text-4xl text-ivory font-normal tracking-wide">
                    For My Bangaram, My Favourite Universe ✨
                  </h2>

                  {/* Sequential Emotional Reveal Card */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#1C1D36]/85 backdrop-blur-md border border-lavender/25 shadow-2xl space-y-3.5 font-serif text-base sm:text-lg text-ivory/95 leading-relaxed text-center w-full">
                    {introStep >= 0 && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-ivory/80 italic text-sm sm:text-base"
                      >
                        "Every birthday deserves something special."
                      </motion.p>
                    )}

                    {introStep >= 1 && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-ivory/90"
                      >
                        Every surprise was chosen with care. Every sketch was drawn with you in mind.
                      </motion.p>
                    )}

                    {introStep >= 2 && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-handwriting text-2xl sm:text-3xl text-dustyRose-light font-bold py-1"
                      >
                        And this entire little universe... was created for one person.
                      </motion.p>
                    )}

                    {introStep >= 3 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="pt-2"
                      >
                        <span className="font-display italic text-3xl sm:text-4xl text-champagne-light font-bold drop-shadow-[0_2px_10px_rgba(255,223,128,0.6)]">
                          My Bangaram ❤️
                        </span>
                      </motion.div>
                    )}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="pt-2"
                  >
                    <button
                      onClick={handleStartConstellation}
                      className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D9485F] via-[#B22234] to-[#851E2E] hover:from-[#E6566D] hover:to-[#A32336] text-ivory font-sans text-sm sm:text-base font-semibold tracking-wide shadow-xl active:scale-95 transition-all hover:shadow-[0_0_25px_rgba(217,72,95,0.6)] cursor-pointer"
                    >
                      <Stars className="w-4 h-4 text-[#FFE085]" />
                      <span>Look Up at the Stars, My Bangaram ✨</span>
                    </button>
                  </motion.div>
                </div>
              )}

              {/* =========================================================================
                  PHASE B: THE 23-STAR CONSTELLATION (Aligning into Heart)
                 ========================================================================= */}
              {phase === 'constellation' && (
                <div className="flex flex-col items-center max-w-xl w-full space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lavender/20 border border-lavender/40 text-xs font-sans tracking-widest uppercase text-lavender-light">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFE085]" />
                    <span>23 Stars Aligning in the Cosmos</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-normal">
                    23 Stars for 23 Beautiful Years
                  </h3>

                  {/* 23-Star Heart Constellation Canvas */}
                  <div className="relative w-72 h-72 sm:w-80 sm:h-80 my-2 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(255,223,128,0.7)]">
                      {/* Heart Constellation Lines */}
                      <motion.path
                        d={constellationPath}
                        fill="rgba(217, 72, 95, 0.08)"
                        stroke="#FFE085"
                        strokeWidth="1.2"
                        strokeDasharray="2.5 1.5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.9 }}
                        transition={{ duration: 2.2, ease: 'easeInOut' }}
                      />

                      {/* 23 Stars */}
                      {CONSTELLATION_STARS.map((star, idx) => (
                        <g key={star.id}>
                          {/* Pulsing Star Glow Aura */}
                          <motion.circle
                            cx={star.x}
                            cy={star.y}
                            r="3"
                            fill="#FFD700"
                            opacity="0.3"
                            animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 2 + (idx % 3) * 0.5, repeat: Infinity }}
                          />
                          {/* Solid Star Core */}
                          <motion.circle
                            cx={star.x}
                            cy={star.y}
                            r="1.6"
                            fill="#FFFFFF"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: idx * 0.07, duration: 0.4 }}
                          />
                        </g>
                      ))}
                    </svg>

                    {/* Central Glowing Sparkle */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                      className="absolute w-8 h-8 rounded-full bg-radial from-[#FFF9E6] via-[#FFD166]/30 to-transparent blur-sm pointer-events-none"
                    />
                  </div>

                  <p className="font-handwriting text-2xl sm:text-3xl text-dustyRose-light font-bold">
                    Connecting every year into one eternal constellation...
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={handleRevealRing}
                      className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F4D06F] to-[#B38C22] hover:from-[#E5BF48] hover:to-[#C49D33] text-midnight font-sans text-sm sm:text-base font-bold tracking-wide shadow-xl active:scale-95 transition-all hover:shadow-[0_0_30px_rgba(255,223,128,0.7)] cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-midnight" />
                      <span>Look Into the Centre ✨</span>
                    </button>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  PHASE C: THE RING & THE PROPOSAL (Breathtaking Marriage Proposal)
                 ========================================================================= */}
              {phase === 'proposal' && (
                <div className="flex flex-col items-center max-w-xl w-full space-y-4">
                  {/* Glowing 3D Golden Solitaire Diamond Ring */}
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0, rotate: -15 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                    className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center my-1"
                  >
                    {/* Radiating Light Rays */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-0.5 h-36 bg-gradient-to-t from-transparent via-[#FFD700]/30 to-transparent"
                          style={{ transform: `rotate(${i * 30}deg)` }}
                        />
                      ))}
                    </motion.div>

                    {/* Ambient Gold Aura */}
                    <div className="absolute -inset-4 bg-radial from-[#FFD700]/35 via-[#FFA07A]/15 to-transparent rounded-full blur-xl pointer-events-none" />

                    {/* Ring Band (Curved Gold Torus) */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 sm:border-[5px] border-[#FFE085] shadow-[0_0_25px_rgba(255,224,133,0.8),inset_0_0_15px_rgba(212,175,55,0.6)] bg-transparent flex items-center justify-center">
                      {/* Metallic Rim Highlight */}
                      <div className="absolute inset-1 rounded-full border border-white/40 pointer-events-none" />

                      {/* Solitaire Diamond Mount at the Top */}
                      <motion.div
                        animate={{
                          scale: [1, 1.15, 1],
                          filter: [
                            'drop-shadow(0 0 10px rgba(255, 255, 255, 0.9))',
                            'drop-shadow(0 0 22px rgba(255, 220, 120, 1))',
                            'drop-shadow(0 0 10px rgba(255, 255, 255, 0.9))'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
                      >
                        {/* 4-Point Brilliant Star Diamond */}
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                          <polygon
                            points="12,2 15,9 22,12 15,15 12,22 9,15 2,12 9,9"
                            fill="#FFFFFF"
                            stroke="#FFEBB3"
                            strokeWidth="1"
                          />
                          <circle cx="12" cy="12" r="3" fill="#E8F4F8" opacity="0.9" />
                        </svg>
                      </motion.div>

                      {/* Little Inner Heart Mote */}
                      <Heart className="w-5 h-5 text-[#FF758F] fill-current opacity-70 animate-pulse" />
                    </div>
                  </motion.div>

                  {/* Proposal Heartfelt Speech */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#1C1D36]/90 backdrop-blur-md border-2 border-[#D4AF37]/50 shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-3 font-serif text-base sm:text-lg text-ivory/95 leading-relaxed text-center w-full">
                    <p className="italic text-ivory/85">
                      "I don't just want to be someone who celebrates your birthdays from afar."
                    </p>

                    <p>
                      I want to be the one who makes every ordinary day feel like a celebration. I want to be your favourite hello, your hardest goodbye, and your forever home.
                    </p>

                    <div className="w-16 h-px bg-[#D4AF37]/60 mx-auto my-2" />

                    <h3 className="font-handwriting text-2xl sm:text-4xl text-[#FFE085] font-bold py-2 leading-tight">
                      Will you be my forever favourite person, My Bangaram? ❤️
                    </h3>
                  </div>

                  {/* Interactive Proposal Choices */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full pt-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAnswerYes}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#D9485F] via-[#BA2D44] to-[#8C1625] text-ivory font-sans text-base sm:text-lg font-bold tracking-wide shadow-[0_0_30px_rgba(217,72,95,0.7)] hover:shadow-[0_0_40px_rgba(217,72,95,0.9)] transition-all cursor-pointer border border-[#FFE085]"
                    >
                      <Heart className="w-5 h-5 fill-current text-[#FFE085]" />
                      <span>Yes, My Love! ❤️</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleAnswerMoment}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-ivory/85 font-sans text-sm sm:text-base font-medium tracking-wide transition-all cursor-pointer backdrop-blur-sm"
                    >
                      <Sparkles className="w-4 h-4 text-lavender" />
                      <span>I Need a Moment ✨</span>
                    </motion.button>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  PHASE D1: THE YES CELEBRATION (Joyous, Majestic Celebration)
                 ========================================================================= */}
              {phase === 'answered_yes' && (
                <div className="flex flex-col items-center max-w-xl w-full space-y-4">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [1, 1.1, 1], opacity: 1 }}
                    transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse' }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-[#BA2D44] via-[#D9485F] to-[#FFE085] flex items-center justify-center shadow-[0_0_40px_rgba(217,72,95,0.8)] border-2 border-white"
                  >
                    <Heart className="w-10 h-10 text-white fill-current drop-shadow-md" />
                  </motion.div>

                  <h2 className="font-serif text-2xl sm:text-4xl text-ivory font-normal tracking-wide">
                    YOU JUST MADE MY LITTLE UNIVERSE INFINITELY MORE BEAUTIFUL!
                  </h2>

                  {/* Radiant Celebration Card */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#1C1D36]/90 backdrop-blur-md border-2 border-[#FFE085]/60 shadow-[0_20px_60px_rgba(217,72,95,0.4)] space-y-3 font-serif text-base sm:text-lg text-ivory/95 leading-relaxed text-center w-full">
                    <p className="font-handwriting text-3xl sm:text-4xl text-[#FFE085] font-bold py-1">
                      Forever grateful for you, My Bangaram. ❤️
                    </p>

                    <p className="italic text-ivory/90">
                      "Among all the stars and all the galaxies, having you is the greatest blessing I could ever ask for."
                    </p>

                    <div className="w-16 h-px bg-[#D4AF37]/60 mx-auto my-2" />

                    <p className="font-serif text-base sm:text-lg text-champagne-light">
                      Happy 23rd Birthday, My Forever Person.
                      <br />
                      Every tomorrow begins with you.
                    </p>
                  </div>

                  {/* Celebration Revisit Corner (Quick Access Hub) */}
                  <div className="mt-5 w-full max-w-md pt-4 border-t border-white/20">
                    <p className="text-[11px] font-sans uppercase tracking-widest text-ivory/70 mb-2 font-semibold">
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
                  <div className="mt-4 pb-4">
                    <button
                      onClick={onRestart}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-ivory text-midnight hover:bg-champagne text-xs sm:text-sm font-sans font-medium tracking-wide shadow-lg active:scale-95 transition-all group cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-dustyRose-dark group-hover:-rotate-90 transition-transform duration-300" />
                      <span>Revisit from the Beginning</span>
                    </button>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  PHASE D2: I NEED A MOMENT (Warm, Respectful, Zero Pressure)
                 ========================================================================= */}
              {phase === 'answered_moment' && (
                <div className="flex flex-col items-center max-w-xl w-full space-y-4">
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#1C1D36]/90 backdrop-blur-md border border-lavender/30 shadow-2xl space-y-3 font-serif text-base sm:text-lg text-ivory/95 leading-relaxed text-center w-full">
                    <div className="w-12 h-12 mx-auto rounded-full bg-lavender/20 flex items-center justify-center text-lavender-light mb-2">
                      <Sparkles className="w-6 h-6" />
                    </div>

                    <h3 className="font-handwriting text-3xl sm:text-4xl text-champagne-light font-bold">
                      Take all the time you need, My Love.
                    </h3>

                    <p className="italic text-ivory/90">
                      "True love is patient, kind, and never rushes. There is never any pressure in this universe."
                    </p>

                    <p className="text-sm sm:text-base text-ivory/80">
                      I will be right here, always holding a universe of love and gentle warmth for you.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={handleAnswerYes}
                        className="flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#D9485F] to-[#BA2D44] text-ivory font-sans text-sm font-bold tracking-wide shadow-lg active:scale-95 transition-all cursor-pointer"
                      >
                        <Heart className="w-4 h-4 fill-current text-[#FFE085]" />
                        <span>I'm Ready Now ❤️</span>
                      </button>

                      <button
                        onClick={() => setPhase('proposal')}
                        className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-xs font-sans text-ivory/80 transition-all cursor-pointer"
                      >
                        Return to Proposal
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stargazing Quiet Screen (Under the Stars) */}
        {stargazingMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <p className="font-serif italic text-xl sm:text-2xl text-ivory/80 max-w-md">
              "Some moments are meant to simply be enjoyed under the quiet stars..."
            </p>
            <p className="font-handwriting text-2xl sm:text-3xl text-lavender-light mt-3">
              Happy 23rd Birthday, My Bangaram.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};