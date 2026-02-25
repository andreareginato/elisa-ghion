import { Link } from "react-router";
import type { Route } from "./+types/admin.research";
import { getAllResearchAreas } from "~/db/queries.server";
import { AdminPageHeader } from "~/components/admin/AdminPageHeader";
import { SortableList } from "~/components/admin/SortableList";

export const handle = { breadcrumb: "Research" };

export async function loader({ request }: Route.LoaderArgs) {
  const researchAreas = await getAllResearchAreas();
  return { researchAreas };
}

export default function AdminResearch({ loaderData }: Route.ComponentProps) {
  const { researchAreas } = loaderData;

  return (
    <div>
      <AdminPageHeader title="Research Areas" actionLabel="Add Research Area" actionTo="/admin/research/new" />

      <div className="admin-card">
        {researchAreas.length === 0 ? (
          <p className="text-brand-warmGray text-center py-8">No research areas yet. Create your first one!</p>
        ) : (
          <SortableList
            items={researchAreas}
            reorderAction="/admin/research/reorder"
            renderItem={(area) => (
              <div className="flex items-center justify-between py-3 px-4 bg-white rounded-lg border border-brand-sand/50 hover:border-brand-sand">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-brand-charcoal">{area.title}</p>
                  <p className="text-sm text-brand-warmGray truncate">{area.question}</p>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <Link to={`/admin/research/${area.id}/edit`} className="text-sm text-brand-terracotta hover:text-brand-terracottaLight">Edit</Link>
                  <Link to={`/admin/research/${area.id}/delete`} className="text-sm text-red-600 hover:text-red-800">Delete</Link>
                </div>
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
}
