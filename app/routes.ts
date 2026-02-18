import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("gallery", "routes/gallery.tsx"),
  route("workshops", "routes/workshops.tsx"),
  route("workshops/:id", "routes/workshop-detail.tsx"),
] satisfies RouteConfig;
