"use client"

import React, { createContext, useContext, useState, useEffect, ChangeEvent, ReactNode } from "react";
import TodoItem from "@/components/TodoInterface/TodoElement/TodoItem";
import { priorities, TaskContextType, TodoItemData } from "../Types/Types";
import { useUserContext } from "./UserContext";

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

  const resetTodoValues = () => {
    setTaskTitleValue('');
    setDescriptionValue('');
    setPriorityValue(priorities[0]);
    setDateValue('');
  };

  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

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

  const descriptionStringChecker = (descriptionString: string) => {
    return descriptionString.length > 120
      ? `${descriptionString.substring(0, 120)}...`
      : descriptionString;
  };



  // const refreshTaskList = () => {
  //   const storageKeys = Object.keys(localStorage);
  //   const newTodoItems: { key: string, todoItemData: TodoItemData }[] = [];
  
  //   storageKeys.forEach((key) => {
  //     const storedItem = localStorage.getItem(key);
  //     if (storedItem) {
  //       const storedTodoValues = JSON.parse(storedItem);
  //       if (storedTodoValues.createdTimestamp) {
  //         const todoItem = { key, todoItemData: storedTodoValues };
  //         newTodoItems.push(todoItem);
  //       }
  //     } else {
  //       console.log("Item not found in local storage.");
  //     }
  //   });
  
  //   newTodoItems.sort((a, b) => {
  //     // Ensure to check if timestamps exist and handle null values
  //     const timestampA = a.todoItemData.createdTimestamp || 0;
  //     const timestampB = b.todoItemData.createdTimestamp || 0;
  
  //     return timestampB - timestampA;
  //   });
  
  //   const sortedTodoItems = newTodoItems.map((item) => (
  //     <TodoItem key={item.key} todoItemData={item.todoItemData} taskKey={item.key} />
  //   ));
  
  //   setTodoItems(sortedTodoItems);
  // };



  const refreshTaskList = () => {
    const storageKeys = Object.keys(localStorage);
    const newTodoItems: TodoItem[] = [];
  
    storageKeys.forEach((key) => {
      const storedItem = localStorage.getItem(key);
      if (storedItem) {
        const storedTodoValues = JSON.parse(storedItem);
        if (storedTodoValues.createdTimestamp) {
          const todoItem = (
            <TodoItem key={key} todoItemData={storedTodoValues} taskKey={key} />
          );
          newTodoItems.push(todoItem);
        }
      } else {
        console.log("Item not found in local storage.");
      }
    });
  
    setTodoItems(newTodoItems);
  };
  
  const { setSelectedSortingOption } = useUserContext(); // Import the context function
  
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

  const sortByCreatedTimestamp = () => {
    const sortedByTimestamp = sortWithDirection(
      todoItems,
      (data) => data.createdTimestamp,
      'asc'
    );
    setTodoItems(sortedByTimestamp);
  };

  const sortByTitle = () => {
    const sortedByTitle = sortWithDirection(
      todoItems,
      (data) => data.taskTitleValue,
      'asc'
    );
    setTodoItems(sortedByTitle);
  };
  
  const sortByPriority = () => {
    const sortedByPriority = sortWithDirection(
      todoItems,
      (data) => data.priorityValue.value, // or .value, depending on what needs to be compared
      'asc'
    );
    setTodoItems(sortedByPriority);
  };
  

  const sortByDate = () => {
    const sortedByDate = sortWithDirection(
      todoItems,
      (data) => new Date(data.dateValue).getTime(),
      'asc'
    );
    setTodoItems(sortedByDate);
  };

  const sortByCreatedTimestampReverse = () => {
    const sortedByTimestamp = sortWithDirection(todoItems, (data) => data.createdTimestamp, 'desc');
    setTodoItems(sortedByTimestamp);
  };
  
  const sortByTitleReverse = () => {
    const sortedByTitle = sortWithDirection(todoItems, (data) => data.taskTitleValue, 'desc');
    setTodoItems(sortedByTitle);
  };
  
  // Additional reverse sorting functions...
  
  const sortByPriorityReverse = () => {
    const sortedByPriority = sortWithDirection(todoItems, (data) => data.priorityValue.value, 'desc');
    setTodoItems(sortedByPriority);
  };
  
  const sortByDateReverse = () => {
    const sortedByDate = sortWithDirection(todoItems, (data) => new Date(data.dateValue).getTime(), 'desc');
    setTodoItems(sortedByDate);
  };
  
  // const handleSortChange = (sortOption: string) => {
  //   // Determine the reverse value based on the sortOption
  //   const reverse = sortOption.endsWith('Reverse') ? 'Reverse' : '';
  
  //   // Store the sortOption and reverse separately in local storage
  //   localStorage.setItem("user_selectedSortingOption", JSON.stringify(sortOption));
  //   localStorage.setItem("user_sortReverse", JSON.stringify(reverse));

  // const handleSortChange = (sortOption: string) => {
  //   // Determine the reverse value based on the sortOption
  //   const reverse = sortOption.endsWith('Reverse') ? 'Reverse' : '';
  
  //   // Store the sortOption and reverse separately in local storage
  //   localStorage.setItem("user_selectedSortingOption", JSON.stringify(sortOption));
  //   localStorage.setItem("user_sortReverse", JSON.stringify(reverse));
  
  //   // Combine sortOption and reverse and store in local storage
  //   const sorting = `${sortOption}${reverse}`;
  //   localStorage.setItem("user_Sorting", JSON.stringify(sorting));

  // const handleSortChange = (sortOption: string) => {
  //   // Determine the reverse value based on the sortOption
  //   const reverse = sortOption.endsWith('Reverse') ? 'Reverse' : '';
  
  //   // Store the sortOption and reverse separately in local storage
  //   localStorage.setItem("user_selectedSortingOption", JSON.stringify(sortOption));
  //   localStorage.setItem("user_sortReverse", JSON.stringify(reverse));
  
  //   // Combine sortOption and reverse only if sortOption is not ending with "Reverse"
  //   const sorting = sortOption.endsWith("Reverse") ? sortOption : `${sortOption}${reverse}`;
  //   localStorage.setItem("user_Sorting", JSON.stringify(sorting));

  const handleSortChange = (sortOption: string) => {
    // Determine the reverse value based on the sortOption
    const reverse = sortOption.endsWith('Reverse') ? 'Reverse' : '';

    // Store the sortOption and reverse separately in local storage
    localStorage.setItem("user_selectedSortingOption", JSON.stringify(sortOption));
    localStorage.setItem("user_sortReverse", JSON.stringify(reverse));

    // Combine sortOption and reverse and store in local storage
    const sorting = `${sortOption}${reverse}`;
    localStorage.setItem("user_Sorting", JSON.stringify(sorting));
  
    switch (sortOption) {
      case 'createdTimestamp':
        sortByCreatedTimestamp();
        break;
      case 'title':
        sortByTitle();
        break;
      case 'priority':
        sortByPriority();
        break;
      case 'date':
        sortByDate();
        break;
      case 'createdTimestampReverse':
        sortByCreatedTimestampReverse();
        break;
      case 'titleReverse':
        sortByTitleReverse();
        break;
      case 'priorityReverse':
        sortByPriorityReverse();
        break;
      case 'dateReverse':
        sortByDateReverse();
        break;
      default:
        break;
    }
  };

  // const handleSortChange = (sortOption: string) => {
    // switch (sortOption) {
    //   case 'createdTimestamp':
    //     sortByCreatedTimestamp();
    //     break;
    //   case 'title':
    //     sortByTitle();
    //     break;
    //   case 'priority':
    //     sortByPriority();
    //     break;
    //   case 'date':
    //     sortByDate();
    //     break;
    //   case 'createdTimestampReverse':
    //     sortByCreatedTimestampReverse();
    //     break;
    //   case 'titleReverse':
    //     sortByTitleReverse();
    //     break;
    //   case 'priorityReverse':
    //     sortByPriorityReverse();
    //     break;
    //   case 'dateReverse':
    //     sortByDateReverse();
    //     break;
    //   default:
    //     break;
    // }
  // };
  
  
  // useEffect(() => {
  //   // Call the refreshTaskList function initially
  //   refreshTaskList();
  // }, []);

  useEffect(() => {
    // Retrieve the default sorting option and reverse value from local storage
    const storedSortingOption = localStorage.getItem("user_Sorting");
  
    const defaultSortOptionWithReverse = storedSortingOption ? JSON.parse(storedSortingOption) : 'createdTimestamp';
  
    setSelectedSortingOption(defaultSortOptionWithReverse);
    handleSortChange(defaultSortOptionWithReverse);
    // Call the refreshTaskList function initially
    refreshTaskList();
  }, [setSelectedSortingOption]);
  

  // useEffect(() => {
  //   // Retrieve the default sorting option and reverse value from local storage
  //   const storedSortingOption = localStorage.getItem("user_selectedSortingOption");
  //   const storedSortReverse = localStorage.getItem("user_sortReverse");
  
  //   const defaultSortOption = storedSortingOption ? JSON.parse(storedSortingOption) : 'createdTimestamp';
  //   const defaultSortReverse = storedSortReverse ? JSON.parse(storedSortReverse) : '';
  
  //   const defaultSortOptionWithReverse = `${defaultSortOption}${defaultSortReverse}`;
  
  //   setSelectedSortingOption(defaultSortOptionWithReverse);
  //   handleSortChange(defaultSortOptionWithReverse);
  //   // Call the refreshTaskList function initially
  //   refreshTaskList();
  // }, [setSelectedSortingOption]);

  // useEffect(() => {
  //   // Retrieve the default sorting option from the user context
  //   const defaultSortingOption = 'createdTimestamp'; // Default value if context value isn't available

  //   if (setSelectedSortingOption) {
  //     const storedSortingOption = localStorage.getItem("user_selectedSortingOption");
  //     const defaultOption = storedSortingOption ? JSON.parse(storedSortingOption) : defaultSortingOption;

  //     setSelectedSortingOption(defaultOption); // Set default sorting option in user context
  //     handleSortChange(defaultOption); // Trigger sorting based on the default option
  //   }
    
  //   // Call the refreshTaskList function initially
  //   refreshTaskList();
  // }, [setSelectedSortingOption]);

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
        todoItems,
        handleTaskAdded,
        refreshTaskList,
        sortByPriority,
        handleSortChange
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
