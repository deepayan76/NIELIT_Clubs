import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import '../styles/Toast.css';

export default function Toast({ message, isVisible, onClose }) {
  if (!isVisible) return null;

  return (
    <div className="toast-container" role="alert" aria-live="assertive">
      <div className="toast-card">
        <CheckCircle className="toast-icon" size={20} />
        <div className="toast-text">{message}</div>
        <button
          className="toast-close"
          onClick={onClose}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
