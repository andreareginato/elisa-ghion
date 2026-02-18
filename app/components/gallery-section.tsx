import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    src: "/images/gallery-1.jpg",
    alt: "Dancer in motion",
    caption: "The art of falling",
    span: "md:col-span-2 md:row-span-2", // large
  },
  {
    src: "/images/gallery-2.jpg",
    alt: "Contact improvisation duet",
    caption: "Shared weight",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/gallery-3.jpg",
    alt: "Workshop moment",
    caption: "Listening through touch",
    span: "md:col-span-1 md:row-span-2", // tall
  },
  {
    src: "/images/gallery-4.jpg",
    alt: "Movement exploration",
    caption: "Floor work",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/gallery-5.jpg",
    alt: "Dance performance",
    caption: "In dialogue with gravity",
    span: "md:col-span-2 md:row-span-1", // wide
  },
  {
    src: "/images/gallery-6.jpg",
    alt: "Group improvisation",
    caption: "Community practice",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/gallery-7.jpg",
    alt: "Spiraling into contact",
    caption: "Spirals and curves",
    span: "md:col-span-1 md:row-span-2", // tall
  },
  {
    src: "/images/gallery-8.jpg",
    alt: "Partner weight sharing",
    caption: "Trust in motion",
    span: "md:col-span-2 md:row-span-1", // wide
  },
  {
    src: "/images/gallery-9.jpg",
    alt: "Solo movement practice",
    caption: "Finding stillness",
    span: "md:col-span-1 md:row-span-1",
  },
];

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Heading
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".gallery-heading", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      }).from(
        ".gallery-line",
        { scaleX: 0, opacity: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

      // Staggered image reveals
      gsap.utils.toArray<HTMLElement>(".gallery-item").forEach((item, i) => {
        gsap.from(item, {
          y: 80 + (i % 2) * 30,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });

        // Parallax on each image
        const img = item.querySelector(".gallery-img");
        if (img) {
          gsap.fromTo(
            img,
            { y: -20 },
            {
              y: 20,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="py-28 md:py-40 bg-brand-cream"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <h2 className="gallery-heading font-heading text-4xl md:text-5xl lg:text-6xl font-black text-brand-charcoal tracking-tight">
            In <span className="text-brand-terracotta">Motion</span>
          </h2>
          <div className="gallery-line mx-auto mt-5 h-[2px] w-14 bg-gradient-to-r from-brand-terracotta to-brand-gold" />
        </div>

        {/* Asymmetric masonry grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[200px] md:auto-rows-[220px]">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`gallery-item group relative overflow-hidden rounded-2xl cursor-pointer ${item.span}`}
            >
              {/* Image with parallax wrapper */}
              <div className="absolute inset-[-10%] overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="gallery-img w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 via-brand-charcoal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <span className="font-body text-sm text-brand-cream tracking-wide translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                  {item.caption}
                </span>
              </div>

              {/* Subtle border */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-brand-charcoal/5 group-hover:ring-brand-terracotta/20 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
