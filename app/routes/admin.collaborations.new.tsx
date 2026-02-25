import { Form, redirect, Link } from "react-router";
import type { Route } from "./+types/admin.collaborations.new";
import { insertCollaboration, getMaxCollaborationSortOrder } from "~/db/queries.server";
import { setToast } from "~/lib/toast.server";
import { saveUpload } from "~/lib/uploads.server";
import { AdminFormField } from "~/components/admin/AdminFormField";
import { ImageUpload } from "~/components/admin/ImageUpload";

export const handle = { breadcrumb: "New Collaboration" };

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  let image = "";
  const file = formData.get("image") as File;
  if (file && file.size > 0) {
    image = await saveUpload(file);
  }

  const name = formData.get("name") as string;
  const initials = (formData.get("initials") as string) || name.slice(0, 2).toUpperCase();

  await insertCollaboration({
    name,
    description: formData.get("description") as string,
    initials,
    website: formData.get("website") as string,
    category: "organization",
    image,
    sortOrder: getMaxCollaborationSortOrder() + 1,
  });

  return redirect("/admin/collaborations", {
    headers: { "Set-Cookie": await setToast("Collaboration created!", "success") },
  });
}

export default function NewCollaboration() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-heading font-bold text-brand-charcoal mb-6">Add Collaboration</h1>

      <div className="admin-card">
        <Form method="post" encType="multipart/form-data" className="space-y-4">
          <AdminFormField label="Name" htmlFor="name" required>
            <input type="text" id="name" name="name" required className="admin-input" />
          </AdminFormField>

          <AdminFormField label="Description" htmlFor="description">
            <textarea id="description" name="description" rows={4} className="admin-input" />
          </AdminFormField>

          <AdminFormField label="Initials" htmlFor="initials">
            <input type="text" id="initials" name="initials" maxLength={3} placeholder="Auto-generated from name if empty" className="admin-input" />
          </AdminFormField>

          <AdminFormField label="Website" htmlFor="website">
            <input type="url" id="website" name="website" placeholder="https://example.com" className="admin-input" />
          </AdminFormField>

          <AdminFormField label="Image" htmlFor="image">
            <ImageUpload name="image" />
          </AdminFormField>

          <div className="flex gap-4 pt-4 border-t border-brand-sand">
            <button type="submit" className="admin-btn-primary">Create Collaboration</button>
            <Link to="/admin/collaborations" className="admin-btn-secondary">Cancel</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
