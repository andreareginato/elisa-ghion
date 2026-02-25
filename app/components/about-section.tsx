import { useRef } from "react";
import { Link } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const defaultBioParagraphs = [
  "Elisa Ghion is a contact improvisation teacher and performer based in Italy, dedicated to exploring the art of movement dialogue between bodies. Her practice is rooted in deep listening, shared weight, and the poetics of physical conversation.",
  "With over a decade of experience in somatics, dance improvisation, and movement research, Elisa creates spaces where practitioners of all levels can discover the intelligence of the body in relation to others and to gravity.",
  "Her teaching draws from contact improvisation, Body-Mind Centering, and contemporary dance, weaving together technique and creative exploration. She leads workshops and intensives across Europe, fostering community through the shared language of touch and movement.",
];

const defaultQuote = "Contact improvisation is not just a dance form but a practice of presence, trust, and radical togetherness.";

interface AboutSectionProps {
  aboutSettings?: Record<string, string>;
}

export function AboutSection({ aboutSettings }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLParagraphElement[]>([]);

  useGSAP(
    () => {
      // Photo parallax
      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { y: 80 },
          {
            y: -80,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Heading + line
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".about-heading", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      }).from(
        ".about-line",
        { scaleX: 0, opacity: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

      // Staggered paragraph reveals
      textRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          y: 35,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  const bioParagraphs = aboutSettings?.about_bio
    ? aboutSettings.about_bio.split("\n\n").filter((p) => p.trim())
    : defaultBioParagraphs;

  const quote = aboutSettings?.about_philosophy_quote || defaultQuote;

  const addTextRef = (el: HTMLParagraphElement | null, i: number) => {
    if (el) textRefs.current[i] = el;
  };

  return (
    <section ref={sectionRef} id="about" className="relative py-28 md:py-40">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-cream via-brand-white to-brand-cream pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Photo — 5 cols */}
          <div className="md:col-span-5 relative">
            <div className="relative overflow-hidden rounded-3xl aspect-[3/4] shadow-2xl shadow-brand-terracotta/8">
              <div ref={photoRef} className="absolute inset-[-20%]">
                {aboutSettings?.about_profile_image ? (
                  <img
                    src={aboutSettings.about_profile_image}
                    alt="Elisa Ghion"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-brand-terracotta/25 via-brand-sand to-brand-coral/20" />
                )}
              </div>
              {/* Decorative frame accent */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-brand-charcoal/5" />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-brand-charcoal/10 to-transparent" />
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-brand-gold/10 -z-10 blur-sm" />
          </div>

          {/* Bio text — 7 cols */}
          <div className="md:col-span-7 md:pt-8">
            <h2 className="about-heading font-heading text-4xl md:text-5xl lg:text-6xl font-black text-brand-charcoal tracking-tight leading-[1.1]">
              About <span className="text-brand-terracotta">Elisa</span>
            </h2>
            <div className="about-line mt-5 mb-8 h-[2px] w-14 bg-gradient-to-r from-brand-terracotta to-brand-gold origin-left" />
            <div className="space-y-5 font-body text-brand-charcoalLight leading-[1.8] text-[17px]">
              {bioParagraphs.map((paragraph, i) => (
                <p key={i} ref={(el) => addTextRef(el, i)}>{paragraph}</p>
              ))}
              <p
                ref={(el) => addTextRef(el, bioParagraphs.length)}
                className="text-brand-charcoal font-medium italic font-heading text-xl leading-relaxed pt-2"
              >
                &ldquo;{quote}&rdquo;
              </p>

              <div ref={(el) => addTextRef(el, bioParagraphs.length + 1)}>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 mt-4 font-body text-sm uppercase tracking-[0.15em] text-brand-terracotta hover:text-brand-charcoal transition-colors duration-300"
                >
                  Learn More
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
          </div>
        </div>
      </div>
    </section>
  );
}
