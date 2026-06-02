import { useEffect, useRef } from "react";

/**
 * Subtle, classy vintage 3D backdrop for the hero.
 * - Hero image gets gentle scroll parallax + a whisper of mouse-driven tilt (perspective)
 * - A soft sun-leak and faint dust grain drift quietly on mouse/scroll
 * - A warm vignette anchors the composition like aged photographic paper
 * All movement is intentionally restrained — depth, not theatrics.
 */
export function NaturalParallax({ heroRef }: { heroRef: React.RefObject<HTMLElement | null> }) {
  const leak = useRef<HTMLDivElement>(null);
  const dust = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // lerped state for buttery, lag-free easing
    let tmx = 0, tmy = 0; // target mouse (-1..1)
    let mx = 0, my = 0;   // smoothed mouse
    let sy = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tmx = (e.clientX / window.innerWidth - 0.5) * 2;
      tmy = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => { sy = window.scrollY; };

    const loop = () => {
      // ease toward target — small factor = silky, classy motion
      mx += (tmx - mx) * 0.06;
      my += (tmy - my) * 0.06;

      const hero = heroRef.current;
      if (hero) {
        const img = hero.querySelector<HTMLElement>("[data-parallax='hero']");
        if (img) {
          const rx = (-my * 1.6).toFixed(3);  // very subtle tilt
          const ry = (mx * 1.6).toFixed(3);
          const tx = (mx * 8).toFixed(2);
          const ty = (sy * 0.18 + my * 6).toFixed(2);
          img.style.transform =
            `perspective(1400px) rotateX(${rx}deg) rotateY(${ry}deg) translate3d(${tx}px, ${ty}px, 0) scale(1.08)`;
        }
      }
      if (leak.current) {
        leak.current.style.transform = `translate3d(${mx * 14}px, ${my * 10 + sy * 0.05}px, 0)`;
      }
      if (dust.current) {
        dust.current.style.transform = `translate3d(${mx * -6}px, ${my * -5 + sy * 0.02}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [heroRef]);

  // pre-compute a stable scatter of glitter motes
  const motes = Array.from({ length: 26 }).map((_, i) => ({
    left: (i * 37 + 13) % 100,
    delay: ((i * 1.37) % 12).toFixed(2),
    dur: (10 + ((i * 2.3) % 8)).toFixed(2),
    size: 1 + ((i * 7) % 3),
    drift: ((i * 11) % 30) - 15,
    op: 0.18 + ((i * 13) % 22) / 100,
  }));

  return (
    <>
      {/* whisper-soft sun-leak — like late afternoon through linen */}
      <div
        ref={leak}
        aria-hidden
        className="pointer-events-none absolute -inset-32 z-[2] will-change-transform"
        style={{
          background:
            "radial-gradient(45% 38% at 20% 24%, color-mix(in oklab, var(--gold) 28%, transparent), transparent 72%), radial-gradient(40% 32% at 82% 78%, color-mix(in oklab, var(--oxblood) 18%, transparent), transparent 75%)",
          mixBlendMode: "screen",
          filter: "blur(55px)",
          opacity: 0.32,
        }}
      />
      {/* faint film grain — barely there */}
      <div
        ref={dust}
        aria-hidden
        className="pointer-events-none absolute -inset-20 z-[3] will-change-transform"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/></svg>\")",
          mixBlendMode: "soft-light",
          opacity: 0.18,
        }}
      />
      {/* aged-paper vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          boxShadow:
            "inset 0 0 240px 60px color-mix(in oklab, var(--ink) 42%, transparent), inset 0 0 80px 0 color-mix(in oklab, var(--ink) 22%, transparent)",
        }}
      />
      {/* warm sepia wash for that vintage taste */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--oxblood) 8%, transparent) 0%, transparent 35%, color-mix(in oklab, var(--gold) 6%, transparent) 100%)",
          mixBlendMode: "multiply",
        }}
      />
      {/* subtle falling gold glitter — like dust caught in late sun */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[4] overflow-hidden">
        {motes.map((m, i) => (
          <span
            key={i}
            className="rsd-mote"
            style={{
              left: `${m.left}%`,
              top: "-10%",
              width: `${m.size}px`,
              height: `${m.size}px`,
              opacity: m.op,
              animationDelay: `${m.delay}s`,
              animationDuration: `${m.dur}s`,
              ["--drift" as never]: `${m.drift}px`,
            }}
          />
        ))}
      </div>
    </>
  );
}
