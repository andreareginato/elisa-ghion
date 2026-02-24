import { redirect } from "react-router";
import type { Route } from "./+types/admin.videos.$id.delete";
import { deleteVideo } from "~/db/queries.server";

export async function action({ params }: Route.ActionArgs) {
  await deleteVideo(parseInt(params.id));
  return redirect("/admin/videos");
}

export async function loader() {
  return redirect("/admin/videos");
}
