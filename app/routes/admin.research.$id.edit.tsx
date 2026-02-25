import { redirect } from "react-router";
import { Link } from "react-router";
import type { Route } from "./+types/admin.research.$id.edit";
import { getResearchArea, getAllWorkshopsWithTestimonials, updateResearchArea } from "~/db/queries.server";
import { setToast } from "~/lib/toast.server";
import { saveUpload } from "~/lib/uploads.server";
import { AdminFormField } from "~/components/admin/AdminFormField";
import { ImageUpload } from "~/components/admin/ImageUpload";
import { ContentPreview } from "~/components/admin/ContentPreview";
import { useState } from "react";

export const handle = {
  breadcrumb: (data: any) => `Edit "${data.researchArea.title}"`,
};

export async function loader({ params }: Route.LoaderArgs) {
  const id = parseInt(params.id, 10);
  const researchArea = await getResearchArea(id);
  if (!researchArea) throw new Response("Not Found", { status: 404 });
  const workshops = await getAllWorkshopsWithTestimonials();
  return { researchArea, workshops };
}

export async function action({ request, params }: Route.ActionArgs) {
  const id = parseInt(params.id, 10);
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const question = formData.get("question") as string;
  const description = formData.get("description") as string;
  const quote = formData.get("quote") as string;
  const influencesText = formData.get("influences") as string;

  let image = formData.get("existingImage") as string;
  const file = formData.get("image") as File;
  if (file && file.size > 0) {
    image = await saveUpload(file);
  }

  const influences = influencesText.split("\n").map(l => l.trim()).filter(l => l.length > 0);
  const selectedWorkshopIds = formData.getAll("relatedWorkshops") as string[];
  const allWorkshops = await getAllWorkshopsWithTestimonials();
  const relatedWorkshops = selectedWorkshopIds.map(wid => {
    const w = allWorkshops.find(w => w.id === wid);
    return { id: wid, title: w?.title || "" };
  });

  await updateResearchArea(id, { title, question, description, quote, influences, relatedWorkshops, image });

  return redirect("/admin/research", {
    headers: { "Set-Cookie": await setToast("Research area updated!", "success") },
  });
}

export default function EditResearchArea({ loaderData }: Route.ComponentProps) {
  const { researchArea, workshops } = loaderData;
  const influencesList = (researchArea.influences || []) as string[];
  const relatedWs = (researchArea.relatedWorkshops || []) as Array<{ id: string; title: string }>;
  const selectedWorkshopIds = new Set(relatedWs.map(w => w.id));

  const [title, setTitle] = useState(researchArea.title);
  const [question, setQuestion] = useState(researchArea.question);
  const [description, setDescription] = useState(researchArea.description);
  const [quote, setQuote] = useState(researchArea.quote || "");
  const [influences, setInfluences] = useState(influencesList.join("\n"));
  const [showPreview, setShowPreview] = useState(false);

  const previewData = {
    title, question, description, quote, image: researchArea.image,
    influences: influences.split("\n").filter(l => l.trim()),
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-heading font-bold text-brand-charcoal">Edit Research Area</h1>
        <button type="button" onClick={() => setShowPreview(!showPreview)} className="lg:hidden admin-btn-secondary text-sm">
          {showPreview ? "Show Form" : "Preview"}
        </button>
      </div>

      <div className="flex gap-6">
        <div className={`flex-1 min-w-0 ${showPreview ? "hidden lg:block" : ""}`}>
          <div className="admin-card">
            <form method="post" encType="multipart/form-data" className="space-y-6">
              <input type="hidden" name="existingImage" value={researchArea.image || ""} />

              <AdminFormField label="Title" htmlFor="title" required>
                <input type="text" id="title" name="title" required value={title} onChange={e => setTitle(e.target.value)} className="admin-input" />
              </AdminFormField>

              <AdminFormField label="Question" htmlFor="question" required>
                <input type="text" id="question" name="question" required value={question} onChange={e => setQuestion(e.target.value)} className="admin-input" />
              </AdminFormField>

              <AdminFormField label="Description" htmlFor="description" required>
                <textarea id="description" name="description" rows={6} required value={description} onChange={e => setDescription(e.target.value)} className="admin-input" />
              </AdminFormField>

              <AdminFormField label="Quote (optional)" htmlFor="quote">
                <textarea id="quote" name="quote" rows={3} value={quote} onChange={e => setQuote(e.target.value)} className="admin-input" />
              </AdminFormField>

              <AdminFormField label="Influences (one per line)" htmlFor="influences">
                <textarea id="influences" name="influences" rows={5} value={influences} onChange={e => setInfluences(e.target.value)} className="admin-input" />
              </AdminFormField>

              <AdminFormField label="Related Workshops">
                <div className="space-y-2 max-h-48 overflow-y-auto border border-brand-sand rounded-lg p-3">
                  {workshops.map(w => (
                    <div key={w.id} className="flex items-center">
                      <input type="checkbox" id={`workshop-${w.id}`} name="relatedWorkshops" value={w.id} defaultChecked={selectedWorkshopIds.has(w.id)} className="h-4 w-4 text-brand-terracotta focus:ring-brand-terracotta border-brand-sand rounded" />
                      <label htmlFor={`workshop-${w.id}`} className="ml-2 text-sm text-brand-charcoal">{w.title}</label>
                    </div>
                  ))}
                </div>
              </AdminFormField>

              <AdminFormField label="Image" htmlFor="image">
                <ImageUpload name="image" currentSrc={researchArea.image || undefined} />
              </AdminFormField>

              <div className="flex gap-4 pt-4 border-t border-brand-sand">
                <button type="submit" className="admin-btn-primary">Update Research Area</button>
                <Link to="/admin/research" className="admin-btn-secondary">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
        <div className={`w-full lg:w-[380px] shrink-0 ${showPreview ? "" : "hidden lg:block"}`}>
          <div className="sticky top-6">
            <ContentPreview type="research" data={previewData} />
          </div>
        </div>
      </div>
    </div>
  );
}
