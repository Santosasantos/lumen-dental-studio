"use client";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { clinic } from "@/lib/content";

const links = [
  { href: "#services", label: "Services" },
  { href: "#visit", label: "Your visit" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-cream/90 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-teal-700 text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M8 3c-2.5 0-4 2-4 4.6 0 2.6 1 4.4 1.6 7 .5 2.4 1 6.4 2.6 6.4 1.5 0 1.6-4.5 3.8-4.5s2.3 4.5 3.8 4.5c1.6 0 2.1-4 2.6-6.4.6-2.6 1.6-4.4 1.6-7C20 5 18.5 3 16 3c-1.7 0-2.6 1-4 1S9.7 3 8 3z"/></svg>
          </span>
          {clinic.name}
        </a>

        <nav className="hidden items-center gap-8 text-[15px] md:flex" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-ink/70 transition hover:text-ink">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a href={clinic.phoneHref} className="text-[15px] font-medium text-ink/80 hover:text-ink">{clinic.phone}</a>
          <a href="#book" className="btn-primary py-2.5">Book appointment</a>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-full md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
        </button>
      </div>

    </header>
    {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto bg-cream md:hidden">
          <nav className="container-site flex flex-col gap-1 py-6" aria-label="Mobile">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-xl px-2 py-3 text-xl font-medium hover:bg-teal-50">
                {l.label}
              </a>
            ))}
            <a href="#book" onClick={() => setOpen(false)} className="btn-primary mt-6">Book appointment</a>
            <a href={clinic.phoneHref} className="btn-ghost mt-3"><Icon name="phone" /> {clinic.phone}</a>
          </nav>
        </div>
      )}
    </>
  );
}
