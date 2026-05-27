import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { interiorCategories } from "@/lib/data";

export const Route = createFileRoute("/interiors/")({
  component: Services,
});

function Services() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="eyebrow">Services</div>
        <h1 className="font-display text-5xl lg:text-7xl mt-3 leading-[1.02]">Every room, considered.</h1>
        <p className="font-serif text-lg text-[var(--muted-foreground)] mt-6">
          From the foyer to the pooja room — choose a chapter to explore twenty distinct directions, each with a frame, a description, and an invitation to commission.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {interiorCategories.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.08 }}
          >
            <Link to="/interiors/services/$slug" params={{ slug: c.slug }} className="block group" data-cursor="hover">
              <div className="gold-frame overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden bg-[var(--cream)] relative">
                  <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-[var(--ivory)]">
                    <div className="font-display text-3xl">{c.name}</div>
                    <div className="text-sm font-serif italic mt-1 text-[var(--gold-soft)]">{c.tagline}</div>
                  </div>
                </div>
              </div>
              <div className="pt-4 flex items-center justify-between">
                <span className="eyebrow">20 Directions</span>
                <span className="font-serif italic text-[var(--gold)] group-hover:translate-x-1 transition-transform">Explore →</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
