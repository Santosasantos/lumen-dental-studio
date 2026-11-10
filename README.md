# Lumen Dental Studio

A fast, mobile-friendly landing page with online appointment booking for a dental clinic.

Built with **Next.js 14**, **React 18**, **TypeScript** and **Tailwind CSS**.

> **Live demo:** [lumen-dental-studio-pi.vercel.app](https://lumen-dental-studio-pi.vercel.app)
>
> Portfolio project. "Lumen Dental Studio" is a fictional clinic; all names, prices and contact details are placeholders.

![Desktop and mobile preview](docs/preview-overview.jpg)

## Highlights

- **Interactive smile preview.** A before/after whitening slider visitors can drag, tap or control with the keyboard, with a short demo sweep when it scrolls into view.
- **Smooth, purposeful animation.** Staggered hero entrance, soft animated background shapes, floating info cards, scroll-reveal sections and hover effects, all switched off automatically for visitors who prefer reduced motion.
- **One-click booking from anywhere.** Every service card has a "Book" button that pre-selects that service in the form; a sticky booking bar appears on phones.
- **Quick-book widget.** Visitors switch between services, pick a day and time, and see a live summary with the starting price. The earliest slot is pre-selected, and every choice is carried into the full booking form.
- **Booking form with validation.** Checks name, phone, email and date (no past dates, no Sundays), shows accessible inline errors, moves focus to the first problem and ends with a confirmation screen.
- **Accessible mobile menu and FAQ.** Full-screen menu with `Escape` to close and scroll lock; animated FAQ accordion with proper ARIA attributes.
- **Tested for quality.** Zero WCAG 2 AA issues in an axe-core audit, no horizontal scrolling from 320px to 1920px, full keyboard support.
- **Conversion-focused layout.** Clear call to action, services with starting prices, first-visit steps, FAQ, opening hours and contact details.
- **Fast and lightweight.** Statically rendered page, about 96 kB first-load JavaScript, no animation libraries, no external images or fonts to load.
- **Easy to customise.** All text, prices, hours and time slots live in one file: `src/lib/content.ts`.

![Smile preview slider](docs/preview-smile.jpg)

![Services](docs/preview-services.jpg)

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router), static rendering |
| Language | TypeScript |
| Styling | Tailwind CSS with a small custom theme |
| Font | Geist (self-hosted via `next/font/local`) |
| Icons | Inline SVG components (no icon library) |

## Getting started

Requirements: Node.js 18.17 or later.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

## Project structure

```
src/
├── app/
│   ├── layout.tsx       # fonts, metadata (SEO / Open Graph)
│   ├── page.tsx         # page sections and footer
│   └── globals.css      # Tailwind layers and shared component classes
├── components/
│   ├── Header.tsx       # sticky header and mobile menu
│   ├── Hero.tsx         # animated headline and quick-book widget
│   ├── Services.tsx     # services grid with quick-book buttons
│   ├── SmileSlider.tsx  # before/after whitening comparison
│   ├── Visit.tsx        # first-visit steps
│   ├── BookingForm.tsx  # validated booking form and confirmation
│   ├── Faq.tsx          # animated, accessible accordion
│   ├── Contact.tsx      # address, phone, email and opening hours
│   ├── StickyBook.tsx   # mobile booking bar
│   ├── Reveal.tsx       # scroll-reveal animation wrapper
│   └── Icon.tsx         # inline SVG icon set
└── lib/
    └── content.ts       # all editable content in one place
```

## Using it for a real clinic

1. Update the clinic details, services, prices, hours and FAQs in `src/lib/content.ts`.
2. Connect the form: replace the demo delay in `BookingForm.tsx` (`submit` function) with a call to a Next.js API route, an email service or a booking system.
3. Remove the "fictional clinic" note in the footer (`src/app/page.tsx`).

## Deployment

The project deploys to [Vercel](https://vercel.com) with zero configuration: import the repository and click **Deploy**.

## Author

**Md. Rabiul Islam**, Software Engineer (React, Next.js, Laravel, Python).
Available for freelance website builds, bug fixes and automation.
