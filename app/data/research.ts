export type ResearchArea = {
  title: string;
  question: string;
  description: string;
  quote: string;
  influences: string[];
  relatedWorkshops: { title: string; id: string }[];
  image: string;
};

export const researchAreas: ResearchArea[] = [
  {
    title: "Somatics & Contact Improvisation",
    question: "How does inner listening transform the quality of contact?",
    description:
      "This research explores the bridge between somatic practices and relational movement. Through body scanning, breath work, Feldenkrais awareness, and Body-Mind Centering, I investigate how a deeper proprioceptive awareness changes the way we meet another body. When we begin from a place of inner listening — sensing our own skeleton, organs, fluids — the quality of touch becomes finer, more nuanced, more alive. The contact dance that emerges is not about doing but about perceiving, not about moving but about being moved.",
    quote:
      "The most profound contact begins not with touching another, but with truly feeling yourself.",
    influences: ["Bonnie Bainbridge Cohen", "Body-Mind Centering", "Feldenkrais Method", "Nita Little"],
    relatedWorkshops: [
      { title: "The Listening Touch", id: "listening-touch-2024" },
      { title: "Foundations of Contact Improvisation", id: "fundamentals-spring" },
    ],
    image: "/images/gallery-4.jpg",
  },
  {
    title: "Landscape as Partner",
    question: "What happens when the environment becomes a co-creator?",
    description:
      "Taking contact improvisation outdoors opens a radical shift in perspective: the ground is no longer flat, the air has texture, gravity pulls differently on a slope. Trees, wind, water, and sunlight become partners in the dance. This research investigates site-specific practices where terrain and natural forces shape our movement choices. Dancing on a hillside teaches us about weight and momentum in ways no studio floor can. The landscape becomes not a backdrop but an active participant — one that never repeats itself.",
    quote:
      "When you dance with a tree, you learn patience. When you dance with a hill, you learn surrender.",
    influences: ["Anna Halprin", "Land Art", "Site-specific performance", "Deep ecology"],
    relatedWorkshops: [
      { title: "Summer Contact Lab", id: "summer-intensive" },
      { title: "Summer Contact Lab 2025", id: "summer-contact-lab-2025" },
    ],
    image: "/images/gallery-6.jpg",
  },
  {
    title: "Contact & Composition",
    question: "Can we compose without losing the freedom of improvisation?",
    description:
      "This research inhabits the fertile territory between free improvisation and composed performance. Through scores, constraints, and compositional frameworks, I explore how awareness of space, timing, repetition, and narrative arc can enrich the improvisational encounter rather than constrain it. The question is not whether to structure or not, but how to find structures that amplify spontaneity. Working with musicians, visual artists, and poets, I investigate how CI can become a performing art without sacrificing its essential unpredictability.",
    quote:
      "Composition doesn't mean control. It means becoming a more attentive witness to the dance that is already happening.",
    influences: ["Nancy Stark Smith", "Underscore", "John Cage", "Deborah Hay"],
    relatedWorkshops: [
      { title: "Contact & Composition", id: "contact-composition-2024" },
    ],
    image: "/images/gallery-9.jpg",
  },
  {
    title: "Consent & Touch Ethics",
    question: "How do we create spaces where vulnerability and boundaries coexist?",
    description:
      "In a practice built on physical intimacy and trust, the ethics of touch demand constant attention. This research examines how consent frameworks can be woven into CI pedagogy from the very first class — not as a set of rules but as a lived practice of communication. I explore how we can teach students to say yes, no, and not yet with clarity and without guilt. How do we hold space for different comfort levels, cultural backgrounds, and personal histories? How do we ensure that touch remains an invitation, never an assumption?",
    quote:
      "A 'no' freely given is as beautiful as a 'yes'. Both are essential to a dance of equals.",
    influences: ["Martin Keogh", "Trauma-informed movement practices", "Somatic Consent", "adrienne maree brown"],
    relatedWorkshops: [
      { title: "Gravity & Play", id: "gravity-play" },
      { title: "Foundations of Contact Improvisation", id: "fundamentals-spring" },
    ],
    image: "/images/gallery-3.jpg",
  },
  {
    title: "Fluid Dynamics in Movement",
    question: "How can we move like water with another body?",
    description:
      "Inspired by the physics of water — flow, turbulence, viscosity, and wave motion — this research applies principles of fluid dynamics to partnering in CI. What does it mean to be turbulent together? To find laminar flow in a duet? Through somatic visualizations and partnering scores, I cultivate seamless transitions, continuous dialogue, and the sensation of liquid exchange between bodies. The work challenges the idea of CI as a series of discrete moments (a lift, a fall, a roll) and instead proposes an unbroken continuum of shared motion.",
    quote:
      "Water never stops. It transforms — from river to mist to ice — but it never stops moving. That is how I want to dance.",
    influences: ["Fluid mechanics", "Emilie Conrad (Continuum Movement)", "Steve Paxton", "Kirstie Simson"],
    relatedWorkshops: [
      { title: "Fluid Bodies", id: "fluid-bodies" },
    ],
    image: "/images/gallery-7.jpg",
  },
  {
    title: "Gravity as Teacher",
    question: "What if falling were not failure but the beginning of every dance?",
    description:
      "Gravity is the one partner who never leaves. This ongoing exploration investigates falling, yielding, and suspension as pathways to trust — both in ourselves and with others. Working close to the floor, I research how rolling, spiraling, and surrendering to weight create a foundation of ease that makes everything else possible: standing work, lifts, aerial moments. The floor is not a surface we move on but a body we move with. When we learn to trust gravity, we learn to trust relationship itself.",
    quote:
      "The floor is my first teacher, my most honest partner. Everything I know about trust I learned from falling.",
    influences: ["Steve Paxton", "Aikido", "Release technique", "Nancy Stark Smith"],
    relatedWorkshops: [
      { title: "Roots & Wings", id: "roots-and-wings-2025" },
      { title: "Gravity & Play", id: "gravity-play" },
    ],
    image: "/images/gallery-1.jpg",
  },
];
