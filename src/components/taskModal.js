import React from "react";
import "../components/taskModal.css"; // Importe o arquivo CSS

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
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>Fechar</button>
        <input type="text" name="title" value={task.title} onChange={handleChange} placeholder="Título" />
        <input type="text" name="summary" value={task.summary} onChange={handleChange} placeholder="Resumo" />
        <input type="date" name="date" value={task.date} onChange={handleChange} placeholder="Data" />
        <button onClick={handleSave}>{isEdit ? "Salvar" : "Adicionar Tarefa"}</button>
      </div>
    </div>
  );
};



export default TaskModal;

