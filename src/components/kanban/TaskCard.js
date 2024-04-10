import { useState } from "react";
import TaskModal from "../TaskModal";
import TaskDetailsModal from "../taskModalDetail";

function TaskCard({provided, item, columnId, onDelete, onEdit }){

    const [ isExpanded, setIsExpanded ] = useState(false);
    const [ isFormModalOpen, setIsFormModalOpen ] = useState(false);

    const handleCloseFormModal = () => {
        setIsFormModalOpen(false);
    }

    const handleCloseExpand = () => {
        setIsExpanded(false);
    }

    return (
        <>
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
                        onClick={() => setIsFormModalOpen(true)}>Editar</button>
                    <button className="text-sm text-gray-500 hover:text-red-500 mt-2"
                        onClick={() => onDelete(columnId, item.id)}>Excluir</button>
                    <button className="text-sm text-gray-500 hover:text-blue-500 mt-2"
                        onClick={() => setIsExpanded(true)}>Ampliar</button>
                </div>
            </div>
            {
                isFormModalOpen &&
                    <TaskModal
                        task={item}
                        onClose={handleCloseFormModal}
                        onEdit={onEdit}
                    />
            }
            {/* Modal para detalhes da tarefa ampliada */}
            {
                isExpanded && (
                    <TaskDetailsModal
                        task={item}
                        onClose={handleCloseExpand}
                    />
                )
            }
        </>
    )

}

export default TaskCard;
