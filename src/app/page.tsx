import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Visit } from "@/components/Visit";
import { BookingForm } from "@/components/BookingForm";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { clinic } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Visit />
        <section id="book" className="scroll-mt-24 pb-20 pt-4 md:pb-28">
          <div className="container-site">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">Book online</p>
              <h2 className="h2 mt-3">Request your appointment</h2>
              <p className="mt-4 text-lg text-ink/70">Tell us when suits you and we&apos;ll confirm within a few hours.</p>
            </div>
            <div className="mx-auto mt-10 max-w-3xl"><BookingForm /></div>
          </div>
        </section>
        <Faq />
        <Contact />
      </main>
      <footer className="bg-teal-900 pb-10 text-sm text-white/70">
        <div className="container-site flex flex-col justify-between gap-2 border-t border-white/10 pt-6 sm:flex-row">
          <p>© {new Date().getFullYear()} {clinic.name}. Demo project. The clinic is fictional.</p>
          <p>Designed &amp; built by Md. Rabiul Islam</p>
        </div>
      </footer>
    </>
  );
}
