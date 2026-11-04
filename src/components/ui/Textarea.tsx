type TextareaProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
};

export default function Textarea({ label, value, onChange, placeholder, rows = 4 }: TextareaProps) {
  return (
    <label className="block w-full text-sm font-medium text-slate-700">
      {label && <span className="mb-2 block">{label}</span>}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
      />
    </label>
  );
}
