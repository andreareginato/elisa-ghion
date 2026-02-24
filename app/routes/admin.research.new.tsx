import { redirect } from "react-router";
import type { Route } from "./+types/admin.research.new";
import { getAllWorkshopsWithTestimonials, insertResearchArea } from "~/db/queries.server";

export async function loader({ request }: Route.LoaderArgs) {
  const workshops = await getAllWorkshopsWithTestimonials();
  return { workshops };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const question = formData.get("question") as string;
  const description = formData.get("description") as string;
  const quote = formData.get("quote") as string;
  const influencesText = formData.get("influences") as string;
  const image = formData.get("image") as string;
  const sortOrder = parseInt(formData.get("sortOrder") as string, 10);

  // Parse influences (one per line)
  const influences = influencesText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  // Parse related workshops
  const selectedWorkshopIds = formData.getAll("relatedWorkshops") as string[];
  const allWorkshops = await getAllWorkshopsWithTestimonials();
  const relatedWorkshops = selectedWorkshopIds.map((id) => {
    const workshop = allWorkshops.find((w) => w.id === id);
    return {
      id,
      title: workshop?.title || "",
    };
  });

  await insertResearchArea({
    title,
    question,
    description,
    quote,
    influences,
    relatedWorkshops,
    image,
    sortOrder,
  });

  return redirect("/admin/research");
}

export default function NewResearchArea({ loaderData }: Route.ComponentProps) {
  const { workshops } = loaderData;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Add Research Area</h1>

      <form method="post" className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
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
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
            Question
          </label>
          <input
            type="text"
            id="question"
            name="question"
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
            rows={6}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
          />
        </div>

        <div>
          <label htmlFor="quote" className="block text-sm font-medium text-gray-700 mb-2">
            Quote
          </label>
          <textarea
            id="quote"
            name="quote"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
          />
        </div>

        <div>
          <label htmlFor="influences" className="block text-sm font-medium text-gray-700 mb-2">
            Influences (one per line)
          </label>
          <textarea
            id="influences"
            name="influences"
            rows={5}
            placeholder="Influence 1&#10;Influence 2&#10;Influence 3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Related Workshops
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3">
            {workshops.map((workshop) => (
              <div key={workshop.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`workshop-${workshop.id}`}
                  name="relatedWorkshops"
                  value={workshop.id}
                  className="h-4 w-4 text-brand-terracotta focus:ring-brand-terracotta border-gray-300 rounded"
                />
                <label
                  htmlFor={`workshop-${workshop.id}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {workshop.title}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
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
            required
            defaultValue={0}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-brand-terracotta text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
          >
            Create Research Area
          </button>
          <a
            href="/admin/research"
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
