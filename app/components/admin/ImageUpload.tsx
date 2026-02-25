import { useState, useRef, type DragEvent, type ChangeEvent } from "react";

interface ImageUploadProps {
  name: string;
  currentSrc?: string;
  required?: boolean;
}

export function ImageUpload({ name, currentSrc, required }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragover, setDragover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragover(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
      if (inputRef.current) {
        const dt = new DataTransfer();
        dt.items.add(file);
        inputRef.current.files = dt.files;
      }
    }
  }

  const displaySrc = preview || currentSrc;

  return (
    <div>
      {displaySrc ? (
        <div
          className="relative group cursor-pointer rounded-lg overflow-hidden"
          onClick={() => inputRef.current?.click()}
        >
          <img
            src={displaySrc}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-brand-charcoal/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white font-medium text-sm">Click to replace</span>
          </div>
        </div>
      ) : (
        <div
          className={`image-upload-zone ${dragover ? "dragover" : ""}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragover(true); }}
          onDragLeave={() => setDragover(false)}
          onDrop={handleDrop}
        >
          <svg className="mx-auto h-10 w-10 text-brand-warmGray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mt-2 text-sm text-brand-warmGray">
            Drag & drop an image, or <span className="text-brand-terracotta font-medium">browse</span>
          </p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept="image/*"
        required={required && !currentSrc}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
