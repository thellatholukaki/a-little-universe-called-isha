import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flower2, Gift, Star, Trophy, Moon, Heart, Compass, Book, Smile, Music, Globe, Sun } from 'lucide-react';
import { CelebrationGift } from '../../types';

interface GiftIllustrationProps {
  gift: CelebrationGift;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export const GiftIllustration: React.FC<GiftIllustrationProps> = ({
  gift,
  size = 'lg',
  interactive = true
}) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Size configurations
  const dimensions = {
    sm: 'w-10 h-10',
    md: 'w-24 h-24',
    lg: 'w-48 h-48 sm:w-56 sm:h-56'
  }[size];

  const glowSizes = {
    sm: 'w-14 h-14',
    md: 'w-32 h-32',
    lg: 'w-64 h-64 sm:w-72 sm:h-72'
  }[size];

  // Specific thematic floating sparkles count
  const sparkles = size === 'lg' ? [
    { top: '10%', left: '15%', delay: 0, scale: 1 },
    { top: '15%', right: '15%', delay: 0.6, scale: 1.2 },
    { bottom: '20%', left: '10%', delay: 1.2, scale: 0.9 },
    { bottom: '15%', right: '12%', delay: 1.8, scale: 1.1 },
    { top: '48%', left: '5%', delay: 0.9, scale: 0.8 },
    { top: '45%', right: '6%', delay: 1.5, scale: 0.85 },
  ] : [];

  const getFallbackIcon = () => {
    const iconClass = size === 'sm' ? 'w-5 h-5' : size === 'md' ? 'w-12 h-12' : 'w-20 h-20';
    switch (gift.iconName) {
      case 'flower': return <Flower2 className={`${iconClass} text-[#BA2D44]`} />;
      case 'gift': return <Gift className={`${iconClass} text-[#E5A93C]`} />;
      case 'star': return <Star className={`${iconClass} text-[#FFD166]`} />;
      case 'trophy': return <Trophy className={`${iconClass} text-[#C59B27]`} />;
      case 'moon': return <Moon className={`${iconClass} text-[#C5D3E8]`} />;
      case 'heart': return <Heart className={`${iconClass} text-[#E05A47]`} />;
      case 'compass': return <Compass className={`${iconClass} text-[#D6A77A]`} />;
      case 'book': return <Book className={`${iconClass} text-[#8C3A44]`} />;
      case 'music': return <Music className={`${iconClass} text-[#A584BD]`} />;
      case 'globe': return <Globe className={`${iconClass} text-[#4DD0E1]`} />;
      case 'sun': return <Sun className={`${iconClass} text-[#FFA000]`} />;
      default: return <Sparkles className={`${iconClass} text-[#E5A93C]`} />;
    }
  };

  return (
    <div 
      className={`relative flex items-center justify-center select-none ${dimensions}`}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
    >
      {/* Ambient Pulsing Glow Halo */}
      {size !== 'sm' && (
        <motion.div
          animate={{
            scale: isHovered ? [1.1, 1.2, 1.1] : [1, 1.08, 1],
            opacity: isHovered ? [0.6, 0.85, 0.6] : [0.35, 0.55, 0.35],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute rounded-full pointer-events-none filter blur-xl ${glowSizes} ${
            gift.isSpecialFinal
              ? 'bg-gradient-to-tr from-[#FFD166] via-[#E91E63] to-[#FF4081]'
              : 'bg-gradient-to-tr from-[#FFDF80]/50 via-dustyRose/40 to-champagne/60'
          }`}
        />
      )}

      {/* Floating Sparkle Stars around Large View */}
      {size === 'lg' && sparkles.map((sp, idx) => (
        <motion.div
          key={idx}
          style={{ top: sp.top, left: sp.left, right: sp.right, bottom: sp.bottom }}
          animate={{
            scale: [0.7 * sp.scale, 1.3 * sp.scale, 0.7 * sp.scale],
            opacity: [0.3, 1, 0.3],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            delay: sp.delay,
            ease: 'easeInOut',
          }}
          className="absolute z-20 pointer-events-none"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFD166] drop-shadow-[0_0_6px_rgba(255,209,102,0.9)]" />
        </motion.div>
      ))}

      {/* 3D Floating Illustrated Gift Image Container */}
      <motion.div
        animate={
          size === 'lg'
            ? {
                y: isHovered ? [-2, -8, -2] : [-4, 4, -4],
                rotate: isHovered ? [0, 2, -2, 0] : [-1, 1, -1],
              }
            : size === 'md'
            ? { y: [-2, 2, -2] }
            : {}
        }
        transition={{
          duration: isHovered ? 2 : 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={interactive ? { scale: 1.06, filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.18))' } : undefined}
        whileTap={interactive ? { scale: 0.96 } : undefined}
        className="relative z-10 w-full h-full flex items-center justify-center cursor-pointer"
      >
        {!imageError && gift.imagePath ? (
          <img
            src={gift.imagePath}
            alt={gift.giftName}
            onError={() => setImageError(true)}
            className={`w-full h-full object-contain filter ${
              size === 'lg'
                ? 'drop-shadow-[0_8px_20px_rgba(40,20,10,0.22)]'
                : 'drop-shadow-[0_2px_6px_rgba(0,0,0,0.18)]'
            } transition-all duration-300`}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-champagne-light to-[#FFF5E6] border border-dustyRose/30 flex items-center justify-center shadow-inner">
            {getFallbackIcon()}
          </div>
        )}

        {/* Shimmer Light Reflection Sweep across image */}
        {size === 'lg' && (
          <motion.div
            animate={{
              x: ['-120%', '200%'],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] pointer-events-none"
          />
        )}
      </motion.div>

      {/* Glass Pedestal Shadow / Reflection Base */}
      {size === 'lg' && (
        <motion.div
          animate={{
            scaleX: isHovered ? 1.15 : [0.95, 1.05, 0.95],
            opacity: isHovered ? 0.35 : [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-3 w-3/4 h-3 rounded-full bg-gradient-to-r from-transparent via-midnight/25 to-transparent blur-[3px] pointer-events-none"
        />
      )}
    </div>
  );
};
