import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mx = 0, my = 0;
    let dx = 0, dy = 0, rx = 0, ry = 0;
    let raf = 0;
    let hovering = false;

    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const loop = () => {
      // Dot follows tightly, ring trails softly
      dx += (mx - dx) * 0.45;
      dy += (my - dy) * 0.45;
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      if (dot.current) dot.current.style.transform = `translate3d(${dx - 3}px, ${dy - 3}px, 0)`;
      if (ring.current) {
        const s = hovering ? 1.9 : 1;
        ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0) scale(${s})`;
      }
      raf = requestAnimationFrame(loop);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      hovering = !!t.closest("a,button,[data-cursor='hover'],input,textarea,select");
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        className="hidden md:block fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{
          border: "1px solid var(--gold)",
          boxShadow: "0 0 18px -2px color-mix(in oklab, var(--gold) 55%, transparent)",
          transition: "transform 220ms cubic-bezier(.22,1,.36,1), opacity 220ms",
        }}
      />
      <div
        ref={dot}
        className="hidden md:block fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{ background: "var(--gold)" }}
      />
    </>
  );
}
