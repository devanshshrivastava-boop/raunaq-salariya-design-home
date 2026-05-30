import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export type CollageTile = {
  id: string;
  title: string;
  image: string;
  hoverImage?: string; // shown on hover (HODCH only)
  shape?: "tall" | "wide" | "square" | "portrait";
  to?: string;
  params?: Record<string, string>;
  caption?: string;
};


/**
 * Aero / Thomas O'Brien-inspired editorial collage:
 * mixed aspect tiles, ivory caption strip at the bottom, gold hairline frame, soft hover lift.
 */
export function CollageGrid({ tiles }: { tiles: CollageTile[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7 auto-rows-[200px] md:auto-rows-[240px]" style={{ gridAutoFlow: "dense" }}>
      {tiles.map((t, i) => {
        const span =
          t.shape === "tall"
            ? "row-span-2"
            : t.shape === "wide"
            ? "col-span-2"
            : t.shape === "portrait"
            ? "row-span-2"
            : "";

        // Slight collage rotation (-1.4deg .. +1.6deg), deterministic per index
        const rot = (((i * 73) % 30) / 10 - 1.4).toFixed(2);

        const inner = (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, delay: (i % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, rotate: 0 }}
            style={{
              rotate: `${rot}deg`,
              border: "1px solid color-mix(in oklab, var(--oxblood) 35%, transparent)",
              boxShadow:
                "0 1px 0 oklch(1 0 0 / 0.45) inset, 0 22px 44px -28px oklch(0.2 0.02 60 / 0.55)",
              background: "var(--cream)",
              borderRadius: 0,
            }}
            className="group relative h-full w-full overflow-hidden rounded-none"
            data-cursor="image"
          >
            <img
              src={t.image}
              alt={t.title}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1400ms] ease-out group-hover:scale-[1.07] ${t.hoverImage ? "group-hover:opacity-0" : "group-hover:[filter:sepia(0.35)_saturate(1.15)_contrast(1.05)]"}`}
              style={{ filter: "sepia(0.18) saturate(1.08) contrast(1.04)" }}
            />
            {t.hoverImage && (
              <img
                src={t.hoverImage}
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms] ease-out group-hover:scale-[1.07]"
                style={{ filter: "sepia(0.22) saturate(1.15) contrast(1.05)" }}
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.85_0.06_70_/_0.08)] via-transparent to-[var(--ink)]/25 pointer-events-none" />
            {/* film grain on tile */}
            <div className="pointer-events-none absolute inset-0 opacity-25 mix-blend-multiply"
              style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")" }} />
            {/* vintage caption strip */}
            <div className="absolute left-0 right-0 bottom-0 bg-[oklch(0.96_0.04_82_/_0.94)] backdrop-blur-[2px] border-t border-[color-mix(in_oklab,var(--oxblood)_40%,transparent)] py-3 px-4 flex items-center justify-between gap-3">
              <div>
                <div className="font-serif tracking-[0.24em] uppercase text-[11px] md:text-[12px] text-[var(--ink)]">
                  {t.title}
                </div>
                {t.caption && (
                  <div className="text-[9px] tracking-[0.28em] uppercase text-[var(--oxblood)] mt-0.5"
                       style={{ fontFamily: "ui-monospace, 'JetBrains Mono', monospace" }}>
                    {t.caption}
                  </div>
                )}
              </div>
              <span
                className="text-[10px] tracking-[0.25em] uppercase px-2 py-1 border border-[var(--oxblood)] text-[var(--oxblood)] group-hover:bg-[var(--oxblood)] group-hover:text-[var(--ivory)] transition-colors duration-300"
                style={{ fontFamily: "ui-monospace, 'JetBrains Mono', monospace" }}
              >
                Explore →
              </span>
            </div>
          </motion.div>
        );

        const cls = `${span} block`;
        if (t.to) {
          return (
            <Link
              key={t.id}
              to={t.to as any}
              params={t.params as any}
              className={cls}
              data-cursor="hover"
            >
              {inner}
            </Link>
          );
        }
        return <div key={t.id} className={cls}>{inner}</div>;
      })}
    </div>
  );
}

export function CollageSection({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
      <div className="flex items-end justify-between flex-wrap gap-6 mb-10 md:mb-14">
        <div>
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          <h2 className="font-display text-4xl md:text-6xl mt-3 leading-[1.02]">{title}</h2>
        </div>
        {intro && (
          <p className="max-w-md font-serif text-[var(--muted-foreground)] text-lg leading-relaxed">
            {intro}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}
