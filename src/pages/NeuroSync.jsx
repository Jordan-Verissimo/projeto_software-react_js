import React from 'react';
import { OrnateFrame, OrnateDivider } from '../app/components/OrnateFrame';
import { Activity, Heart, Zap } from 'lucide-react';

function NeuroSync() {
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
              Neuro-Sync Engine
            </h1>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                color: 'rgba(212, 196, 160, 0.7)',
                fontSize: '0.95rem',
              }}
            >
              O cérebro do sistema Silent Bloom: VFC + BPM + EDA
            </p>
          </div>
        </OrnateFrame>
      </div>

      <OrnateDivider />

      {/* Three Pillars */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          margin: '2rem 0',
        }}
      >
        {[
          {
            icon: Activity,
            title: 'VFC — Resiliência',
            color: 'var(--color-gold)',
            desc: 'Intervalo entre batimentos; baixa VFC ativa protocolos de calma.',
            detail: 'Variabilidade da Frequência Cardíaca em ms',
          },
          {
            icon: Heart,
            title: 'BPM — Energia',
            color: '#e05050',
            desc: 'Frequência cardíaca; picos de adrenalina acionam foco cítrico.',
            detail: 'Batimentos por minuto em tempo real',
          },
          {
            icon: Zap,
            title: 'EDA — Intensidade',
            color: '#50a0e0',
            desc: 'Condutância da pele; ajusta a dosagem de aroma em %.',
            detail: 'Atividade eletrodérmica em µS',
          },
        ].map((item, idx) => (
          <OrnateFrame key={idx} glow>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <item.icon
                size={32}
                style={{ color: item.color, opacity: 0.8, flexShrink: 0, marginTop: '0.25rem' }}
              />
              <div>
                <h3
                  style={{
                    fontFamily: "'Cinzel', serif",
                    color: item.color,
                    letterSpacing: '0.1em',
                    fontSize: '0.95rem',
                    margin: '0 0 0.5rem 0',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    color: 'rgba(212, 196, 160, 0.7)',
                    fontSize: '0.9rem',
                    margin: '0 0 0.75rem 0',
                    lineHeight: 1.5,
                  }}
                >
                  {item.desc}
                </p>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '0.8rem',
                    color: 'rgba(196, 162, 78, 0.5)',
                    fontStyle: 'italic',
                  }}
                >
                  {item.detail}
                </div>
              </div>
            </div>
          </OrnateFrame>
        ))}
      </div>

      <OrnateDivider />

      {/* System Overview */}
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
          Análise Integrada
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ color: 'rgba(212, 196, 160, 0.7)', lineHeight: 1.6 }}>
            O Neuro-Sync Engine produz <strong>análises em tempo real</strong>, processando
            simultaneamente os três biomarcadores (VFC, BPM, EDA) para gerar recomendações
            personalizadas de aromas.
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
                label: 'Cross-Selling',
                desc: 'Sugere complementos aromáticos baseado em padrões biométricos',
              },
              {
                label: 'Relatórios',
                desc: 'Gera históricos de impacto do ritual em bem-estar diário',
              },
              {
                label: 'Protocolo Inteligente',
                desc: 'Auto-ajusta intensidade e combinações de fragrâncias',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1rem',
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
                    marginBottom: '0.5rem',
                  }}
                >
                  {item.label}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(212, 196, 160, 0.6)' }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </OrnateFrame>

      {/* Data Flow */}
      <OrnateFrame>
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
          Fluxo de Dados
        </h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: "'Raleway', sans-serif",
              color: 'rgba(212, 196, 160, 0.7)',
              fontSize: '0.9rem',
            }}
          >
            Sensores Biométricos
          </div>
          <div style={{ color: 'rgba(196, 162, 78, 0.5)', fontSize: '1.2rem' }}>↓</div>
          <div
            style={{
              fontFamily: "'Raleway', sans-serif",
              color: 'rgba(212, 196, 160, 0.7)',
              fontSize: '0.9rem',
            }}
          >
            Processamento Neuro-Sync
          </div>
          <div style={{ color: 'rgba(196, 162, 78, 0.5)', fontSize: '1.2rem' }}>↓</div>
          <div
            style={{
              fontFamily: "'Raleway', sans-serif",
              color: 'rgba(212, 196, 160, 0.7)',
              fontSize: '0.9rem',
            }}
          >
            Difusão Aromática Inteligente
          </div>
          <div style={{ color: 'rgba(196, 162, 78, 0.5)', fontSize: '1.2rem' }}>↓</div>
          <div
            style={{
              fontFamily: "'Raleway', sans-serif",
              color: 'rgba(212, 196, 160, 0.7)',
              fontSize: '0.9rem',
            }}
          >
            Relatório de Impacto
          </div>
        </div>
      </OrnateFrame>
    </article>
  );
}

export default NeuroSync;
