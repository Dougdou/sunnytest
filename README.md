# Sunnywestern

Site landing pour **Sunnywestern**, serveur RedM RP français en whitelist.

> Le soleil se couche sur une frontière sans loi. Ramasse ton chapeau, scelle ton cheval — l'Ouest n'attend personne.

## Stack

- React 18 (UMD)
- Babel Standalone (compilation JSX en runtime — pas de build step)
- CSS pur, polices Google Fonts
- 100% statique — déployable sur n'importe quel hébergeur (GitHub Pages, Netlify, Vercel, Cloudflare Pages…)

## Structure

```
Sunnywestern.html   ← entrée HTML
app.jsx             ← root React + panneau Tweaks
hero.jsx            ← section hero (parallax)
sections.jsx        ← Lore, Features, Galerie, Connexion, Règles, FAQ, Roadmap, etc.
icons.jsx           ← set d'icônes SVG + hook reveal
tweaks-panel.jsx    ← panneau d'édition live (dev)
styles.css          ← thème complet
```

## Lancer en local

Ouvre `Sunnywestern.html` dans un navigateur (ou via un serveur static type `python -m http.server`).

## Déploiement

C'est un site statique : push les fichiers tels quels. Sur GitHub Pages, renomme `Sunnywestern.html` en `index.html` (ou crée un alias).

---

© MMXXVI · Drink your milk, partner.
