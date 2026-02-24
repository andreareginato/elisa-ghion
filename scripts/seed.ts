import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
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

console.log("Seeding database...");

// Clear all tables (order matters due to foreign keys)
db.delete(schema.testimonials).run();
db.delete(schema.workshops).run();
db.delete(schema.galleryItems).run();
db.delete(schema.collaborations).run();
db.delete(schema.researchAreas).run();
db.delete(schema.videos).run();

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

console.log("Done!");
sqlite.close();
