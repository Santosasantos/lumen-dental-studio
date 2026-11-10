"use client";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const upper = [0, 1, 2, 3, 4, 5, 6, 7];
const lower = [0, 1, 2, 3, 4, 5, 6];

function Mouth({ shade, id }: { shade: "before" | "after"; id: string }) {
  const tooth = shade === "after" ? "#ffffff" : "#e6d3a1";
  const edge = shade === "after" ? "#dfeceb" : "#c9b27a";
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" aria-hidden="true">
      <defs>
        <clipPath id={`m-${id}`}><path d="M55 104 Q200 40 345 104 Q200 182 55 104Z" /></clipPath>
        <linearGradient id={`l-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#e9917b" /><stop offset="1" stopColor="#c8644e" />
        </linearGradient>
      </defs>
      <path d="M22 104 Q110 30 200 46 Q290 30 378 104 Q290 205 200 200 Q110 205 22 104Z" fill={`url(#l-${id})`} />
      <path d="M55 104 Q200 40 345 104 Q200 182 55 104Z" fill="#5b1f24" />
      <g clipPath={`url(#m-${id})`}>
        <rect x="40" y="40" width="320" height="34" fill="#e79a9a" />
        {upper.map((i) => {
          const x = 72 + i * 32.5;
          const dy = Math.abs(i - 3.5) * 4;
          return <rect key={`u${i}`} x={x} y={60 + dy} width="30" height={46 - dy * 0.6} rx="9" fill={tooth} stroke={edge} strokeWidth="1.5" />;
        })}
        <rect x="40" y="150" width="320" height="40" fill="#e79a9a" />
        {lower.map((i) => {
          const x = 92 + i * 31;
          const dy = Math.abs(i - 3) * 4;
          return <rect key={`l${i}`} x={x} y={112 - dy * 0.3} width="29" height={36 - dy} rx="9" fill={tooth} stroke={edge} strokeWidth="1.5" />;
        })}
      </g>
      {shade === "after" && (
        <g fill="#ffffff">
          {[[118, 66, 0], [262, 70, 600], [196, 120, 1200]].map(([x, y, d]) => (
            <path key={x} className="animate-sparkle origin-center [transform-box:fill-box]" style={{ "--d": `${d}ms` } as React.CSSProperties} d={`M${x} ${y - 9} L${x + 2.5} ${y - 2.5} L${x + 9} ${y} L${x + 2.5} ${y + 2.5} L${x} ${y + 9} L${x - 2.5} ${y + 2.5} L${x - 9} ${y} L${x - 2.5} ${y - 2.5}Z`} />
          ))}
        </g>
      )}
    </svg>
  );
}

export function SmileSlider() {
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  // gentle demo sweep once the slider scrolls into view, until the visitor interacts
  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const k = Math.min((t - start) / 1600, 1);
        setPos(50 + Math.sin(k * Math.PI * 2) * 22 * (1 - k));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  const fromPointer = (clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
    setTouched(true);
  };

  return (
    <section id="smile" className="relative overflow-hidden bg-teal-900 py-20 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="animate-blob absolute -right-40 -top-20 h-[30rem] w-[30rem] rounded-full bg-teal-600/40 blur-3xl" />
        <div className="animate-blob absolute -bottom-40 -left-20 h-[26rem] w-[26rem] rounded-full bg-coral/20 blur-3xl [animation-delay:-8s]" />
      </div>
      <div className="container-site relative grid items-center gap-12 md:grid-cols-[.9fr_1.1fr] md:gap-16">
        <Reveal>
          <p className="eyebrow !text-teal-100 before:!bg-teal-100">Smile preview</p>
          <h2 className="h2 mt-3">See the difference whitening can make</h2>
          <p className="mt-4 text-lg text-white/75">
            Drag the slider to compare. Most patients see a visibly brighter smile after a single in-clinic session.
          </p>
          <ul className="mt-8 grid gap-3 text-white/85">
            {["Safe, enamel-friendly gel", "About 60 minutes in the chair", "Results that last with good care"].map((t) => (
              <li key={t} className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-coral" />{t}</li>
            ))}
          </ul>
          <a href="#book" data-service="whitening" className="btn mt-9 bg-white text-teal-900 hover:-translate-y-0.5 hover:bg-cream">Book whitening from $249</a>
        </Reveal>

        <Reveal delay={150} scale>
          <div
            ref={box}
            className="relative aspect-[4/3] cursor-ew-resize touch-none select-none overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#f6e7dc] to-[#efd2c2] shadow-2xl ring-1 ring-white/10"
            onPointerDown={(e) => { (e.target as HTMLElement).setPointerCapture?.(e.pointerId); fromPointer(e.clientX); }}
            onPointerMove={(e) => e.buttons === 1 && fromPointer(e.clientX)}
          >
            <div className="absolute inset-[8%]"><Mouth shade="before" id="b" /></div>
            <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
              <div className="absolute inset-0 bg-gradient-to-b from-[#f7ece4] to-[#f2dacd]" />
              <div className="absolute inset-[8%]"><Mouth shade="after" id="a" /></div>
            </div>

            <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-semibold backdrop-blur">Before</span>
            <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-teal-900">After</span>

            <label htmlFor="smile-range" className="sr-only">Compare before and after whitening</label>
            <input
              id="smile-range"
              type="range"
              min={0}
              max={100}
              value={Math.round(pos)}
              onChange={(e) => { setPos(Number(e.target.value)); setTouched(true); }}
              className="peer sr-only"
            />
            <div className="group/h pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,.25)] peer-focus-visible:[&>div]:ring-4" style={{ left: `${pos}%` }}>
              <div className={`absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-teal-900 shadow-xl ring-teal-100 ${touched ? "" : "animate-pulse-ring"}`}>
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" /></svg>
              </div>
            </div>

          </div>
          <p className="mt-4 text-center text-sm text-white/70">Illustration for demonstration. Individual results vary.</p>
        </Reveal>
      </div>
    </section>
  );
}
