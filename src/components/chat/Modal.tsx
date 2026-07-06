"use client";

import { FaCheck } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  type?: "success" | "error" | "info";
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  type = "info",
}: ModalProps) {
  if (!isOpen) return null;
  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheck />
          </div>
        );
      case "error":
        return (
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdOutlineClose />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BsInfoCircle />
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="mx-4 w-80 max-w-sm rounded bg-white shadow-2xl">
        <div className="p-6 text-center">
          {getIcon()}
          <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
          <div className="mb-6 text-gray-600">{children}</div>
          <button
            onClick={onClose}
            className="rounded bg-[#1268B3] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0f5694]"
          >
            {"Okay"}
          </button>
        </div>
      </div>
    </div>
  );
}
