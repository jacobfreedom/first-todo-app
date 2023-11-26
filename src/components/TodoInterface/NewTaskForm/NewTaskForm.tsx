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
import { useForm, SubmitHandler } from 'react-hook-form';
import { useUserContext } from '@/providers/Context/UserContext';
import { useTaskContext } from '@/providers/Context/TaskContext';
import { NewTaskIcon } from '@/icons/NewTaskIcon';

interface FormInput {
  taskTitle: string;
  description: string;
  priority: string;
  date: string;
}

const NewTaskForm: React.FC = () => {

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

  const { selectedColor } = useUserContext();
  const { refreshTaskList } = useTaskContext();

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

  const {
    handleSubmit,
    register,
    formState: { errors },
    clearErrors
  } = useForm<FormInput>();

  const CloseModal = () => {
    onClose();
    resetTodoValues();
    clearErrors();
  }

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    // Handle form submission here
    console.log(data);
    await NewTodoItemSaving();
    refreshTaskList();
    CloseModal();
  };

  return (
    <>
    <Button fullWidth onPress={onOpen} variant='light'
    className='border-1 border-content3 text-default-400 py-6 mx-6' startContent={<NewTaskIcon />}
    >
      New Task
    </Button>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop='blur' placement='center'>
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
                  autoComplete='off'
                  isInvalid={!!errors.taskTitle}
                  errorMessage={errors.taskTitle?.message || ""}
                  className='mt-8'
                  value={taskTitleValue}
                  onValueChange={setTaskTitleValue}
                  {...register('taskTitle', { required: 'Title is required' })}
                />

                <Textarea
                  isRequired
                  minRows={2}
                  type="text"
                  label="Description"
                  labelPlacement="outside"
                  placeholder="What is it about? (Min rows 2)"
                  autoComplete='off'
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message || ""}
                  value={descriptionValue}
                  onValueChange={setDescriptionValue}
                  {...register('description', { required: 'Description is required' })}
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
                  autoComplete='off'
                  isInvalid={!!errors.date}
                  errorMessage={errors.date?.message || ""}
                  value={dateValue}
                  onValueChange={setDateValue}
                  {...register('date', { required: 'Date is required' })}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={CloseModal}>
                Discard
              </Button>
              <Button color={selectedColor} onPress={handleSubmit(onSubmit)}>
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