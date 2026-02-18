import { useRef } from "react";
import { Link } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { galleryItems } from "~/data/gallery";

gsap.registerPlugin(ScrollTrigger);

const displayItems = galleryItems.slice(0, 9);

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
          {displayItems.map((item, i) => (
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

        {/* View All link */}
        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 font-body text-sm uppercase tracking-[0.15em] text-brand-terracotta hover:text-brand-charcoal transition-colors duration-300"
          >
            View All Photos
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
