import React, { createContext, useContext, useState, useEffect, ChangeEvent, ReactNode } from "react";


// Define your priorities
const priorities = [
  { label: "🤷 None", value: "none" },
  { label: "😴 Low", value: "low" },
  { label: "🎭 Medium", value: "medium" },
  { label: "🔥 High", value: "high" },
];

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
    priorityValue: { label: string; value: string };
    dateValue: string;
  };
  resetTodoValues: () => void;
  statusColorMap: Record<string, string>;
  NewTodoItemSaving: () => void;
  storedTodoItem: {
    taskTitleValue: string;
    descriptionValue: string;
    priorityValue: { label: string; value: string };
    dateValue: string;
  };
  todoGrabbing: () => void;
  descriptionStringChecker: (descriptionString: string) => string;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

interface TaskProviderProps {
    children: ReactNode;
  }

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [taskTitleValue, setTaskTitleValue] = useState<string>('');
  const [descriptionValue, setDescriptionValue] = useState<string>('');
  const [priorityValue, setPriorityValue] = useState(priorities[0]);
  const [dateValue, setDateValue] = useState<string>('');
  const [todoValues, setTodoValues] = useState({
    taskTitleValue: '',
    descriptionValue: '',
    priorityValue: { label: '', value: '' },
    dateValue: '',
  });
  const [storedTodoItem, setStoredTodoItem] = useState({
    taskTitleValue: '',
    descriptionValue: '',
    priorityValue: { label: '', value: '' },
    dateValue: '',
  });

  const resetTodoValues = () => {
    setTaskTitleValue('');
    setDescriptionValue('');
    setPriorityValue(priorities[0]);
    setDateValue('');
  };

  const onPriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedPriority = priorities.find((priority) => priority.value === e.target.value);
    setPriorityValue(selectedPriority!);
  };

  const statusColorMap: Record<string, string> = {
    none: "default",
    low: "success",
    medium: "warning",
    high: "danger",
  };

  const NewTodoItemSaving = () => {
    const timestamp = new Date().getTime();
    const key = `todoValues_${timestamp}`;
    localStorage.setItem(key, JSON.stringify(todoValues));
  };

  const todoGrabbing = () => {
    const storageKeys = Object.keys(localStorage);
    storageKeys.forEach((key) => {
      const storedItemString = localStorage.getItem(key);
      if (storedItemString) {
        const storedTodoValues = JSON.parse(storedItemString);
        console.log(`Key: ${key}, Value:`, storedTodoValues);
      }
    });

    const keyToRetrieve = 'todoValues_1697470760955'; // Replace with the actual unique key
    const storedItemString = localStorage.getItem(keyToRetrieve);
    if (storedItemString) {
      const storedTodoValues = JSON.parse(storedItemString);
      console.log(storedTodoValues);
      setStoredTodoItem(storedTodoValues);
    } else {
      console.log("Item not found in local storage.");
    }
  };

  useEffect(() => {
    // Call NewTodoGrabbing to retrieve and set the priority label when the component mounts
    todoGrabbing();
  }, []);

  const descriptionStringChecker = (descriptionString: string) => {
    return descriptionString.length > 120
      ? `${descriptionString.substring(0, 120)}...`
      : descriptionString;
  };

  return (
    <TaskContext.Provider
      value={{
        taskTitleValue,
        setTaskTitleValue,
        descriptionValue,
        setDescriptionValue,
        priorities,
        onPriorityChange,
        dateValue,
        setDateValue,
        todoValues,
        resetTodoValues,
        statusColorMap,
        NewTodoItemSaving,
        storedTodoItem,
        todoGrabbing,
        descriptionStringChecker,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
  