import React from 'react';
import PropTypes from 'prop-types';

export function GoldButton({
  children,
  onClick,
  type = 'button',
  className = '',
  variant = 'primary',
  disabled = false,
  ...props
}) {
  const buttonClass = `gold-button ${variant} ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClass}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

GoldButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'ghost', 'danger']),
  disabled: PropTypes.bool,
};