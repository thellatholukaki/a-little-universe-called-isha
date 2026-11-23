import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Feather, ArrowRight } from 'lucide-react';
import { ILLUSTRATIONS } from '../../data/illustrations';
import { Illustration } from '../../types';

interface Scene3PencilSketchProps {
  onNext: () => void;
}

export const Scene3PencilSketch: React.FC<Scene3PencilSketchProps> = ({ onNext }) => {
  const [selectedIllustration, setSelectedIllustration] = useState<Illustration>(ILLUSTRATIONS[0]);

  const handleSelectSketch = (item: Illustration) => {
    if (item.id === selectedIllustration.id) return;
    setSelectedIllustration(item);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 py-8 select-none overflow-y-auto no-scrollbar">
      <div className="relative z-20 max-w-4xl w-full flex flex-col items-center">
        {/* Section Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-champagne/70 border border-dustyRose/30 text-xs font-sans tracking-widest uppercase text-midnight/80 mb-2"
        >
          <Feather className="w-3.5 h-3.5 text-dustyRose-dark" />
          <span>Graphite & Paper Study</span>
        </motion.div>

        {/* Section Main Narrative Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-midnight font-normal text-center mb-1"
        >
          A Little Sketch of You
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-handwriting text-xl sm:text-2xl text-dustyRose-dark text-center mb-5"
        >
          "Some people leave an impression simply by being themselves."
        </motion.p>

        {/* Main Artwork Showcase Layout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Sketch Frame (Left / Center) - Pure Artwork Focus, No Titles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="md:col-span-7 flex flex-col items-center"
          >
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] p-3 sm:p-4 rounded-2xl vintage-card border-2 border-[#E5DAC7] shadow-xl overflow-hidden group">
              {/* Deckled Edge Inset Paper Border */}
              <div className="relative w-full h-full rounded-xl overflow-hidden border border-[#D9CDB8] bg-[#F7F1E5] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedIllustration.id}
                    initial={{ opacity: 0, filter: 'contrast(130%) blur(3px)' }}
                    animate={{ opacity: 1, filter: 'contrast(100%) blur(0px)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="relative w-full h-full"
                  >
                    {/* Pencil Illustration Image */}
                    <img
                      src={selectedIllustration.imagePath}
                      alt="Artistic graphite pencil sketch on textured paper"
                      className="w-full h-full object-cover filter contrast-[1.03] sepia-[0.05] transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                    />

                    {/* Animated Pencil Shading Reveal Wipe Overlay */}
                    <motion.div
                      initial={{ scaleX: 1 }}
                      animate={{ scaleX: 0 }}
                      transition={{ duration: 1.1, ease: 'easeInOut' }}
                      style={{ transformOrigin: 'right' }}
                      className="absolute inset-0 bg-[#F4EEDB] pointer-events-none"
                    />

                    {/* Subtle Vintage Corner Vignette */}
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(37,38,65,0.12)_100%)]" />
                  </motion.div>
                </AnimatePresence>

                {/* Subtle paper watermark stamp in corner */}
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-ivory/80 backdrop-blur-sm border border-champagne text-[10px] font-serif italic text-graphite-dark">
                  Original Graphite Study • 2026
                </div>
              </div>
            </div>
          </motion.div>

          {/* Narrative Reflections & Artwork Switcher (Right) */}
          <div className="md:col-span-5 flex flex-col justify-center text-left space-y-4">
            {/* Primary Narrative Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="vintage-card p-5 sm:p-6 rounded-2xl border border-dustyRose/20 shadow-sm space-y-3"
            >
              <div className="flex items-center gap-1.5 text-dustyRose-dark">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-xs font-sans uppercase tracking-widest font-medium">In Soft Pencil Strokes</span>
              </div>
              
              <p className="font-serif text-lg sm:text-xl text-midnight/90 leading-relaxed italic">
                "Not every beautiful thing needs a photograph to be remembered."
              </p>

              <div className="w-8 h-px bg-dustyRose/40" />

              <p className="font-serif text-sm sm:text-base text-midnight/80 leading-relaxed">
                Like gentle graphite lines upon warm textured paper, some impressions are made without trying—carried softly like a quiet melody that lingers long after.
              </p>

              <p className="font-handwriting text-xl text-dustyRose-dark font-semibold pt-1">
                A quiet study in grace and long flowing hair.
              </p>
            </motion.div>

            {/* Seamless Minimalist Artwork Switcher (No Titles, No Text Labels) */}
            <div className="pt-1">
              <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1.5">
                {ILLUSTRATIONS.map((sketch, index) => {
                  const isSelected = sketch.id === selectedIllustration.id;
                  return (
                    <button
                      key={sketch.id}
                      onClick={() => handleSelectSketch(sketch)}
                      className={`relative flex-shrink-0 w-13 h-15 sm:w-14 sm:h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        isSelected
                          ? 'border-dustyRose scale-105 shadow-md ring-2 ring-dustyRose/40'
                          : 'border-[#DECDB7] opacity-65 hover:opacity-100 hover:border-dustyRose/60'
                      }`}
                      aria-label={`View illustration ${index + 1}`}
                    >
                      <img
                        src={sketch.imagePath}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Turn Page Button */}
            <div className="pt-2">
              <button
                onClick={onNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-midnight hover:bg-midnight-light text-ivory text-xs sm:text-sm font-sans font-medium tracking-wide transition-all shadow-md hover:shadow-lg group"
              >
                <span>Read the letter</span>
                <ArrowRight className="w-4 h-4 text-champagne group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
