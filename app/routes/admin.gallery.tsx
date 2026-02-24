import { Link } from "react-router";
import type { Route } from "./+types/admin.gallery";
import { getAllGalleryItems } from "~/db/queries.server";

export async function loader({ request }: Route.LoaderArgs) {
  const items = await getAllGalleryItems();
  return { items };
}

export default function AdminGallery({ loaderData }: Route.ComponentProps) {
  const { items } = loaderData;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
        <Link
          to="/admin/gallery/new"
          className="bg-brand-terracotta text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Add Image
        </Link>
      </div>

      <div className="bg-white rounded-xl border p-6">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No gallery items yet. Click "Add Image" to create one.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-gray-100">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {item.caption || item.alt}
                      </p>
                      <p className="text-sm text-gray-500 capitalize">
                        {item.category}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Sort: {item.sortOrder} • Span: {item.span}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Link
                      to={`/admin/gallery/${item.id}/edit`}
                      className="flex-1 text-center px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/admin/gallery/${item.id}/delete`}
                      className="flex-1 text-center px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
