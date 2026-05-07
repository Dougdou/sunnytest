/* global React */
const { useState, useEffect, useRef } = React;

/* ===== Reveal-on-scroll hook ===== */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ===== Tiny SVG icon set ===== */
const Icon = {
  Star: ({ size = 18, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2 L14.6 8.6 L21.6 9.2 L16.3 13.8 L17.9 20.6 L12 17 L6.1 20.6 L7.7 13.8 L2.4 9.2 L9.4 8.6 Z"/>
    </svg>
  ),
  Coins: ({ size = 56 }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4">
      <ellipse cx="22" cy="22" rx="14" ry="6"/>
      <path d="M8 22 V32 C8 35.3 14.3 38 22 38 C29.7 38 36 35.3 36 32 V22"/>
      <path d="M8 32 V42 C8 45.3 14.3 48 22 48 C29.7 48 36 45.3 36 42 V32"/>
      <ellipse cx="42" cy="36" rx="14" ry="6"/>
      <path d="M28 36 V46 C28 49.3 34.3 52 42 52 C49.7 52 56 49.3 56 46 V36"/>
    </svg>
  ),
  Hammer: ({ size = 56 }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="8" y="14" width="28" height="14" rx="1"/>
      <path d="M36 17 L52 13 L56 17 L52 21 L36 25 Z"/>
      <path d="M22 28 L18 56" strokeLinecap="round"/>
      <circle cx="44" cy="17" r="1.5" fill="currentColor"/>
    </svg>
  ),
  Flame: ({ size = 56 }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M32 8 C 36 18 44 22 44 34 C 44 44 38 52 32 52 C 26 52 20 44 20 34 C 20 28 24 24 24 18 C 28 22 28 28 32 26 C 30 20 32 14 32 8 Z"/>
      <path d="M32 30 C 34 36 38 38 38 42 C 38 46 35 50 32 50 C 29 50 26 46 26 42 C 26 38 30 36 32 30 Z"/>
    </svg>
  ),
  Mask: ({ size = 56 }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M8 24 C 8 20 12 18 16 18 L48 18 C 52 18 56 20 56 24 L56 32 C 56 38 50 44 42 44 L36 44 L32 50 L28 44 L22 44 C 14 44 8 38 8 32 Z"/>
      <circle cx="22" cy="30" r="3" fill="currentColor"/>
      <circle cx="42" cy="30" r="3" fill="currentColor"/>
      <path d="M28 36 L36 36"/>
    </svg>
  ),
  Arrow: ({ dir = 'right', size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      style={{ transform: dir === 'left' ? 'rotate(180deg)' : 'none' }}>
      <path d="M5 12 L19 12 M13 6 L19 12 L13 18" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Discord: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25a.08.08 0 0 1 .08-.01c3.44 1.57 7.15 1.57 10.55 0a.08.08 0 0 1 .08.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/>
    </svg>
  )
};

window.useReveal = useReveal;
window.Icon = Icon;
