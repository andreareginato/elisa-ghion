import { Outlet, NavLink, Form } from "react-router";
import { requireAuth } from "~/lib/auth.server";
import type { Route } from "./+types/admin";

export async function loader({ request }: Route.LoaderArgs) {
  await requireAuth(request);
  return null;
}

const navItems = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/workshops", label: "Workshops" },
  { to: "/admin/gallery", label: "Gallery" },
  { to: "/admin/collaborations", label: "Collaborations" },
  { to: "/admin/research", label: "Research" },
  { to: "/admin/videos", label: "Videos" },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="font-bold text-lg text-gray-900">Admin Panel</h1>
          <p className="text-sm text-gray-500 mt-1">Elisa Ghion Site</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-terracotta/10 text-brand-terracotta"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors mb-1"
          >
            View Site
          </a>
          <Form method="post" action="/admin/logout">
            <button
              type="submit"
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              Logout
            </button>
          </Form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
