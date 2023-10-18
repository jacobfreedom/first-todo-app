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
} from "@nextui-org/react";
import { useColor } from '@/app/ColorContext';
import { useTaskContext } from '@/providers/Context/TaskContext';
import styles from '@/styles/Home.module.scss'


const NewTaskForm = ({
    onOpenChange,
    onClose,
    CloseModal
}) => {
  const {
    taskTitleValue,
    setTaskTitleValue,
    descriptionValue,
    setDescriptionValue,
    priorities,
    onPriorityChange,
    dateValue,
    setDateValue,
    todoValues,
    NewTodoItemSaving,
    todoGrabbing,
  } = useTaskContext();
  
  const { selectedColor, setSelectedColor } = useColor();

  return (
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
              <Button color={selectedColor} onPress={() => {
                // Do something with the 'allValues' object, for example, pass it to a function or log it.
                console.log(todoValues);

                NewTodoItemSaving();
                todoGrabbing();

                // Close the modal or perform other actions as needed
                CloseModal();
              }}>
                Add
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NewTaskForm;
