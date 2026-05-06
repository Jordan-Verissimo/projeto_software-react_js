import React from 'react';
import { OrnateFrame, OrnateDivider } from '../app/components/OrnateFrame';
import { Store, Sparkles, ShieldCheck, TrendingUp } from 'lucide-react';

const brands = [
  {
    brand: 'Lancome',
    items: ['Advanced Genifique Serum', 'La Vie Est Belle Refil', 'Renergie Multi-Lift'],
    focus: 'Calma & Regeneracao',
    accent: '#8b6040',
    cross: 'Potencializa o efeito de Brume de Nuit e Soie de Paix',
  },
  {
    brand: 'YSL Beauty',
    items: ['Libre EDP Refil', 'All Hours Foundation', 'Rouge Sur Mesure'],
    focus: 'Energia & Estilo',
    accent: 'var(--color-gold)',
    cross: 'Complementa Racine de Force e Energie Verte',
  },
  {
    brand: 'Armani',
    items: ['Armani Code Refil', 'Luminous Silk', 'Eyes To Kill Mascara'],
    focus: 'Foco & Performance',
    accent: '#6a6a70',
    cross: 'Sinergiza com Equilibre Zen em rituais noturnos',
  },
  {
    brand: 'Biotherm',
    items: ['Life Plankton Elixir', 'Aquasource Gel', 'Lait Corporel'],
    focus: 'Bem-Estar & Recovery',
    accent: '#2d6a4f',
    cross: "Amplifica L'Eclat Bleu para ansiedade",
  },
];

export default function Refils() {
  return (
    <article style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <OrnateFrame glow>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <Store
            style={{
              color: 'rgba(196, 162, 78, 0.5)',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '0.75rem',
            }}
            size={28}
          />
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              color: 'rgba(196, 162, 78, 0.5)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontSize: '0.6rem',
              marginBottom: '0.5rem',
              margin: 0,
            }}
          >
            Ecossistema Fechado L'Oreal Luxe
          </p>
          <h2
            style={{
              fontSize: '1.5rem',
              color: 'var(--color-cream)',
              fontFamily: "'Playfair Display', serif",
              margin: 0,
            }}
          >
            Marketplace
          </h2>
        </div>
        <div
          style={{
            background: 'rgba(26, 26, 38, 0.6)',
            borderLeft: '2px solid rgba(196, 162, 78, 0.3)',
            borderRadius: '0 4px 4px 0',
            paddingLeft: '1.25rem',
            paddingRight: '1.25rem',
            paddingTop: '1rem',
            paddingBottom: '1rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              color: 'rgba(232, 220, 200, 0.7)',
              fontSize: '1.05rem',
              textAlign: 'center',
              lineHeight: '1.6',
              margin: 0,
            }}
          >
            "Enquanto o sistema mede, a plataforma vende: retencao, LTV e dados first-party que
            valem bilhoes em P&D."
          </p>
        </div>
      </OrnateFrame>

      <OrnateDivider />

      {/* E-commerce engine */}
      <OrnateFrame>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}
        >
          <TrendingUp style={{ color: 'rgba(196, 162, 78, 0.6)' }} size={18} />
          <h3
            style={{
              margin: 0,
              color: 'var(--color-cream)',
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Motor de Vendas Inteligente
          </h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            {
              label: 'Gestao de Refil',
              desc: 'Identifica quando a fragrancia esta acabando e sugere a compra automaticamente.',
            },
            {
              label: 'Sugestoes por Dados',
              desc: '"O toque do hidratante Y somado a fragrancia X reduz o cortisol em mais 5%".',
            },
            {
              label: 'Fidelizacao',
              desc: "Sugere produtos L'Oreal Luxe (skincare, fixadores, cremes) que potencializam o objetivo emocional.",
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}
            >
              <span
                style={{ color: 'rgba(196, 162, 78, 0.4)', marginTop: '0.125rem', flexShrink: 0 }}
              >
                ◇
              </span>
              <div>
                <span
                  style={{
                    fontFamily: "'Cinzel', serif",
                    color: 'rgba(196, 162, 78, 0.7)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.label}
                </span>
                <p style={{ color: 'rgba(212, 196, 160, 0.55)', fontSize: '0.85rem', margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </OrnateFrame>

      {/* Brand cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem',
        }}
      >
        {brands.map((b) => (
          <OrnateFrame key={b.brand}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
              }}
            >
              <Sparkles size={14} style={{ color: b.accent, opacity: 0.6 }} />
              <h3 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-cream)' }}>
                {b.brand}
              </h3>
            </div>
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(196, 162, 78, 0.08)',
                color: 'rgba(196, 162, 78, 0.6)',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                paddingLeft: '0.75rem',
                paddingRight: '0.75rem',
                paddingTop: '0.25rem',
                paddingBottom: '0.25rem',
                borderRadius: '4px',
                marginBottom: '0.75rem',
                fontFamily: "'Cinzel', serif",
              }}
            >
              {b.focus}
            </span>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.375rem',
                marginBottom: '0.75rem',
              }}
            >
              {b.items.map((i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <span
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'rgba(196, 162, 78, 0.3)',
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ color: 'rgba(212, 196, 160, 0.55)', fontSize: '0.85rem' }}>
                    {i}
                  </span>
                </div>
              ))}
            </div>
            <p
              style={{
                color: 'rgba(212, 196, 160, 0.4)',
                fontSize: '0.78rem',
                fontStyle: 'italic',
                borderTop: '1px solid rgba(196, 162, 78, 0.08)',
                paddingTop: '0.5rem',
                margin: 0,
              }}
            >
              {b.cross}
            </p>
          </OrnateFrame>
        ))}
      </div>

      {/* Anti-Dupe + Business */}
      <OrnateFrame>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}
        >
          <ShieldCheck style={{ color: 'rgba(196, 162, 78, 0.6)' }} size={18} />
          <h3
            style={{
              margin: 0,
              color: 'var(--color-cream)',
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Barreira Anti-Dupe & Modelo de Negocio
          </h3>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '0.75rem',
          }}
        >
          {[
            {
              t: 'Hardware Proprietario',
              d: 'Slip-Connect + algoritmos de bio-feedback — impossivel replicar pela perfumaria tradicional.',
            },
            {
              t: 'Receita Recorrente',
              d: 'Modelo de hardware de luxo + refis recorrentes com botanicos globais que otimizam margens.',
            },
            {
              t: 'First-Party Data',
              d: 'Dados de biometria e comportamento de uso que alimentam P&D e personalizacao.',
            },
            {
              t: 'Fidelizacao',
              d: 'Modulos colecionaveis + refill recorrente + cross-sell inteligente por sensores.',
            },
          ].map((item) => (
            <div
              key={item.t}
              style={{
                background: 'rgba(26, 26, 38, 0.6)',
                border: '1px solid rgba(196, 162, 78, 0.08)',
                borderRadius: '4px',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '1rem',
                paddingBottom: '1rem',
              }}
            >
              <h4
                style={{
                  color: 'rgba(196, 162, 78, 0.8)',
                  fontSize: '0.75rem',
                  marginBottom: '0.25rem',
                  margin: 0,
                }}
              >
                {item.t}
              </h4>
              <p style={{ color: 'rgba(212, 196, 160, 0.5)', fontSize: '0.8rem', margin: 0 }}>
                {item.d}
              </p>
            </div>
          ))}
        </div>
      </OrnateFrame>
    </article>
  );
}
