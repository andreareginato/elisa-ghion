import { redirect } from "react-router";
import type { Route } from "./+types/admin.research.$id.delete";
import { deleteResearchArea } from "~/db/queries.server";

export async function action({ params }: Route.ActionArgs) {
  const id = parseInt(params.id, 10);
  await deleteResearchArea(id);
  return redirect("/admin/research");
}

export async function loader() {
  return redirect("/admin/research");
}
