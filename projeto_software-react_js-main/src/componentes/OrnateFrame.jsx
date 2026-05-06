import React from 'react';
import PropTypes from 'prop-types';

export function OrnateFrame({
  children,
  className = '',
  glow = false,
  style = {},
}) {
  const frameClass = `relative group ${className}`.trim();
  
  return (
    <div className={frameClass} style={style}>
      {/* Outer glow */}
      {glow && (
        <div
          style={{
            position: 'absolute',
            inset: '-1px',
            borderRadius: 'var(--radius)',
            background: 'linear-gradient(to bottom, rgba(196, 162, 78, 0.2), transparent, rgba(196, 162, 78, 0.1))',
            filter: 'blur(4px)',
            opacity: 0.6,
            transition: 'opacity var(--transition-slow)',
            pointerEvents: 'none',
          }}
          className="group-hover:opacity-80"
        />
      )}

      {/* Main card */}
      <div
        style={{
          position: 'relative',
          background: 'var(--color-deep-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Top ornamental border */}
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(196, 162, 78, 0.5), transparent)',
          }}
        />

        {/* Corner flourishes */}
        <CornerFlourish position="top-left" />
        <CornerFlourish position="top-right" />
        <CornerFlourish position="bottom-left" />
        <CornerFlourish position="bottom-right" />

        {/* Content */}
        <div style={{ position: 'relative', padding: '1.5rem' }}>
          {children}
        </div>

        {/* Bottom ornamental border */}
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(196, 162, 78, 0.3), transparent)',
          }}
        />
      </div>
    </div>
  );
}

OrnateFrame.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  glow: PropTypes.bool,
  style: PropTypes.object,
};

function CornerFlourish({ position }) {
  const posStyle = {
    'top-left': { top: 0, left: 0, transform: 'none' },
    'top-right': { top: 0, right: 0, transform: 'scaleX(-1)' },
    'bottom-left': { bottom: 0, left: 0, transform: 'scaleY(-1)' },
    'bottom-right': { bottom: 0, right: 0, transform: 'scaleX(-1) scaleY(-1)' },
  };

  return (
    <div
      style={{
        position: 'absolute',
        ...posStyle[position],
        pointerEvents: 'none',
      }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M0 0 L20 0 C12 2 4 8 2 16 L0 20 Z" fill="url(#cornerGrad)" />
        <path d="M0 0 L16 0 C10 1.5 3 6 1.5 12 L0 16 Z" fill="none" stroke="rgba(196,162,78,0.5)" strokeWidth="0.5" />
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

CornerFlourish.propTypes = {
  position: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right']),
};

/** Ornate horizontal divider with Art Nouveau diamond motif */
export function OrnateDivider({ className = '' }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
        margin: '2rem 1rem',
        padding: 0,
      }}
      className={className}
    >
      <div
        style={{
          height: '1px',
          flex: 1,
          background: 'linear-gradient(to right, transparent, rgba(196, 162, 78, 0.3))',
        }}
      />
      <svg width="80" height="20" viewBox="0 0 80 20" fill="none" style={{ margin: '0 0.5rem', flexShrink: 0 }}>
        {/* Left wing */}
        <path d="M0 10 L15 8 L25 10 L15 12 Z" fill="none" stroke="rgba(196,162,78,0.4)" strokeWidth="0.6" />
        {/* Center diamond */}
        <path d="M30 4 L40 0 L50 4 L55 10 L50 16 L40 20 L30 16 L25 10 Z" fill="none" stroke="rgba(196,162,78,0.5)" strokeWidth="0.7" />
        <path d="M34 6 L40 3 L46 6 L49 10 L46 14 L40 17 L34 14 L31 10 Z" fill="rgba(196,162,78,0.1)" stroke="rgba(196,162,78,0.3)" strokeWidth="0.5" />
        {/* Center dot */}
        <circle cx="40" cy="10" r="2" fill="rgba(196,162,78,0.5)" />
        {/* Right wing */}
        <path d="M80 10 L65 8 L55 10 L65 12 Z" fill="none" stroke="rgba(196,162,78,0.4)" strokeWidth="0.6" />
      </svg>
      <div
        style={{
          height: '1px',
          flex: 1,
          background: 'linear-gradient(to left, transparent, rgba(196, 162, 78, 0.3))',
        }}
      />
    </div>
  );
}

OrnateDivider.propTypes = {
  className: PropTypes.string,
};

/** Small ornate star/fleur accent */
export function OrnateAccent({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ display: 'inline-block' }}>
      <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" fill="rgba(196,162,78,0.6)" />
    </svg>
  );
}

OrnateAccent.propTypes = {
  size: PropTypes.number,
};