import React from "react";

interface InputProps {
  id: string;
  name?: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  prefix?: string;
  className?: string;

  /* NEW */
  error?: boolean;
  description?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  prefix,
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

      <div className="mt-2">
        <div
          className={`
            ${disabled ? "bg-gray-100" : "bg-white"}
            flex items-center rounded-md pl-3 outline-1 -outline-offset-1
            ${error ? "outline-red-500" : "outline-gray-300"}
            focus-within:outline-2 focus-within:-outline-offset-2
            ${error ? "focus-within:outline-red-500" : "focus-within:outline-indigo-600"}
          `}
        >
          {prefix && (
            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
              {prefix}
            </div>
          )}

          <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={`
              block min-w-0 grow py-1.5 pr-3 pl-1 text-base
              ${disabled ? "bg-gray-100" : "bg-white"}
              text-gray-900 placeholder:text-gray-400
              focus:outline-none sm:text-sm/6
            `}
          />
        </div>

        {description && (
          <p
            className={`mt-1 text-sm ${
              error ? "text-red-500" : "text-gray-500"
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
