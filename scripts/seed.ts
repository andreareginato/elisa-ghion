import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as schema from "../app/db/schema";
import { workshops as workshopData } from "../app/data/workshops";
import { galleryItems as galleryData } from "../app/data/gallery";
import { videos as videoData } from "../app/data/videos";
import { collaborations as collabData } from "../app/data/collaborations";
import { researchAreas as researchData } from "../app/data/research";
import { mkdirSync } from "fs";
import { dirname } from "path";

const dbPath = process.env.DATABASE_PATH || "./data/site.db";
mkdirSync(dirname(dbPath), { recursive: true });

const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

const db = drizzle(sqlite, { schema });

// Run migrations to ensure tables exist
console.log("Running migrations...");
migrate(db, { migrationsFolder: "./drizzle" });

console.log("Seeding database...");

// Clear all tables (order matters due to foreign keys)
db.delete(schema.testimonials).run();
db.delete(schema.workshops).run();
db.delete(schema.galleryItems).run();
db.delete(schema.collaborations).run();
db.delete(schema.researchAreas).run();
db.delete(schema.videos).run();
db.delete(schema.siteSettings).run();

// Workshops + Testimonials
workshopData.forEach((w, i) => {
  db.insert(schema.workshops).values({
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
    sortOrder: i,
  }).run();

  if (w.testimonials) {
    w.testimonials.forEach((t) => {
      db.insert(schema.testimonials).values({
        workshopId: w.id,
        quote: t.quote,
        name: t.name,
        year: t.year,
      }).run();
    });
  }
});
console.log(`  ${workshopData.length} workshops seeded`);

// Gallery
galleryData.forEach((item, i) => {
  db.insert(schema.galleryItems).values({
    src: item.src,
    alt: item.alt,
    caption: item.caption,
    category: item.category,
    span: item.span,
    sortOrder: i,
  }).run();
});
console.log(`  ${galleryData.length} gallery items seeded`);

// Collaborations
collabData.forEach((c, i) => {
  db.insert(schema.collaborations).values({
    name: c.name,
    description: c.description,
    initials: c.initials,
    website: c.website,
    category: c.category,
    image: c.image,
    sortOrder: i,
  }).run();
});
console.log(`  ${collabData.length} collaborations seeded`);

// Research Areas
researchData.forEach((r, i) => {
  db.insert(schema.researchAreas).values({
    title: r.title,
    question: r.question,
    description: r.description,
    quote: r.quote,
    influences: r.influences,
    relatedWorkshops: r.relatedWorkshops,
    image: r.image,
    sortOrder: i,
  }).run();
});
console.log(`  ${researchData.length} research areas seeded`);

// Videos
videoData.forEach((v, i) => {
  db.insert(schema.videos).values({
    title: v.title,
    description: v.description,
    embedUrl: v.embedUrl,
    thumbnail: v.thumbnail,
    category: v.category,
    sortOrder: i,
  }).run();
});
console.log(`  ${videoData.length} videos seeded`);

// Site Settings (About page)
const aboutSettings = [
  {
    key: "about_bio",
    value: `Elisa Ghion is a contact improvisation teacher and performer based in Italy, dedicated to exploring the art of movement dialogue between bodies. Her practice is rooted in deep listening, shared weight, and the poetics of physical conversation.

With over a decade of experience in somatics, dance improvisation, and movement research, Elisa creates spaces where practitioners of all levels can discover the intelligence of the body in relation to others and to gravity.

Her teaching draws from contact improvisation, Body-Mind Centering, and contemporary dance, weaving together technique and creative exploration. She leads workshops and intensives across Europe, fostering community through the shared language of touch and movement.

Elisa began her movement journey through contemporary dance in Milan, later discovering contact improvisation during a workshop in Berlin that changed her trajectory entirely. Since then she has studied with teachers including Nancy Stark Smith, Nita Little, Martin Keogh, and Kirstie Simson, deepening her understanding of the form and its possibilities.

Today she divides her time between teaching regular classes in Milan, leading intensive workshops across Italy and Europe, and her own movement research — an ongoing inquiry into how contact improvisation can evolve as both an art form and a practice of radical presence.`,
  },
  {
    key: "about_philosophy",
    value: `I believe that contact improvisation is learned through the body, not explained to the mind. My classes create conditions for discovery rather than delivering instructions — I offer scores, invitations, and questions that guide you toward your own experience.

Safety and consent are foundational. Every class begins with clear agreements about touch, communication, and personal boundaries. I want everyone in the room to feel empowered to say yes, no, or not yet — and to know that each answer is equally valued.

I teach from a place of ongoing learning. My practice is never finished, and I share what I am currently exploring alongside what I have integrated over the years. This keeps the work alive and honest.`,
  },
  {
    key: "about_philosophy_quote",
    value: "Contact improvisation is not just a dance form but a practice of presence, trust, and radical togetherness.",
  },
];

aboutSettings.forEach((s) => {
  db.insert(schema.siteSettings).values(s).run();
});
console.log(`  ${aboutSettings.length} site settings seeded`);

console.log("Done!");
sqlite.close();
