import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faExpand } from '@fortawesome/free-solid-svg-icons';
import TaskModal from "../TaskModal";
import TaskDetailsModal from "../taskModalDetail";

function TaskCard({ provided, item, columnId, onDelete, onEdit }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    const handleCloseFormModal = () => {
        setIsFormModalOpen(false);
    }

    const handleCloseExpand = () => {
        setIsExpanded(false);
    }


    const getTaskColorAndMessage = () => {
        const currentDate = new Date();
        const taskDate = new Date(item.date);
        const differenceInDays = Math.ceil((taskDate - currentDate) / (1000 * 60 * 60 * 24));

        let colorClass = '';
        let message = '';

        if (taskDate < currentDate) {
            colorClass = 'text-red-500'; 
            message = 'Atrasado';
        } else if (differenceInDays === 0 || differenceInDays === 1) {
            colorClass = 'text-yellow-500'; 
            message = 'Prioritário';
        } else {
            colorClass = '';
            message = 'Não prioritário';
        }

        return { colorClass, message };
    }

    const { colorClass, message } = getTaskColorAndMessage();

    return (
        <>
            <div
                {...provided.dragHandleProps}
                {...provided.draggableProps}
                ref={provided.innerRef}
                className="bg-white p-2 mb-2 rounded border border-gray-300 flex flex-col sm:flex-row justify-between items-center"
            >
                <div className="overflow-hidden w-full">
                    <h3 className={`font-semibold truncate w-full`}>
                        {item.title}
                    </h3>
                    <div className="text-gray-600 overflow-hidden truncate w-full" style={{ maxHeight: "1.5em" }}>
                        {item.summary}
                    </div>
                    <div className={`text-sm w-full ${colorClass}`}>
                        {item.date} - {message}
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <button className="text-sm text-gray-500 hover:text-blue-500 mb-2"
                        onClick={() => setIsFormModalOpen(true)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="text-sm text-gray-500 hover:text-red-500 mb-2"
                        onClick={() => onDelete(columnId, item.id)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                    <button className="text-sm text-gray-500 hover:text-blue-500 mb-2"
                        onClick={() => setIsExpanded(true)}>
                        <FontAwesomeIcon icon={faExpand} />
                    </button>
                </div>
            </div>
            {isFormModalOpen &&
                <TaskModal
                    task={item}
                    onClose={handleCloseFormModal}
                    onEdit={onEdit}
                />
            }
            {isExpanded &&
                <TaskDetailsModal
                    task={item}
                    onClose={handleCloseExpand}
                />
            }
        </>
    );
}

export default TaskCard;
