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

export function Hero() {
  const [days, setDays] = useState<Date[]>([]);
  const [day, setDay] = useState(0);
  useEffect(() => setDays(nextDays(4)), []);
  const daySlots = slots.filter((_, i) => (i + day) % 4 !== 3);
  const [slot, setSlot] = useState<string | null>(null);

  const pick = (s: string) => {
    setSlot(s);
    const d = days[day];
    if (!d) return;
    const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    window.dispatchEvent(new CustomEvent("prefill-slot", { detail: { date, time: s } }));
  };

  return (
    <section id="top" className="container-site grid overflow-x-clip items-center gap-12 pb-16 pt-12 md:grid-cols-[1.1fr_.9fr] md:gap-16 md:pb-24 md:pt-20">
      <div>
        <p className="eyebrow">Family dentistry in Riverton</p>
        <h1 className="mt-4 text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
          Gentle dental care that fits your life.
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/70">
          Check-ups, whitening, aligners and emergency care in a calm, modern clinic. Clear prices, no pressure, and appointments this week.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#book" className="btn-primary">Book your visit</a>
          <a href="#services" className="btn-ghost">See services &amp; prices</a>
        </div>
        <ul className="mt-10 flex flex-col gap-3 text-[15px] text-ink/75 sm:flex-row sm:flex-wrap sm:gap-x-6">
          {["Open Saturdays", "Same-week visits", "Insurance billed directly"].map((t) => (
            <li key={t} className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-teal-600" />{t}</li>
          ))}
        </ul>
      </div>

      <div className="relative">
        <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-coral/15 blur-2xl" aria-hidden="true" />
        <div className="relative rounded-3xl bg-white p-6 shadow-[0_30px_60px_-30px_rgba(15,42,43,.35)] ring-1 ring-ink/5 sm:p-8">
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
                className={`rounded-2xl px-1 py-3 text-center transition ${day === i ? "bg-teal-700 text-white" : "bg-cream hover:bg-teal-50"}`}
              >
                <span className="block text-xs opacity-75">{d ? d.toLocaleDateString("en-US", { weekday: "short" }) : "\u00a0"}</span>
                <span className="block text-lg font-semibold">{d ? d.getDate() : "\u00a0"}</span>
              </button>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {daySlots.map((s) => (
              <button
                key={s}
                onClick={() => pick(s)}
                className={`rounded-xl border py-2.5 text-[15px] font-medium transition ${slot === s ? "border-teal-700 bg-teal-50 text-teal-800" : "border-ink/10 hover:border-teal-600"}`}
              >
                {s}
              </button>
            ))}
          </div>

          <a href="#book" className={`btn-primary mt-6 w-full ${slot ? "" : "pointer-events-none !bg-ink/10 !text-ink/70"}`} aria-disabled={!slot}>
            {slot ? `Continue with ${slot}` : "Pick a time to continue"}
          </a>
          <p className="mt-3 text-center text-xs text-ink/70">Free cancellation up to 24 hours before</p>
        </div>
      </div>
    </section>
  );
}
