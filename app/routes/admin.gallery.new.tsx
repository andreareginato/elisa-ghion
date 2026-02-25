import { redirect } from "react-router";
import { Form, Link } from "react-router";
import type { Route } from "./+types/admin.gallery.new";
import { insertGalleryItem, getMaxGallerySortOrder } from "~/db/queries.server";
import { saveUploadFromBuffer, getImageDimensions, suggestSpanFromDimensions } from "~/lib/uploads.server";
import { setToast } from "~/lib/toast.server";
import { AdminFormField } from "~/components/admin/AdminFormField";
import { ImageUpload } from "~/components/admin/ImageUpload";
import { GridSpanPicker } from "~/components/admin/GridSpanPicker";
import type { GalleryCategory } from "~/lib/gallery-utils";

export const handle = { breadcrumb: "New Image" };

const spanMap: Record<string, string> = {
  "1x1": "md:col-span-1 md:row-span-1",
  "2x1": "md:col-span-2 md:row-span-1",
  "1x2": "md:col-span-1 md:row-span-2",
  "2x2": "md:col-span-2 md:row-span-2",
};

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const file = formData.get("image") as File;
  if (!file || file.size === 0) throw new Error("Image file is required");

  const buffer = Buffer.from(await file.arrayBuffer());
  const src = await saveUploadFromBuffer(buffer, file.name);
  let spanValue = formData.get("span") as string;

  // Auto-detect span from image dimensions if set to "auto"
  if (!spanValue || spanValue === "auto") {
    const dims = getImageDimensions(buffer);
    spanValue = dims ? suggestSpanFromDimensions(dims.width, dims.height) : "1x1";
  }

  await insertGalleryItem({
    src,
    alt: formData.get("alt") as string,
    caption: formData.get("caption") as string,
    category: formData.get("category") as GalleryCategory,
    span: spanMap[spanValue] || spanValue,
    sortOrder: getMaxGallerySortOrder() + 1,
  });

  return redirect("/admin/gallery", {
    headers: { "Set-Cookie": await setToast("Gallery image added!", "success") },
  });
}

export default function NewGalleryItem() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-heading font-bold text-brand-charcoal mb-6">Add Gallery Image</h1>

      <div className="admin-card">
        <Form method="post" encType="multipart/form-data" className="space-y-6">
          <AdminFormField label="Image" htmlFor="image" required>
            <ImageUpload name="image" required />
          </AdminFormField>

          <AdminFormField label="Alt Text" htmlFor="alt" required>
            <input type="text" id="alt" name="alt" required placeholder="Descriptive text for accessibility" className="admin-input" />
          </AdminFormField>

          <AdminFormField label="Caption" htmlFor="caption">
            <input type="text" id="caption" name="caption" placeholder="Optional caption text" className="admin-input" />
          </AdminFormField>

          <AdminFormField label="Category" htmlFor="category" required>
            <select id="category" name="category" required className="admin-input">
              <option value="">Select a category</option>
              <option value="workshops">Workshops</option>
              <option value="performances">Performances</option>
              <option value="jams">Jams</option>
              <option value="portraits">Portraits</option>
            </select>
          </AdminFormField>

          <AdminFormField label="Grid Span" required>
            <GridSpanPicker name="span" />
          </AdminFormField>

          <div className="flex gap-4 pt-4 border-t border-brand-sand">
            <button type="submit" className="admin-btn-primary">Add Image</button>
            <Link to="/admin/gallery" className="admin-btn-secondary">Cancel</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
