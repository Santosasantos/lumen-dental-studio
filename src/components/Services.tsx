import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="services" className="relative bg-white py-20 md:py-28">
      <div className="container-site">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">Services</p>
            <h2 className="h2 mt-3">Everything your smile needs, under one roof</h2>
          </div>
          <p className="max-w-sm text-lg text-ink/70">Honest advice and clear starting prices, so you always know what to expect.</p>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} as="article" delay={(i % 3) * 110} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white p-7 transition duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_30px_60px_-28px_rgba(15,42,43,.45)]">
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-teal-50 transition-transform duration-700 group-hover:scale-[3.2]" aria-hidden="true" />
                <div className="relative flex flex-1 flex-col">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-50 text-teal-700 ring-1 ring-teal-600/10 transition duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-teal-700 group-hover:text-white">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 flex-1 text-ink/70">{s.text}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-ink/70">From <span className="text-lg font-semibold text-ink">${s.from.toLocaleString("en-US")}</span></p>
                    <a
                      href="#book"
                      data-service={s.id}
                      aria-label={`Book ${s.title}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3.5 py-2 text-sm font-semibold text-teal-800 transition duration-300 hover:bg-teal-700 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600 group-hover:bg-teal-700 group-hover:text-white"
                    >
                      Book
                      <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
