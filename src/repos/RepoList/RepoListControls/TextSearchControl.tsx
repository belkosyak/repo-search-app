import { Field, Label } from '@headlessui/react';
import { Input } from '../../../common/components/Input';

export function TextSearchControl({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Field className="w-full">
      <Label className="label">
        <span className="label-text">Search repositories</span>
      </Label>
      <Input
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
