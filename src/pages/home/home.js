import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';
import TaskModal from "../../components/taskModal";

function Home() {
  const initialColumns = {
    "1": { name: "A Fazer", items: [] },
    "2": { name: "Em Progresso", items: [] },
    "3": { name: "Concluído", items: [] }
  };
  const [columns, setColumns] = useState(initialColumns);
  const [newTask, setNewTask] = useState({ columnId: null, title: "", summary: "", date: "" });
  const [editTask, setEditTask] = useState({ id: null, title: "", summary: "", date: "" });
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState(null);

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


  const handleDeleteTask = (columnId, taskId) => {
    const updatedItems = columns[columnId].items.filter(task => task.id !== taskId);
    setColumns(prevColumns => ({ ...prevColumns, [columnId]: { ...prevColumns[columnId], items: updatedItems } }));
  };

  const handleEditTask = (taskId, title, summary, date) => {
    setEditTask({ id: taskId, title, summary, date });
  };

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

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(columns).map(([columnId, column]) => (
          <div key={columnId} style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h1>{column.name}</h1>
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <div ref={provided.innerRef} style={{ backgroundColor: "lightblue", width: 250, height: 500, padding: 10, margin: 10, overflow: "auto", overflowX:"hidden"  }}>
                  {column.items.map((item, index) => (
                    <Draggable draggableId={item.id} index={index} key={item.id}>
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          style={{
                            backgroundColor: "gray",
                            height: 100,
                            marginBottom: 10,
                            display: "flex",
                            justifyContent: "space-between",
                            overflow: "auto",
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div>
                            <h3>{item.title}</h3>
                            <div>{item.summary}</div>
                            <div>{item.date}</div>
                          </div>
                          <div>
                            <button onClick={() => handleEditTask(item.id, item.title, item.summary, item.date)}>Editar</button>
                            <button onClick={() => handleDeleteTask(columnId, item.id)}>x</button>
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
              <button onClick={() => { setShowAddTaskForm(true); setSelectedColumnId(columnId); }}>Criar Tarefa</button>
            </div>
          </div>
        ))}
      </DragDropContext>
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
      {editTask.id && (
        <TaskModal
          onClose={() => setEditTask({ id: null, title: "", summary: "", date: "" })}
          onSave={handleSaveTaskEdit}
          task={editTask}
          setTask={setEditTask}
          isEdit={true}
        />
      )}
    </div>
  );
}

export default Home;
