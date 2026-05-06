import { ReactNode } from 'react';

export function GoldButton({
  children,
  onClick,
  type = 'button',
  className = '',
  variant = 'primary',
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  variant?: 'primary' | 'ghost' | 'danger';
}) {
  const base =
    'relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm cursor-pointer transition-all duration-500 tracking-[0.15em] uppercase text-[0.75rem] font-[Cinzel] overflow-hidden group';

  const variants = {
    primary:
      'bg-gradient-to-r from-[#8b6914] via-[#c4a24e] to-[#8b6914] text-[#0a0a10] border border-gold/40 hover:shadow-[0_0_30px_rgba(196,162,78,0.35)] hover:border-gold/60',
    ghost:
      'bg-transparent text-parchment border border-gold/20 hover:bg-gold/10 hover:border-gold/40 hover:text-gold-light',
    danger:
      'bg-[rgba(139,32,32,0.3)] text-[#e0a0a0] border border-[rgba(139,32,32,0.4)] hover:bg-[rgba(139,32,32,0.5)] hover:border-[rgba(200,60,60,0.5)]',
  };

  return (
    <button type={type} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {/* Shimmer effect on primary */}
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
      <span className="relative">{children}</span>
    </button>
  );
}
