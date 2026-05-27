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
  { to: "/interiors/process", label: "Process" },
  { to: "/interiors/journal", label: "Journal" },
];

function InteriorsLayout() {
  const { pathname } = useLocation();
  return (
    <div>
      <div className="border-b border-[var(--border)] bg-[var(--cream)]/40 sticky top-[81px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link to="/interiors" className="font-display text-2xl tracking-wide">Interio <em className="italic text-[var(--gold)]">Spaces</em></Link>
          <nav className="flex gap-8">
            {subNav.map((n) => {
              const active = n.exact ? pathname === n.to || pathname.startsWith("/interiors/services") : pathname === n.to;
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
