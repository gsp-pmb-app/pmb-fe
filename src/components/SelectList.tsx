"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";

export interface Option {
  label: string;
  value: string | number;
}

interface SelectListboxProps {
  id: string;
  label?: string;
  value: Option | null;
  onChange: (value: Option) => void;
  options: Option[];
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

const SelectListbox: React.FC<SelectListboxProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  placeholder = "Pilih opsi",
  className = "",
}) => {
  return (
    <div className={`sm:col-span-4 ${className}`}>
      {label && (
        <p className="block text-sm/6 font-medium text-gray-900">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </p>
      )}

      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative mt-2">
          {/* BUTTON (nyamain Input) */}
          <ListboxButton
            className={`${disabled ? "bg-gray-100" : "bg-white"}
              relative flex w-full items-center rounded-md pl-3 pr-10
              py-1.5 text-left text-gray-900
              outline-1 -outline-offset-1 outline-gray-300
              focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600
              sm:text-sm/6`}
          >
            <span
              className={`block truncate ${
                value ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {value ? value.label : placeholder}
            </span>

            <ChevronUpDownIcon
              aria-hidden="true"
              className="absolute right-3 size-5 text-gray-500"
            />
          </ListboxButton>

          {/* OPTIONS */}
          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md
              bg-white py-1 text-base shadow-lg
              outline-1 outline-black/5
              data-leave:transition data-leave:duration-100 data-leave:ease-in
              data-closed:data-leave:opacity-0
              sm:text-sm"
          >
            {options.map((opt) => (
              <ListboxOption
                key={opt.value}
                value={opt}
                className="group relative cursor-default select-none py-2 pl-3 pr-9
                  text-gray-900
                  data-focus:bg-indigo-600 data-focus:text-white"
              >
                <span className="block truncate font-normal group-data-selected:font-semibold">
                  {opt.label}
                </span>

                <span
                  className="absolute inset-y-0 right-0 hidden items-center pr-4
                  text-indigo-600 group-data-selected:flex group-data-focus:text-white"
                >
                  <CheckIcon className="size-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectListbox;
