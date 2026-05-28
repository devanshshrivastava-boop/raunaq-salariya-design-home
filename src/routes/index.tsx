import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useRef } from "react";
import hero from "@/assets/hero-home.jpg";
import founder from "@/assets/founder.png";
import atelier from "@/assets/atelier.jpg";
import { featuredProjects, testimonials } from "@/lib/data";
import { BouncingTitle } from "@/components/BouncingTitle";
import { NaturalParallax } from "@/components/NaturalParallax";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Raunaq Salariya Designs — Vintage Luxury Interiors" },
      { name: "description", content: "RSD is the atelier of Raunaq Salariya — interiors, commissions and curated objects from a heritage Indian design practice." },
      { property: "og:title", content: "Raunaq Salariya Designs" },
      { property: "og:description", content: "Heritage interiors, villas, hotels and restaurants by Raunaq Salariya." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const heroRef = useRef<HTMLElement>(null);
  return (
    <div>
      {/* HERO with naturalistic 3D parallax + bouncing letters */}
      <section ref={heroRef} className="relative h-[94vh] min-h-[660px] overflow-hidden">
        <div data-parallax="hero" className="absolute inset-0 will-change-transform" style={{ transformStyle: "preserve-3d" }}>
          <img
            src={hero}
            alt="Vintage Indian villa interior at golden hour"
            className="w-full h-full object-cover"
            style={{ filter: "sepia(0.18) saturate(1.05) contrast(1.04) brightness(0.96)" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)]/30 via-transparent to-[var(--ivory)] z-[2]" />
        <NaturalParallax heroRef={heroRef} />

        <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-end pb-24 z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }}>
            <div className="eyebrow text-[var(--gold-soft)]">Founder · Principal Designer</div>
          </motion.div>
          <BouncingTitle
            text="Raunaq"
            italic="Salariya"
            className="text-[clamp(3.2rem,9.5vw,10rem)] text-[var(--ivory)] mt-3"
            delay={0.15}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 1.2 }}
            className="mt-7 max-w-xl text-[var(--ivory)]/85 text-lg font-serif italic"
          >
            An attempt to capture the spirit of our times — and engage in the exciting potential that bubbles at the surface of <span className="script text-2xl text-[var(--gold-soft)]"> Modern India.</span>
          </motion.p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-28 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
          className="lg:col-span-5"
        >
          <div className="gold-frame">
            <img src={founder} alt="Mr. Raunaq Salariya, Founder" className="w-full h-[560px] object-cover" />
          </div>
          <div className="text-center mt-5">
            <div className="font-display text-2xl">Mr. Raunaq Salariya</div>
            <div className="eyebrow mt-1">Founder · B.Sc. Interior Design, Amity</div>
            <div className="script text-2xl text-[var(--gold)] mt-2">— with affection</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.15 }}
          className="lg:col-span-7"
        >
          <div className="eyebrow">The Designer</div>
          <h2 className="font-display text-5xl lg:text-6xl mt-3 leading-[1.05]">A practice rooted in <em className="italic text-[var(--oxblood)]">restraint, ritual</em>, and craft.</h2>
          <div className="gold-divider my-8"><span className="line" /><span className="text-xs tracking-[0.4em] uppercase font-sans">Est. Atelier</span><span className="line" /></div>
          <div className="space-y-5 body-text">
            <p className="drop-cap">Founder of Raunaq Salariya Designs, Mr. Raunaq holds a <strong>B.Sc. (Interior Design) from Amity School of Design, Noida</strong> — with five vibrant years of professional experience in bringing complex and exciting designs to life. The studio is a continuation of a family legacy: a grandfather's house, a draftsman's table, a discipline of drawing before deciding.</p>
            <p>Having lived and worked in multiple cities, he carries a sense of professionalism and integrity that has largely defined his career and design background. His belief is that design can be art, design can be aesthetics, and good design is always simple — which is precisely why it is so complicated to execute.</p>
            <p>He also believes that building space is a team effort, and that having a large, professional team of craftsmen, draftsmen, conservators and stylists is the key that sets the practice apart.</p>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-[var(--border)]">
            {[["05+","Years of practice"],["40+","Commissions"],["12","Cities served"]].map(([n,l]) => (
              <div key={l}>
                <div className="font-display text-4xl text-[var(--oxblood)]">{n}</div>
                <div className="eyebrow mt-1">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* WORK — The Archive (expanded) */}
      <section className="bg-[var(--cream)]/60 py-28 border-y border-[var(--border)] aged-paper">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <div className="eyebrow">Selected Commissions</div>
              <h2 className="font-display text-5xl lg:text-6xl mt-3">The <em className="italic text-[var(--gold)]">Archive.</em></h2>
            </div>
            <p className="max-w-md body-text text-[var(--muted-foreground)]">
              Villas, residences, hotels and restaurants — a chronicle of work executed across the country over the past decade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProjects.map((p, i) => (
              <motion.article
                key={p.name}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.1 }}
                className="group"
              >
                <div className="gold-frame overflow-hidden">
                  <div className="aspect-[4/5] overflow-hidden bg-[var(--cream)]">
                    <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110" />
                  </div>
                </div>
                <div className="pt-5 flex items-baseline justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl">{p.name}</h3>
                    <div className="eyebrow mt-1">{p.type} · {p.location}</div>
                  </div>
                  <div className="font-serif italic text-[var(--gold)]">{p.year}</div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-5xl mx-auto px-6 lg:px-12 py-32 text-center">
        <div className="eyebrow">Voices</div>
        <h2 className="font-display text-5xl lg:text-6xl mt-3 mb-16">Those who have lived with the work.</h2>
        <div className="space-y-16">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
              className="font-serif italic text-2xl lg:text-3xl leading-relaxed"
            >
              <span className="font-display text-7xl text-[var(--gold)] leading-none align-top mr-2">“</span>
              {t.quote}
              <footer className="not-italic mt-6 eyebrow text-[var(--ink)]">— {t.author} <span className="text-[var(--muted-foreground)]">/ {t.role}</span></footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      {/* ATELIER CTA */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src={atelier} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--ink)]/65" />
        <div className="relative h-full flex items-center justify-center text-center px-6">
          <div className="text-[var(--ivory)] max-w-2xl">
            <div className="eyebrow text-[var(--gold-soft)]">Begin a Commission</div>
            <h2 className="font-display text-5xl lg:text-6xl mt-3">Step into the atelier.</h2>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Link to="/interiors" className="btn-quote !border-[var(--ivory)] !text-[var(--ivory)] hover:!bg-[var(--ivory)] hover:!text-[var(--ink)]">Explore Interio Spaces</Link>
              <Link to="/store" className="btn-quote !border-[var(--gold-soft)] !text-[var(--gold-soft)] hover:!bg-[var(--gold-soft)] hover:!text-[var(--ink)]">Visit Hodch Store</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
