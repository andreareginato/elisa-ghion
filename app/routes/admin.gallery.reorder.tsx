import { updateGalleryItem } from "~/db/queries.server";
import type { Route } from "./+types/admin.gallery.reorder";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const items = JSON.parse(formData.get("items") as string) as Array<{ id: number; sortOrder: number }>;

  for (const item of items) {
    await updateGalleryItem(item.id, { sortOrder: item.sortOrder });
  }

  return { ok: true };
}
