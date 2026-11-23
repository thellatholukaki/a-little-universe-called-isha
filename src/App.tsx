import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { CelebrationStage } from './types';
import { PetalCanvas } from './components/Background/PetalCanvas';
import { audioEngine } from './services/audioEngine';
import { WelcomeSurprise } from './components/Celebration/WelcomeSurprise';
import { CakeCelebration } from './components/Celebration/CakeCelebration';
import { ChocolateSurprises } from './components/Celebration/ChocolateSurprises';
import { GiftsCollection } from './components/Celebration/GiftsCollection';
import { SketchesGallery } from './components/Celebration/SketchesGallery';
import { PersonalLetter } from './components/Celebration/PersonalLetter';
import { GrandFinale } from './components/Celebration/GrandFinale';

export const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<CelebrationStage>('welcome');

  const isNightStage = currentStage === 'finale';

  // Automatically attempt background music playback as soon as the site launches
  useEffect(() => {
    audioEngine.start();
  }, []);

  const handleStartCelebration = () => {
    // Ensures audio is active on the first user interaction
    audioEngine.start();
    setCurrentStage('cake');
  };

  const handleRestart = () => {
    setCurrentStage('welcome');
  };

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden flex flex-col justify-between transition-colors duration-1000 ${
        isNightStage
          ? 'bg-gradient-to-b from-[#121324] via-[#1A1B30] to-[#252641]'
          : 'bg-[#FFF9F0] paper-texture'
      }`}
    >
      {/* Background Petals, Fluttering Butterflies, Fairy Lights & Soft Rainbow */}
      <PetalCanvas 
        isNightMode={isNightStage} 
        showRainbow={currentStage !== 'finale'} 
      />

      {/* Floating Header - Clean title with no music or toggle buttons */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-8 py-3.5 pointer-events-none">
        {/* Title */}
        <div className="pointer-events-auto flex items-center gap-2">
          <Sparkles className={`w-4 h-4 ${isNightStage ? 'text-lavender' : 'text-[#BA2D44]'}`} />
          <span
            className={`font-serif italic text-sm sm:text-base tracking-wide transition-colors duration-700 ${
              isNightStage ? 'text-ivory/85' : 'text-midnight/85'
            }`}
          >
            A Little Universe Called Bangaram
          </span>
        </div>
      </header>

      {/* Main Interactive Stage Viewport (Natural Flow Progression) */}
      <main className="relative z-20 flex-1 w-full h-full flex items-center justify-center pt-12 pb-4">
        <AnimatePresence mode="wait">
          {currentStage === 'welcome' && (
            <motion.div
              key="stage-welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7 }}
              className="w-full h-full flex items-center justify-center"
            >
              <WelcomeSurprise onStartCelebration={handleStartCelebration} />
            </motion.div>
          )}

          {currentStage === 'cake' && (
            <motion.div
              key="stage-cake"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7 }}
              className="w-full h-full flex items-center justify-center"
            >
              <CakeCelebration onContinueToChocolates={() => setCurrentStage('chocolates')} />
            </motion.div>
          )}

          {currentStage === 'chocolates' && (
            <motion.div
              key="stage-chocolates"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7 }}
              className="w-full h-full flex items-center justify-center"
            >
              <ChocolateSurprises onContinueToGifts={() => setCurrentStage('gifts')} />
            </motion.div>
          )}

          {currentStage === 'gifts' && (
            <motion.div
              key="stage-gifts"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7 }}
              className="w-full h-full flex items-center justify-center"
            >
              <GiftsCollection
                onContinueToSketches={() => setCurrentStage('sketches')}
                onContinueToLetter={() => setCurrentStage('letter')}
              />
            </motion.div>
          )}

          {currentStage === 'sketches' && (
            <motion.div
              key="stage-sketches"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7 }}
              className="w-full h-full flex items-center justify-center"
            >
              <SketchesGallery
                onContinueToLetter={() => setCurrentStage('letter')}
                onBackToGifts={() => setCurrentStage('gifts')}
              />
            </motion.div>
          )}

          {currentStage === 'letter' && (
            <motion.div
              key="stage-letter"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7 }}
              className="w-full h-full flex items-center justify-center"
            >
              <PersonalLetter onContinueToFinale={() => setCurrentStage('finale')} />
            </motion.div>
          )}

          {currentStage === 'finale' && (
            <motion.div
              key="stage-finale"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.9 }}
              className="w-full h-full flex items-center justify-center"
            >
              <GrandFinale
                onRestart={handleRestart}
                onNavigateStage={(stage) => setCurrentStage(stage)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
