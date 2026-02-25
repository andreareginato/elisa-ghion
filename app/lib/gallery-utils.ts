export type GalleryCategory = "workshops" | "performances" | "jams" | "portraits";

export type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  span: string;
  sortOrder: number;
};
