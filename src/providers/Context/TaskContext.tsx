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


  const todoValues = {
    taskTitleValue: taskTitleValue,
    descriptionValue: descriptionValue,
    priorityValue: priorityValue,
    dateValue: dateValue,
  };

  //   const todoValues = {
//     taskTitleValue: taskTitleValue,
//     descriptionValue: descriptionValue,
//     priorityValue: priorityValue,
//     dateValue: dateValue,
//   };

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

  //   const resetTodoValues = () => {
//     setTaskTitleValue(initialTaskTitleValue);
//     setDescriptionValue(initialDescriptionValue);
//     setPriorityValue(initialPriorityValue);
//     setDateValue(initialDateValue);
//   };

  const onPriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedPriority = priorities.find((priority) => priority.value === e.target.value);
    setPriorityValue(selectedPriority!);
  };

//   const onPriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     const selectedPriority = priorities.find(priority => priority.value === e.target.value)
//     setPriorityValue(selectedPriority!)
//   }

  const statusColorMap: Record<string, string> = {
    none: "default",
    low: "success",
    medium: "warning",
    high: "danger",
  };

  //   const statusColorMap: Record<string, ChipProps["color"]>  = {
//     none: "default",
//     low: "success",
//     medium: "warning",
//     high: "danger",
//   };

  const NewTodoItemSaving = () => {
    // Generate a unique key based on a timestamp
    const timestamp = new Date().getTime();
    const key = `todoValues_${timestamp}`;

    // Save the current todoValues to local storage with the unique key
    localStorage.setItem(key, JSON.stringify(todoValues));
  };

  //   const NewTodoItemSaving = () => {
//     // Generate a unique key based on a timestamp
//     const timestamp = new Date().getTime();
//     const key = `todoValues_${timestamp}`;

//       // Save the current todoValues to local storage
//     // localStorage.setItem('todoValues', JSON.stringify(todoValues));

//       // Save the current todoValues to local storage with the unique key
//     localStorage.setItem(key, JSON.stringify(todoValues));
//   }

  const todoGrabbing = () => {
    const storageKeys = Object.keys(localStorage);
    storageKeys.forEach((key) => {
      const storedItemString = localStorage.getItem(key);
      if (storedItemString) {
        const storedTodoValues = JSON.parse(storedItemString);
        console.log(`Key: ${key}, Value:`, storedTodoValues);
      }
    });

    const keyToRetrieve = 'todoValues_1697647052891'; // Replace with the actual unique key
    const storedItemString = localStorage.getItem(keyToRetrieve);
    if (storedItemString) {
      const storedTodoValues = JSON.parse(storedItemString);
      console.log(storedTodoValues);
      setStoredTodoItem(storedTodoValues);
    } else {
      console.log("Item not found in local storage.");
    }
  };

  //   const todoGrabbing =  () => {

//     //prints all the items stored in local storage -> use for printing todo items

//     const storageKeys = Object.keys(localStorage);

//     // Iterate through the keys and retrieve and log each item
//     storageKeys.forEach((key) => {
//       const storedItemString = localStorage.getItem(key);
//       if (storedItemString) {
//         const storedTodoValues = JSON.parse(storedItemString);
//         console.log(`Key: ${key}, Value:`, storedTodoValues);
//       }
//     });


// //will be used for removing

//     // Define the unique key you want to retrieve
//     const keyToRetrieve = 'todoValues_1697470760955'; // Replace with the actual unique key

//     // Retrieve the item from local storage
//     const storedItemString = localStorage.getItem(keyToRetrieve);

//     if (storedItemString) {
//       // Parse the stored item from JSON
//       const storedTodoValues = JSON.parse(storedItemString);
      
//       // Log the retrieved todoValues
//       console.log(storedTodoValues);

//       // Set the priority label from the storedTodoValues in state
//       setStoredTodoItem(storedTodoValues);
//     } else {
//       console.log("Item not found in local storage.");
//     }  
//   }

  useEffect(() => {
    // Call NewTodoGrabbing to retrieve and set the priority label when the component mounts
    todoGrabbing();
  }, []);

  //   useEffect(() => {
//     // Call NewTodoGrabbing to retrieve and set the priority label when the component mounts
//     todoGrabbing();
//   }, []);

  const descriptionStringChecker = (descriptionString: string) => {
    return descriptionString.length > 120
      ? `${descriptionString.substring(0, 120)}...`
      : descriptionString;
  };

  //   const descriptionStringChecker = (descriptionString: string) => {
//     descriptionString = descriptionString.length > 120
//       ? `${descriptionString.substring(0, 120)}...`
//       : descriptionString;
//     return descriptionString;
//   };


//   const initialTaskTitleValue = '';
//   const initialDescriptionValue = '';
//   const initialPriorityValue = priorities[0];
//   const initialDateValue = '';

//   const [taskTitleValue, setTaskTitleValue] = React.useState(initialTaskTitleValue);
//   const [descriptionValue, setDescriptionValue] = React.useState(initialDescriptionValue);
//   const [priorityValue, setPriorityValue] = React.useState(initialPriorityValue);
//   const [dateValue, setDateValue] = React.useState(initialDateValue);


// //localstorage set up




//   interface TodoTypes {
//     taskTitleValue: string;
//     descriptionValue: string;
//     priorityValue: { label: string, value: string };
//     dateValue: string;
//   }

//   const [storedTodoItem, setStoredTodoItem] = React.useState<TodoTypes>({
//     taskTitleValue: '',
//     descriptionValue: '',
//     priorityValue: { label: '', value: '' },
//     dateValue: '',
//   });






//   //sting value todo elements



//   // var num00 = 100;
//   // ahoj(num00); //101
//   // ahoj(4); //5
//   // function ahoj(getNum) {
//   //   var returnedNum = 1 + getNum;
//   //   return returnedNum;
//   // }

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
