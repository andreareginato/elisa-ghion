import { Link } from "react-router";
import {
  getAllWorkshopsWithTestimonials,
  getAllGalleryItems,
  getAllCollaborations,
  getAllResearchAreas,
  getAllVideos,
} from "~/db/queries.server";
import type { Route } from "./+types/admin.index";

export function loader() {
  return {
    counts: {
      workshops: getAllWorkshopsWithTestimonials().length,
      gallery: getAllGalleryItems().length,
      collaborations: getAllCollaborations().length,
      research: getAllResearchAreas().length,
      videos: getAllVideos().length,
    },
  };
}

const sections = [
  { label: "Workshops", to: "/admin/workshops", key: "workshops" as const },
  { label: "Gallery", to: "/admin/gallery", key: "gallery" as const },
  { label: "Collaborations", to: "/admin/collaborations", key: "collaborations" as const },
  { label: "Research Areas", to: "/admin/research", key: "research" as const },
  { label: "Videos", to: "/admin/videos", key: "videos" as const },
];

export default function AdminDashboard({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link
            key={s.key}
            to={s.to}
            className="bg-white p-6 rounded-xl border border-gray-200 hover:border-brand-terracotta/30 hover:shadow-md transition-all"
          >
            <p className="text-sm text-gray-500 font-medium">{s.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {loaderData.counts[s.key]}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
