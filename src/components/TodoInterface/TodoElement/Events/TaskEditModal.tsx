import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Input,
  Select,
  ModalBody,
  Textarea,
  SelectItem,
} from "@nextui-org/react";
import { useTaskContext } from "@/providers/Context/TaskContext";
import { TodoItemData } from "@/providers/Types/Types";
import { useUserContext } from "@/providers/Context/UserContext";
import { EditIcon } from "@/icons/EditIcon";
import { priorities } from "@/providers/Types/Types";
import { useForm } from "react-hook-form";

interface FormInput {
  taskTitle: string;
  description: string;
  priority: string;
  date: string;
}

const TaskEditModal: React.FC<{ task: TodoItemData; taskKey: string }> = ({
  task,
  taskKey,
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { updateTask } = useTaskContext();
  const { selectedColor } = useUserContext();
  const {
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
  } = useForm<FormInput>();

  const [editedTask, setEditedTask] = React.useState<TodoItemData | null>(task);

  const initialTaskValues = { ...task }; // Save the initial values of the task

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
      const selectedPriority = priorities.find(
        (priority) => priority.value === newValue,
      );

      if (selectedPriority) {
        const updatedTask = { ...editedTask, priorityValue: selectedPriority };
        setEditedTask(updatedTask);
      }
    }
  };

  // Function to reset editedTask to its initial values
  const resetEditedTask = () => {
    setEditedTask({ ...initialTaskValues });
  };

  const CloseModal = () => {
    onClose();
    resetEditedTask();
    clearErrors();
  };

  const onSaveChanges = async () => {
    if (editedTask) {
      await updateTask(taskKey, editedTask); // Update the task using its specific key
      onClose();
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
        <EditIcon className={selectedColor} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        backdrop="blur"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                Edit Your Task
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-6">
                  <Input
                    isRequired
                    type="text"
                    label="Title"
                    labelPlacement="outside"
                    defaultValue={task?.taskTitleValue}
                    className="mt-8"
                    autoComplete="off"
                    isInvalid={!!errors.taskTitle}
                    errorMessage={errors.taskTitle?.message || ""}
                    value={editedTask?.taskTitleValue}
                    onValueChange={(value) => handleTaskTitleChange(value)}
                    {...register("taskTitle", {
                      required: "Title is required",
                    })}
                  />

                  <Textarea
                    isRequired
                    minRows={2}
                    type="text"
                    label="Description"
                    labelPlacement="outside"
                    defaultValue={task?.descriptionValue}
                    autoComplete="off"
                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message || ""}
                    value={editedTask?.descriptionValue}
                    onValueChange={(value) => handleDescriptionChange(value)}
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />

                  <Select
                    label="Priority"
                    placeholder={task?.priorityValue.label}
                    onChange={(e) => handlePriorityChange(e.target.value)}
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
                    autoComplete="off"
                    isInvalid={!!errors.date}
                    errorMessage={errors.date?.message || ""}
                    value={editedTask?.dateValue}
                    onValueChange={(value) => handleDateChange(value)}
                    {...register("date", { required: "Date is required" })}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={CloseModal}>
                  Discard
                </Button>
                <Button
                  color={selectedColor}
                  onClick={handleSubmit(onSaveChanges)}
                >
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
