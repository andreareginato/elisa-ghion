import { Form, redirect, useActionData } from "react-router";
import type { Route } from "./+types/admin.login";

export async function loader({ request }: Route.LoaderArgs) {
  const { getSession } = await import("~/lib/auth.server");
  const session = await getSession(request);
  if (session.get("authenticated")) {
    throw redirect("/admin");
  }
  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const { login } = await import("~/lib/auth.server");
  const formData = await request.formData();
  const password = formData.get("password") as string;

  const sessionCookie = await login(request, password);
  if (!sessionCookie) {
    return { error: "Invalid password" };
  }

  return redirect("/admin", {
    headers: { "Set-Cookie": sessionCookie },
  });
}

export function meta() {
  return [{ title: "Admin Login — Elisa Ghion" }];
}

export default function AdminLogin() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-brand-charcoal">
            Elisa Ghion
          </h1>
          <p className="text-brand-warmGray mt-1">Admin Panel</p>
        </div>
        <div className="admin-card">
          <Form method="post" className="space-y-4">
            <div>
              <label htmlFor="password" className="admin-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                autoFocus
                className="admin-input"
              />
            </div>
            {actionData?.error && (
              <p className="text-red-600 text-sm">{actionData.error}</p>
            )}
            <button
              type="submit"
              className="w-full admin-btn-primary"
            >
              Sign In
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
