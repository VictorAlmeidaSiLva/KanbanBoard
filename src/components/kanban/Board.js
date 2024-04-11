import { useState } from "react";
import BoardColumn from "./BoardColumn"
import { DragDropContext } from "react-beautiful-dnd";

function Board() {

  const [columns, setColumns] = useState({
    "1": { name: "A Fazer", items: [] },
    "2": { name: "Em Progresso", items: [] },
    "3": { name: "Concluído", items: [] }
  });


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

  const handleEditTask = (editedTask, columnId) => {
    const updatedItems = columns[columnId].items.map(task => {
      if (task.id === editedTask.id) {
        return editedTask;
      }
      return task;
    });
    setColumns(prevColumns => ({ ...prevColumns, [columnId]: { ...prevColumns[columnId], items: updatedItems } }))
  }

  const handleAddTask = (editedTask, columnId) => {
    setColumns(prevColumns => ({ ...prevColumns, [columnId]: { ...prevColumns[columnId], items: [...prevColumns[columnId].items, editedTask] } }))
  }

  const handleDeleteTask = (columnId, taskId) => {
    const updatedItems = columns[columnId].items.filter(task => task.id !== taskId);
    setColumns(prevColumns => ({ ...prevColumns, [columnId]: { ...prevColumns[columnId], items: updatedItems } }));
  };

  return (
    <div className="bg-blue-600 flex flex-col ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center p-2">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(columns).map(([columnId, column]) => (
            <BoardColumn
              key={"column-" + columnId}
              columnId={columnId}
              column={column}
              onEdit={handleEditTask}
              onCreate={handleAddTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </DragDropContext>
      </div>
    </div>

  );

}

export default Board;
