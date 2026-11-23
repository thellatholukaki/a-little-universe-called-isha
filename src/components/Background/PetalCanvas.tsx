import React, { useEffect, useRef } from 'react';

interface PetalCanvasProps {
  isNightMode?: boolean;
  showRainbow?: boolean;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  angle: number;
  spin: number;
  opacity: number;
  color: string;
  petalStyle: number;
}

interface Butterfly {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  wingAngle: number;
  wingSpeed: number;
  color: string;
}

interface StarMote {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speedY: number;
  maxAlpha: number;
}

export const PetalCanvas: React.FC<PetalCanvasProps> = ({ 
  isNightMode = false,
  showRainbow = true
}) => {
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

    // Realistic rose petal colors (velvet red, dusty rose, blush pink, peach)
    const petalColors = isNightMode 
      ? ['rgba(217, 166, 160, 0.45)', 'rgba(201, 192, 232, 0.4)', 'rgba(255, 249, 240, 0.5)']
      : [
          'rgba(217, 72, 95, 0.55)',   // Deep rose red
          'rgba(224, 112, 133, 0.5)',  // Soft romantic pink
          'rgba(240, 168, 180, 0.5)',  // Blush rose
          'rgba(245, 198, 185, 0.45)', // Warm peach petal
          'rgba(186, 45, 68, 0.45)'    // Velvet burgundy accent
        ];

    // Butterfly palettes
    const butterflyPalettes = [
      'rgba(240, 140, 160, 0.75)', // Rose pink
      'rgba(195, 160, 230, 0.75)', // Lavender
      'rgba(255, 205, 130, 0.75)', // Warm peach/gold
      'rgba(160, 215, 210, 0.75)'  // Mint pastel
    ];

    // Initialize Rose Petals
    const petalCount = isNightMode ? 30 : 38;
    const petals: Petal[] = [];
    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 9 + Math.random() * 8,
        speedX: (Math.random() - 0.4) * 0.8,
        speedY: 0.8 + Math.random() * 1.1,
        angle: Math.random() * 360,
        spin: (Math.random() - 0.5) * 1.8,
        opacity: 0.5 + Math.random() * 0.45,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        petalStyle: Math.floor(Math.random() * 3)
      });
    }

    // Initialize 3-4 Colorful Fluttering Butterflies
    const butterflies: Butterfly[] = [];
    const butterflyCount = isNightMode ? 2 : 4;
    for (let i = 0; i < butterflyCount; i++) {
      butterflies.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.7,
        size: 8 + Math.random() * 4,
        speedX: 0.5 + Math.random() * 0.5,
        speedY: (Math.random() - 0.5) * 0.4,
        wingAngle: Math.random() * Math.PI,
        wingSpeed: 0.14 + Math.random() * 0.06,
        color: butterflyPalettes[i % butterflyPalettes.length]
      });
    }

    // Initialize Soft Glowing Fairy Light Motes
    const motes: StarMote[] = [];
    const moteCount = isNightMode ? 60 : 25;
    for (let i = 0; i < moteCount; i++) {
      motes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        alpha: Math.random(),
        speedY: (Math.random() - 0.5) * 0.2,
        maxAlpha: 0.3 + Math.random() * 0.6
      });
    }

    // Draw Dreamy Rainbow Arc
    const drawSoftRainbow = () => {
      if (!showRainbow || isNightMode) return;

      ctx.save();
      const centerX = width * 0.5;
      const centerY = height * 1.15;
      const radius = Math.max(width, height) * 0.75;

      const rainbowColors = [
        'rgba(240, 110, 110, 0.05)',  // Red
        'rgba(245, 175, 100, 0.055)', // Orange
        'rgba(250, 230, 120, 0.06)',  // Yellow
        'rgba(160, 230, 160, 0.055)', // Green
        'rgba(140, 200, 245, 0.05)',  // Blue
        'rgba(190, 160, 235, 0.055)', // Indigo
        'rgba(220, 160, 230, 0.045)'  // Violet
      ];

      rainbowColors.forEach((color, idx) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + idx * 12, Math.PI * 1.05, Math.PI * 1.95);
        ctx.strokeStyle = color;
        ctx.lineWidth = 14;
        ctx.stroke();
      });

      ctx.restore();
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle background rainbow
      drawSoftRainbow();

      // 2. Draw glowing fairy light motes
      motes.forEach((m) => {
        m.alpha += 0.015;
        const currentOpacity = (Math.sin(m.alpha) + 1) * 0.5 * m.maxAlpha;

        ctx.fillStyle = isNightMode 
          ? `rgba(255, 249, 240, ${currentOpacity})`
          : `rgba(217, 166, 160, ${currentOpacity * 0.8})`;

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fill();

        m.y += m.speedY;
        if (m.y < -10) m.y = height + 10;
        if (m.y > height + 10) m.y = -10;
      });

      // 3. Draw falling and swaying rose petals
      petals.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.fillStyle = p.color;

        ctx.beginPath();
        // Delicate curved rose petal shape
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(p.size, -p.size * 0.7, p.size * 1.5, p.size * 0.8, 0, p.size * 2);
        ctx.bezierCurveTo(-p.size * 1.5, p.size * 0.8, -p.size, -p.size * 0.7, 0, 0);
        ctx.fill();

        // Natural petal drift & 3D sway
        p.x += p.speedX + Math.sin(p.angle * 0.04) * 0.5;
        p.y += p.speedY;
        p.angle += p.spin;

        if (p.y > height + 25) {
          p.y = -25;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        ctx.restore();
      });

      // 4. Draw fluttering colourful butterflies
      butterflies.forEach((b) => {
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.fillStyle = b.color;

        b.wingAngle += b.wingSpeed;
        const wingScale = Math.sin(b.wingAngle);

        // Left Wing
        ctx.save();
        ctx.scale(Math.abs(wingScale) * 0.8 + 0.2, 1);
        ctx.beginPath();
        ctx.ellipse(-b.size * 0.6, 0, b.size * 0.8, b.size * 0.5, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Right Wing
        ctx.save();
        ctx.scale(Math.abs(wingScale) * 0.8 + 0.2, 1);
        ctx.beginPath();
        ctx.ellipse(b.size * 0.6, 0, b.size * 0.8, b.size * 0.5, 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Butterfly Body
        ctx.fillStyle = isNightMode ? 'rgba(255, 249, 240, 0.7)' : 'rgba(55, 35, 45, 0.4)';
        ctx.beginPath();
        ctx.ellipse(0, 0, b.size * 0.12, b.size * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Wave path
        b.x += b.speedX;
        b.y += Math.sin(b.x * 0.015) * 0.8 + b.speedY;

        if (b.x > width + 40) {
          b.x = -40;
          b.y = Math.random() * height * 0.7;
        }
        if (b.y < -30) b.y = height + 30;
        if (b.y > height + 30) b.y = -30;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isNightMode, showRainbow]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      style={{ opacity: 0.92 }}
    />
  );
};
