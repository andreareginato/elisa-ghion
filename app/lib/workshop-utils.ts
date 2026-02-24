export type Testimonial = {
  quote: string;
  name: string;
  year: string;
};

export type Workshop = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  highlights: string[];
  /** ISO date string for sorting and auto-status (e.g. "2026-03-15") */
  startDate: string;
  /** ISO date string for multi-day events (e.g. "2026-03-16") */
  endDate?: string;
  /** Human-readable date display (e.g. "March 15–16, 2026") */
  dates: string;
  location: string;
  externalUrl: string;
  image: string;
  format: "weekend" | "intensive" | "weekly" | "jam" | "performance";
  /** For weekly classes: recurring schedule (e.g. "Tuesday, 19:00–21:00") */
  schedule?: string;
  /** For weekly classes: season period (e.g. "October 2025 – June 2026") */
  period?: string;
  testimonials?: Testimonial[];
};

/** Compute status from dates — no manual flag needed */
export function isUpcoming(workshop: Workshop): boolean {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const compareDate = workshop.endDate
    ? new Date(workshop.endDate)
    : new Date(workshop.startDate);
  return compareDate >= now;
}

/** Get upcoming events sorted by start date */
export function getUpcoming(items: Workshop[]): Workshop[] {
  return items.filter(isUpcoming).sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
}

/** Get past events sorted by start date descending (most recent first) */
export function getPast(items: Workshop[]): Workshop[] {
  return items.filter((w) => !isUpcoming(w)).sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
}

/** Format badge config per format type */
export const formatConfig: Record<
  Workshop["format"],
  { bg: string; text: string; label: string }
> = {
  weekend: { bg: "bg-brand-terracotta/10", text: "text-brand-terracotta", label: "Workshop" },
  intensive: { bg: "bg-brand-coral/10", text: "text-brand-coral", label: "Intensive" },
  weekly: { bg: "bg-brand-gold/15", text: "text-brand-gold", label: "Weekly Class" },
  jam: { bg: "bg-brand-gold/15", text: "text-brand-gold", label: "Jam" },
  performance: { bg: "bg-brand-rose/10", text: "text-brand-rose", label: "Performance" },
};
