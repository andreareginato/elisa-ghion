var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// scripts/seed.ts
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

// app/db/schema.ts
var schema_exports = {};
__export(schema_exports, {
  collaborations: () => collaborations,
  galleryItems: () => galleryItems,
  researchAreas: () => researchAreas,
  siteSettings: () => siteSettings,
  testimonials: () => testimonials,
  videos: () => videos,
  workshops: () => workshops
});
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
var workshops = sqliteTable("workshops", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description").notNull(),
  highlights: text("highlights", { mode: "json" }).notNull().$type(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  dates: text("dates").notNull(),
  location: text("location").notNull(),
  externalUrl: text("external_url").notNull().default(""),
  image: text("image").notNull(),
  format: text("format").notNull().$type(),
  schedule: text("schedule"),
  period: text("period"),
  sortOrder: integer("sort_order").notNull().default(0)
});
var testimonials = sqliteTable("testimonials", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  workshopId: text("workshop_id").notNull().references(() => workshops.id, { onDelete: "cascade" }),
  quote: text("quote").notNull(),
  name: text("name").notNull(),
  year: text("year").notNull()
});
var galleryItems = sqliteTable("gallery_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  src: text("src").notNull(),
  alt: text("alt").notNull(),
  caption: text("caption").notNull(),
  category: text("category").notNull().$type(),
  span: text("span").notNull(),
  sortOrder: integer("sort_order").notNull().default(0)
});
var collaborations = sqliteTable("collaborations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  initials: text("initials").notNull(),
  website: text("website").notNull(),
  category: text("category").notNull().$type(),
  image: text("image").notNull(),
  sortOrder: integer("sort_order").notNull().default(0)
});
var researchAreas = sqliteTable("research_areas", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  question: text("question").notNull(),
  description: text("description").notNull(),
  quote: text("quote").notNull(),
  influences: text("influences", { mode: "json" }).notNull().$type(),
  relatedWorkshops: text("related_workshops", { mode: "json" }).notNull().$type(),
  image: text("image").notNull(),
  sortOrder: integer("sort_order").notNull().default(0)
});
var siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull().default("")
});
var videos = sqliteTable("videos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  embedUrl: text("embed_url").notNull(),
  thumbnail: text("thumbnail").notNull(),
  category: text("category").notNull().$type(),
  sortOrder: integer("sort_order").notNull().default(0)
});

