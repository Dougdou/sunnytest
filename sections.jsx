/* global React, Icon, LoginButton */
const { useState: useS, useEffect: useE, useRef: useR } = React;

/* ===== Live counter strip ===== */
function LiveStrip() {
  const [players, setPlayers] = useS(0);
  const [queue, setQueue] = useS(0);
  const TARGET_PLAYERS = 187;
  const TARGET_QUEUE = 12;

  useE(() => {
    let raf;
    let start = null;
    const dur = 1800;
    const animate = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setPlayers(Math.floor(TARGET_PLAYERS * eased));
      setQueue(Math.floor(TARGET_QUEUE * eased));
      if (p < 1) raf = requestAnimationFrame(animate);
    };

    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        raf = requestAnimationFrame(animate);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    const el = document.getElementById('live-strip');
    if (el) io.observe(el);
    return () => { if (raf) cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  // gentle wobble after load
  useE(() => {
    const id = setInterval(() => {
      setPlayers(p => p ? Math.max(150, Math.min(220, p + (Math.random() < 0.5 ? -1 : 1))) : p);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div id="live-strip" className="live-strip">
      <div className="wrap">
        <div className="live-strip-inner">
          <div className="live-stat">
            <div className="live-stat-num"><span className="dot"></span>{players}<span style={{color: 'var(--ink-dim)', fontSize: '0.55em'}}> /225</span></div>
            <div className="live-stat-label">Hors-la-loi en piste</div>
          </div>
          <div className="live-stat">
            <div className="live-stat-num">{queue}</div>
            <div className="live-stat-label">En file d'attente</div>
          </div>
          <div className="live-stat">
            <div className="live-stat-num">7</div>
            <div className="live-stat-label">Jours sur 7</div>
          </div>
          <div className="live-stat">
            <div className="live-stat-num">36</div>
            <div className="live-stat-label">Mois d'activité</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Lore ===== */
function Lore() {
  return (
    <section className="lore" id="lore">
      <div className="wrap">
        <div className="lore-grid">
          <div className="lore-text reveal">
            <div className="eyebrow left">CHAPITRE I — LE LORE</div>
            <h2>Une terre <span className="accent">qu'on ne dompte pas.</span></h2>
            <p>
              Sunnywestern n'est pas un serveur de plus — c'est un comté entier qu'on a relevé pierre par pierre. De Saint Denis à Tumbleweed, chaque saloon a son histoire, chaque shérif a ses dettes, et chaque chemin de fer cache un coup à monter.
            </p>
            <p>
              Ici, le RP n'est pas une option. C'est l'air qu'on respire. On ne tire pas sans parler. On ne meurt pas sans testament. Et on ne devient personne sans avoir vécu quelque chose.
            </p>
            <p style={{color: 'var(--accent)', fontStyle: 'italic', fontFamily: "'IM Fell English', serif"}}>
              — Bienvenue dans l'Ouest. Le vrai.
            </p>
          </div>

          <div className="lore-card reveal">
            <svg className="lore-card-glyph" viewBox="0 0 200 200" fill="none" stroke="#c9a36a" strokeWidth="1.4">
              <circle cx="100" cy="100" r="92"/>
              <circle cx="100" cy="100" r="78"/>
              <path d="M100 14 L116 78 L182 86 L132 124 L150 188 L100 152 L50 188 L68 124 L18 86 L84 78 Z"/>
              <text x="100" y="106" textAnchor="middle" fontFamily="Rye, serif" fontSize="14" fill="#c9a36a">SUNNYWESTERN</text>
            </svg>
            <div className="lore-card-stamp">No. 1890</div>
            <div className="lore-card-meta">Charte fondatrice · Whitelist · FR</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Features ===== */
function Features() {
  const items = [
    {
      n: '01',
      icon: <Icon.Coins />,
      title: 'Économie vivante',
      text: "Chaque dollar a une origine. Banques, créanciers, contrebande, marchés noirs. L'argent circule, se vole, se mérite — jamais ne tombe du ciel.",
      tags: ['Banque', 'Marché noir', 'Inflation dynamique']
    },
    {
      n: '02',
      icon: <Icon.Hammer />,
      title: 'Métiers complets',
      text: "Forgeron, télégraphiste, médecin, marshal, fossoyeur, chasseur de primes. Plus de 20 jobs scénarisés avec progression, outils dédiés et clients.",
      tags: ['Whitelist métiers', 'Progression', 'Outils RP']
    },
    {
      n: '03',
      icon: <Icon.Flame />,
      title: 'Événements scénarisés',
      text: "Procès publics, attaques de diligence, foires de bétail, incendies de prairie. Le staff écrit l'histoire chaque semaine — toi tu y joues.",
      tags: ['Hebdomadaire', 'Cross-faction', 'Conséquences']
    },
    {
      n: '04',
      icon: <Icon.Mask />,
      title: 'RP réaliste',
      text: "Survie active, fatigue, blessures à long terme, médecine d'époque, courrier postal manuel. Pas de mini-map qui te tient la main.",
      tags: ['Survie', 'Permadeath opt-in', 'Hardcore RP']
    },
  ];
  return (
    <section className="features" id="features">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">CE QUI FAIT LA DIFFÉRENCE</div>
          <h2>Quatre piliers, <br />une seule frontière.</h2>
          <p className="lede">Pas de gimmicks. Pas de pay-to-win. Juste des systèmes profonds que des centaines de joueurs habitent chaque soir.</p>
        </div>

        <div className="features-grid reveal">
          {items.map(it => (
            <div className="feat" key={it.n}>
              <div className="feat-num">— {it.n}</div>
              <div className="feat-icon">{it.icon}</div>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
              <ul className="feat-list">
                {it.tags.map(t => <li key={t}>{t}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Gallery / Carousel ===== */
const SHOTS = [
  { tag: 'Saint-Denis', title: 'Le Quartier Français à l\'aube', hue: 220, accent: '#c9a36a', kind: 'city' },
  { tag: 'Big Valley', title: 'Convoi vers Strawberry', hue: 30, accent: '#d97520', kind: 'plains' },
  { tag: 'Tumbleweed', title: 'Duel sous le clocher', hue: 18, accent: '#8b1a0e', kind: 'desert' },
  { tag: 'Annesburg', title: 'Mineurs en grève', hue: 200, accent: '#5a7a8b', kind: 'mine' },
  { tag: 'Bayou Nwa', title: 'La nuit des chasseurs', hue: 140, accent: '#3a5a3a', kind: 'swamp' },
  { tag: 'Valentine', title: 'Foire au bétail du dimanche', hue: 35, accent: '#b8843a', kind: 'plains' },
];

function ShotArt({ kind, accent }) {
  // Stylized western placeholder per scene type
  if (kind === 'city') {
    return (
      <svg className="shot-art" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="cg1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a2818"/><stop offset="50%" stopColor="#1a0e07"/><stop offset="100%" stopColor="#0a0604"/>
          </linearGradient>
          <radialGradient id="cg2" cx="50%" cy="40%"><stop offset="0%" stopColor={accent} stopOpacity="0.5"/><stop offset="100%" stopColor={accent} stopOpacity="0"/></radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#cg1)"/>
        <circle cx="600" cy="180" r="180" fill="url(#cg2)"/>
        <circle cx="600" cy="180" r="40" fill={accent} opacity="0.7"/>
        {/* skyline */}
        <g fill="#000">
          <rect x="0" y="320" width="80" height="180"/>
          <polygon points="80,300 130,260 130,500 80,500"/>
          <rect x="130" y="280" width="100" height="220"/>
          <polygon points="230,260 280,240 280,500 230,500"/>
          <rect x="280" y="240" width="60" height="260"/>
          <polygon points="340,260 400,230 460,260 460,500 340,500"/>
          <rect x="460" y="290" width="120" height="210"/>
          <rect x="500" y="240" width="20" height="50"/>
          <polygon points="580,310 640,270 640,500 580,500"/>
          <rect x="640" y="290" width="90" height="210"/>
          <rect x="730" y="270" width="70" height="230"/>
        </g>
        {/* windows glow */}
        <g fill={accent} opacity="0.65">
          <rect x="20" y="360" width="6" height="10"/><rect x="40" y="360" width="6" height="10"/>
          <rect x="20" y="400" width="6" height="10"/><rect x="60" y="380" width="6" height="10"/>
          <rect x="160" y="320" width="5" height="9"/><rect x="200" y="340" width="5" height="9"/>
          <rect x="300" y="280" width="4" height="8"/><rect x="320" y="300" width="4" height="8"/>
          <rect x="500" y="320" width="6" height="10"/><rect x="540" y="340" width="6" height="10"/>
          <rect x="660" y="320" width="5" height="9"/><rect x="700" y="340" width="5" height="9"/>
          <rect x="750" y="320" width="5" height="9"/><rect x="780" y="340" width="5" height="9"/>
        </g>
      </svg>
    );
  }
  if (kind === 'plains') {
    return (
      <svg className="shot-art" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="pg1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a1810"/><stop offset="40%" stopColor="#5a2a10"/><stop offset="70%" stopColor={accent} stopOpacity="0.5"/><stop offset="100%" stopColor="#1a0e07"/>
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#pg1)"/>
        <circle cx="400" cy="280" r="60" fill={accent} opacity="0.85"/>
        {/* distant hills */}
        <path d="M0 350 Q200 320 400 340 T800 330 L800 500 L0 500 Z" fill="#1a0a05" opacity="0.7"/>
        <path d="M0 400 Q150 380 300 395 T600 390 T800 395 L800 500 L0 500 Z" fill="#0a0503"/>
        {/* wagon caravan */}
        <g fill="#000" transform="translate(280 390)">
          <rect x="0" y="0" width="50" height="20"/>
          <path d="M0 0 Q25 -22 50 0 Z" fill="#2a1810"/>
          <circle cx="8" cy="20" r="5"/><circle cx="42" cy="20" r="5"/>
          <rect x="-18" y="6" width="18" height="2"/>
          {/* horse */}
          <rect x="-30" y="5" width="14" height="10"/>
          <rect x="-32" y="4" width="4" height="6"/>
          <rect x="-28" y="15" width="2" height="6"/><rect x="-19" y="15" width="2" height="6"/>
        </g>
        <g fill="#000" transform="translate(380 395) scale(0.85)">
          <rect x="0" y="0" width="50" height="20"/>
          <path d="M0 0 Q25 -22 50 0 Z" fill="#2a1810"/>
          <circle cx="8" cy="20" r="5"/><circle cx="42" cy="20" r="5"/>
        </g>
      </svg>
    );
  }
  if (kind === 'desert') {
    return (
      <svg className="shot-art" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="dg1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a1a08"/><stop offset="60%" stopColor={accent} stopOpacity="0.4"/><stop offset="100%" stopColor="#1a0805"/>
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#dg1)"/>
        <circle cx="400" cy="240" r="80" fill="#f0a040" opacity="0.6"/>
        <circle cx="400" cy="240" r="35" fill="#f0a040"/>
        {/* mesa */}
        <path d="M0 380 L120 380 L140 320 L260 320 L280 380 L800 380 L800 500 L0 500 Z" fill="#1a0a04"/>
        <path d="M500 380 L520 350 L640 350 L660 380 Z" fill="#0a0503"/>
        {/* two duel silhouettes */}
        <g fill="#000" transform="translate(280 360)">
          <ellipse cx="0" cy="20" rx="14" ry="3"/>
          <rect x="-3" y="-30" width="6" height="50"/>
          <rect x="-8" y="-36" width="16" height="6"/>
          <path d="M-12 -38 Q0 -44 12 -38 L8 -36 L-8 -36 Z"/>
          <rect x="3" y="-15" width="14" height="2"/>
        </g>
        <g fill="#000" transform="translate(520 360)">
          <ellipse cx="0" cy="20" rx="14" ry="3"/>
          <rect x="-3" y="-30" width="6" height="50"/>
          <rect x="-8" y="-36" width="16" height="6"/>
          <path d="M-12 -38 Q0 -44 12 -38 L8 -36 L-8 -36 Z"/>
          <rect x="-17" y="-15" width="14" height="2"/>
        </g>
        {/* tumbleweed */}
        <circle cx="380" cy="430" r="14" fill="none" stroke="#3a2010" strokeWidth="1.5"/>
        <circle cx="380" cy="430" r="9" fill="none" stroke="#3a2010" strokeWidth="1"/>
      </svg>
    );
  }
  if (kind === 'mine') {
    return (
      <svg className="shot-art" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="mg1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0a0e"/><stop offset="100%" stopColor="#050505"/>
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#mg1)"/>
        {/* mountain mass */}
        <path d="M0 200 L160 100 L300 180 L460 60 L600 160 L800 120 L800 500 L0 500 Z" fill="#0e0a08"/>
        {/* mine entrance light */}
        <ellipse cx="400" cy="380" rx="120" ry="60" fill={accent} opacity="0.25"/>
        <path d="M340 410 Q340 350 400 350 Q460 350 460 410 L460 460 L340 460 Z" fill="#000"/>
        <path d="M360 410 Q360 370 400 370 Q440 370 440 410 L440 450 L360 450 Z" fill={accent} opacity="0.4"/>
        {/* miners silhouettes */}
        <g fill="#000">
          <rect x="380" y="420" width="8" height="30"/>
          <circle cx="384" cy="412" r="6"/>
          <rect x="410" y="425" width="8" height="25"/>
          <circle cx="414" cy="418" r="6"/>
        </g>
        {/* rails */}
        <path d="M340 460 L200 500 M460 460 L600 500" stroke="#1a1a1a" strokeWidth="3"/>
      </svg>
    );
  }
  if (kind === 'swamp') {
    return (
      <svg className="shot-art" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sg1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a1208"/><stop offset="60%" stopColor="#1a2418"/><stop offset="100%" stopColor="#050a05"/>
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#sg1)"/>
        <circle cx="600" cy="120" r="50" fill="#d8d4b8" opacity="0.7"/>
        <circle cx="600" cy="120" r="50" fill="#0a1208" opacity="0.5" transform="translate(-15 -5)"/>
        {/* trees with hanging moss */}
        <g fill="#000">
          <rect x="60" y="120" width="14" height="280"/>
          <path d="M40 180 Q67 130 94 180 Q90 220 67 230 Q44 220 40 180Z"/>
          <rect x="200" y="160" width="12" height="240"/>
          <path d="M180 200 Q206 160 232 200 Q228 230 206 238 Q184 230 180 200Z"/>
          <rect x="380" y="140" width="16" height="260"/>
          <path d="M355 200 Q388 145 421 200 Q418 240 388 250 Q358 240 355 200Z"/>
          <rect x="700" y="170" width="12" height="230"/>
          <path d="M680 210 Q706 170 732 210 Q728 240 706 248 Q684 240 680 210Z"/>
        </g>
        {/* moss */}
        <g stroke="#0a0a0a" strokeWidth="1" fill="none">
          <path d="M50 200 Q55 240 50 270"/><path d="M80 200 Q75 250 82 280"/>
          <path d="M195 220 Q200 260 196 290"/><path d="M375 230 Q380 270 376 300"/>
          <path d="M405 230 Q410 270 406 300"/>
        </g>
        {/* water reflection */}
        <rect y="400" width="800" height="100" fill="#0a1208" opacity="0.6"/>
        <g stroke={accent} strokeWidth="1" opacity="0.3">
          <line x1="0" y1="430" x2="800" y2="430"/>
          <line x1="0" y1="450" x2="800" y2="450"/>
          <line x1="0" y1="470" x2="800" y2="470"/>
        </g>
      </svg>
    );
  }
  return null;
}

function Carousel() {
  const [idx, setIdx] = useS(0);
  const visible = 2;
  const max = Math.max(0, SHOTS.length - visible);

  const go = (n) => setIdx(Math.max(0, Math.min(max, n)));

  return (
    <section className="gallery" id="gallery">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">GALERIE — DERRIÈRE LES PORTES BATTANTES</div>
          <h2>Des cartes postales <br />depuis l'Ouest.</h2>
          <p className="lede">Captures stylisées d'instants vécus sur le serveur. Tes prochains souvenirs y ressembleront.</p>
        </div>

        <div className="carousel reveal">
          <div
            className="carousel-track"
            style={{ transform: `translateX(calc(${-idx * 50}% - ${idx * 12}px))` }}
          >
            {SHOTS.map((s, i) => (
              <div className="shot" key={i}>
                <ShotArt kind={s.kind} accent={s.accent} />
                <div className="shot-corner">No. {String(i + 1).padStart(2, '0')}/{String(SHOTS.length).padStart(2, '0')}</div>
                <div className="shot-meta">
                  <div className="shot-tag">{s.tag}</div>
                  <div className="shot-title">{s.title}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-controls">
            <div className="carousel-dots">
              {Array.from({ length: max + 1 }).map((_, i) => (
                <button
                  key={i}
                  className={`dot-btn ${i === idx ? 'active' : ''}`}
                  onClick={() => go(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <div className="car-arrows">
              <button className="car-arrow" onClick={() => go(idx - 1)} aria-label="Précédent">
                <Icon.Arrow dir="left" />
              </button>
              <button className="car-arrow" onClick={() => go(idx + 1)} aria-label="Suivant">
                <Icon.Arrow />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Testimonials ===== */
function Testimonials() {
  const items = [
    { name: 'Eli McCarthy', role: 'Marshal — 8 mois', quote: "J'ai joué sur 4 serveurs RedM. Aucun n'avait cette densité d'écriture. Ici, mon perso a une famille, des ennemis et un casier. Il existe vraiment.", initial: 'E' },
    { name: 'Solène Brassard', role: 'Tenancière de saloon', quote: "Le staff écoute. Ils ont monté un arc complet autour de mon bar — procès, descente du shérif, contrebande. J'ai pleuré de rire ET de stress.", initial: 'S' },
    { name: 'Doc Hawthorne', role: 'Médecin — 14 mois', quote: "Mon métier de médecin sert à quelque chose. Les blessures persistent, on m'appelle la nuit, j'opère pour de vrai. C'est de l'orfèvrerie.", initial: 'D' },
  ];
  return (
    <section className="testi" id="testi">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">TÉMOIGNAGES</div>
          <h2>Ce que disent <br />ceux qui sont restés.</h2>
        </div>
        <div className="testi-grid">
          {items.map((t, i) => (
            <div className="testi-card reveal" key={i} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="testi-quote-mark">"</div>
              <p>{t.quote}</p>
              <div className="testi-foot">
                <div className="testi-avatar">{t.initial}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
                <div className="testi-stars">★★★★★</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Staff ===== */
function Staff() {
  const team = [
    { name: 'Cassidy', role: 'Owner & Lead Writer', initial: 'C' },
    { name: 'Calhoun', role: 'Head Game Master', initial: 'K' },
    { name: 'Wren', role: 'Lore Master', initial: 'W' },
    { name: 'Boone', role: 'Dev Lead', initial: 'B' },
  ];
  return (
    <section className="staff" id="staff">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">LE BUREAU DU SHÉRIF</div>
          <h2>L'équipe au chapeau.</h2>
          <p className="lede">Quatre piliers, trois ans d'écriture, mille nuits blanches. Ils écrivent l'histoire qu'on traverse.</p>
        </div>
        <div className="staff-grid">
          {team.map((m, i) => (
            <div className="staff-card reveal" key={m.name} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="staff-portrait" data-initial={m.initial}>
                <div className="staff-corner">No. {String(i + 1).padStart(2, '0')}</div>
              </div>
              <div className="staff-name">{m.name}</div>
              <div className="staff-role">{m.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Roadmap ===== */
function Roadmap() {
  const items = [
    { date: 'Mars 26', title: 'Le Procès de Caine Fletcher', text: "Arc judiciaire ouvert. Trois sessions au tribunal de Saint-Denis, témoins joueurs, verdict communautaire.", status: 'En cours', live: true },
    { date: 'Avril 26', title: 'Foire d\'Annesburg', text: "Ouverture des mines à la concurrence. Nouveaux jobs miniers, syndicats, possibilité de grèves armées.", status: 'Prochain', next: true },
    { date: 'Mai 26', title: 'La Grande Course de Big Valley', text: "Première édition. Inscriptions ouvertes. Paris officiels, prix en or, tricheurs au lasso.", status: 'Bientôt' },
    { date: 'Juin 26', title: 'Refonte du système de blessures', text: "Cicatrices permanentes, traumatismes, médecine spécialisée. Co-écrit avec les joueurs médecins.", status: 'En écriture' },
    { date: 'Été 26', title: 'Saison 2 — Le Chemin de fer', text: "Nouveau territoire ouvert. Compagnie ferroviaire, rivalités foncières, grand récit de fond sur 6 mois.", status: 'Prévu' },
  ];
  return (
    <section className="roadmap" id="roadmap">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">L'AGENDA DU COMTÉ</div>
          <h2>Ce qui s'écrit <br />en ce moment.</h2>
          <p className="lede">Le serveur n'est jamais fini. Chaque mois, un nouveau chapitre.</p>
        </div>
        <div className="roadmap-list">
          {items.map((it, i) => (
            <div className={`road-item reveal ${it.live ? 'live' : ''}`} key={i} style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="road-date">{it.date}</div>
              <div className="road-content">
                <h4>{it.title}</h4>
                <p>{it.text}</p>
                <span className={`road-status ${it.live ? 'live' : ''} ${it.next ? 'next' : ''}`}>
                  {it.live && '● '}{it.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Final CTA ===== */
function FinalCTA({ discord }) {
  return (
    <section className="final" id="join">
      <div className="wrap final-inner reveal">
        <div className="eyebrow">DERNIER APPEL AVANT LE COUCHER DU SOLEIL</div>
        <h2>
          La frontière t'attend.
          <span className="stroke">À toi de l'écrire.</span>
        </h2>
        <p>Whitelist ouverte. Candidature en 3 questions, lue en 24h par un humain. Pas de pay-to-win, pas de boost, juste ton chapeau.</p>
        <div className="hero-cta">
          <a className="btn btn-primary" href={discord} target="_blank" rel="noreferrer">
            <Icon.Discord size={16} /> Demander la whitelist
          </a>
          <a className="btn btn-ghost" href="#top">
            Revenir au début <Icon.Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ===== Nav ===== */
function Nav({ discord }) {
  const [scrolled, setScrolled] = useS(false);
  const [open, setOpen] = useS(false);
  useE(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useE(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  const links = [
    { href: '#lore',     label: 'Lore' },
    { href: '#features', label: 'Serveur' },
    { href: '#gallery',  label: 'Galerie' },
    { href: '#connect',  label: 'Connexion' },
    { href: '#faq',      label: 'FAQ' },
    { href: '#roadmap',  label: 'Agenda' },
    { href: '#join',     label: 'Rejoindre' },
  ];
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''} ${open ? 'open' : ''}`}>
      <div className="nav-left">
        <LoginButton />
        <a href="#top" className="nav-brand" onClick={() => setOpen(false)}>
          <span className="star"><Icon.Star size={20} color="#c9a36a"/></span>
          SUNNYWESTERN
        </a>
      </div>
      <ul className="nav-links">
        {links.map(l => (
          <li key={l.href}><a href={l.href} onClick={() => setOpen(false)}>{l.label}</a></li>
        ))}
      </ul>
      <button
        className={`nav-burger ${open ? 'open' : ''}`}
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
}

/* ===== How to connect ===== */
function HowToConnect({ discord }) {
  const steps = [
    { n: '01', title: "Installe RedM", text: "Télécharge le client RedM depuis redm.net. C'est gratuit, mais il te faut Red Dead Redemption 2 sur Steam, Epic ou Rockstar Launcher." },
    { n: '02', title: "Rejoins le Discord", text: "Lis le règlement, présente-toi dans #arrivants et passe la whitelist en 3 questions. Réponse humaine sous 24h." },
    { n: '03', title: "Crée ton personnage", text: "Une fois whitelisté, écris ton background avec un GM. Origine, métier, motivations, secrets. Pas de perso bidon." },
    { n: '04', title: "Lance-toi en jeu", text: "Connecte-toi au serveur via la liste RedM. Le shérif t'attend à la gare. Ton premier pas dans l'Ouest commence ici." },
  ];
  return (
    <section className="connect" id="connect">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">REJOINDRE LE COMTÉ</div>
          <h2>Comment poser <br />pied à terre.</h2>
          <p className="lede">Quatre étapes, une heure de paperasse, et tu chevauches déjà.</p>
        </div>
        <div className="connect-grid">
          {steps.map((s, i) => (
            <div className="connect-step reveal" key={s.n} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="connect-num">{s.n}</div>
              <div className="connect-body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="connect-cta reveal">
          <a className="btn btn-primary" href={discord} target="_blank" rel="noreferrer noopener">
            <Icon.Discord size={16} /> Demander la whitelist
          </a>
          <a className="btn btn-ghost" href="https://redm.net" target="_blank" rel="noreferrer noopener">
            Télécharger RedM <Icon.Arrow size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ===== Rules summary ===== */
function Rules() {
  const items = [
    { icon: '⚖️', title: 'RP avant tout', text: "Pas de DM, pas de RDM, pas de VDM. On joue des personnages, pas des stats. Chaque action a une conséquence racontable." },
    { icon: '🎭', title: 'Reste en personnage', text: "Pas de hors-RP en jeu. Discord vocal IC pendant les sessions. Le metagaming est sanctionné." },
    { icon: '⚰️', title: 'NLR & permadeath', text: "Tu meurs ? 30 minutes minimum hors zone, oubli des derniers événements. Permadeath consenti et scénarisé." },
    { icon: '🤝', title: 'Respect OOC', text: "Le RP peut être dur, le hors-jeu reste cordial. Toxicité, racisme, sexisme, harcèlement = ban immédiat." },
    { icon: '🔫', title: 'Powergaming interdit', text: "Tu n'es pas John Marston. Pas d'esquive impossible, pas d'invincibilité, pas d'action surhumaine." },
    { icon: '📜', title: 'Charte complète', text: "Le règlement intégral est sur Discord, signé à l'inscription. Tu joues, tu connais. Pas d'excuses." },
  ];
  return (
    <section className="rules" id="rules">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">LE CODE DE L'OUEST</div>
          <h2>Six règles, <br />zéro pirouette.</h2>
          <p className="lede">Le serveur tient parce que tout le monde joue le jeu. Voici les fondations.</p>
        </div>
        <div className="rules-grid">
          {items.map((r, i) => (
            <div className="rule-card reveal" key={r.title} style={{ transitionDelay: `${i * 50}ms` }}>
              <div className="rule-icon" aria-hidden="true">{r.icon}</div>
              <h4>{r.title}</h4>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== FAQ ===== */
function FAQ() {
  const [open, setOpen] = useS(0);
  const items = [
    {
      q: "Faut-il acheter quelque chose ?",
      a: "Tu dois posséder Red Dead Redemption 2 (Steam, Epic ou Rockstar). RedM est gratuit. Le serveur n'est pas pay-to-win — aucun avantage en jeu n'est vendu."
    },
    {
      q: "Quel âge minimum pour jouer ?",
      a: "16 ans minimum, avec maturité RP attendue. Les sujets sensibles (violence, drame, mort) sont fréquents. Si tu n'as pas l'âge, ne mens pas — on s'en aperçoit en entretien."
    },
    {
      q: "Comment fonctionne la whitelist ?",
      a: "Tu remplis 3 questions sur Discord (motivation, expérience RP, idée de personnage). Un membre du staff lit la candidature en 24h. Si elle passe, tu fais un court entretien vocal pour finaliser."
    },
    {
      q: "Combien de temps faut-il jouer par semaine ?",
      a: "Aucun quota imposé. On demande juste de ne pas disparaître plus de 3 semaines sans prévenir, sinon ton perso est mis en pause pour libérer la place."
    },
    {
      q: "Je ne connais pas RedM, je peux quand même venir ?",
      a: "Oui. La majorité des joueurs n'avaient jamais touché à RedM. Le staff t'aide à l'installation, et un parrain joueur t'accompagne tes premières sessions."
    },
    {
      q: "Peut-on rejouer après une mort permanente ?",
      a: "Bien sûr — avec un nouveau personnage, nouvelle histoire, nouveau lien. La mort scellée libère, elle ne bannit pas. Beaucoup de joueurs ont trois ou quatre persos enterrés."
    },
    {
      q: "Y a-t-il des factions criminelles ?",
      a: "Oui, plusieurs (gangs établis, hors-la-loi solitaires, contrebandiers). Recrutement IC, hiérarchie scénarisée, conflits ouverts avec les forces de l'ordre."
    },
    {
      q: "Le serveur est-il en français uniquement ?",
      a: "Oui, le RP, le Discord et le staff sont 100% francophones. Niveau de français correct exigé pour la lecture/écriture de textes RP."
    },
  ];
  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">FOIRE AUX QUESTIONS</div>
          <h2>Avant de pousser <br />les portes battantes.</h2>
        </div>
        <div className="faq-list reveal">
          {items.map((it, i) => (
            <div className={`faq-item ${open === i ? 'open' : ''}`} key={i}>
              <button
                className="faq-q"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <span className="faq-q-num">— {String(i + 1).padStart(2, '0')}</span>
                <span className="faq-q-text">{it.q}</span>
                <span className="faq-q-chev" aria-hidden="true">+</span>
              </button>
              <div className="faq-a-wrap">
                <p className="faq-a">{it.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Footer ===== */
function Footer() {
  return (
    <footer>
      <div className="wrap foot-inner">
        <div className="foot-brand">SUNNYWESTERN · 1890</div>
        <div className="foot-meta">FRENCH RP — REDM SERVER · WHITELIST OPEN</div>
        <div className="foot-meta">© MMXXVI · Drink your milk, partner.</div>
      </div>
    </footer>
  );
}

window.LiveStrip = LiveStrip;
window.Lore = Lore;
window.Features = Features;
window.Carousel = Carousel;
window.Testimonials = Testimonials;
window.Staff = Staff;
window.Roadmap = Roadmap;
window.FinalCTA = FinalCTA;
window.Nav = Nav;
window.Footer = Footer;
window.HowToConnect = HowToConnect;
window.Rules = Rules;
window.FAQ = FAQ;
