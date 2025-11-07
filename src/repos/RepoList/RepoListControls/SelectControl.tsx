import type { OrderBy } from '../../types';

export function SelectControl({
  value,
  onChange,
  options,
  name,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  name: string;
  label: string;
}) {
  return (
    <div>
      <label>
        {label}
        <select
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value as OrderBy)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
