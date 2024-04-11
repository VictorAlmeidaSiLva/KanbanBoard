import { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskModal from "../TaskModal";
import TaskCard from "./TaskCard"

function BoardColumn({ columnId, column, onEdit, onCreate, onExpand, onDelete }) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleCreate = (newTask) => {
    onCreate(newTask, columnId);
  }

  const handleEdit = (editedTask) => {
    onEdit(editedTask, columnId);
  }

  return (
    <div key={columnId} className="flex flex-col items-center bg-white rounded p-4">
      <h1 className="text-lg font-semibold mb-2 text-center">
        {column.name}
      </h1>
      <Droppable droppableId={columnId} key={columnId}>
        {(provided) => (
          <div className="flex flex-col items-center w-full">
            <div
              ref={provided.innerRef}
              className="bg-gray-200 rounded w-full sm:w-72 h-96 p-2 overflow-auto mb-4 sm:mb-0"
            >
              {column.items.map((item, index) => (
                <Draggable draggableId={item.id} index={index} key={item.id}>
                  {(provided) => (
                    <TaskCard
                      provided={provided}
                      item={item}
                      columnId={columnId}
                      onEdit={handleEdit}
                      onExpand={onExpand}
                      onDelete={onDelete}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
      <div className="flex justify-center w-full sm:w-72">
        <button className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2 mt-4"
          onClick={() => setIsModalOpen(true)}
        >
          Criar Tarefa
        </button>
        {isModalOpen && (
          <TaskModal
            onCreate={handleCreate}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>




  )
}

export default BoardColumn;
