import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Video } from "~/data/videos";

gsap.registerPlugin(ScrollTrigger);

function VideoCard({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="video-card group">
      <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-brand-charcoal">
        {playing ? (
          <iframe
            src={video.embedUrl}
            title={video.title}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            scrolling="no"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full cursor-pointer"
            aria-label={`Play ${video.title}`}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-brand-charcoal/30 group-hover:bg-brand-charcoal/40 transition-colors duration-300" />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-brand-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-brand-terracotta ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            {/* Instagram icon */}
            <div className="absolute top-4 right-4">
              <svg
                className="w-6 h-6 text-brand-white/80"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </div>
          </button>
        )}
      </div>
      <h3 className="mt-4 font-heading text-lg font-bold text-brand-charcoal">
        {video.title}
      </h3>
      <p className="mt-1 font-body text-sm text-brand-warmGray leading-relaxed">
        {video.description}
      </p>
    </div>
  );
}

export function VideoSection({ videos }: { videos: Video[] }) {
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

      tl.from(".video-heading", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      })
        .from(
          ".video-line",
          { scaleX: 0, opacity: 0, duration: 0.6 },
          "-=0.4"
        )
        .from(
          ".video-subtitle",
          { y: 20, opacity: 0, duration: 0.6 },
          "-=0.3"
        );

      gsap.from(".video-card", {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".video-card",
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
      id="videos"
      className="py-28 md:py-40 bg-brand-sand/40"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <h2 className="video-heading font-heading text-4xl md:text-5xl lg:text-6xl font-black text-brand-charcoal tracking-tight">
            Watch
          </h2>
          <div className="video-line mx-auto mt-5 mb-5 h-[2px] w-14 bg-gradient-to-r from-brand-terracotta to-brand-gold" />
          <p className="video-subtitle font-body text-brand-warmGray text-lg max-w-md mx-auto">
            Performances, workshops, and conversations on the art of contact
            improvisation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.title} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
