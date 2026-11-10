import { Reveal } from "./Reveal";
import { steps } from "@/lib/content";

export function Visit() {
  return (
    <section id="visit" className="py-20 md:py-28">
      <div className="container-site grid gap-12 md:grid-cols-[.9fr_1.1fr] md:gap-20">
        <Reveal className="md:sticky md:top-28 md:self-start">
          <p className="eyebrow">Your first visit</p>
          <h2 className="h2 mt-3">Calm, clear and on your terms</h2>
          <p className="mt-4 text-lg text-ink/70">
            Many of our patients haven&apos;t seen a dentist in years. That&apos;s completely fine. We start by listening, never rush you, and always explain your options before anything happens.
          </p>
        </Reveal>
        <ol className="relative grid gap-5">
          <span className="absolute bottom-10 left-[2.15rem] top-10 w-px bg-gradient-to-b from-teal-600/40 via-teal-600/20 to-transparent" aria-hidden="true" />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 140}>
              <div className="group relative flex gap-5 rounded-3xl bg-white p-6 ring-1 ring-ink/5 transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(15,42,43,.45)]">
                <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal-700 font-semibold text-white transition duration-500 group-hover:scale-110 group-hover:bg-coral">{i + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1 text-ink/70">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
