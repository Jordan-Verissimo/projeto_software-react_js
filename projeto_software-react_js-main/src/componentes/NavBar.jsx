import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const nav = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    nav('/login');
  };

  return (
    <nav className="navbar">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* Brand */}
        <a href="/" className="navbar-brand">
          <span className="navbar-brand-icon">✿</span>
          Hidden Bloom
        </a>

        {/* Desktop Menu */}
        <ul className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li className="navbar-menu-item">
            <NavLink 
              to="/quiz" 
              className={({ isActive }) => `navbar-menu-link ${isActive ? 'active' : ''}`}
            >
              Quiz
            </NavLink>
          </li>
          <li className="navbar-menu-item">
            <NavLink 
              to="/" 
              end 
              className={({ isActive }) => `navbar-menu-link ${isActive ? 'active' : ''}`}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="navbar-menu-item">
            <NavLink 
              to="/refils" 
              className={({ isActive }) => `navbar-menu-link ${isActive ? 'active' : ''}`}
            >
              Refils
            </NavLink>
          </li>
          <li className="navbar-menu-item">
            <NavLink 
              to="/device" 
              className={({ isActive }) => `navbar-menu-link ${isActive ? 'active' : ''}`}
            >
              Controle
            </NavLink>
          </li>
          <li className="navbar-menu-item">
            <NavLink 
              to="/marketplace" 
              className={({ isActive }) => `navbar-menu-link ${isActive ? 'active' : ''}`}
            >
              Marketplace
            </NavLink>
          </li>
          <li className="navbar-menu-item">
            <NavLink 
              to="/neuro-sync" 
              className={({ isActive }) => `navbar-menu-link ${isActive ? 'active' : ''}`}
            >
              Neuro-Sync
            </NavLink>
          </li>
          <li className="navbar-menu-item">
            <NavLink 
              to="/hardware" 
              className={({ isActive }) => `navbar-menu-link ${isActive ? 'active' : ''}`}
            >
              Hardware
            </NavLink>
          </li>
          <li className="navbar-menu-item">
            <NavLink 
              to="/slides" 
              className={({ isActive }) => `navbar-menu-link ${isActive ? 'active' : ''}`}
            >
              Slides
            </NavLink>
          </li>
        </ul>

        {/* Actions */}
        <div className="navbar-actions">
          <button 
            className="navbar-action-button" 
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="navbar-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}