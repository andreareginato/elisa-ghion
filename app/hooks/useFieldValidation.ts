import { useState, useCallback } from "react";

type Rule = "required" | "url" | "dateRange";

interface FieldConfig {
  rules: Rule[];
  compareField?: string;
}

export function useFieldValidation(fields: Record<string, FieldConfig>) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback(
    (name: string, value: string, allValues?: Record<string, string>) => {
      const config = fields[name];
      if (!config) return "";

      for (const rule of config.rules) {
        if (rule === "required" && !value.trim()) {
          const err = "This field is required";
          setErrors((prev) => ({ ...prev, [name]: err }));
          return err;
        }
        if (rule === "url" && value.trim()) {
          try {
            new URL(value);
          } catch {
            const err = "Please enter a valid URL";
            setErrors((prev) => ({ ...prev, [name]: err }));
            return err;
          }
        }
        if (rule === "dateRange" && config.compareField && allValues) {
          const startVal = allValues[config.compareField];
          if (startVal && value && new Date(value) < new Date(startVal)) {
            const err = "End date must be after start date";
            setErrors((prev) => ({ ...prev, [name]: err }));
            return err;
          }
        }
      }

      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
      return "";
    },
    [fields]
  );

  const validateAll = useCallback(
    (values: Record<string, string>) => {
      const newErrors: Record<string, string> = {};
      for (const [name] of Object.entries(fields)) {
        const err = validateField(name, values[name] || "", values);
        if (err) newErrors[name] = err;
      }
      return Object.keys(newErrors).length === 0;
    },
    [fields, validateField]
  );

  const clearError = useCallback((name: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  return { errors, validateField, validateAll, clearError };
}
