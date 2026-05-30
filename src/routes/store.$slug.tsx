import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { storeCategories } from "@/lib/data";
import { ItemLightboxGrid } from "@/components/ItemLightboxGrid";

export const Route = createFileRoute("/store/$slug")({
  head: ({ params }) => {
    const c = storeCategories.find((x) => x.slug === params.slug);
    return {
      meta: [
        { title: `${c?.name ?? "Collection"} — Hodch Store` },
        { name: "description", content: c?.tagline ?? "Hodch Store collection" },
      ],
      links: [{ rel: "canonical", href: `/store/${params.slug}` }],
    };
  },
  loader: ({ params }) => {
    const cat = storeCategories.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    return { cat };
  },
  component: StoreCategoryPage,
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto py-32 text-center">
      <h1 className="font-display text-5xl">Collection not found</h1>
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

function StoreCategoryPage() {
  const { cat } = Route.useLoaderData();
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
      <Link to="/store" className="eyebrow hover:text-[var(--gold)]">← All Collections</Link>
      <div className="mt-6 mb-10">
        <div className="eyebrow">Hodch Store · Collection</div>
        <h1 className="font-display text-6xl lg:text-7xl mt-3">{cat.name}.</h1>
        <p className="font-serif italic text-2xl text-[var(--muted-foreground)] mt-3">{cat.tagline}</p>
        {cat.description && (
          <p className="body-text mt-6 max-w-3xl text-[var(--ink)]/85">{cat.description}</p>
        )}
        <div className="gold-divider my-10"><span className="line" /><span className="text-xs tracking-[0.4em] uppercase font-sans">{cat.items.length} Pieces</span><span className="line" /></div>
      </div>
      <ItemLightboxGrid items={cat.items} categorySlug={cat.slug} categoryName={cat.name} showPrice hoverSwap linkToVariants />
    </section>
  );
}
