import { useState, useRef } from "react";
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
  fancy = false,
  variantsBase = "store",
}: {
  items: ImageItem[];
  categorySlug: string;
  categoryName: string;
  showPrice?: boolean;
  /** When true, hovering a card crossfades to `item.hoverImage` (HODCH only). */
  hoverSwap?: boolean;
  /** When true, clicking a card navigates to the variants page instead of opening the modal. */
  linkToVariants?: boolean;
  /** Enables 3D tilt, shimmer sweep, scale-up, saturation boost, sliding label. */
  fancy?: boolean;
  /** Which variants route to navigate to when linkToVariants is true. */
  variantsBase?: "store" | "interiors";
}) {
  const [active, setActive] = useState<ImageItem | null>(null);
  const { toggle, has } = useBookmarks();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((it, idx) => {
          const saved = has({ slug: categorySlug, itemId: it.id });
          return (
            <FancyCard
              key={it.id}
              item={it}
              index={idx}
              fancy={fancy}
              hoverSwap={hoverSwap}
              linkToVariants={linkToVariants}
              categorySlug={categorySlug}
              variantsBase={variantsBase}
              showPrice={showPrice}
              onActivate={() => setActive(it)}
              saved={saved}
              onBookmark={() =>
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
            />
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

function FancyCard({
  item,
  index,
  fancy,
  hoverSwap,
  linkToVariants,
  categorySlug,
  variantsBase = "store",
  showPrice,
  onActivate,
  saved,
  onBookmark,
}: {
  item: ImageItem;
  index: number;
  fancy: boolean;
  hoverSwap: boolean;
  linkToVariants: boolean;
  categorySlug: string;
  variantsBase?: "store" | "interiors";
  showPrice?: boolean;
  onActivate: () => void;
  saved: boolean;
  onBookmark: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number, clientY: number) => {
    if (!fancy || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    const px = (clientX - r.left) / r.width;   // 0..1
    const py = (clientY - r.top) / r.height;   // 0..1
    const rotY = (px - 0.5) * 24;              // ±12deg
    const rotX = (0.5 - py) * 24;              // ±12deg
    wrapRef.current.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(1.08)`;
    if (glowRef.current) {
      glowRef.current.style.background =
        `radial-gradient(circle at ${px * 100}% ${py * 100}%, color-mix(in oklab, var(--gold) 38%, transparent) 0%, transparent 55%)`;
      glowRef.current.style.opacity = "1";
    }
  };
  const handleReset = () => {
    if (!fancy || !wrapRef.current) return;
    wrapRef.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  const cardInner = (
    <>
      <div
        ref={wrapRef}
        onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
        onMouseLeave={handleReset}
        onTouchStart={(e) => {
          const t = e.touches[0];
          if (t) handleMove(t.clientX, t.clientY);
        }}
        onTouchMove={(e) => {
          const t = e.touches[0];
          if (t) handleMove(t.clientX, t.clientY);
        }}
        onTouchEnd={handleReset}
        className={`relative aspect-[4/3] overflow-hidden bg-[var(--cream)] border border-[color-mix(in_oklab,var(--oxblood)_25%,transparent)] group/card ${fancy ? "fancy-card" : "transition-transform duration-500 group-hover:scale-[1.02]"}`}
        style={{
          boxShadow: "0 1px 0 oklch(1 0 0 / 0.5) inset, 0 18px 36px -22px oklch(0.2 0.02 60 / 0.45)",
          willChange: "transform",
          transformStyle: fancy ? "preserve-3d" : undefined,
          transition: fancy ? "transform 360ms cubic-bezier(0.34, 1.56, 0.64, 1)" : undefined,
        }}
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-[opacity,filter] duration-[400ms] ease-out ${hoverSwap && item.hoverImage ? "group-hover/card:opacity-0" : ""} ${fancy ? "group-hover/card:[filter:saturate(1.3)_brightness(1.05)]" : ""}`}
          style={{ willChange: "opacity, filter" }}
        />
        {hoverSwap && item.hoverImage && (
          <img
            src={item.hoverImage}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover/card:opacity-100 transition-opacity duration-[400ms] ease-out"
            style={{ filter: "sepia(0.18) saturate(1.15) brightness(1.05)", willChange: "opacity" }}
          />
        )}

        {fancy && (
          <>
            {/* shimmer light sweep */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(115deg, transparent 35%, rgba(255,235,170,0.45) 50%, transparent 65%)",
                transform: "translateX(-120%)",
                animation: "rsd-shimmer 1.4s ease-in-out infinite",
              }}
            />
            {/* radial mouse glow */}
            <div
              ref={glowRef}
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 mix-blend-screen"
            />
            {/* sliding name label */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 bottom-0 px-4 py-3 opacity-0 translate-y-[10px] group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300 ease-out"
              style={{
                background: "linear-gradient(to top, rgba(20,12,4,0.78), transparent)",
                color: "var(--ivory)",
              }}
            >
              <div className="font-display text-lg leading-tight">{item.title}</div>
              {item.price && <div className="text-[10px] tracking-[0.3em] uppercase mt-1 text-[var(--gold-soft)]">{item.price}</div>}
            </div>
          </>
        )}
      </div>
      <figcaption className="pt-5">
        <div className="text-xs eyebrow">No. {String(index + 1).padStart(2, "0")}</div>
        <h3 className="font-serif text-xl mt-1 leading-snug">{item.title}</h3>
        {showPrice && item.price && (
          <div className="mt-3 flex items-center gap-3">
            <span className="price-chip">{item.price}</span>
            <span className="text-xs text-[var(--muted-foreground)] italic">price on request adjustable</span>
          </div>
        )}
      </figcaption>
    </>
  );

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.05 }}
      className="group"
    >
      {linkToVariants ? (
        <Link
          to="/store/$slug/$itemId"
          params={{ slug: categorySlug, itemId: item.id }}
          className="block w-full text-left"
          data-cursor="hover"
        >
          {cardInner}
        </Link>
      ) : (
        <button onClick={onActivate} className="block w-full text-left" data-cursor="hover">
          {cardInner}
        </button>
      )}

      <div className="mt-4 flex items-center gap-3">
        <a href="mailto:studio@rsd.in?subject=Quote%20Request" className="btn-quote inline-block">Get Quote</a>
        {showPrice && (
          <button
            aria-label={saved ? "Remove bookmark" : "Bookmark"}
            title={saved ? "Remove bookmark" : "Bookmark"}
            onClick={onBookmark}
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
}
