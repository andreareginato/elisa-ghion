import { Form, redirect, Link } from "react-router";
import type { Route } from "./+types/admin.collaborations.$id.edit";
import { getCollaboration, updateCollaboration } from "~/db/queries.server";

export async function loader({ params }: Route.LoaderArgs) {
  const collaboration = await getCollaboration(parseInt(params.id));

  if (!collaboration) {
    throw new Response("Not Found", { status: 404 });
  }

  return { collaboration };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();

  const data = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    initials: formData.get("initials") as string,
    website: formData.get("website") as string,
    category: formData.get("category") as "festival" | "organization" | "school",
    image: formData.get("image") as string,
    sortOrder: parseInt(formData.get("sortOrder") as string) || 0,
  };

  await updateCollaboration(parseInt(params.id), data);
  return redirect("/admin/collaborations");
}

export default function EditCollaboration({ loaderData }: Route.ComponentProps) {
  const { collaboration } = loaderData;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Collaboration</h1>

      <div className="bg-white rounded-xl border p-6">
        <Form method="post" className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={collaboration.name || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={collaboration.description || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
            />
          </div>

          <div>
            <label htmlFor="initials" className="block text-sm font-medium text-gray-700 mb-1">
              Initials
            </label>
            <input
              type="text"
              id="initials"
              name="initials"
              defaultValue={collaboration.initials || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              placeholder="https://example.com"
              defaultValue={collaboration.website || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              defaultValue={collaboration.category || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
            >
              <option value="">Select a category</option>
              <option value="festival">Festival</option>
              <option value="organization">Organization</option>
              <option value="school">School</option>
            </select>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Image Path
            </label>
            <input
              type="text"
              id="image"
              name="image"
              placeholder="/images/collaborations/example.jpg"
              defaultValue={collaboration.image || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
            />
          </div>

          <div>
            <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mb-1">
              Sort Order
            </label>
            <input
              type="number"
              id="sortOrder"
              name="sortOrder"
              defaultValue={collaboration.sortOrder || 0}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-brand-terracotta text-white px-6 py-2 rounded-lg hover:bg-brand-terracotta/90"
            >
              Update Collaboration
            </button>
            <Link
              to="/admin/collaborations"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
