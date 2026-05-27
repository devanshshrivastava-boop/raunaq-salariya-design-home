import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ImageItem } from "@/lib/data";

export function ItemLightboxGrid({ items }: { items: ImageItem[] }) {
  const [active, setActive] = useState<ImageItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((it, idx) => (
          <motion.figure
            key={it.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (idx % 6) * 0.05 }}
            className="group"
          >
            <button
              onClick={() => setActive(it)}
              className="block w-full text-left"
              data-cursor="hover"
            >
              <div className="gold-frame overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-[var(--cream)]">
                  <img
                    src={it.image}
                    alt={it.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                </div>
              </div>
              <figcaption className="pt-5">
                <div className="text-xs eyebrow">No. {String(idx + 1).padStart(2, "0")}</div>
                <h3 className="font-serif text-xl mt-1 leading-snug">{it.title}</h3>
              </figcaption>
            </button>
            <a href="mailto:studio@rsd.in?subject=Quote%20Request" className="btn-quote inline-block mt-4">Get Quote</a>
          </motion.figure>
        ))}
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
              <div className="gold-frame">
                <img src={active.image} alt={active.title} className="w-full max-h-[78vh] object-contain bg-[var(--ink)]" />
              </div>
              <div className="flex items-end justify-between mt-5 text-[var(--ivory)]">
                <h3 className="font-display text-3xl">{active.title}</h3>
                <a href="mailto:studio@rsd.in?subject=Quote%20Request" className="btn-quote !border-[var(--ivory)] !text-[var(--ivory)] hover:!bg-[var(--ivory)] hover:!text-[var(--ink)]">Get Quote</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
