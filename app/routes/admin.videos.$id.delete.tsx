import { redirect } from "react-router";
import type { Route } from "./+types/admin.videos.$id.delete";
import { deleteVideo } from "~/db/queries.server";
import { setToast } from "~/lib/toast.server";

export const handle = { breadcrumb: "Delete" };

export async function action({ params }: Route.ActionArgs) {
  await deleteVideo(parseInt(params.id));
  return redirect("/admin/videos", {
    headers: { "Set-Cookie": await setToast("Video deleted!", "success") },
  });
}

export async function loader() {
  return redirect("/admin/videos");
}
