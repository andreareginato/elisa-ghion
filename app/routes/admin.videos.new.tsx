import { Form, redirect, Link } from "react-router";
import type { Route } from "./+types/admin.videos.new";
import { insertVideo } from "~/db/queries.server";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    embedUrl: formData.get("embedUrl") as string,
    thumbnail: formData.get("thumbnail") as string,
    category: formData.get("category") as "performance" | "workshop" | "interview",
    sortOrder: parseInt(formData.get("sortOrder") as string) || 0,
  };

  await insertVideo(data);
  return redirect("/admin/videos");
}

export default function NewVideo() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <Link
          to="/admin/videos"
          className="text-brand-terracotta hover:text-opacity-80 text-sm"
        >
          &larr; Back to Videos
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Video</h1>

      <Form method="post" className="bg-white rounded-xl border p-6 space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
          />
        </div>

        <div>
          <label htmlFor="embedUrl" className="block text-sm font-medium text-gray-700 mb-2">
            Embed URL
          </label>
          <input
            type="url"
            id="embedUrl"
            name="embedUrl"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
          />
        </div>

        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-2">
            Thumbnail URL
          </label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
          >
            <option value="">Select a category</option>
            <option value="performance">Performance</option>
            <option value="workshop">Workshop</option>
            <option value="interview">Interview</option>
          </select>
        </div>

        <div>
          <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mb-2">
            Sort Order
          </label>
          <input
            type="number"
            id="sortOrder"
            name="sortOrder"
            defaultValue={0}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-brand-terracotta text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Create Video
          </button>
          <Link
            to="/admin/videos"
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </Form>
    </div>
  );
}
