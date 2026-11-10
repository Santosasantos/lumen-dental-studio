import { faqs } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" className="bg-white py-20 md:py-28">
      <div className="container-site grid gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-20">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 className="h2 mt-3">Questions, answered</h2>
          <p className="mt-4 text-lg text-ink/70">Can&apos;t find what you need? Give us a call. We&apos;re happy to help.</p>
        </div>
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cream text-xl leading-none transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 pr-12 text-ink/70">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
