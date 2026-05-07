import { useEffect, useState } from 'react';

export default function FallingPetals() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    let id = 0;

    const interval = setInterval(() => {
      setPetals((prev) => [
        ...prev,
        {
          id: id++,
          x: Math.random() * 100,
        },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {petals.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}