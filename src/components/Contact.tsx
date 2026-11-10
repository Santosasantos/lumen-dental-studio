import { Icon } from "./Icon";
import { clinic, hours } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" className="bg-teal-900 py-20 text-white md:py-24">
      <div className="container-site grid gap-12 md:grid-cols-3">
        <Reveal className="md:col-span-1">
          <h2 className="text-3xl font-semibold tracking-tight">Visit us</h2>
          <p className="mt-4 text-white/70">Easy parking on site and a short walk from Riverton Central station.</p>
        </Reveal>
        <Reveal delay={100} className="space-y-4">
          <p className="flex gap-3"><Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-teal-100" /><span>{clinic.address}<br />{clinic.city}</span></p>
          <p className="flex gap-3"><Icon name="phone" className="mt-0.5 h-5 w-5 shrink-0 text-teal-100" /><a href={clinic.phoneHref} className="hover:underline">{clinic.phone}</a></p>
          <p className="flex gap-3"><span className="mt-0.5 h-5 w-5 shrink-0 text-center text-teal-100">@</span><a href={`mailto:${clinic.email}`} className="hover:underline">{clinic.email}</a></p>
        </Reveal>
        <Reveal delay={200}>
          <p className="mb-3 flex items-center gap-2 font-medium"><Icon name="clock" className="h-5 w-5 text-teal-100" />Opening hours</p>
          <dl className="grid grid-cols-2 gap-y-2 text-white/80">
            {hours.map((h) => (
              <div key={h.day} className="contents"><dt>{h.day}</dt><dd className="text-right">{h.time}</dd></div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
