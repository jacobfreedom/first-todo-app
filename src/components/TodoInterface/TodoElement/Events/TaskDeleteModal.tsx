import React from 'react';
import { Button, Modal, ModalContent, ModalFooter, ModalHeader, useDisclosure, Input, Select, ModalBody, Textarea, SelectItem } from '@nextui-org/react';
import { useTaskContext } from '@/providers/Context/TaskContext';
import { useUserContext } from '@/providers/Context/UserContext';
import { DeleteIcon } from '@/icons/DeleteIcon';

const TaskDeleteModal: React.FC<{ taskKey: string, onDelete: () => void }> = ({ taskKey, onDelete }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { refreshTaskList } = useTaskContext();
  const { selectedColor } = useUserContext();

  const onDeleteTask = () => {
    if (taskKey) {
      localStorage.removeItem(taskKey); // Remove the task using its specific key
      onClose();
      
      // Call the onDelete callback to trigger the animation
      onDelete();
    }
  };

  return (
    <>
    <Button
      isIconOnly
      variant="light"
      color="danger"
      className="text-lg"
      onPress={onOpen}
    >
      <DeleteIcon />
    </Button>

    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop='blur' size='xs'>
      <ModalContent>
      {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center">Confrimation 🗑️</ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center">
                Are you sure you want to proceed?
              </div>
            </ModalBody>
            <ModalFooter className='justify-center'>
              <Button color={selectedColor} variant="light" onPress={onClose}>
                No
              </Button>
              <Button color="danger" variant='ghost' onPress={onDeleteTask}>
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    </>
  );
};

export default TaskDeleteModal;