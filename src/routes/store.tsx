import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import storeHero from "@/assets/store-hero.jpg";
import { storeCategories } from "@/lib/data";

export const Route = createFileRoute("/store")({
  head: () => ({
    meta: [
      { title: "Hodch Store — Curated Vintage Objects" },
      { name: "description", content: "The Hodch Store by RSD — sofas, chairs, dining tables, chandeliers, wall hangings and rugs for the heritage home." },
      { property: "og:title", content: "Hodch Store — RSD" },
    ],
    links: [{ rel: "canonical", href: "/store" }],
  }),
  component: Store,
});

function Store() {
  return (
    <div>
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <motion.img src={storeHero} alt="Curated heritage objects" className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: [0.22,1,0.36,1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)]/55 via-[var(--ink)]/30 to-[var(--ivory)]" />
        <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-end pb-16 text-[var(--ivory)]">
          <div className="eyebrow text-[var(--gold-soft)]">Hodch Store</div>
          <h1 className="font-display text-7xl lg:text-9xl mt-3 leading-[0.92]">
            Objects with <em className="italic text-[var(--gold-soft)]">provenance.</em>
          </h1>
          <p className="font-serif text-lg max-w-xl mt-5 text-[var(--ivory)]/85">
            A curated edit of furniture, lighting and textiles — used in our projects, available for yours.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {storeCategories.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08 }}
            >
              <Link to="/store/$slug" params={{ slug: c.slug }} className="group block" data-cursor="hover">
                <div className="gold-frame overflow-hidden">
                  <div className="aspect-square overflow-hidden bg-[var(--cream)]">
                    <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
                  </div>
                </div>
                <div className="pt-5 flex items-baseline justify-between">
                  <div>
                    <h2 className="font-display text-3xl">{c.name}</h2>
                    <div className="eyebrow mt-1">{c.tagline}</div>
                  </div>
                  <span className="font-serif italic text-[var(--gold)]">{c.items.length} pieces →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
