import React, { useRef, useState } from "react";

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

  return (
    <div className="sm:col-span-4">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm/6 font-medium text-gray-900"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className="mt-2">
        <div
          className="flex items-center gap-4 rounded-md bg-white px-3 py-2 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 cursor-pointer"
          onClick={() => inputRef.current?.click()}
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

          {/* Preview Image */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="h-12 w-12 rounded object-cover"
            />
          )}

          {/* File info */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-900">
              {file ? file.name : "Klik untuk upload file"}
            </span>
            <span className="text-xs text-gray-500">
              {accept || "PDF / JPG / PNG"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
