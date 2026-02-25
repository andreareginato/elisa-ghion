import { Link } from "react-router";

interface AdminPageHeaderProps {
  title: string;
  actionLabel?: string;
  actionTo?: string;
}

export function AdminPageHeader({ title, actionLabel, actionTo }: AdminPageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-heading font-bold text-brand-charcoal">{title}</h1>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="admin-btn-primary">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
