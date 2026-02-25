import { useState } from "react";

const options = [
  { value: "1x1", label: "1×1", cols: 1, rows: 1 },
  { value: "2x1", label: "2×1", cols: 2, rows: 1 },
  { value: "1x2", label: "1×2", cols: 1, rows: 2 },
  { value: "2x2", label: "2×2", cols: 2, rows: 2 },
];

interface GridSpanPickerProps {
  name: string;
  defaultValue?: string;
}

export function GridSpanPicker({ name, defaultValue = "auto" }: GridSpanPickerProps) {
  const [selected, setSelected] = useState(defaultValue);

  return (
    <div>
      <input type="hidden" name={name} value={selected} />
      <div className="mb-2">
        <button
          type="button"
          onClick={() => setSelected("auto")}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            selected === "auto"
              ? "bg-brand-terracotta text-white"
              : "bg-brand-sand/50 text-brand-warmGray hover:text-brand-charcoal"
          }`}
        >
          Auto-detect from image
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setSelected(opt.value)}
            className={`p-3 rounded-lg border-2 transition-all ${
              selected === opt.value
                ? "border-brand-terracotta bg-brand-terracotta/5"
                : "border-brand-sand hover:border-brand-warmGray"
            }`}
          >
            <div className="grid grid-cols-2 gap-1 w-10 h-10 mx-auto mb-1">
              <div
                className={`rounded-sm ${
                  selected === opt.value ? "bg-brand-terracotta" : "bg-brand-warmGray/40"
                }`}
                style={{
                  gridColumn: `span ${opt.cols}`,
                  gridRow: `span ${opt.rows}`,
                }}
              />
              {opt.cols === 1 && opt.rows === 1 && (
                <>
                  <div className="rounded-sm bg-brand-sand" />
                  <div className="rounded-sm bg-brand-sand" />
                  <div className="rounded-sm bg-brand-sand" />
                </>
              )}
              {opt.value === "2x1" && (
                <>
                  <div className="rounded-sm bg-brand-sand" />
                  <div className="rounded-sm bg-brand-sand" />
                </>
              )}
              {opt.value === "1x2" && (
                <>
                  <div className="rounded-sm bg-brand-sand" />
                  <div className="rounded-sm bg-brand-sand" />
                </>
              )}
            </div>
            <span className={`text-xs font-medium ${
              selected === opt.value ? "text-brand-terracotta" : "text-brand-warmGray"
            }`}>
              {opt.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
