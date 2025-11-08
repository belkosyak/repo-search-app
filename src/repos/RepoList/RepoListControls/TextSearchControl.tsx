export function RepoTextSearchControl({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label>
        Search repositories
        <input
          type="text"
          placeholder="Search by text"
          name="text-search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
          aria-label="Search repositories by text"
        />
      </label>
    </div>
  );
}
