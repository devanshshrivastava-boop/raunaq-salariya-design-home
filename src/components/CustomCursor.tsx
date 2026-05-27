import { useEffect, useRef } from "react";

/**
 * Smooth gold cursor — rAF + lerp, no framer springs.
 * - Pointer-events disabled so it never blocks clicks/hovers on the navbar.
 * - Different hover state for links, buttons, and images.
 * - Disabled on touch devices.
 */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx, dy = my, rx = mx, ry = my;
    let raf = 0;
    let mode: "default" | "link" | "image" = "default";
    let visible = false;

    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (!visible) {
        visible = true;
        if (dot.current) dot.current.style.opacity = "1";
        if (ring.current) ring.current.style.opacity = "1";
      }
    };

    const leave = () => {
      visible = false;
      if (dot.current) dot.current.style.opacity = "0";
      if (ring.current) ring.current.style.opacity = "0";
    };

    const loop = () => {
      // Dot — fast & tight
      dx += (mx - dx) * 0.55;
      dy += (my - dy) * 0.55;
      // Ring — slower trail
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;

      if (dot.current) {
        dot.current.style.transform = `translate3d(${dx - 3}px, ${dy - 3}px, 0)`;
      }
      if (ring.current) {
        const scale = mode === "link" ? 2.2 : mode === "image" ? 2.8 : 1;
        ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0) scale(${scale})`;
      }
      raf = requestAnimationFrame(loop);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest("a, button, [role='button'], [data-cursor='hover'], input, textarea, select, label")) {
        mode = "link";
      } else if (t.closest("img, picture, [data-cursor='image']")) {
        mode = "image";
      } else {
        mode = "default";
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.addEventListener("mouseleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="hidden md:block fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9999] will-change-transform opacity-0"
        style={{
          border: "1px solid var(--gold)",
          boxShadow: "0 0 22px -4px color-mix(in oklab, var(--gold) 60%, transparent)",
          transition: "transform 240ms cubic-bezier(.22,1,.36,1), opacity 220ms ease, border-color 240ms",
          mixBlendMode: "normal",
        }}
      />
      <div
        ref={dot}
        aria-hidden
        className="hidden md:block fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] will-change-transform opacity-0"
        style={{ background: "var(--gold)", transition: "opacity 200ms ease" }}
      />
    </>
  );
}
