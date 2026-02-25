import { redirect } from "react-router";
import type { Route } from "./+types/admin.collaborations.$id.delete";
import { deleteCollaboration } from "~/db/queries.server";
import { setToast } from "~/lib/toast.server";

export const handle = { breadcrumb: "Delete" };

export async function action({ params }: Route.ActionArgs) {
  await deleteCollaboration(parseInt(params.id));
  return redirect("/admin/collaborations", {
    headers: { "Set-Cookie": await setToast("Collaboration deleted!", "success") },
  });
}

export async function loader() {
  return redirect("/admin/collaborations");
}
