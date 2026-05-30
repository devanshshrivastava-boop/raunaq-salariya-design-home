import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { storeCategories } from "@/lib/data";

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

function ProductVariantsPage() {
  const { cat, item } = Route.useLoaderData();

  // Two varieties of this piece — primary + hover/alternate variant.
  const variants = [
    { id: "v1", label: "Variant I — Studio Edit", image: item.image, blurb: "The studio's primary edit — the one most commissioned, in the most asked-after finish." },
    { id: "v2", label: "Variant II — Atelier Alt", image: item.hoverImage ?? item.image, blurb: "A second material direction — an alternate colourway or finish, available on request." },
  ];

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
          <span className="text-xs tracking-[0.4em] uppercase font-sans">Two Varieties</span>
          <span className="line" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {variants.map((v, i) => (
          <motion.figure
            key={v.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="group"
          >
            <div
              className="relative aspect-[4/5] overflow-hidden bg-[var(--cream)] border border-[color-mix(in_oklab,var(--oxblood)_25%,transparent)] transition-transform duration-500 group-hover:scale-[1.02]"
              style={{
                boxShadow:
                  "0 1px 0 oklch(1 0 0 / 0.5) inset, 0 22px 44px -22px oklch(0.2 0.02 60 / 0.5)",
              }}
            >
              <img
                src={v.image}
                alt={`${item.title} — ${v.label}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                style={{ filter: "sepia(0.16) saturate(1.08) contrast(1.04)" }}
              />
            </div>
            <figcaption className="pt-5">
              <div className="eyebrow">No. {String(i + 1).padStart(2, "0")}</div>
              <h3 className="font-display text-3xl mt-1">{v.label}</h3>
              <p className="font-serif italic text-[var(--muted-foreground)] mt-2 max-w-md">{v.blurb}</p>
              <a
                href={`mailto:studio@rsd.in?subject=Quote%20Request%20-%20${encodeURIComponent(item.title + " - " + v.label)}`}
                className="btn-quote inline-block mt-5"
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
