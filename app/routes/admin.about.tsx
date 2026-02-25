import { redirect } from "react-router";
import type { Route } from "./+types/admin.about";
import { getAboutSettings, setSetting } from "~/db/queries.server";
import { setToast } from "~/lib/toast.server";
import { saveUpload } from "~/lib/uploads.server";
import { AdminFormField } from "~/components/admin/AdminFormField";
import { ImageUpload } from "~/components/admin/ImageUpload";

export const handle = { breadcrumb: "About" };

export async function loader(_args: Route.LoaderArgs) {
  return { settings: getAboutSettings() };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  // Text fields
  const bio = (formData.get("about_bio") as string) ?? "";
  const philosophy = (formData.get("about_philosophy") as string) ?? "";
  const philosophyQuote = (formData.get("about_philosophy_quote") as string) ?? "";

  setSetting("about_bio", bio);
  setSetting("about_philosophy", philosophy);
  setSetting("about_philosophy_quote", philosophyQuote);

  // Image fields
  const heroFile = formData.get("about_hero_image") as File;
  if (heroFile && heroFile.size > 0) {
    const path = await saveUpload(heroFile);
    setSetting("about_hero_image", path);
  }

  const profileFile = formData.get("about_profile_image") as File;
  if (profileFile && profileFile.size > 0) {
    const path = await saveUpload(profileFile);
    setSetting("about_profile_image", path);
  }

  return redirect("/admin/about", {
    headers: { "Set-Cookie": await setToast("About page updated!", "success") },
  });
}

export default function AdminAbout({ loaderData }: Route.ComponentProps) {
  const { settings } = loaderData;

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-brand-charcoal mb-6">About Page</h1>

      <div className="admin-card">
        <form method="post" encType="multipart/form-data" className="space-y-6">
          <AdminFormField label="Profile Image" htmlFor="about_profile_image" hint="Photo shown in the homepage About section">
            <ImageUpload name="about_profile_image" currentSrc={settings.about_profile_image || undefined} />
          </AdminFormField>

          <AdminFormField label="Hero Image" htmlFor="about_hero_image" hint="Banner image at the top of the About page">
            <ImageUpload name="about_hero_image" currentSrc={settings.about_hero_image || undefined} />
          </AdminFormField>

          <AdminFormField label="Bio" htmlFor="about_bio" hint="Separate paragraphs with a blank line">
            <textarea
              id="about_bio"
              name="about_bio"
              rows={12}
              defaultValue={settings.about_bio}
              className="admin-input"
            />
          </AdminFormField>

          <AdminFormField label="Teaching Philosophy" htmlFor="about_philosophy" hint="Separate paragraphs with a blank line">
            <textarea
              id="about_philosophy"
              name="about_philosophy"
              rows={10}
              defaultValue={settings.about_philosophy}
              className="admin-input"
            />
          </AdminFormField>

          <AdminFormField label="Philosophy Quote" htmlFor="about_philosophy_quote">
            <input
              type="text"
              id="about_philosophy_quote"
              name="about_philosophy_quote"
              defaultValue={settings.about_philosophy_quote}
              className="admin-input"
            />
          </AdminFormField>

          <div className="flex gap-4 pt-4 border-t border-brand-sand">
            <button type="submit" className="admin-btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
