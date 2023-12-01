import { ChangeEvent } from "react";

// Define your priorities
const priorities: Priority[] = [
  { id: 0, label: "🤷 None", value: "none" },
  { id: 1, label: "😴 Low", value: "low" },
  { id: 2, label: "🎭 Medium", value: "medium" },
  { id: 3, label: "🔥 High", value: "high" },
];

// Common types
type Priority = { id: number; label: string; value: string };

type TodoItem = React.ReactElement<{ todoItemData: TodoItemData; key: string }>;

// Types related to the TaskContext
interface TaskContextType {
  taskTitleValue: string;
  setTaskTitleValue: React.Dispatch<React.SetStateAction<string>>;
  descriptionValue: string;
  setDescriptionValue: React.Dispatch<React.SetStateAction<string>>;
  priorities: typeof priorities;
  onPriorityChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  dateValue: string;
  setDateValue: React.Dispatch<React.SetStateAction<string>>;
  todoValues: {
    taskTitleValue: string;
    descriptionValue: string;
    priorityValue: Priority;
    dateValue: string;
  };
  resetTodoValues: () => void;
  statusColorMap: Record<string, any>;
  NewTodoItemSaving: () => void;
  descriptionStringChecker: (descriptionString: string) => string;
  titleStringChecker: (titleString: string) => string;
  todoItems: React.ReactElement<{ todoItemData: TodoItemData; key: string }>[];
  refreshTaskList: () => void;
  handleSortChange: (sortOption: string, reversed: boolean) => void;
  sortAndSetItems: (
    accessor: (data: TodoItemData) => number | string,
    sortDirection: "asc" | "desc",
    tab: "In Progress" | "Finished",
  ) => void;
  updateTask: (key: string, updatedTask: TodoItemData) => void;
}

// Types related to the TodoItem
interface TodoItemData {
  taskTitleValue: string;
  descriptionValue: string;
  priorityValue: Priority;
  dateValue: string;
  createdTimestamp: number; // New property for creation timestamp
  taskChecked: boolean;
}

interface UserContextType {
  selectedColor: any;
  setSelectedColor: (color: string) => void;
  selectedSortingOption?: string;
  setSelectedSortingOption?: (option: string) => void;
  handleSelectedSortingOptionChange?: (newSortingOption: string) => void;
}

// Export all types
export { priorities };

export type { TaskContextType, UserContextType, TodoItemData };
