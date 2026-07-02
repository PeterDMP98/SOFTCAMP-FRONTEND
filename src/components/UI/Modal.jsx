import { X } from "lucide-react";
import Button from "./Button";

const Modal = ({ isOpen, onClose, title, children, size = "md", showCloseButton = true }) => {
  if (!isOpen) return null;

  const sizes = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`border border-white/10 bg-[#111019] shadow-[0_28px_90px_rgba(0,0,0,0.45)] rounded-2xl w-full ${sizes[size]} max-h-[90vh] flex flex-col`}>
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-semibold  text-white">{title}</h2>
          {showCloseButton && <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg"><X size={20} className="text-slate-400" /></button>}
        </div>
        <div className="p-4 overflow-y-auto flex-1 text-white">{children}</div>
      </div>
    </div>
  );
};

export const ModalFooter = ({ children }) => (
  <div className="flex justify-end gap-3 pt-4 border-t border-white/10 mt-4">{children}</div>
);

export default Modal;