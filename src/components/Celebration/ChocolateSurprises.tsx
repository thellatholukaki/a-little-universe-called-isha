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
          className="relative w-full p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#4A2E2B] via-[#2F1A17] to-[#1F100D] border-2 border-[#D4A373] shadow-2xl my-2"
        >
          {/* Inner Golden Foil Fluted Divider Padding */}
          <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-[#D4A373]/40 pointer-events-none" />
          
          <div className="text-left mb-3 px-2 flex items-center justify-between">
            <span className="font-serif italic text-xs sm:text-sm text-[#F3E5D8]">
              Select a confection to unwrap:
            </span>
            <span className="text-[11px] font-sans text-[#E5B53D] tracking-widest uppercase">
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
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.94 }}
                  className={`relative p-3.5 sm:p-4 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border text-center ${
                    isTasted
                      ? 'bg-[#5A3834]/80 border-[#E8C5A5]/60 shadow-md'
                      : 'bg-[#3D221F] border-[#663A34] hover:border-[#D4A373]'
                  }`}
                >
                  {/* Chocolate Visual Piece */}
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shadow-lg border border-[#FFE0B2]/30 flex items-center justify-center relative mb-2"
                    style={{ backgroundColor: choc.color }}
                  >
                    {/* Unique Topping Decoration */}
                    <div className="text-xs font-serif text-[#FFE0B2] opacity-80">
                      {choc.id === 6 ? '🍓' : choc.id === 5 ? '💜' : choc.id === 2 ? '🌹' : '✨'}
                    </div>
                  </div>

                  <span className="font-serif text-sm sm:text-base text-[#FDFBF7] font-medium leading-tight">
                    {choc.name}
                  </span>
                  <span className="text-[10px] font-sans text-[#D4A373] tracking-wide mt-1">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm rounded-3xl bg-[#FFFDF9] border-2 border-[#D4A373] shadow-2xl p-6 sm:p-7 text-center overflow-hidden"
            >
              <button
                onClick={() => setSelectedChocolate(null)}
                className="absolute top-4 right-4 p-1.5 text-midnight/50 hover:text-midnight rounded-full"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div
                className="w-16 h-16 mx-auto rounded-2xl shadow-md border-2 border-[#FFE0B2]/40 flex items-center justify-center text-xl mb-3"
                style={{ backgroundColor: selectedChocolate.color }}
              >
                {selectedChocolate.id === 6 ? '🍓' : '🍫'}
              </div>

              <h4 className="font-serif text-xl sm:text-2xl text-midnight font-medium">
                {selectedChocolate.name}
              </h4>
              <p className="text-xs font-sans text-graphite uppercase tracking-wider mt-0.5">
                {selectedChocolate.description}
              </p>

              <div className="w-10 h-px bg-dustyRose/40 mx-auto my-3" />

              <p className="font-serif italic text-base text-midnight/90 leading-relaxed px-2">
                "{selectedChocolate.note}"
              </p>

              <button
                onClick={() => setSelectedChocolate(null)}
                className="mt-5 px-6 py-2 rounded-full bg-[#3B1F19] text-[#FFF9F0] text-xs font-sans font-medium hover:bg-[#4A2E2B] transition-colors"
              >
                Sweet!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
