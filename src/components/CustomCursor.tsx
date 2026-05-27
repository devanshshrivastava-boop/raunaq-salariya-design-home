import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = 0, y = 0, rx = 0, ry = 0;
    let raf = 0;
    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const i = t.closest("a,button,[data-cursor='hover']");
      ring.current?.classList.toggle("scale-150", !!i);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={ring} className="hidden md:block fixed top-0 left-0 w-9 h-9 rounded-full border border-[var(--gold)] pointer-events-none z-[9999] transition-transform duration-300 ease-out mix-blend-difference" />
      <div ref={dot} className="hidden md:block fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[var(--gold)] pointer-events-none z-[9999]" />
    </>
  );
}
