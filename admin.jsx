/* global React, Icon, useAuth */
/*
 * admin.jsx — Panel admin Sunnywestern
 *
 * Template UI complet, donnees fictives. Les actions (accept/reject/save) ne font
 * rien de reel — a brancher sur ton backend.
 *
 * Sections : Dashboard, Whitelist, Membres, Evenements, Logs, Parametres.
 */

const { useState: aS, useEffect: aE, useMemo: aM } = React;

/* ===== Mock data (a remplacer par fetch backend) ===== */
const MOCK_PENDING = [
  { id: 1, discord: '482910384720193847', pseudo: 'Hawthorne#4821', date: '2026-05-06', age: 24, exp: 'Eklipse RP (2 ans), New Frontier (8 mois)', perso: "Gunslinger reformé qui veut ouvrir une école de tir." },
  { id: 2, discord: '728193847562910384', pseudo: 'Mavi#9182', date: '2026-05-06', age: 19, exp: 'Premier serveur RP', perso: "Couturière irlandaise fraîchement débarquée à Saint Denis." },
  { id: 3, discord: '614728193746102837', pseudo: 'Ottilie#0033', date: '2026-05-05', age: 31, exp: 'GTA RP 4 ans', perso: "Ancienne bandit qui veut reprendre le saloon de sa mère décédée." },
  { id: 4, discord: '839102847362910847', pseudo: 'Ren#7714', date: '2026-05-05', age: 22, exp: 'RedM 1 an', perso: "Trappeur native du nord, parle peu, écoute beaucoup." },
];

const MOCK_MEMBERS = [
  { id: 1, discord: '228080675058745354', pseudo: 'Cassidy#0001', role: 'Owner', perso: 'Marshal Cassidy Vale', joined: '2023-09-12', status: 'online' },
  { id: 2, discord: '306119276316590080', pseudo: 'Calhoun#1144', role: 'Head GM', perso: 'Doc Calhoun', joined: '2023-10-04', status: 'online' },
  { id: 3, discord: '482910384720193800', pseudo: 'Wren#2271', role: 'Lore Master', perso: 'Wren Marlowe', joined: '2024-01-18', status: 'idle' },
  { id: 4, discord: '910283746192038475', pseudo: 'Boone#6612', role: 'Dev Lead', perso: 'Boone Hatcher', joined: '2024-02-22', status: 'offline' },
  { id: 5, discord: '648271038475610284', pseudo: 'Eli#3344', role: 'Joueur', perso: 'Eli McCarthy', joined: '2025-09-01', status: 'online' },
  { id: 6, discord: '710283746192847102', pseudo: 'Solène#9912', role: 'Joueur', perso: 'Solène Brassard', joined: '2025-08-15', status: 'online' },
  { id: 7, discord: '847102837461928374', pseudo: 'DocH#5523', role: 'Joueur', perso: 'Doc Hawthorne', joined: '2025-03-04', status: 'idle' },
];

const MOCK_EVENTS = [
  { id: 1, date: '2026-05-12', title: 'Procès de Caine Fletcher — Audience 2', faction: 'Justice', status: 'planifié' },
  { id: 2, date: '2026-05-15', title: 'Foire d\'Annesburg', faction: 'Mineurs', status: 'planifié' },
  { id: 3, date: '2026-05-22', title: 'Grande Course de Big Valley', faction: 'Tous', status: 'inscriptions' },
  { id: 4, date: '2026-06-01', title: 'Refonte blessures — Atelier joueurs', faction: 'Médecins', status: 'brouillon' },
];

const MOCK_LOGS = [
  { t: '14:22', who: 'Cassidy', what: 'a accepté la candidature de Mavi#9182', kind: 'whitelist' },
  { t: '14:08', who: 'Calhoun', what: 'a publié l\'événement "Procès Fletcher — Audience 2"', kind: 'event' },
  { t: '13:55', who: 'Système', what: 'Pic de joueurs : 198 connexions simultanées', kind: 'sys' },
  { t: '12:41', who: 'Wren', what: 'a modifié la fiche lore de "Strawberry"', kind: 'lore' },
  { t: '12:12', who: 'Cassidy', what: 'a banni le compte 728193847562910333 (toxicité OOC)', kind: 'mod' },
  { t: '11:30', who: 'Boone', what: 'a déployé le patch v2.14.3', kind: 'dev' },
  { t: '10:14', who: 'Calhoun', what: 'a démarré la session "Convoi vers Strawberry"', kind: 'event' },
];

