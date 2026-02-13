import React, { useEffect } from "react";
import LoadingSpinner from "./Spinner";

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
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      {/* Container */}
      <div className="absolute inset-0 flex items-end sm:items-center justify-center p-0">
        {/* Modal */}
        <div
          className="
            w-full sm:max-w-md
            bg-white rounded-t-xl sm:rounded-xl
            shadow-xl
            animate-in fade-in zoom-in duration-150
            max-h-[90vh] flex flex-col
            px-4
          "
        >
          {/* Header */}
          <div className="border-b border-gray-400 py-3">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          </div>

          {/* Body (scrollable) */}
          <div className="py-4 text-sm text-gray-700 overflow-y-auto">
            {children}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-400 py-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                rounded-md px-4 py-2 text-sm
                text-gray-700 hover:bg-gray-100
                disabled:opacity-50
              "
            >
              {cancelText}
            </button>

            {onConfirm && (
              <button
                type="button"
                onClick={onConfirm}
                disabled={loading || confirmDisabled}
                className="
                  rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white
                  hover:bg-indigo-500 disabled:opacity-50
                  flex items-center justify-center min-w-24
                "
              >
                {loading ? <LoadingSpinner /> : confirmText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
