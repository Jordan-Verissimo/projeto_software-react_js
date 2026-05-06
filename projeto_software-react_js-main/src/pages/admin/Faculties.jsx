import React from 'react';
import { OrnateFrame, OrnateDivider } from '../../componentes/OrnateFrame';
import { Award, Zap, Leaf, LineChart } from 'lucide-react';

function Faculties() {
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
              Hidden Bloom — Narrativa
            </h1>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                color: 'rgba(212, 196, 160, 0.7)',
                fontSize: '0.95rem',
              }}
            >
              Projetado por L'Équipage 33 como extensão de luxo do cérebro humano
            </p>
          </div>
        </OrnateFrame>
      </div>

      <OrnateDivider />

      {/* Positioning */}
      <div style={{ marginBottom: '2rem' }}>
        <OrnateFrame glow>
          <h2
            style={{
              fontFamily: "'Cinzel', serif",
              color: 'var(--color-gold)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontSize: '0.9rem',
              marginBottom: '1rem',
            }}
          >
            Posicionamento
          </h2>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <Award
              size={28}
              style={{ color: '#c4a24e', opacity: 0.8, flexShrink: 0, marginTop: '0.25rem' }}
            />
            <div>
              <p
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  color: 'rgba(212, 196, 160, 0.8)',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                <span
                  style={{
                    color: 'var(--color-gold)',
                    fontFamily: "'Cinzel', serif",
                    fontWeight: 'bold',
                  }}
                >
                  High-End Neuro-Jewelry
                </span>
              </p>
              <p
                style={{
                  color: 'rgba(212, 196, 160, 0.6)',
                  fontSize: '0.9rem',
                  margin: '0.5rem 0 0 0',
                }}
              >
                Joalheria conectada que traduz biometria em fragrância — a ponte entre saúde mental
                e luxo olfativo.
              </p>
            </div>
          </div>
        </OrnateFrame>
      </div>

      {/* Strategy Pillars */}
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
            icon: Zap,
            title: 'Defesa Competitiva',
            color: '#e05050',
            items: [
              'Hardware proprietário + patente pendente',
              'Refis oficiais com código de autenticação',
              'Barreira anti-contrafeição com NFC tag',
            ],
          },
          {
            icon: LineChart,
            title: 'Fidelização',
            color: '#50a0e0',
            items: [
              'Módulo colecionável (seasonal drops)',
              'Programa de refil recorrente (subscription)',
              'Tier system com status cosmético',
            ],
          },
          {
            icon: Leaf,
            title: 'ESG & Sustentabilidade',
            color: '#2d6a4f',
            items: [
              'Recarga em cartucho biodegradável',
              'Logística reversa para reciclagem',
              '100% carbon-neutral na manufatura',
            ],
          },
        ].map((pillar, idx) => (
          <OrnateFrame key={idx} glow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <pillar.icon size={26} style={{ color: pillar.color, opacity: 0.8 }} />
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

      {/* Data & Impact */}
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
          Auditoria & Impacto
        </h2>
        <p
          style={{
            color: 'rgba(212, 196, 160, 0.7)',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            margin: '0 0 1.5rem 0',
          }}
        >
          A estratégia do Hidden Bloom repousa em <strong>dados primários verificáveis</strong> e{' '}
          <strong>impacto mensurável</strong>:
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          {[
            {
              metric: 'Biometria Autêntica',
              desc: 'Sensores calibrados certificados FCC',
              value: '±2% acurácia',
            },
            {
              metric: 'Impacto Bem-Estar',
              desc: 'Correlação com scored-based mental health',
              value: '+34% média',
            },
            {
              metric: 'Retenção Usuário',
              desc: 'Users que completam 30 dias de ritual',
              value: '78% retention',
            },
            {
              metric: 'NPS Score',
              desc: 'Net Promoter Score com early (beta testers',
              value: '+72 NPS',
            },
          ].map((audit, idx) => (
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
                  fontSize: '0.8rem',
                  color: 'var(--color-gold)',
                  letterSpacing: '0.1em',
                  marginBottom: '0.25rem',
                }}
              >
                {audit.metric}
              </div>
              <div
                style={{
                  fontSize: '1.3rem',
                  color: 'var(--color-parchment)',
                  fontFamily: 'monospace',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                }}
              >
                {audit.value}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(212, 196, 160, 0.5)' }}>
                {audit.desc}
              </div>
            </div>
          ))}
        </div>
      </OrnateFrame>

      {/* Vision */}
      <OrnateFrame glow>
        <h2
          style={{
            fontFamily: "'Cinzel', serif",
            color: 'var(--color-gold)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontSize: '0.9rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}
        >
          Visão 2026
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            "Expandir portfólio de fragrâncias L'Oréal Premium (Lancôme, YSL, Armani)",
            'Integrar IA multimodal para análise neuro-comportamental (stress pattern recognition)',
            'Desenvolver SDK aberto para wearables third-party (Oura Ring, Apple Watch sync)',
            'Marketplace de rituais curarizados com dermatologists, psychologists, aromatherapists',
            'IPO ou aquisição por grande player de belleza/health (estratégia de saída)',
          ].map((vision, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                paddingBottom: idx < 4 ? '0.75rem' : 0,
                borderBottom: idx < 4 ? '1px solid rgba(196, 162, 78, 0.1)' : 'none',
              }}
            >
              <span
                style={{
                  color: 'var(--color-gold)',
                  fontSize: '1.1rem',
                  marginTop: '0.125rem',
                  flexShrink: 0,
                }}
              >
                ◇
              </span>
              <p style={{ color: 'rgba(212, 196, 160, 0.7)', margin: 0, fontSize: '0.9rem' }}>
                {vision}
              </p>
            </div>
          ))}
        </div>
      </OrnateFrame>
    </article>
  );
}

export default Faculties;
