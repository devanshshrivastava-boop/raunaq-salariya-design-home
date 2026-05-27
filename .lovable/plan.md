All 10 items will be addressed, but honestly: generating 30 unique, name-matched images for every product (30 products × 30 = 900+) and 20 for every interior module (15+ modules × 20 = 300+) in a single turn is not physically possible — it would take hours of image generation and tens of thousands of tokens. I'll deliver the full structure + interactions now, with the "curated tier" image strategy you approved (6–8 truly unique per category, the rest tasteful name-matched variants using tinted/labeled placeholders that look intentional, not broken). You then point at any single category per follow-up and I deep-fill it to 20/30 unique shots.

## This turn — ship everything structural + visible polish

### Phase A — Fixes & interactions (issues 1, 2, 3, 6)
1. **Home hero (issue 1)** — naturalistic parallax: layered paper/grain/light-leak planes with `transform: translate3d` on scroll + mouse, soft vignette breathing. Hero title animates letter-by-letter with a spring bounce (framer-motion `stiffness 260, damping 12`, staggered).
2. **Interio Spaces sub-nav (issue 2)** — remove `position: sticky`, make it a normal in-flow bar that scrolls away under the main navbar. Main navbar stays sticky; sub-nav does not.
3. **Hodch Store hero slider (issue 3)** — 5 curated wide images, autoplay every 5s, crossfade + slow Ken-Burns zoom, dots + arrow controls, pause on hover.
4. **Cursor (issue 6)** — rewrite with `requestAnimationFrame` + lerp (0.18), `pointer-events: none`, `mix-blend-mode: difference` only on light surfaces, explicit `:hover` states for `a, button, [data-cursor]` so it never disrupts on navbar/images. Disabled on touch.

### Phase B — Collage layouts (the reference screenshots)
5. **Store collage grid** — recreate the Aero-style masonry: mixed aspect tiles (tall/wide/square), category caption bar at bottom of each tile (ivory strip + serif label), gold hairline frames, hover lift + subtle desaturate-to-color. Same component reused on Interiors page for service modules.

### Phase C — Vintage/premium polish (issues 7, 10)
6. Typography pass: headings in **Cormorant Garamond** + **Italiana**, body in **EB Garamond**, accents in **Pinyon Script** for handwritten Aero-style flourishes. Drop caps on long copy. Letterspaced small-caps for section eyebrows.
7. Texture pass: aged-paper background, faint gold hairlines, vignette corners, deeper oxblood/emerald accents, gold-leaf dividers.
8. Copy pass: longer descriptive paragraphs (designer story, every service intro, every collection intro) — written, not lorem.

### Phase D — Content expansion (issues 4, 5, 8, 9)
9. **More work images on home (issue 8)** — generate 6 additional commission photos and extend the archive grid.
10. **Expanded modules (issue 9)** — add Restaurant, Cafe, Hotel Lobby, Banquet/Party Hall, Boutique Retail, Spa, Co-working, Clinic, Pent-house, Farmhouse to the existing 9. Each module page lists **20 named varieties** with name-matched imagery (6–8 unique generated, rest tasteful labeled tiles).
11. **Store deep grid (issue 5)** — add Tables, Clocks, Marbles, Mirrors, Vases, Lamps, Carpets, Art, Books, Textiles. Each category opens to **30 named varieties with price**, click → product detail page → bookmark button.

### Phase E — Auth + bookmarks (issue 5, your "Lovable Cloud" choice)
12. Enable Lovable Cloud, email + Google sign-in, `profiles` table, `bookmarks` table (user_id, product_slug, name, price, image), RLS policies, `/auth` page, bookmark heart icon on every product, `/bookmarks` page listing saved items with remove.

## Next turns — deep-fill on demand
You tell me "deep-fill Kitchen" or "deep-fill Sofas" and I generate the full 20/30 unique name-matched images for that one category. Doing all categories now would burn the entire session on image gen and starve the structural work.

## Technical notes
- Stack stays TanStack Start + Tailwind + framer-motion.
- Cloud (Supabase) used for auth + bookmarks only; product catalog stays in `src/lib/data.ts` (no admin UI needed).
- Cursor uses rAF loop, not framer springs, to eliminate the lag you're seeing.
- Sub-nav fix is a one-line CSS change (`sticky` → `static`).
- Each deep-fill request after this = ~20–30 image gens + a data file update.

Confirm and I execute Phases A→E in this turn. If you'd rather I prioritize (e.g. skip auth this turn to fit more imagery), say which phase to drop.