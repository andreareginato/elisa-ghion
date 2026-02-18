import { useState } from "react";
import { Link } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Navigation } from "~/components/navigation";
import { Footer } from "~/components/footer";
import { Lightbox } from "~/components/lightbox";
import { galleryItems, type GalleryCategory } from "~/data/gallery";

const categories: { label: string; value: GalleryCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Workshops", value: "workshops" },
  { label: "Performances", value: "performances" },
  { label: "Jams", value: "jams" },
  { label: "Portraits", value: "portraits" },
];

export function meta() {
  return [
    { title: "Gallery — Elisa Ghion" },
    {
      name: "description",
      content:
        "Photos from workshops, performances, jams, and more — the art of contact improvisation in motion.",
    },
  ];
}

export default function GalleryPage() {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  useGSAP(() => {
    gsap.from(".gallery-page-heading", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
    gsap.from(".gallery-filter-btn", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: "power2.out",
      delay: 0.3,
    });
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream">
      <Navigation />

      {/* Spacer for fixed nav */}
      <div className="h-[72px]" />

      {/* Sticky back link below nav */}
      <div className="sticky top-[72px] z-40 bg-brand-cream/90 backdrop-blur-sm border-b border-brand-sand/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4">
          <Link
            to="/#gallery"
            className="inline-flex items-center gap-2 font-body text-sm text-brand-warmGray hover:text-brand-terracotta transition-colors duration-300"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="gallery-page-heading font-heading text-4xl md:text-5xl lg:text-6xl font-black text-brand-charcoal tracking-tight">
              In <span className="text-brand-terracotta">Motion</span>
            </h1>
            <div className="mx-auto mt-5 h-[2px] w-14 bg-gradient-to-r from-brand-terracotta to-brand-gold" />
          </div>

          {/* Filter bar */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`gallery-filter-btn px-5 py-2 rounded-full font-body text-sm transition-all duration-300 ${
                  filter === cat.value
                    ? "bg-brand-terracotta text-brand-white shadow-md shadow-brand-terracotta/20"
                    : "bg-brand-white text-brand-charcoalLight border border-brand-sand hover:border-brand-terracotta/30"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[200px] md:auto-rows-[220px]">
            {filtered.map((item, i) => (
              <div
                key={`${item.src}-${filter}`}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${item.span}`}
                onClick={() => setLightboxIndex(i)}
              >
                <div className="absolute inset-[-10%] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 via-brand-charcoal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <span className="font-body text-sm text-brand-cream tracking-wide translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                    {item.caption}
                  </span>
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-brand-charcoal/5 group-hover:ring-brand-terracotta/20 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}

      <Footer />
    </div>
  );
}
