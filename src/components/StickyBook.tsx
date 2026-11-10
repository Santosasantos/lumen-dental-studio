"use client";
import { useEffect, useState } from "react";

/** Mobile-only booking bar that appears after the hero and hides near the booking form. */
export function StickyBook() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const book = document.getElementById("book")?.getBoundingClientRect();
      const nearForm = book ? book.top < window.innerHeight && book.bottom > 0 : false;
      setShow(window.scrollY > window.innerHeight * 0.8 && !nearForm);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-30 transition duration-500 md:hidden ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"}`}
      aria-hidden={!show}
    >
      <div className="flex items-center justify-between gap-3 rounded-2xl bg-teal-900 p-2.5 pl-4 text-white shadow-2xl">
        <p className="text-sm leading-tight"><span className="font-semibold">Same-week visits</span><br /><span className="text-white/75">Book in under a minute</span></p>
        <a href="#book" tabIndex={show ? 0 : -1} className="btn bg-white px-5 py-2.5 text-teal-900">Book now</a>
      </div>
    </div>
  );
}
