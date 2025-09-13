import React, { ReactNode, useEffect } from "react";
import { X } from "lucide-react";


export const Dialog= ({
  isOpen,
  onClose,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-6xl mx-4">{children}</div>
    </div>
  );
};

export const DialogTrigger = ({
  onClick,
  children,
  className = "",
}) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
);

export const DialogContent = ({
  children,
  className = "",
}) => (
  <div
    className={`bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden ${className}`}
  >
    {children}
  </div>
);

export const DialogHeader = ({ children }) => (
  <div className="px-8 py-6 border-b border-gray-100">{children}</div>
);

export const DialogTitle = ({ children }) => (
  <h2 className="text-2xl font-bold text-gray-900 mb-2">{children}</h2>
);

export const DialogDescription = ({
  children,
}) => <p className="text-gray-600 text-base leading-relaxed">{children}</p>;

export const DialogClose= ({ onClose }) => (
  <button
    onClick={onClose}
    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
  >
    <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
  </button>
);
