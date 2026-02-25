import { redirect } from "react-router";
import { Form, Link } from "react-router";
import type { Route } from "./+types/admin.gallery.$id.delete";
import { getGalleryItem, deleteGalleryItem } from "~/db/queries.server";
import { deleteUpload } from "~/lib/uploads.server";
import { setToast } from "~/lib/toast.server";

export const handle = { breadcrumb: "Delete Image" };

export async function loader({ params }: Route.LoaderArgs) {
  const id = parseInt(params.id, 10);
  const item = await getGalleryItem(id);
  if (!item) throw new Response("Not Found", { status: 404 });
  return { item };
}

export async function action({ params }: Route.ActionArgs) {
  const id = parseInt(params.id, 10);
  const item = await getGalleryItem(id);
  if (!item) throw new Response("Not Found", { status: 404 });

  if (item.src) deleteUpload(item.src);
  await deleteGalleryItem(id);

  return redirect("/admin/gallery", {
    headers: { "Set-Cookie": await setToast("Gallery image deleted!", "success") },
  });
}

export default function DeleteGalleryItem({ loaderData }: Route.ComponentProps) {
  const { item } = loaderData;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-heading font-bold text-brand-charcoal">Delete Gallery Image</h1>
        <Link to="/admin/gallery" className="text-brand-warmGray hover:text-brand-charcoal transition-colors">
          Back to Gallery
        </Link>
      </div>

      <div className="admin-card space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-medium">Are you sure you want to delete this gallery image?</p>
          <p className="text-red-600 text-sm mt-1">This action cannot be undone. The image file will be permanently deleted.</p>
        </div>

        <div className="w-64 h-64 border border-brand-sand rounded-lg overflow-hidden">
          <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-1 text-sm text-brand-charcoal">
          <p><span className="font-medium">Alt Text:</span> {item.alt}</p>
          {item.caption && <p><span className="font-medium">Caption:</span> {item.caption}</p>}
          <p><span className="font-medium">Category:</span> <span className="capitalize">{item.category}</span></p>
          <p><span className="font-medium">Grid Span:</span> {item.span}</p>
          <p><span className="font-medium">Sort Order:</span> {item.sortOrder}</p>
        </div>

        <Form method="post" className="flex gap-4 pt-4">
          <button type="submit" className="bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium">
            Delete Permanently
          </button>
          <Link to="/admin/gallery" className="admin-btn-secondary">Cancel</Link>
        </Form>
      </div>
    </div>
  );
}
