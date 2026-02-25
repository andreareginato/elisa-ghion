import { redirect } from "react-router";
import { deleteWorkshop } from "~/db/queries.server";
import { setToast } from "~/lib/toast.server";
import type { Route } from "./+types/admin.workshops.$id.delete";

export const handle = { breadcrumb: "Delete Workshop" };

export async function action({ params }: Route.ActionArgs) {
  await deleteWorkshop(params.id);
  return redirect("/admin/workshops", {
    headers: { "Set-Cookie": await setToast("Workshop deleted!", "success") },
  });
}
