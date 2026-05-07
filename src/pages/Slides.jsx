import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import '../styles/slides.css';

const SLIDES = [
  {
    id: 1,
    title: 'Hidden Bloom',
    subtitle: 'Wearable Neuro-Perfumery',
    description: 'High-End Neuro-Jewelry · Art Nouveau · Belle Époque',
    content:
      'O ecossistema de bem-estar tátil e olfativo que transforma dados biométricos em rituais de luxo.',
    cta: 'Descubra Mais',
  },
  {
    id: 2,
    title: 'Produto & Benefícios',
    subtitle: 'Tecnologia Premium',
    description: 'Harmonize suas emoções com fragrâncias personalizadas',
    content:
      'Hidden Bloom combina sensores biométricos avançados com o design Art Nouveau para criar uma experiência sensorial única.',
    cta: 'Saiba Mais',
    highlights: ['Monitoramento em Tempo Real', 'Fragrâncias Personalizadas', 'Design Modular'],
  },
  {
    id: 3,
    title: 'Junte-se ao Movimento',
    subtitle: 'A Revolução do Bem-Estar',
    description: 'Seja parte da comunidade Hidden Bloom',
    content: 'Transforme seus rituais olfativos em momentos de verdadeiro bem-estar neurológico.',
    cta: 'Começar Agora',
  },
];

export default function Slides() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + SLIDES.length) % SLIDES.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const slide = SLIDES[currentSlide];

  const downloadPDF = () => {
    alert('PDF Export - em desenvolvimento');
  };

  const downloadPPTX = () => {
    alert('PPTX Export - em desenvolvimento');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#060608',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Slide Container */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 2rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Slide Content */}
        <div
          style={{
            maxWidth: '900px',
            width: '100%',
            textAlign: 'center',
            animation: 'fadeIn 500ms ease',
          }}
          key={currentSlide}
        >
          <div
            style={{
              background:
                'radial-gradient(circle at 20% 0%, rgba(196, 162, 78, 0.1) 0%, transparent 50%)',
              padding: '3rem 2rem',
              borderRadius: '8px',
            }}
          >
            <h2
              style={{
                fontSize: '0.9rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(196, 162, 78, 0.7)',
                marginBottom: '1rem',
              }}
            >
              {slide.subtitle}
            </h2>

            <h1
              style={{
                fontSize: '4rem',
                fontFamily: "'Cinzel', serif",
                color: 'var(--color-gold)',
                marginBottom: '1.5rem',
                letterSpacing: '0.1em',
              }}
            >
              {slide.title}
            </h1>

            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--color-parchment)',
                marginBottom: '2rem',
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
              }}
            >
              {slide.description}
            </p>

            <p
              style={{
                fontSize: '1rem',
                color: 'var(--foreground)',
                marginBottom: '2rem',
                lineHeight: '1.7',
                maxWidth: '700px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {slide.content}
            </p>

            {slide.highlights && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '2rem',
                  marginTop: '2rem',
                }}
              >
                {slide.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '1.5rem',
                      background: 'rgba(196, 162, 78, 0.08)',
                      border: '1px solid rgba(196, 162, 78, 0.2)',
                      borderRadius: '4px',
                    }}
                  >
                    <p style={{ color: 'var(--color-gold)', fontWeight: 'bold' }}>{highlight}</p>
                  </div>
                ))}
              </div>
            )}

            <button
              style={{
                padding: '1rem 2.5rem',
                background: 'linear-gradient(135deg, var(--color-gold) 0%, #a8842f 100%)',
                color: '#0a0a10',
                border: '1px solid rgba(196, 162, 78, 0.4)',
                borderRadius: '4px',
                fontFamily: "'Cinzel', serif",
                fontSize: '0.9rem',
                fontWeight: 'bold',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 300ms ease',
                boxShadow: '0 8px 24px rgba(196, 162, 78, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #d4b860 0%, #b89840 100%)';
                e.target.style.boxShadow = '0 12px 36px rgba(196, 162, 78, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background =
                  'linear-gradient(135deg, var(--color-gold) 0%, #a8842f 100%)';
                e.target.style.boxShadow = '0 8px 24px rgba(196, 162, 78, 0.2)';
              }}
            >
              {slide.cta}
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          style={{
            position: 'absolute',
            left: '2rem',
            background: 'rgba(196, 162, 78, 0.15)',
            border: '1px solid rgba(196, 162, 78, 0.3)',
            color: 'var(--color-gold)',
            width: '50px',
            height: '50px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 300ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(196, 162, 78, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(196, 162, 78, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(196, 162, 78, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(196, 162, 78, 0.3)';
          }}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          style={{
            position: 'absolute',
            right: '2rem',
            background: 'rgba(196, 162, 78, 0.15)',
            border: '1px solid rgba(196, 162, 78, 0.3)',
            color: '#c4a24e',
            width: '50px',
            height: '50px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 300ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(196, 162, 78, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(196, 162, 78, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(196, 162, 78, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(196, 162, 78, 0.3)';
          }}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Controls */}
      <div
        style={{
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          borderTop: '1px solid rgba(196, 162, 78, 0.15)',
        }}
      >
        {/* Dot Indicators */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              style={{
                width: idx === currentSlide ? '24px' : '12px',
                height: '12px',
                borderRadius: '6px',
                background: idx === currentSlide ? 'var(--color-gold)' : 'rgba(196, 162, 78, 0.3)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 300ms ease',
              }}
            />
          ))}
        </div>

        {/* Export Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginLeft: 'auto' }}>
          <button
            onClick={downloadPDF}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.2rem',
              background: 'transparent',
              border: '1px solid rgba(196, 162, 78, 0.4)',
              color: '#c4a24e',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.85rem',
              transition: 'all 300ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(196, 162, 78, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(196, 162, 78, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(196, 162, 78, 0.4)';
            }}
          >
            <Download size={16} />
            PDF
          </button>
          <button
            onClick={downloadPPTX}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.2rem',
              background: 'transparent',
              border: '1px solid rgba(196, 162, 78, 0.4)',
              color: '#c4a24e',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: "'Raleway', sans-serif",
              fontSize: '0.85rem',
              transition: 'all 300ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(196, 162, 78, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(196, 162, 78, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(196, 162, 78, 0.4)';
            }}
          >
            <Download size={16} />
            PPTX
          </button>
        </div>

        {/* Slide Counter */}
        <div
          style={{
            marginLeft: 'auto',
            color: 'var(--muted-foreground)',
            fontSize: '0.9rem',
            fontFamily: "'Raleway', sans-serif",
          }}
        >
          {currentSlide + 1} / {SLIDES.length}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
