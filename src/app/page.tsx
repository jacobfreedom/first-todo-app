"use client"

import autoprefixer from 'autoprefixer'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'



import {NewTaskIcon} from '@/icons/NewTaskIcon';
import {EditIcon} from "@/icons/EditIcon";
import {DeleteIcon} from "@/icons/DeleteIcon";
import {EyeIcon} from "@/icons/EyeIcon";

import React, { ChangeEvent, useEffect } from "react";
import {Button, Checkbox, Pagination,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
  Input, Textarea,
  Tooltip,
  Select, SelectItem,
  Chip, ChipProps
} from "@nextui-org/react";

import Nav from '@/components/navigationbar';

import { useColor } from './ColorContext';
import { todo } from 'node:test';


// priority map

const priorities = [
  {label: "🤷 None", value: "none"},
  {label: "🔥 High", value: "high"},
  {label: "🎭 Medium", value: "medium"},
  {label: "😴 Low", value: "low"},
];

export default function Home() {
  const { selectedColor, setSelectedColor } = useColor();

  const initialTaskTitle = '';
  const initialDescriptionValue = '';
  const initialPriorityValue = priorities[0];
  const initialDateValue = '';

  const [taskTitle, setTaskTitle] = React.useState(initialTaskTitle);
  const [descriptionValue, setDescriptionValue] = React.useState(initialDescriptionValue);
  const [priorityValue, setPriorityValue] = React.useState(initialPriorityValue);
  const [dateValue, setDateValue] = React.useState(initialDateValue);


  const todoValues = {
    taskTitle: taskTitle,
    descriptionValue: descriptionValue,
    priorityValue: priorityValue,
    dateValue: dateValue,
  };

  const resetTodoValues = () => {
    setTaskTitle(initialTaskTitle);
    setDescriptionValue(initialDescriptionValue);
    setPriorityValue(initialPriorityValue);
    setDateValue(initialDateValue);
  };

  const onPriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedPriority = priorities.find(priority => priority.value === e.target.value)
    setPriorityValue(selectedPriority!)
  }

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

  const CloseModal = () => {
    onClose();
    resetTodoValues();
  }

  const NewTodoSaving = () => {
    // Generate a unique key based on a timestamp
    const timestamp = new Date().getTime();
    const key = `todoValues_${timestamp}`;

      // Save the current todoValues to local storage
    // localStorage.setItem('todoValues', JSON.stringify(todoValues));

      // Save the current todoValues to local storage with the unique key
    localStorage.setItem(key, JSON.stringify(todoValues));
  }

  // Define the unique key you want to retrieve
const keyToRetrieve = 'todoValues_123456789'; // Replace with the actual unique key

// Retrieve the item from local storage
const storedItemString = localStorage.getItem(keyToRetrieve);

if (storedItemString) {
  // Parse the stored item from JSON
  const storedTodoValues = JSON.parse(storedItemString);
  
  // Log the retrieved todoValues
  console.log(storedTodoValues);
} else {
  console.log("Item not found in local storage.");
}
  

  // Initialize todoValues from local storage if it exists, otherwise, use the initial values
  // const storedTodoValuesString = localStorage.getItem('todoValues');
  // const initialTodoValues = storedTodoValuesString ? JSON.parse(storedTodoValuesString) : todoValues;

  // Function to save todoValues to local storage
  // const saveTodoValuesToLocalStorage = () => {
  //   localStorage.setItem('todoValues', JSON.stringify(todoValues));
  // };

  // // Call saveTodoValuesToLocalStorage whenever todoValues change
  // React.useEffect(() => {
  //   saveTodoValuesToLocalStorage();
  // }, [todoValues]);

  // localStorage.getItem(taskTitle, descriptionValue, priorityValue, dateValue)
  
  // const saveData = (todoValues: object) => {

  //   localStorage.setItem("todos", JSON.stringify(todoValues));

  // };


//   Indian medium todo


//   const [todoItems, setNewTodoItems] = React.useState([]);

//   const saveData = (newTodoValues) => {
//     localStorage.setItem("todos", JSON.stringify(newTodoValues));
//   };

