import { redirect } from "react-router";
import { Form, Link } from "react-router";
import { insertWorkshop, insertTestimonial } from "~/db/queries.server";
import type { Route } from "./+types/admin.workshops.new";
import { useState } from "react";

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string;
  const description = formData.get("description") as string;
  const longDescription = formData.get("longDescription") as string;
  const highlightsText = formData.get("highlights") as string;
  const highlights = highlightsText.split("\n").filter(h => h.trim());
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const dates = formData.get("dates") as string;
  const location = formData.get("location") as string;
  const externalUrl = formData.get("externalUrl") as string;
  const image = formData.get("image") as string;
  const format = formData.get("format") as string;
  const schedule = formData.get("schedule") as string;
  const period = formData.get("period") as string;
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;

  await insertWorkshop({
    id,
    title,
    subtitle,
    description,
    longDescription,
    highlights,
    startDate,
    endDate: endDate || undefined,
    dates,
    location,
    externalUrl,
    image,
    format,
    schedule: schedule || undefined,
    period: period || undefined,
    sortOrder,
  });

  // Insert testimonials
  const testimonialCount = parseInt(formData.get("testimonialCount") as string) || 0;
  for (let i = 0; i < testimonialCount; i++) {
    const quote = formData.get(`testimonial_quote_${i}`) as string;
    const name = formData.get(`testimonial_name_${i}`) as string;
    const year = formData.get(`testimonial_year_${i}`) as string;

    if (quote && name) {
      await insertTestimonial({
        workshopId: id,
        quote,
        name,
        year: year || undefined,
      });
    }
  }

  return redirect("/admin/workshops");
}

export default function AdminWorkshopsNew() {
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [testimonials, setTestimonials] = useState([{ quote: "", name: "", year: "" }]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    setId(slugify(newTitle));
  };

  const addTestimonial = () => {
    setTestimonials([...testimonials, { quote: "", name: "", year: "" }]);
  };

  const removeTestimonial = (index: number) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };

  const updateTestimonial = (index: number, field: string, value: string) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    setTestimonials(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add Workshop</h1>
          <Link
            to="/admin/workshops"
            className="text-gray-600 hover:text-gray-900"
          >
            Back to Workshops
          </Link>
        </div>

        <Form method="post" className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-2">
              ID (slug)
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700 mb-2">
              Long Description
            </label>
            <textarea
              id="longDescription"
              name="longDescription"
              rows={6}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="highlights" className="block text-sm font-medium text-gray-700 mb-2">
              Highlights (one per line)
            </label>
            <textarea
              id="highlights"
              name="highlights"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                End Date (optional)
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="dates" className="block text-sm font-medium text-gray-700 mb-2">
              Dates (display text)
            </label>
            <input
              type="text"
              id="dates"
              name="dates"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="externalUrl" className="block text-sm font-medium text-gray-700 mb-2">
              External URL
            </label>
            <input
              type="url"
              id="externalUrl"
              name="externalUrl"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Image Path
            </label>
            <input
              type="text"
              id="image"
              name="image"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-2">
              Format
            </label>
            <select
              id="format"
              name="format"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
            >
              <option value="">Select format</option>
              <option value="weekend">Weekend</option>
              <option value="intensive">Intensive</option>
              <option value="weekly">Weekly</option>
              <option value="jam">Jam</option>
              <option value="performance">Performance</option>
            </select>
          </div>

          <div>
            <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 mb-2">
              Schedule (optional)
            </label>
            <input
              type="text"
              id="schedule"
              name="schedule"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="period" className="block text-sm font-medium text-gray-700 mb-2">
              Period (optional)
            </label>
            <input
              type="text"
              id="period"
              name="period"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mb-2">
              Sort Order
            </label>
            <input
              type="number"
              id="sortOrder"
              name="sortOrder"
              defaultValue="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
            />
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Testimonials</h3>
              <button
                type="button"
                onClick={addTestimonial}
                className="text-brand-terracotta hover:text-brand-terracotta/80 text-sm font-medium"
              >
                + Add Testimonial
              </button>
            </div>

            <input type="hidden" name="testimonialCount" value={testimonials.length} />

            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-700">Testimonial {index + 1}</span>
                    {testimonials.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTestimonial(index)}
                        className="text-red-600 hover:text-red-900 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quote
                      </label>
                      <textarea
                        name={`testimonial_quote_${index}`}
                        value={testimonial.quote}
                        onChange={(e) => updateTestimonial(index, "quote", e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          name={`testimonial_name_${index}`}
                          value={testimonial.name}
                          onChange={(e) => updateTestimonial(index, "name", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Year (optional)
                        </label>
                        <input
                          type="text"
                          name={`testimonial_year_${index}`}
                          value={testimonial.year}
                          onChange={(e) => updateTestimonial(index, "year", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t">
            <Link
              to="/admin/workshops"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-brand-terracotta text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
            >
              Create Workshop
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
