import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

export function Modal({
  open,
  onClose,
  children,
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      return;
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  if (!open) return null;

  const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    onClose();
  };

  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDialogElement, MouseEvent>,
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <dialog
      ref={dialogRef}
      className='modal modal-open p-0 bg-black/40'
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      <div className={className}>{children}</div>
    </dialog>
  );

  return createPortal(modalContent, document.body);
}

export default Modal;
