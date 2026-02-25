import { useState, useEffect } from "react";

interface VideoEmbedPreviewProps {
  url: string;
}

function isValidEmbedUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname.includes("youtube.com") ||
      parsed.hostname.includes("youtube-nocookie.com") ||
      parsed.hostname.includes("vimeo.com")
    );
  } catch {
    return false;
  }
}

export function VideoEmbedPreview({ url }: VideoEmbedPreviewProps) {
  const [debouncedUrl, setDebouncedUrl] = useState(url);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedUrl(url), 800);
    return () => clearTimeout(timer);
  }, [url]);

  if (!debouncedUrl || !isValidEmbedUrl(debouncedUrl)) {
    return (
      <div className="mt-3 rounded-lg border border-brand-sand bg-brand-sand/20 p-8 text-center">
        <svg className="mx-auto h-8 w-8 text-brand-warmGray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <p className="mt-2 text-sm text-brand-warmGray">
          Enter a YouTube or Vimeo embed URL to see preview
        </p>
      </div>
    );
  }

  return (
    <div className="mt-3 rounded-lg overflow-hidden border border-brand-sand">
      <div className="aspect-video">
        <iframe
          src={debouncedUrl}
          className="w-full h-full"
          allowFullScreen
          title="Video preview"
        />
      </div>
    </div>
  );
}
