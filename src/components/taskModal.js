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
      <div className="bg-white rounded-lg p-6 w-96">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>Fechar</button>
        <input type="text" name="title" value={task.title} onChange={handleChange} placeholder="Título" className="w-full border border-gray-300 rounded-md p-2 mb-4" />
        <input type="text" name="summary" value={task.summary} onChange={handleChange} placeholder="Resumo" className="w-full border border-gray-300 rounded-md p-2 mb-4" />
        <input type="date" name="date" value={task.date} onChange={handleChange} placeholder="Data" className="w-full border border-gray-300 rounded-md p-2 mb-4" />
        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{isEdit ? "Salvar" : "Adicionar Tarefa"}</button>
      </div>
    </div>
  );
};

export default TaskModal;