// app/data/workshops.ts
var workshops2 = [
  // ── Weekly Classes ───────────────────────────────────────
  {
    id: "weekly-ci-milan",
    title: "Contact Improvisation Open Class",
    subtitle: "Weekly practice in Milan",
    description: "A welcoming weekly class open to all levels. Each session combines a guided warm-up, technique exploration, and open dancing. A consistent practice to deepen your CI journey throughout the season.",
    longDescription: `This weekly class is the heart of our Milan CI community \u2014 a regular space to practice, explore, and grow together throughout the season.

Each session follows a simple arc: we begin with a somatic warm-up to arrive in the body, move into guided scores and technique exploration around a weekly theme, and close with open dancing where you can integrate what you've discovered.

Themes rotate throughout the season \u2014 from grounding and floor work to partnering, lifts, and composition \u2014 so the class stays fresh even for regular participants. Newcomers are always welcome; each session is designed to be accessible while offering depth for experienced movers.

No registration required \u2014 just show up. Drop-in and season passes available.`,
    highlights: [
      "Level: Open to all \u2014 beginners welcome",
      "Drop-in or season pass available",
      "Themes rotate weekly",
      "Language: Italian with English support",
      "What to bring: Comfortable clothes, water bottle"
    ],
    startDate: "2025-10-07",
    endDate: "2026-06-30",
    dates: "",
    schedule: "Tuesday, 19:00\u201321:00",
    period: "October 2025 \u2013 June 2026",
    location: "Studio Sospeso, Milan",
    externalUrl: "https://example.com/classes/weekly-milan",
    image: "/images/gallery-8.jpg",
    format: "weekly",
    testimonials: [
      {
        quote: "The Tuesday class has become the highlight of my week. I love how the themes evolve across the season.",
        name: "Carla N.",
        year: "2025"
      }
    ]
  },
  {
    id: "weekly-ci-bologna",
    title: "Contact Improvisation Open Class",
    subtitle: "Weekly practice in Bologna",
    description: "A weekly CI class in Bologna for all levels. Guided warm-ups, partnering scores, and open practice in a warm and inclusive atmosphere.",
    longDescription: `Our Bologna weekly class offers a regular space to explore contact improvisation in a supportive and inclusive environment.

Each session includes a somatic warm-up, guided partnering scores, and open practice time. The class follows a seasonal arc with themes that deepen progressively, while remaining accessible to newcomers at any point.

The Bologna community is vibrant and welcoming \u2014 many long-term friendships and dance partnerships have formed through this class. Come join us!`,
    highlights: [
      "Level: Open to all",
      "Drop-in or season pass available",
      "Language: Italian with English support",
      "What to bring: Comfortable clothes, water bottle"
    ],
    startDate: "2025-10-09",
    endDate: "2026-06-30",
    dates: "",
    schedule: "Thursday, 19:30\u201321:30",
    period: "October 2025 \u2013 June 2026",
    location: "Centro Danza, Bologna",
    externalUrl: "https://example.com/classes/weekly-bologna",
    image: "/images/gallery-10.jpg",
    format: "weekly"
  },
  // ── Workshops ──────────────────────────────────────────
  {
    id: "fundamentals-spring",
    title: "Foundations of Contact Improvisation",
    subtitle: "A weekend intensive for beginners",
    description: "Explore the fundamental principles of contact improvisation: sharing weight, rolling point of contact, and the art of listening through touch. This weekend intensive is designed for those new to CI or wanting to revisit the basics with fresh eyes. We will work with gravity, momentum, and the floor as our primary teachers.",
    longDescription: `This weekend intensive invites you into the rich, playful world of contact improvisation \u2014 a movement practice rooted in listening, trust, and shared weight.

Over two full days we will build a strong foundation in the core principles of CI: finding and following a rolling point of contact, giving and receiving weight, and cultivating a deep sensitivity to gravity and momentum. The floor is our first partner \u2014 we will spend time exploring how to fall safely, roll efficiently, and move with ease close to the ground before expanding into standing duets.

Each session combines guided warm-ups, structured scores, open exploration, and reflection circles. You will leave with tools you can bring to any jam or practice group, and a felt understanding of how contact improvisation differs from other dance forms.

No prior dance experience is required \u2014 only curiosity and a willingness to explore. Wear comfortable clothing you can move freely in, and bring water and a journal if you like.`,
    highlights: [
      "Level: Open to all \u2014 no experience needed",
      "Schedule: Saturday & Sunday, 10:00\u201317:00 (lunch break 13:00\u201314:30)",
      "What to bring: Comfortable clothes, water bottle, notebook",
      "Language: Italian with English support",
      "Max participants: 20"
    ],
    startDate: "2026-03-15",
    endDate: "2026-03-16",
    dates: "March 15\u201316, 2026",
    location: "Studio Sospeso, Milan",
    externalUrl: "https://example.com/workshops/fundamentals-spring",
    image: "/images/gallery-1.jpg",
    format: "weekend",
    testimonials: [
      {
        quote: "Elisa creates such a safe and welcoming space. I had never done CI before and by Sunday afternoon I felt like I'd discovered a new language.",
        name: "Marco T.",
        year: "2025"
      },
      {
        quote: "The way she explains weight sharing is so intuitive. I finally understood what 'listening through touch' means.",
        name: "Anna K.",
        year: "2025"
      }
    ]
  },
  {
    id: "fluid-bodies",
    title: "Fluid Bodies",
    subtitle: "Advanced flow and partnering techniques",
    description: "Dive deeper into the fluid dynamics of contact improvisation. This workshop focuses on seamless transitions, aerial moments, and the cultivation of a continuous dance dialogue. Suitable for practitioners with at least one year of regular CI practice. We will explore how water-like movement qualities can transform our partnering.",
    longDescription: `Fluid Bodies is a weekend laboratory for experienced movers who want to deepen their contact improvisation practice beyond the fundamentals.

We will investigate how the principles of fluid dynamics \u2014 flow, turbulence, viscosity, and wave motion \u2014 can inform the way we move with another body. Through somatic explorations and partnering scores, we will cultivate seamless transitions between the floor, standing work, and brief aerial moments.

A central theme of this workshop is the idea of "continuous dance dialogue" \u2014 learning to sustain an unbroken conversation of weight, momentum, and intention with your partner, even through moments of disorientation or surprise. We will work with eyes closed, in trios, and in the full group to expand our relational field.

This workshop is suited for practitioners with at least one year of regular CI practice or equivalent movement experience (contemporary dance, martial arts, somatic practices).`,
    highlights: [
      "Level: Intermediate to advanced (1+ year CI experience)",
      "Schedule: Saturday & Sunday, 10:00\u201318:00",
      "Focus: Seamless transitions, aerial moments, continuous dialogue",
      "Language: Italian and English",
      "Max participants: 16"
    ],
    startDate: "2026-04-05",
    endDate: "2026-04-06",
    dates: "April 5\u20136, 2026",
    location: "Spazio Agor\xE0, Rome",
    externalUrl: "https://example.com/workshops/fluid-bodies",
    image: "/images/gallery-3.jpg",
    format: "weekend",
    testimonials: [
      {
        quote: "This workshop completely changed how I approach partnering. The fluid dynamics metaphor opened up so many new possibilities.",
        name: "Lucia M.",
        year: "2025"
      },
      {
        quote: "Elisa's ability to guide advanced material while keeping the atmosphere playful is remarkable.",
        name: "Stefan R.",
        year: "2024"
      },
      {
        quote: "I came back to my local jam and people immediately noticed something had shifted in my dancing.",
        name: "Francesca B.",
        year: "2025"
      }
    ]
  },
  {
    id: "summer-intensive",
    title: "Summer Contact Lab",
    subtitle: "Five-day immersive residency",
    description: "An immersive five-day laboratory bringing together contact improvisation, somatics, and composition. Mornings are dedicated to technique and scores, afternoons to open practice and creative research. Evenings feature sharing circles and jam sessions. Open to all levels with some movement experience.",
    longDescription: `Escape the city and immerse yourself in five days of movement, nature, and community at our annual Summer Contact Lab in the Tuscan countryside.

Each morning begins with a somatic warm-up \u2014 breath work, body scanning, and gentle mobilization \u2014 before moving into structured contact improvisation technique classes. We explore themes that build across the week: from grounding and solo movement on Monday, through partnering and weight sharing mid-week, to composition and performance scores by Friday.

Afternoons are dedicated to open practice, one-on-one exchanges, and creative research. The beautiful outdoor spaces of Podere Il Leccio \u2014 a restored farmhouse surrounded by olive groves and rolling hills \u2014 become our studio.

Evenings bring the group together for sharing circles, discussions on CI philosophy and ethics, and extended jam sessions under the stars. Meals are vegetarian, locally sourced, and shared communally.

This residency is open to all levels with some movement experience. Beginners with a strong interest in somatics or dance are warmly welcome alongside experienced practitioners.`,
    highlights: [
      "Level: All levels with some movement experience",
      "Schedule: Monday\u2013Friday, full days (morning class, afternoon lab, evening jam)",
      "Accommodation: Shared rooms at Podere Il Leccio (included in fee)",
      "Meals: Vegetarian, locally sourced, communal",
      "What to bring: Layers for outdoor practice, sunscreen, journal",
      "Max participants: 24"
    ],
    startDate: "2026-07-07",
    endDate: "2026-07-11",
    dates: "July 7\u201311, 2026",
    location: "Podere Il Leccio, Tuscany",
    externalUrl: "https://example.com/workshops/summer-intensive",
    image: "/images/gallery-5.jpg",
    format: "intensive",
    testimonials: [
      {
        quote: "Five days in Tuscany dancing under the stars \u2014 it was transformative. The community that forms during the lab is something special.",
        name: "Elena V.",
        year: "2025"
      },
      {
        quote: "The balance of structure and freedom is perfect. Mornings gave me new tools, afternoons let me integrate them.",
        name: "Thomas W.",
        year: "2024"
      }
    ]
  },
  {
    id: "gravity-play",
    title: "Gravity & Play",
    subtitle: "Contact improvisation meets acrobatics",
    description: "A playful exploration of lifts, counterbalances, and dynamic weight sharing. Drawing from both contact improvisation and partner acrobatics, this workshop invites you to find ease in the air and grounding in flight. We emphasize safety, consent, and progressive skill building.",
    longDescription: `What happens when contact improvisation meets the world of partner acrobatics? Gravity & Play is a weekend of joyful, athletic exploration at the intersection of these two practices.

We begin each session with thorough conditioning and preparation \u2014 building the strength, proprioception, and trust needed for dynamic weight sharing. From there, we progress through a carefully scaffolded sequence: counterbalances, low lifts, surfing, and eventually more adventurous aerial exchanges.

Safety and consent are at the heart of this workshop. Every exercise is offered with clear progressions and alternatives, and you are always empowered to choose your own level of engagement. We practice saying "yes," "no," and "not yet" with clarity and respect.

While the work is physical and sometimes challenging, the spirit is playful. We use games, scores, and improvisation to discover lifts and flights organically, rather than drilling fixed sequences. The goal is not to perform tricks, but to expand the vocabulary of your contact dance with confidence and ease.

Some prior CI or movement experience is recommended, but acrobatic experience is not required.`,
    highlights: [
      "Level: Intermediate (some CI or movement experience recommended)",
      "Schedule: Saturday & Sunday, 10:00\u201317:30",
      "Focus: Lifts, counterbalances, dynamic weight sharing",
      "Safety: Progressive skill building with clear consent practices",
      "What to bring: Comfortable athletic clothing, knee pads optional",
      "Max participants: 18"
    ],
    startDate: "2026-09-20",
    endDate: "2026-09-21",
    dates: "September 20\u201321, 2026",
    location: "Centro Danza, Bologna",
    externalUrl: "https://example.com/workshops/gravity-play",
    image: "/images/gallery-2.jpg",
    format: "weekend",
    testimonials: [
      {
        quote: "I was terrified of lifts before this workshop. Elisa's progressive approach made me feel safe to explore.",
        name: "Giulia P.",
        year: "2025"
      },
      {
        quote: "The emphasis on consent and communication was as valuable as the physical skills. A model for how CI should be taught.",
        name: "David L.",
        year: "2024"
      },
      {
        quote: "So much fun! I left with sore muscles and a huge smile.",
        name: "Marta S.",
        year: "2025"
      }
    ]
  },
  // ── Jams & Performances ────────────────────────────────
  {
    id: "jam-spring-2026",
    title: "Open Jam \u2014 Spring Edition",
    subtitle: "Free-form contact improvisation jam",
    description: "An open jam session for the CI community. No teaching, no structure \u2014 just music, space, and the invitation to dance. All levels welcome.",
    longDescription: `Our seasonal open jams are a cornerstone of the CI community \u2014 a space to practice freely, meet new dance partners, and enjoy the simple pleasure of moving together.

There is no teaching or structure: the space opens, music plays softly, and you are invited to dance however you feel called. Come alone or with friends, dance for an hour or the whole evening, rest when you need to.

All levels welcome. If you're new to CI, jams are a wonderful place to observe, begin with small dances, and connect with the community.`,
    highlights: [
      "Level: Open to all",
      "No registration needed",
      "Bring: Water, comfortable clothes"
    ],
    startDate: "2026-03-28",
    dates: "March 28, 2026",
    location: "Spazio Agor\xE0, Rome",
    externalUrl: "",
    image: "/images/gallery-11.jpg",
    format: "jam"
  },
  {
    id: "performance-teatro-2026",
    title: "CI Duet \u2014 Teatro della Limonaia",
    subtitle: "Contact improvisation performance",
    description: "A live contact improvisation duet performance exploring the themes of gravity, trust, and conversation through movement. Performed with musician Marco Ferretti.",
    longDescription: `An evening of live contact improvisation at Teatro della Limonaia in Florence.

Elisa performs a duet with dancer and long-time collaborator Paolo Ventura, accompanied by live electronic music from Marco Ferretti. The piece explores the tension between structure and freedom \u2014 how two bodies can compose in real time, creating a performance that is unrepeatable and fully present.

The evening includes a post-show conversation with the artists about the creative process and the philosophy behind contact improvisation as a performing art.`,
    highlights: [
      "Doors open: 20:00",
      "Performance: 20:30",
      "Post-show conversation: 21:30",
      "With: Paolo Ventura (dance), Marco Ferretti (live music)"
    ],
    startDate: "2026-05-10",
    dates: "May 10, 2026",
    location: "Teatro della Limonaia, Florence",
    externalUrl: "",
    image: "/images/gallery-12.jpg",
    format: "performance"
  },
  {
    id: "jam-summer-2026",
    title: "Open Jam \u2014 Summer Kickoff",
    subtitle: "Outdoor jam in the park",
    description: "A special outdoor jam to celebrate the start of summer. Dancing on grass, under the trees, with the sky as our ceiling.",
    longDescription: `Our Summer Kickoff jam moves outdoors to Parco Sempione \u2014 a beloved tradition to mark the transition from studio season to summer adventures.

Bring a blanket, sunscreen, and your dancing spirit. We'll set up a soft area on the grass and dance together as the sun sets over Milan. All levels and non-dancers welcome \u2014 this is a community celebration.`,
    highlights: [
      "Level: Open to all",
      "Outdoor event \u2014 weather permitting",
      "Bring: Blanket, sunscreen, water"
    ],
    startDate: "2026-06-21",
    dates: "June 21, 2026",
    location: "Parco Sempione, Milan",
    externalUrl: "",
    image: "/images/gallery-13.jpg",
    format: "jam"
  },
  {
    id: "jam-autumn-2026",
    title: "Autumn Jam",
    subtitle: "Season opening jam",
    description: "The first jam of the new season \u2014 a warm welcome back to the studio after summer. Reconnect with the community and set intentions for the year ahead.",
    longDescription: `The Autumn Jam marks the beginning of a new CI season in Milan. After the summer break, we gather to reconnect, share stories, and dance together.

The evening begins with a brief opening circle to welcome new and returning members, followed by three hours of open dancing. A perfect way to ease back into practice and meet the community.`,
    highlights: [
      "Level: Open to all",
      "Opening circle: 19:00",
      "Open jam: 19:30\u201322:00"
    ],
    startDate: "2026-10-11",
    dates: "October 11, 2026",
    location: "Studio Sospeso, Milan",
    externalUrl: "",
    image: "/images/gallery-14.jpg",
    format: "jam"
  },
  // ── Past ──────────────────────────────────────────────────
  {
    id: "roots-and-wings-2025",
    title: "Roots & Wings",
    subtitle: "Grounding and flight in CI",
    description: "A weekend exploring the polarity of grounding and flight in contact improvisation. Working with the floor as foundation and the air as invitation, we investigated how rootedness enables freedom.",
    longDescription: `Roots & Wings was a weekend intensive dedicated to the interplay between earthiness and airiness in contact improvisation.

We spent the first day deepening our relationship with the floor \u2014 exploring rolling, sliding, and spiraling close to the ground. Through somatic exercises we cultivated a sense of rootedness: feeling the weight of the skeleton, the support of the earth, and the stability that comes from surrendering to gravity.

On the second day we turned our attention upward \u2014 investigating how a strong ground connection enables moments of flight, suspension, and effortless partnering. We explored small lifts, jumps, and aerial pathways that emerge organically from grounded partnering.

The workshop concluded with a long open jam where participants could integrate both qualities freely.`,
    highlights: [
      "Level: All levels",
      "Schedule: Saturday & Sunday, 10:00\u201317:00",
      "Focus: Grounding, floor work, and aerial exploration",
      "Language: Italian and English",
      "Max participants: 20"
    ],
    startDate: "2025-11-08",
    endDate: "2025-11-09",
    dates: "November 8\u20139, 2025",
    location: "Studio Sospeso, Milan",
    externalUrl: "https://example.com/workshops/roots-and-wings-2025",
    image: "/images/gallery-7.jpg",
    format: "weekend",
    testimonials: [
      {
        quote: "The arc from floor work to flight felt so natural. By Sunday I was doing things I never thought possible.",
        name: "Roberto C.",
        year: "2025"
      },
      {
        quote: "Elisa has a gift for making complex concepts feel accessible and embodied.",
        name: "Sarah H.",
        year: "2025"
      }
    ]
  },
  {
    id: "summer-contact-lab-2025",
    title: "Summer Contact Lab 2025",
    subtitle: "Five-day immersive residency",
    description: "Our annual summer residency in the Tuscan countryside. Five days of movement, nature, and community, blending contact improvisation, somatics, and composition.",
    longDescription: `The 2025 edition of the Summer Contact Lab brought together 22 dancers from across Europe for five days of intensive practice at Podere Il Leccio.

This year's edition focused on the theme of "Landscape as Partner" \u2014 using the natural environment as a co-creator in our movement research. Sessions took place in olive groves, on hillsides, and under the canopy of ancient oaks.

Morning classes explored how terrain, wind, and sunlight can inform our movement choices. Afternoon labs were dedicated to site-specific scores and creative projects. Evening jams under the stars became a beloved ritual.

The community that formed during these five days continues to practice together across cities and countries.`,
    highlights: [
      "Level: All levels with some movement experience",
      "Schedule: Monday\u2013Friday, full days",
      "Accommodation: Shared rooms (included)",
      "Meals: Vegetarian, locally sourced",
      "Participants: 22 dancers from 8 countries"
    ],
    startDate: "2025-07-07",
    endDate: "2025-07-11",
    dates: "July 7\u201311, 2025",
    location: "Podere Il Leccio, Tuscany",
    externalUrl: "https://example.com/workshops/summer-lab-2025",
    image: "/images/gallery-6.jpg",
    format: "intensive",
    testimonials: [
      {
        quote: "Dancing outdoors in Tuscany changed my relationship with space and environment forever.",
        name: "Nina F.",
        year: "2025"
      },
      {
        quote: "The 'Landscape as Partner' theme was brilliant. I still use those scores in my own teaching.",
        name: "Alex M.",
        year: "2025"
      }
    ]
  },
  {
    id: "listening-touch-2024",
    title: "The Listening Touch",
    subtitle: "Somatic approaches to CI",
    description: "A weekend integrating somatic practices \u2014 body-mind centering, Feldenkrais, and breath work \u2014 into contact improvisation. We explored how deepening inner listening transforms our capacity for relational movement.",
    longDescription: `The Listening Touch was a weekend of slow, deep practice at the intersection of somatics and contact improvisation.

We began each session with extended somatic explorations \u2014 body scanning, breath work, and Feldenkrais-inspired movement lessons \u2014 to sensitize the nervous system and cultivate fine-grained proprioception.

From this heightened state of inner listening, we moved into contact improvisation duets, trios, and group scores. The quality of touch and attention was remarkably different from our everyday practice \u2014 more nuanced, more responsive, more alive.

Participants described the experience as "dancing in high definition" \u2014 a level of sensitivity and presence that continued to inform their practice long after the workshop ended.`,
    highlights: [
      "Level: All levels",
      "Schedule: Saturday & Sunday, 10:00\u201317:00",
      "Focus: Somatics, proprioception, and relational awareness",
      "Language: Italian with English support",
      "Max participants: 18"
    ],
    startDate: "2024-10-12",
    endDate: "2024-10-13",
    dates: "October 12\u201313, 2024",
    location: "Spazio Agor\xE0, Rome",
    externalUrl: "https://example.com/workshops/listening-touch-2024",
    image: "/images/gallery-4.jpg",
    format: "weekend",
    testimonials: [
      {
        quote: "This workshop refined my sense of touch in ways I didn't know were possible. Pure magic.",
        name: "Chiara D.",
        year: "2024"
      },
      {
        quote: "The somatic warm-ups alone were worth the trip. I now use them every day in my own practice.",
        name: "James B.",
        year: "2024"
      },
      {
        quote: "'Dancing in high definition' \u2014 that's exactly what it felt like.",
        name: "Valentina R.",
        year: "2024"
      }
    ]
  },
  {
    id: "contact-composition-2024",
    title: "Contact & Composition",
    subtitle: "From improvisation to performance",
    description: "How do we move from open improvisation to composed performance without losing the spontaneity and authenticity of CI? This workshop explored the fertile territory between improvisation and choreography.",
    longDescription: `Contact & Composition was a weekend laboratory exploring the creative territory between free improvisation and structured performance.

We investigated a range of compositional tools \u2014 spatial awareness, timing, repetition, contrast, and narrative arc \u2014 and applied them to contact improvisation duets and group scores.

Through a series of guided exercises and creative tasks, participants discovered how compositional awareness can enhance rather than constrain the improvisational encounter. We worked toward short performance sketches that were shared in a closing showing for friends and family.

The workshop was co-taught with composer Maria Silvestri, who provided live musical accompaniment throughout and led sessions on the relationship between sound and movement.`,
    highlights: [
      "Level: Intermediate to advanced",
      "Schedule: Saturday & Sunday, 10:00\u201318:00",
      "Focus: Composition, performance, and musicality",
      "Co-teacher: Maria Silvestri (live music)",
      "Closing showing: Sunday evening",
      "Max participants: 16"
    ],
    startDate: "2024-05-18",
    endDate: "2024-05-19",
    dates: "May 18\u201319, 2024",
    location: "Centro Danza, Bologna",
    externalUrl: "https://example.com/workshops/contact-composition-2024",
    image: "/images/gallery-9.jpg",
    format: "weekend",
    testimonials: [
      {
        quote: "Having live music transformed the entire experience. The dialogue between movement and sound was exquisite.",
        name: "Paolo G.",
        year: "2024"
      },
      {
        quote: "I finally understand how to bring compositional thinking into my improvisations without losing authenticity.",
        name: "Lisa W.",
        year: "2024"
      }
    ]
  }
];