//   useEffect(() => {
//     if (localStorage.getItem("todos")) {
//       todoValues(JSON.parse(localStorage.getItem("todos")));
//     }
//   }, []);

//   const onAddTodo = () => { //add new todo button action
//     if (newTodo.trim()) {
//       let newTodos = [...todos, { todo: newTodo.trim(), id: Date.now() }];
//       setTodos(newTodoValues);
//       setNewTodo("");
//       saveData(newTodoValues);
//     }
//   };

//   function Todo() {
//     const [todos, setTodos] = useState([]); //todoValues in my case
//     const [newTodo, setNewTodo] = useState(""); //todoItems in my case, just created it
  
//     const saveData = (newTodos) => {
//       localStorage.setItem("todos", JSON.stringify(newTodos));
//     };
  
//     useEffect(() => {
//       if (localStorage.getItem("todos")) {
//         setTodos(JSON.parse(localStorage.getItem("todos")));
//       }
//     }, []);
  
//     const onAddTodo = () => {
//       if (newTodo.trim()) {
//         let newTodos = [...todos, { todo: newTodo.trim(), id: Date.now() }];
//         setTodos(newTodos);
//         setNewTodo("");
//         saveData(newTodos);
//       }
//     };
  
//     const deleteTodo = (id) => {
//       let newTodos = todos.filter((todo) => todo.id !== id);
//       setTodos(newTodos);
  
//       saveData(newTodos);
//     };

//     <input
//                 type="text"
//                 id="todoInput"
//                 className="form-control"
//                 placeholder="add todo"
//                 value={newTodo}
//                 onChange={(e) => setNewTodo(e.target.value)}
//               />

//     <button className="btn btn-primary btn-block" onClick={onAddTodo}>
//                 {" "}
//                 Add
//               </button>

