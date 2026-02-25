import { redirect } from "react-router";
import type { Route } from "./+types/admin.research.$id.delete";
import { deleteResearchArea } from "~/db/queries.server";
import { setToast } from "~/lib/toast.server";

export const handle = { breadcrumb: "Delete" };

export async function action({ params }: Route.ActionArgs) {
  const id = parseInt(params.id, 10);
  await deleteResearchArea(id);
  return redirect("/admin/research", {
    headers: { "Set-Cookie": await setToast("Research area deleted!", "success") },
  });
}

export async function loader() {
  return redirect("/admin/research");
}
