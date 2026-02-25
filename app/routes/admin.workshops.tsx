import { Link } from "react-router";
import { getAllWorkshopsWithTestimonials } from "~/db/queries.server";
import { AdminPageHeader } from "~/components/admin/AdminPageHeader";
import type { Route } from "./+types/admin.workshops";

export const handle = { breadcrumb: "Workshops" };

export async function loader() {
  const workshops = await getAllWorkshopsWithTestimonials();
  return { workshops };
}

export default function AdminWorkshops({ loaderData }: Route.ComponentProps) {
  const { workshops } = loaderData;

  return (
    <div>
      <AdminPageHeader title="Workshops" actionLabel="Add Workshop" actionTo="/admin/workshops/new" />

      <div className="admin-card overflow-hidden">
        <table className="min-w-full divide-y divide-brand-sand">
          <thead className="bg-brand-sand/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-warmGray uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-warmGray uppercase tracking-wider">Format</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-warmGray uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-warmGray uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-brand-warmGray uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-sand/50">
            {workshops.map((workshop) => (
              <tr key={workshop.id} className="hover:bg-brand-cream/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-charcoal">{workshop.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-warmGray capitalize">{workshop.format}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-warmGray">{workshop.startDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-warmGray">{workshop.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/admin/workshops/${workshop.id}/edit`} className="text-brand-terracotta hover:text-brand-terracottaLight mr-4">Edit</Link>
                  <Link to={`/admin/workshops/${workshop.id}/delete`} className="text-red-600 hover:text-red-800">Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
