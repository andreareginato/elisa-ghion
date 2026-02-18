import { useEffect, useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { GalleryItem } from "~/data/gallery";

type LightboxProps = {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function Lightbox({ items, currentIndex, onClose, onNavigate }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const item = items[currentIndex];

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goPrev, goNext]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Entry animation
  useGSAP(
    () => {
      if (!overlayRef.current) return;
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.1 }
        );
      }
    },
    { scope: overlayRef }
  );

  const handleClose = () => {
    if (!overlayRef.current) return onClose();
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-charcoal/90 backdrop-blur-sm"
      onClick={handleClose}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-brand-white/10 hover:bg-brand-white/20 transition-colors text-brand-cream text-xl"
        aria-label="Close"
      >
        &times;
      </button>

      {/* Previous */}
      <button
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        className="absolute left-4 md:left-8 w-10 h-10 flex items-center justify-center rounded-full bg-brand-white/10 hover:bg-brand-white/20 transition-colors text-brand-cream"
        aria-label="Previous image"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Image */}
      <div className="max-w-5xl max-h-[85vh] px-16" onClick={(e) => e.stopPropagation()}>
        <img
          ref={imgRef}
          src={item.src}
          alt={item.alt}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
        />
        <p className="text-center mt-4 font-body text-sm text-brand-cream/70">
          {item.caption}
          <span className="ml-3 text-brand-cream/40">
            {currentIndex + 1} / {items.length}
          </span>
        </p>
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        className="absolute right-4 md:right-8 w-10 h-10 flex items-center justify-center rounded-full bg-brand-white/10 hover:bg-brand-white/20 transition-colors text-brand-cream"
        aria-label="Next image"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
