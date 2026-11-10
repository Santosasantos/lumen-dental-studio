export const clinic = {
  name: "Lumen Dental Studio",
  phone: "(555) 014-2290",
  phoneHref: "tel:+15550142290",
  email: "hello@lumendental.example",
  address: "214 Harbor Street, Suite 3",
  city: "Riverton",
};

export const services = [
  { id: "checkup", title: "Check-up & cleaning", text: "A thorough exam, gentle cleaning and a clear plan, all in one visit.", from: 79, icon: "sparkle" },
  { id: "fillings", title: "Tooth-coloured fillings", text: "Natural-looking repairs that blend in and last for years.", from: 120, icon: "shield" },
  { id: "whitening", title: "Teeth whitening", text: "In-clinic or take-home whitening for a brighter, even smile.", from: 249, icon: "sun" },
  { id: "aligners", title: "Clear aligners", text: "Straighten your teeth discreetly with removable clear trays.", from: 1900, icon: "align" },
  { id: "implants", title: "Dental implants", text: "Permanent, natural-feeling replacements for missing teeth.", from: 1450, icon: "anchor" },
  { id: "emergency", title: "Emergency care", text: "Same-day appointments for pain, swelling or broken teeth.", from: 95, icon: "bolt" },
] as const;

export const steps = [
  { title: "Book online", text: "Pick a service and a time that suits you. It takes under a minute." },
  { title: "Meet your dentist", text: "We listen first, check everything and explain what we see." },
  { title: "Get a clear plan", text: "You get your options and exact prices before any treatment starts." },
];

export const faqs = [
  { q: "Do you accept new patients?", a: "Yes. We welcome new patients of all ages, and most can be seen within the same week." },
  { q: "I'm nervous about the dentist. Can you help?", a: "Absolutely. Tell us when you book. We take things at your pace, explain each step and you can pause at any time." },
  { q: "Do you work with insurance?", a: "We bill most major dental insurance plans directly, so you only pay your share on the day." },
  { q: "What should I do in a dental emergency?", a: "Call us as early as possible. We keep slots free every day for urgent pain, swelling or broken teeth." },
];

export const hours = [
  { day: "Mon – Thu", time: "8:00 – 18:00" },
  { day: "Friday", time: "8:00 – 16:00" },
  { day: "Saturday", time: "9:00 – 13:00" },
  { day: "Sunday", time: "Closed" },
];

export const slots = ["9:00", "10:30", "12:00", "14:30", "16:00"];
