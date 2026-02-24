import { redirect } from "react-router";
import type { Route } from "./+types/admin.collaborations.$id.delete";
import { deleteCollaboration } from "~/db/queries.server";

export async function action({ params }: Route.ActionArgs) {
  await deleteCollaboration(parseInt(params.id));
  return redirect("/admin/collaborations");
}

export async function loader() {
  return redirect("/admin/collaborations");
}
