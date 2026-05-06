import { NavLink } from 'react-router';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { to: '/quiz', label: 'Quiz' },
  { to: '/', label: 'Dashboard', end: true },
  { to: '/refils', label: 'Refils' },
  { to: '/device', label: 'Controle' },
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/neuro-sync', label: 'Neuro-Sync' },
  { to: '/hardware', label: 'Hardware' },
  { to: '/login', label: 'Entrar' },
  { to: '/slides', label: 'Slides' },
];

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative mx-4 my-3">
      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="bg-[#0a0a10]/80 backdrop-blur-md border-x border-gold/10">
        <div className="flex items-center justify-between px-5 py-3 lg:hidden">
          <span className="font-[Cinzel] text-gold tracking-[0.2em] uppercase text-[0.8rem]">
            Navigation
          </span>
          <button
            onClick={() => setOpen(!open)}
            className="text-parchment bg-transparent border-none p-1 cursor-pointer"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <div
          className={`${open ? 'flex' : 'hidden'} lg:flex flex-wrap justify-center items-center gap-0 px-2 py-0`}
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `relative px-5 py-3.5 tracking-[0.18em] uppercase text-[0.7rem] font-[Cinzel] transition-all duration-500 no-underline text-center ` +
                (isActive ? 'text-gold-bright bg-gold/8 ' : 'text-parchment hover:text-gold-light ')
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10">{l.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-px bg-gold" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </nav>
  );
}
