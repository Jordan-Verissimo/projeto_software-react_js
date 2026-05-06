import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import bracelet1 from 'figma:asset/b27da97e706aee9eb646f808ff1d48b7e7b65926.png';
import bracelet2 from 'figma:asset/5a77af4cb1fdc2a650ca82afa1743bef73ebc9a4.png';
import bracelet3 from 'figma:asset/36db0ebe9c64b4b4552ced8a4c1eda174071faf1.png';
import elosImg from 'figma:asset/f5115753009e6c471b46335fcf40fec47871474e.png';

const bracelets = [
  {
    src: bracelet1,
    name: 'Edition Rutenio',
    desc: 'Aco 316L com banho de rutenio escuro. Estilo discreto e contemporaneo.',
  },
  {
    src: bracelet2,
    name: 'Edition Bleu Nuit',
    desc: 'Aco 316L com esmalte Grand Feu azul profundo. Elegancia noturna.',
  },
  {
    src: bracelet3,
    name: 'Edition Or Rose',
    desc: 'Aco 316L com banho de ouro rose. Refinamento classico Belle Epoque.',
  },
];

export function BraceletGallery() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % bracelets.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoplay]);

  const go = (dir: number) => {
    setAutoplay(false);
    setActive((prev) => (prev + dir + bracelets.length) % bracelets.length);
  };

  const b = bracelets[active];

  return (
    <div className="space-y-6">
      {/* Main carousel */}
      <div className="relative">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-gold/10 bg-[#080604]">
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={b.src}
              alt={b.name}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Overlay info */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#060608]/95 via-[#060608]/60 to-transparent p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <h4 className="text-gold-bright text-[0.85rem] mb-1">{b.name}</h4>
                <p className="text-parchment/60 text-[0.8rem]">{b.desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrows */}
          <button
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-deep/60 border border-gold/20 flex items-center justify-center text-gold/60 hover:text-gold hover:border-gold/40 transition-all cursor-pointer backdrop-blur-sm"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-deep/60 border border-gold/20 flex items-center justify-center text-gold/60 hover:text-gold hover:border-gold/40 transition-all cursor-pointer backdrop-blur-sm"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-3">
          {bracelets.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setAutoplay(false);
                setActive(i);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-400 border-none cursor-pointer ${
                i === active ? 'bg-gold w-6' : 'bg-gold/20 hover:bg-gold/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail selector */}
      <div className="grid grid-cols-3 gap-3">
        {bracelets.map((item, i) => (
          <button
            key={i}
            onClick={() => {
              setAutoplay(false);
              setActive(i);
            }}
            className={`relative overflow-hidden rounded-sm border transition-all duration-400 cursor-pointer bg-transparent p-0 ${
              i === active
                ? 'border-gold/50 shadow-[0_0_15px_rgba(196,162,78,0.15)]'
                : 'border-gold/10 opacity-60 hover:opacity-80'
            }`}
          >
            <img src={item.src} alt={item.name} className="w-full aspect-[4/3] object-cover" />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#060608]/90 to-transparent p-2">
              <span className="font-[Cinzel] text-[0.55rem] tracking-[0.1em] text-gold/80 uppercase">
                {item.name}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Elos section */}
      <div>
        <p className="font-[Cinzel] text-gold/50 tracking-[0.2em] uppercase text-[0.6rem] mb-3 text-center">
          Elos Esmalte Grand Feu Champleve
        </p>
        <img
          src={elosImg}
          alt="Elos de fragrancia com esmalte Grand Feu"
          className="w-full rounded-sm border border-gold/10"
        />
        <p className="text-parchment/50 text-[0.8rem] text-center mt-3 max-w-lg mx-auto">
          6 designs unicos em 3 acabamentos (Rutenio, Or Rose, Ouro Velho). Tecnica Champleve
          francesa — fundicao de vidro em po no metal para detalhes artisticos inspirados em vitrais
          classicos.
        </p>
      </div>
    </div>
  );
}
