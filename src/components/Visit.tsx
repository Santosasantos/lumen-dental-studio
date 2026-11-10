import { steps } from "@/lib/content";

export function Visit() {
  return (
    <section id="visit" className="py-20 md:py-28">
      <div className="container-site grid gap-12 md:grid-cols-[.9fr_1.1fr] md:gap-20">
        <div>
          <p className="eyebrow">Your first visit</p>
          <h2 className="h2 mt-3">Calm, clear and on your terms</h2>
          <p className="mt-4 text-lg text-ink/70">
            Many of our patients haven&apos;t seen a dentist in years. That&apos;s completely fine. We start by listening, never rush you, and always explain your options before anything happens.
          </p>
        </div>
        <ol className="grid gap-4">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-5 rounded-3xl bg-white p-6 ring-1 ring-ink/5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal-700 font-semibold text-white">{i + 1}</span>
              <div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-ink/70">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
