import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Entry animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(headingRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.4,
        delay: 0.2,
      })
        .from(
          lineRef.current,
          { scaleX: 0, opacity: 0, duration: 0.8 },
          "-=0.8"
        )
        .from(
          subtitleRef.current,
          { y: 30, opacity: 0, duration: 1, letterSpacing: "0.5em" },
          "-=0.5"
        )
        .from(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10, duration: 0.6 },
          "-=0.3"
        );

      // Slow gradient drift
      gsap.to(gradientRef.current, {
        backgroundPosition: "100% 100%",
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });

      // Scroll-driven parallax
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          const p = self.progress;
          if (headingRef.current) {
            gsap.set(headingRef.current, {
              opacity: 1 - p * 1.8,
              y: p * -100,
              scale: 1 - p * 0.1,
            });
          }
          if (subtitleRef.current) {
            gsap.set(subtitleRef.current, {
              opacity: 1 - p * 2,
              y: p * -70,
            });
          }
          if (lineRef.current) {
            gsap.set(lineRef.current, {
              opacity: 1 - p * 2.5,
              scaleX: 1 + p * 2,
            });
          }
          if (scrollIndicatorRef.current) {
            gsap.set(scrollIndicatorRef.current, {
              opacity: 1 - p * 4,
            });
          }
          if (gradientRef.current) {
            gsap.set(gradientRef.current, {
              scale: 1 + p * 0.15,
              opacity: 1 - p * 0.5,
            });
          }
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex items-center justify-center h-screen overflow-hidden bg-brand-cream"
    >
      {/* Flowing gradient background */}
      <div
        ref={gradientRef}
        className="hero-gradient"
        aria-hidden="true"
      />

      {/* Grain overlay */}
      <div className="hero-grain" aria-hidden="true" />

      {/* Text content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        <h1
          ref={headingRef}
          className="font-heading text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[9rem] font-black text-brand-charcoal tracking-[-0.02em] leading-[0.9]"
        >
          Elisa
          <br />
          <span className="text-brand-terracotta">Ghion</span>
        </h1>
        <div
          ref={lineRef}
          className="mt-6 mb-5 h-[2px] w-16 bg-gradient-to-r from-brand-terracotta to-brand-gold origin-center"
        />
        <p
          ref={subtitleRef}
          className="font-body text-sm md:text-base text-brand-charcoalLight tracking-[0.3em] uppercase"
        >
          Contact Improvisation
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 scroll-indicator"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.25em] text-brand-charcoalLight/70">
          Scroll
        </span>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          className="text-brand-charcoalLight/60"
        >
          <rect
            x="1"
            y="1"
            width="14"
            height="22"
            rx="7"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="8" cy="8" r="2" fill="currentColor">
            <animate
              attributeName="cy"
              values="8;14;8"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;0.3;1"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    </section>
  );
}
