import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { processSteps } from "@/lib/data";
import atelier from "@/assets/atelier.jpg";

export const Route = createFileRoute("/interiors/process")({
  head: () => ({
    meta: [
      { title: "Our Process — Interio Spaces" },
      { name: "description", content: "How RSD works and delivers — seven chapters from discovery to handover." },
    ],
    links: [{ rel: "canonical", href: "/interiors/process" }],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <div>
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <img src={atelier} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--ink)]/70" />
        <div className="relative h-full max-w-5xl mx-auto px-6 flex flex-col justify-end pb-16 text-[var(--ivory)]">
          <div className="eyebrow text-[var(--gold-soft)]">The Process</div>
          <h1 className="font-display text-6xl lg:text-8xl mt-3 leading-[0.95]">Seven<br/><em className="italic text-[var(--gold-soft)]">chapters.</em></h1>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 lg:px-12 py-24">
        <div className="space-y-20">
          {processSteps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: i % 2 ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9 }}
              className="grid grid-cols-12 gap-6 items-start"
            >
              <div className="col-span-3 sm:col-span-2">
                <div className="font-display text-7xl text-[var(--gold)] leading-none">{s.n}</div>
              </div>
              <div className="col-span-9 sm:col-span-10 border-l border-[var(--border)] pl-6 sm:pl-10">
                <h3 className="font-display text-4xl">{s.title}</h3>
                <p className="font-serif text-xl text-[var(--muted-foreground)] mt-3 leading-relaxed">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="ornament-rule my-20"><span className="font-serif italic">Begin yours</span></div>
        <div className="text-center">
          <a href="mailto:studio@rsd.in" className="btn-quote">Commission a project</a>
        </div>
      </section>
    </div>
  );
}
