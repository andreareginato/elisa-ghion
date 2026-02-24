import { Link } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Navigation } from "~/components/navigation";
import { Footer } from "~/components/footer";
import { WorkshopCard } from "~/components/workshops/workshop-card";
import { workshops, getUpcoming, getPast } from "~/data/workshops";

const weeklyClasses = getUpcoming(workshops).filter((w) => w.format === "weekly");
const upcomingWorkshops = getUpcoming(workshops).filter((w) => w.format !== "weekly");
const pastWorkshops = getPast(workshops);

export function meta() {
  return [
    { title: "All Workshops — Elisa Ghion" },
    {
      name: "description",
      content:
        "Browse all upcoming and past contact improvisation workshops, jams, and performances with Elisa Ghion.",
    },
  ];
}

export default function WorkshopsPage() {
  useGSAP(() => {
    gsap.from(".workshops-page-heading", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
    gsap.from(".workshops-page-card", {
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.3,
    });
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream">
      <Navigation />

      {/* Spacer for fixed nav */}
      <div className="h-[72px]" />

      {/* Sticky back link below nav */}
      <div className="sticky top-[72px] z-40 bg-brand-cream/90 backdrop-blur-sm border-b border-brand-sand/50">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-4">
          <Link
            to="/#workshops"
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

      <div className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="workshops-page-heading font-heading text-4xl md:text-5xl lg:text-6xl font-black text-brand-charcoal tracking-tight">
              Workshops & Events
            </h1>
            <div className="mx-auto mt-5 h-[2px] w-14 bg-gradient-to-r from-brand-terracotta to-brand-gold" />
          </div>

          {/* Regular Classes */}
          {weeklyClasses.length > 0 && (
            <div className="mb-16">
              <h2 className="font-heading text-2xl font-bold text-brand-charcoal mb-3">
                Regular Classes
              </h2>
              <p className="font-body text-brand-warmGray text-[15px] mb-6">
                Weekly classes running throughout the season. Drop-in or join for the full term.
              </p>
              <div className="grid gap-5">
                {weeklyClasses.map((workshop) => (
                  <div key={workshop.id} className="workshops-page-card">
                    <WorkshopCard workshop={workshop} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming */}
          {upcomingWorkshops.length > 0 && (
            <div className="mb-16">
              <h2 className="font-heading text-2xl font-bold text-brand-charcoal mb-6">
                Upcoming Workshops & Events
              </h2>
              <div className="grid gap-5">
                {upcomingWorkshops.map((workshop) => (
                  <div key={workshop.id} className="workshops-page-card">
                    <WorkshopCard workshop={workshop} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Past */}
          {pastWorkshops.length > 0 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-brand-charcoal mb-6">
                Past Workshops
              </h2>
              <div className="grid gap-5">
                {pastWorkshops.map((workshop) => (
                  <div key={workshop.id} className="workshops-page-card">
                    <WorkshopCard workshop={workshop} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
