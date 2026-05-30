import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import type { ImageItem } from "@/lib/data";
import { useBookmarks } from "@/hooks/useBookmarks";

export function ItemLightboxGrid({
  items,
  categorySlug,
  categoryName,
  showPrice,
  hoverSwap = false,
  linkToVariants = false,
}: {
  items: ImageItem[];
  categorySlug: string;
  categoryName: string;
  showPrice?: boolean;
  /** When true, hovering a card crossfades to `item.hoverImage` (HODCH only). */
  hoverSwap?: boolean;
  /** When true, clicking a card navigates to /store/$slug/$itemId instead of opening the modal. */
  linkToVariants?: boolean;
}) {

  const [active, setActive] = useState<ImageItem | null>(null);
  const { toggle, has } = useBookmarks();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((it, idx) => {
          const saved = has({ slug: categorySlug, itemId: it.id });
          return (
            <motion.figure
              key={it.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (idx % 6) * 0.05 }}
              className="group"
            >
              {(() => {
                const inner = (
                  <>
                    <div
                      className="relative aspect-[4/3] overflow-hidden bg-[var(--cream)] border border-[color-mix(in_oklab,var(--oxblood)_25%,transparent)] transition-transform duration-500 group-hover:scale-[1.02]"
                      style={{
                        boxShadow:
                          "0 1px 0 oklch(1 0 0 / 0.5) inset, 0 18px 36px -22px oklch(0.2 0.02 60 / 0.45)",
                      }}
                    >
                      <img
                        src={it.image}
                        alt={it.title}
                        loading="lazy"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[400ms] ease-out ${
                          hoverSwap && it.hoverImage ? "group-hover:opacity-0" : ""
                        }`}
                      />
                      {hoverSwap && it.hoverImage && (
                        <img
                          src={it.hoverImage}
                          alt=""
                          aria-hidden
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms] ease-out"
                          style={{ filter: "sepia(0.18) saturate(1.1)" }}
                        />
                      )}
                    </div>
                    <figcaption className="pt-5">
                      <div className="text-xs eyebrow">No. {String(idx + 1).padStart(2, "0")}</div>
                      <h3 className="font-serif text-xl mt-1 leading-snug">{it.title}</h3>
                      {showPrice && it.price && (
                        <div className="mt-3 flex items-center gap-3">
                          <span className="price-chip">{it.price}</span>
                          <span className="text-xs text-[var(--muted-foreground)] italic">price on request adjustable</span>
                        </div>
                      )}
                    </figcaption>
                  </>
                );
                return linkToVariants ? (
                  <Link
                    to="/store/$slug/$itemId"
                    params={{ slug: categorySlug, itemId: it.id }}
                    className="block w-full text-left"
                    data-cursor="hover"
                  >
                    {inner}
                  </Link>
                ) : (
                  <button onClick={() => setActive(it)} className="block w-full text-left" data-cursor="hover">
                    {inner}
                  </button>
                );
              })()}

              <div className="mt-4 flex items-center gap-3">
                <a href="mailto:studio@rsd.in?subject=Quote%20Request" className="btn-quote inline-block">Get Quote</a>
                {showPrice && (
                  <button
                    aria-label={saved ? "Remove bookmark" : "Bookmark"}
                    title={saved ? "Remove bookmark" : "Bookmark"}
                    onClick={() =>
                      toggle({
                        slug: categorySlug,
                        itemId: it.id,
                        title: it.title,
                        image: it.image,
                        price: it.price,
                        category: categoryName,
                        savedAt: Date.now(),
                      })
                    }
                    className={`bookmark-btn ${saved ? "is-on" : ""}`}
                    data-cursor="hover"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
                      <path d="M6 3h12v18l-6-4-6 4V3z" />
                    </svg>
                  </button>
                )}
              </div>
            </motion.figure>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9000] bg-[var(--ink)]/85 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={active.image} alt={active.title} className="w-full max-h-[78vh] object-contain bg-[var(--ink)] border border-[var(--gold-soft)]/40" />
              <div className="flex items-end justify-between mt-5 text-[var(--ivory)] gap-6 flex-wrap">
                <div>
                  <h3 className="font-display text-3xl">{active.title}</h3>
                  {showPrice && active.price && (
                    <div className="mt-2"><span className="price-chip">{active.price}</span></div>
                  )}
                </div>
                <a href="mailto:studio@rsd.in?subject=Quote%20Request" className="btn-quote !border-[var(--ivory)] !text-[var(--ivory)] hover:!bg-[var(--ivory)] hover:!text-[var(--ink)]">Get Quote</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
