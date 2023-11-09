import React from 'react';
import { TodoItemData } from '@/providers/Types/Types';
import { Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { EyeIcon } from '@/icons/EyeIcon';

import { useTaskContext } from '@/providers/Context/TaskContext';
import { useColor } from '@/app/ColorContext';


interface TaskViewModalProps {
  task: TodoItemData; // Allow task to be null
}

const TaskViewModal: React.FC<TaskViewModalProps> = ({ task }) => {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {statusColorMap} = useTaskContext();
  const {selectedColor} = useColor();

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
                  <Chip
                    className='capitalize'
                    color={statusColorMap[task?.priorityValue.value]}
                    size="sm"
                    variant="flat"
                  >
                    {task?.priorityValue.label}
                  </Chip>
                  {task?.dateValue}
                </div>

                {task?.descriptionValue}
              </ModalBody>

              <ModalFooter>
                <Button color={selectedColor} onPress={onClose}>
                  Close
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
