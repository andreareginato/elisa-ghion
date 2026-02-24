import { Link } from "react-router";
import type { Route } from "./+types/admin.research";
import { getAllResearchAreas } from "~/db/queries.server";

export async function loader({ request }: Route.LoaderArgs) {
  const researchAreas = await getAllResearchAreas();
  return { researchAreas };
}

export default function AdminResearch({ loaderData }: Route.ComponentProps) {
  const { researchAreas } = loaderData;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Research Areas</h1>
        <Link
          to="/admin/research/new"
          className="bg-brand-terracotta text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
        >
          Add Research Area
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sort Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Question
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {researchAreas.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No research areas yet. Create your first one!
                </td>
              </tr>
            ) : (
              researchAreas.map((area) => (
                <tr key={area.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {area.sortOrder}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {area.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {area.question}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/admin/research/${area.id}/edit`}
                      className="text-brand-terracotta hover:text-opacity-80 mr-4"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/admin/research/${area.id}/delete`}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
