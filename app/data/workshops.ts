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
  dates: string;
  location: string;
  externalUrl: string;
  image: string;
  status: "upcoming" | "past";
  testimonials?: Testimonial[];
};

export const workshops: Workshop[] = [
  // ── Upcoming ──────────────────────────────────────────────
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
    dates: "March 15–16, 2026",
    location: "Studio Sospeso, Milan",
    externalUrl: "https://example.com/workshops/fundamentals-spring",
    image: "/images/gallery-1.jpg",
    status: "upcoming",
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
    dates: "April 5–6, 2026",
    location: "Spazio Agorà, Rome",
    externalUrl: "https://example.com/workshops/fluid-bodies",
    image: "/images/gallery-3.jpg",
    status: "upcoming",
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
    dates: "July 7–11, 2026",
    location: "Podere Il Leccio, Tuscany",
    externalUrl: "https://example.com/workshops/summer-intensive",
    image: "/images/gallery-5.jpg",
    status: "upcoming",
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
    dates: "September 20–21, 2026",
    location: "Centro Danza, Bologna",
    externalUrl: "https://example.com/workshops/gravity-play",
    image: "/images/gallery-2.jpg",
    status: "upcoming",
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
    dates: "November 8–9, 2025",
    location: "Studio Sospeso, Milan",
    externalUrl: "https://example.com/workshops/roots-and-wings-2025",
    image: "/images/gallery-7.jpg",
    status: "past",
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
    dates: "July 7–11, 2025",
    location: "Podere Il Leccio, Tuscany",
    externalUrl: "https://example.com/workshops/summer-lab-2025",
    image: "/images/gallery-6.jpg",
    status: "past",
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
    dates: "October 12–13, 2024",
    location: "Spazio Agorà, Rome",
    externalUrl: "https://example.com/workshops/listening-touch-2024",
    image: "/images/gallery-4.jpg",
    status: "past",
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
    dates: "May 18–19, 2024",
    location: "Centro Danza, Bologna",
    externalUrl: "https://example.com/workshops/contact-composition-2024",
    image: "/images/gallery-9.jpg",
    status: "past",
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
