import { ChangeEvent } from "react";

// Define your priorities
const priorities = [
    { label: "🤷 None", value: "none" },
    { label: "😴 Low", value: "low" },
    { label: "🎭 Medium", value: "medium" },
    { label: "🔥 High", value: "high" },
  ];
  
  // Common types
  type Priority = { label: string; value: string };
  
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
    storedTodoItem: {
      taskTitleValue: string;
      descriptionValue: string;
      priorityValue: Priority;
      dateValue: string;
    };
    descriptionStringChecker: (descriptionString: string) => string;
    todoItems: React.ReactNode[];
    handleTaskAdded: () => void;
    onEditTask: (task: TodoItemData) => void;
    onDeleteTask: (task: TodoItemData) => void;
  }
  
  // Types related to the TodoItem
  interface TodoItemData {
    taskTitleValue: string;
    descriptionValue: string;
    priorityValue: Priority;
    dateValue: string;
  }
  
// Export all types
export {
  priorities
};

export type {
  TaskContextType,
  TodoItemData
};
  