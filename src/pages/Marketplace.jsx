import React from 'react';
import { OrnateFrame, OrnateDivider } from '../componentes/OrnateFrame';
import { ShoppingBag, TrendingUp, Users } from 'lucide-react';

function Marketplace() {
  return (
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
      {/* Header */}
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
              Marketplace L'Oréal
            </h1>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                color: 'rgba(212, 196, 160, 0.7)',
                fontSize: '0.95rem',
              }}
            >
              O ecossistema fechado: refis + módulos + skincare + makeup
            </p>
          </div>
        </OrnateFrame>
      </div>

      <OrnateDivider />

      {/* Core Thesis */}
      <div style={{ marginBottom: '2rem' }}>
        <OrnateFrame glow>
          <div
            style={{
              textAlign: 'center',
              fontStyle: 'italic',
              fontFamily: "'Cormorant Garamond', serif",
              color: 'rgba(212, 196, 160, 0.8)',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              letterSpacing: '0.05em',
            }}
          >
            "Enquanto o sistema mede, a plataforma vende: <br />
            <span style={{ color: 'var(--color-gold)' }}>retenção, LTV e dados first-party.</span>"
          </div>
        </OrnateFrame>
      </div>

      {/* Three Pillars */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
      >
        {[
          {
            icon: ShoppingBag,
            title: 'Ofertas Inteligentes',
            color: 'var(--color-gold)',
            items: [
              "Frascos oficiais L'Oréal Premium",
              'Configuráveis por sensor (Calma, Foco, Energia)',
              'Compatibilidade garantida com hardware',
            ],
          },
          {
            icon: TrendingUp,
            title: 'Cross-Sell Dinâmico',
            color: '#8b6914',
            items: [
              'Recomendações via ML (style, stress, performance)',
              'Produtos sugeridos em tempo real',
              'Promoções personalizadas por perfil neuro',
            ],
          },
          {
            icon: Users,
            title: 'Marcas Premium',
            color: '#e0c878',
            items: [
              'Lancôme, YSL, Armani Beauty',
              'Biotherm + skincare especializado',
              'Édições limitadas e coleções exclusivas',
            ],
          },
        ].map((pillar, idx) => (
          <OrnateFrame key={idx} glow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <pillar.icon size={28} style={{ color: pillar.color, opacity: 0.8 }} />
                <h3
                  style={{
                    fontFamily: "'Cinzel', serif",
                    color: pillar.color,
                    letterSpacing: '0.1em',
                    fontSize: '0.95rem',
                    margin: 0,
                  }}
                >
                  {pillar.title}
                </h3>
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {pillar.items.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      color: 'rgba(212, 196, 160, 0.7)',
                      fontSize: '0.85rem',
                      lineHeight: 1.4,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </OrnateFrame>
        ))}
      </div>

      <OrnateDivider />

      {/* Product Categories */}
      <OrnateFrame style={{ marginBottom: '2rem' }}>
        <h2
          style={{
            fontFamily: "'Cinzel', serif",
            color: 'var(--color-gold)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontSize: '0.9rem',
            marginBottom: '1.5rem',
          }}
        >
          Categorias de Produtos
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          {[
            { cat: 'Refils Aromáticos', desc: 'Fragrâncias premium em formato recarga' },
            { cat: 'Módulos Técnicos', desc: 'Componentes de reposição (cerâmica, sensores)' },
            { cat: 'Skincare Luxe', desc: 'Cremes e serums complementares ao ritual' },
            { cat: 'Makeup Couture', desc: 'Cosméticos artesanais edição limitada' },
            { cat: 'Accessories', desc: 'Links decorativos e capinhas premium' },
            { cat: 'Bundles Sazonais', desc: 'Kits temáticos com descontos ecosystem' },
          ].map((product, idx) => (
            <div
              key={idx}
              style={{
                padding: '1.25rem',
                background: 'rgba(196, 162, 78, 0.05)',
                borderRadius: 'var(--radius)',
                border: '1px solid rgba(196, 162, 78, 0.1)',
              }}
            >
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.85rem',
                  color: 'var(--color-gold)',
                  letterSpacing: '0.1em',
                  marginBottom: '0.5rem',
                }}
              >
                {product.cat}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(212, 196, 160, 0.6)' }}>
                {product.desc}
              </div>
            </div>
          ))}
        </div>
      </OrnateFrame>

      {/* Retention Strategy */}
      <OrnateFrame glow>
        <h2
          style={{
            fontFamily: "'Cinzel', serif",
            color: 'var(--color-gold)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontSize: '0.9rem',
            marginBottom: '1.5rem',
          }}
        >
          Estratégia de Retenção
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {[
            {
              title: 'Subscription Ritual',
              desc: 'Entrega mensal curada por IA baseada em padrões biométricos do usuário',
              icon: '↻',
            },
            {
              title: 'Relatório de Impacto',
              desc: 'Análises trimestrais de bem-estar + histórico de consumo + ROI emocional',
              icon: '📊',
            },
            {
              title: 'Comunidade First-Party',
              desc: 'Access exclusivo a eventos, workshops e dados agregados (privacy-first)',
              icon: '👥',
            },
            {
              title: 'Gamification & Rewards',
              desc: 'Pontos por medições consistentes, desafios semanais, tier-based benefits',
              icon: '⭐',
            },
          ].map((strategy, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
                paddingBottom: '1.25rem',
                borderBottom: idx < 3 ? '1px solid rgba(196, 162, 78, 0.1)' : 'none',
              }}
            >
              <div
                style={{
                  fontSize: '1.5rem',
                  opacity: 0.6,
                  flexShrink: 0,
                  width: '30px',
                  textAlign: 'center',
                }}
              >
                {strategy.icon}
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: "'Cinzel', serif",
                    color: 'var(--color-gold)',
                    fontSize: '0.95rem',
                    margin: '0 0 0.25rem 0',
                  }}
                >
                  {strategy.title}
                </h4>
                <p style={{ color: 'rgba(212, 196, 160, 0.6)', fontSize: '0.85rem', margin: 0 }}>
                  {strategy.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </OrnateFrame>
    </article>
  );
}

export default Marketplace;
