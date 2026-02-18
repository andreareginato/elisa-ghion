import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".newsletter-heading", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      })
        .from(
          ".newsletter-line",
          { scaleX: 0, opacity: 0, duration: 0.6 },
          "-=0.4"
        )
        .from(
          ".newsletter-body",
          { y: 20, opacity: 0, duration: 0.6 },
          "-=0.3"
        )
        .from(
          ".newsletter-form",
          { y: 20, opacity: 0, duration: 0.6 },
          "-=0.3"
        );
    },
    { scope: sectionRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — replace with Mailchimp or other service
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="newsletter"
      className="py-28 md:py-40 bg-brand-sand/60"
    >
      <div className="max-w-2xl mx-auto px-6 lg:px-10 text-center">
        <h2 className="newsletter-heading font-heading text-4xl md:text-5xl font-black text-brand-charcoal tracking-tight">
          Stay in <span className="text-brand-terracotta">Touch</span>
        </h2>
        <div className="newsletter-line mx-auto mt-5 mb-5 h-[2px] w-14 bg-gradient-to-r from-brand-terracotta to-brand-gold" />
        <p className="newsletter-body font-body text-brand-warmGray text-lg leading-relaxed">
          Receive updates on upcoming workshops, jams, and performances. No
          spam, just movement — a few times a year.
        </p>

        {submitted ? (
          <div className="newsletter-form mt-10 p-8 bg-brand-white rounded-2xl border border-brand-sand">
            <p className="font-body text-brand-charcoal font-medium">
              Thank you for subscribing!
            </p>
            <p className="mt-2 font-body text-sm text-brand-warmGray">
              You&apos;ll hear from us soon.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="newsletter-form mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            action="https://example.us1.list-manage.com/subscribe/post"
            method="POST"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-full bg-brand-white border border-brand-sand font-body text-sm text-brand-charcoal placeholder:text-brand-warmGray/60 focus:outline-none focus:border-brand-terracotta/40 focus:ring-2 focus:ring-brand-terracotta/10 transition-all duration-300"
            />
            <button
              type="submit"
              className="px-8 py-3.5 bg-brand-terracotta text-brand-white font-body text-sm font-medium rounded-full hover:bg-brand-charcoal transition-colors duration-300 shadow-md shadow-brand-terracotta/20"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="mt-5 font-body text-xs text-brand-warmGray/60">
          We respect your privacy. Unsubscribe anytime.
        </p>

        {/* Email contact */}
        <div className="mt-10">
          <a
            href="mailto:hello@elisaghion.com"
            className="inline-flex items-center gap-2.5 font-body text-sm text-brand-charcoalLight hover:text-brand-terracotta transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            hello@elisaghion.com
          </a>
        </div>
      </div>
    </section>
  );
}
