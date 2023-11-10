"use client"

import React, { createContext, useContext, useState, useEffect, ChangeEvent, ReactNode } from "react";
import TodoItem from "@/components/TodoInterface_Item_Element/TodoElement";
import { priorities, TaskContextType, TodoItemData } from "../Types/Types";

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


  const todoValues = {
    taskTitleValue: taskTitleValue,
    descriptionValue: descriptionValue,
    priorityValue: priorityValue,
    dateValue: dateValue,
  };


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

  const [todoItems, setTodoItems] = useState<React.ReactNode[]>([]);

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
    // Generate a unique key based on a timestamp
    const timestamp = new Date().getTime();
    const key = `todoValues_${timestamp}`;

    // Save the current todoValues to local storage with the unique key
    localStorage.setItem(key, JSON.stringify(todoValues));
  };



  // const todoGrabbing = () => {

  //   //prints all the items stored in local storage -> use for printing todo items

  //   const storageKeys = Object.keys(localStorage);

  //   // Iterate through the keys and retrieve and log each item

  //   storageKeys.forEach((key) => {
  //     const storedItem = localStorage.getItem(key);
  //     if (storedItem) {
  //       const storedTodoValues = JSON.parse(storedItem);
  //       console.log(`Key: ${key}, Value:`, storedTodoValues);

  //       setStoredTodoItem(storedTodoValues);
  //     } else {
  //       console.log("Item not found in local storage.");
  //     }
  //   });

  //   //will be used for removing

  //   // // Define the unique key you want to retrieve
  //   // const keyToRetrieve = 'todoValues_1697647052891'; // Replace with the actual unique key
  //   // const storedItem = localStorage.getItem(keyToRetrieve);
  //   // if (storedItem) {
  //   //   const storedTodoValues = JSON.parse(storedItem);
  //   //   console.log(storedTodoValues);

  //   //   // Set the priority label from the storedTodoValues in state
  //   //   setStoredTodoItem(storedTodoValues);
  //   // } else {
  //   //   console.log("Item not found in local storage.");
  //   // }
  // };


  const descriptionStringChecker = (descriptionString: string) => {
    return descriptionString.length > 120
      ? `${descriptionString.substring(0, 120)}...`
      : descriptionString;
  };

  const refreshTaskList = () => {
    const storageKeys = Object.keys(localStorage);
    const newTodoItems: React.ReactNode[] = [];

    storageKeys.forEach((key) => {
      const storedItem = localStorage.getItem(key);
      if (storedItem) {
        const storedTodoValues = JSON.parse(storedItem);
        newTodoItems.push(
          <TodoItem
            key={key}
            todoItemData={storedTodoValues}
            taskKey={key} // Pass the unique key to the TodoItem
          />
        );
      } else {
        console.log("Item not found in local storage.");
      }
    });

    setTodoItems(newTodoItems);
  };

  useEffect(() => {
    // Call the refreshTaskList function initially
    refreshTaskList();
  }, []);

  const handleTaskAdded = () => {
    // Trigger the refresh of the task list
    refreshTaskList();
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
        // todoGrabbing,
        descriptionStringChecker,
        todoItems,
        handleTaskAdded,
        refreshTaskList
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
