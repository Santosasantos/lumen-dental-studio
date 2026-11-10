import { Icon } from "./Icon";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="services" className="bg-white py-20 md:py-28">
      <div className="container-site">
        <div className="max-w-2xl">
          <p className="eyebrow">Services</p>
          <h2 className="h2 mt-3">Everything your smile needs, under one roof</h2>
          <p className="mt-4 text-lg text-ink/70">Honest advice and clear starting prices, so you always know what to expect.</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.id} className="group flex flex-col rounded-3xl border border-ink/10 p-7 transition hover:-translate-y-0.5 hover:border-teal-600/40 hover:shadow-lg">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-50 text-teal-700"><Icon name={s.icon} className="h-6 w-6" /></span>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 flex-1 text-ink/70">{s.text}</p>
              <p className="mt-5 text-sm text-ink/70">From <span className="text-base font-semibold text-ink">${s.from.toLocaleString("en-US")}</span></p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
