import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Testimonial } from "~/data/workshops";

gsap.registerPlugin(ScrollTrigger);

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".testimonial-card", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t, i) => (
        <div
          key={i}
          className="testimonial-card bg-brand-cream rounded-2xl p-7 border border-brand-sand"
        >
          <svg
            className="w-8 h-8 text-brand-terracotta/30 mb-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M11.3 2.6C6.5 5.2 4 9.5 4 14c0 3.3 2 6 5 6 2.5 0 4.5-2 4.5-4.5S11.5 11 9 11c-.4 0-.8.1-1.2.2C8.4 7.5 10.2 5 13 3.4L11.3 2.6zm9 0C15.5 5.2 13 9.5 13 14c0 3.3 2 6 5 6 2.5 0 4.5-2 4.5-4.5S20.5 11 18 11c-.4 0-.8.1-1.2.2C17.4 7.5 19.2 5 22 3.4L20.3 2.6z" />
          </svg>
          <p className="font-body text-[15px] text-brand-charcoalLight leading-relaxed italic">
            {t.quote}
          </p>
          <div className="mt-5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-sand flex items-center justify-center">
              <span className="font-body text-xs font-medium text-brand-warmGray">
                {t.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-body text-sm font-medium text-brand-charcoal">
                {t.name}
              </p>
              <p className="font-body text-xs text-brand-warmGray">{t.year}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
