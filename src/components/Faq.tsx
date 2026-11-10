"use client";
import { useState } from "react";
import { Reveal } from "./Reveal";
import { faqs } from "@/lib/content";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-white py-20 md:py-28">
      <div className="container-site grid gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-20">
        <Reveal>
          <p className="eyebrow">FAQ</p>
          <h2 className="h2 mt-3">Questions, answered</h2>
          <p className="mt-4 text-lg text-ink/70">Can&apos;t find what you need? Give us a call. We&apos;re happy to help.</p>
        </Reveal>
        <Reveal delay={120} className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`rounded-2xl border transition duration-300 ${isOpen ? "border-teal-600/30 bg-teal-50/60" : "border-ink/10 hover:border-ink/25"}`}>
                <h3>
                  <button
                    id={`faq-b-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-p-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 rounded-2xl px-5 py-5 text-left text-lg font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
                  >
                    {f.q}
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xl leading-none transition duration-300 ${isOpen ? "rotate-45 bg-teal-700 text-white" : "bg-cream"}`} aria-hidden="true">+</span>
                  </button>
                </h3>
                <div
                  id={`faq-p-${i}`}
                  role="region"
                  aria-labelledby={`faq-b-${i}`}
                  className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden" aria-hidden={!isOpen}>
                    <p className={`px-5 pb-5 pr-14 text-ink/70 transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
