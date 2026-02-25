import { eq, asc, max } from "drizzle-orm";
import { db } from "./index.server";
import * as schema from "./schema";
import type { Workshop, Testimonial } from "~/lib/workshop-utils";
import type { GalleryItem } from "~/lib/gallery-utils";

// ── Workshops ──────────────────────────────────────────

export function getAllWorkshopsWithTestimonials(): Workshop[] {
  const rows = db.select().from(schema.workshops).orderBy(asc(schema.workshops.sortOrder)).all();
  const allTestimonials = db.select().from(schema.testimonials).all();

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    longDescription: row.longDescription,
    highlights: row.highlights,
    startDate: row.startDate,
    endDate: row.endDate ?? undefined,
    dates: row.dates,
    location: row.location,
    externalUrl: row.externalUrl,
    image: row.image,
    format: row.format,
    schedule: row.schedule ?? undefined,
    period: row.period ?? undefined,
    testimonials: allTestimonials
      .filter((t) => t.workshopId === row.id)
      .map((t) => ({ quote: t.quote, name: t.name, year: t.year })),
  }));
}

export function getWorkshopWithTestimonials(id: string): Workshop | null {
  const row = db.select().from(schema.workshops).where(eq(schema.workshops.id, id)).get();
  if (!row) return null;

  const tRows = db.select().from(schema.testimonials).where(eq(schema.testimonials.workshopId, id)).all();

  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    longDescription: row.longDescription,
    highlights: row.highlights,
    startDate: row.startDate,
    endDate: row.endDate ?? undefined,
    dates: row.dates,
    location: row.location,
    externalUrl: row.externalUrl,
    image: row.image,
    format: row.format,
    schedule: row.schedule ?? undefined,
    period: row.period ?? undefined,
    testimonials: tRows.map((t) => ({ quote: t.quote, name: t.name, year: t.year })),
  };
}

// ── Gallery ────────────────────────────────────────────

export function getAllGalleryItems(): GalleryItem[] {
  return db.select().from(schema.galleryItems).orderBy(asc(schema.galleryItems.sortOrder)).all();
}

// ── Collaborations ─────────────────────────────────────

export function getAllCollaborations() {
  return db.select().from(schema.collaborations).orderBy(asc(schema.collaborations.sortOrder)).all();
}

// ── Research Areas ─────────────────────────────────────

export function getAllResearchAreas() {
  return db.select().from(schema.researchAreas).orderBy(asc(schema.researchAreas.sortOrder)).all();
}

// ── Videos ─────────────────────────────────────────────

export function getAllVideos() {
  return db.select().from(schema.videos).orderBy(asc(schema.videos.sortOrder)).all();
}

// ── Max Sort Order helpers ────────────────────────────

export function getMaxGallerySortOrder(): number {
  const result = db.select({ max: max(schema.galleryItems.sortOrder) }).from(schema.galleryItems).get();
  return result?.max ?? -1;
}

export function getMaxCollaborationSortOrder(): number {
  const result = db.select({ max: max(schema.collaborations.sortOrder) }).from(schema.collaborations).get();
  return result?.max ?? -1;
}

export function getMaxResearchSortOrder(): number {
  const result = db.select({ max: max(schema.researchAreas.sortOrder) }).from(schema.researchAreas).get();
  return result?.max ?? -1;
}

export function getMaxVideoSortOrder(): number {
  const result = db.select({ max: max(schema.videos.sortOrder) }).from(schema.videos).get();
  return result?.max ?? -1;
}

export function getMaxWorkshopSortOrder(): number {
  const result = db.select({ max: max(schema.workshops.sortOrder) }).from(schema.workshops).get();
  return result?.max ?? -1;
}

// ── CRUD: Workshops ────────────────────────────────────

export function insertWorkshop(data: typeof schema.workshops.$inferInsert) {
  return db.insert(schema.workshops).values(data).run();
}

export function updateWorkshop(id: string, data: Partial<typeof schema.workshops.$inferInsert>) {
  return db.update(schema.workshops).set(data).where(eq(schema.workshops.id, id)).run();
}

export function deleteWorkshop(id: string) {
  return db.delete(schema.workshops).where(eq(schema.workshops.id, id)).run();
}

// ── CRUD: Testimonials ─────────────────────────────────

export function insertTestimonial(data: typeof schema.testimonials.$inferInsert) {
  return db.insert(schema.testimonials).values(data).run();
}

export function deleteTestimonialsByWorkshop(workshopId: string) {
  return db.delete(schema.testimonials).where(eq(schema.testimonials.workshopId, workshopId)).run();
}

// ── CRUD: Gallery Items ────────────────────────────────

export function insertGalleryItem(data: typeof schema.galleryItems.$inferInsert) {
  return db.insert(schema.galleryItems).values(data).run();
}

export function getGalleryItem(id: number) {
  return db.select().from(schema.galleryItems).where(eq(schema.galleryItems.id, id)).get();
}

export function updateGalleryItem(id: number, data: Partial<typeof schema.galleryItems.$inferInsert>) {
  return db.update(schema.galleryItems).set(data).where(eq(schema.galleryItems.id, id)).run();
}

export function deleteGalleryItem(id: number) {
  return db.delete(schema.galleryItems).where(eq(schema.galleryItems.id, id)).run();
}

// ── CRUD: Collaborations ───────────────────────────────

export function insertCollaboration(data: typeof schema.collaborations.$inferInsert) {
  return db.insert(schema.collaborations).values(data).run();
}

export function getCollaboration(id: number) {
  return db.select().from(schema.collaborations).where(eq(schema.collaborations.id, id)).get();
}

export function updateCollaboration(id: number, data: Partial<typeof schema.collaborations.$inferInsert>) {
  return db.update(schema.collaborations).set(data).where(eq(schema.collaborations.id, id)).run();
}

export function deleteCollaboration(id: number) {
  return db.delete(schema.collaborations).where(eq(schema.collaborations.id, id)).run();
}

// ── CRUD: Research Areas ───────────────────────────────

export function insertResearchArea(data: typeof schema.researchAreas.$inferInsert) {
  return db.insert(schema.researchAreas).values(data).run();
}

export function getResearchArea(id: number) {
  return db.select().from(schema.researchAreas).where(eq(schema.researchAreas.id, id)).get();
}

export function updateResearchArea(id: number, data: Partial<typeof schema.researchAreas.$inferInsert>) {
  return db.update(schema.researchAreas).set(data).where(eq(schema.researchAreas.id, id)).run();
}

export function deleteResearchArea(id: number) {
  return db.delete(schema.researchAreas).where(eq(schema.researchAreas.id, id)).run();
}

// ── CRUD: Videos ───────────────────────────────────────

export function insertVideo(data: typeof schema.videos.$inferInsert) {
  return db.insert(schema.videos).values(data).run();
}

export function getVideo(id: number) {
  return db.select().from(schema.videos).where(eq(schema.videos.id, id)).get();
}

export function updateVideo(id: number, data: Partial<typeof schema.videos.$inferInsert>) {
  return db.update(schema.videos).set(data).where(eq(schema.videos.id, id)).run();
}

export function deleteVideo(id: number) {
  return db.delete(schema.videos).where(eq(schema.videos.id, id)).run();
}
