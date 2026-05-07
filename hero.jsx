/* global React, Icon */
const { useState: useStateHero, useEffect: useEffectHero, useRef: useRefHero } = React;

function Hero({ discord, tagline }) {
  const skyRef = useRefHero();
  const m1Ref = useRefHero();
  const m2Ref = useRefHero();
  const riderRef = useRefHero();
  const sunRef = useRefHero();

  useEffectHero(() => {
    let raf = 0;
    let pending = false;
    const apply = () => {
      pending = false;
      const y = window.scrollY;
      if (y > window.innerHeight) return;
      if (skyRef.current) skyRef.current.style.transform = `translate3d(0, ${y * 0.15}px, 0)`;
      if (sunRef.current) sunRef.current.style.transform = `translate3d(-50%, calc(-50% + ${y * 0.25}px), 0)`;
      if (m1Ref.current) m1Ref.current.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
      if (m2Ref.current) m2Ref.current.style.transform = `translate3d(0, ${y * 0.04}px, 0)`;
      if (riderRef.current) riderRef.current.style.transform = `translate3d(0, ${y * -0.05}px, 0)`;
    };
    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(apply);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-sky" ref={skyRef} />
      <div className="hero-sun" ref={sunRef} />
      <div className="hero-mountains" ref={m1Ref} />
      <div className="hero-mountains-2" ref={m2Ref} />
      <div className="hero-ground" />

      {/* Lone rider silhouette */}
      <svg className="hero-rider" ref={riderRef} viewBox="0 0 280 220" fill="#000" aria-hidden="true">
        <path d="M60 150 L60 130 Q70 118 90 118 L160 118 Q175 118 180 128 L195 128 Q205 128 208 134 L210 150 L205 150 L200 142 L188 142 L182 150 L170 150 L165 142 L155 142 L150 165 L142 165 L142 150 L100 150 L100 165 L92 165 L92 150 L80 150 L78 162 L72 162 L72 150 Z"/>
        <path d="M60 130 Q50 120 48 105 Q47 95 55 92 L62 88 Q66 86 70 90 L72 96 L68 100 L70 108 L78 112 L80 118 Z"/>
        <path d="M58 100 L52 95 L58 110 L54 118 L62 112 Z" />
        <path d="M205 132 Q220 138 222 155 Q220 165 215 162 Q218 152 210 145 Z"/>
        <rect x="78" y="150" width="4" height="18"/>
        <rect x="98" y="150" width="4" height="18"/>
        <rect x="148" y="150" width="4" height="18"/>
        <rect x="168" y="150" width="4" height="18"/>
        <path d="M115 80 Q115 70 125 68 L135 68 Q145 68 148 78 L150 95 Q150 105 145 112 L138 118 L120 118 L114 110 L112 95 Z"/>
        <path d="M114 95 L100 105 L75 100" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M105 64 Q105 56 130 54 Q155 56 155 64 L150 67 Q145 60 130 60 Q115 60 110 67 Z"/>
        <path d="M115 54 Q120 44 130 44 Q140 44 145 54 L143 64 L117 64 Z"/>
        <rect x="148" y="85" width="32" height="2.5" transform="rotate(-15 148 85)"/>
      </svg>

      <div className="vignette" />

      <div className="hero-content">
        <div className="eyebrow">EST. 1890 — RED DEAD ROLEPLAY</div>
        <h1 className="hero-title">
          Sunny<span className="west">Western</span>
        </h1>
        <div className="hero-tag">⋆ NEW HANOVER · LEMOYNE · WEST ELIZABETH ⋆</div>
        <p className="hero-sub">
          {tagline || "Le soleil se couche sur une frontière sans loi. Ramasse ton chapeau, scelle ton cheval — l'Ouest n'attend personne."}
        </p>
        <div className="hero-cta">
          <a className="btn btn-primary" href={discord} target="_blank" rel="noreferrer noopener">
            <Icon.Discord size={16} /> Rejoindre le Discord
          </a>
          <a className="btn btn-ghost" href="#lore">
            Découvrir le serveur <Icon.Arrow size={14} />
          </a>
        </div>
      </div>

      <a className="scroll-cue" href="#live-strip" aria-label="Faire défiler">Scroll</a>
    </section>
  );
}

window.Hero = Hero;