// app/data/gallery.ts
var galleryItems2 = [
  {
    src: "/images/gallery-1.jpg",
    alt: "Dancer in motion",
    caption: "The art of falling",
    category: "performances",
    span: "md:col-span-2 md:row-span-2"
  },
  {
    src: "/images/gallery-2.jpg",
    alt: "Contact improvisation duet",
    caption: "Shared weight",
    category: "jams",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    src: "/images/gallery-3.jpg",
    alt: "Workshop moment",
    caption: "Listening through touch",
    category: "workshops",
    span: "md:col-span-1 md:row-span-2"
  },
  {
    src: "/images/gallery-4.jpg",
    alt: "Movement exploration",
    caption: "Floor work",
    category: "workshops",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    src: "/images/gallery-5.jpg",
    alt: "Dance performance",
    caption: "In dialogue with gravity",
    category: "performances",
    span: "md:col-span-2 md:row-span-1"
  },
  {
    src: "/images/gallery-6.jpg",
    alt: "Group improvisation",
    caption: "Community practice",
    category: "jams",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    src: "/images/gallery-7.jpg",
    alt: "Spiraling into contact",
    caption: "Spirals and curves",
    category: "performances",
    span: "md:col-span-1 md:row-span-2"
  },
  {
    src: "/images/gallery-8.jpg",
    alt: "Partner weight sharing",
    caption: "Trust in motion",
    category: "workshops",
    span: "md:col-span-2 md:row-span-1"
  },
  {
    src: "/images/gallery-9.jpg",
    alt: "Solo movement practice",
    caption: "Finding stillness",
    category: "portraits",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    src: "/images/gallery-10.jpg",
    alt: "Elisa teaching a workshop",
    caption: "Guiding awareness",
    category: "workshops",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    src: "/images/gallery-11.jpg",
    alt: "Evening jam session",
    caption: "Dancing into dusk",
    category: "jams",
    span: "md:col-span-2 md:row-span-1"
  },
  {
    src: "/images/gallery-12.jpg",
    alt: "Elisa portrait in studio",
    caption: "Between movements",
    category: "portraits",
    span: "md:col-span-1 md:row-span-2"
  },
  {
    src: "/images/gallery-13.jpg",
    alt: "Outdoor performance",
    caption: "Earth and sky",
    category: "performances",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    src: "/images/gallery-14.jpg",
    alt: "Workshop closing circle",
    caption: "Closing the circle",
    category: "workshops",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    src: "/images/gallery-15.jpg",
    alt: "Portrait in natural light",
    caption: "Presence",
    category: "portraits",
    span: "md:col-span-2 md:row-span-1"
  }
];

