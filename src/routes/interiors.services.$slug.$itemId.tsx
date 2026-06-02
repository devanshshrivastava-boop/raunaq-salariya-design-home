import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { interiorCategories } from "@/lib/data";

// Eagerly grab every image the user has dropped into
// src/assets/interio/<slug>/ (any naming convention, e.g. living-1.jpg).
// `card.jpg` is excluded — it's reserved for the category cover.
const interioAssets = import.meta.glob("@/assets/interio/*/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

function pickFor(slug: string): string[] {
  return Object.entries(interioAssets)
    .filter(([p]) => p.includes(`/interio/${slug}/`) && !p.endsWith("/card.jpg"))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, url]) => url);
}

export const Route = createFileRoute("/interiors/services/$slug/$itemId")({
  head: ({ params }) => {
    const cat = interiorCategories.find((c) => c.slug === params.slug);
    const item = cat?.items.find((it) => it.id === params.itemId);
    return {
      meta: [
        { title: `${item?.title ?? "Direction"} — ${cat?.name ?? "Interio Spaces"}` },
        { name: "description", content: item?.title ?? "Interio Spaces direction" },
      ],
      links: [{ rel: "canonical", href: `/interiors/services/${params.slug}/${params.itemId}` }],
    };
  },
  loader: ({ params }) => {
    const cat = interiorCategories.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    const item = cat.items.find((it) => it.id === params.itemId);
    if (!item) throw notFound();
    return { cat, item };
  },
  component: DirectionVariantsPage,
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto py-32 text-center">
      <h1 className="font-display text-5xl">Direction not found</h1>
      <Link to="/interiors" className="btn-quote mt-8 inline-block">Back to Services</Link>
    </div>
  ),
});

const moods = [
  "Studio Edit", "Heritage Mood", "Modern Restraint", "Brass & Walnut", "Marble & Linen",
  "Verde Forest", "Oxblood Salon", "Ivory Atelier", "Hand-Carved", "Bespoke Commission",
];

function DirectionVariantsPage() {
  const { cat, item } = Route.useLoaderData();
  const pool = pickFor(cat.slug);

  const variants = Array.from({ length: 10 }).map((_, i) => ({
    id: `v-${i + 1}`,
    label: `${moods[i % moods.length]} · ${String(i + 1).padStart(2, "0")}`,
    image: pool[i] ?? item.image,
    hover: pool[(i + 1) % Math.max(pool.length, 1)] ?? item.image,
    blurb: i % 2
      ? "An alternate direction — same room, different soul. Available on commission."
      : "The studio's primary direction for this chapter — calibrated to your room.",
  }));

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
      <Link
        to="/interiors/services/$slug"
        params={{ slug: cat.slug }}
        className="eyebrow hover:text-[var(--gold)]"
      >
        ← Back to {cat.name}
      </Link>

      <div className="mt-6 mb-12 max-w-3xl">
        <div className="eyebrow">Interio Spaces · {cat.name}</div>
        <h1 className="font-display text-5xl lg:text-7xl mt-3 leading-[1.02]">{item.title}.</h1>
        <div className="gold-divider my-10">
          <span className="line" />
          <span className="text-xs tracking-[0.4em] uppercase font-sans">Ten Directions</span>
          <span className="line" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {variants.map((v, i) => (
          <motion.figure
            key={v.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: (i % 6) * 0.05 }}
            className="group"
          >
            <div
              className="relative aspect-[4/5] overflow-hidden bg-[var(--cream)] border border-[color-mix(in_oklab,var(--oxblood)_25%,transparent)] transition-transform duration-500 group-hover:scale-[1.02]"
              style={{
                boxShadow: "0 1px 0 oklch(1 0 0 / 0.5) inset, 0 22px 44px -22px oklch(0.2 0.02 60 / 0.5)",
              }}
              data-cursor="hover"
            >
              <img
                src={v.image}
                alt={`${item.title} — ${v.label}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[450ms] ease-out group-hover:opacity-0"
                style={{ filter: "sepia(0.14) saturate(1.06) contrast(1.03)" }}
              />
              <img
                src={v.hover}
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-[450ms] ease-out"
                style={{ filter: "sepia(0.16) saturate(1.15) brightness(1.04)" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 bottom-0 px-4 py-3 opacity-0 translate-y-[10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out"
                style={{ background: "linear-gradient(to top, rgba(20,12,4,0.78), transparent)", color: "var(--ivory)" }}
              >
                <div className="font-display text-lg leading-tight">{v.label}</div>
              </div>
            </div>
            <figcaption className="pt-5">
              <div className="eyebrow">No. {String(i + 1).padStart(2, "0")}</div>
              <h3 className="font-display text-2xl mt-1">{v.label}</h3>
              <p className="font-serif italic text-sm text-[var(--muted-foreground)] mt-2 max-w-md">{v.blurb}</p>
              <a
                href={`mailto:studio@rsd.in?subject=Commission%20-%20${encodeURIComponent(item.title + " - " + v.label)}`}
                className="btn-quote inline-block mt-4"
              >
                Begin a Commission
              </a>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
