import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Sparkles } from "@/components/Sparkles";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import heroImg from "@/assets/hero-luxury.jpg";
import yacht from "@/assets/event-yacht.jpg";
import birthday from "@/assets/event-birthday.jpg";
import wedding from "@/assets/event-wedding.jpg";
import celeb from "@/assets/event-celebrity.jpg";
import corp from "@/assets/event-corporate.jpg";
import villa from "@/assets/event-villa.jpg";
import { Heart, Cake, Anchor, Sparkles as SIcon, Building2, Gift, ArrowRight, Quote, Star } from "lucide-react";
import skLogo from "@/assets/SK-LOGO.jpeg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "SK Events & Management — Luxury Wedding & Celebrity Event Planners" },
      { name: "description", content: "Crafting unforgettable luxury experiences. Royal weddings, celebrity events, yacht surprises and bespoke celebrations across India." },
      { property: "og:title", content: "SK Events & Management" },
      { property: "og:description", content: "Crafting Unforgettable Luxury Experiences" },
      { property: "og:image", content: heroImg },
    ],
  }),
});

const categories = [
  { icon: Heart, label: "Weddings", img: wedding },
  { icon: Cake, label: "Birthday Surprises", img: birthday },
  { icon: Anchor, label: "Yacht Events", img: yacht },
  { icon: SIcon, label: "Celebrity Events", img: celeb },
  { icon: Building2, label: "Corporate Events", img: corp },
  { icon: Gift, label: "Luxury Surprises", img: villa },
];

const featured = [yacht, wedding, birthday, celeb, villa, corp];

const testimonials = [
  { name: "Aanya & Vikram", role: "Royal Wedding · Udaipur", text: "SK turned our dream into a fairytale. Every petal, every chandelier, every guest's smile — composed like a symphony." },
  { name: "Karthik R.", role: "Yacht Birthday · Mumbai", text: "I've never seen my wife cry of joy like that. The sunset, the gold balloons, the surprise band on deck — pure cinema." },
  { name: "Meera Kapoor", role: "Brand Launch · Goa", text: "Editorial level styling and flawless execution. Our guests still call it the most beautiful event of the year." },
];

