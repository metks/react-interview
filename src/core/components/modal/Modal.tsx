import { ReactNode, useEffect, useRef } from "react";
import "./modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "small" | "medium" | "large";
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
}: ModalProps): ReactNode => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }

    // Handle dialog close event
    const handleClose = () => {
      onClose();
    };

    dialog.addEventListener("close", handleClose);

    return () => {
      dialog.removeEventListener("close", handleClose);
    };
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const isInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (!isInDialog) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={`modal modal-${size}`}
      onClick={handleBackdropClick}>
      <div className="modal-content">
        {title && (
          <div className="modal-header">
            <h2 className="modal-title">{title}</h2>
            <button
              className="modal-close-button"
              onClick={onClose}
              aria-label="Close modal">
              ✕
            </button>
          </div>
        )}
        <div className="modal-body">{children}</div>
      </div>
    </dialog>
  );
};

export default Modal;
