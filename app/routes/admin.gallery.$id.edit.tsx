import { redirect } from "react-router";
import { Form, Link } from "react-router";
import type { Route } from "./+types/admin.gallery.$id.edit";
import { getGalleryItem, updateGalleryItem } from "~/db/queries.server";
import { saveUpload, deleteUpload } from "~/lib/uploads.server";
import { setToast } from "~/lib/toast.server";
import { AdminFormField } from "~/components/admin/AdminFormField";
import { ImageUpload } from "~/components/admin/ImageUpload";
import { GridSpanPicker } from "~/components/admin/GridSpanPicker";
import type { GalleryCategory } from "~/lib/gallery-utils";

export const handle = {
  breadcrumb: (data: any) => `Edit "${data.item.alt}"`,
};

const spanMap: Record<string, string> = {
  "1x1": "md:col-span-1 md:row-span-1",
  "2x1": "md:col-span-2 md:row-span-1",
  "1x2": "md:col-span-1 md:row-span-2",
  "2x2": "md:col-span-2 md:row-span-2",
};

export async function loader({ params }: Route.LoaderArgs) {
  const id = parseInt(params.id, 10);
  const item = await getGalleryItem(id);
  if (!item) throw new Response("Not Found", { status: 404 });
  return { item };
}

export async function action({ request, params }: Route.ActionArgs) {
  const id = parseInt(params.id, 10);
  const formData = await request.formData();

  const file = formData.get("image") as File;
  const currentSrc = formData.get("currentSrc") as string;
  let src = currentSrc;

  if (file && file.size > 0) {
    src = await saveUpload(file);
    if (currentSrc) deleteUpload(currentSrc);
  }

  const spanValue = formData.get("span") as string;

  await updateGalleryItem(id, {
    src,
    alt: formData.get("alt") as string,
    caption: formData.get("caption") as string,
    category: formData.get("category") as GalleryCategory,
    span: spanMap[spanValue] || spanValue,
  });

  return redirect("/admin/gallery", {
    headers: { "Set-Cookie": await setToast("Gallery image updated!", "success") },
  });
}

// Map the CSS span classes to picker values
function spanToPickerValue(span: string): string {
  if (span.includes("col-span-2") && span.includes("row-span-2")) return "2x2";
  if (span.includes("col-span-2")) return "2x1";
  if (span.includes("row-span-2")) return "1x2";
  return "1x1";
}

export default function EditGalleryItem({ loaderData }: Route.ComponentProps) {
  const { item } = loaderData;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-heading font-bold text-brand-charcoal mb-6">Edit Gallery Image</h1>

      <div className="admin-card">
        <Form method="post" encType="multipart/form-data" className="space-y-6">
          <input type="hidden" name="currentSrc" value={item.src} />

          <AdminFormField label="Image">
            <ImageUpload name="image" currentSrc={item.src} />
          </AdminFormField>

          <AdminFormField label="Alt Text" htmlFor="alt" required>
            <input type="text" id="alt" name="alt" required defaultValue={item.alt} className="admin-input" />
          </AdminFormField>

          <AdminFormField label="Caption" htmlFor="caption">
            <input type="text" id="caption" name="caption" defaultValue={item.caption || ""} className="admin-input" />
          </AdminFormField>

          <AdminFormField label="Category" htmlFor="category" required>
            <select id="category" name="category" required defaultValue={item.category} className="admin-input">
              <option value="">Select a category</option>
              <option value="workshops">Workshops</option>
              <option value="performances">Performances</option>
              <option value="jams">Jams</option>
              <option value="portraits">Portraits</option>
            </select>
          </AdminFormField>

          <AdminFormField label="Grid Span" required>
            <GridSpanPicker name="span" defaultValue={spanToPickerValue(item.span)} />
          </AdminFormField>

          <div className="flex gap-4 pt-4 border-t border-brand-sand">
            <button type="submit" className="admin-btn-primary">Save Changes</button>
            <Link to="/admin/gallery" className="admin-btn-secondary">Cancel</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
