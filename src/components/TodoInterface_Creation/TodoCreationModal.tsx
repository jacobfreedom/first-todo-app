import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Select,
  SelectItem,
  Button,
  useDisclosure
} from "@nextui-org/react";
import { useColor } from '@/app/ColorContext';
import { useTaskContext } from '@/providers/Context/TaskContext';
import { NewTaskIcon } from '@/icons/NewTaskIcon';

interface NewTaskFormProps {
  onTaskAdded: () => void; // Define the prop as a function that takes no arguments and returns void
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onTaskAdded }) => {

  const {
    taskTitleValue,
    setTaskTitleValue,
    descriptionValue,
    setDescriptionValue,
    priorities,
    onPriorityChange,
    dateValue,
    setDateValue,
    NewTodoItemSaving,
    resetTodoValues
  } = useTaskContext();
  
  const { selectedColor } = useColor();

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

  const CloseModal = () => {
    onClose();
    resetTodoValues();
  }

  const handleAddTask = async () => {
    await NewTodoItemSaving(); // Wait for the new task to be saved
    onTaskAdded(); // Notify the parent component that a task has been added
    CloseModal();
  };

  return (
    <>
    <Button fullWidth onPress={onOpen} variant='light'
    className='border-1 border-content3 text-default-400 py-6' startContent={<NewTaskIcon />}
    >
      New Task
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
                  placeholder="What's the goal?"
                  className='mt-8'
                  value={taskTitleValue}
                  onValueChange={setTaskTitleValue}
                />

                <Textarea
                  isRequired
                  minRows={2}
                  type="text"
                  label="Description"
                  labelPlacement="outside"
                  placeholder="What is it about? (Min rows 2)"
                  value={descriptionValue}
                  onValueChange={setDescriptionValue}
                />

                <Select
                  label="Priority"
                  placeholder={priorities[0].label}
                  onChange={e => onPriorityChange(e)}
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
                  value={dateValue}
                  onValueChange={setDateValue}
                />
                <p className="text-small text-default-500">Selected: {dateValue}</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={CloseModal}>
                Discard
              </Button>
              <Button color={selectedColor} onPress={handleAddTask}>
                Add
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    </>
  );
};

export default NewTaskForm;