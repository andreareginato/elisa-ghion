interface AdminFormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

export function AdminFormField({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
}: AdminFormFieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="admin-label">
        {label}
        {required && <span className="text-brand-terracotta ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-brand-warmGray mb-1">{hint}</p>}
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
