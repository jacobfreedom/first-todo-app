import React from 'react';
import { Button, Modal, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { useTaskContext } from '@/providers/Context/TaskContext';
import { TodoItemData } from '@/providers/Types/Types';
import { useColor } from '@/app/ColorContext';
import { EditIcon } from '@/icons/EditIcon';


interface EditTaskModalProps {
  task: TodoItemData | null;
}

const TaskEditModal: React.FC<EditTaskModalProps> = ({ task }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { statusColorMap } = useTaskContext();
  const { selectedColor } = useColor();

  const onSaveChanges = () => {
    // Handle saving the edited task and closing the modal
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
        <EditIcon className={selectedColor}/>
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
          <ModalHeader>Edit Task</ModalHeader>
          <form>
            <div>
              {/* Input fields to edit the task */}
              <input type="text" value={task?.taskTitleValue || ''} />
              {/* Add other input fields for editing description, priority, and date */}
            </div>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color={selectedColor}
                onPress={onSaveChanges}
              >
                Save Changes
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskEditModal;
