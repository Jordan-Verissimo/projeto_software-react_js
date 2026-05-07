import { Outlet } from 'react-router-dom';
import { NavBar } from './app/components/NavBar';
import { FallingPetals } from './app/components/FallingPetals';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <header className="hero">
        <FallingPetals />

        <div className="hero-overlay">
          <div className="hero-top-text">L'ÉQUIPAGE 33 · L'ORÉAL LUXE</div>

          <div className="hero-content">
            <h1>HIDDEN BLOOM</h1>

            <div className="hero-divider">— + —</div>

            <p className="hero-subtitle">Wearable Neuro-Perfumery</p>

            <p className="hero-description">HIGH-END NEURO-JEWELRY · ART NOUVEAU · BELLE ÉPOQUE</p>

            <a href="/" className="cta">
              DESCOBRIR MEU PERFUME
            </a>
          </div>
        </div>
      </header>

      <NavBar />

      <main className="content">
        <Outlet />
      </main>

      <footer className="footer">
        <div>
          <strong>L'Équipage 33</strong> · Hidden Bloom · ™
        </div>
        <small>© 2026 L'Oréal Luxe Labs — Rede Neuro-Sync. Todos os direitos reservados.</small>
      </footer>
    </div>
  );
}

export default App;
