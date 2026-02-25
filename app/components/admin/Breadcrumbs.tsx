import { Link, useMatches } from "react-router";

export function Breadcrumbs() {
  const matches = useMatches();

  const crumbs = matches
    .filter((m) => (m.handle as any)?.breadcrumb)
    .map((m) => {
      const handle = m.handle as { breadcrumb: string | ((data: any) => string) };
      const label =
        typeof handle.breadcrumb === "function"
          ? handle.breadcrumb(m.data)
          : handle.breadcrumb;
      return { label, path: m.pathname };
    });

  if (crumbs.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-sm text-brand-warmGray mb-4">
      <Link to="/admin" className="hover:text-brand-terracotta transition-colors">
        Admin
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={crumb.path} className="flex items-center gap-2">
          <span>/</span>
          {i === crumbs.length - 1 ? (
            <span className="text-brand-charcoal font-medium">{crumb.label}</span>
          ) : (
            <Link to={crumb.path} className="hover:text-brand-terracotta transition-colors">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
