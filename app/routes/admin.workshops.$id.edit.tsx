import { redirect } from "react-router";
import { Form, Link } from "react-router";
import { getWorkshopWithTestimonials, updateWorkshop, deleteTestimonialsByWorkshop, insertTestimonial } from "~/db/queries.server";
import { setToast } from "~/lib/toast.server";
import { saveUpload } from "~/lib/uploads.server";
import { formatDateRange } from "~/lib/date-utils";
import { AdminFormField } from "~/components/admin/AdminFormField";
import { ImageUpload } from "~/components/admin/ImageUpload";
import { CollapsibleSection } from "~/components/admin/CollapsibleSection";
import { ContentPreview } from "~/components/admin/ContentPreview";
import type { Route } from "./+types/admin.workshops.$id.edit";
import { useState } from "react";
import type { Workshop } from "~/lib/workshop-utils";

export const handle = {
  breadcrumb: (data: any) => `Edit "${data.workshop.title}"`,
};

export async function loader({ params }: Route.LoaderArgs) {
  const workshop = await getWorkshopWithTestimonials(params.id);
  if (!workshop) throw new Response("Workshop not found", { status: 404 });
  return { workshop };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string;
  const description = formData.get("description") as string;
  const longDescription = formData.get("longDescription") as string;
  const highlightsText = formData.get("highlights") as string;
  const highlights = highlightsText.split("\n").filter(h => h.trim());
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const dates = formatDateRange(startDate, endDate);
  const location = formData.get("location") as string;
  const externalUrl = formData.get("externalUrl") as string;
  const format = formData.get("format") as string;
  const schedule = formData.get("schedule") as string;
  const period = formData.get("period") as string;

  let image = formData.get("existingImage") as string;
  const file = formData.get("image") as File;
  if (file && file.size > 0) {
    image = await saveUpload(file);
  }

  await updateWorkshop(params.id, {
    title, subtitle, description, longDescription, highlights,
    startDate, endDate: endDate || undefined, dates, location, externalUrl,
    image, format: format as Workshop["format"], schedule: schedule || undefined, period: period || undefined,
  });

  await deleteTestimonialsByWorkshop(params.id);
  const testimonialCount = parseInt(formData.get("testimonialCount") as string) || 0;
  for (let i = 0; i < testimonialCount; i++) {
    const quote = formData.get(`testimonial_quote_${i}`) as string;
    const name = formData.get(`testimonial_name_${i}`) as string;
    const year = formData.get(`testimonial_year_${i}`) as string;
    if (quote && name) {
      await insertTestimonial({ workshopId: params.id, quote, name, year: year || "" });
    }
  }

  return redirect("/admin/workshops", {
    headers: { "Set-Cookie": await setToast("Workshop updated!", "success") },
  });
}

