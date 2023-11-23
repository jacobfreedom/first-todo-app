import React from 'react';
import { TodoItemData } from '@/providers/Types/Types';
import { Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { EyeIcon } from '@/icons/EyeIcon';
import { useTaskContext } from '@/providers/Context/TaskContext';
import { useUserContext } from '@/providers/Context/UserContext';
import { MdOutlineDateRange } from "react-icons/md";


const TaskViewModal: React.FC<{
    task: TodoItemData;
    onUpdateStatus: (status: boolean) => void;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
    taskKey: string;
  }> = ({ task, onUpdateStatus, setIsChecked, taskKey }) => {

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const {statusColorMap, refreshTaskList} = useTaskContext();
  const {selectedColor} = useUserContext();

  const handleStatusChange = () => {
    const updatedStatus = !task.taskChecked;
    onUpdateStatus(updatedStatus);
    setIsChecked(updatedStatus);
    onClose();
  };
  

  return (
    <>
      <Button
            isIconOnly
            variant="light"
            color={selectedColor}
            className="text-lg"
            onPress={onOpen}
          >
            <EyeIcon className={selectedColor}/>
      </Button>

      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        isDismissable={false} 
        backdrop='blur'
        scrollBehavior='inside'
        size='2xl'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b-[1px]">
                {task?.taskTitleValue}
              </ModalHeader>
              
              <ModalBody>
                <div className='flex justify-between'>
                  <div className='flex items-center'>
                  <MdOutlineDateRange />
                  {task?.dateValue}
                  </div>

                  <Chip
                    className='capitalize'
                    color={statusColorMap[task?.priorityValue.value]}
                    size="sm"
                    variant="flat"
                  >
                    {task?.priorityValue.label}
                  </Chip>
                </div>

                {task?.descriptionValue}
              </ModalBody>

              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>

                <Button color={selectedColor} onPress={handleStatusChange}>
                  Move to {task.taskChecked ? 'In Progress' : 'Finished'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskViewModal;
