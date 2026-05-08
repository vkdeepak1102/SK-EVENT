import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getUploadedImages, UploadedImage } from "@/lib/db";
import { PageShell } from "@/components/PageShell";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import wedding from "@/assets/event-wedding.jpg";
import yacht from "@/assets/event-yacht.jpg";
import birthday from "@/assets/event-birthday.jpg";
import celeb from "@/assets/event-celebrity.jpg";
import corp from "@/assets/event-corporate.jpg";
import villa from "@/assets/event-villa.jpg";
import hero from "@/assets/hero-luxury.jpg";
import { X } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  head: () => ({
    meta: [
      { title: "Gallery — SK Events & Management" },
      { name: "description", content: "A masonry diary of SK celebrations: weddings, yacht parties, villa surprises and more." },
    ],
  }),
});

const items = [
  { src: wedding, cat: "Weddings", h: "tall" },
  { src: yacht, cat: "Yacht Parties", h: "med" },
  { src: birthday, cat: "Birthday Surprise", h: "short" },
  { src: celeb, cat: "Celebrity Events", h: "tall" },
  { src: villa, cat: "Villa Surprise", h: "med" },
  { src: corp, cat: "Celebrity Events", h: "short" },
  { src: hero, cat: "Weddings", h: "tall" },
  { src: birthday, cat: "Room Decor", h: "med" },
  { src: yacht, cat: "Yacht Parties", h: "short" },
  { src: villa, cat: "Villa Surprise", h: "tall" },
  { src: celeb, cat: "Model Shoots", h: "med" },
  { src: wedding, cat: "Weddings", h: "short" },
];

const cats = ["All", "Weddings", "Yacht Parties", "Birthday Surprise", "Room Decor", "Villa Surprise", "Celebrity Events", "Model Shoots"];

const heightMap = { tall: "h-[460px]", med: "h-[340px]", short: "h-[260px]" } as const;

function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedItems, setUploadedItems] = useState<UploadedImage[]>([]);

  useEffect(() => {
    getUploadedImages().then(setUploadedItems).catch(console.error);
  }, []);

  const allItems = [...uploadedItems, ...items];
  const list = filter === "All" ? allItems : allItems.filter((i) => i.cat === filter);

  return (
    <PageShell>
      <section className="pt-40 pb-10 mx-auto max-w-7xl px-6">
        <SectionTitle eyebrow="The Diary" title="A gallery in candlelight" subtitle="Glimpses of nights composed with painstaking devotion." />
      </section>


      <section className="mx-auto max-w-7xl px-6 mb-10">
        <div className="flex flex-wrap justify-center gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-2 text-[10px] tracking-[0.3em] uppercase transition-all ${
                filter === c ? "bg-gradient-gold border-transparent text-background" : "border-border text-foreground/70 hover:border-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {list.map((it, i) => (
            <Reveal key={i} delay={i * 30}>
              <button
                onClick={() => setPreview(it.src)}
                className={`mb-6 block w-full break-inside-avoid img-zoom relative overflow-hidden rounded-2xl shadow-soft hover:ring-gold-glow ${heightMap[it.h as keyof typeof heightMap]}`}
              >
                <img src={it.src} alt={it.cat} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 text-background text-[10px] tracking-[0.35em] uppercase opacity-0 hover:opacity-100 transition-opacity">{it.cat}</div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {preview && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-foreground/85 backdrop-blur p-6 animate-fade-up" onClick={() => setPreview(null)}>
          <button className="absolute top-6 right-6 text-background"><X /></button>
          <img src={preview} alt="" className="max-h-[90vh] max-w-full rounded-2xl shadow-gold" />
        </div>
      )}
    </PageShell>
  );
}
