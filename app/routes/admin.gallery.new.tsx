import { redirect } from "react-router";
import { Form, Link } from "react-router";
import type { Route } from "./+types/admin.gallery.new";
import { insertGalleryItem } from "~/db/queries.server";
import { saveUpload } from "~/lib/uploads.server";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const file = formData.get("image") as File;
  const alt = formData.get("alt") as string;
  const caption = formData.get("caption") as string;
  const category = formData.get("category") as string;
  const span = formData.get("span") as string;
  const sortOrder = parseInt(formData.get("sortOrder") as string, 10);

  if (!file || file.size === 0) {
    throw new Error("Image file is required");
  }

  const src = await saveUpload(file);

  await insertGalleryItem({
    src,
    alt,
    caption,
    category,
    span,
    sortOrder,
  });

  return redirect("/admin/gallery");
}

export default function NewGalleryItem() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Add Gallery Image</h1>
        <Link
          to="/admin/gallery"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Back to Gallery
        </Link>
      </div>

      <div className="bg-white rounded-xl border p-6">
        <Form method="post" encType="multipart/form-data" className="space-y-6">
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Image File *
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="alt" className="block text-sm font-medium text-gray-700 mb-2">
              Alt Text *
            </label>
            <input
              type="text"
              id="alt"
              name="alt"
              required
              placeholder="Descriptive text for accessibility"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-2">
              Caption
            </label>
            <input
              type="text"
              id="caption"
              name="caption"
              placeholder="Optional caption text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
            >
              <option value="">Select a category</option>
              <option value="workshops">Workshops</option>
              <option value="performances">Performances</option>
              <option value="jams">Jams</option>
              <option value="portraits">Portraits</option>
            </select>
          </div>

          <div>
            <label htmlFor="span" className="block text-sm font-medium text-gray-700 mb-2">
              Grid Span *
            </label>
            <select
              id="span"
              name="span"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
            >
              <option value="">Select grid span</option>
              <option value="md:col-span-1 md:row-span-1">1x1 (Standard)</option>
              <option value="md:col-span-2 md:row-span-1">2x1 (Wide)</option>
              <option value="md:col-span-1 md:row-span-2">1x2 (Tall)</option>
              <option value="md:col-span-2 md:row-span-2">2x2 (Large)</option>
            </select>
          </div>

          <div>
            <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mb-2">
              Sort Order *
            </label>
            <input
              type="number"
              id="sortOrder"
              name="sortOrder"
              required
              defaultValue="0"
              min="0"
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              Lower numbers appear first
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-brand-terracotta text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Add Image
            </button>
            <Link
              to="/admin/gallery"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
