import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Heart, X } from 'lucide-react';
import { CHOCOLATE_ITEMS } from '../../data/chocolates';
import { ChocolateItem } from '../../types';
import { audioEngine } from '../../services/audioEngine';

interface ChocolateSurprisesProps {
  onContinueToGifts: () => void;
}

export const ChocolateSurprises: React.FC<ChocolateSurprisesProps> = ({ onContinueToGifts }) => {
  const [selectedChocolate, setSelectedChocolate] = useState<ChocolateItem | null>(null);
  const [tastedIds, setTastedIds] = useState<Set<number>>(new Set([1]));

  const handlePickChocolate = (item: ChocolateItem) => {
    setSelectedChocolate(item);
    audioEngine.playChocolatePick();
    setTastedIds((prev) => new Set(prev).add(item.id));
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 py-8 select-none text-center overflow-y-auto no-scrollbar">
      <div className="relative z-20 max-w-2xl w-full flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAD5B8]/60 border border-[#C49B76]/40 text-xs font-sans tracking-widest uppercase text-[#4A2E2B] font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C49B76]" />
            <span>Sweet Birthday Treats</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-midnight font-normal">
            Something Sweet for Your Birthday
          </h2>
          <p className="font-handwriting text-xl sm:text-2xl text-dustyRose-dark font-semibold mt-1">
            "Because birthdays deserve something sweet. And so do you!"
          </p>
        </motion.div>

        {/* Artisan Chocolate Box Tray */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative w-full p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#3B1F19] via-[#2A1412] to-[#1A0B09] border-2 border-[#D4AF37] shadow-[0_15px_40px_rgba(30,10,5,0.45)] my-2 overflow-hidden"
        >
          {/* Subtle Champagne Gold Foil Corner Filigrees & Sheen */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#FFE8A3]/15 via-transparent to-transparent pointer-events-none rounded-tr-3xl" />
          <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-[#D4AF37]/50 pointer-events-none shadow-[inset_0_0_15px_rgba(212,175,55,0.15)]" />
          
          <div className="text-left mb-3 px-2 flex items-center justify-between relative z-10">
            <span className="font-serif italic text-xs sm:text-sm text-[#F7E7CE] flex items-center gap-1.5">
              <span className="text-[#D4AF37]">✦</span> Select a confection handcrafted for you:
            </span>
            <span className="text-[11px] font-sans text-[#E5B53D] tracking-widest uppercase font-semibold">
              {tastedIds.size} of 6 tasted
            </span>
          </div>

          {/* Grid of 6 Distinct Chocolates, Truffles & Strawberries */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 relative z-10">
            {CHOCOLATE_ITEMS.map((choc) => {
              const isTasted = tastedIds.has(choc.id);
              return (
                <motion.button
                  key={choc.id}
                  onClick={() => handlePickChocolate(choc)}
                  whileHover={{ scale: 1.05, y: -4, boxShadow: '0 10px 25px rgba(212, 175, 55, 0.25)' }}
                  whileTap={{ scale: 0.94 }}
                  className={`relative p-3.5 sm:p-4 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border text-center group cursor-pointer ${
                    isTasted
                      ? 'bg-gradient-to-b from-[#552E2A]/90 to-[#42221E]/90 border-[#D4AF37]/70 shadow-md'
                      : 'bg-gradient-to-b from-[#381B18] to-[#2B1412] border-[#663A34] hover:border-[#D4AF37]'
                  }`}
                >
                  {/* Subtle Top Gloss Reflection */}
                  <div className="absolute top-1 left-2 right-2 h-2 rounded-t-xl bg-white/5 pointer-events-none" />

                  {/* Chocolate Visual Piece */}
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shadow-lg border border-[#FFE0B2]/30 flex items-center justify-center relative mb-2 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: choc.color }}
                  >
                    {/* Inner Texture Highlight */}
                    <div className="absolute inset-1 rounded-xl bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                    {/* Unique Topping Decoration */}
                    <div className="text-xs font-serif text-[#FFE0B2] opacity-85 drop-shadow-sm">
                      {choc.id === 6 ? '🍓' : choc.id === 5 ? '💜' : choc.id === 2 ? '🌹' : '✨'}
                    </div>
                  </div>

                  <span className="font-serif text-sm sm:text-base text-[#FDFBF7] font-medium leading-tight group-hover:text-[#FFE085] transition-colors">
                    {choc.name}
                  </span>
                  <span className="text-[10px] font-sans text-[#D4AF37] tracking-wide mt-1">
                    {choc.topping}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Natural Narrative Transition to 23 Gifts */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 flex flex-col items-center"
        >
          <button
            onClick={onContinueToGifts}
            className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#B22234] to-[#8C1625] hover:from-[#C72A3E] hover:to-[#A31D2E] text-ivory text-sm sm:text-base font-sans font-semibold tracking-wide shadow-xl active:scale-95 transition-all hover:shadow-[0_0_25px_rgba(217,72,95,0.45)] group cursor-pointer"
          >
            <span>Discover your 23 birthday surprises 🎁</span>
            <ArrowRight className="w-4 h-4 text-[#FFE085] group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Chocolate Message Modal */}
      <AnimatePresence>
        {selectedChocolate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF4ED] to-[#F5EADB] border-2 border-[#D4AF37] shadow-[0_20px_60px_rgba(30,10,15,0.4)] p-6 sm:p-7 text-center overflow-hidden"
            >
              {/* Floating ambient micro-hearts */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      x: 40 + i * 45,
                      y: 120,
                      opacity: 0,
                      scale: 0.5
                    }}
                    animate={{
                      y: -20,
                      opacity: [0, 0.7, 0],
                      scale: [0.6, 1.1, 0.8]
                    }}
                    transition={{
                      duration: 3 + i * 0.4,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: 'easeInOut'
                    }}
                    className="absolute text-dustyRose/30"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => setSelectedChocolate(null)}
                className="absolute top-4 right-4 p-1.5 text-midnight/50 hover:text-midnight rounded-full transition-colors cursor-pointer z-10"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div
                className="w-16 h-16 mx-auto rounded-2xl shadow-lg border-2 border-[#FFE0B2]/60 flex items-center justify-center text-2xl mb-3 relative"
                style={{ backgroundColor: selectedChocolate.color }}
              >
                <div className="absolute inset-1 rounded-xl bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
                {selectedChocolate.id === 6 ? '🍓' : '🍫'}
              </div>

              <h4 className="font-serif text-xl sm:text-2xl text-midnight font-medium">
                {selectedChocolate.name}
              </h4>
              <p className="text-xs font-sans text-graphite/80 uppercase tracking-widest mt-0.5 font-medium">
                {selectedChocolate.description}
              </p>

              <div className="flex items-center justify-center gap-2 my-3.5">
                <div className="w-10 h-px bg-[#D4AF37]/50" />
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <div className="w-10 h-px bg-[#D4AF37]/50" />
              </div>

              <p className="font-serif italic text-base text-midnight/90 leading-relaxed px-2">
                "{selectedChocolate.note}"
              </p>

              <button
                onClick={() => setSelectedChocolate(null)}
                className="mt-5 px-7 py-2.5 rounded-full bg-gradient-to-r from-[#3B1F19] to-[#25120F] text-[#FFF9F0] text-xs font-sans font-semibold tracking-wide hover:from-[#4D2720] hover:to-[#331814] shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Delicious! ✨
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
