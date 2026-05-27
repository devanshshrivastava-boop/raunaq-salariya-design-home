import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useBookmarks } from "@/hooks/useBookmarks";

export const Route = createFileRoute("/bookmarks")({
  head: () => ({
    meta: [
      { title: "Your Bookmarks — Hodch Store" },
      { name: "description", content: "Pieces you've saved from the Hodch Store collection." },
    ],
  }),
  component: BookmarksPage,
});

function BookmarksPage() {
  const { list, remove } = useBookmarks();
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
      <div className="eyebrow">Hodch Store</div>
      <h1 className="font-display text-6xl lg:text-7xl mt-3">Your <em className="italic text-[var(--gold)]">Bookmarks.</em></h1>
      <p className="font-serif italic text-xl text-[var(--muted-foreground)] mt-3">
        Pieces you've set aside. <span className="script text-2xl text-[var(--gold)]">Held with care.</span>
      </p>
      <div className="gold-divider my-10"><span className="line" /><span className="text-xs tracking-[0.4em] uppercase font-sans">{list.length} Saved</span><span className="line" /></div>

      {list.length === 0 ? (
        <div className="text-center py-24">
          <p className="body-text text-[var(--muted-foreground)]">No bookmarks yet. Walk the store and press the ribbon to save a piece.</p>
          <Link to="/store" className="btn-quote inline-block mt-8">Visit Hodch Store</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((b, i) => (
            <motion.article
              key={`${b.slug}-${b.itemId}`}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.04 }}
              className="group"
            >
              <div className="gold-frame overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-[var(--cream)]">
                  <img src={b.image} alt={b.title} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                </div>
              </div>
              <div className="pt-5 flex items-start justify-between gap-4">
                <div>
                  <div className="eyebrow">{b.category}</div>
                  <h3 className="font-serif text-xl mt-1 leading-snug">{b.title}</h3>
                  {b.price && <div className="mt-3"><span className="price-chip">{b.price}</span></div>}
                </div>
                <button onClick={() => remove(b)} className="bookmark-btn is-on" aria-label="Remove" data-cursor="hover">
                  <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M6 6l12 12M18 6L6 18"/></svg>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}
