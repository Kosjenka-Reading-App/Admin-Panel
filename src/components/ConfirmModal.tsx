type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  text: string;
  confirmText: string;
};

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  text,
  confirmText,
}: ConfirmModalProps) {
  return isOpen ? (
    <div className={`fixed z-10 inset-0 overflow-y-auto`}>
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-full">
          <div className="bg-white px-4 pt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                {title}
              </h2>
            </div>
          </div>
          <div className="bg-white px-4 py-4">
            <p className="text-md text-gray-500">{text}</p>
          </div>
          <div className="bg-white px-4 py-3 sm:px-6 flex justify-end">
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-custom-red bg-white border border-red-300 rounded-md hover:bg-red-50 focus:outline-none"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
