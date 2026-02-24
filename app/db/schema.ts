import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const workshops = sqliteTable("workshops", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description").notNull(),
  highlights: text("highlights", { mode: "json" }).notNull().$type<string[]>(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  dates: text("dates").notNull(),
  location: text("location").notNull(),
  externalUrl: text("external_url").notNull().default(""),
  image: text("image").notNull(),
  format: text("format").notNull().$type<"weekend" | "intensive" | "weekly" | "jam" | "performance">(),
  schedule: text("schedule"),
  period: text("period"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const testimonials = sqliteTable("testimonials", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  workshopId: text("workshop_id")
    .notNull()
    .references(() => workshops.id, { onDelete: "cascade" }),
  quote: text("quote").notNull(),
  name: text("name").notNull(),
  year: text("year").notNull(),
});

export const galleryItems = sqliteTable("gallery_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  src: text("src").notNull(),
  alt: text("alt").notNull(),
  caption: text("caption").notNull(),
  category: text("category").notNull().$type<"workshops" | "performances" | "jams" | "portraits">(),
  span: text("span").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const collaborations = sqliteTable("collaborations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  initials: text("initials").notNull(),
  website: text("website").notNull(),
  category: text("category").notNull().$type<"festival" | "organization" | "school">(),
  image: text("image").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const researchAreas = sqliteTable("research_areas", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  question: text("question").notNull(),
  description: text("description").notNull(),
  quote: text("quote").notNull(),
  influences: text("influences", { mode: "json" }).notNull().$type<string[]>(),
  relatedWorkshops: text("related_workshops", { mode: "json" }).notNull().$type<{ title: string; id: string }[]>(),
  image: text("image").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const videos = sqliteTable("videos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  embedUrl: text("embed_url").notNull(),
  thumbnail: text("thumbnail").notNull(),
  category: text("category").notNull().$type<"performance" | "workshop" | "interview">(),
  sortOrder: integer("sort_order").notNull().default(0),
});
