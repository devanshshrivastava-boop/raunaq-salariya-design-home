import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/interiors")({
  head: () => ({
    meta: [
      { title: "Interio Spaces — Raunaq Salariya Designs" },
      { name: "description", content: "Interio Spaces by RSD — services, process and journal for residential and hospitality interiors." },
      { property: "og:title", content: "Interio Spaces — RSD" },
    ],
    links: [{ rel: "canonical", href: "/interiors" }],
  }),
  component: InteriorsLayout,
});

const subNav = [
  { to: "/interiors", label: "Services", exact: true },
  { to: "/interiors/process", label: "Process", exact: false },
  { to: "/interiors/journal", label: "Journal", exact: false },
] as const;

function InteriorsLayout() {
  const { pathname } = useLocation();
  return (
    <div>
      {/* In-flow sub-nav: scrolls away under the main navbar, not sticky */}
      <div className="border-b border-[var(--border)] bg-[var(--cream)]/40 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link to="/interiors" className="font-display text-2xl tracking-wide">Interio <em className="italic text-[var(--gold)]">Spaces</em></Link>
          <nav className="flex gap-8">
            {subNav.map((n) => {
              // "Services" is active for /interiors and any /interiors/services/* path
              const active = n.exact
                ? pathname === "/interiors" || pathname.startsWith("/interiors/services")
                : pathname === n.to || pathname.startsWith(n.to + "/");
              return (
                <Link key={n.to} to={n.to} className="nav-link" data-status={active ? "active" : undefined}>
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
}
