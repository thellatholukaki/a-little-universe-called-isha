import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { SceneId } from './types';
import { PetalCanvas } from './components/Background/PetalCanvas';
import { AudioPlayer } from './components/AudioPlayer/AudioPlayer';
import { NavigationControls } from './components/Navigation/NavigationControls';
import { Scene1Envelope } from './components/Scenes/Scene1Envelope';
import { Scene2BirthdayReveal } from './components/Scenes/Scene2BirthdayReveal';
import { Scene3PencilSketch } from './components/Scenes/Scene3PencilSketch';
import { Scene4HeartfeltLetter } from './components/Scenes/Scene4HeartfeltLetter';
import { Scene5TwentyThreeWishes } from './components/Scenes/Scene5TwentyThreeWishes';
import { Scene6StarryNight } from './components/Scenes/Scene6StarryNight';
import { audioEngine } from './services/audioEngine';

export const App: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<SceneId>(1);
  const [hasStartedAudio, setHasStartedAudio] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const isNightScene = currentScene === 6;

  // Handle mobile swipe left/right
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // Minimum swipe threshold 50px
    if (diff > 50 && currentScene < 6) {
      // Swiped left -> next page
      setCurrentScene((prev) => (prev + 1) as SceneId);
    } else if (diff < -50 && currentScene > 1) {
      // Swiped right -> prev page
      setCurrentScene((prev) => (prev - 1) as SceneId);
    }
    setTouchStartX(null);
  };

  const handleEnvelopeOpen = () => {
    setHasStartedAudio(true);
    setCurrentScene(2);
  };

  const handleRestart = () => {
    setCurrentScene(1);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative w-screen h-screen overflow-hidden flex flex-col justify-between transition-colors duration-1000 ${
        isNightScene
          ? 'bg-gradient-to-b from-[#121324] via-[#1A1B30] to-[#252641]'
          : 'bg-[#FFF9F0] paper-texture'
      }`}
    >
      {/* Background Petals, Dust & Celestial Star Canvas */}
      <PetalCanvas isNightMode={isNightScene} />

      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-8 py-4 pointer-events-none">
        {/* Title */}
        <div className="pointer-events-auto flex items-center gap-2">
          <Sparkles className={`w-3.5 h-3.5 ${isNightScene ? 'text-lavender' : 'text-dustyRose-dark'}`} />
          <span
            className={`font-serif italic text-sm sm:text-base tracking-wide transition-colors duration-700 ${
              isNightScene ? 'text-ivory/80' : 'text-midnight/80'
            }`}
          >
            A Little Universe Called Isha
          </span>
        </div>

        {/* Audio Player Widget */}
        <div className="pointer-events-auto">
          <AudioPlayer hasStartedAudio={hasStartedAudio} />
        </div>
      </header>

      {/* Main Full-Screen Storybook Viewport */}
      <main className="relative z-20 flex-1 w-full h-full flex items-center justify-center pt-14 pb-20">
        <AnimatePresence mode="wait">
          {currentScene === 1 && (
            <motion.div
              key="scene-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full flex items-center justify-center"
            >
              <Scene1Envelope onOpen={handleEnvelopeOpen} />
            </motion.div>
          )}

          {currentScene === 2 && (
            <motion.div
              key="scene-2"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full flex items-center justify-center"
            >
              <Scene2BirthdayReveal onNext={() => setCurrentScene(3)} />
            </motion.div>
          )}

          {currentScene === 3 && (
            <motion.div
              key="scene-3"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full flex items-center justify-center"
            >
              <Scene3PencilSketch onNext={() => setCurrentScene(4)} />
            </motion.div>
          )}

          {currentScene === 4 && (
            <motion.div
              key="scene-4"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full flex items-center justify-center"
            >
              <Scene4HeartfeltLetter onNext={() => setCurrentScene(5)} />
            </motion.div>
          )}

          {currentScene === 5 && (
            <motion.div
              key="scene-5"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full flex items-center justify-center"
            >
              <Scene5TwentyThreeWishes onNext={() => setCurrentScene(6)} />
            </motion.div>
          )}

          {currentScene === 6 && (
            <motion.div
              key="scene-6"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.2 }}
              className="w-full h-full flex items-center justify-center"
            >
              <Scene6StarryNight onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Minimal Bottom Storybook Navigation Controls */}
      <NavigationControls
        currentScene={currentScene}
        totalScenes={6}
        onSceneChange={(scene) => setCurrentScene(scene)}
        onRestart={handleRestart}
      />
    </div>
  );
};

export default App;
