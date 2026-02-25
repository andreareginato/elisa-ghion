import { useState } from "react";
import { Outlet, NavLink, Form, useLoaderData } from "react-router";
import { requireAuth } from "~/lib/auth.server";
import { getToast, clearToastHeader } from "~/lib/toast.server";
import { Toast } from "~/components/admin/Toast";
import { Breadcrumbs } from "~/components/admin/Breadcrumbs";
import type { Route } from "./+types/admin";

export async function loader({ request }: Route.LoaderArgs) {
  await requireAuth(request);
  const toast = await getToast(request);
  return Response.json(
    { toast },
    toast ? { headers: { "Set-Cookie": await clearToastHeader() } } : undefined
  );
}

const navItems = [
  { to: "/admin", label: "Dashboard", end: true, icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { to: "/admin/workshops", label: "Workshops", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  { to: "/admin/gallery", label: "Gallery", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { to: "/admin/collaborations", label: "Collaborations", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
  { to: "/admin/research", label: "Research", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  { to: "/admin/videos", label: "Videos", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
];

export default function AdminLayout() {
  const { toast } = useLoaderData<typeof loader>();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarContent = (
    <>
      <div className="p-6 border-b border-white/10">
        <h1 className="font-heading font-bold text-lg text-brand-cream">Admin Panel</h1>
        <p className="text-sm text-brand-cream/50 mt-1">Elisa Ghion</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-terracotta text-white"
                  : "text-brand-cream/70 hover:text-brand-cream hover:bg-white/10"
              }`
            }
          >
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
            </svg>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="block px-3 py-2 rounded-lg text-sm text-brand-cream/50 hover:text-brand-cream hover:bg-white/10 transition-colors mb-1"
        >
          View Site
        </a>
        <Form method="post" action="/admin/logout">
          <button
            type="submit"
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-brand-cream/50 hover:text-brand-cream hover:bg-white/10 transition-colors"
          >
            Logout
          </button>
        </Form>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-brand-charcoal flex items-center px-4 z-30 lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="text-brand-cream p-1"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="ml-3 font-heading font-bold text-brand-cream">Admin</span>
      </div>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - mobile overlay */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-brand-charcoal flex flex-col z-50 transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Sidebar - desktop fixed */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-brand-charcoal flex-col z-20">
        {sidebarContent}
      </aside>

      {/* Main content */}
      <main className="lg:pl-64 pt-14 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-8">
          <Breadcrumbs />
          <Outlet />
        </div>
      </main>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
