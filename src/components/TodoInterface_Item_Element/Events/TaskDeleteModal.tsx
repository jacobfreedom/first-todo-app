import React from 'react';
import { Button, Modal, ModalContent, ModalFooter, ModalHeader, useDisclosure, Input, Select, ModalBody, Textarea, SelectItem } from '@nextui-org/react';
import { useTaskContext } from '@/providers/Context/TaskContext';
import { TodoItemData } from '@/providers/Types/Types';
import { useColor } from '@/app/ColorContext';
import { EditIcon } from '@/icons/EditIcon';
import { priorities } from '@/providers/Types/Types';
import { DeleteIcon } from '@/icons/DeleteIcon';

const TaskDeleteModal: React.FC<{ taskKey: string }> = ({ taskKey }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { handleTaskAdded } = useTaskContext();
  const { selectedColor } = useColor();

//   const onSaveChanges = async () => {
//     if (editedTask) {
//       localStorage.setItem(taskKey, JSON.stringify(editedTask)); // Update the task using its specific key
//       handleTaskAdded(); // This triggers the refresh after an edit
//       onClose();
//     }
//   };

const onDeleteTask = () => {
    if (taskKey) {
      localStorage.removeItem(taskKey); // Remove the task using its specific key
      handleTaskAdded(); // Refresh the tasks list after deletion
      onClose();
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