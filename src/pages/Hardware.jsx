import React from 'react';
import { OrnateFrame, OrnateDivider } from '../componentes/OrnateFrame';
import BraceletGallery from '../componentes/BraceletGallery';
import { Zap, Shield, Droplets } from 'lucide-react';

export default function Hardware() {
  const specs = [
    {
      icon: Shield,
      title: 'Materiais Premium',
      desc: 'Aço 316L (padrão relojoaria suíça). Resistente à água até 5ATM com sapphire crystal.',
      color: '#c4a24e',
    },
    {
      icon: Zap,
      title: 'Tecnologia Neuro-Sync',
      desc: 'Sensor de VFC + EDA + cristal piezoelétrico para microatomização de fragrância.',
      color: '#e0c878',
    },
    {
      icon: Droplets,
      title: 'Microatomização',
      desc: 'Célula de difusão cerâmica com 12 níveis de intensidade. Duração: até 8 horas/carga.',
      color: '#d4b060',
    },
  ];

  const editions = [
    {
      name: 'Edition Rutênio',
      items: [
        'Banho de rutênio escuro',
        'Acabamento matt polido',
        'Resistência extrema',
        'Estilo discreto',
      ],
      price: 'R$ 2.890',
    },
    {
      name: 'Edition Bleu Nuit',
      items: [
        'Esmalte Grand Feu azul',
        'Processo de alta temperatura',
        'Finição premium',
        'Elegância noturna',
      ],
      price: 'R$ 3.290',
    },
    {
      name: 'Edition Or Rose',
      items: [
        'Banho de ouro rose 18k',
        'Acabamento espelhado',
        'Refinamento máximo',
        'Belle Époque',
      ],
      price: 'R$ 4.490',
    },
  ];

  return (
    <>
      <article
        style={{
          maxWidth: '1120px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingTop: '2rem',
          paddingBottom: '2rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <OrnateFrame glow>
            <div
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <h1
                style={{
                  fontFamily: "'Cinzel', serif",
                  color: 'var(--color-gold)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontSize: '1.1rem',
                }}
              >
                Hardware Premium
              </h1>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  color: 'rgba(212, 196, 160, 0.7)',
                  fontSize: '0.95rem',
                }}
              >
                Tecnologia Neuro-Sync em Joalheria de Luxo
              </p>
            </div>
          </OrnateFrame>
        </div>

        {/* Bracelet Gallery */}
        <div style={{ marginBottom: '3rem' }}>
          <OrnateFrame>
            <BraceletGallery />
          </OrnateFrame>
        </div>

        <OrnateDivider />

        {/* Specifications */}
        <div style={{ marginBottom: '2rem' }}>
          <OrnateFrame glow>
            <h2
              style={{
                fontFamily: "'Cinzel', serif",
                color: 'rgba(196, 162, 78, 0.8)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontSize: '0.9rem',
                textAlign: 'center',
                marginBottom: '1.5rem',
              }}
            >
              Especificações Técnicas
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {specs.map((spec, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '2px',
                    border: '1px solid rgba(196, 162, 78, 0.15)',
                    background: 'rgba(10, 10, 16, 0.5)',
                  }}
                >
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <spec.icon size={24} style={{ color: spec.color, opacity: 0.8 }} />
                    <h3
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: '0.95rem',
                        color: spec.color,
                        letterSpacing: '0.1em',
                        margin: 0,
                      }}
                    >
                      {spec.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      color: 'rgba(212, 196, 160, 0.7)',
                      fontSize: '0.9rem',
                      margin: 0,
                      lineHeight: '1.6',
                    }}
                  >
                    {spec.desc}
                  </p>
                </div>
              ))}
            </div>
          </OrnateFrame>
        </div>

        <OrnateDivider />

        {/* Editions */}
        <div>
          <OrnateFrame>
            <h2
              style={{
                fontFamily: "'Cinzel', serif",
                color: 'rgba(196, 162, 78, 0.8)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontSize: '0.9rem',
                textAlign: 'center',
                marginBottom: '2rem',
              }}
            >
              Edições Disponíveis
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {editions.map((edition, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '2px',
                    border: '2px solid rgba(196, 162, 78, 0.2)',
                    background: 'rgba(10, 10, 16, 0.5)',
                    textAlign: 'center',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: '1.1rem',
                      color: 'var(--color-gold)',
                      letterSpacing: '0.1em',
                      marginBottom: '1rem',
                    }}
                  >
                    {edition.name}
                  </h3>

                  <ul style={{ listStyle: 'none', margin: 0, marginBottom: '1.5rem', padding: 0 }}>
                    {edition.items.map((item, i) => (
                      <li
                        key={i}
                        style={{
                          color: 'rgba(212, 196, 160, 0.7)',
                          fontSize: '0.9rem',
                          padding: '0.4rem 0',
                          borderBottom:
                            i < edition.items.length - 1
                              ? '1px solid rgba(196, 162, 78, 0.1)'
                              : 'none',
                        }}
                      >
                        ✓ {item}
                      </li>
                    ))}
                  </ul>

                  <p
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: '1.5rem',
                      color: 'var(--color-gold)',
                      fontWeight: '700',
                      margin: 0,
                    }}
                  >
                    {edition.price}
                  </p>
                </div>
              ))}
            </div>
          </OrnateFrame>
        </div>
      </article>
    </>
  );
}
