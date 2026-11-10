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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled || open ? "border-b border-ink/5 bg-cream/85 shadow-[0_8px_30px_-18px_rgba(15,42,43,.35)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className={`container-site flex items-center justify-between transition-all duration-300 ${scrolled ? "h-14" : "h-16 lg:h-20"}`}>
        <a href="#top" className="group flex shrink-0 items-center gap-2.5 whitespace-nowrap font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-teal-700 text-white transition duration-500 group-hover:rotate-[20deg] group-hover:bg-coral">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M8 3c-2.5 0-4 2-4 4.6 0 2.6 1 4.4 1.6 7 .5 2.4 1 6.4 2.6 6.4 1.5 0 1.6-4.5 3.8-4.5s2.3 4.5 3.8 4.5c1.6 0 2.1-4 2.6-6.4.6-2.6 1.6-4.4 1.6-7C20 5 18.5 3 16 3c-1.7 0-2.6 1-4 1S9.7 3 8 3z"/></svg>
          </span>
          {clinic.name}
        </a>

        <nav className="hidden items-center gap-8 text-[15px] lg:flex" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="group relative py-1 text-ink/70 transition hover:text-ink">
              {l.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-coral transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href={clinic.phoneHref} className="whitespace-nowrap text-[15px] font-medium text-ink/80 hover:text-ink">{clinic.phone}</a>
          <a href="#book" className="btn-primary py-2.5">Book appointment</a>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-full lg:hidden"
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
        <div id="mobile-menu" className={`fixed inset-x-0 bottom-0 z-50 overflow-y-auto bg-cream lg:hidden ${scrolled ? "top-14" : "top-16"}`}>
          <nav className="container-site flex max-w-xl flex-col gap-1 py-6" aria-label="Mobile">
            {links.map((l, i) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ "--d": `${i * 60}ms` } as React.CSSProperties} className="animate-rise rounded-xl px-2 py-3 text-2xl font-medium hover:bg-teal-50">
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
