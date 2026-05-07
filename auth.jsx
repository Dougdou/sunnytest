/* global React, Icon */
/*
 * auth.jsx — Auth template (CLIENT-SIDE ONLY, NON SECURISE)
 *
 * IMPORTANT : ce module simule une connexion Discord cote client.
 * Il n'y a aucune verification serveur — n'importe qui peut lire les IDs admin
 * dans le source ou bidouiller son localStorage. C'est un TEMPLATE UI a brancher
 * sur un vrai backend (Discord OAuth + endpoint serveur) en production.
 *
 * Pour passer en prod : remplacer login() par un fetch vers ton endpoint OAuth,
 * et faire valider le statut admin cote serveur via un JWT signe.
 */

const ADMIN_IDS = ['228080675058745354', '306119276316590080'];
const STORAGE_KEY = 'sw_user';

function getStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setStoredUser(u) {
  if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  else localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('sw_auth_change'));
}

function useAuth() {
  const [user, setUser] = React.useState(getStoredUser);

  React.useEffect(() => {
    const onChange = () => setUser(getStoredUser());
    window.addEventListener('sw_auth_change', onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener('sw_auth_change', onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  const login = React.useCallback((discordId) => {
    const trimmed = String(discordId || '').trim();
    if (!/^\d{17,19}$/.test(trimmed)) {
      return { error: "Format invalide. Un ID Discord fait 17 à 19 chiffres." };
    }
    const u = {
      id: trimmed,
      isAdmin: ADMIN_IDS.includes(trimmed),
      loggedAt: Date.now(),
    };
    setStoredUser(u);
    return { ok: true, user: u };
  }, []);

  const logout = React.useCallback(() => {
    setStoredUser(null);
    if (window.location.hash === '#admin') {
      window.location.hash = '';
    }
  }, []);

  return { user, login, logout };
}

/* ===== Login button (placed inside Nav, top-left) ===== */
function LoginButton() {
  const { user, logout } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    if (!menu) return;
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenu(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [menu]);

  if (!user) {
    return (
      <>
        <button className="login-btn" onClick={() => setOpen(true)}>
          <Icon.User size={14} />
          <span>Connexion</span>
        </button>
        {open && <LoginModal onClose={() => setOpen(false)} />}
      </>
    );
  }

  const initials = user.id.slice(-2);
  const goAdmin = () => { window.location.hash = '#admin'; setMenu(false); };

  return (
    <div className="user-pill" ref={menuRef}>
      <button className="user-pill-btn" onClick={() => setMenu(m => !m)}>
        <span className={`user-avatar ${user.isAdmin ? 'admin' : ''}`}>{initials}</span>
        <span className="user-id">···{user.id.slice(-4)}</span>
        {user.isAdmin && <span className="user-badge">ADMIN</span>}
      </button>
      {menu && (
        <div className="user-menu">
          <div className="user-menu-head">
            <div className="user-menu-id">ID {user.id}</div>
            <div className="user-menu-meta">
              {user.isAdmin ? 'Statut administrateur' : 'Membre connecté'}
            </div>
          </div>
          {user.isAdmin && (
            <button className="user-menu-item primary" onClick={goAdmin}>
              <Icon.Shield size={14} /> Panel admin
            </button>
          )}
          <button className="user-menu-item" onClick={() => { logout(); setMenu(false); }}>
            <Icon.Logout size={14} /> Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}

/* ===== Login modal ===== */
function LoginModal({ onClose }) {
  const { login } = useAuth();
  const [id, setId] = React.useState('');
  const [err, setErr] = React.useState('');
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const submit = (e) => {
    e.preventDefault();
    const res = login(id);
    if (res.error) {
      setErr(res.error);
      return;
    }
    setErr('');
    if (res.user.isAdmin) {
      window.location.hash = '#admin';
    }
    onClose();
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-card" onClick={e => e.stopPropagation()}>
        <button className="login-close" onClick={onClose} aria-label="Fermer">×</button>

        <div className="login-eyebrow">— BUREAU DU SHÉRIF —</div>
        <h2 className="login-title">Connexion</h2>
        <p className="login-sub">
          Identifie-toi avec ton ID Discord pour accéder à ton espace.
        </p>

        <form onSubmit={submit} className="login-form">
          <label className="login-label">
            <span>ID Discord</span>
            <input
              ref={inputRef}
              className="login-input"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="ex: 228080675058745354"
              value={id}
              onChange={e => { setId(e.target.value); setErr(''); }}
            />
          </label>
          {err && <div className="login-error">{err}</div>}
          <button type="submit" className="login-submit">
            <Icon.Discord size={14} /> Se connecter
          </button>
        </form>

        <div className="login-foot">
          <div className="login-foot-row">
            <span>?</span>
            <span>Trouve ton ID : Discord → Paramètres → Avancés → Mode développeur, puis clic droit sur ton pseudo.</span>
          </div>
          <div className="login-disclaimer">
            Authentification de démonstration — non sécurisée. Sera remplacée par OAuth Discord en production.
          </div>
        </div>
      </div>
    </div>
  );
}

window.useAuth = useAuth;
window.LoginButton = LoginButton;
window.LoginModal = LoginModal;
window.ADMIN_IDS = ADMIN_IDS;
