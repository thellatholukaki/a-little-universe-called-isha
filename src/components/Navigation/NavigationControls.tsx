import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { SceneId, SceneMeta } from '../../types';

interface NavigationControlsProps {
  currentScene: SceneId;
  totalScenes: number;
  onSceneChange: (scene: SceneId) => void;
  onRestart: () => void;
}

export const SCENES_META: SceneMeta[] = [
  { id: 1, name: 'The Envelope', tagline: 'A little something for you' },
  { id: 2, name: 'The Reveal', tagline: 'Happy 23rd Birthday' },
  { id: 3, name: 'A Little Sketch', tagline: 'An impression in graphite' },
  { id: 4, name: 'A Few Words', tagline: 'A letter from the heart' },
  { id: 5, name: '23 Wishes', tagline: 'Starlight wishes for you' },
  { id: 6, name: 'One Last Thought', tagline: 'Under the quiet stars' },
];

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentScene,
  totalScenes,
  onSceneChange,
  onRestart,
}) => {
  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't navigate with arrow keys if Scene 1 envelope hasn't been opened yet unless user wants to
      if (e.key === 'ArrowRight' && currentScene < totalScenes) {
        onSceneChange((currentScene + 1) as SceneId);
      } else if (e.key === 'ArrowLeft' && currentScene > 1) {
        onSceneChange((currentScene - 1) as SceneId);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScene, totalScenes, onSceneChange]);

  const canGoBack = currentScene > 1;
  const canGoForward = currentScene < totalScenes;

  return (
    <nav aria-label="Scene navigation" className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-40 flex items-center justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2 sm:gap-4 px-4 py-2.5 rounded-full vintage-card border border-dustyRose/25 shadow-lg backdrop-blur-md">
        {/* Restart / Home Button */}
        <button
          onClick={onRestart}
          className="p-1.5 text-midnight/60 hover:text-midnight hover:bg-champagne/40 rounded-full transition-all focus:outline-none"
          title="Restart from beginning"
          aria-label="Restart from beginning"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <div className="h-4 w-px bg-dustyRose/20 mx-0.5" />

        {/* Previous Scene Button */}
        <button
          onClick={() => canGoBack && onSceneChange((currentScene - 1) as SceneId)}
          disabled={!canGoBack}
          className={`p-1.5 rounded-full transition-all focus:outline-none ${
            canGoBack
              ? 'text-midnight hover:text-dustyRose-dark hover:bg-champagne/40 cursor-pointer'
              : 'text-midnight/20 cursor-not-allowed'
          }`}
          title="Previous page"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scene Dots */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {SCENES_META.map((meta) => {
            const isActive = meta.id === currentScene;
            return (
              <button
                key={meta.id}
                onClick={() => onSceneChange(meta.id)}
                className="relative group p-1 focus:outline-none"
                title={`${meta.id}. ${meta.name} — ${meta.tagline}`}
                aria-label={`Go to scene ${meta.id}: ${meta.name}`}
              >
                <div
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? 'w-6 sm:w-7 h-2 bg-gradient-to-r from-dustyRose to-lavender-dark shadow-sm'
                      : 'w-2 h-2 bg-midnight/25 hover:bg-midnight/45'
                  }`}
                />
                {/* Tooltip on hover */}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[11px] font-sans font-medium tracking-wide whitespace-nowrap bg-midnight text-ivory rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
                  {meta.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Next Scene Button */}
        <button
          onClick={() => canGoForward && onSceneChange((currentScene + 1) as SceneId)}
          disabled={!canGoForward}
          className={`p-1.5 rounded-full transition-all focus:outline-none ${
            canGoForward
              ? 'text-midnight hover:text-dustyRose-dark hover:bg-champagne/40 cursor-pointer'
              : 'text-midnight/20 cursor-not-allowed'
          }`}
          title="Next page"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-dustyRose/20 mx-0.5" />

        {/* Page numbering */}
        <span className="font-serif italic text-xs text-midnight/70 font-medium pl-0.5 pr-1 select-none">
          {currentScene} / {totalScenes}
        </span>
      </div>
    </nav>
  );
};
