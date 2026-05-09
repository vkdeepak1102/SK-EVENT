import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import villa from "@/assets/event-villa.jpg";
import { Phone, Mail, MapPin, MessageCircle, Instagram, Youtube } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — SK Events & Management" },
      { name: "description", content: "Begin the journey. Reach the SK atelier to plan your luxury wedding, yacht surprise or celebrity event." },
    ],
  }),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <PageShell>
      <section className="pt-40 pb-12 mx-auto max-w-7xl px-6">
        <SectionTitle eyebrow="Begin the Journey" title="Whisper your dream" subtitle="Tell us when, where, and for whom — we'll compose the rest." />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <form
              onSubmit={(e) => { 
                e.preventDefault(); 
                setSent(true); 
                e.currentTarget.reset();
              }}
              className="glass rounded-3xl p-8 md:p-12 border-gold/40"
            >
              <h3 className="font-display text-3xl">Plan your event</h3>
              <p className="mt-2 font-serif text-muted-foreground italic">A member of our atelier replies within 24 hours.</p>

              <div className="mt-8 grid gap-5">
                {[
                  { l: "Your Name", t: "text" },
                  { l: "Email", t: "email" },
                  { l: "Phone", t: "tel" },
                  { l: "Event Date", t: "date" },
                ].map((f) => (
                  <label key={f.l} className="block">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/70">{f.l}</span>
                    <input name={f.l} type={f.t} required className="mt-2 w-full rounded-lg border border-border bg-background/60 px-4 py-3 font-serif text-base outline-none transition-all focus:border-gold focus:shadow-glow" />
                  </label>
                ))}
                <label className="block">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/70">Type of Event</span>
                  <select name="type" className="mt-2 w-full rounded-lg border border-border bg-background/60 px-4 py-3 font-serif text-base outline-none focus:border-gold focus:shadow-glow">
                    <option>Wedding</option><option>Birthday</option><option>Yacht Surprise</option><option>Celebrity Event</option><option>Corporate</option><option>Other</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/70">Tell us your dream</span>
                  <textarea name="message" rows={4} className="mt-2 w-full rounded-lg border border-border bg-background/60 px-4 py-3 font-serif text-base outline-none focus:border-gold focus:shadow-glow" />
                </label>
                <button type="submit" className="shimmer mt-2 w-full rounded-full bg-gradient-gold px-6 py-4 text-xs tracking-[0.35em] uppercase text-background shadow-gold">
                  {sent ? "✦ We'll be in touch ✦" : "Send Whisper"}
                </button>
                <a href="https://wa.me/917904315874" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-gold px-6 py-3 text-xs tracking-[0.3em] uppercase text-foreground hover:bg-gradient-gold hover:text-background transition-all">
                  <MessageCircle className="h-4 w-4" /> WhatsApp the atelier
                </a>
              </div>
            </form>
          </Reveal>

          <Reveal delay={150}>
            <div className="space-y-8">
              <div className="img-zoom relative h-80 overflow-hidden rounded-3xl shadow-soft">
                <img src={villa} alt="" loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-background">
                  <p className="text-[10px] tracking-[0.5em] uppercase">Atelier Houses</p>
                  <h4 className="mt-2 font-display text-3xl">Chennai · Mumbai · Goa</h4>
                </div>
              </div>

              <div className="rounded-3xl bg-card border border-border p-8 grid gap-5">
                {[
                  { I: Phone, l: "Call", v: "+91 79043 15874" },
                  { I: Mail, l: "Write", v: "skeventsmanagement28@gmail.com" },
                  { I: MapPin, l: "Visit", v: "12, Boat Club Road, Chennai 600028" },
                ].map((c) => (
                  <div key={c.l} className="flex items-start gap-4">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-gold text-background"><c.I className="h-4 w-4" /></div>
                    <div>
                      <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{c.l}</div>
                      <div className="mt-1 font-serif text-lg">{c.v}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-border bg-card p-8 flex items-center justify-around">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-3 text-foreground/70 hover:text-gold transition-colors">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 text-white shadow-soft hover-lift">
                    <Instagram className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold">Instagram</span>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-3 text-foreground/70 hover:text-gold transition-colors">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-red-600 text-white shadow-soft hover-lift">
                    <Youtube className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold">YouTube</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
