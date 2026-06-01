import { createFileRoute, Outlet, notFound } from "@tanstack/react-router";
import { storeCategories } from "@/lib/data";

export const Route = createFileRoute("/store/$slug")({
  loader: ({ params }) => {
    const cat = storeCategories.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    return { cat };
  },
  component: () => <Outlet />,
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto py-32 text-center">
      <h1 className="font-display text-5xl">Collection not found</h1>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="max-w-3xl mx-auto py-32 text-center">
      <h1 className="font-display text-4xl">Something went quiet.</h1>
      <p className="mt-4 text-[var(--muted-foreground)]">{error.message}</p>
    </div>
  ),
});
