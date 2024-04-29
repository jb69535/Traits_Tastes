// Modal.tsx

import React from 'react';
import '../style/components/modal.css'; // You'll need to create this CSS file for styling

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode; // Define children prop
}

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
