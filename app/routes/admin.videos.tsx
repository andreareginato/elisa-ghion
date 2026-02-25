import { Link } from "react-router";
import type { Route } from "./+types/admin.videos";
import { getAllVideos } from "~/db/queries.server";
import { AdminPageHeader } from "~/components/admin/AdminPageHeader";
import { SortableList } from "~/components/admin/SortableList";

export const handle = { breadcrumb: "Videos" };

export async function loader({ request }: Route.LoaderArgs) {
  const videos = await getAllVideos();
  return { videos };
}

export default function AdminVideos({ loaderData }: Route.ComponentProps) {
  const { videos } = loaderData;

  return (
    <div>
      <AdminPageHeader title="Videos" actionLabel="Add Video" actionTo="/admin/videos/new" />

      <div className="admin-card">
        {videos.length === 0 ? (
          <p className="text-brand-warmGray text-center py-8">No videos found. Create your first video.</p>
        ) : (
          <SortableList
            items={videos}
            reorderAction="/admin/videos/reorder"
            renderItem={(video) => (
              <div className="flex items-center justify-between py-3 px-4 bg-white rounded-lg border border-brand-sand/50 hover:border-brand-sand">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-brand-charcoal">{video.title}</p>
                  <p className="text-sm text-brand-warmGray capitalize">{video.category} • Sort: {video.sortOrder}</p>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <Link to={`/admin/videos/${video.id}/edit`} className="text-sm text-brand-terracotta hover:text-brand-terracottaLight">Edit</Link>
                  <Link to={`/admin/videos/${video.id}/delete`} className="text-sm text-red-600 hover:text-red-800">Delete</Link>
                </div>
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
}
