import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { interiorCategories } from "@/lib/data";
import { ItemLightboxGrid } from "@/components/ItemLightboxGrid";

export const Route = createFileRoute("/interiors/services/$slug")({
  head: ({ params }) => {
    const c = interiorCategories.find((x) => x.slug === params.slug);
    return {
      meta: [
        { title: `${c?.name ?? "Service"} — Interio Spaces` },
        { name: "description", content: c?.tagline ?? "RSD Interio Spaces" },
      ],
      links: [{ rel: "canonical", href: `/interiors/services/${params.slug}` }],
    };
  },
  loader: ({ params }) => {
    const cat = interiorCategories.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    return { cat };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto py-32 text-center">
      <h1 className="font-display text-5xl">Chapter not found</h1>
      <Link to="/interiors" className="btn-quote mt-8 inline-block">Back to Services</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="max-w-3xl mx-auto py-32 text-center">
      <h1 className="font-display text-4xl">Something went quiet.</h1>
      <p className="mt-4 text-[var(--muted-foreground)]">{error.message}</p>
    </div>
  ),
});

function CategoryPage() {
  const { cat } = Route.useLoaderData();
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
      <Link to="/interiors" className="eyebrow hover:text-[var(--gold)]">← All Services</Link>
      <div className="mt-6 mb-10 max-w-3xl">
        <div className="eyebrow">Interio Spaces · Chapter</div>
        <h1 className="font-display text-6xl lg:text-7xl mt-3">{cat.name}.</h1>
        <p className="font-serif italic text-2xl text-[var(--muted-foreground)] mt-3">{cat.tagline}</p>
        {cat.description && <p className="body-text mt-6 text-[var(--ink)]/85">{cat.description}</p>}
        <div className="gold-divider my-10"><span className="line" /><span className="text-xs tracking-[0.4em] uppercase font-sans">{cat.items.length} Directions</span><span className="line" /></div>
      </div>
      <ItemLightboxGrid items={cat.items} categorySlug={cat.slug} categoryName={cat.name} />
    </section>
  );
}
