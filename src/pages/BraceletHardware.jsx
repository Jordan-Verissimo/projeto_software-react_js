import React from 'react';
import { OrnateFrame, OrnateDivider } from '../componentes/OrnateFrame';
import { Zap, Settings, Lock, Radio } from 'lucide-react';

function BraceletHardware() {
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
              Hardware Silent Bloom
            </h1>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                color: 'rgba(212, 196, 160, 0.7)',
                fontSize: '0.95rem',
              }}
            >
              A pulseira nasceu para ser joalheria e dispositivo
            </p>
          </div>
        </OrnateFrame>
      </div>

      <OrnateDivider />

      {/* Main Components Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem',
          marginBottom: '1rem',
        }}
      >
        {[
          {
            icon: Lock,
            title: 'Estrutura',
            color: 'var(--color-gold)',
            items: [
              'Aço Inoxidável 316L (padrão relojoaria suíça)',
              'Resistente à água até 5ATM',
              'Durabilidade comprovada em laboratório',
            ],
          },
          {
            icon: Settings,
            title: 'Mecanismo',
            color: '#8b6914',
            items: [
              'Links intercambiáveis com trilha milimétrica',
              'Travamento click de precisão suíça',
              'Ajuste rápido sem ferramentas',
            ],
          },
          {
            icon: Radio,
            title: 'Conectividade',
            color: '#50a0e0',
            items: [
              'Contatos Pogo Pins banhados a ouro',
              'Energia e dados simultâneos',
              'Carregamento magnético (5min para 12h)',
            ],
          },
          {
            icon: Zap,
            title: 'Bloom System',
            color: '#e05050',
            items: [
              'Grade de flor em metal nobre',
              'Módulo de arco de perfume cerâmico',
              'Nitinol micro-atuador para dosagem',
            ],
          },
        ].map((component, idx) => (
          <OrnateFrame key={idx} glow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <component.icon size={24} style={{ color: component.color, opacity: 0.8 }} />
                <h3
                  style={{
                    fontFamily: "'Cinzel', serif",
                    color: component.color,
                    letterSpacing: '0.1em',
                    fontSize: '0.95rem',
                    margin: 0,
                  }}
                >
                  {component.title}
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
                {component.items.map((item, i) => (
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

      {/* Technical Specifications */}
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
          Especificações Técnicas
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          {[
            { label: 'Peso', value: '42g', desc: 'Pulseira completa' },
            { label: 'Diâmetro', value: '40mm', desc: 'Cápsula central' },
            { label: 'Bateria', value: '650mAh', desc: '12h monitoramento contínuo' },
            { label: 'Sensores', value: '3 + IMU', desc: 'VFC, BPM, EDA + acelerômetro' },
            { label: 'Conexão', value: 'Bluetooth 5.3', desc: 'Range até 100m' },
            { label: 'Certificação', value: 'FCC, CE', desc: 'Conformidade regulatória' },
          ].map((spec, idx) => (
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
                  marginBottom: '0.25rem',
                }}
              >
                {spec.label}
              </div>
              <div
                style={{
                  fontSize: '1.1rem',
                  color: 'rgba(212, 196, 160, 0.9)',
                  fontFont: 'monospace',
                  marginBottom: '0.25rem',
                }}
              >
                {spec.value}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(196, 162, 78, 0.5)' }}>
                {spec.desc}
              </div>
            </div>
          ))}
        </div>
      </OrnateFrame>

      {/* Assembly */}
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
          Processo de Montagem
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {[
            {
              step: '1',
              title: 'Usinagem Precisa',
              desc: 'CNC de 5 eixos em aço suíço com tolerância ±0.05mm',
            },
            {
              step: '2',
              title: 'Tratamento Superficial',
              desc: 'Polimento espelho + passivação para resistência à corrosão',
            },
            {
              step: '3',
              title: 'Integração Eletrônica',
              desc: 'Sensores calibrados e soldados em PCB de 6 camadas',
            },
            {
              step: '4',
              title: 'Assembl Mecânico',
              desc: 'Encaixe dos links e cápsula com precisão relojoeira',
            },
            {
              step: '5',
              title: 'Testes Funcionais',
              desc: 'Estanqueidade, conectividade e biometria validadas',
            },
            {
              step: '6',
              title: 'Acabamento Final',
              desc: 'Limpeza, ajuste de links e embalagem artesanal',
            },
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(196, 162, 78, 0.1)',
                  border: '1px solid rgba(196, 162, 78, 0.3)',
                  borderRadius: '50%',
                  flexShrink: 0,
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.9rem',
                  color: 'var(--color-gold)',
                }}
              >
                {item.step}
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: "'Cinzel', serif",
                    color: 'var(--color-gold)',
                    fontSize: '0.9rem',
                    margin: '0 0 0.25rem 0',
                  }}
                >
                  {item.title}
                </h4>
                <p style={{ color: 'rgba(212, 196, 160, 0.6)', fontSize: '0.85rem', margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </OrnateFrame>
    </article>
  );
}

export default BraceletHardware;
