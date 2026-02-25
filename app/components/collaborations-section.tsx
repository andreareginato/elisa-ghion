import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Collaboration } from "~/data/collaborations";

gsap.registerPlugin(ScrollTrigger);

export function CollaborationsSection({ collaborations }: { collaborations: Collaboration[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".collab-heading", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      })
        .from(
          ".collab-line",
          { scaleX: 0, opacity: 0, duration: 0.6 },
          "-=0.4"
        )
        .from(
          ".collab-subtitle",
          { y: 20, opacity: 0, duration: 0.6 },
          "-=0.3"
        );

      gsap.utils.toArray<HTMLElement>(".collab-card").forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="collaborations"
      className="py-28 md:py-40 bg-brand-cream"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <h2 className="collab-heading font-heading text-4xl md:text-5xl lg:text-6xl font-black text-brand-charcoal tracking-tight">
            Collaborations
          </h2>
          <div className="collab-line mx-auto mt-5 mb-5 h-[2px] w-14 bg-gradient-to-r from-brand-terracotta to-brand-gold" />
          <p className="collab-subtitle font-body text-brand-warmGray text-lg max-w-md mx-auto">
            Organizations, festivals, and schools I have the joy of working
            with.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {collaborations.map((collab) => (
            <a
              key={collab.name}
              href={collab.website}
              target="_blank"
              rel="noopener noreferrer"
              className="collab-card group relative overflow-hidden rounded-2xl min-h-[260px] flex flex-col justify-end transition-all duration-300 hover:shadow-xl hover:shadow-brand-charcoal/10"
            >
              {/* Background image */}
              <img
                src={collab.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay — lightens on hover to reveal more image */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/55 to-brand-charcoal/25 group-hover:from-brand-charcoal/95 group-hover:via-brand-charcoal/50 group-hover:to-brand-charcoal/15 transition-all duration-500" />

              {/* Initials badge */}
              <div className="absolute top-5 left-5 w-11 h-11 rounded-full bg-brand-white/15 backdrop-blur-sm border border-brand-white/20 flex items-center justify-center">
                <span className="font-heading text-sm font-bold text-brand-white">
                  {collab.initials}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 p-6">
                <h3
                  className="font-heading text-lg font-bold text-brand-white transition-colors duration-300"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
                >
                  {collab.name}
                </h3>
                <p className="mt-2 font-body text-sm text-brand-white/70 leading-relaxed line-clamp-2 whitespace-pre-line">
                  {collab.description}
                </p>

                <span className="inline-flex items-center gap-1 mt-3 font-body text-xs uppercase tracking-[0.15em] text-brand-terracottaLight translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  Visit
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