// app/data/videos.ts
var videos2 = [
  {
    title: "Fluid Bodies \u2014 Performance Excerpt",
    description: "An excerpt from the Fluid Bodies performance at Teatro della Limonaia, Florence. Exploring the dialogue between two bodies in constant motion.",
    embedUrl: "https://www.instagram.com/reel/PLACEHOLDER1/embed/",
    thumbnail: "/images/gallery-1.jpg",
    category: "performance"
  },
  {
    title: "Contact Improvisation Fundamentals",
    description: "A short introduction to the core principles of contact improvisation \u2014 rolling point of contact, shared weight, and listening through touch.",
    embedUrl: "https://www.instagram.com/reel/PLACEHOLDER2/embed/",
    thumbnail: "/images/gallery-5.jpg",
    category: "workshop"
  },
  {
    title: "Summer Contact Lab 2025 \u2014 Highlights",
    description: "Highlights from our five-day immersive residency in the Tuscan countryside. Community, movement, and nature.",
    embedUrl: "https://www.instagram.com/reel/PLACEHOLDER3/embed/",
    thumbnail: "/images/gallery-8.jpg",
    category: "workshop"
  },
  {
    title: "On Teaching Contact Improvisation",
    description: "A conversation about pedagogy, consent, and the evolving landscape of CI teaching in Europe.",
    embedUrl: "https://www.instagram.com/reel/PLACEHOLDER4/embed/",
    thumbnail: "/images/gallery-3.jpg",
    category: "interview"
  }
];

