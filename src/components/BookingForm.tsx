"use client";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { services, slots } from "@/lib/content";

type Errors = Partial<Record<"name" | "phone" | "email" | "service" | "date", string>>;

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export function BookingForm() {
  const [values, setValues] = useState({ name: "", phone: "", email: "", service: "checkup", date: "", time: slots[0], notes: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [minDate, setMinDate] = useState<string>();
  useEffect(() => setMinDate(today()), []);

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const { date, time } = (e as CustomEvent<{ date: string; time: string }>).detail;
      setValues((v) => ({ ...v, date, time: slots.includes(time) ? time : v.time }));
    };
    window.addEventListener("prefill-slot", onPrefill);
    return () => window.removeEventListener("prefill-slot", onPrefill);
  }, []);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (values.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!/^[+()\d\s-]{7,}$/.test(values.phone.trim())) e.phone = "Please enter a valid phone number.";
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) e.email = "Please enter a valid email address.";
    if (!values.date) e.date = "Please choose a date.";
    else if (values.date < today()) e.date = "Please choose a future date.";
    else if (new Date(values.date + "T12:00").getDay() === 0) e.date = "We're closed on Sundays. Please pick another day.";
    return e;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`f-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    // Demo: replace with a real API route or email service.
    await new Promise((r) => setTimeout(r, 700));
    setStatus("done");
  };

  const err = (k: keyof Errors) =>
    errors[k] ? <p id={`e-${k}`} className="mt-1.5 text-sm text-red-700">{errors[k]}</p> : null;
  const aria = (k: keyof Errors) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined });

  if (status === "done") {
    const svc = services.find((s) => s.id === values.service)?.title;
    return (
      <div className="rounded-3xl bg-white p-8 text-center ring-1 ring-ink/5 sm:p-12" role="status">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal-50 text-teal-700"><Icon name="check" className="h-7 w-7" /></span>
        <h3 className="mt-5 text-2xl font-semibold">Thanks, {values.name.split(" ")[0]}!</h3>
        <p className="mx-auto mt-3 max-w-md text-ink/70">
          Your request for <strong>{svc}</strong> on{" "}
          <strong>{new Date(values.date + "T12:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</strong> at{" "}
          <strong>{values.time}</strong> has been received. We&apos;ll confirm by email within a few hours.
        </p>
        <button className="btn-ghost mt-8" onClick={() => { setStatus("idle"); setValues((v) => ({ ...v, notes: "" })); }}>Book another visit</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 rounded-3xl bg-white p-6 ring-1 ring-ink/5 sm:grid-cols-2 sm:p-10">
      <div className="sm:col-span-2">
        <label htmlFor="f-name" className="mb-1.5 block text-sm font-medium">Full name</label>
        <input id="f-name" className="field" autoComplete="name" value={values.name} onChange={set("name")} {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="f-phone" className="mb-1.5 block text-sm font-medium">Phone</label>
        <input id="f-phone" type="tel" className="field" autoComplete="tel" value={values.phone} onChange={set("phone")} {...aria("phone")} />
        {err("phone")}
      </div>
      <div>
        <label htmlFor="f-email" className="mb-1.5 block text-sm font-medium">Email</label>
        <input id="f-email" type="email" className="field" autoComplete="email" value={values.email} onChange={set("email")} {...aria("email")} />
        {err("email")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="f-service" className="mb-1.5 block text-sm font-medium">Service</label>
        <select id="f-service" className="field" value={values.service} onChange={set("service")}>
          {services.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="f-date" className="mb-1.5 block text-sm font-medium">Preferred date</label>
        <input id="f-date" type="date" min={minDate} className="field" value={values.date} onChange={set("date")} {...aria("date")} />
        {err("date")}
      </div>
      <div>
        <label htmlFor="f-time" className="mb-1.5 block text-sm font-medium">Preferred time</label>
        <select id="f-time" className="field" value={values.time} onChange={set("time")}>
          {slots.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="f-notes" className="mb-1.5 block text-sm font-medium">Anything we should know? <span className="font-normal text-ink/50">(optional)</span></label>
        <textarea id="f-notes" rows={3} className="field resize-none" value={values.notes} onChange={set("notes")} placeholder="E.g. tooth pain, nervous about visits, insurance details" />
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink/55">We&apos;ll only use your details to arrange your visit.</p>
        <button type="submit" className="btn-primary min-w-[200px]" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Request appointment"}
        </button>
      </div>
    </form>
  );
}
