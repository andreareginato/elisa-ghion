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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-sm w-full">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Admin Login
        </h1>
        <Form method="post" className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              autoFocus
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-terracotta focus:border-transparent outline-none"
            />
          </div>
          {actionData?.error && (
            <p className="text-red-600 text-sm">{actionData.error}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-brand-charcoal text-white rounded-lg hover:bg-brand-terracotta transition-colors"
          >
            Sign In
          </button>
        </Form>
      </div>
    </div>
  );
}
