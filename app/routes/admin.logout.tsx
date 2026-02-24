import { redirect } from "react-router";
import { logout } from "~/lib/auth.server";
import type { Route } from "./+types/admin.logout";

export async function action({ request }: Route.ActionArgs) {
  const sessionCookie = await logout(request);
  return redirect("/admin/login", {
    headers: { "Set-Cookie": sessionCookie },
  });
}

export function loader() {
  return redirect("/admin/login");
}
