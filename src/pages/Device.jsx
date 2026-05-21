import React, { useState } from 'react';
import { GoldButton } from '../componentes/GoldButton';
import { OrnateFrame } from '../componentes/OrnateFrame';
import { Bluetooth, BluetoothOff, ToggleLeft, ToggleRight, Info, Radio } from 'lucide-react';

export default function Device() {
  const [bluetooth, setBluetooth] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Desconectado');

  function toggleBluetooth() {
    const next = !bluetooth;
    setBluetooth(next);
    setConnectionStatus(next ? 'Pareado com Hidden Bloom (simulado)' : 'Desconectado');
  }

  function toggleMode() {
    setManualMode((prev) => !prev);
  }

  return (
    <article style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <OrnateFrame glow>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <Radio
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
            }}
          >
            Painel de Controle
          </p>
          <h2
            style={{
              fontSize: '1.5rem',
              color: 'var(--color-cream)',
              fontFamily: "'Playfair Display', serif",
              margin: 0,
            }}
          >
            Dispositivo
          </h2>
          <p
            style={{
              color: 'rgba(212, 196, 160, 0.6)',
              fontSize: '0.9rem',
              marginTop: '0.5rem',
              margin: 0,
            }}
          >
            Simule o pareamento e ajuste o modo de acionamento do Bloom.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
          }}
        >
          {/* Bluetooth */}
          <div
            style={{
              background: 'rgba(26, 26, 38, 0.6)',
              border: '1px solid rgba(196, 162, 78, 0.08)',
              borderRadius: '4px',
              padding: '1.25rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem',
              }}
            >
              {bluetooth ? (
                <Bluetooth style={{ color: '#3a7ca5' }} size={22} />
              ) : (
                <BluetoothOff style={{ color: 'rgba(212, 196, 160, 0.3)' }} size={22} />
              )}
              <h4 style={{ margin: 0, color: 'var(--color-gold)', fontSize: '0.8rem' }}>
                Bluetooth
              </h4>
            </div>
            <p
              style={{
                color: 'rgba(212, 196, 160, 0.55)',
                fontSize: '0.85rem',
                marginBottom: '1rem',
                margin: 0,
              }}
            >
              Status:{' '}
              <span style={{ color: bluetooth ? '#4ade80' : '#ef4444' }}>{connectionStatus}</span>
            </p>
            {bluetooth && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                }}
              >
                <span
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    width: '10px',
                    height: '10px',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      background: '#4ade80',
                      opacity: 0.5,
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}
                  />
                  <span
                    style={{
                      position: 'relative',
                      display: 'inline-flex',
                      borderRadius: '50%',
                      width: '10px',
                      height: '10px',
                      background: '#4ade80',
                    }}
                  />
                </span>
                <span
                  style={{
                    color: 'rgba(74, 222, 128, 0.6)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  Conectado
                </span>
              </div>
            )}
            <GoldButton
              onClick={toggleBluetooth}
              variant={bluetooth ? 'danger' : 'primary'}
              style={{ width: '100%' }}
            >
              {bluetooth ? 'Desconectar' : 'Parear Bluetooth'}
            </GoldButton>
          </div>

          {/* Mode */}
          <div
            style={{
              background: 'rgba(26, 26, 38, 0.6)',
              border: '1px solid rgba(196, 162, 78, 0.08)',
              borderRadius: '4px',
              padding: '1.25rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem',
              }}
            >
              {manualMode ? (
                <ToggleRight style={{ color: 'var(--color-gold)' }} size={22} />
              ) : (
                <ToggleLeft style={{ color: 'rgba(212, 196, 160, 0.3)' }} size={22} />
              )}
              <h4 style={{ margin: 0, color: 'rgba(196, 162, 78, 0.8)', fontSize: '0.8rem' }}>
                Modo de Operacao
              </h4>
            </div>
            <p style={{ color: 'rgba(212, 196, 160, 0.55)', fontSize: '0.85rem', margin: 0 }}>
              Modo Atual:{' '}
              <span style={{ color: 'rgba(224, 179, 102, 0.9)' }}>
                {manualMode ? 'Manual' : 'Automatico'}
              </span>
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '1rem',
                marginBottom: '1rem',
              }}
            >
              <span
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'rgba(196, 162, 78, 0.5)',
                }}
              />
              <span
                style={{
                  color: 'rgba(196, 162, 78, 0.5)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                {manualMode ? 'Controle direto' : 'IA ativa'}
              </span>
            </div>
            <GoldButton onClick={toggleMode} variant="ghost" style={{ width: '100%' }}>
              Alterar para {manualMode ? 'Automatico' : 'Manual'}
            </GoldButton>
          </div>
        </div>
      </OrnateFrame>

      <OrnateFrame>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}
        >
          <Info style={{ color: 'rgba(196, 162, 78, 0.6)' }} size={18} />
          <h3
            style={{
              margin: 0,
              color: 'var(--color-cream)',
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Guia Rapido
          </h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            'Bluetooth ativado permite receber dados do hardware em tempo real.',
            'Modo manual oferece controle de abertura da grade do Bloom.',
            'Modo automatico usa Neuro-Sync para recomendacoes e ajustes dinamicos.',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <span
                style={{ color: 'rgba(196, 162, 78, 0.4)', marginTop: '0.125rem', flexShrink: 0 }}
              >
                ◇
              </span>
              <p style={{ color: 'rgba(212, 196, 160, 0.55)', fontSize: '0.85rem', margin: 0 }}>
                {item}
              </p>
            </div>
          ))}
        </div>
      </OrnateFrame>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </article>
  );
}
