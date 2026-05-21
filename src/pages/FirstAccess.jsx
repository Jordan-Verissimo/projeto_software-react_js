import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { OrnateFrame, OrnateAccent } from '../componentes/OrnateFrame';
import { GoldButton } from '../componentes/GoldButton';
import { KeyRound, ShieldCheck } from 'lucide-react';

export default function FirstAccess() {
  const [senha, setSenha] = useState('');
  const [conf, setConf] = useState('');
  const [erro, setErro] = useState('');
  const nav = useNavigate();
  const { changePassword } = useAuth();

  async function onSubmit(e) {
    e.preventDefault();
    setErro('');
    if (senha.length < 6) {
      setErro('A senha deve ter ao menos 6 caracteres');
      return;
    }
    if (senha !== conf) {
      setErro('Senhas nao conferem.');
      return;
    }
    try {
      await changePassword(senha);
      alert('Senha alterada com sucesso.');
      nav('/');
    } catch (err) {
      setErro(err.message || 'Erro ao alterar senha');
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <OrnateFrame glow style={{ maxWidth: '560px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <ShieldCheck
            style={{
              color: 'rgba(196, 162, 78, 0.5)',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '0.75rem',
            }}
            size={28}
          />
          <h2
            style={{
              fontSize: '1.5rem',
              color: 'var(--color-cream)',
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Primeiro Acesso
          </h2>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              marginTop: '0.5rem',
              marginBottom: '0.75rem',
            }}
          >
            <div style={{ width: '32px', height: '1px', background: 'rgba(196, 162, 78, 0.3)' }} />
            <OrnateAccent size={10} />
            <div style={{ width: '32px', height: '1px', background: 'rgba(196, 162, 78, 0.3)' }} />
          </div>
          <p
            style={{ color: 'rgba(212, 196, 160, 0.55)', fontSize: '0.85rem', marginTop: '0.5rem' }}
          >
            Configure sua primeira senha para conectar ao Hidden Bloom.
          </p>
        </div>

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'rgba(196, 162, 78, 0.6)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
                fontFamily: "'Cinzel', serif",
              }}
            >
              <KeyRound size={12} /> Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '4px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(196, 162, 78, 0.12)',
                color: 'var(--color-cream)',
                fontSize: '0.9rem',
                fontFamily: "'Raleway', sans-serif",
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(196, 162, 78, 0.3)';
                e.target.style.boxShadow = '0 0 15px rgba(196, 162, 78, 0.08)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(196, 162, 78, 0.12)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'rgba(196, 162, 78, 0.6)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
                fontFamily: "'Cinzel', serif",
              }}
            >
              <KeyRound size={12} /> Confirmar senha
            </label>
            <input
              type="password"
              value={conf}
              onChange={(e) => setConf(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '4px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(196, 162, 78, 0.12)',
                color: 'var(--color-cream)',
                fontSize: '0.9rem',
                fontFamily: "'Raleway', sans-serif",
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(196, 162, 78, 0.3)';
                e.target.style.boxShadow = '0 0 15px rgba(196, 162, 78, 0.08)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(196, 162, 78, 0.12)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {erro && (
            <div
              style={{
                background: 'rgba(139, 32, 32, 0.3)',
                border: '1px solid rgba(139, 32, 32, 0.4)',
                color: 'rgba(229, 87, 87, 0.8)',
                borderRadius: '4px',
                padding: '0.75rem 1rem',
                fontSize: '0.8rem',
              }}
            >
              {erro}
            </div>
          )}

          <GoldButton type="submit" variant="primary" style={{ width: '100%' }}>
            Salvar e Iniciar Jornada
          </GoldButton>
        </form>

        <p
          style={{
            color: 'rgba(212, 196, 160, 0.35)',
            fontSize: '0.75rem',
            marginTop: '1rem',
            textAlign: 'center',
            fontStyle: 'italic',
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          Dica: use senha longa e unica para proteger seus dados de biometria de alto valor.
        </p>
      </OrnateFrame>
    </div>
  );
}