// app/data/collaborations.ts
var collaborations2 = [
  {
    name: "Contact Festival Freiburg",
    description: "Annual international contact improvisation festival in Germany bringing together over 300 dancers for a week of classes, jams, and performances.",
    initials: "CF",
    website: "https://example.com/contact-festival-freiburg",
    category: "festival",
    image: "/images/gallery-1.jpg"
  },
  {
    name: "Underscore Italia",
    description: "Italian network dedicated to Nancy Stark Smith's Underscore practice, hosting regular sessions and retreats across the country.",
    initials: "UI",
    website: "https://example.com/underscore-italia",
    category: "organization",
    image: "/images/gallery-3.jpg"
  },
  {
    name: "CI Global Jam",
    description: "Worldwide contact improvisation jam network connecting dancers across continents through weekly open practice sessions.",
    initials: "CG",
    website: "https://example.com/ci-global-jam",
    category: "organization",
    image: "/images/gallery-6.jpg"
  },
  {
    name: "Tanzfabrik Berlin",
    description: "One of Berlin's leading independent dance centers, offering residencies, workshops, and performance programs in contemporary and contact dance.",
    initials: "TB",
    website: "https://example.com/tanzfabrik",
    category: "school",
    image: "/images/gallery-5.jpg"
  },
  {
    name: "Earthdance",
    description: "Retreat center in Massachusetts, USA dedicated to contact improvisation and movement arts, hosting international festivals and residencies.",
    initials: "ED",
    website: "https://example.com/earthdance",
    category: "organization",
    image: "/images/gallery-8.jpg"
  },
  {
    name: "Festival Contatto",
    description: "Italian contact improvisation festival held annually in Tuscany, featuring workshops, performances, and extended jam sessions.",
    initials: "FC",
    website: "https://example.com/festival-contatto",
    category: "festival",
    image: "/images/gallery-2.jpg"
  },
  {
    name: "Impulstanz Vienna",
    description: "One of Europe's largest contemporary dance festivals, offering a rich program of workshops, performances, and research projects.",
    initials: "IV",
    website: "https://example.com/impulstanz",
    category: "festival",
    image: "/images/gallery-7.jpg"
  },
  {
    name: "Scuola di Movimento",
    description: "Milan-based movement school integrating contact improvisation, somatics, and contemporary dance in ongoing training programs.",
    initials: "SM",
    website: "https://example.com/scuola-movimento",
    category: "school",
    image: "/images/gallery-4.jpg"
  }
];

