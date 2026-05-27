import { useEffect, useRef } from "react";

/**
 * Naturalistic layered parallax behind the hero image.
 * - Hero image gets gentle scroll parallax
 * - A grain plane and a warm light-leak plane drift on mouse and scroll
 * - All transforms use translate3d for GPU compositing
 */
export function NaturalParallax({ heroRef }: { heroRef: React.RefObject<HTMLElement | null> }) {
  const leak = useRef<HTMLDivElement>(null);
  const dust = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0;
    let sy = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      sy = window.scrollY;
    };

    const loop = () => {
      const hero = heroRef.current;
      if (hero) {
        const img = hero.querySelector<HTMLElement>("[data-parallax='hero']");
        if (img) img.style.transform = `translate3d(0, ${sy * 0.22}px, 0) scale(1.06)`;
      }
      if (leak.current) {
        leak.current.style.transform = `translate3d(${mx * 22}px, ${my * 16 + sy * 0.08}px, 0)`;
      }
      if (dust.current) {
        dust.current.style.transform = `translate3d(${mx * -10}px, ${my * -8 + sy * 0.04}px, 0)`;
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

  return (
    <>
      {/* warm sun-leak */}
      <div
        ref={leak}
        aria-hidden
        className="pointer-events-none absolute -inset-32 z-[2] will-change-transform"
        style={{
          background:
            "radial-gradient(40% 35% at 22% 28%, color-mix(in oklab, var(--gold) 45%, transparent), transparent 70%), radial-gradient(35% 30% at 80% 70%, color-mix(in oklab, var(--oxblood) 30%, transparent), transparent 70%)",
          mixBlendMode: "screen",
          filter: "blur(40px)",
          opacity: 0.55,
        }}
      />
      {/* drifting dust grain */}
      <div
        ref={dust}
        aria-hidden
        className="pointer-events-none absolute -inset-20 z-[3] will-change-transform"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          mixBlendMode: "soft-light",
          opacity: 0.35,
        }}
      />
      {/* vintage vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          boxShadow:
            "inset 0 0 200px 40px color-mix(in oklab, var(--ink) 55%, transparent), inset 0 0 60px 0 color-mix(in oklab, var(--ink) 30%, transparent)",
        }}
      />
    </>
  );
}
