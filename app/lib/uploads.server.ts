import { writeFileSync, unlinkSync, existsSync, mkdirSync } from "fs";
import { join, extname } from "path";
import { randomUUID } from "crypto";

const UPLOAD_DIR = process.env.UPLOAD_DIR || "./data/uploads";

export async function saveUpload(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return saveUploadFromBuffer(buffer, file.name);
}

export function saveUploadFromBuffer(buffer: Buffer, originalName: string): string {
  mkdirSync(UPLOAD_DIR, { recursive: true });
  const ext = extname(originalName) || ".jpg";
  const filename = `${randomUUID()}${ext}`;
  const filepath = join(UPLOAD_DIR, filename);
  writeFileSync(filepath, buffer);
  return `/uploads/${filename}`;
}

/**
 * Detect image dimensions from a PNG/JPEG file buffer.
 * Returns { width, height } or null if unrecognized format.
 */
export function getImageDimensions(buffer: Buffer): { width: number; height: number } | null {
  // PNG: bytes 16-23 contain width (4 bytes) and height (4 bytes) in the IHDR chunk
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height };
  }

  // JPEG: scan for SOF0 (0xFFC0) or SOF2 (0xFFC2) marker
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length - 8) {
      if (buffer[offset] !== 0xff) break;
      const marker = buffer[offset + 1];
      if (marker === 0xc0 || marker === 0xc2) {
        const height = buffer.readUInt16BE(offset + 5);
        const width = buffer.readUInt16BE(offset + 7);
        return { width, height };
      }
      const segLen = buffer.readUInt16BE(offset + 2);
      offset += 2 + segLen;
    }
  }

  return null;
}

/**
 * Suggest a grid span based on image aspect ratio.
 * Returns a picker value like "1x1", "2x1", "1x2", or "2x2".
 */
export function suggestSpanFromDimensions(width: number, height: number): string {
  const ratio = width / height;
  if (ratio > 1.6) return "2x1";      // wide landscape
  if (ratio < 0.65) return "1x2";     // tall portrait
  if (width > 1600 && height > 1200) return "2x2"; // large image, feature it
  return "1x1";                        // roughly square
}

export function deleteUpload(path: string): void {
  if (!path.startsWith("/uploads/")) return;
  const filename = path.replace("/uploads/", "");
  const filepath = join(UPLOAD_DIR, filename);
  if (existsSync(filepath)) {
    unlinkSync(filepath);
  }
}
