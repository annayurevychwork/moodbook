import { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText }) => {
  const confirmBtnRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; 
      setTimeout(() => confirmBtnRef.current?.focus(), 10);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      
      <div 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <AlertTriangle size={24} aria-hidden="true" />
          <h2 id="modal-title" className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
        
        <p id="modal-desc" className="text-gray-600 mb-6">{message}</p>
        
        <div className="flex gap-3 justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            {cancelText}
          </button>
          <button 
            ref={confirmBtnRef}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;