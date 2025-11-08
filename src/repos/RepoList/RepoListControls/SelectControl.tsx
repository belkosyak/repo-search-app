import { Field, Label } from '@headlessui/react';
import {
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
      <Label className="label">
        <span className="label-text">{label}</span>
      </Label>
      <Listbox value={value} onChange={onChange} name={name}>
        <ListboxButton className="select select-bordered w-full">
          <span className="block truncate">
            {selectedOption?.label ?? 'Select...'}
          </span>
        </ListboxButton>
        <ListboxOptions
          className={
            'absolute z-10 mt-1 max-h-60 w-full overflow-auto ' +
            'rounded-md bg-base-100 shadow-lg border border-base-300 p-1'
          }
        >
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option.value}
              className={
                'relative cursor-pointer select-none py-2 px-3 rounded-md ' +
                'ui-active:bg-primary ui-active:text-primary-content ' +
                'ui-selected:bg-primary ui-selected:text-primary-content ' +
                'text-base-content'
              }
            >
              <span className="block truncate ui-selected:font-semibold">
                {option.label}
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </Field>
  );
}
