import { Form, redirect, Link } from "react-router";
import type { Route } from "./+types/admin.videos.$id.edit";
import { getVideo, updateVideo } from "~/db/queries.server";
import { setToast } from "~/lib/toast.server";
import { saveUpload } from "~/lib/uploads.server";
import { AdminFormField } from "~/components/admin/AdminFormField";
import { ImageUpload } from "~/components/admin/ImageUpload";
import { VideoEmbedPreview } from "~/components/admin/VideoEmbedPreview";
import { useState } from "react";

export const handle = {
  breadcrumb: (data: any) => `Edit "${data.video.title}"`,
};

export async function loader({ params }: Route.LoaderArgs) {
  const video = await getVideo(parseInt(params.id));
  if (!video) throw new Response("Not Found", { status: 404 });
  return { video };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();

  let thumbnail = formData.get("existingThumbnail") as string;
  const file = formData.get("thumbnail") as File;
  if (file && file.size > 0) {
    thumbnail = await saveUpload(file);
  }

  await updateVideo(parseInt(params.id), {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    embedUrl: formData.get("embedUrl") as string,
    thumbnail,
    category: formData.get("category") as "performance" | "workshop" | "interview",
  });

  return redirect("/admin/videos", {
    headers: { "Set-Cookie": await setToast("Video updated!", "success") },
  });
}

export default function EditVideo({ loaderData }: Route.ComponentProps) {
  const { video } = loaderData;
  const [embedUrl, setEmbedUrl] = useState(video.embedUrl);

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-heading font-bold text-brand-charcoal mb-6">Edit Video</h1>

      <div className="admin-card">
        <Form method="post" encType="multipart/form-data" className="space-y-6">
          <input type="hidden" name="existingThumbnail" value={video.thumbnail || ""} />

          <AdminFormField label="Title" htmlFor="title" required>
            <input type="text" id="title" name="title" required defaultValue={video.title} className="admin-input" />
          </AdminFormField>

          <AdminFormField label="Description" htmlFor="description">
            <textarea id="description" name="description" rows={4} defaultValue={video.description || ""} className="admin-input" />
          </AdminFormField>

          <AdminFormField label="Embed URL" htmlFor="embedUrl" required>
            <input type="url" id="embedUrl" name="embedUrl" required value={embedUrl} onChange={e => setEmbedUrl(e.target.value)} className="admin-input" />
            <VideoEmbedPreview url={embedUrl} />
          </AdminFormField>

          <AdminFormField label="Thumbnail" htmlFor="thumbnail">
            <ImageUpload name="thumbnail" currentSrc={video.thumbnail || undefined} />
          </AdminFormField>

          <AdminFormField label="Category" htmlFor="category" required>
            <select id="category" name="category" required defaultValue={video.category} className="admin-input">
              <option value="">Select a category</option>
              <option value="performance">Performance</option>
              <option value="workshop">Workshop</option>
              <option value="interview">Interview</option>
            </select>
          </AdminFormField>

          <div className="flex gap-4 pt-4 border-t border-brand-sand">
            <button type="submit" className="admin-btn-primary">Update Video</button>
            <Link to="/admin/videos" className="admin-btn-secondary">Cancel</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
