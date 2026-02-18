import { useRef } from "react";
import { Link } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workshops } from "~/data/workshops";
import { WorkshopCard } from "./workshop-card";

gsap.registerPlugin(ScrollTrigger);

const upcomingWorkshops = workshops.filter((w) => w.status === "upcoming");

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

      gsap.from(".workshop-card", {
        y: 70,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".workshop-card",
          start: "top 88%",
          toggleActions: "play none none reverse",
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
            Workshops
          </h2>
          <div className="workshops-line mx-auto mt-5 mb-5 h-[2px] w-14 bg-gradient-to-r from-brand-terracotta to-brand-gold" />
          <p className="workshops-subtitle font-body text-brand-warmGray text-lg max-w-md mx-auto">
            Upcoming opportunities to explore movement, connection, and the body
            in dialogue.
          </p>
        </div>
        <div className="grid gap-5">
          {upcomingWorkshops.map((workshop) => (
            <div key={workshop.id} className="workshop-card">
              <WorkshopCard workshop={workshop} />
            </div>
          ))}
        </div>

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
