import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/interiors/journal")({
  head: () => ({
    meta: [
      { title: "Journal — Interio Spaces" },
      { name: "description", content: "Quiet writings from the RSD atelier — material studies, references, and notes from site." },
    ],
    links: [{ rel: "canonical", href: "/interiors/journal" }],
  }),
  component: Journal,
});

const entries = [
  { date: "May, 2026", title: "On the patience of marble", excerpt: "We waited eleven weeks for a single slab of Verde Antigua. This is why." },
  { date: "March, 2026", title: "Notes from the Kohli site", excerpt: "Detailing a brass inlay on the foyer floor — every line drawn by hand twice." },
  { date: "January, 2026", title: "A short history of the camelback sofa", excerpt: "Why we keep returning to a silhouette designed two centuries ago." },
  { date: "November, 2025", title: "Light is a material", excerpt: "How we choose lumens, colour temperature, and shadow before we choose lamps." },
  { date: "August, 2025", title: "The room that holds a family", excerpt: "Designing the modern Indian living room without losing the grandparent's chair." },
  { date: "May, 2025", title: "Why we still draw by hand", excerpt: "A studio confession about pencils, vellum, and the slow start of every project." },
];

function Journal() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <div className="eyebrow">The Journal</div>
        <h1 className="font-display text-6xl lg:text-7xl mt-3">Notes from the studio.</h1>
        <div className="ornament-rule my-8"><span className="font-serif italic">Vol. I</span></div>
      </div>

      <div className="divide-y divide-[var(--border)]">
        {entries.map((e, i) => (
          <motion.article
            key={e.title}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.05 }}
            className="py-10 group cursor-pointer"
            data-cursor="hover"
          >
            <div className="eyebrow">{e.date}</div>
            <h2 className="font-display text-3xl lg:text-4xl mt-2 group-hover:text-[var(--oxblood)] transition-colors">{e.title}</h2>
            <p className="font-serif italic text-lg text-[var(--muted-foreground)] mt-3">{e.excerpt}</p>
            <div className="mt-4 nav-link inline-block">Read entry</div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
