import React from "react";

const TaskModal = ({ onClose, onSave, selectedColumnId, task, setTask, isEdit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(selectedColumnId);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button className="absolute top-4 right-4 text-red-500 hover:text-red-700" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold mb-4">{task.title}</h2>
        <input type="text" name="title" value={task.title} onChange={handleChange} placeholder="Título" className="w-full border border-gray-300 rounded-md p-2 mb-4" />
        <textarea name="summary" value={task.summary} onChange={handleChange} placeholder="Resumo" className="w-full border border-gray-300 rounded-md p-2 mb-4 h-32 resize-none"></textarea>
        <input type="date" name="date" value={task.date} onChange={handleChange} placeholder="Data" className="w-full border border-gray-300 rounded-md p-2 mb-4" />
        <button onClick={handleSave}
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2 mt-4 hover:px-5 hover:py-2.5">
          {isEdit ? "Salvar" : "Adicionar Tarefa"}
        </button>

      </div>
    </div>

  );
};

export default TaskModal;
