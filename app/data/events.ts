export type CalendarEvent = {
  title: string;
  type: "workshop" | "jam" | "performance";
  date: string;
  location: string;
  workshopId?: string;
};

export const calendarEvents: CalendarEvent[] = [
  {
    title: "Foundations of Contact Improvisation",
    type: "workshop",
    date: "March 15–16, 2026",
    location: "Studio Sospeso, Milan",
    workshopId: "fundamentals-spring",
  },
  {
    title: "Open Jam — Spring Edition",
    type: "jam",
    date: "March 28, 2026",
    location: "Spazio Agorà, Rome",
  },
  {
    title: "Fluid Bodies",
    type: "workshop",
    date: "April 5–6, 2026",
    location: "Spazio Agorà, Rome",
    workshopId: "fluid-bodies",
  },
  {
    title: "CI Duet — Teatro della Limonaia",
    type: "performance",
    date: "May 10, 2026",
    location: "Teatro della Limonaia, Florence",
  },
  {
    title: "Open Jam — Summer Kickoff",
    type: "jam",
    date: "June 21, 2026",
    location: "Parco Sempione, Milan",
  },
  {
    title: "Summer Contact Lab",
    type: "workshop",
    date: "July 7–11, 2026",
    location: "Podere Il Leccio, Tuscany",
    workshopId: "summer-intensive",
  },
  {
    title: "Gravity & Play",
    type: "workshop",
    date: "September 20–21, 2026",
    location: "Centro Danza, Bologna",
    workshopId: "gravity-play",
  },
  {
    title: "Autumn Jam",
    type: "jam",
    date: "October 11, 2026",
    location: "Studio Sospeso, Milan",
  },
];
