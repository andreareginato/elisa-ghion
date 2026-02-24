import { redirect } from "react-router";
import { deleteWorkshop } from "~/db/queries.server";
import type { Route } from "./+types/admin.workshops.$id.delete";

export async function action({ params }: Route.ActionArgs) {
  await deleteWorkshop(params.id);
  return redirect("/admin/workshops");
}
