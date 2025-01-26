import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        {/* Modal Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>

        {/* Modal Message */}
        <p className="text-gray-600 mb-8">{message}</p>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            {cancelText}
          </button>

          {/* Confirm Button */}
          <button
            onClick={onConfirm}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-6 rounded-lg hover:from-red-600 hover:to-pink-600 transition duration-300"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;