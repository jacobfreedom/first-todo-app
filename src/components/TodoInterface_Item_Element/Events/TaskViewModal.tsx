import React from 'react';
import { TodoItemData } from '@/providers/Types/Types';
import { Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { EyeIcon } from '@/icons/EyeIcon';

import { useTaskContext } from '@/providers/Context/TaskContext';
import { useColor } from '@/app/ColorContext';


interface TaskViewModalProps {
  task: TodoItemData | null; // Allow task to be null
}

const TaskViewModal: React.FC<TaskViewModalProps> = ({ task }) => {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {statusColorMap, onViewTask} = useTaskContext();
  const {selectedColor} = useColor();

  return (
    <>
      {/* <Button onPress={onOpen} color="secondary">Open Modal</Button> */}
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
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
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
                <Button color={selectedColor} variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" onPress={onClose}>
                  Action
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
