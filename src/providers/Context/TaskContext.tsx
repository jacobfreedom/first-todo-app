"use client"

import React, { createContext, useContext, useState, useEffect, ChangeEvent, ReactNode } from "react";
import TodoItemElement from "@/components/TodoInterface/TodoElement/TodoItem";
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
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);


  const todoValues = {
    taskTitleValue: taskTitleValue,
    descriptionValue: descriptionValue,
    priorityValue: priorityValue,
    dateValue: dateValue,
  };

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
    // Generate a unique key based on a timestamp
    const timestamp = new Date().getTime();
    const key = `todoValues_${timestamp}`;

    const todoValuesWithTimestamp = {
      ...todoValues,
      createdTimestamp: timestamp, // Add createdTimestamp to todoValues
      taskChecked: false,
    };

    // Save the current todoValues to local storage with the unique key
    localStorage.setItem(key, JSON.stringify(todoValuesWithTimestamp));
  };

  const titleStringChecker = (titleString: string) => {
    return titleString.length > 40
      ? `${titleString.substring(0, 40)}...`
      : titleString;
  };

  const descriptionStringChecker = (descriptionString: string) => {
    return descriptionString.length > 120
      ? `${descriptionString.substring(0, 120)}...`
      : descriptionString;
  };

  const refreshTaskList = () => {
    const storageKeys = Object.keys(localStorage);
    const newTodoItems: TodoItem[] = [];
  
    storageKeys.forEach((key) => {
      const storedItem = localStorage.getItem(key);
      if (storedItem) {
        const storedTodoValues: TodoItemData = JSON.parse(storedItem);
        if (storedTodoValues.createdTimestamp) {
          const todoItem = (
            <TodoItemElement key={key} todoItemData={storedTodoValues} taskKey={key} />
          );
          newTodoItems.push(todoItem);
        }
      } else {
        console.log("Item not found in local storage.");
      }
    });

    const sortedItems = sortWithDirection(
      newTodoItems,
      (data) => data.createdTimestamp,
      'asc'
    );
  


    setTodoItems(sortedItems);
  };
  
  type TodoItem = React.ReactElement<{ todoItemData: TodoItemData, key: string }>;

  // Sorting functions
  const sortWithDirection = (
    items: TodoItem[],
    accessor: (data: TodoItemData) => number | string,
    direction: 'asc' | 'desc'
  ): TodoItem[] => {
    return items
      .filter(
        (item) =>
          React.isValidElement(item) &&
          item.props.todoItemData &&
          accessor(item.props.todoItemData) !== undefined
      )
      .sort((a, b) => {
        const valA = accessor(a.props.todoItemData);
        const valB = accessor(b.props.todoItemData);
  
        if (valA !== undefined && valB !== undefined) {
          if (typeof valA === 'string' && typeof valB === 'string') {
            return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
          } else {
            return direction === 'asc' ? +valA - +valB : +valB - +valA;
          }
        }
        return 0;
      });
  };

  // const sortAndSetItems = (
  //   accessor: (data: TodoItemData) => number | string,
  //   sortDirection: 'asc' | 'desc'
  // ) => {
  //   const sortedItems = sortWithDirection(
  //     todoItems,
  //     (data) => accessor(data),
  //     sortDirection
  //   );
  //   setTodoItems(sortedItems);
  // };

  const sortAndSetItems = (
    accessor: (data: TodoItemData) => number | string,
    sortDirection: 'asc' | 'desc',
  ) => {
    const sortedItems = sortWithDirection(
      todoItems,
      (data) => accessor(data),
      sortDirection
    );
    setTodoItems(sortedItems);
  };
  

  const sortOptions: Record<string, (data: TodoItemData) => number | string> = {
    createdTimestamp: (data) => data.createdTimestamp,
    title: (data) => data.taskTitleValue,
    priority: (data) => data.priorityValue.value,
    date: (data) => new Date(data.dateValue).getTime(),
  };
  
  const handleSortChange = (sortOption: string, reversed: boolean) => {
    const sortDirection = reversed ? 'desc' : 'asc';
    const accessor = sortOptions[sortOption];
    
    if (accessor) {
      sortAndSetItems(accessor, sortDirection);
    }
  };


  useEffect(() => {
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
        descriptionStringChecker,
        titleStringChecker,
        todoItems,
        handleTaskAdded,
        refreshTaskList,
        handleSortChange,
        sortAndSetItems,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};