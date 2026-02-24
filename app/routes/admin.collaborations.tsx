import { Link } from "react-router";
import type { Route } from "./+types/admin.collaborations";
import { getAllCollaborations } from "~/db/queries.server";

export async function loader({ request }: Route.LoaderArgs) {
  const collaborations = await getAllCollaborations();
  return { collaborations };
}

export default function AdminCollaborations({ loaderData }: Route.ComponentProps) {
  const { collaborations } = loaderData;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Collaborations</h1>
        <Link
          to="/admin/collaborations/new"
          className="bg-brand-terracotta text-white px-6 py-2 rounded-lg hover:bg-brand-terracotta/90"
        >
          Add Collaboration
        </Link>
      </div>

      <div className="bg-white rounded-xl border p-6">
        {collaborations.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No collaborations found.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Website</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {collaborations.map((collaboration) => (
                <tr key={collaboration.id} className="border-b last:border-b-0">
                  <td className="py-3 px-4">{collaboration.name}</td>
                  <td className="py-3 px-4 capitalize">{collaboration.category}</td>
                  <td className="py-3 px-4">
                    {collaboration.website ? (
                      <a
                        href={collaboration.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-terracotta hover:underline"
                      >
                        {collaboration.website}
                      </a>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      to={`/admin/collaborations/${collaboration.id}/edit`}
                      className="text-brand-terracotta hover:underline mr-4"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/admin/collaborations/${collaboration.id}/delete`}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
