import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';
import TaskModal from "../../components/taskModal";
import TaskDetailsModal from "../../components/taskModalDetail";

function Home() {
  // Estado inicial das colunas
  const initialColumns = {
    "1": { name: "A Fazer", items: [] },
    "2": { name: "Em Progresso", items: [] },
    "3": { name: "Concluído", items: [] }
  };
  // Estados para gerenciar as colunas, novas tarefas, tarefa em edição, etc.
  const [columns, setColumns] = useState(initialColumns);
  const [newTask, setNewTask] = useState({ columnId: null, title: "", summary: "", date: "" });
  const [editTask, setEditTask] = useState({ id: null, title: "", summary: "", date: "" });
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [expandedTask, setExpandedTask] = useState(null);

  useEffect(() => {
    // Verifica se a tarefa expandida ainda está presente na coluna atual
    if (expandedTask) {
      const currentColumn = Object.values(columns).find(column => column.items.some(item => item.id === expandedTask));
      if (!currentColumn) {
        setExpandedTask(null); // redefine a tarefa expandida para null se não estiver mais presente na coluna atual
      }
    }
  }, [columns, expandedTask]);

  // Adiciona uma nova tarefa à coluna selecionada
  const handleAddTask = (columnId) => {
    const { title, summary, date } = newTask;
    if (title.trim() !== '' && summary.trim() !== '' && date.trim() !== '') {
      const newTaskData = { id: uuidv4(), title, summary, date };
      setColumns(prevColumns => ({
        ...prevColumns,
        [columnId]: { ...prevColumns[columnId], items: [...prevColumns[columnId].items, newTaskData] }
      }));
      setNewTask({ columnId: null, title: "", summary: "", date: "" });
      setShowAddTaskForm(false);
    }
  };

  // Remove uma tarefa da coluna
  const handleDeleteTask = (columnId, taskId) => {
    const updatedItems = columns[columnId].items.filter(task => task.id !== taskId);
    setColumns(prevColumns => ({ ...prevColumns, [columnId]: { ...prevColumns[columnId], items: updatedItems } }));
  };

  // Prepara a tarefa para edição
  const handleEditTask = (taskId, title, summary, date) => {
    setEditTask({ id: taskId, title, summary, date });
  };

  // Salva as alterações feitas em uma tarefa editada
  const handleSaveTaskEdit = () => {
    const { id, title, summary, date } = editTask;
    const updatedTitle = title.trim();
    const updatedSummary = summary.trim();
    const updatedDate = date.trim();
    if (updatedTitle !== '' && updatedSummary !== '' && updatedDate !== '') {
      const columnId = Object.keys(columns).find(key => columns[key].items.some(task => task.id === id));
      const updatedItems = columns[columnId].items.map(task => task.id === id ? { ...task, title: updatedTitle, summary: updatedSummary, date: updatedDate } : task);
      setColumns(prevColumns => ({ ...prevColumns, [columnId]: { ...prevColumns[columnId], items: updatedItems } }));
    }
    setEditTask({ id: null, title: "", summary: "", date: "" });
  };

  // Manipula o evento de arrastar e soltar tarefas
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }
    if (destination.droppableId === source.droppableId) {
      const columnId = source.droppableId;
      const newItems = Array.from(columns[columnId].items);
      const [removedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, removedItem);
      setColumns(prevColumns => ({ ...prevColumns, [columnId]: { ...prevColumns[columnId], items: newItems } }));
    } else {
      const sourceColumn = columns[source.droppableId];
      const destinationColumn = columns[destination.droppableId];
      const draggedTask = sourceColumn.items.find(task => task.id === draggableId);
      const newSourceItems = sourceColumn.items.filter(task => task.id !== draggableId);
      const newDestinationItems = [...destinationColumn.items];
      newDestinationItems.splice(destination.index, 0, draggedTask);

      setColumns(prevColumns => ({
        ...prevColumns,
        [source.droppableId]: { ...sourceColumn, items: newSourceItems },
        [destination.droppableId]: { ...destinationColumn, items: newDestinationItems }
      }));
    }
  };

  // Abre o modal de detalhes da tarefa ampliada
  const openTaskDetails = (taskId) => {
    setExpandedTask(taskId);
  };

  // Fecha o modal de detalhes da tarefa
  const closeTaskDetails = () => {
    setExpandedTask(null);
  };

  return (
    <div className="grid grid-cols-3 gap-4 justify-center bg-gray-100 p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        {/* Mapeia e renderiza as colunas */}
        {Object.entries(columns).map(([columnId, column]) => (
          <div key={columnId} className="flex flex-col items-center bg-white rounded p-4">
            <h1 className="text-lg font-semibold mb-2">
              {column.name}</h1>
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  className="bg-gray-200 rounded w-72 h-96 p-2 overflow-auto"
                >
                  {/* Mapeia e renderiza as tarefas de cada coluna */}
                  {column.items.map((item, index) => (
                    <Draggable draggableId={item.id} index={index} key={item.id}>
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          className="bg-white p-2 mb-2 rounded border border-gray-300 flex justify-between items-center"
                        >
                          <div className="overflow-hidden">
                            {/* Exibe título, resumo e data da tarefa */}
                            <h3 className="font-semibold">
                              {item.title}</h3>
                            <div className="text-gray-600 overflow-hidden"
                              style={{ maxHeight: "1.5em" }}>
                              {item.summary.length > 20 ? `${item.summary.substring(0, 20)}...` : item.summary}
                            </div>
                            <div className="text-sm text-gray-500">{item.date}</div>
                          </div>
                          <div className="flex flex-col">
                            {/* Botões para editar, excluir e ampliar a tarefa */}
                            <button className="text-sm text-gray-500 hover:text-blue-500"
                              onClick={() => handleEditTask(item.id, item.title, item.summary, item.date)}>Editar</button>
                            <button className="text-sm text-gray-500 hover:text-red-500 mt-2"
                              onClick={() => handleDeleteTask(columnId, item.id)}>Excluir</button>
                            <button className="text-sm text-gray-500 hover:text-blue-500 mt-2"
                              onClick={() => openTaskDetails(item.id)}>Ampliar</button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div>
              {/* Botão para adicionar uma nova tarefa */}
              <button className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2 mt-4 hover:px-5 hover:py-2.5 text-center"
                onClick={() => { setShowAddTaskForm(true); setSelectedColumnId(columnId); }}>
                Criar Tarefa
              </button>

            </div>
          </div>
        ))}
      </DragDropContext>
      {/* Modal para adicionar nova tarefa */}
      {showAddTaskForm && (
        <TaskModal
          onClose={() => setShowAddTaskForm(false)}
          onSave={handleAddTask}
          selectedColumnId={selectedColumnId}
          task={newTask}
          setTask={setNewTask}
          isEdit={false}
        />
      )}
      {/* Modal para editar tarefa */}
      {editTask.id && (
        <TaskModal
          onClose={() => setEditTask({ id: null, title: "", summary: "", date: "" })}
          onSave={handleSaveTaskEdit}
          task={editTask}
          setTask={setEditTask}
          isEdit={true}
        />
      )}
      {/* Modal para detalhes da tarefa ampliada */}
      {expandedTask && (
        <TaskDetailsModal
          onClose={closeTaskDetails}
          task={Object.values(columns).flatMap(column => column.items).find(item => item.id === expandedTask)}
        />
      )}
    </div>
  );
}

export default Home;
