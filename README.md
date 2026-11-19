# CotoPay — homepage concept (V1 "Infra")

A live, animated homepage concept for [CotoPay](https://cotopay.in): purpose-locked UPI vouchers for company spend.

Built with **React 19 + Vite**, **Framer Motion** for reveals and scroll animation, and **Lenis** for smooth scrolling. Type is **Geist** and **Geist Mono** (Google Fonts).

## Run it

```bash
npm install
npm run dev       # local dev server at http://localhost:5173
npm run build     # production build in /dist
npm run preview   # serve the build locally
```

Needs Node 20 or newer.

## Deploy

**GitHub Pages:** push to `main`, then in the repo go to *Settings → Pages → Source* and choose **GitHub Actions**. The workflow in `.github/workflows/deploy.yml` builds and publishes the site. `vite.config.js` uses `base: './'`, so it works under any repo path.

**Vercel / Netlify:** import the repo. Build command `npm run build`, output folder `dist`.

## Structure

```
src/
  App.jsx            page order, Lenis smooth scroll, How → Compare overlap stack
  ui.jsx             Reveal, Stagger, CountUp, Canvas (scaled fixed-size art), Btn
  motion.js          shared easing and variants
  Icons.jsx          inline SVG icon set + wordmark
  index.css          all styles and breakpoints
  sections/
    Hero.jsx         announcement bar, nav, hero (issue → phone → paid sequence), trust band
    Locks.jsx        interactive spend locks
    UseCases.jsx     use-case bento (fleet road, petty cash, flexi benefits…)
    How.jsx          "How it works" — 4 dark cards with step-by-step visuals
    Rest.jsx         stats, comparison table, security, testimonial, team, demo CTA, footer
public/img/          placeholder photos (swap for real ones)
```

## Before going live

- Replace the placeholder photos in `public/img/` with real customer imagery.
- The testimonial, the "fleet owner · 300 cabs" credit and the stats (6.5 cr+ merchants, 28+ categories) are placeholders — confirm or replace them.
- The demo form is front-end only; connect it to your CRM or form endpoint in `sections/Rest.jsx` (`DemoCTA`).
- Nav and footer links point to `#` anchors.
