import React from "react";

const TaskDetailsModal = ({ onClose, task }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="bg-gray-800 bg-opacity-75 absolute inset-0"></div>
      <div className="bg-white rounded-lg p-6 max-w-lg relative z-20">
        <button
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="px-4">
          <h2 className="text-lg font-semibold mb-2 overflow-hidden">{task.title}</h2>
          <p className="text-gray-600 overflow-auto max-h-60">{task.summary}</p>
          <p className="text-sm text-gray-500">{task.date}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
