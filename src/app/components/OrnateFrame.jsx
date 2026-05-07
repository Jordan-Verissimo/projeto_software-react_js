import { ReactNode } from 'react';

/** A decorative Art Nouveau card with ornate corner flourishes */
export function OrnateFrame({
  children,
  className = '',
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div className={`relative group ${className}`}>
      {/* Outer glow */}
      {glow && (
        <div className="absolute -inset-px rounded-sm bg-gradient-to-b from-gold/20 via-transparent to-gold/10 blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
      )}

      {/* Main card */}
      <div className="relative bg-[#0a0a10]/90 border border-gold/15 rounded-sm overflow-hidden backdrop-blur-sm">
        {/* Top ornamental border */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        {/* Corner flourishes */}
        <CornerFlourish position="top-left" />
        <CornerFlourish position="top-right" />
        <CornerFlourish position="bottom-left" />
        <CornerFlourish position="bottom-right" />

        {/* Content */}
        <div className="relative px-6 py-5 md:px-8 md:py-6">{children}</div>

        {/* Bottom ornamental border */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>
    </div>
  );
}

function CornerFlourish({
  position,
}: {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}) {
  const posClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 -scale-x-100',
    'bottom-left': 'bottom-0 left-0 -scale-y-100',
    'bottom-right': 'bottom-0 right-0 -scale-x-100 -scale-y-100',
  };

  return (
    <div className={`absolute ${posClasses[position]} pointer-events-none`}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="opacity-40">
        <path d="M0 0 L20 0 C12 2 4 8 2 16 L0 20 Z" fill="url(#cornerGrad)" />
        <path
          d="M0 0 L16 0 C10 1.5 3 6 1.5 12 L0 16 Z"
          fill="none"
          stroke="rgba(196,162,78,0.5)"
          strokeWidth="0.5"
        />
        <defs>
          <linearGradient id="cornerGrad" x1="0" y1="0" x2="20" y2="20">
            <stop offset="0%" stopColor="rgba(196,162,78,0.3)" />
            <stop offset="100%" stopColor="rgba(196,162,78,0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/** Ornate horizontal divider with Art Nouveau diamond motif */
export function OrnateDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-0 my-8 px-4 ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
      <svg width="80" height="20" viewBox="0 0 80 20" fill="none" className="mx-2 shrink-0">
        {/* Left wing */}
        <path
          d="M0 10 L15 8 L25 10 L15 12 Z"
          fill="none"
          stroke="rgba(196,162,78,0.4)"
          strokeWidth="0.6"
        />
        {/* Center diamond */}
        <path
          d="M30 4 L40 0 L50 4 L55 10 L50 16 L40 20 L30 16 L25 10 Z"
          fill="none"
          stroke="rgba(196,162,78,0.5)"
          strokeWidth="0.7"
        />
        <path
          d="M34 6 L40 3 L46 6 L49 10 L46 14 L40 17 L34 14 L31 10 Z"
          fill="rgba(196,162,78,0.1)"
          stroke="rgba(196,162,78,0.3)"
          strokeWidth="0.5"
        />
        {/* Center dot */}
        <circle cx="40" cy="10" r="2" fill="rgba(196,162,78,0.5)" />
        {/* Right wing */}
        <path
          d="M80 10 L65 8 L55 10 L65 12 Z"
          fill="none"
          stroke="rgba(196,162,78,0.4)"
          strokeWidth="0.6"
        />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
    </div>
  );
}

/** Small ornate star/fleur accent */
export function OrnateAccent({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className="inline-block">
      <path
        d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z"
        fill="rgba(196,162,78,0.6)"
      />
    </svg>
  );
}
