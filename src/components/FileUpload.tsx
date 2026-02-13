import React, { useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface FileUploadProps {
  id: string;
  label?: string;
  accept?: string;
  required?: boolean;
  onChange?: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  id,
  label,
  accept,
  required = false,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }

    onChange?.(selectedFile);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onChange?.(null);
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div
        onClick={() => inputRef.current?.click()}
        className={`flex items-center gap-3 rounded-lg border bg-white px-3 py-2.5 
                    cursor-pointer transition shadow-sm
                    ${
                      file
                        ? "border-indigo-500 ring-1 ring-indigo-500/20"
                        : "border-gray-300 hover:border-indigo-400"
                    }`}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          required={required}
          onChange={handleChange}
          className="hidden"
        />

        {/* Preview */}
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="h-12 w-12 rounded-md object-cover shrink-0"
          />
        ) : (
          <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 text-xs shrink-0">
            FILE
          </div>
        )}

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {file ? file.name : "Klik untuk upload file"}
          </p>

          <p className="text-xs text-gray-500">{accept || "PDF / JPG / PNG"}</p>
        </div>

        {/* Clear Button */}
        {file && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              clearFile();
            }}
            className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-red-500 transition"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