// <tbody id="table">
// {todos.map((todo) => (
//   <tr key={todo.id}>
//     <td>{todo.todo}</td>
//     <td>
//       <button
//         className="btn btn-danger"
//         onClick={() => deleteTodo(todo.id)}
//       >
//         {" "}
//         Delete{" "}
//       </button>{" "}
//     </td>
//   </tr>
// ))}
// </tbody>
// </table>
// </div>




  // useEffect(() => {
  //   // storing input name
  //   localStorage.setItem("todoItemValues", JSON.stringify(todoValues));
  // }, [todoValues]);

  const statusColorMap: Record<string, ChipProps["color"]>  = {
    low: "success",
    medium: "danger",
    high: "warning",
  };

  return (

    <main className={styles.container}>
      <Nav />

      <div className='mt-10'></div>
      <div className={styles.todo__interface}>

        <div className={styles.todo__interface__topbar}>

            <div className={[styles.todo__interface__topbar__element,styles[selectedColor]].join(" ")}>
              In Progress
            </div>
            <div className={styles.todo__interface__topbar__element}>
              Finished
            </div>
        </div>

        <div className={styles.todo__items}>

          {/* add new todo */}
          <div className={styles.todo__item__elements}>
            <>
              <Button fullWidth onPress={onOpen} variant='light'
              className='border-1 border-content3 text-default-400 py-6' startContent={<NewTaskIcon />}
              >
                New Task
              </Button>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop='blur'>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1 items-center">Your New Task</ModalHeader>
                      <ModalBody>
                        <div className="flex flex-col gap-6">
                            <Input
                              isRequired
                              type="text"
                              label="Title"
                              labelPlacement="outside"
                              placeholder="What's the goal?"
                              className='mt-8'
                              value={taskTitle}
                              onValueChange={setTaskTitle}
                            />
                            <p className="text-default-500 text-small">Task value: {taskTitle}</p>

                            <Textarea
                              isRequired
                              minRows={2}
                              type="text"
                              label="Description"
                              labelPlacement="outside"
                              placeholder="What is it about? (Min rows 2)"
                              value={descriptionValue}
                              onValueChange={setDescriptionValue}
                            />
                            <p className="text-default-500 text-small">Desc value: {descriptionValue}</p>

                            <Select
                              label="Priority"
                              placeholder={priorities[0].label}
                              onChange={e => onPriorityChange(e)}
                            >
                              {priorities.map((priority) => (
                                <SelectItem key={priority.value} value={priority.value}>
                                  {priority.label}
                                </SelectItem>
                                ))}

                            </Select>
                            <p className="text-small text-default-500">Selected: {priorityValue.label}</p>

                            <Input
                              isRequired
                              type="date"
                              label="Date"
                              labelPlacement="outside"
                              placeholder="DD/MM/YYYY"
                              value={dateValue}
                              onValueChange={setDateValue}
                            />
                            <p className="text-small text-default-500">Selected: {dateValue}</p>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="light" onPress={CloseModal}>
                          Discard
                        </Button>
                        <Button color={selectedColor} 
                        onPress={() => {
                          
                        
                          // Do something with the 'allValues' object, for example, pass it to a function or log it.
                          console.log(todoValues);

                          NewTodoSaving();

                        
                          // Close the modal or perform other actions as needed
                          CloseModal();
                        }}>

                          
                          Add
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </>
          </div>

          {/* first item */}
          <div className={styles.todo__item__elements}>

            <div className="flex items-center">
              <Checkbox color={selectedColor} radius="full" />
            </div>
            <div className={styles.todo__elements__cotent}>
              <div className='font-semibold'>
                An example To Do Title
              </div>

              <div className='font-extralight text-sm h-13'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius enim sed orci pellentesque, ut ornare justo vulputate. Cras tristique ante ut mauris sagittis, sit amet volutpat justo aliquet. Pellentesque pulvinar eleifend dignissim.
              </div>
            </div>

            <div className={styles.todo__elements__info}>
              <div className='font-medium'>
                Deadline
              </div>
              <div className='font-extralight truncate'>
                01. 13. 2028
              </div>


              <Chip className='capitalize' color={statusColorMap[priorities.value]} size="sm" variant="flat">
                  {todoValues.priorityValue.label}
              </Chip>
            </div>
            <div className="flex">

                  <Tooltip color={selectedColor} content="View">
                    <Button
                      isIconOnly
                      variant="light"
                      color={selectedColor}
                      className="text-lg"
                    >
                      <EyeIcon className={selectedColor}/>
                    </Button>
                  </Tooltip>
 
                  <Tooltip color={selectedColor} content="Edit">
                    <Button
                      isIconOnly
                      variant="light"
                      color={selectedColor}
                      className="text-lg"
                    >
                      <EditIcon className={selectedColor}/>
                    </Button>
                  </Tooltip>

                  <Tooltip color="danger" content="Delete">
                    <Button
                      isIconOnly
                      variant="light"
                      color="danger"
                      className="text-lg"
                    >
                      <DeleteIcon />
                    </Button>
                  </Tooltip>


            </div>
          </div>


          {/* second item */}
          <div className={styles.todo__item__elements}>


            <div className="flex items-center">
              <Checkbox color="success" radius="full" />
            </div>
            <div className={styles.todo__elements__cotent}>
              <div className='font-semibold'>
                An example To Do Title
              </div>

              <div className='font-extralight text-sm h-13'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius enim sed orci pellentesque, ut ornare justo vulputate. Cras tristique ante ut mauris sagittis, sit amet volutpat justo aliquet. Pellentesque pulvinar eleifend dignissim.
              </div>
            </div>

            <div className={styles.todo__elements__info}>
              <div className='font-medium'>
                Deadline
              </div>
              <div className='font-extralight truncate'>
                01. 13. 2028
              </div>
            </div>
            <div className="flex">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    variant="light"
                    color={selectedColor}
                  >
                    <EditIcon className={selectedColor}/>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Action event example"
                  onAction={(key) => alert(key)}
                >
                  <DropdownItem key="edit">Edit file</DropdownItem>
                  <DropdownItem key="delete" className="text-danger" color="danger">
                    Delete file
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

        </div>

        <div className='flex items-center justify-center m-3'>
          <Pagination loop showControls color={selectedColor} total={5} initialPage={1} />
        </div>

      </div>

    <footer className='mt-auto absolute bottom-0 left-0 right-0'>
        <div className='w-full mx-auto max-w-screen p-4 flex items-center justify-center mt-6'>
            Made by Jakub ✌️
        </div>
    </footer>
    
    </main>
  )
}
