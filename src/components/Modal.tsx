import React from "react";

interface ModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  confirmDisabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  open,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Simpan",
  cancelText = "Batal",
  loading = false,
  confirmDisabled = false,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Modal box */}
      <div className="relative w-full max-w-md rounded-md bg-white shadow-lg px-4">
        {/* Header */}
        <div className="border-b border-gray-300 py-3">
          <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        </div>

        {/* Body */}
        <div className="py-4 text-sm text-gray-700">{children}</div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-gray-300 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
            disabled={loading}
          >
            {cancelText}
          </button>

          {onConfirm && (
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading || confirmDisabled}
              className="rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
