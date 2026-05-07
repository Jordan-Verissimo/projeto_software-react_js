import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Petal {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
  opacity: number;
  drift: number;
}

/** Animated falling petals overlay — subtle, cinematic */
export function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    let id = 0;
    const spawn = () => {
      const p: Petal = {
        id: id++,
        x: Math.random() * 100,
        size: 6 + Math.random() * 10,
        delay: 0,
        duration: 8 + Math.random() * 10,
        rotation: Math.random() * 360,
        opacity: 0.15 + Math.random() * 0.25,
        drift: -30 + Math.random() * 60,
      };
      setPetals((prev) => [...prev.slice(-18), p]);
    };

    // initial burst
    for (let i = 0; i < 6; i++) setTimeout(spawn, i * 600);

    const interval = setInterval(spawn, 1800 + Math.random() * 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      <AnimatePresence>
        {petals.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: -20, x: `${p.x}vw`, opacity: 0, rotate: p.rotation, scale: 0.6 }}
            animate={{
              y: '50vh',
              x: `${p.x + p.drift / 2}vw`,
              opacity: [0, p.opacity, p.opacity * 0.6, 0],
              rotate: p.rotation + 180 + Math.random() * 120,
              scale: [0.6, 1, 0.8],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: p.duration, ease: 'linear' }}
            className="absolute top-0"
            style={{ width: p.size, height: p.size }}
          >
            {/* Petal SVG shape */}
            <svg viewBox="0 0 20 20" className="w-full h-full">
              <ellipse
                cx="10"
                cy="10"
                rx="8"
                ry="5"
                fill="rgba(210,170,180,0.7)"
                transform="rotate(20 10 10)"
              />
              <ellipse
                cx="10"
                cy="10"
                rx="6"
                ry="3.5"
                fill="rgba(240,200,210,0.5)"
                transform="rotate(20 10 10)"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