/* ===== Sidebar ===== */
function AdminSidebar({ active, onChange, onClose, mobileOpen }) {
  const items = [
    { key: 'dash',     label: 'Tableau de bord', icon: <Icon.Dashboard /> },
    { key: 'wl',       label: 'Whitelist',       icon: <Icon.Check />,    badge: MOCK_PENDING.length },
    { key: 'members',  label: 'Membres',         icon: <Icon.Users /> },
    { key: 'events',   label: 'Événements',      icon: <Icon.Calendar /> },
    { key: 'logs',     label: 'Logs',            icon: <Icon.List /> },
    { key: 'settings', label: 'Paramètres',      icon: <Icon.Settings /> },
  ];
  return (
    <aside className={`adm-side ${mobileOpen ? 'open' : ''}`}>
      <div className="adm-side-brand">
        <Icon.Star size={18} color="#c9a36a" />
        <div>
          <div className="adm-side-brand-name">SUNNYWESTERN</div>
          <div className="adm-side-brand-sub">Bureau du shérif</div>
        </div>
      </div>
      <nav className="adm-side-nav">
        {items.map(it => (
          <button
            key={it.key}
            className={`adm-side-link ${active === it.key ? 'active' : ''}`}
            onClick={() => { onChange(it.key); onClose?.(); }}
          >
            <span className="adm-side-link-icon">{it.icon}</span>
            <span className="adm-side-link-label">{it.label}</span>
            {it.badge != null && <span className="adm-side-badge">{it.badge}</span>}
          </button>
        ))}
      </nav>
      <div className="adm-side-foot">
        <a href="#top" className="adm-side-back">← Retour au site</a>
        <div className="adm-side-version">v0.1 · template</div>
      </div>
    </aside>
  );
}

