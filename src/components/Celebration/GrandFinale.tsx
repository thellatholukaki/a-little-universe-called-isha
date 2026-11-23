import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Eye, EyeOff, Cake, Gift, Heart, Feather, Stars, ArrowRight, Smile } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CelebrationStage } from '../../types';
import { audioEngine } from '../../services/audioEngine';

interface GrandFinaleProps {
  onRestart: () => void;
  onNavigateStage: (stage: CelebrationStage) => void;
}

type FinalePhase = 'intro' | 'constellation' | 'proposal' | 'choice_yes' | 'choice_time' | 'choice_friend';

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
    }, 1500);
    return () => clearInterval(timer);
  }, [phase]);

  const handleStartConstellation = () => {
    setPhase('constellation');
    audioEngine.playConstellationChime();
  };

  const handleRevealProposal = () => {
    setPhase('proposal');
    audioEngine.playRingRevealChime();
  };

  // Choice 1: "Yes, Let's Give It a Chance! ❤️"
  const handleChoiceYes = () => {
    setPhase('choice_yes');
    audioEngine.playProposalYesCelebration();

    // Heartfelt celebration confetti bursts
    confetti({
      particleCount: 85,
      spread: 110,
      origin: { y: 0.5 },
      colors: ['#FFD166', '#D9485F', '#E07085', '#FFF9F0', '#C9C0E8', '#FF758F'],
      scalar: 1.2,
      ticks: 300,
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 80,
        origin: { x: 0.15, y: 0.6 },
        colors: ['#FFD700', '#FF69B4', '#FFFDF9'],
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 80,
        origin: { x: 0.85, y: 0.6 },
        colors: ['#FFD700', '#FF69B4', '#FFFDF9'],
      });
    }, 350);
  };

  // Choice 2: "I Need Some Time ✨"
  const handleChoiceTime = () => {
    setPhase('choice_time');
    audioEngine.playWishChime();
  };

  // Choice 3: "I See You as a Friend 💛"
  const handleChoiceFriend = () => {
    setPhase('choice_friend');
    audioEngine.playWishChime();
  };

  // SVG heart path string for the constellation
  const constellationPath = CONSTELLATION_STARS.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start sm:justify-center px-4 sm:px-6 py-6 sm:py-8 select-none text-center overflow-y-auto no-scrollbar text-ivory">
      {/* Ambient Cosmic Nebula Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] bg-radial from-[#7B68EE]/20 via-[#4B0082]/12 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Luminous Crescent Moon with Soft Halo */}
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
                  PHASE A: ENTER THE MIDNIGHT UNIVERSE (Sequential Poetic Intro)
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
                        alt="Graphite pencil sketch of girl looking at the starry sky"
                        className="w-full h-full object-cover filter contrast-[1.05]"
                      />
                      <div className="absolute inset-0 bg-midnight/20 pointer-events-none" />
                    </div>
                  </motion.div>

                  <h2 className="font-serif text-2xl sm:text-4xl text-ivory font-normal tracking-wide">
                    For You, Bangaram ✨
                  </h2>

                  {/* Sequential Emotional Reveal Card */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#1C1D36]/85 backdrop-blur-md border border-lavender/25 shadow-2xl space-y-3.5 font-serif text-base sm:text-lg text-ivory/95 leading-relaxed text-center w-full">
                    {introStep >= 0 && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-ivory/80 italic text-sm sm:text-base"
                      >
                        "Among billions of stars..."
                      </motion.p>
                    )}

                    {introStep >= 1 && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-ivory/90"
                      >
                        "There is someone who makes this little universe feel a little more beautiful."
                      </motion.p>
                    )}

                    {introStep >= 2 && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-handwriting text-2xl sm:text-3xl text-dustyRose-light font-bold py-1"
                      >
                        "Someone whose smile deserves its own constellation."
                      </motion.p>
                    )}

                    {introStep >= 3 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="pt-2"
                      >
                        <span className="font-display italic text-3xl sm:text-4xl text-champagne-light font-bold drop-shadow-[0_2px_10px_rgba(255,223,128,0.6)]">
                          Bangaram...
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
                      <span>Look Up at the Stars ✨</span>
                    </button>
                  </motion.div>
                </div>
              )}

              {/* =========================================================================
                  PHASE B: THE CONSTELLATION TRANSFORMATION (Heart Constellation)
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
                      {/* Heart Constellation Connecting Lines */}
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

                    {/* Central Soft Rose & Violet Nebula Glow */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.85, 0.5] }}
                      transition={{ duration: 2.8, repeat: Infinity, delay: 1.2 }}
                      className="absolute w-24 h-24 rounded-full bg-radial from-[#FFB6C1]/25 via-[#9370DB]/15 to-transparent blur-md pointer-events-none"
                    />
                  </div>

                  <p className="font-handwriting text-2xl sm:text-3xl text-dustyRose-light font-bold">
                    Connecting every year into one gentle constellation...
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={handleRevealProposal}
                      className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F4D06F] to-[#B38C22] hover:from-[#E5BF48] hover:to-[#C49D33] text-midnight font-sans text-sm sm:text-base font-bold tracking-wide shadow-xl active:scale-95 transition-all hover:shadow-[0_0_30px_rgba(255,223,128,0.7)] cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-midnight" />
                      <span>Look Into the Centre ✨</span>
                    </button>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  PHASE C & D: SYMBOLIC RING REVEAL & THE SINCERE PROPOSAL
                 ========================================================================= */}
              {phase === 'proposal' && (
                <div className="flex flex-col items-center max-w-xl w-full space-y-4">
                  {/* Symbolic Golden Solitaire Ring */}
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0, rotate: -15 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                    className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center my-1"
                  >
                    {/* Orbiting Tiny Micro-Stars */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <div className="absolute top-0 w-2 h-2 rounded-full bg-[#FFE085] shadow-[0_0_8px_#FFD700]" />
                      <div className="absolute bottom-1 right-2 w-1.5 h-1.5 rounded-full bg-[#FFF9F0] shadow-[0_0_6px_#FFF]" />
                    </motion.div>

                    {/* Ambient Champagne & Rose Gold Aura */}
                    <div className="absolute -inset-4 bg-radial from-[#FFD700]/30 via-[#FDA085]/15 to-transparent rounded-full blur-xl pointer-events-none" />

                    {/* Ring Band */}
                    <div className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-full border-4 border-[#FFE085] shadow-[0_0_25px_rgba(255,224,133,0.8),inset_0_0_12px_rgba(212,175,55,0.6)] bg-transparent flex items-center justify-center">
                      {/* Metallic Rim Highlight */}
                      <div className="absolute inset-1 rounded-full border border-white/40 pointer-events-none" />

                      {/* Gemstone Sparkle Mount at the Top */}
                      <motion.div
                        animate={{
                          scale: [1, 1.15, 1],
                          filter: [
                            'drop-shadow(0 0 10px rgba(255, 255, 255, 0.9))',
                            'drop-shadow(0 0 20px rgba(255, 220, 120, 1))',
                            'drop-shadow(0 0 10px rgba(255, 255, 255, 0.9))'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <polygon
                            points="12,2 15,9 22,12 15,15 12,22 9,15 2,12 9,9"
                            fill="#FFFFFF"
                            stroke="#FFEBB3"
                            strokeWidth="1"
                          />
                          <circle cx="12" cy="12" r="3" fill="#E8F4F8" opacity="0.9" />
                        </svg>
                      </motion.div>

                      {/* Gentle Inner Heart */}
                      <Heart className="w-5 h-5 text-[#FF758F] fill-current opacity-75 animate-pulse" />
                    </div>
                  </motion.div>

                  {/* Sincere, Honest Proposal Message Card */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#1C1D36]/90 backdrop-blur-md border-2 border-[#D4AF37]/50 shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-3 font-serif text-base sm:text-lg text-ivory/95 leading-relaxed text-center w-full">
                    <p className="font-handwriting text-2xl sm:text-3xl text-champagne-light font-bold">
                      Bangaram...
                    </p>

                    <p className="italic text-ivory/85 text-sm sm:text-base">
                      "There's something I've wanted to tell you."
                    </p>

                    <p className="text-sm sm:text-base leading-relaxed text-ivory/90">
                      I don't know what the future holds. I don't know where life's journey will take us. But I do know that you are someone incredibly special to me.
                    </p>

                    <p className="text-sm sm:text-base leading-relaxed text-ivory/90">
                      Your smile, your presence, and the little things that make you who you are mean more to me than words can explain. Somewhere along the way, I realised that my feelings for you are more than ordinary.
                    </p>

                    <div className="w-16 h-px bg-[#D4AF37]/60 mx-auto my-2" />

                    <p className="font-serif italic text-base sm:text-lg text-[#FFE085]">
                      "I like you, Bangaram. And I would really love to know if you feel the same way about me."
                    </p>

                    <h3 className="font-serif text-xl sm:text-2xl text-white font-normal pt-2 leading-snug">
                      Would you give us a chance to create something beautiful together? ❤️
                    </h3>
                  </div>

                  {/* Three Interactive Proposal Responses */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 w-full pt-2">
                    {/* Choice 1: Yes */}
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleChoiceYes}
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-gradient-to-r from-[#D9485F] via-[#BA2D44] to-[#8C1625] text-ivory font-sans text-sm sm:text-base font-bold tracking-wide shadow-[0_0_25px_rgba(217,72,95,0.7)] hover:shadow-[0_0_35px_rgba(217,72,95,0.9)] transition-all cursor-pointer border border-[#FFE085]"
                    >
                      <Heart className="w-4 h-4 fill-current text-[#FFE085]" />
                      <span>Yes, Let's Give It a Chance! ❤️</span>
                    </motion.button>

                    {/* Choice 2: Need Some Time */}
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleChoiceTime}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-ivory/90 font-sans text-xs sm:text-sm font-medium tracking-wide transition-all cursor-pointer backdrop-blur-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-lavender" />
                      <span>I Need Some Time ✨</span>
                    </motion.button>

                    {/* Choice 3: See as Friend */}
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleChoiceFriend}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-ivory/85 font-sans text-xs sm:text-sm font-medium tracking-wide transition-all cursor-pointer backdrop-blur-sm"
                    >
                      <Smile className="w-3.5 h-3.5 text-[#FFD166]" />
                      <span>I See You as a Friend 💛</span>
                    </motion.button>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  RESPONSE 1: YES, LET'S GIVE IT A CHANCE! ❤️
                 ========================================================================= */}
              {phase === 'choice_yes' && (
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
                    That just made this little universe a lot more beautiful! ❤️
                  </h2>

                  {/* Warm Joyful Response Card */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#1C1D36]/90 backdrop-blur-md border-2 border-[#FFE085]/60 shadow-[0_20px_60px_rgba(217,72,95,0.4)] space-y-3 font-serif text-base sm:text-lg text-ivory/95 leading-relaxed text-center w-full">
                    <p className="font-handwriting text-3xl sm:text-4xl text-[#FFE085] font-bold py-1">
                      Thank you for giving this a chance, Bangaram.
                    </p>

                    <p className="italic text-ivory/90">
                      "I'm genuinely looking forward to every little conversation, every shared laugh, and whatever beautiful moments lie ahead."
                    </p>

                    <div className="w-16 h-px bg-[#D4AF37]/60 mx-auto my-2" />

                    <p className="font-serif text-base sm:text-lg text-champagne-light">
                      Happy 23rd Birthday, Bangaram.
                      <br />
                      May this year bring you all the happiness and warmth you deserve.
                    </p>
                  </div>

                  {/* Celebration Revisit Corner */}
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
                  RESPONSE 2: I NEED SOME TIME ✨ (Zero Pressure, Warm, Patient)
                 ========================================================================= */}
              {phase === 'choice_time' && (
                <div className="flex flex-col items-center max-w-xl w-full space-y-4">
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#1C1D36]/90 backdrop-blur-md border border-lavender/30 shadow-2xl space-y-3.5 font-serif text-base sm:text-lg text-ivory/95 leading-relaxed text-center w-full">
                    <div className="w-14 h-14 mx-auto rounded-full bg-lavender/20 flex items-center justify-center text-lavender-light mb-2">
                      <Sparkles className="w-7 h-7 text-[#FFE085]" />
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-normal leading-snug">
                      Of course, Bangaram. Take all the time you need. I just wanted you to know how I feel.
                    </h3>

                    <p className="italic text-ivory/85 text-sm sm:text-base">
                      "There is zero rush, zero expectations, and never any pressure in this universe."
                    </p>

                    <p className="text-sm sm:text-base text-ivory/80">
                      Take your time to think, feel, or simply be. Whenever you are ready, this little universe is right here.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={() => setPhase('proposal')}
                        className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs sm:text-sm font-sans text-ivory transition-all cursor-pointer"
                      >
                        Revisit the Proposal Anytime
                      </button>

                      <button
                        onClick={() => onNavigateStage('gifts')}
                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38C22] text-midnight font-sans text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                      >
                        Explore Your 23 Gifts 🎁
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
                  RESPONSE 3: I SEE YOU AS A FRIEND 💛 (Warm, Respectful, Dignified)
                 ========================================================================= */}
              {phase === 'choice_friend' && (
                <div className="flex flex-col items-center max-w-xl w-full space-y-4">
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#1C1D36]/90 backdrop-blur-md border border-[#FFE085]/30 shadow-2xl space-y-3.5 font-serif text-base sm:text-lg text-ivory/95 leading-relaxed text-center w-full">
                    <div className="w-14 h-14 mx-auto rounded-full bg-[#FFE085]/15 flex items-center justify-center text-[#FFE085] mb-2">
                      <Heart className="w-7 h-7 fill-current" />
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-normal leading-snug">
                      Thank you for being honest with me, Bangaram. I respect how you feel, and I'm genuinely glad I could share what's in my heart.
                    </h3>

                    <p className="italic text-ivory/85 text-sm sm:text-base">
                      "Your happiness, your comfort, and having you in my life are what truly matter most."
                    </p>

                    <p className="text-sm sm:text-base text-ivory/80">
                      I hope this 23rd birthday brings you immense smiles, beautiful memories, and everything wonderful in the year ahead.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={() => onNavigateStage('cake')}
                        className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs sm:text-sm font-sans text-ivory transition-all cursor-pointer"
                      >
                        Revisit the Birthday Cake 🎂
                      </button>

                      <button
                        onClick={() => onRestart()}
                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D9485F] to-[#BA2D44] text-ivory font-sans text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer"
                      >
                        Revisit from Beginning
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
              Happy 23rd Birthday, Bangaram.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};