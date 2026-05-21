import { useNavigate } from 'react-router-dom';
import { OrnateFrame } from '../componentes/OrnateFrame';
import { GoldButton } from '../componentes/GoldButton';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
      <OrnateFrame glow>
        <div
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            padding: '2rem',
            maxWidth: '500px',
          }}
        >
          <h1
            style={{
              fontFamily: "'Cinzel', serif",
              color: 'var(--color-gold)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontSize: '2rem',
            }}
          >
            404
          </h1>

          <h2
            style={{
              fontFamily: "'Cinzel', serif",
              color: 'var(--color-gold)',
              fontSize: '1.25rem',
              letterSpacing: '0.1em',
              marginBottom: '0.5rem',
            }}
          >
            Página não encontrada
          </h2>

          <p
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontStyle: 'italic',
              fontSize: '0.95rem',
              lineHeight: '1.6',
            }}
          >
            A página que você está procurando não existe ou foi removida. Retorne ao dashboard ou use a navegação para explorar o Hidden Bloom.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              marginTop: '1rem',
            }}
          >
            <GoldButton onClick={() => navigate('/')}>
              Voltar ao Dashboard
            </GoldButton>
          </div>
        </div>
      </OrnateFrame>
    </div>
  );
}
