import { createFileRoute } from "@tanstack/react-router";
import { storeCategories } from "@/lib/data";
import { HeroSlider } from "@/components/HeroSlider";
import { CollageGrid, CollageSection, type CollageTile } from "@/components/CollageGrid";
import storeHero from "@/assets/store-hero.jpg";
import sofa from "@/assets/store-sofa.jpg";
import chandelier from "@/assets/store-chandelier.jpg";
import chair from "@/assets/store-chair.jpg";
import rug from "@/assets/store-rug.jpg";
import wall from "@/assets/store-wall.jpg";

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

const slides = [
  { image: storeHero, eyebrow: "Hodch Store", title: "Objects with", italic: "provenance.", caption: "A curated edit of furniture, lighting and textiles — used in our projects, available for yours." },
  { image: sofa, eyebrow: "New Arrivals", title: "Velvet and", italic: "walnut.", caption: "Sofas built by hand by craftsmen we've worked with for years." },
  { image: chandelier, eyebrow: "Light", title: "Crystal and", italic: "brass.", caption: "Chandeliers chosen one room at a time." },
  { image: rug, eyebrow: "Floor Stories", title: "Knotted by", italic: "hand.", caption: "Persian, Kashmir and Tibetan rugs from master weavers." },
  { image: wall, eyebrow: "The Wall", title: "Mirrors &", italic: "memory.", caption: "Venetian glass, carved wood, and hand-painted panels." },
];

function Store() {
  const tiles: CollageTile[] = storeCategories.map((c, i) => ({
    id: c.slug,
    title: c.name,
    image: c.image,
    caption: `${c.items.length} pieces`,
    to: "/store/$slug",
    params: { slug: c.slug },
    shape: ([ "wide", "square", "tall", "square", "square", "tall", "square", "wide", "tall", "square", "square", "portrait", "square", "wide" ] as const)[i % 14],
  }));

  return (
    <div>
      <HeroSlider slides={slides} interval={5000} />

      <CollageSection
        eyebrow="The Edit"
        title={<>A house, in <em className="italic text-[var(--gold)]">fourteen rooms.</em></>}
        intro={
          <>
            From sofas to silver, from clocks to clay — each collection is curated by the studio.
            Press a tile to walk the room. <span className="script text-2xl text-[var(--gold)]">Be welcome.</span>
          </>
        }
      >
        <CollageGrid tiles={tiles} />
      </CollageSection>
    </div>
  );
}
