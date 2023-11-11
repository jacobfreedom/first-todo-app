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

    const todoValuesWithTimestamp = {
      ...todoValues,
      createdTimestamp: timestamp, // Add createdTimestamp to todoValues
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
  //   const newTodoItems: React.ReactNode[] = [];

  //   storageKeys.forEach((key) => {
  //     const storedItem = localStorage.getItem(key);
  //     if (storedItem) {
  //       const storedTodoValues = JSON.parse(storedItem);
  //       newTodoItems.push(
  //         <TodoItem
  //           key={key}
  //           todoItemData={storedTodoValues}
  //           taskKey={key} // Pass the unique key to the TodoItem
  //         />
  //       );
  //     } else {
  //       console.log("Item not found in local storage.");
  //     }
  //   });


  //   // // Sort the tasks by creation date
  //   // newTodoItems.sort((a, b) => a.todoItemData.createdTimestamp - b.todoItemData.createdTimestamp);

  //   // // Render sorted tasks in TodoItem components
  //   // const sortedTodoItems = newTodoItems.map((item) => (
  //   //   <TodoItem key={item.key} todoItemData={item.todoItemData} taskKey={item.key} />
  //   // ));

  //   // setTodoItems(newTodoItems);

  //     // Sort the tasks by creation date
  // newTodoItems.sort((a, b) => {
  //   if (a && b && a.todoItemData && b.todoItemData) {
  //     return a.todoItemData.createdTimestamp - b.todoItemData.createdTimestamp;
  //   }
  //   return 0;
  // });

  // // Render sorted tasks in TodoItem components
  // const sortedTodoItems = newTodoItems
  //   .filter(item => item && item.key && item.todoItemData) // Filtering out null/undefined items
  //   .map((item) => (
  //     <TodoItem key={item.key} todoItemData={item.todoItemData} taskKey={item.key} />
  //   ));

  // setTodoItems(sortedTodoItems);
  // };

  const refreshTaskList = () => {
    const storageKeys = Object.keys(localStorage);
    const newTodoItems: { key: string, todoItemData: TodoItemData }[] = [];
  
    storageKeys.forEach((key) => {
      const storedItem = localStorage.getItem(key);
      if (storedItem) {
        const storedTodoValues = JSON.parse(storedItem);
        if (storedTodoValues.createdTimestamp) {
          const todoItem = { key, todoItemData: storedTodoValues };
          newTodoItems.push(todoItem);
        }
      } else {
        console.log("Item not found in local storage.");
      }
    });
  
    newTodoItems.sort((a, b) => {
      // Ensure to check if timestamps exist and handle null values
      const timestampA = a.todoItemData.createdTimestamp || 0;
      const timestampB = b.todoItemData.createdTimestamp || 0;
  
      return timestampB - timestampA;
    });
  
    const sortedTodoItems = newTodoItems.map((item) => (
      <TodoItem key={item.key} todoItemData={item.todoItemData} taskKey={item.key} />
    ));
  
    setTodoItems(sortedTodoItems);
  };
  
  type TodoItem = React.ReactElement<{ todoItemData: TodoItemData; key: string }>;

  const sortWithDirection = (
    items: TodoItem[],
    accessor: (data: TodoItemData) => number | string,
    direction: 'asc' | 'desc'
  ): TodoItem[] => {
    return items
      .filter(
        item =>
          React.isValidElement(item) &&
          item.props.todoItemData &&
          accessor(item.props.todoItemData) !== undefined
      )
      .sort((a, b) => {
        const valA = accessor(a.props.todoItemData);
        const valB = accessor(b.props.todoItemData);
        if (valA && valB) {
          return direction === 'asc' ? +valA - +valB : +valB - +valA;
        }
        return 0;
      });
  };
  
  const sortByCreatedTimestamp = () => {
    // Ensure todoItems is of type TodoItem[] and contains valid React.ReactElement items
    const sortedByTimestamp = sortWithDirection(todoItems, data => data.createdTimestamp, 'asc');
    setTodoItems(sortedByTimestamp);
  };
  
  const sortByTitle = () => {
    const sortedByTitle = sortWithDirection(todoItems, data => data.taskTitleValue, 'asc');
    setTodoItems(sortedByTitle);
  };
  
  const sortByPriority = () => {
    const sortedByPriority = sortWithDirection(todoItems, data => data.priorityValue.value, 'asc');
    setTodoItems(sortedByPriority);
  };
  
  const sortByDate = () => {
    const sortedByDate = sortWithDirection(todoItems, data => new Date(data.dateValue).getTime(), 'asc');
    setTodoItems(sortedByDate);
  };

  // const sortByCreatedTimestamp = () => {
  //   const sortedByTimestamp = todoItems
  //     .filter(item => React.isValidElement(item) && item.props.todoItemData && item.props.todoItemData.createdTimestamp !== undefined)
  //     .sort((a, b) => {
  //       if (
  //         React.isValidElement(a) &&
  //         React.isValidElement(b) &&
  //         a.props.todoItemData &&
  //         b.props.todoItemData &&
  //         a.props.todoItemData.createdTimestamp &&
  //         b.props.todoItemData.createdTimestamp
  //       ) {
  //         return a.props.todoItemData.createdTimestamp - b.props.todoItemData.createdTimestamp;
  //       }
  //       return 0;
  //     });
  //   setTodoItems(sortedByTimestamp);
  // };

  // const sortByTitle = () => {
  //   const sortedByTitle = todoItems
  //     .filter(item => React.isValidElement(item) && item.props.todoItemData && item.props.todoItemData.taskTitleValue !== undefined)
  //     .sort((a, b) => {
  //       if (
  //         React.isValidElement(a) &&
  //         React.isValidElement(b) &&
  //         a.props.todoItemData &&
  //         b.props.todoItemData &&
  //         a.props.todoItemData.taskTitleValue &&
  //         b.props.todoItemData.taskTitleValue
  //       ) {
  //         return a.props.todoItemData.taskTitleValue.localeCompare(b.props.todoItemData.taskTitleValue);
  //       }
  //       return 0;
  //     });
  //   setTodoItems(sortedByTitle);
  // };
  
  // const sortByPriority = () => {
  //   const sortedByPriority = todoItems
  //     .filter(item => React.isValidElement(item) && item.props.todoItemData && item.props.todoItemData.priorityValue !== undefined)
  //     .sort((a, b) => {
  //       if (
  //         React.isValidElement(a) &&
  //         React.isValidElement(b) &&
  //         a.props.todoItemData &&
  //         b.props.todoItemData &&
  //         a.props.todoItemData.priorityValue &&
  //         b.props.todoItemData.priorityValue
  //       ) {
  //         const priorityA = a.props.todoItemData.priorityValue.value;
  //         const priorityB = b.props.todoItemData.priorityValue.value;
          
  //         // Assuming priorities is an array of objects with label and value
  //         return priorities.findIndex(p => p.value === priorityA) - priorities.findIndex(p => p.value === priorityB);
  //       }
  //       return 0;
  //     });
  //   setTodoItems(sortedByPriority);
  // };
  
  
  // const sortByDate = () => {
  //   const sortedByDate = todoItems
  //     .filter(item => React.isValidElement(item) && item.props.todoItemData && item.props.todoItemData.dateValue !== undefined)
  //     .sort((a, b) => {
  //       if (
  //         React.isValidElement(a) &&
  //         React.isValidElement(b) &&
  //         a.props.todoItemData &&
  //         b.props.todoItemData &&
  //         a.props.todoItemData.dateValue &&
  //         b.props.todoItemData.dateValue
  //       ) {
  //         return new Date(a.props.todoItemData.dateValue).getTime() - new Date(b.props.todoItemData.dateValue).getTime();
  //       }
  //       return 0;
  //     });
  //   setTodoItems(sortedByDate);
  // };
  
  const handleSortChange = (sortOption: string) => {
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
      default:
        break;
    }
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
