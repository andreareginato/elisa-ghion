import { Link } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Navigation } from "~/components/navigation";
import { Footer } from "~/components/footer";
import { WorkshopCard } from "~/components/workshops/workshop-card";
import { workshops } from "~/data/workshops";
import { calendarEvents } from "~/data/events";

const upcomingWorkshops = workshops.filter((w) => w.status === "upcoming");
const pastWorkshops = workshops.filter((w) => w.status === "past");

const typeColors: Record<string, { bg: string; text: string; label: string }> = {
  workshop: { bg: "bg-brand-terracotta/10", text: "text-brand-terracotta", label: "Workshop" },
  jam: { bg: "bg-brand-gold/15", text: "text-brand-gold", label: "Jam" },
  performance: { bg: "bg-brand-rose/10", text: "text-brand-rose", label: "Performance" },
};

export function meta() {
  return [
    { title: "All Workshops — Elisa Ghion" },
    {
      name: "description",
      content:
        "Browse all upcoming and past contact improvisation workshops with Elisa Ghion.",
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
    gsap.from(".calendar-item", {
      x: -30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: "power2.out",
      delay: 0.3,
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

          {/* Calendar */}
          <div className="mb-20">
            <h2 className="font-heading text-2xl font-bold text-brand-charcoal mb-8">
              Calendar
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-brand-sand" />

              <div className="space-y-0">
                {calendarEvents.map((event) => {
                  const style = typeColors[event.type];
                  return (
                    <div
                      key={`${event.title}-${event.date}`}
                      className="calendar-item relative flex items-start gap-5 py-4 group"
                    >
                      {/* Dot */}
                      <div className="relative z-10 mt-1.5 w-4 h-4 rounded-full border-2 border-brand-sand bg-brand-cream group-hover:border-brand-terracotta transition-colors duration-300 flex-shrink-0" />

                      {/* Content */}
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2.5">
                            {event.workshopId ? (
                              <Link
                                to={`/workshops/${event.workshopId}`}
                                className="font-heading text-base font-bold text-brand-charcoal hover:text-brand-terracotta transition-colors duration-300"
                              >
                                {event.title}
                              </Link>
                            ) : (
                              <span className="font-heading text-base font-bold text-brand-charcoal">
                                {event.title}
                              </span>
                            )}
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
                          {event.date}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Upcoming */}
          {upcomingWorkshops.length > 0 && (
            <div className="mb-16">
              <h2 className="font-heading text-2xl font-bold text-brand-charcoal mb-6">
                Upcoming Workshops
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
