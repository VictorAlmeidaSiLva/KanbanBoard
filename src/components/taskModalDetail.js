import React from "react";

const TaskDetailsModal = ({ onClose, task }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded p-4">
        <h2 className="text-lg font-semibold mb-2">{task.title}</h2>
        <p className="text-gray-600 overflow-auto max-h-60">{task.summary}</p>
        <p className="text-sm text-gray-500">{task.date}</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
