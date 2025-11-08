import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';

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
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Field>
      <Label>{label}</Label>
      <Listbox value={value} onChange={onChange} name={name}>
        <ListboxButton>{selectedOption?.label ?? 'Select...'}</ListboxButton>
        <ListboxOptions>
          {options.map((option) => (
            <ListboxOption key={option.value} value={option.value}>
              {option.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </Field>
  );
}
