import { Field, Label } from '@headlessui/react';
import { Input } from '../../../common/components/Input';

export function TextSearchControl({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Field className="w-full">
      <Label htmlFor={id} className="label mb-2">
        <span className="label-text">
          Search by name, description or topics
        </span>
      </Label>
      <Input
        id={id}
        type="text"
        placeholder="Search by text"
        name="text-search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
        aria-label="Search repositories by text"
      />
    </Field>
  );
}
