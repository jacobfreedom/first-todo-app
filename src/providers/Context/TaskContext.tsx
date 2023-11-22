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

  // const itemDivider = () => {
  //   const inProgressItems = todoItems.filter(
  //     (item) =>
  //       item.props.todoItemData &&
  //       !item.props.todoItemData.taskChecked
  //   );
  
  //   const finishedItems = todoItems.filter(
  //     (item) =>
  //       item.props.todoItemData &&
  //       item.props.todoItemData.taskChecked
  //   );
  
  //   setInProgressItems(sortWithDirection(inProgressItems, (data) => data.createdTimestamp, 'asc'));
  //   setFinishedItems(sortWithDirection(finishedItems, (data) => data.createdTimestamp, 'asc'));
  // };
  
    // // Filter the items based on their checked status
    // const inProgressItems = todoItems.filter((item) => {
    //   if (React.isValidElement(item)) {
    //     const todoData = item.props.todoItemData;
    //     return todoData && !todoData.taskChecked;
    //   }
    //   return false;
    // });

    // const finishedItems = todoItems.filter((item) => {
    //   if (React.isValidElement(item)) {
    //     const todoData = item.props.todoItemData;
    //     return todoData && todoData.taskChecked;
    //   }
    //   return false;
    // });

  

  const [itemsToShow, setItemsToShow] = useState<number>(5);
  const [itemsToShowInProgress, setItemsToShowInProgress] = useState<number>(5);
  const [itemsToShowFinished, setItemsToShowFinished] = useState<number>(5);

  const [inProgressItems, setInProgressItems] = useState<TodoItem[]>([]);
  const [finishedItems, setFinishedItems] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Add this line


  // const loadMoreItems = (tab: 'In Progress' | 'Finished') => {
  //   // Check if the loading animation is already in progress
  //   if (isLoading) {
  //     return;
  //   }
  
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     let currentItemsToShow: number = 0;
  //     let setItemsToShowFunction: React.Dispatch<React.SetStateAction<number>> = setItemsToShow;
  
  //     if (tab === 'In Progress') {
  //       currentItemsToShow = itemsToShowInProgress;
  //       setItemsToShowFunction = setItemsToShowInProgress;
  //     } else if (tab === 'Finished') {
  //       currentItemsToShow = itemsToShowFinished;
  //       setItemsToShowFunction = setItemsToShowFinished;
  //     }
  
  //     const maxItemsToShow = tab === 'In Progress' ? inProgressItems.length : finishedItems.length;
  
  //     console.log('Current Items To Show:', currentItemsToShow);
  //     console.log('Max Items To Show:', maxItemsToShow);
  //     console.log('In Progress Items:', inProgressItems);
  //     console.log('Finished Items:', finishedItems);
  
  //     // Increment the number of items to show by 5 until it reaches the maximum
  //     setItemsToShowFunction((prev) => {
  //       const newItemsToShow = Math.min(prev + 5, maxItemsToShow);
  //       console.log('New Items To Show:', newItemsToShow);
  //       return newItemsToShow;
  //     });
  
  //     // Check if the user has scrolled to the bottom again during the loading delay
  //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //       // If scrolled to the bottom again, continue loading (do not set loading state to false)
  //       loadMoreItems(tab);
  //     } else {
  //       // If not scrolled to the bottom again, set loading state to false
  //       setIsLoading(false);
  //     }
  //   }, 1000); // Simulated loading delay of 1 second
  // };


  
    // const loadMoreItems = (tab: 'In Progress' | 'Finished') => {
    //   // Determine the appropriate state and function based on the selected tab
    //   const itemsToShowState = tab === 'In Progress' ? itemsToShowInProgress : itemsToShowFinished;
    //   const setItemsToShowState = tab === 'In Progress' ? setIsLoading : setItemsToShowFinished; // Adjust this line as needed
  
    //   // Increase the number of items to show (e.g., load 10 more items)
    //   setItemsToShowState(itemsToShowState + 10);
  
    //   // Add a delay to simulate an asynchronous data fetch
    //   setTimeout(() => {
    //     // Update the loading state to false after a delay (simulating data fetching completion)
    //     setIsLoading(false);
    //   }, 1000); // Adjust the delay as needed
  
    //   // You can also trigger any additional logic related to data fetching here
    // };

  
  
  
  
  
  
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

  const sortAndSetItems = (
    accessor: (data: TodoItemData) => number | string,
    sortDirection: 'asc' | 'desc'
  ) => {
    const sortedItems = sortWithDirection(
      todoItems,
      (data) => accessor(data),
      sortDirection
    );
    setTodoItems(sortedItems);
  };

  // const sortAndSetItems = (
  //   accessor: (data: TodoItemData) => number | string,
  //   sortDirection: 'asc' | 'desc',
  // ) => {
  //   // const tab = selectedTabContext;
  //   const sortedItems = sortWithDirection(
  //     todoItems,
  //     (data) => accessor(data),
  //     sortDirection
  //   );
  //   setTodoItems(sortedItems);
  //   // if (tab === 'In Progress') {
  //   //   setInProgressItems(sortedItems);
  //   // } else if (tab === 'Finished') {
  //   //   setFinishedItems(sortedItems);
  //   // }
  // };
  

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
  

  // const handleSortChange = (sortOption: string, reversed: boolean) => {
  //   const sortDirection = reversed ? 'desc' : 'asc';
  
  //   switch (sortOption) {
  //     case 'createdTimestamp':
  //       sortAndSetItems((data) => data.createdTimestamp, sortDirection);
  //       break;
  //     case 'title':
  //       sortAndSetItems((data) => data.taskTitleValue, sortDirection);
  //       break;
  //     case 'priority':
  //       sortAndSetItems((data) => data.priorityValue.value, sortDirection);
  //       break;
  //     case 'date':
  //       sortAndSetItems((data) => new Date(data.dateValue).getTime(), sortDirection);
  //       break;
  //     default:
  //       break;
  //   }
  // };

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
        inProgressItems,
        finishedItems,
        // loadMoreItems,
        itemsToShowInProgress,
        itemsToShowFinished,
        itemsToShow,
        isLoading,
        setIsLoading,
        sortAndSetItems,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};