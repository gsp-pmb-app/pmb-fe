"use client";

import React from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { CheckIcon } from "@heroicons/react/20/solid";

export interface Option {
  label: string;
  value: string | number;
}

interface SelectListboxProps {
  id: string;
  label?: string;
  value?: Option;
  onChange: (value: Option) => void;
  options: Option[];
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  error?: boolean;
  description?: string;
}

const SelectListbox: React.FC<SelectListboxProps> = ({
  id,
  label,
  value = null,
  onChange,
  options,
  required = false,
  disabled = false,
  placeholder = "Pilih opsi",
  className = "",
  error = false,
  description,
}) => {
  return (
    <div className={`sm:col-span-4 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm/6 font-medium ${
            error ? "text-red-600" : "text-gray-900"
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Listbox value={value!} onChange={onChange} disabled={disabled}>
        <div className="relative mt-2">
          {/* BUTTON */}
          <ListboxButton
            id={id}
            className={`
              relative w-full rounded-md text-left
              ${disabled ? "bg-gray-100" : "bg-white"}
              py-2 pl-3 pr-10               /* 🔥 lebih nyaman di HP */
              text-sm text-gray-900
              outline outline-1 -outline-offset-1
              ${error ? "outline-red-500" : "outline-gray-300"}
              focus-visible:outline-2 focus-visible:-outline-offset-2
              ${
                error
                  ? "focus-visible:outline-red-500"
                  : "focus-visible:outline-indigo-600"
              }
              transition
            `}
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
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-500"
            />
          </ListboxButton>

          {/* OPTIONS */}
          <ListboxOptions
            transition
            className="
              absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md
              bg-white py-1 text-sm shadow-lg
              outline outline-1 outline-black/5
              focus:outline-none
            "
          >
            {options.map((opt) => (
              <ListboxOption
                key={opt.value}
                value={opt}
                className="
                  relative cursor-pointer select-none py-2 pl-3 pr-9
                  text-gray-900
                  data-focus:bg-indigo-600 data-focus:text-white
                "
              >
                <span className="block truncate font-normal data-selected:font-semibold">
                  {opt.label}
                </span>

                <span
                  className="
                    absolute inset-y-0 right-0 hidden items-center pr-3
                    text-indigo-600 data-selected:flex
                    data-focus:text-white
                  "
                >
                  <CheckIcon className="size-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>

      {description && (
        <p
          className={`mt-1 text-sm ${error ? "text-red-500" : "text-gray-500"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SelectListbox;
