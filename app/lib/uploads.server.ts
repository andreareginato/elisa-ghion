import { writeFileSync, unlinkSync, existsSync, mkdirSync } from "fs";
import { join, extname } from "path";
import { randomUUID } from "crypto";

const UPLOAD_DIR = process.env.UPLOAD_DIR || "./data/uploads";

export async function saveUpload(file: File): Promise<string> {
  mkdirSync(UPLOAD_DIR, { recursive: true });
  const ext = extname(file.name) || ".jpg";
  const filename = `${randomUUID()}${ext}`;
  const filepath = join(UPLOAD_DIR, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  writeFileSync(filepath, buffer);
  return `/uploads/${filename}`;
}

export function deleteUpload(path: string): void {
  if (!path.startsWith("/uploads/")) return;
  const filename = path.replace("/uploads/", "");
  const filepath = join(UPLOAD_DIR, filename);
  if (existsSync(filepath)) {
    unlinkSync(filepath);
  }
}
