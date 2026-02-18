export type Collaboration = {
  name: string;
  description: string;
  initials: string;
  website: string;
  category: "festival" | "organization" | "school";
  image: string;
};

export const collaborations: Collaboration[] = [
  {
    name: "Contact Festival Freiburg",
    description:
      "Annual international contact improvisation festival in Germany bringing together over 300 dancers for a week of classes, jams, and performances.",
    initials: "CF",
    website: "https://example.com/contact-festival-freiburg",
    category: "festival",
    image: "/images/gallery-1.jpg",
  },
  {
    name: "Underscore Italia",
    description:
      "Italian network dedicated to Nancy Stark Smith's Underscore practice, hosting regular sessions and retreats across the country.",
    initials: "UI",
    website: "https://example.com/underscore-italia",
    category: "organization",
    image: "/images/gallery-3.jpg",
  },
  {
    name: "CI Global Jam",
    description:
      "Worldwide contact improvisation jam network connecting dancers across continents through weekly open practice sessions.",
    initials: "CG",
    website: "https://example.com/ci-global-jam",
    category: "organization",
    image: "/images/gallery-6.jpg",
  },
  {
    name: "Tanzfabrik Berlin",
    description:
      "One of Berlin's leading independent dance centers, offering residencies, workshops, and performance programs in contemporary and contact dance.",
    initials: "TB",
    website: "https://example.com/tanzfabrik",
    category: "school",
    image: "/images/gallery-5.jpg",
  },
  {
    name: "Earthdance",
    description:
      "Retreat center in Massachusetts, USA dedicated to contact improvisation and movement arts, hosting international festivals and residencies.",
    initials: "ED",
    website: "https://example.com/earthdance",
    category: "organization",
    image: "/images/gallery-8.jpg",
  },
  {
    name: "Festival Contatto",
    description:
      "Italian contact improvisation festival held annually in Tuscany, featuring workshops, performances, and extended jam sessions.",
    initials: "FC",
    website: "https://example.com/festival-contatto",
    category: "festival",
    image: "/images/gallery-2.jpg",
  },
  {
    name: "Impulstanz Vienna",
    description:
      "One of Europe's largest contemporary dance festivals, offering a rich program of workshops, performances, and research projects.",
    initials: "IV",
    website: "https://example.com/impulstanz",
    category: "festival",
    image: "/images/gallery-7.jpg",
  },
  {
    name: "Scuola di Movimento",
    description:
      "Milan-based movement school integrating contact improvisation, somatics, and contemporary dance in ongoing training programs.",
    initials: "SM",
    website: "https://example.com/scuola-movimento",
    category: "school",
    image: "/images/gallery-4.jpg",
  },
];
