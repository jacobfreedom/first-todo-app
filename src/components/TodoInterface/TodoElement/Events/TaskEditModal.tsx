import React from 'react';
import { Button, Modal, ModalContent, ModalFooter, ModalHeader, useDisclosure, Input, Select, ModalBody, Textarea, SelectItem } from '@nextui-org/react';
import { useTaskContext } from '@/providers/Context/TaskContext';
import { TodoItemData } from '@/providers/Types/Types';
import { useUserContext } from '@/providers/Context/UserContext';
import { EditIcon } from '@/icons/EditIcon';
import { priorities } from '@/providers/Types/Types';

const TaskEditModal: React.FC<{ task: TodoItemData; taskKey: string }> = ({ task, taskKey }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { handleTaskAdded } = useTaskContext();
  const { selectedColor } = useUserContext();

  const onSaveChanges = async () => {
    if (editedTask) {
      localStorage.setItem(taskKey, JSON.stringify(editedTask)); // Update the task using its specific key
      handleTaskAdded(); // This triggers the refresh after an edit
      onClose();
    }
  };
  
  const [editedTask, setEditedTask] = React.useState<TodoItemData | null>(task);

  // Function to update the editedTask object locally
  const handleTaskTitleChange = (newValue: string) => {
    if (editedTask) {
      setEditedTask({ ...editedTask, taskTitleValue: newValue });
    }
  };

  // Function to update the description
  const handleDescriptionChange = (newValue: string) => {
    if (editedTask) {
      setEditedTask({ ...editedTask, descriptionValue: newValue });
    }
  };

  // Function to update the date
  const handleDateChange = (newValue: string) => {
    if (editedTask) {
      setEditedTask({ ...editedTask, dateValue: newValue });
    }
  };

  const handlePriorityChange = (newValue: string) => {
    if (editedTask) {
      const selectedPriority = priorities.find((priority) => priority.value === newValue);
  
      if (selectedPriority) {
        // Since setPriorityValue is not available here, update the task directly
        const updatedTask = { ...editedTask, priorityValue: selectedPriority };
        setEditedTask(updatedTask);
      }
    }
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

    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop='blur'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center">Your New Task</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-6">
                <Input
                  isRequired
                  type="text"
                  label="Title"
                  labelPlacement="outside"
                  defaultValue={task?.taskTitleValue}
                  className='mt-8'
                  value={editedTask?.taskTitleValue}
                  onValueChange={(value) => handleTaskTitleChange(value)}
                />

                <Textarea
                  isRequired
                  minRows={2}
                  type="text"
                  label="Description"
                  labelPlacement="outside"
                  defaultValue={task?.descriptionValue}
                  value={editedTask?.descriptionValue}
                  onValueChange={(value) => handleDescriptionChange(value)}
                />

                <Select
                  label="Priority"
                  placeholder={task?.priorityValue.label}
                  onChange={e => handlePriorityChange(e.target.value)}
                >
                  {priorities.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </Select>

                <Input
                  isRequired
                  type="date"
                  label="Date"
                  labelPlacement="outside"
                  placeholder="DD/MM/YYYY"
                  value={editedTask?.dateValue}
                  onValueChange={(value) => handleDateChange(value)}
                />
                <p className="text-small text-default-500">Selected: {task?.dateValue}</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Discard
              </Button>
              <Button color={selectedColor} onPress={onSaveChanges}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    </>
  );
};

export default TaskEditModal;
