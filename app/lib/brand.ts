export const brand = {
  colors: {
    // Primary - rich, alive terracotta / coral
    terracotta: "#D4654A",
    terracottaLight: "#E8876E",
    coral: "#F0A08C",
    // Warm neutrals
    cream: "#FBF6F0",
    sand: "#F0E6D8",
    // Dark tones
    charcoal: "#1E1E1E",
    charcoalLight: "#3D3D3D",
    // Accents
    warmGray: "#9A8E84",
    gold: "#C9A96E",
    goldLight: "#E0C98F",
    rose: "#C46B7C",
    // Base
    white: "#FEFEFE",
    black: "#141414",
  },
  fonts: {
    heading: "'Playfair Display', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
  },
} as const;

export type BrandColors = typeof brand.colors;
