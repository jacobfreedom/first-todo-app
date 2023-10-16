import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Select,
  SelectItem,
} from '@nextui-org/react'; // Replace 'your-ui-library' with the actual library you're using

const NewTodoForm = ({ isOpen, onOpenChange, priorities, onAddTodo }) => {
  const [taskTitleValue, setTaskTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [selectedPriority, setSelectedPriority] = useState(priorities[0].value);
  const [dateValue, setDateValue] = useState('');

  const CloseModal = () => {
    onOpenChange(false);
  };

  const handleAddTodo = () => {
    const newTodo = {
      title: taskTitleValue,
      description: descriptionValue,
      priority: selectedPriority,
      date: dateValue,
    };

    // You can perform any additional logic, like validation, before adding the todo

    onAddTodo(newTodo);
    CloseModal();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop="blur">
      <ModalHeader className="flex flex-col gap-1 items-center">Your New Task</ModalHeader>
      <ModalBody>
        <div className="flex flex-col gap-6">
          <Input
            isRequired
            type="text"
            label="Title"
            labelPlacement="outside"
            placeholder="What's the goal?"
            className="mt-8"
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
          <Select label="Priority" value={selectedPriority} onChange={setSelectedPriority}>
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
        <Button color="primary" onPress={handleAddTodo}>
          Add
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default NewTodoForm;
