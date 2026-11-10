"use client";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { slots } from "@/lib/content";

function nextDays(n: number) {
  const out: Date[] = [];
  const d = new Date();
  while (out.length < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) out.push(new Date(d));
  }
  return out;
}

const isoLocal = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function Hero() {
  const [days, setDays] = useState<Date[]>([]);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  useEffect(() => setDays(nextDays(4)), []);
  const daySlots = slots.filter((_, i) => (i + day) % 4 !== 3);

  const pick = (s: string) => {
    setSlot(s);
    const d = days[day];
    if (!d) return;
    window.dispatchEvent(new CustomEvent("prefill-slot", { detail: { date: isoLocal(d), time: s } }));
  };

  return (
    <section id="top" className="relative -mt-16 overflow-x-clip pt-16 md:-mt-20 md:pt-20">
      {/* animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="animate-blob absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-teal-100/70 blur-3xl" />
        <div className="animate-blob absolute -right-24 top-40 h-[24rem] w-[24rem] rounded-full bg-coral/20 blur-3xl [animation-delay:-6s]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(15,42,43,.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </div>

      <div className="container-site grid items-center gap-14 pb-20 pt-10 md:grid-cols-[1.1fr_.9fr] md:gap-16 md:pb-28 md:pt-16">
        <div>
          <p className="animate-rise inline-flex items-center gap-2 rounded-full border border-teal-600/15 bg-white/70 px-3.5 py-1.5 text-[13px] font-medium text-teal-700 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-coral" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-coral" />
            </span>
            Accepting new patients this week
          </p>
          <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.02] tracking-tight text-balance sm:text-[4.1rem]">
            <span className="animate-rise block" style={{ "--d": "80ms" } as React.CSSProperties}>Gentle dental care</span>
            <span className="animate-rise block" style={{ "--d": "180ms" } as React.CSSProperties}>
              that <span className="text-gradient">fits your life.</span>
            </span>
          </h1>
          <p className="animate-rise mt-6 max-w-lg text-lg leading-relaxed text-ink/70" style={{ "--d": "300ms" } as React.CSSProperties}>
            Check-ups, whitening, aligners and emergency care in a calm, modern clinic. Clear prices, no pressure, and appointments this week.
          </p>
          <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--d": "420ms" } as React.CSSProperties}>
            <a href="#book" className="group btn-primary px-7 py-3.5">
              Book your visit
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <a href="#smile" className="btn-ghost px-7 py-3.5">Preview your new smile</a>
          </div>
          <ul className="animate-rise mt-10 flex flex-col gap-3 text-[15px] text-ink/75 sm:flex-row sm:flex-wrap sm:gap-x-6" style={{ "--d": "540ms" } as React.CSSProperties}>
            {["Open Saturdays", "Same-week visits", "Insurance billed directly"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-teal-700 text-white"><Icon name="check" className="h-3 w-3" /></span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-rise relative" style={{ "--d": "250ms" } as React.CSSProperties}>
          {/* floating chips */}
          <div className="animate-float absolute -left-4 -top-6 z-10 hidden items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-ink/5 sm:flex md:-left-10" style={{ "--d": "-2s" } as React.CSSProperties}>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-coral/15 text-coral"><Icon name="sparkle" className="h-5 w-5" /></span>
            <div className="text-sm leading-tight"><p className="font-semibold">Pain-free care</p><p className="text-ink/70">We go at your pace</p></div>
          </div>
          <div className="animate-float absolute -bottom-6 -right-3 z-10 hidden items-center gap-2.5 rounded-2xl bg-teal-900 px-4 py-3 text-white shadow-xl sm:flex md:-right-8">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10"><Icon name="shield" className="h-5 w-5" /></span>
            <div className="text-sm leading-tight"><p className="font-semibold">Clear prices</p><p className="text-white/75">Agreed before treatment</p></div>
          </div>

          <div className="relative rounded-[2rem] bg-white/90 p-6 shadow-[0_40px_80px_-30px_rgba(15,42,43,.4)] ring-1 ring-ink/5 backdrop-blur sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-ink/70">Check-up &amp; cleaning</p>
                <p className="text-xl font-semibold">Choose a time</p>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-teal-50 text-teal-700"><Icon name="calendar" /></span>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-2" role="tablist" aria-label="Day">
              {(days.length ? days : Array.from({ length: 4 }, () => null)).map((d, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={day === i}
                  onClick={() => { setDay(i); setSlot(null); }}
                  className={`rounded-2xl px-1 py-3 text-center transition duration-300 ${day === i ? "scale-[1.04] bg-teal-700 text-white shadow-lg shadow-teal-700/30" : "bg-cream hover:-translate-y-0.5 hover:bg-teal-50"}`}
                >
                  <span className="block text-xs opacity-80">{d ? d.toLocaleDateString("en-US", { weekday: "short" }) : " "}</span>
                  <span className="block text-lg font-semibold">{d ? d.getDate() : " "}</span>
                </button>
              ))}
            </div>

            <div key={day} className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {daySlots.map((s, i) => (
                <button
                  key={s}
                  onClick={() => pick(s)}
                  style={{ "--d": `${i * 50}ms` } as React.CSSProperties}
                  className={`animate-rise rounded-xl border py-2.5 text-[15px] font-medium transition duration-200 ${slot === s ? "border-teal-700 bg-teal-50 text-teal-800 ring-2 ring-teal-700/20" : "border-ink/10 hover:-translate-y-0.5 hover:border-teal-600 hover:shadow-md"}`}
                >
                  {s}
                </button>
              ))}
            </div>

            <a
              href="#book"
              className={`btn-primary mt-6 w-full ${slot ? "" : "pointer-events-none !bg-ink/10 !text-ink/70 !shadow-none"}`}
              aria-disabled={!slot}
            >
              {slot ? `Continue with ${slot}` : "Pick a time to continue"}
            </a>
            <p className="mt-3 text-center text-xs text-ink/70">Free cancellation up to 24 hours before</p>
          </div>
        </div>
      </div>
    </section>
  );
}