// app/data/research.ts
var researchAreas2 = [
  {
    title: "Somatics & Contact Improvisation",
    question: "How does inner listening transform the quality of contact?",
    description: "This research explores the bridge between somatic practices and relational movement. Through body scanning, breath work, Feldenkrais awareness, and Body-Mind Centering, I investigate how a deeper proprioceptive awareness changes the way we meet another body. When we begin from a place of inner listening \u2014 sensing our own skeleton, organs, fluids \u2014 the quality of touch becomes finer, more nuanced, more alive. The contact dance that emerges is not about doing but about perceiving, not about moving but about being moved.",
    quote: "The most profound contact begins not with touching another, but with truly feeling yourself.",
    influences: ["Bonnie Bainbridge Cohen", "Body-Mind Centering", "Feldenkrais Method", "Nita Little"],
    relatedWorkshops: [
      { title: "The Listening Touch", id: "listening-touch-2024" },
      { title: "Foundations of Contact Improvisation", id: "fundamentals-spring" }
    ],
    image: "/images/gallery-4.jpg"
  },
  {
    title: "Landscape as Partner",
    question: "What happens when the environment becomes a co-creator?",
    description: "Taking contact improvisation outdoors opens a radical shift in perspective: the ground is no longer flat, the air has texture, gravity pulls differently on a slope. Trees, wind, water, and sunlight become partners in the dance. This research investigates site-specific practices where terrain and natural forces shape our movement choices. Dancing on a hillside teaches us about weight and momentum in ways no studio floor can. The landscape becomes not a backdrop but an active participant \u2014 one that never repeats itself.",
    quote: "When you dance with a tree, you learn patience. When you dance with a hill, you learn surrender.",
    influences: ["Anna Halprin", "Land Art", "Site-specific performance", "Deep ecology"],
    relatedWorkshops: [
      { title: "Summer Contact Lab", id: "summer-intensive" },
      { title: "Summer Contact Lab 2025", id: "summer-contact-lab-2025" }
    ],
    image: "/images/gallery-6.jpg"
  },
  {
    title: "Contact & Composition",
    question: "Can we compose without losing the freedom of improvisation?",
    description: "This research inhabits the fertile territory between free improvisation and composed performance. Through scores, constraints, and compositional frameworks, I explore how awareness of space, timing, repetition, and narrative arc can enrich the improvisational encounter rather than constrain it. The question is not whether to structure or not, but how to find structures that amplify spontaneity. Working with musicians, visual artists, and poets, I investigate how CI can become a performing art without sacrificing its essential unpredictability.",
    quote: "Composition doesn't mean control. It means becoming a more attentive witness to the dance that is already happening.",
    influences: ["Nancy Stark Smith", "Underscore", "John Cage", "Deborah Hay"],
    relatedWorkshops: [
      { title: "Contact & Composition", id: "contact-composition-2024" }
    ],
    image: "/images/gallery-9.jpg"
  },
  {
    title: "Consent & Touch Ethics",
    question: "How do we create spaces where vulnerability and boundaries coexist?",
    description: "In a practice built on physical intimacy and trust, the ethics of touch demand constant attention. This research examines how consent frameworks can be woven into CI pedagogy from the very first class \u2014 not as a set of rules but as a lived practice of communication. I explore how we can teach students to say yes, no, and not yet with clarity and without guilt. How do we hold space for different comfort levels, cultural backgrounds, and personal histories? How do we ensure that touch remains an invitation, never an assumption?",
    quote: "A 'no' freely given is as beautiful as a 'yes'. Both are essential to a dance of equals.",
    influences: ["Martin Keogh", "Trauma-informed movement practices", "Somatic Consent", "adrienne maree brown"],
    relatedWorkshops: [
      { title: "Gravity & Play", id: "gravity-play" },
      { title: "Foundations of Contact Improvisation", id: "fundamentals-spring" }
    ],
    image: "/images/gallery-3.jpg"
  },
  {
    title: "Fluid Dynamics in Movement",
    question: "How can we move like water with another body?",
    description: "Inspired by the physics of water \u2014 flow, turbulence, viscosity, and wave motion \u2014 this research applies principles of fluid dynamics to partnering in CI. What does it mean to be turbulent together? To find laminar flow in a duet? Through somatic visualizations and partnering scores, I cultivate seamless transitions, continuous dialogue, and the sensation of liquid exchange between bodies. The work challenges the idea of CI as a series of discrete moments (a lift, a fall, a roll) and instead proposes an unbroken continuum of shared motion.",
    quote: "Water never stops. It transforms \u2014 from river to mist to ice \u2014 but it never stops moving. That is how I want to dance.",
    influences: ["Fluid mechanics", "Emilie Conrad (Continuum Movement)", "Steve Paxton", "Kirstie Simson"],
    relatedWorkshops: [
      { title: "Fluid Bodies", id: "fluid-bodies" }
    ],
    image: "/images/gallery-7.jpg"
  },
  {
    title: "Gravity as Teacher",
    question: "What if falling were not failure but the beginning of every dance?",
    description: "Gravity is the one partner who never leaves. This ongoing exploration investigates falling, yielding, and suspension as pathways to trust \u2014 both in ourselves and with others. Working close to the floor, I research how rolling, spiraling, and surrendering to weight create a foundation of ease that makes everything else possible: standing work, lifts, aerial moments. The floor is not a surface we move on but a body we move with. When we learn to trust gravity, we learn to trust relationship itself.",
    quote: "The floor is my first teacher, my most honest partner. Everything I know about trust I learned from falling.",
    influences: ["Steve Paxton", "Aikido", "Release technique", "Nancy Stark Smith"],
    relatedWorkshops: [
      { title: "Roots & Wings", id: "roots-and-wings-2025" },
      { title: "Gravity & Play", id: "gravity-play" }
    ],
    image: "/images/gallery-1.jpg"
  }
];

