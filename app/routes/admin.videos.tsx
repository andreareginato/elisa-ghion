import { Link } from "react-router";
import type { Route } from "./+types/admin.videos";
import { getAllVideos } from "~/db/queries.server";

export async function loader({ request }: Route.LoaderArgs) {
  const videos = await getAllVideos();
  return { videos };
}

export default function AdminVideos({ loaderData }: Route.ComponentProps) {
  const { videos } = loaderData;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Videos</h1>
        <Link
          to="/admin/videos/new"
          className="bg-brand-terracotta text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Add Video
        </Link>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Embed URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sort Order
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {videos.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No videos found. Create your first video.
                </td>
              </tr>
            ) : (
              videos.map((video) => (
                <tr key={video.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {video.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {video.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {video.embedUrl}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {video.sortOrder}
                  </td>
                  <td className="px-6 py-4 text-sm text-right space-x-4">
                    <Link
                      to={`/admin/videos/${video.id}/edit`}
                      className="text-brand-terracotta hover:text-opacity-80"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/admin/videos/${video.id}/delete`}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
