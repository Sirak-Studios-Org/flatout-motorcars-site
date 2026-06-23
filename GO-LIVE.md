# Go Live — flatoutmotorcars.com

Domain is registered at GoDaddy. Code lives in this repo. We point the domain at the repo via GitHub Pages. No hosting fees.

## 1. Push the repo to GitHub

From inside this `Website` folder:

```bash
git init
git add .
git commit -m "Flatout Motor Cars site v1"
git branch -M main
git remote add origin https://github.com/<your-org-or-user>/flatout-motorcars-site.git
git push -u origin main
```

(Create the empty repo first at github.com/new, name it `flatout-motorcars-site`, do not add a README.)

## 2. Turn on GitHub Pages

Repo → Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `/ (root)` → Save.
The `CNAME` file already in the repo tells Pages the domain is `flatoutmotorcars.com`.

## 3. Point GoDaddy DNS at GitHub Pages

GoDaddy → Domain → DNS → Manage DNS. First remove any parked/forwarding A record GoDaddy added for the free site. Then add:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 1 hr |
| A | @ | 185.199.109.153 | 1 hr |
| A | @ | 185.199.110.153 | 1 hr |
| A | @ | 185.199.111.153 | 1 hr |
| CNAME | www | `<your-user>.github.io` | 1 hr |

Do NOT touch the MX records. Those run your new Microsoft 365 email and must stay.

## 4. Enforce HTTPS

Back in repo → Settings → Pages, once DNS resolves (can take 15 min to a few hours), tick "Enforce HTTPS." GitHub issues a free SSL certificate automatically.

## Alternative host (if you prefer auto-deploy + instant SSL)

Connect this same GitHub repo to Vercel or Netlify. Both auto-deploy on every push, give free SSL, and add the domain with one click (they hand you the DNS records to paste into GoDaddy). Slightly easier SSL than Pages; costs nothing.

## After launch

- Activate the Microsoft 365 mailbox, then swap the site email from the gmail to a branded address (e.g. `sales@flatoutmotorcars.com`) in `index.html` footer and the CTA `mailto:` link.
- Add a contact form (Formspree or Netlify Forms, no backend) so leads land in an inbox, not just a mailto.
- Submit `sitemap.xml` in Google Search Console to start indexing.
