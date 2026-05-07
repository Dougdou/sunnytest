/* global React, ReactDOM, Hero, Nav, LiveStrip, Lore, Features, Carousel, Testimonials, Staff, Roadmap, FinalCTA, Footer, HowToConnect, Rules, FAQ, useReveal,
   AdminPanel, useAuth,
   TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakSlider, TweakColor, TweakToggle */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "embers",
  "grain": 0.35,
  "vignette": true,
  "displayFont": "Rye",
  "showRider": true,
  "tagline": "Le soleil se couche sur une frontière sans loi. Ramasse ton chapeau, scelle ton cheval — l'Ouest n'attend personne."
}/*EDITMODE-END*/;

const PALETTES = {
  embers:    { '--bg-deep':'#0d0805', '--bg':'#14100a', '--bg-2':'#1a1410', '--accent':'#c9a36a', '--accent-2':'#8b1a0e', '--ink':'#e8dcc0', '--ink-dim':'#8a7a5e', '--paper-dim':'#a08866' },
  dusk:      { '--bg-deep':'#080c14', '--bg':'#0e131c', '--bg-2':'#141a26', '--accent':'#d8a868', '--accent-2':'#6e3a1e', '--ink':'#e6dccb', '--ink-dim':'#7a7569', '--paper-dim':'#9a8c75' },
  blood:     { '--bg-deep':'#100604', '--bg':'#170a08', '--bg-2':'#1f0f0c', '--accent':'#d4a060', '--accent-2':'#a01810', '--ink':'#ecdfc8', '--ink-dim':'#8a6c5a', '--paper-dim':'#a88665' },
  prairie:   { '--bg-deep':'#0a0c08', '--bg':'#11140e', '--bg-2':'#181c14', '--accent':'#c9b878', '--accent-2':'#5a6028', '--ink':'#ebe5cc', '--ink-dim':'#7d7c64', '--paper-dim':'#9c9474' },
};

const FONTS = {
  Rye: "'Rye', serif",
  Smokum: "'Smokum', serif",
  IMFell: "'IM Fell English SC', serif",
  Bree: "'Bree Serif', serif",
};

function useHashRoute() {
  const [hash, setHash] = React.useState(() => window.location.hash);
  React.useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return hash;
}

function App() {
  const route = useHashRoute();
  const auth = useAuth();
  const isAdminRoute = route === '#admin';

  // Si on est sur #admin sans etre admin, rebascule vers l'accueil
  React.useEffect(() => {
    if (isAdminRoute && (!auth.user || !auth.user.isAdmin)) {
      window.location.hash = '';
    }
  }, [isAdminRoute, auth.user]);

  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();

  // Apply palette
  React.useEffect(() => {
    const p = PALETTES[t.palette] || PALETTES.embers;
    const r = document.documentElement;
    Object.entries(p).forEach(([k, v]) => r.style.setProperty(k, v));
  }, [t.palette]);

  // Apply grain opacity
  React.useEffect(() => {
    document.documentElement.style.setProperty('--grain-opacity', String(t.grain));
  }, [t.grain]);

  // Apply display font
  React.useEffect(() => {
    const css = `
      .hero-title, .nav-brand, .hero-title .west, .lore-card-stamp, .lore-text h2, .feat h3, .road-content h4, .testi-quote-mark, .staff-name, .shot-title, .section-head h2, .live-stat-num, .final h2, .foot-brand {
        font-family: ${FONTS[t.displayFont] || FONTS.Rye} !important;
      }
    `;
    let style = document.getElementById('__font_override');
    if (!style) {
      style = document.createElement('style');
      style.id = '__font_override';
      document.head.appendChild(style);
    }
    style.textContent = css;
  }, [t.displayFont]);

  // Vignette toggle
  React.useEffect(() => {
    const v = document.querySelector('.vignette');
    if (v) v.style.display = t.vignette ? '' : 'none';
  }, [t.vignette]);

  // Rider toggle
  React.useEffect(() => {
    const r = document.querySelector('.hero-rider');
    if (r) r.style.display = t.showRider ? '' : 'none';
  }, [t.showRider]);

  const DISCORD = 'https://discord.gg/SvvKumHSA';

  if (isAdminRoute && auth.user?.isAdmin) {
    return <AdminPanel />;
  }

  return (
    <>
      <div className="grain-overlay" />
      <Nav discord={DISCORD} />
      <Hero discord={DISCORD} tagline={t.tagline} />
      <LiveStrip />
      <Lore />
      <Features />
      <Carousel />
      <HowToConnect discord={DISCORD} />
      <Rules />
      <Testimonials />
      <Staff />
      <Roadmap />
      <FAQ />
      <FinalCTA discord={DISCORD} />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Atmosphère">
          <TweakRadio
            label="Palette"
            value={t.palette}
            onChange={v => setTweak('palette', v)}
            options={[
              { label: 'Embers', value: 'embers' },
              { label: 'Dusk',   value: 'dusk' },
              { label: 'Blood',  value: 'blood' },
              { label: 'Prairie',value: 'prairie' },
            ]}
          />
          <TweakSlider
            label="Grain & poussière"
            value={t.grain} min={0} max={0.7} step={0.05}
            onChange={v => setTweak('grain', v)}
          />
          <TweakToggle label="Vignettage cinéma" value={t.vignette} onChange={v => setTweak('vignette', v)} />
        </TweakSection>

        <TweakSection title="Typographie">
          <TweakRadio
            label="Police d'affiche"
            value={t.displayFont}
            onChange={v => setTweak('displayFont', v)}
            options={[
              { label: 'Rye',     value: 'Rye' },
              { label: 'Smokum',  value: 'Smokum' },
              { label: 'IM Fell', value: 'IMFell' },
              { label: 'Bree',    value: 'Bree' },
            ]}
          />
        </TweakSection>

        <TweakSection title="Hero">
          <TweakToggle label="Cavalier solitaire" value={t.showRider} onChange={v => setTweak('showRider', v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