export default function AdminWorkshopsEdit({ loaderData }: Route.ComponentProps) {
  const { workshop } = loaderData;

  const [title, setTitle] = useState(workshop.title);
  const [subtitle, setSubtitle] = useState(workshop.subtitle);
  const [description, setDescription] = useState(workshop.description);
  const [highlights, setHighlights] = useState(workshop.highlights.join("\n"));
  const [format, setFormat] = useState(workshop.format);
  const [showPreview, setShowPreview] = useState(false);
  const [testimonials, setTestimonials] = useState(
    workshop.testimonials && workshop.testimonials.length > 0
      ? workshop.testimonials.map(t => ({ quote: t.quote, name: t.name, year: t.year || "" }))
      : [{ quote: "", name: "", year: "" }]
  );

  const addTestimonial = () => setTestimonials([...testimonials, { quote: "", name: "", year: "" }]);
  const removeTestimonial = (index: number) => setTestimonials(testimonials.filter((_, i) => i !== index));
  const updateTestimonial = (index: number, field: string, value: string) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    setTestimonials(updated);
  };

  const previewData = {
    title, subtitle, description, image: workshop.image,
    highlights: highlights.split("\n").filter(h => h.trim()),
    testimonials: testimonials.filter(t => t.quote && t.name),
  };

  const formContent = (
    <Form method="post" encType="multipart/form-data" className="space-y-6">
      <input type="hidden" name="existingImage" value={workshop.image} />

      <CollapsibleSection title="Basic Info" defaultOpen>
        <AdminFormField label="Title" htmlFor="title" required>
          <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="admin-input" />
        </AdminFormField>
        <AdminFormField label="Subtitle" htmlFor="subtitle" required>
          <input type="text" id="subtitle" name="subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} required className="admin-input" />
        </AdminFormField>
        <AdminFormField label="Format" htmlFor="format" required>
          <select id="format" name="format" value={format} onChange={e => setFormat(e.target.value as any)} required className="admin-input">
            <option value="">Select format</option>
            <option value="weekend">Weekend</option>
            <option value="intensive">Intensive</option>
            <option value="weekly">Weekly</option>
            <option value="jam">Jam</option>
            <option value="performance">Performance</option>
          </select>
        </AdminFormField>
      </CollapsibleSection>

      <CollapsibleSection title="Description">
        <AdminFormField label="Description" htmlFor="description" required>
          <textarea id="description" name="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required className="admin-input" />
        </AdminFormField>
        <AdminFormField label="Long Description" htmlFor="longDescription" required>
          <textarea id="longDescription" name="longDescription" rows={6} defaultValue={workshop.longDescription} required className="admin-input" />
        </AdminFormField>
        <AdminFormField label="Highlights (one per line)" htmlFor="highlights">
          <textarea id="highlights" name="highlights" rows={4} value={highlights} onChange={(e) => setHighlights(e.target.value)} className="admin-input" />
        </AdminFormField>
      </CollapsibleSection>

      <CollapsibleSection title="Schedule">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AdminFormField label="Start Date" htmlFor="startDate" required>
            <input type="date" id="startDate" name="startDate" defaultValue={workshop.startDate} required className="admin-input" />
          </AdminFormField>
          <AdminFormField label="End Date (optional)" htmlFor="endDate">
            <input type="date" id="endDate" name="endDate" defaultValue={workshop.endDate || ""} className="admin-input" />
          </AdminFormField>
        </div>
        <p className="text-xs text-brand-warmGray">Display dates are auto-generated from start/end dates.</p>
        <AdminFormField label="Location" htmlFor="location" required>
          <input type="text" id="location" name="location" defaultValue={workshop.location} required className="admin-input" />
        </AdminFormField>
        {format === "weekly" && (
          <>
            <AdminFormField label="Schedule" htmlFor="schedule" required>
              <input type="text" id="schedule" name="schedule" defaultValue={workshop.schedule || ""} placeholder="e.g. Tuesday, 19:00–21:00" className="admin-input" />
            </AdminFormField>
            <AdminFormField label="Period" htmlFor="period" required>
              <input type="text" id="period" name="period" defaultValue={workshop.period || ""} placeholder="e.g. October 2025 – June 2026" className="admin-input" />
            </AdminFormField>
          </>
        )}
      </CollapsibleSection>

      <CollapsibleSection title="Media & Links">
        <AdminFormField label="Image" htmlFor="image">
          <ImageUpload name="image" currentSrc={workshop.image} />
        </AdminFormField>
        <AdminFormField label="External URL" htmlFor="externalUrl" required>
          <input type="url" id="externalUrl" name="externalUrl" defaultValue={workshop.externalUrl} required className="admin-input" />
        </AdminFormField>
      </CollapsibleSection>

      <CollapsibleSection title="Testimonials">
        <input type="hidden" name="testimonialCount" value={testimonials.length} />
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="border border-brand-sand rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-medium text-brand-charcoal">Testimonial {index + 1}</span>
                {testimonials.length > 1 && (
                  <button type="button" onClick={() => removeTestimonial(index)} className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                )}
              </div>
              <div className="space-y-3">
                <AdminFormField label="Quote">
                  <textarea name={`testimonial_quote_${index}`} value={testimonial.quote} onChange={(e) => updateTestimonial(index, "quote", e.target.value)} rows={2} className="admin-input" />
                </AdminFormField>
                <div className="grid grid-cols-2 gap-3">
                  <AdminFormField label="Name">
                    <input type="text" name={`testimonial_name_${index}`} value={testimonial.name} onChange={(e) => updateTestimonial(index, "name", e.target.value)} className="admin-input" />
                  </AdminFormField>
                  <AdminFormField label="Year (optional)">
                    <input type="text" name={`testimonial_year_${index}`} value={testimonial.year} onChange={(e) => updateTestimonial(index, "year", e.target.value)} className="admin-input" />
                  </AdminFormField>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addTestimonial} className="mt-3 text-brand-terracotta hover:text-brand-terracottaLight text-sm font-medium">
          + Add Testimonial
        </button>
      </CollapsibleSection>

      <div className="flex justify-end gap-4 pt-6 border-t border-brand-sand">
        <Link to="/admin/workshops" className="admin-btn-secondary">Cancel</Link>
        <button type="submit" className="admin-btn-primary">Update Workshop</button>
      </div>
    </Form>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-heading font-bold text-brand-charcoal">Edit Workshop</h1>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="lg:hidden admin-btn-secondary text-sm"
        >
          {showPreview ? "Show Form" : "Preview"}
        </button>
      </div>

      <div className="flex gap-6">
        <div className={`flex-1 min-w-0 ${showPreview ? "hidden lg:block" : ""}`}>
          <div className="admin-card">
            {formContent}
          </div>
        </div>
        <div className={`w-full lg:w-[380px] shrink-0 ${showPreview ? "" : "hidden lg:block"}`}>
          <div className="sticky top-6">
            <ContentPreview type="workshop" data={previewData} />
          </div>
        </div>
      </div>
    </div>
  );
}
