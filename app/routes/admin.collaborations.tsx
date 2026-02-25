import { Link } from "react-router";
import type { Route } from "./+types/admin.collaborations";
import { getAllCollaborations } from "~/db/queries.server";
import { AdminPageHeader } from "~/components/admin/AdminPageHeader";
import { SortableList } from "~/components/admin/SortableList";

export const handle = { breadcrumb: "Collaborations" };

export async function loader({ request }: Route.LoaderArgs) {
  const collaborations = await getAllCollaborations();
  return { collaborations };
}

export default function AdminCollaborations({ loaderData }: Route.ComponentProps) {
  const { collaborations } = loaderData;

  return (
    <div>
      <AdminPageHeader title="Collaborations" actionLabel="Add Collaboration" actionTo="/admin/collaborations/new" />

      <div className="admin-card">
        {collaborations.length === 0 ? (
          <p className="text-brand-warmGray text-center py-8">No collaborations found.</p>
        ) : (
          <SortableList
            items={collaborations}
            reorderAction="/admin/collaborations/reorder"
            renderItem={(collaboration) => (
              <div className="flex items-center justify-between py-3 px-4 bg-white rounded-lg border border-brand-sand/50 hover:border-brand-sand">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-brand-charcoal">{collaboration.name}</p>
                  <p className="text-sm text-brand-warmGray capitalize">{collaboration.category}</p>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <Link to={`/admin/collaborations/${collaboration.id}/edit`} className="text-sm text-brand-terracotta hover:text-brand-terracottaLight">Edit</Link>
                  <Link to={`/admin/collaborations/${collaboration.id}/delete`} className="text-sm text-red-600 hover:text-red-800">Delete</Link>
                </div>
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
}