function Index() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[720px] w-full overflow-hidden vignette">
        <img src={heroImg} alt="Luxury ballroom" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <Sparkles density={90} />

        {/* Light rays */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[120vh] w-[120vh] bg-radial-glow opacity-70 blur-2xl" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
          {/* Logo ring */}
          <div className="relative mb-8 h-32 w-32 animate-fade-up">
            <div className="absolute inset-0 rounded-full border border-gold animate-spin-slow" style={{ borderStyle: "dashed" }} />
            <div className="absolute -inset-3 rounded-full border border-gold/40" />
            <div className="absolute inset-2 rounded-full overflow-hidden animate-glow-pulse">
              <img src={skLogo} alt="SK Events Logo" className="h-full w-full object-cover rounded-full" />
            </div>
          </div>

          <Reveal>
            <p className="text-[11px] tracking-[0.55em] uppercase text-white/90" style={{textShadow:'0 2px 8px rgba(0,0,0,0.8)'}}>Est. Atelier of Celebrations</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 font-display text-6xl md:text-8xl lg:text-9xl leading-[0.95]" style={{textShadow:'0 4px 20px rgba(0,0,0,0.7)'}}>
              <span className="text-gradient-gold">SK Events</span>
              <span className="block font-serif italic text-3xl md:text-4xl mt-3 text-white" style={{textShadow:'0 2px 12px rgba(0,0,0,0.8)'}}>& Management</span>
            </h1>
          </Reveal>
          <Reveal delay={250}>
            <p className="mt-8 max-w-xl font-serif text-xl md:text-2xl italic text-white/95" style={{textShadow:'0 2px 12px rgba(0,0,0,0.8)'}}>
              Crafting unforgettable luxury experiences — where moments wear gold.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" className="shimmer rounded-full bg-gradient-gold px-8 py-4 text-xs tracking-[0.35em] uppercase text-background shadow-gold">
                Plan Your Event
              </Link>
              <Link to="/services" className="shimmer rounded-full border border-gold bg-background/60 backdrop-blur px-8 py-4 text-xs tracking-[0.35em] uppercase text-foreground">
                Explore Services
              </Link>
            </div>
          </Reveal>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.5em] uppercase text-white/80" style={{textShadow:'0 1px 6px rgba(0,0,0,0.8)'}}>scroll</div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="relative mx-auto max-w-7xl px-6 py-28">
        <SectionTitle eyebrow="The Atelier" title="Curated Celebrations" subtitle="Six worlds of opulence — each composed with exquisite, painstaking detail." />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.label} delay={i * 80}>
              <div className="group relative h-[360px] overflow-hidden rounded-2xl hover-lift img-zoom shadow-soft">
                <img src={c.img} alt={c.label} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-gold/0 group-hover:ring-gold/60 transition-all duration-700" />
                <div className="absolute bottom-0 p-7 text-background">
                  <c.icon className="h-7 w-7 text-gold" />
                  <h3 className="mt-3 font-display text-3xl">{c.label}</h3>
                  <span className="mt-2 inline-flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase text-background/80">
                    Discover <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED MARQUEE */}
      <section className="relative overflow-hidden py-24">
        <div className="text-center mb-14">
          <SectionTitle eyebrow="Recent Reveries" title="Featured Celebrations" />
        </div>
        <div className="relative">
          <div className="flex w-max marquee-track gap-6">
            {[...featured, ...featured].map((src, i) => (
              <div key={i} className="img-zoom relative h-[420px] w-[320px] overflow-hidden rounded-xl shadow-soft">
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="relative mx-auto max-w-7xl px-6 py-28">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <Reveal>
            <div className="relative">
              <img src={villa} alt="Villa surprise" loading="lazy" className="rounded-2xl shadow-soft" />
              <div className="absolute -bottom-8 -right-8 hidden md:block glass rounded-2xl p-6 shadow-gold w-64">
                <div className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground">Since 2014</div>
                <div className="mt-2 font-display text-4xl text-gradient-gold">1,200+</div>
                <div className="font-serif italic text-muted-foreground">moments composed</div>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionTitle align="left" eyebrow="The SK Promise" title="A house of devotion to detail" subtitle="From the first whispered idea to the last lingering goodbye, we orchestrate every breath of your celebration." />
            <Reveal delay={300}>
              <ul className="mt-10 space-y-5">
                {[
                  "Bespoke styling — no two events ever the same",
                  "A dedicated atelier of 40+ artisans, florists, lighting designers",
                  "Cinematic photography & films, captured with masterful precision",
                  "Discreet celebrity & VIP management across continents",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-4 font-serif text-lg text-foreground/85">
                    <span className="mt-2 h-px w-8 bg-gold flex-shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={500}>
              <Link to="/services" className="shimmer mt-10 inline-flex items-center gap-3 rounded-full border border-gold px-7 py-3 text-xs tracking-[0.3em] uppercase">
                Browse the atelier <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative mx-auto max-w-7xl px-6 py-28">
        <SectionTitle eyebrow="Whispers of Joy" title="Stories told in gold" />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <div className="relative h-full glass rounded-2xl p-8 hover-lift border-gold/40">
                <Quote className="h-8 w-8 text-gold/60" />
                <p className="mt-5 font-serif text-lg italic text-foreground/85 leading-relaxed">"{t.text}"</p>
                <div className="mt-6 flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <div className="mt-4 border-t border-gold/30 pt-4">
                  <div className="font-display text-xl">{t.name}</div>
                  <div className="text-xs tracking-[0.25em] uppercase text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GALLERY STRIP */}
      <section className="py-20 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 mb-10 flex items-end justify-between">
          <SectionTitle align="left" eyebrow="Atelier Diary" title="Captured in candlelight" />
          <Link to="/gallery" className="hidden md:inline text-xs tracking-[0.3em] uppercase border-b border-gold pb-1">View Gallery</Link>
        </div>
        <div className="relative">
          <div className="flex w-max marquee-track gap-2 px-2">
            {[wedding, yacht, birthday, celeb, corp, villa, wedding, yacht, birthday, celeb, corp, villa].map((src, i) => (
              <div key={i} className="img-zoom aspect-square h-[240px] md:h-[300px] overflow-hidden">
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative my-20 mx-6 overflow-hidden rounded-3xl">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" loading="lazy" className="h-full w-full object-cover" style={{ transform: "translateZ(0)" }} />
          <div className="absolute inset-0 bg-foreground/55" />
        </div>
        <Sparkles density={50} />
        <div className="relative px-8 py-24 md:py-36 text-center text-background">
          <Reveal>
            <p className="text-[11px] tracking-[0.5em] uppercase text-background/80">A celebration awaits</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-5 font-display text-5xl md:text-7xl">
              Let's compose your <span className="text-gradient-gold">forever</span> moment
            </h2>
          </Reveal>
          <Reveal delay={250}>
            <Link to="/contact" className="shimmer mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-gold px-10 py-4 text-xs tracking-[0.35em] uppercase text-foreground shadow-gold">
              Begin the journey <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
