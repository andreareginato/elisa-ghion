import { useRef } from "react";
import { Link, data } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workshops } from "~/data/workshops";
import { Footer } from "~/components/footer";
import type { Route } from "./+types/workshop-detail";

gsap.registerPlugin(ScrollTrigger);

export function clientLoader({ params }: Route.ClientLoaderArgs) {
  const workshop = workshops.find((w) => w.id === params.id);
  if (!workshop) {
    throw data("Workshop not found", { status: 404 });
  }
  return { workshop };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return [{ title: "Workshop Not Found" }];
  }
  return [
    { title: `${data.workshop.title} — Elisa Ghion` },
    { name: "description", content: data.workshop.description },
  ];
}

export default function WorkshopDetail({
  loaderData,
}: Route.ComponentProps) {
  const { workshop } = loaderData;
  const pageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Hero entry animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".ws-back", { y: -20, opacity: 0, duration: 0.5 })
        .from(".ws-title", { y: 40, opacity: 0, duration: 0.8 }, "-=0.2")
        .from(".ws-subtitle", { y: 30, opacity: 0, duration: 0.6 }, "-=0.5")
        .from(".ws-line", { scaleX: 0, duration: 0.6 }, "-=0.3")
        .from(
          ".ws-badge",
          { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 },
          "-=0.3"
        );

      // Image reveal
      gsap.from(".ws-image", {
        y: 60,
        opacity: 0,
        scale: 0.97,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".ws-image",
          start: "top 85%",
        },
      });

      // Image parallax
      const img = imageRef.current?.querySelector("img");
      if (img) {
        gsap.fromTo(
          img,
          { y: -30 },
          {
            y: 30,
            ease: "none",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Staggered paragraph reveals
      gsap.utils
        .toArray<HTMLElement>(".ws-paragraph")
        .forEach((el) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
            },
          });
        });

      // Highlights reveal
      gsap.from(".ws-highlight", {
        y: 25,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".ws-highlights",
          start: "top 85%",
        },
      });

      // CTA reveal
      gsap.from(".ws-cta", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".ws-cta",
          start: "top 90%",
        },
      });
    },
    { scope: pageRef }
  );

  const paragraphs = workshop.longDescription
    .split("\n\n")
    .filter((p) => p.trim());

  return (
    <div ref={pageRef} className="min-h-screen bg-brand-cream">
      {/* Sticky back link */}
      <div className="sticky top-0 z-50 bg-brand-cream/90 backdrop-blur-sm border-b border-brand-sand/50">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-4">
          <Link
            to="/#workshops"
            className="ws-back inline-flex items-center gap-2 font-body text-sm text-brand-warmGray hover:text-brand-terracotta transition-colors duration-300"
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
            Back to Workshops
          </Link>
        </div>
      </div>

      {/* Hero area */}
      <header className="pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <h1 className="ws-title font-heading text-4xl md:text-5xl lg:text-6xl font-black text-brand-charcoal tracking-tight leading-[1.1]">
            {workshop.title}
          </h1>
          <p className="ws-subtitle font-body text-lg md:text-xl text-brand-warmGray mt-4">
            {workshop.subtitle}
          </p>
          <div className="ws-line mt-6 h-[3px] w-16 bg-gradient-to-r from-brand-terracotta to-brand-gold rounded-full origin-left" />

          <div className="flex flex-wrap gap-3 mt-8">
            <span className="ws-badge inline-flex items-center gap-2 px-4 py-2 bg-brand-white rounded-full font-body text-sm text-brand-charcoalLight border border-brand-sand">
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
            <span className="ws-badge inline-flex items-center gap-2 px-4 py-2 bg-brand-white rounded-full font-body text-sm text-brand-charcoalLight border border-brand-sand">
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
        </div>
      </header>

      {/* Full-width image with parallax */}
      <div
        ref={imageRef}
        className="ws-image relative overflow-hidden mx-auto max-w-5xl px-6 lg:px-10"
      >
        <div className="relative rounded-2xl overflow-hidden aspect-[16/9]">
          <img
            src={workshop.image}
            alt={workshop.title}
            className="absolute inset-[-15%] w-[130%] h-[130%] object-cover"
          />
          <div className="absolute inset-0 ring-1 ring-brand-charcoal/5 rounded-2xl" />
        </div>
      </div>

      {/* Long description */}
      <div className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="space-y-6">
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="ws-paragraph font-body text-brand-charcoalLight leading-[1.9] text-[15px] md:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Highlights */}
          <div className="ws-highlights mt-14 p-8 bg-brand-white rounded-2xl border border-brand-sand">
            <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-5">
              Details
            </h3>
            <ul className="space-y-3">
              {workshop.highlights.map((highlight, i) => (
                <li
                  key={i}
                  className="ws-highlight flex items-start gap-3 font-body text-[15px] text-brand-charcoalLight"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-terracotta flex-shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="ws-cta mt-16 text-center">
            <a
              href={workshop.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-brand-terracotta text-brand-white font-body text-base font-medium rounded-full hover:bg-brand-charcoal transition-colors duration-300 shadow-lg shadow-brand-terracotta/20"
            >
              Register for this Workshop
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
            <p className="mt-4 font-body text-sm text-brand-warmGray">
              You&apos;ll be redirected to the registration page
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