// scripts/seed.ts
import { mkdirSync } from "fs";
import { dirname } from "path";
var dbPath = process.env.DATABASE_PATH || "./data/site.db";
mkdirSync(dirname(dbPath), { recursive: true });
var sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");
var db = drizzle(sqlite, { schema: schema_exports });
console.log("Running migrations...");
migrate(db, { migrationsFolder: "./drizzle" });
console.log("Seeding database...");
db.delete(testimonials).run();
db.delete(workshops).run();
db.delete(galleryItems).run();
db.delete(collaborations).run();
db.delete(researchAreas).run();
db.delete(videos).run();
db.delete(siteSettings).run();
workshops2.forEach((w, i) => {
  db.insert(workshops).values({
    id: w.id,
    title: w.title,
    subtitle: w.subtitle,
    description: w.description,
    longDescription: w.longDescription,
    highlights: w.highlights,
    startDate: w.startDate,
    endDate: w.endDate ?? null,
    dates: w.dates,
    location: w.location,
    externalUrl: w.externalUrl,
    image: w.image,
    format: w.format,
    schedule: w.schedule ?? null,
    period: w.period ?? null,
    sortOrder: i
  }).run();
  if (w.testimonials) {
    w.testimonials.forEach((t) => {
      db.insert(testimonials).values({
        workshopId: w.id,
        quote: t.quote,
        name: t.name,
        year: t.year
      }).run();
    });
  }
});
console.log(`  ${workshops2.length} workshops seeded`);
galleryItems2.forEach((item, i) => {
  db.insert(galleryItems).values({
    src: item.src,
    alt: item.alt,
    caption: item.caption,
    category: item.category,
    span: item.span,
    sortOrder: i
  }).run();
});
console.log(`  ${galleryItems2.length} gallery items seeded`);
collaborations2.forEach((c, i) => {
  db.insert(collaborations).values({
    name: c.name,
    description: c.description,
    initials: c.initials,
    website: c.website,
    category: c.category,
    image: c.image,
    sortOrder: i
  }).run();
});
console.log(`  ${collaborations2.length} collaborations seeded`);
researchAreas2.forEach((r, i) => {
  db.insert(researchAreas).values({
    title: r.title,
    question: r.question,
    description: r.description,
    quote: r.quote,
    influences: r.influences,
    relatedWorkshops: r.relatedWorkshops,
    image: r.image,
    sortOrder: i
  }).run();
});
console.log(`  ${researchAreas2.length} research areas seeded`);
videos2.forEach((v, i) => {
  db.insert(videos).values({
    title: v.title,
    description: v.description,
    embedUrl: v.embedUrl,
    thumbnail: v.thumbnail,
    category: v.category,
    sortOrder: i
  }).run();
});
console.log(`  ${videos2.length} videos seeded`);
var aboutSettings = [
  {
    key: "about_bio",
    value: `Elisa Ghion is a contact improvisation teacher and performer based in Italy, dedicated to exploring the art of movement dialogue between bodies. Her practice is rooted in deep listening, shared weight, and the poetics of physical conversation.

With over a decade of experience in somatics, dance improvisation, and movement research, Elisa creates spaces where practitioners of all levels can discover the intelligence of the body in relation to others and to gravity.

Her teaching draws from contact improvisation, Body-Mind Centering, and contemporary dance, weaving together technique and creative exploration. She leads workshops and intensives across Europe, fostering community through the shared language of touch and movement.

Elisa began her movement journey through contemporary dance in Milan, later discovering contact improvisation during a workshop in Berlin that changed her trajectory entirely. Since then she has studied with teachers including Nancy Stark Smith, Nita Little, Martin Keogh, and Kirstie Simson, deepening her understanding of the form and its possibilities.

Today she divides her time between teaching regular classes in Milan, leading intensive workshops across Italy and Europe, and her own movement research \u2014 an ongoing inquiry into how contact improvisation can evolve as both an art form and a practice of radical presence.`
  },
  {
    key: "about_philosophy",
    value: `I believe that contact improvisation is learned through the body, not explained to the mind. My classes create conditions for discovery rather than delivering instructions \u2014 I offer scores, invitations, and questions that guide you toward your own experience.

Safety and consent are foundational. Every class begins with clear agreements about touch, communication, and personal boundaries. I want everyone in the room to feel empowered to say yes, no, or not yet \u2014 and to know that each answer is equally valued.

I teach from a place of ongoing learning. My practice is never finished, and I share what I am currently exploring alongside what I have integrated over the years. This keeps the work alive and honest.`
  },
  {
    key: "about_philosophy_quote",
    value: "Contact improvisation is not just a dance form but a practice of presence, trust, and radical togetherness."
  }
];
aboutSettings.forEach((s) => {
  db.insert(siteSettings).values(s).run();
});
console.log(`  ${aboutSettings.length} site settings seeded`);
console.log("Done!");
sqlite.close();
