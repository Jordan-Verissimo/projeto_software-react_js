import { useEffect, useState } from 'react';
import '../styles/petals.css';

export default function FallingPetals() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    let id = 0;

    const spawnPetal = () => {
      const petal = {
        id: id++,
        x: Math.random() * 100,
        size: 6 + Math.random() * 10,
        duration: 8 + Math.random() * 10,
        rotation: Math.random() * 360,
        opacity: 0.15 + Math.random() * 0.25,
        drift: -30 + Math.random() * 60,
      };

      setPetals((prev) => [...prev.slice(-18), petal]);
    };

    for (let i = 0; i < 6; i++) {
      setTimeout(spawnPetal, i * 600);
    }

    const interval = setInterval(spawnPetal, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="falling-petals">
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: `${p.x}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            '--duration': `${p.duration}s`,
            '--drift': `${p.drift / 2}vw`,
            '--rotation': `${p.rotation}deg`,
          }}
        >
          ✦
        </div>
      ))}
    </div>
  );
}