/* ===== Topbar ===== */
function AdminTopbar({ user, logout, page, onBurger }) {
  const titles = {
    dash: 'Tableau de bord',
    wl: 'Whitelist — candidatures',
    members: 'Membres',
    events: 'Événements',
    logs: 'Logs d\'activité',
    settings: 'Paramètres',
  };
  return (
    <header className="adm-top">
      <button className="adm-burger" onClick={onBurger} aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
      <div className="adm-top-crumb">
        <span className="adm-top-crumb-root">Admin</span>
        <span className="adm-top-crumb-sep">/</span>
        <span className="adm-top-crumb-page">{titles[page] || page}</span>
      </div>
      <div className="adm-top-actions">
        <button className="adm-top-icon" aria-label="Recherche"><Icon.Search /></button>
        <div className="adm-top-user">
          <div className="adm-top-avatar">{user.id.slice(-2)}</div>
          <div className="adm-top-uinfo">
            <div className="adm-top-uname">···{user.id.slice(-6)}</div>
            <div className="adm-top-urole">Administrateur</div>
          </div>
          <button className="adm-top-logout" onClick={logout} title="Déconnexion">
            <Icon.Logout />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ===== Stat card ===== */
function StatCard({ label, value, sub, accent, icon }) {
  return (
    <div className={`adm-stat ${accent ? 'accent' : ''}`}>
      <div className="adm-stat-head">
        <span className="adm-stat-label">{label}</span>
        <span className="adm-stat-icon">{icon}</span>
      </div>
      <div className="adm-stat-value">{value}</div>
      {sub && <div className="adm-stat-sub">{sub}</div>}
    </div>
  );
}

/* ===== Pages ===== */
function PageDashboard() {
  return (
    <div className="adm-page">
      <div className="adm-grid-stats">
        <StatCard label="Joueurs en ligne" value="187" sub="+12 cette heure" accent icon={<Icon.Users />} />
        <StatCard label="Candidatures en attente" value={MOCK_PENDING.length} sub="2 depuis < 24h" icon={<Icon.Check />} />
        <StatCard label="Événements actifs" value="3" sub="1 cette semaine" icon={<Icon.Calendar />} />
        <StatCard label="Tickets ouverts" value="5" sub="1 prioritaire" icon={<Icon.List />} />
      </div>

      <div className="adm-grid-2">
        <div className="adm-card">
          <div className="adm-card-head">
            <h3>Activité récente</h3>
            <a className="adm-card-link" href="#" onClick={e => e.preventDefault()}>Tout voir</a>
          </div>
          <ul className="adm-log-list compact">
            {MOCK_LOGS.slice(0, 5).map((l, i) => (
              <li key={i} className={`adm-log-row kind-${l.kind}`}>
                <span className="adm-log-time">{l.t}</span>
                <span className="adm-log-who">{l.who}</span>
                <span className="adm-log-what">{l.what}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="adm-card">
          <div className="adm-card-head">
            <h3>Prochains événements</h3>
            <a className="adm-card-link" href="#" onClick={e => e.preventDefault()}>Calendrier</a>
          </div>
          <ul className="adm-mini-list">
            {MOCK_EVENTS.slice(0, 4).map(ev => (
              <li key={ev.id} className="adm-mini-row">
                <div className="adm-mini-date">{ev.date.slice(5).replace('-', '/')}</div>
                <div className="adm-mini-body">
                  <div className="adm-mini-title">{ev.title}</div>
                  <div className="adm-mini-meta">{ev.faction} · {ev.status}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card-head">
          <h3>Connexions sur 7 jours</h3>
          <span className="adm-card-meta">Pic à 218 · moyenne 174</span>
        </div>
        <FakeChart />
      </div>
    </div>
  );
}

function FakeChart() {
  const data = [142, 168, 155, 198, 174, 218, 187];
  const labels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const max = Math.max(...data);
  return (
    <div className="adm-chart">
      {data.map((v, i) => (
        <div key={i} className="adm-chart-col">
          <div className="adm-chart-bar" style={{ height: `${(v / max) * 100}%` }}>
            <span className="adm-chart-val">{v}</span>
          </div>
          <div className="adm-chart-lbl">{labels[i]}</div>
        </div>
      ))}
    </div>
  );
}

function PageWhitelist() {
  const [list, setList] = aS(MOCK_PENDING);
  const [sel, setSel] = aS(list[0]?.id || null);
  const current = list.find(x => x.id === sel);

  const decide = (id, action) => {
    setList(prev => prev.filter(x => x.id !== id));
    setSel(prev => {
      const next = list.find(x => x.id !== id);
      return next?.id || null;
    });
  };

  return (
    <div className="adm-page wl-layout">
      <div className="adm-card wl-list-card">
        <div className="adm-card-head">
          <h3>En attente · {list.length}</h3>
          <button className="adm-btn ghost"><Icon.Search size={14} /> Filtrer</button>
        </div>
        <ul className="wl-list">
          {list.map(c => (
            <li
              key={c.id}
              className={`wl-row ${sel === c.id ? 'active' : ''}`}
              onClick={() => setSel(c.id)}
            >
              <div className="wl-row-pseudo">{c.pseudo}</div>
              <div className="wl-row-meta">{c.date} · {c.age} ans</div>
            </li>
          ))}
          {list.length === 0 && <li className="wl-empty">Plus aucune candidature en attente.</li>}
        </ul>
      </div>

      <div className="adm-card wl-detail-card">
        {current ? (
          <>
            <div className="wl-detail-head">
              <div>
                <div className="wl-detail-pseudo">{current.pseudo}</div>
                <div className="wl-detail-id">ID Discord : {current.discord}</div>
              </div>
              <span className="wl-tag">Soumis le {current.date}</span>
            </div>
            <div className="wl-fields">
              <div className="wl-field">
                <div className="wl-field-lbl">Âge</div>
                <div className="wl-field-val">{current.age} ans</div>
              </div>
              <div className="wl-field">
                <div className="wl-field-lbl">Expérience RP</div>
                <div className="wl-field-val">{current.exp}</div>
              </div>
              <div className="wl-field">
                <div className="wl-field-lbl">Pitch personnage</div>
                <div className="wl-field-val">{current.perso}</div>
              </div>
            </div>
            <div className="wl-actions">
              <button className="adm-btn danger" onClick={() => decide(current.id, 'reject')}>
                <Icon.X size={14} /> Rejeter
              </button>
              <button className="adm-btn ghost">Demander un complément</button>
              <button className="adm-btn primary" onClick={() => decide(current.id, 'accept')}>
                <Icon.Check size={14} /> Accepter
              </button>
            </div>
          </>
        ) : (
          <div className="wl-empty-detail">Aucune candidature sélectionnée.</div>
        )}
      </div>
    </div>
  );
}

function PageMembers() {
  const [q, setQ] = aS('');
  const filtered = aM(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return MOCK_MEMBERS;
    return MOCK_MEMBERS.filter(m =>
      m.pseudo.toLowerCase().includes(needle) ||
      m.perso.toLowerCase().includes(needle) ||
      m.discord.includes(needle) ||
      m.role.toLowerCase().includes(needle)
    );
  }, [q]);
  return (
    <div className="adm-page">
      <div className="adm-card">
        <div className="adm-card-head">
          <h3>{filtered.length} membre{filtered.length > 1 ? 's' : ''}</h3>
          <div className="adm-search">
            <Icon.Search size={14} />
            <input
              placeholder="Pseudo, perso, ID, rôle…"
              value={q}
              onChange={e => setQ(e.target.value)}
            />
          </div>
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Pseudo</th>
                <th>Personnage</th>
                <th>Rôle</th>
                <th>ID Discord</th>
                <th>Inscrit le</th>
                <th>Statut</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr key={m.id}>
                  <td>{m.pseudo}</td>
                  <td className="muted">{m.perso}</td>
                  <td>
                    <span className={`role-pill role-${m.role.toLowerCase().replace(/\s+/g, '-')}`}>{m.role}</span>
                  </td>
                  <td className="mono">{m.discord}</td>
                  <td className="muted">{m.joined}</td>
                  <td>
                    <span className={`status-dot status-${m.status}`} />
                    <span className="muted">{m.status}</span>
                  </td>
                  <td>
                    <button className="adm-btn ghost sm">Détails</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="7" className="adm-table-empty">Aucun résultat.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PageEvents() {
  return (
    <div className="adm-page">
      <div className="adm-card">
        <div className="adm-card-head">
          <h3>Événements à venir</h3>
          <button className="adm-btn primary"><Icon.Plus size={14} /> Nouvel événement</button>
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr><th>Date</th><th>Titre</th><th>Faction</th><th>Statut</th><th></th></tr>
            </thead>
            <tbody>
              {MOCK_EVENTS.map(ev => (
                <tr key={ev.id}>
                  <td className="mono">{ev.date}</td>
                  <td>{ev.title}</td>
                  <td className="muted">{ev.faction}</td>
                  <td>
                    <span className={`status-pill status-${ev.status.replace(/[^a-z]/gi, '')}`}>{ev.status}</span>
                  </td>
                  <td>
                    <button className="adm-btn ghost sm">Éditer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card-head"><h3>Création rapide</h3></div>
        <form className="adm-form" onSubmit={e => e.preventDefault()}>
          <div className="adm-form-row">
            <label className="adm-field">
              <span>Titre</span>
              <input placeholder="Procès, foire, attaque…" />
            </label>
            <label className="adm-field">
              <span>Date</span>
              <input type="date" />
            </label>
          </div>
          <div className="adm-form-row">
            <label className="adm-field">
              <span>Faction principale</span>
              <select>
                <option>Tous</option>
                <option>Justice</option>
                <option>Hors-la-loi</option>
                <option>Mineurs</option>
                <option>Médecins</option>
              </select>
            </label>
            <label className="adm-field">
              <span>Statut</span>
              <select>
                <option>brouillon</option>
                <option>planifié</option>
                <option>inscriptions</option>
                <option>en cours</option>
              </select>
            </label>
          </div>
          <label className="adm-field">
            <span>Description publique</span>
            <textarea rows="4" placeholder="Visible des joueurs sur la roadmap…" />
          </label>
          <div className="adm-form-actions">
            <button type="button" className="adm-btn ghost">Annuler</button>
            <button type="submit" className="adm-btn primary"><Icon.Plus size={14} /> Publier</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PageLogs() {
  return (
    <div className="adm-page">
      <div className="adm-card">
        <div className="adm-card-head">
          <h3>Activité récente</h3>
          <div className="adm-tabs">
            <button className="adm-tab active">Tout</button>
            <button className="adm-tab">Whitelist</button>
            <button className="adm-tab">Modération</button>
            <button className="adm-tab">Système</button>
          </div>
        </div>
        <ul className="adm-log-list">
          {MOCK_LOGS.map((l, i) => (
            <li key={i} className={`adm-log-row kind-${l.kind}`}>
              <span className="adm-log-time">{l.t}</span>
              <span className={`adm-log-kind kind-${l.kind}`}>{l.kind}</span>
              <span className="adm-log-who">{l.who}</span>
              <span className="adm-log-what">{l.what}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PageSettings() {
  return (
    <div className="adm-page">
      <div className="adm-card">
        <div className="adm-card-head"><h3>Serveur</h3></div>
        <form className="adm-form" onSubmit={e => e.preventDefault()}>
          <div className="adm-form-row">
            <label className="adm-field">
              <span>Nom du serveur</span>
              <input defaultValue="Sunnywestern" />
            </label>
            <label className="adm-field">
              <span>Slots max</span>
              <input type="number" defaultValue="225" />
            </label>
          </div>
          <label className="adm-field">
            <span>Description publique</span>
            <textarea rows="3" defaultValue="Serveur RedM RP français. Whitelist ouverte." />
          </label>
        </form>
      </div>

      <div className="adm-card">
        <div className="adm-card-head"><h3>Modération</h3></div>
        <div className="adm-toggle-list">
          <ToggleRow label="Auto-mute insultes (IC)" defaultOn={false} hint="Détection mots-clés en chat texte." />
          <ToggleRow label="Anti-DM/RDM warning" defaultOn />
          <ToggleRow label="Logs de combat conservés 30 j" defaultOn />
          <ToggleRow label="Whitelist fermée" defaultOn={false} hint="Désactive les nouvelles candidatures." />
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card-head"><h3>Économie</h3></div>
        <div className="adm-form-row">
          <label className="adm-field">
            <span>Multiplicateur salaire</span>
            <input type="number" step="0.1" defaultValue="1" />
          </label>
          <label className="adm-field">
            <span>Multiplicateur loot</span>
            <input type="number" step="0.1" defaultValue="1" />
          </label>
          <label className="adm-field">
            <span>Inflation mensuelle</span>
            <input type="number" step="0.1" defaultValue="0.5" />
          </label>
        </div>
      </div>

      <div className="adm-form-actions sticky">
        <button className="adm-btn ghost">Annuler</button>
        <button className="adm-btn primary">Enregistrer</button>
      </div>
    </div>
  );
}

function ToggleRow({ label, hint, defaultOn = false }) {
  const [on, setOn] = aS(defaultOn);
  return (
    <div className="toggle-row">
      <div>
        <div className="toggle-label">{label}</div>
        {hint && <div className="toggle-hint">{hint}</div>}
      </div>
      <button
        className={`toggle ${on ? 'on' : ''}`}
        onClick={() => setOn(o => !o)}
        aria-pressed={on}
      >
        <span></span>
      </button>
    </div>
  );
}

/* ===== Main shell ===== */
function AdminPanel() {
  const { user, logout } = useAuth();
  const [page, setPage] = aS('dash');
  const [mobileOpen, setMobileOpen] = aS(false);

  // Guard : si pas admin, retour accueil
  aE(() => {
    if (!user || !user.isAdmin) {
      window.location.hash = '';
    }
  }, [user]);

  if (!user || !user.isAdmin) return null;

  const pages = {
    dash: <PageDashboard />,
    wl: <PageWhitelist />,
    members: <PageMembers />,
    events: <PageEvents />,
    logs: <PageLogs />,
    settings: <PageSettings />,
  };

  return (
    <div className="adm-shell">
      <AdminSidebar
        active={page}
        onChange={setPage}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      {mobileOpen && <div className="adm-side-backdrop" onClick={() => setMobileOpen(false)} />}
      <div className="adm-main">
        <AdminTopbar
          user={user}
          logout={logout}
          page={page}
          onBurger={() => setMobileOpen(o => !o)}
        />
        <main className="adm-content">
          {pages[page]}
        </main>
      </div>
    </div>
  );
}

window.AdminPanel = AdminPanel;
