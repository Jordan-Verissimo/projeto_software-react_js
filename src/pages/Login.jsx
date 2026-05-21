import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GoldButton } from '../componentes/GoldButton';
import { OrnateFrame, OrnateAccent } from '../componentes/OrnateFrame';
import { LogIn, KeyRound, Mail } from 'lucide-react';

export default function Login() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const nav = useNavigate();
  const { login: doLogin } = useAuth();

  async function onSubmit(e) {
    e.preventDefault();
    setErro('');
    try {
      const u = await doLogin(login, senha);
      // Navegar baseado no status de primeiro acesso
      nav(u.primeiroAcesso ? '/first-access' : '/');
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 20%, rgba(26, 26, 38, 0.8), rgba(11, 15, 26, 0.9), rgba(5, 7, 8, 1))',
            zIndex: 1,
          }}
        />
      </div>

      {/* Card Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '560px',
        }}
      >
        <OrnateFrame glow>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            {/* Header */}
            <p
              style={{
                fontFamily: "'Cinzel', serif",
                color: 'rgba(196, 162, 78, 0.5)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontSize: '0.55rem',
                marginBottom: '0.75rem',
              }}
            >
              L'Equipage 33
            </p>

            <h1
              style={{
                fontSize: '2rem',
                marginBottom: '0.5rem',
                color: 'var(--color-cream)',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Hidden Bloom
            </h1>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{ width: '2.5rem', height: '1px', background: 'rgba(196, 162, 78, 0.3)' }}
              />
              <OrnateAccent size={10} />
              <div
                style={{ width: '2.5rem', height: '1px', background: 'rgba(196, 162, 78, 0.3)' }}
              />
            </div>

            <p
              style={{
                color: 'rgba(212, 196, 160, 0.5)',
                fontSize: '0.8rem',
              }}
            >
              Faça login para acessar o ecossistema
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            {/* Email Field */}
            <div className="form-group">
              <label className="label">
                <Mail size={12} /> E-mail L'Oreal
              </label>
              <input
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
                className="input"
                placeholder="seu.login"
                type="email"
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="label">
                <KeyRound size={12} /> Senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="input"
                placeholder="••••••••"
              />
            </div>

            {/* Error Message */}
            {erro && (
              <div className="alert error">
                <span>⚠</span>
                {erro}
              </div>
            )}

            {/* Submit Button */}
            <GoldButton type="submit" className="mt-4">
              <LogIn size={15} /> Acessar
            </GoldButton>
          </form>

          {/* Footer */}
          <p
            style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              color: 'rgba(212, 196, 160, 0.4)',
              fontSize: '0.8rem',
            }}
          >
            Primeiro acesso?{' '}
            <Link
              to="/first-access"
              style={{
                color: 'rgba(196, 162, 78, 0.7)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(196, 162, 78, 0.2)',
                transition: 'all var(--transition-base)',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'var(--color-gold-light)';
                e.target.style.borderColor = 'rgba(196, 162, 78, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(196, 162, 78, 0.7)';
                e.target.style.borderColor = 'rgba(196, 162, 78, 0.2)';
              }}
            >
              Configure sua senha
            </Link>
          </p>

          <div
            style={{
              height: '1px',
              background:
                'linear-gradient(to right, transparent, rgba(196, 162, 78, 0.2), transparent)',
              margin: '1.5rem 0',
            }}
          />

          <p
            style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              color: 'rgba(212, 196, 160, 0.25)',
              fontSize: '0.7rem',
              letterSpacing: '0.05em',
            }}
          >
            Usuarios de teste: admin / ana / joao — Senha: 123456
          </p>
        </OrnateFrame>
      </div>
    </div>
  );
}
