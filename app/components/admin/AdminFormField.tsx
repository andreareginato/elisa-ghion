interface AdminFormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

export function AdminFormField({
  label,
  htmlFor,
  required,
  error,
  children,
}: AdminFormFieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="admin-label">
        {label}
        {required && <span className="text-brand-terracotta ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
