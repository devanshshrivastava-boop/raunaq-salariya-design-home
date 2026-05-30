import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { CustomCursor } from "./CustomCursor";
import { useBookmarks } from "@/hooks/useBookmarks";
import logo from "@/assets/rsd-logo.jpg";

const navItems = [
  { to: "/", label: "Raunaq Salariya Designs" },
  { to: "/interiors", label: "Interio Spaces" },
  { to: "/store", label: "Hodch Store" },
];

export function Layout() {
  const { location } = useRouterState();
  const { count } = useBookmarks();
  return (
    <div className="grain min-h-screen flex flex-col relative">
      <CustomCursor />
      {/* Watermark logo */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 flex items-center justify-center z-0 opacity-[0.045]"
      >
        <img src={logo} alt="" className="w-[60vmin] h-[60vmin] object-contain" />
      </div>

      <header className="relative z-20 border-b border-[var(--border)] bg-[var(--ivory)]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="RSD" className="h-12 w-12 object-contain" />
            <div className="leading-none">
              <div className="font-display text-xl tracking-[0.2em]">RSD</div>
              <div className="text-[10px] tracking-[0.32em] uppercase text-[var(--muted-foreground)] mt-1">Raunaq Salariya Designs</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((n) => (
              <Link key={n.to} to={n.to} className="nav-link" activeOptions={{ exact: n.to === "/" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-5">
            <Link to="/bookmarks" className="relative inline-flex items-center gap-2 text-[var(--ink)] hover:text-[var(--gold)] transition" aria-label="Bookmarks" data-cursor="hover">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 3h12v18l-6-4-6 4V3z"/></svg>
              {count > 0 && <span className="absolute -top-2 -right-3 bg-[var(--oxblood)] text-[var(--ivory)] text-[10px] px-1.5 py-0.5 rounded-full font-sans">{count}</span>}
            </Link>
            <a href="mailto:studio@rsd.in" className="btn-quote inline-block">Commission</a>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="relative z-10 border-t border-[var(--border)] mt-24 bg-[var(--cream)]/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="font-display text-3xl">Raunaq Salariya Designs</div>
            <p className="mt-3 max-w-md text-[var(--muted-foreground)]">
              An atelier capturing the spirit of our times — interiors, commissions, and curated objects for a Modern India.
            </p>
          </div>
          <div>
            <div className="eyebrow mb-3">Studio</div>
            <ul className="space-y-1">
              <li><Link to="/" className="hover:text-[var(--gold)]">About</Link></li>
              <li><Link to="/interiors" className="hover:text-[var(--gold)]">Interio Spaces</Link></li>
              <li><Link to="/store" className="hover:text-[var(--gold)]">Hodch Store</Link></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-3">Contact</div>
            <p>studio@rsd.in</p>
            <p>+91 98 1098 1098</p>
            <p className="text-sm text-[var(--muted-foreground)] mt-2">Noida · Delhi · Chandigarh</p>
          </div>
        </div>
        <div className="border-t border-[var(--border)] py-5 text-center text-xs tracking-[0.3em] uppercase text-[var(--muted-foreground)]">
          © {new Date().getFullYear()} RSD · A grandfather's legacy, continued.
        </div>
      </footer>
    </div>
  );
}
