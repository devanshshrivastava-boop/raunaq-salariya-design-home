import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type Slide = { image: string; eyebrow?: string; title: string; italic?: string; caption?: string };

export function HeroSlider({ slides, interval = 5000 }: { slides: Slide[]; interval?: number }) {
  const [i, setI] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!paused.current) setI((v) => (v + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [slides.length, interval]);

  const slide = slides[i];

  return (
    <section
      className="relative h-[78vh] min-h-[520px] overflow-hidden"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1.0 }}
          exit={{ opacity: 0, scale: 1.0 }}
          transition={{ opacity: { duration: 1.2 }, scale: { duration: 6, ease: "linear" } }}
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)]/55 via-[var(--ink)]/25 to-[var(--ivory)]" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-end pb-16 text-[var(--ivory)] z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {slide.eyebrow && <div className="eyebrow text-[var(--gold-soft)]">{slide.eyebrow}</div>}
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl mt-3 leading-[0.92]">
              {slide.title}
              {slide.italic && <em className="italic text-[var(--gold-soft)]"> {slide.italic}</em>}
            </h1>
            {slide.caption && (
              <p className="font-serif text-lg max-w-xl mt-5 text-[var(--ivory)]/85">{slide.caption}</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* dots */}
      <div className="absolute bottom-6 right-8 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className="group p-2"
            data-cursor="hover"
          >
            <span
              className={`block w-8 h-[2px] transition-all duration-500 ${
                idx === i ? "bg-[var(--gold-soft)]" : "bg-[var(--ivory)]/40 group-hover:bg-[var(--ivory)]/70"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
