import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const bracelets = [
  {
    id: 1,
    name: 'Edition Rutênio',
    desc: 'Aço 316L com banho de rutênio escuro. Estilo discreto e contemporâneo.',
    color: '#8B8B8B',
    imgPlaceholder: '⌚',
  },
  {
    id: 2,
    name: 'Edition Bleu Nuit',
    desc: 'Aço 316L com esmalte Grand Feu azul profundo. Elegância noturna.',
    color: '#1a3a52',
    imgPlaceholder: '⌚',
  },
  {
    id: 3,
    name: 'Edition Or Rose',
    desc: 'Aço 316L com banho de ouro rose. Refinamento clássico Belle Époque.',
    color: '#B76E79',
    imgPlaceholder: '⌚',
  },
];

export default function BraceletGallery() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % bracelets.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoplay]);

  const navigate = (direction) => {
    setAutoplay(false);
    setActive((prev) => (prev + direction + bracelets.length) % bracelets.length);
  };

  const bracelet = bracelets[active];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Main Carousel */}
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'relative',
            aspectRatio: '4 / 3',
            overflow: 'hidden',
            borderRadius: '2px',
            border: '1px solid rgba(196, 162, 78, 0.1)',
            background: bracelet.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '5rem',
            color: 'rgba(255, 255, 255, 0.2)',
            animation: 'fadeInScale 600ms ease-out',
          }}
        >
          {bracelet.imgPlaceholder}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(196, 162, 78, 0.15)',
            border: '1px solid rgba(196, 162, 78, 0.3)',
            color: 'var(--color-gold)',
            width: '40px',
            height: '40px',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 300ms ease',
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(196, 162, 78, 0.25)';
            e.target.style.boxShadow = '0 0 16px rgba(196, 162, 78, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(196, 162, 78, 0.15)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => navigate(1)}
          style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(196, 162, 78, 0.15)',
            border: '1px solid rgba(196, 162, 78, 0.3)',
            color: 'var(--color-gold)',
            width: '40px',
            height: '40px',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 300ms ease',
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(196, 162, 78, 0.25)';
            e.target.style.boxShadow = '0 0 16px rgba(196, 162, 78, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(196, 162, 78, 0.15)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Info Card */}
      <div
        style={{
          padding: '1.5rem',
          borderRadius: '2px',
          border: '1px solid rgba(196, 162, 78, 0.15)',
          background: 'rgba(10, 10, 16, 0.5)',
        }}
      >
        <h3
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '1.3rem',
            color: 'var(--color-gold)',
            marginBottom: '0.5rem',
            letterSpacing: '0.1em',
          }}
        >
          {bracelet.name}
        </h3>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1rem',
            color: 'rgba(212, 196, 160, 0.8)',
            lineHeight: '1.6',
            margin: 0,
            fontStyle: 'italic',
          }}
        >
          {bracelet.desc}
        </p>
      </div>

      {/* Indicator Dots */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'center',
        }}
      >
        {bracelets.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActive(idx);
              setAutoplay(false);
            }}
            style={{
              width: idx === active ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background:
                idx === active
                  ? 'var(--color-gold)'
                  : 'rgba(196, 162, 78, 0.3)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 300ms ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
