import { Form, redirect, Link } from "react-router";
import type { Route } from "./+types/admin.collaborations.$id.edit";
import { getCollaboration, updateCollaboration } from "~/db/queries.server";
import { setToast } from "~/lib/toast.server";
import { saveUpload } from "~/lib/uploads.server";
import { AdminFormField } from "~/components/admin/AdminFormField";
import { ImageUpload } from "~/components/admin/ImageUpload";

export const handle = {
  breadcrumb: (data: any) => `Edit "${data.collaboration.name}"`,
};

export async function loader({ params }: Route.LoaderArgs) {
  const collaboration = await getCollaboration(parseInt(params.id));
  if (!collaboration) throw new Response("Not Found", { status: 404 });
  return { collaboration };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();

  let image = formData.get("existingImage") as string;
  const file = formData.get("image") as File;
  if (file && file.size > 0) {
    image = await saveUpload(file);
  }

  const name = formData.get("name") as string;
  const initials = (formData.get("initials") as string) || name.slice(0, 2).toUpperCase();

  await updateCollaboration(parseInt(params.id), {
    name,
    description: formData.get("description") as string,
    initials,
    website: formData.get("website") as string,
    category: "organization",
    image,
  });

  return redirect("/admin/collaborations", {
    headers: { "Set-Cookie": await setToast("Collaboration updated!", "success") },
  });
}

export default function EditCollaboration({ loaderData }: Route.ComponentProps) {
  const { collaboration } = loaderData;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-heading font-bold text-brand-charcoal mb-6">Edit Collaboration</h1>

      <div className="admin-card">
        <Form method="post" encType="multipart/form-data" className="space-y-4">
          <input type="hidden" name="existingImage" value={collaboration.image || ""} />

          <AdminFormField label="Name" htmlFor="name" required>
            <input type="text" id="name" name="name" required defaultValue={collaboration.name || ""} className="admin-input" />
          </AdminFormField>

          <AdminFormField label="Description" htmlFor="description">
            <textarea id="description" name="description" rows={4} defaultValue={collaboration.description || ""} className="admin-input" />
          </AdminFormField>

          <AdminFormField label="Initials" htmlFor="initials">
            <input type="text" id="initials" name="initials" maxLength={3} placeholder="Auto-generated from name if empty" defaultValue={collaboration.initials || ""} className="admin-input" />
          </AdminFormField>

          <AdminFormField label="Website" htmlFor="website">
            <input type="url" id="website" name="website" placeholder="https://example.com" defaultValue={collaboration.website || ""} className="admin-input" />
          </AdminFormField>

          <AdminFormField label="Image" htmlFor="image">
            <ImageUpload name="image" currentSrc={collaboration.image || undefined} />
          </AdminFormField>

          <div className="flex gap-4 pt-4 border-t border-brand-sand">
            <button type="submit" className="admin-btn-primary">Update Collaboration</button>
            <Link to="/admin/collaborations" className="admin-btn-secondary">Cancel</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
