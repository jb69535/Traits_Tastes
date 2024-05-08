// Modal.tsx
// Author: Jun Beom

import React from 'react';
import '../style/components/modal.css'; 

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode; // Define children prop
}

/**
 * A generic modal component that can be closed by clicking outside the content area.
 * 
 * @remarks
 * This modal component renders children content with a backdrop and provides functionality to close by clicking outside the content area or on a close button.
 * 
 * @param props - The props for the Modal component.
 * @param props.isOpen - Boolean indicating whether the modal is open or not.
 * @param props.onClose - Function to call when the modal needs to be closed.
 * @param props.children - Optional children to render inside the modal.
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
