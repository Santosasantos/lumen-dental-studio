"use client";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { services, slots } from "@/lib/content";

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

const quickServices = ["checkup", "whitening", "emergency"] as const;
const shortName: Record<string, string> = { checkup: "Check-up", whitening: "Whitening", emergency: "Emergency" };

export function Hero() {
  const [days, setDays] = useState<Date[]>([]);
  const [day, setDay] = useState(0);
  const [svc, setSvc] = useState<(typeof quickServices)[number]>("checkup");
  const daySlots = slots.filter((_, i) => (i + day) % 4 !== 3);
  const [slot, setSlot] = useState<string>(daySlots[0]);

  useEffect(() => setDays(nextDays(4)), []);

  // keep the booking form in sync with the widget
  useEffect(() => {
    const d = days[day];
    if (!d) return;
    window.dispatchEvent(new CustomEvent("prefill-slot", { detail: { date: isoLocal(d), time: slot, service: svc } }));
  }, [days, day, slot, svc]);

  const chooseDay = (i: number) => {
    setDay(i);
    const next = slots.filter((_, j) => (j + i) % 4 !== 3);
    if (!next.includes(slot)) setSlot(next[0]);
  };

  const svcIndex = quickServices.indexOf(svc);
  const price = services.find((x) => x.id === svc)?.from;
  const d = days[day];
  const dateLabel = d ? d.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" }) : "";

  return (
    <section id="top" className="relative -mt-16 overflow-x-clip pt-16 lg:-mt-20 lg:pt-20">
      {/* animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="animate-blob absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-teal-100/70 blur-3xl" />
        <div className="animate-blob absolute -right-24 top-40 h-[24rem] w-[24rem] rounded-full bg-coral/20 blur-3xl [animation-delay:-6s]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(15,42,43,.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </div>

      <div className="container-site grid items-center gap-14 pb-20 pt-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:pb-28 lg:pt-16">
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

        {/* booking widget */}
        <div className="animate-rise relative mx-auto w-full max-w-[30rem] lg:max-w-none" style={{ "--d": "250ms" } as React.CSSProperties}>
          <div className="absolute inset-0 translate-x-1.5 translate-y-3 rotate-[2deg] sm:translate-x-3 sm:translate-y-4 sm:rotate-[3deg] rounded-[2rem] bg-gradient-to-br from-teal-600 to-teal-900 opacity-90" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_80px_-30px_rgba(15,42,43,.45)] ring-1 ring-ink/5">
            <div className="p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xl font-semibold">Book a visit</p>
                  <p className="mt-0.5 text-sm text-ink/70">Takes under a minute</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
                  Slots this week
                </span>
              </div>

              {/* service switcher */}
              <div className="relative mt-6 grid grid-cols-3 rounded-full bg-cream p-1" role="radiogroup" aria-label="Service">
                <span
                  className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full bg-white shadow-md ring-1 ring-ink/5 transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(${svcIndex * 100}%)` }}
                  aria-hidden="true"
                />
                {quickServices.map((id) => (
                  <button
                    key={id}
                    role="radio"
                    aria-checked={svc === id}
                    onClick={() => setSvc(id)}
                    className={`relative z-10 rounded-full py-2 text-sm font-semibold transition-colors duration-300 ${svc === id ? "text-teal-800" : "text-ink/70 hover:text-ink"}`}
                  >
                    {shortName[id]}
                  </button>
                ))}
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-ink/70">Day</p>
              <div className="mt-2 grid grid-cols-4 gap-2" role="radiogroup" aria-label="Day">
                {(days.length ? days : Array.from({ length: 4 }, () => null)).map((dd, i) => (
                  <button
                    key={i}
                    role="radio"
                    aria-checked={day === i}
                    onClick={() => chooseDay(i)}
                    className={`rounded-2xl px-1 py-2.5 text-center transition duration-300 ${day === i ? "bg-teal-700 text-white shadow-lg shadow-teal-700/25" : "bg-cream hover:-translate-y-0.5 hover:bg-teal-50"}`}
                  >
                    <span className="block text-xs opacity-80">{dd ? dd.toLocaleDateString("en-US", { weekday: "short" }) : " "}</span>
                    <span className="block text-lg font-semibold">{dd ? dd.getDate() : " "}</span>
                  </button>
                ))}
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-ink/70">Time</p>
              <div key={day} className="mt-2 grid grid-cols-4 gap-2" role="radiogroup" aria-label="Time">
                {daySlots.map((s, i) => (
                  <button
                    key={s}
                    role="radio"
                    aria-checked={slot === s}
                    onClick={() => setSlot(s)}
                    style={{ "--d": `${i * 40}ms` } as React.CSSProperties}
                    className={`animate-rise rounded-xl border py-2.5 text-[15px] font-medium transition duration-200 ${slot === s ? "border-teal-700 bg-teal-50 text-teal-800" : "border-ink/10 hover:-translate-y-0.5 hover:border-teal-600"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <a href="#book" className="group btn-primary mt-6 w-full justify-between px-6">
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-[15px]">Continue booking</span>
                  <span className="text-xs font-medium text-white/80" aria-live="polite">{dateLabel ? `${dateLabel} · ${slot} · from $${price}` : " "}</span>
                </span>
                <svg viewBox="0 0 24 24" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </div>

            <ul className="grid grid-cols-3 divide-x divide-ink/10 border-t border-ink/10 bg-cream/60 text-center text-xs text-ink/75">
              {[["sparkle", "Pain-free care"], ["shield", "Clear prices"], ["calendar", "Free cancellation"]].map(([icon, label]) => (
                <li key={label} className="flex flex-col items-center gap-1.5 px-2 py-3.5">
                  <Icon name={icon} className="h-4 w-4 text-teal-600" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
