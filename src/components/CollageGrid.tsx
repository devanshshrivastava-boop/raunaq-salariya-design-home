import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export type CollageTile = {
  id: string;
  title: string;
  image: string;
  /** Aspect: "tall" | "wide" | "square" | "portrait" — controls grid span */
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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[220px]">
      {tiles.map((t, i) => {
        const span =
          t.shape === "tall"
            ? "row-span-2"
            : t.shape === "wide"
            ? "col-span-2"
            : t.shape === "portrait"
            ? "row-span-2"
            : "";

        const inner = (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: (i % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3 }}
            className="group relative h-full w-full overflow-hidden bg-[var(--cream)] shadow-[0_1px_0_oklch(1_0_0_/_0.5)_inset,0_18px_40px_-28px_oklch(0.2_0.02_60_/_0.5)]"
            style={{ border: "1px solid color-mix(in oklab, var(--gold) 35%, transparent)" }}
            data-cursor="image"
          >
            <img
              src={t.image}
              alt={t.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--ink)]/15 pointer-events-none" />
            {/* caption strip */}
            <div className="absolute left-0 right-0 bottom-0 bg-[var(--ivory)]/92 backdrop-blur-[2px] border-t border-[color-mix(in_oklab,var(--gold)_30%,transparent)] py-3 px-4 text-center">
              <div className="font-serif tracking-[0.28em] uppercase text-[11px] md:text-[12px] text-[var(--ink)]/85">
                {t.title}
              </div>
              {t.caption && (
                <div className="text-[10px] tracking-[0.22em] uppercase text-[var(--muted-foreground)] mt-0.5">
                  {t.caption}
                </div>
              )}
            </div>
            {/* gilt inner border */}
            <div className="pointer-events-none absolute inset-[6px] border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        );

        const cls = `${span}`;
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
