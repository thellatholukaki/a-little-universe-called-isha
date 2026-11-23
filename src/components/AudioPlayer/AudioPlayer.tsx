import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

interface AudioPlayerProps {
  hasStartedAudio: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ hasStartedAudio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    setIsPlaying(audioEngine.getIsPlaying());
    setIsMuted(audioEngine.getIsMuted());
    setVolume(audioEngine.getVolume());
  }, [hasStartedAudio]);

  const handleTogglePlay = () => {
    const nextPlaying = audioEngine.togglePlay();
    setIsPlaying(nextPlaying);
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = audioEngine.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    audioEngine.setVolume(newVol);
    if (newVol > 0 && isMuted) {
      audioEngine.toggleMute();
      setIsMuted(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
      <div 
        className="relative group flex items-center gap-2.5 px-3.5 py-2 rounded-full vintage-card border border-dustyRose/30 shadow-md backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:border-dustyRose/60"
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        {/* Play/Pause Button with Equalizer */}
        <button
          onClick={handleTogglePlay}
          className="flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-medium text-midnight/80 hover:text-midnight transition-colors focus:outline-none"
          title={isPlaying ? "Pause ambient music" : "Play ambient music"}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          <Music className="w-3.5 h-3.5 text-dustyRose-dark" />
          
          {/* Animated Equalizer Bars */}
          <div className="flex items-end gap-0.5 h-3 w-4 px-0.5">
            <span
              className={`w-0.5 bg-dustyRose rounded-full transition-all duration-300 ${
                isPlaying && !isMuted ? 'animate-[bounce_0.8s_ease-in-out_infinite] h-3' : 'h-1'
              }`}
            />
            <span
              className={`w-0.5 bg-dustyRose rounded-full transition-all duration-300 delay-150 ${
                isPlaying && !isMuted ? 'animate-[bounce_1.1s_ease-in-out_infinite] h-2.5' : 'h-1'
              }`}
            />
            <span
              className={`w-0.5 bg-dustyRose rounded-full transition-all duration-300 delay-300 ${
                isPlaying && !isMuted ? 'animate-[bounce_0.7s_ease-in-out_infinite] h-3.5' : 'h-1'
              }`}
            />
          </div>

          <span className="hidden sm:inline-block font-serif italic text-sm text-midnight/90">
            {isPlaying ? "Romantic Love Theme" : "Music Paused"}
          </span>
        </button>

        {/* Mute Toggle */}
        <button
          onClick={handleToggleMute}
          className="p-1 text-midnight/70 hover:text-midnight transition-colors rounded-full focus:outline-none"
          title={isMuted ? "Unmute" : "Mute"}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-dustyRose" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-sage-dark" />
          )}
        </button>

        {/* Expandable Volume Slider on desktop or tap */}
        {showVolumeSlider && (
          <div className="flex items-center pl-1.5 pr-0.5 py-0.5 animate-fadeIn">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-champagne-dark/50 rounded-lg appearance-none cursor-pointer accent-dustyRose"
              title="Music volume"
              aria-label="Volume slider"
            />
          </div>
        )}
      </div>
    </div>
  );
};
