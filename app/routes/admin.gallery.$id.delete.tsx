import { redirect } from "react-router";
import { Form, Link } from "react-router";
import type { Route } from "./+types/admin.gallery.$id.delete";
import { getGalleryItem, deleteGalleryItem } from "~/db/queries.server";
import { deleteUpload } from "~/lib/uploads.server";

export async function loader({ params }: Route.LoaderArgs) {
  const id = parseInt(params.id, 10);
  const item = await getGalleryItem(id);

  if (!item) {
    throw new Response("Not Found", { status: 404 });
  }

  return { item };
}

export async function action({ params }: Route.ActionArgs) {
  const id = parseInt(params.id, 10);
  const item = await getGalleryItem(id);

  if (!item) {
    throw new Response("Not Found", { status: 404 });
  }

  // Delete the uploaded file
  if (item.src) {
    deleteUpload(item.src);
  }

  // Delete the database record
  await deleteGalleryItem(id);

  return redirect("/admin/gallery");
}

export default function DeleteGalleryItem({ loaderData }: Route.ComponentProps) {
  const { item } = loaderData;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Delete Gallery Image</h1>
        <Link
          to="/admin/gallery"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Back to Gallery
        </Link>
      </div>

      <div className="bg-white rounded-xl border p-6">
        <div className="space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-medium">
              Are you sure you want to delete this gallery image?
            </p>
            <p className="text-red-600 text-sm mt-1">
              This action cannot be undone. The image file will be permanently deleted.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image to Delete
            </label>
            <div className="w-64 h-64 border border-gray-300 rounded-lg overflow-hidden">
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Alt Text:</span> {item.alt}
            </p>
            {item.caption && (
              <p className="text-sm text-gray-700">
                <span className="font-medium">Caption:</span> {item.caption}
              </p>
            )}
            <p className="text-sm text-gray-700">
              <span className="font-medium">Category:</span>{" "}
              <span className="capitalize">{item.category}</span>
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Grid Span:</span> {item.span}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Sort Order:</span> {item.sortOrder}
            </p>
          </div>

          <Form method="post" className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Permanently
            </button>
            <Link
              to="/admin/gallery"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
}
