import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { storeCategories } from "@/lib/data";

// Eagerly grab every image the user has dropped into
// src/assets/hodch/<slug>/ (any naming convention, e.g. art-1.jpg, book-1.jpg).
// `card.jpg` is excluded — it's reserved for the category cover.
const hodchAssets = import.meta.glob("@/assets/hodch/*/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

function pickFor(slug: string): string[] {
  return Object.entries(hodchAssets)
    .filter(([p]) => p.includes(`/hodch/${slug}/`) && !p.endsWith("/card.jpg"))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, url]) => url);
}

export const Route = createFileRoute("/store/$slug/$itemId")({
  head: ({ params }) => {
    const cat = storeCategories.find((c) => c.slug === params.slug);
    const item = cat?.items.find((it) => it.id === params.itemId);
    return {
      meta: [
        { title: `${item?.title ?? "Piece"} — ${cat?.name ?? "Hodch Store"}` },
        { name: "description", content: item?.title ?? "Hodch Store piece" },
      ],
      links: [{ rel: "canonical", href: `/store/${params.slug}/${params.itemId}` }],
    };
  },
  loader: ({ params }) => {
    const cat = storeCategories.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    const item = cat.items.find((it) => it.id === params.itemId);
    if (!item) throw notFound();
    return { cat, item };
  },
  component: ProductVariantsPage,
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto py-32 text-center">
      <h1 className="font-display text-5xl">Piece not found</h1>
      <Link to="/store" className="btn-quote mt-8 inline-block">Back to Store</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="max-w-3xl mx-auto py-32 text-center">
      <h1 className="font-display text-4xl">Something went quiet.</h1>
      <p className="mt-4 text-[var(--muted-foreground)]">{error.message}</p>
    </div>
  ),
});

const finishes = [
  "Studio Edit", "Atelier Alt", "Heritage Patina", "Brass Inlay", "Walnut Trim",
  "Carrara Marble", "Oxblood Velvet", "Ivory Linen", "Verde Marble", "Hand-Painted",
];

function ProductVariantsPage() {
  const { cat, item } = Route.useLoaderData();

  const pool = pickFor(cat.slug);
  // Use the pool for both base and hover (offset by 1 for hover swap variety).

  // Always render 10 variant cards. Fall back to the product's own image if
  // the user hasn't yet dropped JPGs into the folder.
  const variants = Array.from({ length: 10 }).map((_, i) => ({
    id: `v-${i + 1}`,
    label: `Variant ${String(i + 1).padStart(2, "0")} — ${finishes[i % finishes.length]}`,
    image: pool[i] ?? item.image,
    hover: pool[(i + 1) % Math.max(pool.length, 1)] ?? item.hoverImage ?? item.image,
    blurb: i % 2
      ? "An alternate material direction — available on commission, calibrated to your room."
      : "The studio's primary edit — the finish most often asked for in this collection.",
  }));

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
      <Link
        to="/store/$slug"
        params={{ slug: cat.slug }}
        className="eyebrow hover:text-[var(--gold)]"
      >
        ← Back to {cat.name}
      </Link>

      <div className="mt-6 mb-12 max-w-3xl">
        <div className="eyebrow">Hodch Store · {cat.name}</div>
        <h1 className="font-display text-5xl lg:text-7xl mt-3 leading-[1.02]">{item.title}.</h1>
        {item.price && (
          <div className="mt-5">
            <span className="price-chip">{item.price}</span>
            <span className="ml-3 text-xs text-[var(--muted-foreground)] italic">price on request adjustable</span>
          </div>
        )}
        <div className="gold-divider my-10">
          <span className="line" />
          <span className="text-xs tracking-[0.4em] uppercase font-sans">Ten Varieties</span>
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
                href={`mailto:studio@rsd.in?subject=Quote%20Request%20-%20${encodeURIComponent(item.title + " - " + v.label)}`}
                className="btn-quote inline-block mt-4"
              >
                Get Quote
              </a>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
