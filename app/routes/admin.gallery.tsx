import { Link } from "react-router";
import type { Route } from "./+types/admin.gallery";
import { getAllGalleryItems } from "~/db/queries.server";
import { AdminPageHeader } from "~/components/admin/AdminPageHeader";
import { SortableList } from "~/components/admin/SortableList";

export const handle = { breadcrumb: "Gallery" };

export async function loader(_args: Route.LoaderArgs) {
  const items = await getAllGalleryItems();
  return { items };
}

export default function AdminGallery({ loaderData }: Route.ComponentProps) {
  const { items } = loaderData;

  return (
    <div>
      <AdminPageHeader title="Gallery" actionLabel="Add Image" actionTo="/admin/gallery/new" />

      <div className="admin-card">
        {items.length === 0 ? (
          <p className="text-brand-warmGray text-center py-8">
            No gallery items yet. Click "Add Image" to create one.
          </p>
        ) : (
          <SortableList
            items={items}
            reorderAction="/admin/gallery/reorder"
            renderItem={(item) => (
              <div className="flex items-center gap-4 py-2 px-4 bg-white rounded-lg border border-brand-sand/50 hover:border-brand-sand">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-16 h-16 object-cover rounded-lg shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-brand-charcoal truncate">{item.caption || item.alt}</p>
                  <p className="text-sm text-brand-warmGray capitalize">
                    {item.category} • Span: {item.span} • Sort: {item.sortOrder}
                  </p>
                </div>
                <div className="flex items-center gap-3 ml-4 shrink-0">
                  <Link to={`/admin/gallery/${item.id}/edit`} className="text-sm text-brand-terracotta hover:text-brand-terracottaLight">Edit</Link>
                  <Link to={`/admin/gallery/${item.id}/delete`} className="text-sm text-red-600 hover:text-red-800">Delete</Link>
                </div>
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
}
