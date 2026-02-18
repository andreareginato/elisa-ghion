import { useRef, useState } from "react";
import { Link } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Workshop } from "~/data/workshops";

export function WorkshopCard({ workshop }: { workshop: Workshop }) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!contentRef.current) return;
      if (expanded) {
        gsap.fromTo(
          contentRef.current,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    },
    { dependencies: [expanded], scope: cardRef }
  );

  return (
    <div
      ref={cardRef}
      className={`group bg-brand-white rounded-2xl p-7 md:p-9 cursor-pointer border border-transparent transition-all duration-300 ${
        expanded
          ? "shadow-xl shadow-brand-terracotta/8 border-brand-terracotta/10"
          : "shadow-md shadow-brand-charcoal/3 hover:shadow-lg hover:shadow-brand-terracotta/6 hover:border-brand-sand"
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-heading text-xl md:text-2xl font-bold text-brand-charcoal group-hover:text-brand-terracotta transition-colors duration-300">
            {workshop.title}
          </h3>
          <p className="font-body text-brand-warmGray mt-1 text-[15px]">
            {workshop.subtitle}
          </p>
        </div>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full border border-brand-sand flex items-center justify-center text-brand-terracotta text-lg font-light transition-all duration-300 ${
            expanded
              ? "rotate-45 bg-brand-terracotta text-brand-white border-brand-terracotta"
              : "group-hover:border-brand-terracotta/40"
          }`}
        >
          +
        </span>
      </div>

      <div className="flex flex-wrap gap-5 mt-4 font-body text-sm text-brand-charcoalLight">
        <span className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-brand-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {workshop.dates}
        </span>
        <span className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-brand-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {workshop.location}
        </span>
      </div>

      {/* Expandable content */}
      <div ref={contentRef} className="overflow-hidden" style={{ height: 0 }}>
        <div className="pt-5 mt-5 border-t border-brand-sand">
          <p className="font-body text-brand-charcoalLight leading-[1.8] text-[15px]">
            {workshop.description}
          </p>
          <Link
            to={`/workshops/${workshop.id}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 mt-6 px-7 py-3 bg-brand-charcoal text-brand-cream font-body text-sm font-medium rounded-full hover:bg-brand-terracotta transition-colors duration-300"
          >
            Learn More
            <svg
              className="w-3.5 h-3.5"
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
    </div>
  );
}
