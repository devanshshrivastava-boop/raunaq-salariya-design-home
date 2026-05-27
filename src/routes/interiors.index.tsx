import { createFileRoute } from "@tanstack/react-router";
import { interiorCategories } from "@/lib/data";
import { CollageGrid, CollageSection, type CollageTile } from "@/components/CollageGrid";

export const Route = createFileRoute("/interiors/")({
  component: Services,
});

function Services() {
  const tiles: CollageTile[] = interiorCategories.map((c, i) => ({
    id: c.slug,
    title: c.name,
    image: c.image,
    caption: "20 Directions",
    to: "/interiors/services/$slug",
    params: { slug: c.slug },
    shape: ([ "tall", "square", "wide", "square", "square", "portrait", "square", "wide", "square", "tall", "square", "square", "wide", "portrait", "square" ] as const)[i % 15],
  }));

  return (
    <CollageSection
      eyebrow="Interio Spaces · Services"
      title={<>Every room, <em className="italic text-[var(--gold)]">considered.</em></>}
      intro={
        <>
          From the foyer to the pooja room, from the boutique to the banquet hall — choose a chapter to walk
          twenty distinct directions, each with a frame, a description, and an invitation to commission.
        </>
      }
    >
      <CollageGrid tiles={tiles} />
    </CollageSection>
  );
}
