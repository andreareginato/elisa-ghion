import { useRef } from "react";
import { Link } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workshops, getUpcoming, formatConfig } from "~/data/workshops";

gsap.registerPlugin(ScrollTrigger);

const allUpcoming = getUpcoming(workshops);

export function WorkshopsSection() {
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

      tl.from(".workshops-heading", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      })
        .from(
          ".workshops-line",
          { scaleX: 0, opacity: 0, duration: 0.6 },
          "-=0.4"
        )
        .from(
          ".workshops-subtitle",
          { y: 20, opacity: 0, duration: 0.6 },
          "-=0.3"
        );

      gsap.from(".calendar-home-item", {
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".calendar-home",
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="workshops"
      className="relative py-28 md:py-40 bg-brand-sand/40"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <h2 className="workshops-heading font-heading text-4xl md:text-5xl lg:text-6xl font-black text-brand-charcoal tracking-tight">
            Workshops & Events
          </h2>
          <div className="workshops-line mx-auto mt-5 mb-5 h-[2px] w-14 bg-gradient-to-r from-brand-terracotta to-brand-gold" />
          <p className="workshops-subtitle font-body text-brand-warmGray text-lg max-w-md mx-auto">
            Upcoming opportunities to explore movement, connection, and the body
            in dialogue.
          </p>
        </div>

        {/* Calendar timeline */}
        {allUpcoming.length > 0 && (
          <div className="calendar-home">
            <div className="relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-brand-sand" />
              <div className="space-y-0">
                {allUpcoming.map((event) => {
                  const style = formatConfig[event.format];
                  const isWeekly = event.format === "weekly";
                  return (
                    <div
                      key={event.id}
                      className="calendar-home-item relative flex items-start gap-5 py-3 group"
                    >
                      <div className="relative z-10 mt-1.5 w-4 h-4 rounded-full border-2 border-brand-sand bg-brand-cream group-hover:border-brand-terracotta transition-colors duration-300 flex-shrink-0" />
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <Link
                              to={`/workshops/${event.id}`}
                              className="font-heading text-base font-bold text-brand-charcoal hover:text-brand-terracotta transition-colors duration-300"
                            >
                              {event.title}
                            </Link>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${style.bg} ${style.text}`}
                            >
                              {style.label}
                            </span>
                          </div>
                          <p className="font-body text-sm text-brand-warmGray mt-0.5">
                            {event.location}
                          </p>
                        </div>
                        <span className="font-body text-sm text-brand-charcoalLight whitespace-nowrap">
                          {isWeekly ? event.schedule : event.dates}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* View All link */}
        <div className="text-center mt-12">
          <Link
            to="/workshops"
            className="inline-flex items-center gap-2 font-body text-sm uppercase tracking-[0.15em] text-brand-terracotta hover:text-brand-charcoal transition-colors duration-300"
          >
            View All Workshops
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
