type SelectProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  className?: string;
};

export default function Select({ label, value, onChange, options, className = '' }: SelectProps) {
  return (
    <label className="block w-full text-sm font-medium text-slate-700">
      {label && <span className="mb-2 block">{label}</span>}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
