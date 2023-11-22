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

  type TodoItem = React.ReactElement<{ todoItemData: TodoItemData, key: string }>;


  
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
    handleTaskAdded: () => void;
    refreshTaskList: () => void;
    handleSortChange: (sortOption: string, reversed: boolean) => void;
    sortAndSetItems: (
      accessor: (data: TodoItemData) => number | string,
      sortDirection: 'asc' | 'desc',
      tab: 'In Progress' | 'Finished'
    ) => void;
  }
  
  // Types related to the TodoItem
  interface TodoItemData {
    key: string;
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
    selectedTab: string;
    setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
    handleSelectedTabChange: (newTab: string) => void;
  }
  

// Export all types
export {
  priorities
};

export type {
  TaskContextType,
  UserContextType,
  TodoItemData,
};
  