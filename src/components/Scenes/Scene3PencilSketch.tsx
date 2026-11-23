import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Feather, ArrowRight, Eye } from 'lucide-react';
import { ILLUSTRATIONS } from '../../data/illustrations';
import { Illustration } from '../../types';

interface Scene3PencilSketchProps {
  onNext: () => void;
}

export const Scene3PencilSketch: React.FC<Scene3PencilSketchProps> = ({ onNext }) => {
  const [selectedIllustration, setSelectedIllustration] = useState<Illustration>(ILLUSTRATIONS[0]);
  const [isDrawn, setIsDrawn] = useState(true);

  const handleSelectSketch = (item: Illustration) => {
    if (item.id === selectedIllustration.id) return;
    setIsDrawn(false);
    setSelectedIllustration(item);
    setTimeout(() => {
      setIsDrawn(true);
    }, 150);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 py-10 select-none overflow-y-auto no-scrollbar">
      <div className="relative z-20 max-w-4xl w-full flex flex-col items-center">
        {/* Section Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-champagne/70 border border-dustyRose/30 text-xs font-sans tracking-widest uppercase text-midnight/80 mb-3"
        >
          <Feather className="w-3.5 h-3.5 text-dustyRose-dark" />
          <span>Graphite & Paper Study</span>
        </motion.div>

        {/* Section Heading */}
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
          className="font-handwriting text-xl sm:text-2xl text-dustyRose-dark text-center mb-6"
        >
          "Some people leave an impression simply by being themselves."
        </motion.p>

        {/* Main Artwork Showcase Layout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Sketch Frame (Left / Center) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="md:col-span-7 flex flex-col items-center"
          >
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] p-3 sm:p-4 rounded-xl vintage-card border-2 border-[#E5DAC7] shadow-xl overflow-hidden group">
              {/* Deckled Edge Inset Paper Border */}
              <div className="relative w-full h-full rounded-lg overflow-hidden border border-[#D9CDB8] bg-[#F7F1E5] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedIllustration.id}
                    initial={{ opacity: 0, filter: 'contrast(150%) blur(4px)' }}
                    animate={{ opacity: 1, filter: 'contrast(100%) blur(0px)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="relative w-full h-full"
                  >
                    {/* Pencil Illustration Image */}
                    <img
                      src={selectedIllustration.imagePath}
                      alt={selectedIllustration.title}
                      className="w-full h-full object-cover rounded filter contrast-[1.03] sepia-[0.06] transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                    />

                    {/* Animated Pencil Shading Reveal Wipe Overlay */}
                    <motion.div
                      initial={{ scaleX: 1 }}
                      animate={{ scaleX: 0 }}
                      transition={{ duration: 1.2, ease: 'easeInOut' }}
                      style={{ transformOrigin: 'right' }}
                      className="absolute inset-0 bg-[#F4EEDB] pointer-events-none"
                    />

                    {/* Vintage Corner Vignette */}
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(37,38,65,0.12)_100%)]" />
                  </motion.div>
                </AnimatePresence>

                {/* Hand-drawn pencil note in the bottom corner */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-ivory/85 backdrop-blur-sm border border-champagne text-[10px] font-mono text-graphite-dark">
                  Graphite on paper • 2026
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sketch Context & Selector (Right) */}
          <div className="md:col-span-5 flex flex-col justify-center text-left space-y-4">
            {/* Primary Quote from Prompt */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="vintage-card p-5 rounded-xl border border-dustyRose/20 shadow-sm"
            >
              <div className="flex items-center gap-1.5 text-dustyRose-dark mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-xs font-sans uppercase tracking-widest font-medium">An Artist's Note</span>
              </div>
              <p className="font-serif text-base sm:text-lg text-midnight/90 leading-relaxed italic">
                "Not every beautiful thing needs a photograph to be remembered."
              </p>
              <p className="font-handwriting text-lg sm:text-xl text-dustyRose-dark mt-2 font-semibold">
                — Quietly captured in pencil.
              </p>
            </motion.div>

            {/* Selected Sketch Description */}
            <motion.div
              key={`desc-${selectedIllustration.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="px-2"
            >
              <h3 className="font-serif text-xl sm:text-2xl text-midnight font-medium">
                {selectedIllustration.title}
              </h3>
              <p className="text-xs font-sans text-graphite tracking-wide uppercase mt-0.5">
                {selectedIllustration.caption}
              </p>
              <p className="font-serif italic text-sm text-midnight/80 mt-2 leading-relaxed">
                "{selectedIllustration.quote}"
              </p>
            </motion.div>

            {/* Thumbnail Gallery of All 5 Pencil Sketches */}
            <div className="pt-2">
              <span className="text-[11px] font-sans font-medium text-midnight/60 tracking-wider uppercase block mb-2">
                Browse Sketches ({ILLUSTRATIONS.length})
              </span>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {ILLUSTRATIONS.map((sketch) => {
                  const isSelected = sketch.id === selectedIllustration.id;
                  return (
                    <button
                      key={sketch.id}
                      onClick={() => handleSelectSketch(sketch)}
                      className={`relative flex-shrink-0 w-12 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        isSelected
                          ? 'border-dustyRose scale-105 shadow-md ring-2 ring-dustyRose/30'
                          : 'border-[#E0D3BF] opacity-70 hover:opacity-100 hover:border-dustyRose/60'
                      }`}
                      title={sketch.title}
                      aria-label={`View sketch: ${sketch.title}`}
                    >
                      <img
                        src={sketch.imagePath}
                        alt={sketch.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next Scene Button */}
            <div className="pt-2">
              <button
                onClick={onNext}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-midnight hover:bg-midnight-light text-ivory text-xs sm:text-sm font-sans font-medium tracking-wide transition-all shadow-md hover:shadow-lg group"
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
