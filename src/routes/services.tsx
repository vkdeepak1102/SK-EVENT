import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { Heart, Cake, Anchor, Car, Home, Hotel, Camera, Video, Utensils, Music, Crown, X } from "lucide-react";
import wedding from "@/assets/event-wedding.jpg";
import birthday from "@/assets/event-birthday.jpg";
import yacht from "@/assets/event-yacht.jpg";
import villa from "@/assets/event-villa.jpg";
import celeb from "@/assets/event-celebrity.jpg";
import corp from "@/assets/event-corporate.jpg";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — SK Events & Management" },
      { name: "description", content: "From royal weddings to yacht surprises and celebrity management — discover the SK atelier of luxury services." },
    ],
  }),
});

const services = [
  { icon: Heart, img: wedding, title: "Wedding Planning", price: "From ₹15L", desc: "From sangeet to vidaai — full-service royal wedding direction.", long: "A bespoke wedding journey covering venue scouting, mandap design, sangeet choreography liaison, guest concierge, attire styling and post-wedding album curation. Our wedding atelier averages 9 months of obsessive planning per event." },
  { icon: Cake, img: birthday, title: "Birthday Events", price: "From ₹2L", desc: "Whispered surprises and grand statements alike, in gold.", long: "Themed birthday productions with custom installations, live entertainment, gourmet catering and personalised guest favours. Designed for adults seeking refined celebration." },
  { icon: Anchor, img: yacht, title: "Yacht Birthday Surprise", price: "From ₹4L", desc: "Sunset yachts, gold balloons, your secret revealed at sea.", long: "Charter of luxury yachts in Mumbai, Goa, and Kochi waters. Includes onboard styling, live acoustic music, champagne service and aerial drone reveal." },
  { icon: Car, img: villa, title: "Car Boot Surprise", price: "From ₹35K", desc: "An elegant ambush of roses, candles and devotion.", long: "Roadside or driveway surprises with floral installations bursting from the boot, candle pathways, photographer and intimate cake-cutting setup." },
  { icon: Home, img: wedding, title: "Room Decorations", price: "From ₹15K", desc: "Hotel suites & bedrooms transformed into reveries.", long: "Floral canopies, candle walls, balloon ceilings and personalised signage installed discreetly while you dine. Compatible with most luxury hotel partners." },
  { icon: Hotel, img: villa, title: "Villa Surprise", price: "From ₹1.5L", desc: "Private villa takeovers — pools, candles, full immersion.", long: "Full villa stylings with pool floral arrangements, lit pathways, private chef, butler and bespoke entertainment." },
  { icon: Camera, img: celeb, title: "Model Shoot", price: "From ₹50K", desc: "Editorial shoots in luxury locations with our crew.", long: "Production design, location scouting, makeup, wardrobe styling and full creative direction with award-winning photographers." },
  { icon: Video, img: corp, title: "Photography & Videography", price: "From ₹85K", desc: "Cinematic capture by award-winning storytellers.", long: "Dual-camera films, drone aerials, same-day edits, fine-art albums and 4K archival masters." },
  { icon: Utensils, img: birthday, title: "Catering", price: "From ₹2,500/pax", desc: "Bespoke menus by India's finest culinary directors.", long: "Multi-cuisine grazing tables, live counters, cocktail pairings, and dietary-conscious tasting menus." },
  { icon: Music, img: celeb, title: "DJ & Entertainment", price: "From ₹75K", desc: "Live bands, DJs, dancers — choreographed to your night.", long: "Curated entertainment from acoustic duos to international DJs, dhol troupes, fire dancers and aerial silks performers." },
  { icon: Crown, img: corp, title: "Celebrity Management", price: "On enquiry", desc: "Discreet booking of artists, hosts and influencers.", long: "Confidential celebrity sourcing, contracts, hospitality riders and on-day management. Strict NDA across our entire atelier." },
];

function ServicesPage() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <PageShell>
      <section className="pt-40 pb-20 mx-auto max-w-7xl px-6">
        <SectionTitle eyebrow="The Atelier" title="Services in gold" subtitle="Eleven worlds of celebration — each crafted with the patience of a master jeweller." />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 50}>
              <button onClick={() => setOpen(i)} className="text-left w-full h-full group relative overflow-hidden rounded-2xl border border-border min-h-[380px] flex flex-col justify-end p-5 hover-lift">
                {/* Background Image */}
                <img src={s.img} alt={s.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:opacity-60" />
                {/* Gold Shimmer Overlay */}
                <div className="absolute inset-0 bg-gradient-gold opacity-0 group-hover:opacity-[0.1] transition-opacity duration-700" />
                
                {/* Content Box */}
                <div className="relative z-10 w-full mt-auto">
                  <div className="bg-black/85 backdrop-blur-md border border-gold/30 p-6 rounded-2xl transition-transform duration-500 group-hover:-translate-y-2 shadow-2xl">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-background border border-gold/40 shadow-lg -mt-12 mb-4 group-hover:scale-110 transition-transform duration-500">
                      <s.icon className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="font-display text-2xl text-white font-bold">{s.title}</h3>
                    <p className="mt-2 font-serif text-[15px] text-white/90 italic line-clamp-2 leading-relaxed">{s.desc}</p>
                    
                    <div className="mt-5 flex items-center justify-between border-t border-gold/30 pt-4">
                      <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-gold">{s.price}</span>
                      <span className="text-[11px] tracking-[0.3em] uppercase text-white/80 group-hover:text-gold font-bold transition-colors">Details →</span>
                    </div>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Modal */}
      {open !== null && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-foreground/60 backdrop-blur-sm p-4 animate-fade-up" onClick={() => setOpen(null)}>
          <div className="relative max-w-lg w-full rounded-3xl bg-background p-10 shadow-gold border border-gold/40" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(null)} className="absolute top-5 right-5 text-foreground/60 hover:text-foreground"><X /></button>
            <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-gold">
              {(() => { const I = services[open].icon; return <I className="h-6 w-6 text-background" />; })()}
            </div>
            <h3 className="mt-6 font-display text-4xl">{services[open].title}</h3>
            <p className="mt-2 text-[11px] tracking-[0.3em] uppercase text-gold">{services[open].price}</p>
            <p className="mt-6 font-serif text-lg text-foreground/80 leading-relaxed">{services[open].long}</p>
            <button onClick={() => setOpen(null)} className="shimmer mt-8 w-full rounded-full bg-gradient-gold px-6 py-3 text-xs tracking-[0.3em] uppercase text-background">Enquire Now</button>
          </div>
        </div>
      )}
    </PageShell>
  );
}
