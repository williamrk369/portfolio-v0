# Portfolio — Applied AI / Full-Stack Engineer

A one-page portfolio built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

## Editing content

All copy lives in **`src/content/site.ts`**. Presentation never hard-codes text.

- Anything in `[square brackets]` is a **placeholder**. It renders with a dashed outline
  so it can't ship unnoticed. Replace the whole string, brackets included.
- A link whose `href` is still a placeholder renders as text, not as a dead link.
- Project screenshots: add `image: { src, alt, width, height }` to a project (file in `/public`).
  Until then an abstract preview is drawn and labelled as a placeholder.
- Portrait: set `about.portrait` the same way.
- Set `site.url` to the production URL (used for metadata).

## Structure

```
src/
  app/            layout (fonts, metadata), page, globals.css (design tokens), icon.svg
  content/        site.ts: every word on the page
  lib/content.tsx <Text> placeholder renderer, isPlaceholder(), plain()
  components/
    ui/           Container + grid, ButtonLink, SectionHeading, SmartLink, Reveal, RevealObserver
    sections/     SiteHeader, MobileNav, Hero, HeroFigure, Credibility, Projects,
                  ProjectPreview, Capabilities, Approach, About, Contact, SiteFooter
```

Only `MobileNav` and `RevealObserver` are Client Components; everything else is server-rendered
and the route prerenders as static HTML.
