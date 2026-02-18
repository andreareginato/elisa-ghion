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
};

export const workshops: Workshop[] = [
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
  },
];
