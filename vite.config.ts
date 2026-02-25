import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import express from "express";
import type { Plugin } from "vite";

function serveUploads(): Plugin {
  const UPLOAD_DIR = process.env.UPLOAD_DIR || "./data/uploads";
  return {
    name: "serve-uploads",
    configureServer(server) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      server.middlewares.use("/uploads", express.static(UPLOAD_DIR) as any);
    },
  };
}

export default defineConfig({
  plugins: [tailwindcss(), serveUploads(), reactRouter(), tsconfigPaths()],
  ssr: {
    noExternal: ["gsap", "@gsap/react"],
  },
});
