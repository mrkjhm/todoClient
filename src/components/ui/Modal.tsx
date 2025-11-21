"use client";
import React from "react";
import Container from "./Container";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ open, children }: ModalProps) => {
  if (!open) return null;

  return (
    <section className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 px-4">
      <div className="bg-white text-black p-10 rounded-md shadow-md w-[500px]">
        {children}

        {/* Close Button */}
      </div>
    </section>
  );
};

export default Modal;
