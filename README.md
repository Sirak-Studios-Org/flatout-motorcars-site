# Flatout Motor Cars — Website

Static marketing site for Flatout Motor Cars and the Drakan. No build step, no framework. Just HTML, CSS, and a little JavaScript, so it deploys straight from this repo and any developer can extend it.

Built by Sirak Studios.

## Structure

```
flatout-site/
  index.html          # homepage (single page, anchored sections)
  css/styles.css      # all styling, fully responsive
  js/main.js          # sticky header, mobile nav, scroll reveal
  assets/img/         # optimized car photography + Flatout logo/favicon
  README.md
```

## Preview locally

Open `index.html` in a browser, or run a tiny local server for clean paths:

```bash
cd flatout-site
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploy

Any static host works. Three easy paths:

- **GitHub Pages:** push this folder as a repo, then Settings → Pages → Deploy from branch → `main` / root. Live in ~1 minute.
- **Vercel / Netlify:** drag the folder in, or connect the GitHub repo. Auto-deploys on every push. Both give free SSL and let you attach `flatoutmotorcars.com`.
- **Custom domain:** point `flatoutmotorcars.com` at the host and enable HTTPS.

## Brand

- Display type: Saira Condensed. Body: Inter. Both load from Google Fonts.
- Core palette: near-black `#0B0B0C`, surface `#141416`, Flatout red `#E10600`, text `#ECECEC`.
- All values are CSS variables at the top of `styles.css`, so a rebrand is a few edits.

## Content notes

- Pricing matches the Drakan spec sheet: Tier I $200,000, Tier II $225,000+, Tier III custom.
- Copy is rewritten clean and on-brand. No em-dashes, no over-claiming. Crash data is framed as simulation, never certification.
- Quotes are the existing attributions; confirm the owner pull-quote wording with Albert before it goes fully public.

## Recommended next steps

1. Register and connect `flatoutmotorcars.com`, then swap the gmail to `hello@flatoutmotorcars.com` (in `index.html` footer and CTA `mailto:`).
2. Replace the hero still with a short looping film of the Drakan once we shoot it.
3. Add a single owner testimonial video to the proof section.
4. Build inner pages as the catalog grows: a full Drakan spec page, a builds/configurator page, and a contact form (Formspree or Netlify Forms, no backend needed).
