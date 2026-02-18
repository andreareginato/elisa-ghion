import { useRef } from "react";
import { Link } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navigation } from "~/components/navigation";
import { Footer } from "~/components/footer";
import { researchAreas } from "~/data/research";

gsap.registerPlugin(ScrollTrigger);

export function meta() {
  return [
    { title: "About — Elisa Ghion" },
    {
      name: "description",
      content:
        "Elisa Ghion is a contact improvisation teacher and performer based in Italy. Discover her biography, teaching philosophy, and areas of movement research.",
    },
  ];
}

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-page-heading", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".about-page-text", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2,
      });

      gsap.from(".philosophy-block", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".philosophy-block",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.utils.toArray<HTMLElement>(".research-card").forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef} className="min-h-screen bg-brand-cream">
      <Navigation />

      {/* Spacer for fixed nav */}
      <div className="h-[72px]" />

      {/* Sticky back link */}
      <div className="sticky top-[72px] z-40 bg-brand-cream/90 backdrop-blur-sm border-b border-brand-sand/50">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-4">
          <Link
            to="/#about"
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

      {/* Bio section */}
      <div className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <h1 className="about-page-heading font-heading text-4xl md:text-5xl lg:text-6xl font-black text-brand-charcoal tracking-tight">
            About <span className="text-brand-terracotta">Elisa</span>
          </h1>
          <div className="mt-5 mb-10 h-[2px] w-14 bg-gradient-to-r from-brand-terracotta to-brand-gold" />

          <div className="grid md:grid-cols-12 gap-10 md:gap-14">
            {/* Photo */}
            <div className="md:col-span-4">
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] shadow-xl shadow-brand-terracotta/8">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-terracotta/25 via-brand-sand to-brand-coral/20" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-brand-charcoal/5" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-brand-warmGray/30 font-heading text-lg italic">
                    Photo placeholder
                  </span>
                </div>
              </div>
            </div>

            {/* Full bio */}
            <div className="md:col-span-8 space-y-5 font-body text-brand-charcoalLight leading-[1.8] text-[16px]">
              <p className="about-page-text">
                Elisa Ghion is a contact improvisation teacher and performer
                based in Italy, dedicated to exploring the art of movement
                dialogue between bodies. Her practice is rooted in deep
                listening, shared weight, and the poetics of physical
                conversation.
              </p>
              <p className="about-page-text">
                With over a decade of experience in somatics, dance
                improvisation, and movement research, Elisa creates spaces where
                practitioners of all levels can discover the intelligence of the
                body in relation to others and to gravity.
              </p>
              <p className="about-page-text">
                Her teaching draws from contact improvisation, Body-Mind
                Centering, and contemporary dance, weaving together technique
                and creative exploration. She leads workshops and intensives
                across Europe, fostering community through the shared language
                of touch and movement.
              </p>
              <p className="about-page-text">
                Elisa began her movement journey through contemporary dance in
                Milan, later discovering contact improvisation during a workshop
                in Berlin that changed her trajectory entirely. Since then she
                has studied with teachers including Nancy Stark Smith, Nita
                Little, Martin Keogh, and Kirstie Simson, deepening her
                understanding of the form and its possibilities.
              </p>
              <p className="about-page-text">
                Today she divides her time between teaching regular classes in
                Milan, leading intensive workshops across Italy and Europe, and
                her own movement research — an ongoing inquiry into how contact
                improvisation can evolve as both an art form and a practice of
                radical presence.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Teaching philosophy */}
      <div className="py-16 md:py-20 bg-brand-sand/40">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="philosophy-block text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-black text-brand-charcoal tracking-tight mb-6">
              Teaching Philosophy
            </h2>
            <div className="mx-auto mb-8 h-[2px] w-14 bg-gradient-to-r from-brand-terracotta to-brand-gold" />
            <div className="space-y-5 font-body text-brand-charcoalLight leading-[1.9] text-[16px] text-left">
              <p>
                I believe that contact improvisation is learned through the body,
                not explained to the mind. My classes create conditions for
                discovery rather than delivering instructions — I offer scores,
                invitations, and questions that guide you toward your own
                experience.
              </p>
              <p>
                Safety and consent are foundational. Every class begins with
                clear agreements about touch, communication, and personal
                boundaries. I want everyone in the room to feel empowered to say
                yes, no, or not yet — and to know that each answer is equally
                valued.
              </p>
              <p>
                I teach from a place of ongoing learning. My practice is never
                finished, and I share what I am currently exploring alongside
                what I have integrated over the years. This keeps the work alive
                and honest.
              </p>
            </div>
            <p className="mt-8 font-heading text-xl font-medium italic text-brand-charcoal leading-relaxed">
              &ldquo;Contact improvisation is not just a dance form but a
              practice of presence, trust, and radical togetherness.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Research areas */}
      <div className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black text-brand-charcoal tracking-tight">
              Movement <span className="text-brand-terracotta">Research</span>
            </h2>
            <div className="mx-auto mt-5 mb-5 h-[2px] w-14 bg-gradient-to-r from-brand-terracotta to-brand-gold" />
            <p className="font-body text-brand-warmGray text-lg max-w-lg mx-auto">
              Areas of ongoing exploration and inquiry that inform my teaching
              and creative practice.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {researchAreas.map((area) => (
              <div
                key={area.title}
                className="research-card group relative overflow-hidden rounded-2xl min-h-[300px] flex flex-col justify-end"
              >
                {/* Background image */}
                <img
                  src={area.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/50 to-brand-charcoal/20 group-hover:from-brand-charcoal/95 group-hover:via-brand-charcoal/60 group-hover:to-brand-charcoal/25 transition-all duration-500" />

                {/* Content */}
                <div className="relative z-10 p-7">
                  <h3
                    className="font-heading text-lg font-bold text-brand-white mb-2"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
                  >
                    {area.title}
                  </h3>
                  <p className="font-body text-sm text-brand-white/75 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                    {area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
