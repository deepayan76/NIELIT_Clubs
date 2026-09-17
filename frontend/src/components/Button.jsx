import React from 'react';
import '../styles/Button.css';

export default function Button({
  children,
  variant = 'white',
  size = 'md',
  onClick,
  href,
  type = 'button',
  className = '',
  ariaLabel,
  disabled = false,
  ...props
}) {
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (onClick) {
      onClick(e);
    }
  };

  const btnClasses = `custom-btn btn-${variant} btn-${size} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={btnClasses}
        onClick={handleClick}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={btnClasses}
      onClick={handleClick}
      aria-label={ariaLabel}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
