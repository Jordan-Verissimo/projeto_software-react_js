import { Outlet, Link } from 'react-router';
import { NavBar } from './NavBar';
import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';
import { OrnateAccent } from './OrnateFrame';
import { FallingPetals } from './FallingPetals';
import petalsImg from 'figma:asset/c1952ee419400d2f01d18583931a4166125b1ad6.png';
import brushImg from 'figma:asset/c4949f9859321613eaf56ae20f74908fb465abd0.png';

export function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-deep">
      {/* === CINEMATIC HERO === */}
      <header className="relative overflow-hidden">
        {/* Background: petals image with brush overlay */}
        <div className="absolute inset-0">
          <img src={petalsImg} alt="" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-deep/30 via-deep/60 to-deep" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep/70 via-transparent to-deep/70" />
          {/* Brush texture overlay for artistic edge */}
          <img
            src={brushImg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-40"
          />
          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{ boxShadow: 'inset 0 0 150px 60px rgba(6,6,8,0.9)' }}
          />
        </div>

        {/* Animated falling petals */}
        <FallingPetals />

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center text-center px-6 pt-14 pb-18 md:pt-20 md:pb-24">
          {/* Small decorative text */}
          <p className="font-[Cinzel] text-gold/50 tracking-[0.4em] uppercase text-[0.6rem] mb-3">
            L'Equipage 33 &middot; L'Oreal Luxe
          </p>

          {/* Main title */}
          <h1
            className="font-[Cinzel_Decorative] !text-gold-bright tracking-[0.15em] mb-2 drop-shadow-[0_0_30px_rgba(196,162,78,0.3)]"
            style={{ textShadow: '0 0 50px rgba(196,162,78,0.25), 0 2px 8px rgba(0,0,0,0.8)' }}
          >
            Hidden Bloom
          </h1>

          {/* Ornate divider under title */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/40" />
            <OrnateAccent size={12} />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/40" />
          </div>

          {/* Subtitle */}
          <p className="font-[Cormorant_Garamond] italic text-cream/80 text-lg md:text-xl tracking-wide max-w-xl mb-1">
            Wearable Neuro-Perfumery
          </p>
          <p className="text-parchment/50 text-[0.75rem] tracking-[0.18em] uppercase mb-8">
            High-End Neuro-Jewelry &middot; Art Nouveau &middot; Belle Epoque
          </p>

          {/* CTA */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link
              to="/quiz"
              className="relative inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-deep rounded-sm tracking-[0.2em] uppercase text-[0.7rem] font-[Cinzel] no-underline overflow-hidden group transition-all duration-500 hover:shadow-[0_0_40px_rgba(196,162,78,0.3)] border border-gold/50"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative">Descobrir Meu Perfume</span>
            </Link>
            {user && (
              <button
                onClick={logout}
                className="flex items-center gap-2 bg-transparent border border-gold/20 text-parchment px-5 py-2.5 rounded-sm text-[0.7rem] cursor-pointer hover:border-gold/40 hover:text-gold-light transition-all duration-300 uppercase tracking-[0.15em] font-[Cinzel]"
              >
                <LogOut size={13} /> {user.nome}
              </button>
            )}
          </div>
        </div>
      </header>

      <NavBar />

      {/* === MAIN CONTENT === */}
      <main className="flex-1 max-w-[1100px] w-full mx-auto px-4 py-6 md:py-10">
        <Outlet />
      </main>

      {/* === FOOTER === */}
      <footer className="relative mt-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="text-center py-8 px-4">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-px bg-gold/30" />
            <OrnateAccent size={10} />
            <span className="font-[Cinzel] text-gold/70 tracking-[0.2em] uppercase text-[0.7rem]">
              L'Oreal Bloom
            </span>
            <OrnateAccent size={10} />
            <div className="w-8 h-px bg-gold/30" />
          </div>
          <p className="text-parchment/40 text-[0.7rem] tracking-[0.1em]">
            &copy; 2026 L'Oreal Luxe Labs — Rede Neuro-Sync. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
