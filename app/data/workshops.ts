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

export const workshops: Workshop[] = [
  // ── Weekly Classes ───────────────────────────────────────
  {
    id: "weekly-ci-milan",
    title: "Contact Improvisation Open Class",
    subtitle: "Weekly practice in Milan",
    description:
      "A welcoming weekly class open to all levels. Each session combines a guided warm-up, technique exploration, and open dancing. A consistent practice to deepen your CI journey throughout the season.",
    longDescription: `This weekly class is the heart of our Milan CI community — a regular space to practice, explore, and grow together throughout the season.

Each session follows a simple arc: we begin with a somatic warm-up to arrive in the body, move into guided scores and technique exploration around a weekly theme, and close with open dancing where you can integrate what you've discovered.

Themes rotate throughout the season — from grounding and floor work to partnering, lifts, and composition — so the class stays fresh even for regular participants. Newcomers are always welcome; each session is designed to be accessible while offering depth for experienced movers.

No registration required — just show up. Drop-in and season passes available.`,
    highlights: [
      "Level: Open to all — beginners welcome",
      "Drop-in or season pass available",
      "Themes rotate weekly",
      "Language: Italian with English support",
      "What to bring: Comfortable clothes, water bottle",
    ],
    startDate: "2025-10-07",
    endDate: "2026-06-30",
    dates: "",
    schedule: "Tuesday, 19:00–21:00",
    period: "October 2025 – June 2026",
    location: "Studio Sospeso, Milan",
    externalUrl: "https://example.com/classes/weekly-milan",
    image: "/images/gallery-8.jpg",
    format: "weekly",
    testimonials: [
      {
        quote:
          "The Tuesday class has become the highlight of my week. I love how the themes evolve across the season.",
        name: "Carla N.",
        year: "2025",
      },
    ],
  },
  {
    id: "weekly-ci-bologna",
    title: "Contact Improvisation Open Class",
    subtitle: "Weekly practice in Bologna",
    description:
      "A weekly CI class in Bologna for all levels. Guided warm-ups, partnering scores, and open practice in a warm and inclusive atmosphere.",
    longDescription: `Our Bologna weekly class offers a regular space to explore contact improvisation in a supportive and inclusive environment.

Each session includes a somatic warm-up, guided partnering scores, and open practice time. The class follows a seasonal arc with themes that deepen progressively, while remaining accessible to newcomers at any point.

The Bologna community is vibrant and welcoming — many long-term friendships and dance partnerships have formed through this class. Come join us!`,
    highlights: [
      "Level: Open to all",
      "Drop-in or season pass available",
      "Language: Italian with English support",
      "What to bring: Comfortable clothes, water bottle",
    ],
    startDate: "2025-10-09",
    endDate: "2026-06-30",
    dates: "",
    schedule: "Thursday, 19:30–21:30",
    period: "October 2025 – June 2026",
    location: "Centro Danza, Bologna",
    externalUrl: "https://example.com/classes/weekly-bologna",
    image: "/images/gallery-10.jpg",
    format: "weekly",
  },

  // ── Workshops ──────────────────────────────────────────
  {
    id: "fundamentals-spring",
    title: "Foundations of Contact Improvisation",
    subtitle: "A weekend intensive for beginners",
    description:
      "Explore the fundamental principles of contact improvisation: sharing weight, rolling point of contact, and the art of listening through touch. This weekend intensive is designed for those new to CI or wanting to revisit the basics with fresh eyes. We will work with gravity, momentum, and the floor as our primary teachers.",
    longDescription: `This weekend intensive invites you into the rich, playful world of contact improvisation — a movement practice rooted in listening, trust, and shared weight.

Over two full days we will build a strong foundation in the core principles of CI: finding and following a rolling point of contact, giving and receiving weight, and cultivating a deep sensitivity to gravity and momentum. The floor is our first partner — we will spend time exploring how to fall safely, roll efficiently, and move with ease close to the ground before expanding into standing duets.

Each session combines guided warm-ups, structured scores, open exploration, and reflection circles. You will leave with tools you can bring to any jam or practice group, and a felt understanding of how contact improvisation differs from other dance forms.

No prior dance experience is required — only curiosity and a willingness to explore. Wear comfortable clothing you can move freely in, and bring water and a journal if you like.`,
    highlights: [
      "Level: Open to all — no experience needed",
      "Schedule: Saturday & Sunday, 10:00–17:00 (lunch break 13:00–14:30)",
      "What to bring: Comfortable clothes, water bottle, notebook",
      "Language: Italian with English support",
      "Max participants: 20",
    ],
    startDate: "2026-03-15",
    endDate: "2026-03-16",
    dates: "March 15–16, 2026",
    location: "Studio Sospeso, Milan",
    externalUrl: "https://example.com/workshops/fundamentals-spring",
    image: "/images/gallery-1.jpg",
    format: "weekend",
    testimonials: [
      {
        quote:
          "Elisa creates such a safe and welcoming space. I had never done CI before and by Sunday afternoon I felt like I'd discovered a new language.",
        name: "Marco T.",
        year: "2025",
      },
      {
        quote:
          "The way she explains weight sharing is so intuitive. I finally understood what 'listening through touch' means.",
        name: "Anna K.",
        year: "2025",
      },
    ],
  },
  {
    id: "fluid-bodies",
    title: "Fluid Bodies",
    subtitle: "Advanced flow and partnering techniques",
    description:
      "Dive deeper into the fluid dynamics of contact improvisation. This workshop focuses on seamless transitions, aerial moments, and the cultivation of a continuous dance dialogue. Suitable for practitioners with at least one year of regular CI practice. We will explore how water-like movement qualities can transform our partnering.",
    longDescription: `Fluid Bodies is a weekend laboratory for experienced movers who want to deepen their contact improvisation practice beyond the fundamentals.

We will investigate how the principles of fluid dynamics — flow, turbulence, viscosity, and wave motion — can inform the way we move with another body. Through somatic explorations and partnering scores, we will cultivate seamless transitions between the floor, standing work, and brief aerial moments.

A central theme of this workshop is the idea of "continuous dance dialogue" — learning to sustain an unbroken conversation of weight, momentum, and intention with your partner, even through moments of disorientation or surprise. We will work with eyes closed, in trios, and in the full group to expand our relational field.

This workshop is suited for practitioners with at least one year of regular CI practice or equivalent movement experience (contemporary dance, martial arts, somatic practices).`,
    highlights: [
      "Level: Intermediate to advanced (1+ year CI experience)",
      "Schedule: Saturday & Sunday, 10:00–18:00",
      "Focus: Seamless transitions, aerial moments, continuous dialogue",
      "Language: Italian and English",
      "Max participants: 16",
    ],
    startDate: "2026-04-05",
    endDate: "2026-04-06",
    dates: "April 5–6, 2026",
    location: "Spazio Agorà, Rome",
    externalUrl: "https://example.com/workshops/fluid-bodies",
    image: "/images/gallery-3.jpg",
    format: "weekend",
    testimonials: [
      {
        quote:
          "This workshop completely changed how I approach partnering. The fluid dynamics metaphor opened up so many new possibilities.",
        name: "Lucia M.",
        year: "2025",
      },
      {
        quote:
          "Elisa's ability to guide advanced material while keeping the atmosphere playful is remarkable.",
        name: "Stefan R.",
        year: "2024",
      },
      {
        quote:
          "I came back to my local jam and people immediately noticed something had shifted in my dancing.",
        name: "Francesca B.",
        year: "2025",
      },
    ],
  },
  {
    id: "summer-intensive",
    title: "Summer Contact Lab",
    subtitle: "Five-day immersive residency",
    description:
      "An immersive five-day laboratory bringing together contact improvisation, somatics, and composition. Mornings are dedicated to technique and scores, afternoons to open practice and creative research. Evenings feature sharing circles and jam sessions. Open to all levels with some movement experience.",
    longDescription: `Escape the city and immerse yourself in five days of movement, nature, and community at our annual Summer Contact Lab in the Tuscan countryside.

Each morning begins with a somatic warm-up — breath work, body scanning, and gentle mobilization — before moving into structured contact improvisation technique classes. We explore themes that build across the week: from grounding and solo movement on Monday, through partnering and weight sharing mid-week, to composition and performance scores by Friday.

Afternoons are dedicated to open practice, one-on-one exchanges, and creative research. The beautiful outdoor spaces of Podere Il Leccio — a restored farmhouse surrounded by olive groves and rolling hills — become our studio.

Evenings bring the group together for sharing circles, discussions on CI philosophy and ethics, and extended jam sessions under the stars. Meals are vegetarian, locally sourced, and shared communally.

This residency is open to all levels with some movement experience. Beginners with a strong interest in somatics or dance are warmly welcome alongside experienced practitioners.`,
    highlights: [
      "Level: All levels with some movement experience",
      "Schedule: Monday–Friday, full days (morning class, afternoon lab, evening jam)",
      "Accommodation: Shared rooms at Podere Il Leccio (included in fee)",
      "Meals: Vegetarian, locally sourced, communal",
      "What to bring: Layers for outdoor practice, sunscreen, journal",
      "Max participants: 24",
    ],
    startDate: "2026-07-07",
    endDate: "2026-07-11",
    dates: "July 7–11, 2026",
    location: "Podere Il Leccio, Tuscany",
    externalUrl: "https://example.com/workshops/summer-intensive",
    image: "/images/gallery-5.jpg",
    format: "intensive",
    testimonials: [
      {
        quote:
          "Five days in Tuscany dancing under the stars — it was transformative. The community that forms during the lab is something special.",
        name: "Elena V.",
        year: "2025",
      },
      {
        quote:
          "The balance of structure and freedom is perfect. Mornings gave me new tools, afternoons let me integrate them.",
        name: "Thomas W.",
        year: "2024",
      },
    ],
  },
  {
    id: "gravity-play",
    title: "Gravity & Play",
    subtitle: "Contact improvisation meets acrobatics",
    description:
      "A playful exploration of lifts, counterbalances, and dynamic weight sharing. Drawing from both contact improvisation and partner acrobatics, this workshop invites you to find ease in the air and grounding in flight. We emphasize safety, consent, and progressive skill building.",
    longDescription: `What happens when contact improvisation meets the world of partner acrobatics? Gravity & Play is a weekend of joyful, athletic exploration at the intersection of these two practices.

We begin each session with thorough conditioning and preparation — building the strength, proprioception, and trust needed for dynamic weight sharing. From there, we progress through a carefully scaffolded sequence: counterbalances, low lifts, surfing, and eventually more adventurous aerial exchanges.

Safety and consent are at the heart of this workshop. Every exercise is offered with clear progressions and alternatives, and you are always empowered to choose your own level of engagement. We practice saying "yes," "no," and "not yet" with clarity and respect.

While the work is physical and sometimes challenging, the spirit is playful. We use games, scores, and improvisation to discover lifts and flights organically, rather than drilling fixed sequences. The goal is not to perform tricks, but to expand the vocabulary of your contact dance with confidence and ease.

Some prior CI or movement experience is recommended, but acrobatic experience is not required.`,
    highlights: [
      "Level: Intermediate (some CI or movement experience recommended)",
      "Schedule: Saturday & Sunday, 10:00–17:30",
      "Focus: Lifts, counterbalances, dynamic weight sharing",
      "Safety: Progressive skill building with clear consent practices",
      "What to bring: Comfortable athletic clothing, knee pads optional",
      "Max participants: 18",
    ],
    startDate: "2026-09-20",
    endDate: "2026-09-21",
    dates: "September 20–21, 2026",
    location: "Centro Danza, Bologna",
    externalUrl: "https://example.com/workshops/gravity-play",
    image: "/images/gallery-2.jpg",
    format: "weekend",
    testimonials: [
      {
        quote:
          "I was terrified of lifts before this workshop. Elisa's progressive approach made me feel safe to explore.",
        name: "Giulia P.",
        year: "2025",
      },
      {
        quote:
          "The emphasis on consent and communication was as valuable as the physical skills. A model for how CI should be taught.",
        name: "David L.",
        year: "2024",
      },
      {
        quote:
          "So much fun! I left with sore muscles and a huge smile.",
        name: "Marta S.",
        year: "2025",
      },
    ],
  },

  // ── Jams & Performances ────────────────────────────────
  {
    id: "jam-spring-2026",
    title: "Open Jam — Spring Edition",
    subtitle: "Free-form contact improvisation jam",
    description:
      "An open jam session for the CI community. No teaching, no structure — just music, space, and the invitation to dance. All levels welcome.",
    longDescription: `Our seasonal open jams are a cornerstone of the CI community — a space to practice freely, meet new dance partners, and enjoy the simple pleasure of moving together.

There is no teaching or structure: the space opens, music plays softly, and you are invited to dance however you feel called. Come alone or with friends, dance for an hour or the whole evening, rest when you need to.

All levels welcome. If you're new to CI, jams are a wonderful place to observe, begin with small dances, and connect with the community.`,
    highlights: [
      "Level: Open to all",
      "No registration needed",
      "Bring: Water, comfortable clothes",
    ],
    startDate: "2026-03-28",
    dates: "March 28, 2026",
    location: "Spazio Agorà, Rome",
    externalUrl: "",
    image: "/images/gallery-11.jpg",
    format: "jam",
  },
  {
    id: "performance-teatro-2026",
    title: "CI Duet — Teatro della Limonaia",
    subtitle: "Contact improvisation performance",
    description:
      "A live contact improvisation duet performance exploring the themes of gravity, trust, and conversation through movement. Performed with musician Marco Ferretti.",
    longDescription: `An evening of live contact improvisation at Teatro della Limonaia in Florence.

Elisa performs a duet with dancer and long-time collaborator Paolo Ventura, accompanied by live electronic music from Marco Ferretti. The piece explores the tension between structure and freedom — how two bodies can compose in real time, creating a performance that is unrepeatable and fully present.

The evening includes a post-show conversation with the artists about the creative process and the philosophy behind contact improvisation as a performing art.`,
    highlights: [
      "Doors open: 20:00",
      "Performance: 20:30",
      "Post-show conversation: 21:30",
      "With: Paolo Ventura (dance), Marco Ferretti (live music)",
    ],
    startDate: "2026-05-10",
    dates: "May 10, 2026",
    location: "Teatro della Limonaia, Florence",
    externalUrl: "",
    image: "/images/gallery-12.jpg",
    format: "performance",
  },
  {
    id: "jam-summer-2026",
    title: "Open Jam — Summer Kickoff",
    subtitle: "Outdoor jam in the park",
    description:
      "A special outdoor jam to celebrate the start of summer. Dancing on grass, under the trees, with the sky as our ceiling.",
    longDescription: `Our Summer Kickoff jam moves outdoors to Parco Sempione — a beloved tradition to mark the transition from studio season to summer adventures.

Bring a blanket, sunscreen, and your dancing spirit. We'll set up a soft area on the grass and dance together as the sun sets over Milan. All levels and non-dancers welcome — this is a community celebration.`,
    highlights: [
      "Level: Open to all",
      "Outdoor event — weather permitting",
      "Bring: Blanket, sunscreen, water",
    ],
    startDate: "2026-06-21",
    dates: "June 21, 2026",
    location: "Parco Sempione, Milan",
    externalUrl: "",
    image: "/images/gallery-13.jpg",
    format: "jam",
  },
  {
    id: "jam-autumn-2026",
    title: "Autumn Jam",
    subtitle: "Season opening jam",
    description:
      "The first jam of the new season — a warm welcome back to the studio after summer. Reconnect with the community and set intentions for the year ahead.",
    longDescription: `The Autumn Jam marks the beginning of a new CI season in Milan. After the summer break, we gather to reconnect, share stories, and dance together.

The evening begins with a brief opening circle to welcome new and returning members, followed by three hours of open dancing. A perfect way to ease back into practice and meet the community.`,
    highlights: [
      "Level: Open to all",
      "Opening circle: 19:00",
      "Open jam: 19:30–22:00",
    ],
    startDate: "2026-10-11",
    dates: "October 11, 2026",
    location: "Studio Sospeso, Milan",
    externalUrl: "",
    image: "/images/gallery-14.jpg",
    format: "jam",
  },

  // ── Past ──────────────────────────────────────────────────
  {
    id: "roots-and-wings-2025",
    title: "Roots & Wings",
    subtitle: "Grounding and flight in CI",
    description:
      "A weekend exploring the polarity of grounding and flight in contact improvisation. Working with the floor as foundation and the air as invitation, we investigated how rootedness enables freedom.",
    longDescription: `Roots & Wings was a weekend intensive dedicated to the interplay between earthiness and airiness in contact improvisation.

We spent the first day deepening our relationship with the floor — exploring rolling, sliding, and spiraling close to the ground. Through somatic exercises we cultivated a sense of rootedness: feeling the weight of the skeleton, the support of the earth, and the stability that comes from surrendering to gravity.

On the second day we turned our attention upward — investigating how a strong ground connection enables moments of flight, suspension, and effortless partnering. We explored small lifts, jumps, and aerial pathways that emerge organically from grounded partnering.

The workshop concluded with a long open jam where participants could integrate both qualities freely.`,
    highlights: [
      "Level: All levels",
      "Schedule: Saturday & Sunday, 10:00–17:00",
      "Focus: Grounding, floor work, and aerial exploration",
      "Language: Italian and English",
      "Max participants: 20",
    ],
    startDate: "2025-11-08",
    endDate: "2025-11-09",
    dates: "November 8–9, 2025",
    location: "Studio Sospeso, Milan",
    externalUrl: "https://example.com/workshops/roots-and-wings-2025",
    image: "/images/gallery-7.jpg",
    format: "weekend",
    testimonials: [
      {
        quote:
          "The arc from floor work to flight felt so natural. By Sunday I was doing things I never thought possible.",
        name: "Roberto C.",
        year: "2025",
      },
      {
        quote:
          "Elisa has a gift for making complex concepts feel accessible and embodied.",
        name: "Sarah H.",
        year: "2025",
      },
    ],
  },
  {
    id: "summer-contact-lab-2025",
    title: "Summer Contact Lab 2025",
    subtitle: "Five-day immersive residency",
    description:
      "Our annual summer residency in the Tuscan countryside. Five days of movement, nature, and community, blending contact improvisation, somatics, and composition.",
    longDescription: `The 2025 edition of the Summer Contact Lab brought together 22 dancers from across Europe for five days of intensive practice at Podere Il Leccio.

This year's edition focused on the theme of "Landscape as Partner" — using the natural environment as a co-creator in our movement research. Sessions took place in olive groves, on hillsides, and under the canopy of ancient oaks.

Morning classes explored how terrain, wind, and sunlight can inform our movement choices. Afternoon labs were dedicated to site-specific scores and creative projects. Evening jams under the stars became a beloved ritual.

The community that formed during these five days continues to practice together across cities and countries.`,
    highlights: [
      "Level: All levels with some movement experience",
      "Schedule: Monday–Friday, full days",
      "Accommodation: Shared rooms (included)",
      "Meals: Vegetarian, locally sourced",
      "Participants: 22 dancers from 8 countries",
    ],
    startDate: "2025-07-07",
    endDate: "2025-07-11",
    dates: "July 7–11, 2025",
    location: "Podere Il Leccio, Tuscany",
    externalUrl: "https://example.com/workshops/summer-lab-2025",
    image: "/images/gallery-6.jpg",
    format: "intensive",
    testimonials: [
      {
        quote:
          "Dancing outdoors in Tuscany changed my relationship with space and environment forever.",
        name: "Nina F.",
        year: "2025",
      },
      {
        quote:
          "The 'Landscape as Partner' theme was brilliant. I still use those scores in my own teaching.",
        name: "Alex M.",
        year: "2025",
      },
    ],
  },
  {
    id: "listening-touch-2024",
    title: "The Listening Touch",
    subtitle: "Somatic approaches to CI",
    description:
      "A weekend integrating somatic practices — body-mind centering, Feldenkrais, and breath work — into contact improvisation. We explored how deepening inner listening transforms our capacity for relational movement.",
    longDescription: `The Listening Touch was a weekend of slow, deep practice at the intersection of somatics and contact improvisation.

We began each session with extended somatic explorations — body scanning, breath work, and Feldenkrais-inspired movement lessons — to sensitize the nervous system and cultivate fine-grained proprioception.

From this heightened state of inner listening, we moved into contact improvisation duets, trios, and group scores. The quality of touch and attention was remarkably different from our everyday practice — more nuanced, more responsive, more alive.

Participants described the experience as "dancing in high definition" — a level of sensitivity and presence that continued to inform their practice long after the workshop ended.`,
    highlights: [
      "Level: All levels",
      "Schedule: Saturday & Sunday, 10:00–17:00",
      "Focus: Somatics, proprioception, and relational awareness",
      "Language: Italian with English support",
      "Max participants: 18",
    ],
    startDate: "2024-10-12",
    endDate: "2024-10-13",
    dates: "October 12–13, 2024",
    location: "Spazio Agorà, Rome",
    externalUrl: "https://example.com/workshops/listening-touch-2024",
    image: "/images/gallery-4.jpg",
    format: "weekend",
    testimonials: [
      {
        quote:
          "This workshop refined my sense of touch in ways I didn't know were possible. Pure magic.",
        name: "Chiara D.",
        year: "2024",
      },
      {
        quote:
          "The somatic warm-ups alone were worth the trip. I now use them every day in my own practice.",
        name: "James B.",
        year: "2024",
      },
      {
        quote:
          "'Dancing in high definition' — that's exactly what it felt like.",
        name: "Valentina R.",
        year: "2024",
      },
    ],
  },
  {
    id: "contact-composition-2024",
    title: "Contact & Composition",
    subtitle: "From improvisation to performance",
    description:
      "How do we move from open improvisation to composed performance without losing the spontaneity and authenticity of CI? This workshop explored the fertile territory between improvisation and choreography.",
    longDescription: `Contact & Composition was a weekend laboratory exploring the creative territory between free improvisation and structured performance.

We investigated a range of compositional tools — spatial awareness, timing, repetition, contrast, and narrative arc — and applied them to contact improvisation duets and group scores.

Through a series of guided exercises and creative tasks, participants discovered how compositional awareness can enhance rather than constrain the improvisational encounter. We worked toward short performance sketches that were shared in a closing showing for friends and family.

The workshop was co-taught with composer Maria Silvestri, who provided live musical accompaniment throughout and led sessions on the relationship between sound and movement.`,
    highlights: [
      "Level: Intermediate to advanced",
      "Schedule: Saturday & Sunday, 10:00–18:00",
      "Focus: Composition, performance, and musicality",
      "Co-teacher: Maria Silvestri (live music)",
      "Closing showing: Sunday evening",
      "Max participants: 16",
    ],
    startDate: "2024-05-18",
    endDate: "2024-05-19",
    dates: "May 18–19, 2024",
    location: "Centro Danza, Bologna",
    externalUrl: "https://example.com/workshops/contact-composition-2024",
    image: "/images/gallery-9.jpg",
    format: "weekend",
    testimonials: [
      {
        quote:
          "Having live music transformed the entire experience. The dialogue between movement and sound was exquisite.",
        name: "Paolo G.",
        year: "2024",
      },
      {
        quote:
          "I finally understand how to bring compositional thinking into my improvisations without losing authenticity.",
        name: "Lisa W.",
        year: "2024",
      },
    ],
  },
];
