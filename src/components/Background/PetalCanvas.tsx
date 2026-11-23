import React, { useEffect, useRef } from 'react';

interface PetalCanvasProps {
  isNightMode?: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  angle: number;
  spin: number;
  opacity: number;
  type: 'petal' | 'star' | 'dust';
  color: string;
}

export const PetalCanvas: React.FC<PetalCanvasProps> = ({ isNightMode = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Color palettes
    const dayColors = {
      petals: ['rgba(217, 166, 160, 0.45)', 'rgba(233, 220, 203, 0.5)', 'rgba(169, 183, 160, 0.35)', 'rgba(201, 192, 232, 0.35)'],
      stars: ['rgba(217, 166, 160, 0.6)', 'rgba(197, 155, 39, 0.5)'],
      dust: 'rgba(197, 155, 39, 0.25)'
    };

    const nightColors = {
      petals: ['rgba(201, 192, 232, 0.4)', 'rgba(217, 166, 160, 0.35)', 'rgba(255, 249, 240, 0.45)'],
      stars: ['rgba(255, 249, 240, 0.95)', 'rgba(201, 192, 232, 0.85)', 'rgba(230, 200, 117, 0.85)'],
      dust: 'rgba(201, 192, 232, 0.3)'
    };

    const colors = isNightMode ? nightColors : dayColors;
    const particleCount = isNightMode ? 75 : 45;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const typeRand = Math.random();
      const type: 'petal' | 'star' | 'dust' = isNightMode
        ? typeRand < 0.65 ? 'star' : typeRand < 0.85 ? 'dust' : 'petal'
        : typeRand < 0.6 ? 'petal' : typeRand < 0.85 ? 'star' : 'dust';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === 'petal' ? Math.random() * 8 + 6 : type === 'star' ? Math.random() * 2.5 + 1.2 : Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * (type === 'petal' ? 0.6 : 0.2),
        speedY: type === 'petal' ? Math.random() * 0.8 + 0.3 : (Math.random() - 0.5) * 0.15,
        angle: Math.random() * 360,
        spin: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.6 + 0.2,
        type,
        color: type === 'petal'
          ? colors.petals[Math.floor(Math.random() * colors.petals.length)]
          : type === 'star'
          ? colors.stars[Math.floor(Math.random() * colors.stars.length)]
          : colors.dust
      });
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        ctx.save();

        if (p.type === 'petal') {
          // Drifting petal
          ctx.translate(p.x, p.y);
          ctx.rotate((p.angle * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          // Draw organic petal teardrop/curved shape
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(p.size, -p.size * 0.8, p.size * 1.6, p.size * 0.8, 0, p.size * 2);
          ctx.bezierCurveTo(-p.size * 1.6, p.size * 0.8, -p.size, -p.size * 0.8, 0, 0);
          ctx.fill();

          p.x += p.speedX + Math.sin(p.angle * 0.05) * 0.3;
          p.y += p.speedY;
          p.angle += p.spin;

          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
        } else if (p.type === 'star') {
          // Twinkling celestial star
          p.angle += 0.04;
          const currentOpacity = Math.abs(Math.sin(p.angle)) * 0.6 + 0.2;
          ctx.fillStyle = p.color.replace(/[\d.]+\)$/g, `${currentOpacity})`);

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // 4-point cross shimmer on larger stars
          if (p.size > 2.2) {
            ctx.strokeStyle = ctx.fillStyle;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x - p.size * 2, p.y);
            ctx.lineTo(p.x + p.size * 2, p.y);
            ctx.moveTo(p.x, p.y - p.size * 2);
            ctx.lineTo(p.x, p.y + p.size * 2);
            ctx.stroke();
          }

          p.x += p.speedX;
          p.y += p.speedY;
        } else {
          // Soft glowing dust mote
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          p.x += p.speedX;
          p.y += p.speedY;
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isNightMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      style={{ opacity: 0.85 }}
    />
  );
};
