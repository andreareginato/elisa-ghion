export type GalleryCategory = "workshops" | "performances" | "jams" | "portraits";

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  span: string;
};
