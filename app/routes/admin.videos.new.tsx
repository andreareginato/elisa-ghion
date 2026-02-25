import { Form, redirect, Link } from "react-router";
import type { Route } from "./+types/admin.videos.new";
import { insertVideo, getMaxVideoSortOrder } from "~/db/queries.server";
import { setToast } from "~/lib/toast.server";
import { saveUpload } from "~/lib/uploads.server";
import { AdminFormField } from "~/components/admin/AdminFormField";
import { ImageUpload } from "~/components/admin/ImageUpload";
import { VideoEmbedPreview } from "~/components/admin/VideoEmbedPreview";
import { useState } from "react";

export const handle = { breadcrumb: "New Video" };

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  let thumbnail = "";
  const file = formData.get("thumbnail") as File;
  if (file && file.size > 0) {
    thumbnail = await saveUpload(file);
  }

  await insertVideo({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    embedUrl: formData.get("embedUrl") as string,
    thumbnail,
    category: formData.get("category") as "performance" | "workshop" | "interview",
    sortOrder: getMaxVideoSortOrder() + 1,
  });

  return redirect("/admin/videos", {
    headers: { "Set-Cookie": await setToast("Video created!", "success") },
  });
}

export default function NewVideo() {
  const [embedUrl, setEmbedUrl] = useState("");

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-heading font-bold text-brand-charcoal mb-6">Add Video</h1>

      <div className="admin-card">
        <Form method="post" encType="multipart/form-data" className="space-y-6">
          <AdminFormField label="Title" htmlFor="title" required>
            <input type="text" id="title" name="title" required className="admin-input" />
          </AdminFormField>

          <AdminFormField label="Description" htmlFor="description">
            <textarea id="description" name="description" rows={4} className="admin-input" />
          </AdminFormField>

          <AdminFormField label="Embed URL" htmlFor="embedUrl" required>
            <input type="url" id="embedUrl" name="embedUrl" required value={embedUrl} onChange={e => setEmbedUrl(e.target.value)} className="admin-input" />
            <VideoEmbedPreview url={embedUrl} />
          </AdminFormField>

          <AdminFormField label="Thumbnail" htmlFor="thumbnail">
            <ImageUpload name="thumbnail" />
          </AdminFormField>

          <AdminFormField label="Category" htmlFor="category" required>
            <select id="category" name="category" required className="admin-input">
              <option value="">Select a category</option>
              <option value="performance">Performance</option>
              <option value="workshop">Workshop</option>
              <option value="interview">Interview</option>
            </select>
          </AdminFormField>

          <div className="flex gap-4 pt-4 border-t border-brand-sand">
            <button type="submit" className="admin-btn-primary">Create Video</button>
            <Link to="/admin/videos" className="admin-btn-secondary">Cancel</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
