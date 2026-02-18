export type Video = {
  title: string;
  description: string;
  embedUrl: string;
  thumbnail: string;
  category: "performance" | "workshop" | "interview";
};

export const videos: Video[] = [
  {
    title: "Fluid Bodies — Performance Excerpt",
    description:
      "An excerpt from the Fluid Bodies performance at Teatro della Limonaia, Florence. Exploring the dialogue between two bodies in constant motion.",
    embedUrl: "https://www.instagram.com/reel/PLACEHOLDER1/embed/",
    thumbnail: "/images/gallery-1.jpg",
    category: "performance",
  },
  {
    title: "Contact Improvisation Fundamentals",
    description:
      "A short introduction to the core principles of contact improvisation — rolling point of contact, shared weight, and listening through touch.",
    embedUrl: "https://www.instagram.com/reel/PLACEHOLDER2/embed/",
    thumbnail: "/images/gallery-5.jpg",
    category: "workshop",
  },
  {
    title: "Summer Contact Lab 2025 — Highlights",
    description:
      "Highlights from our five-day immersive residency in the Tuscan countryside. Community, movement, and nature.",
    embedUrl: "https://www.instagram.com/reel/PLACEHOLDER3/embed/",
    thumbnail: "/images/gallery-8.jpg",
    category: "workshop",
  },
  {
    title: "On Teaching Contact Improvisation",
    description:
      "A conversation about pedagogy, consent, and the evolving landscape of CI teaching in Europe.",
    embedUrl: "https://www.instagram.com/reel/PLACEHOLDER4/embed/",
    thumbnail: "/images/gallery-3.jpg",
    category: "interview",
  },
];
