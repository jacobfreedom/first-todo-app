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

import { useForm, SubmitHandler } from "react-hook-form"

import Nav from '@/components/navigationbar';


import { useColor } from './ColorContext';
import { todo } from 'node:test';
import { type } from 'node:os';
import NewTodoForm from '@/components/TodoInterface_Creation/TodoModal';


// priority map

const priorities = [
  {label: "🤷 None", value: "none"},
  {label: "😴 Low", value: "low"},
  {label: "🎭 Medium", value: "medium"},
  {label: "🔥 High", value: "high"},
];

export default function Home() {
  const { selectedColor, setSelectedColor } = useColor();

  const initialTaskTitleValue = '';
  const initialDescriptionValue = '';
  const initialPriorityValue = priorities[0];
  const initialDateValue = '';

  const [taskTitleValue, setTaskTitleValue] = React.useState(initialTaskTitleValue);
  const [descriptionValue, setDescriptionValue] = React.useState(initialDescriptionValue);
  const [priorityValue, setPriorityValue] = React.useState(initialPriorityValue);
  const [dateValue, setDateValue] = React.useState(initialDateValue);


  const todoValues = {
    taskTitleValue: taskTitleValue,
    descriptionValue: descriptionValue,
    priorityValue: priorityValue,
    dateValue: dateValue,
  };

  const resetTodoValues = () => {
    setTaskTitleValue(initialTaskTitleValue);
    setDescriptionValue(initialDescriptionValue);
    setPriorityValue(initialPriorityValue);
    setDateValue(initialDateValue);
  };

  const onPriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedPriority = priorities.find(priority => priority.value === e.target.value)
    setPriorityValue(selectedPriority!)
  }

  const statusColorMap: Record<string, ChipProps["color"]>  = {
    none: "default",
    low: "success",
    medium: "warning",
    high: "danger",
  };

//localstorage set up


  const NewTodoItemSaving = () => {
    // Generate a unique key based on a timestamp
    const timestamp = new Date().getTime();
    const key = `todoValues_${timestamp}`;

      // Save the current todoValues to local storage
    // localStorage.setItem('todoValues', JSON.stringify(todoValues));

      // Save the current todoValues to local storage with the unique key
    localStorage.setItem(key, JSON.stringify(todoValues));
  }

  interface TodoTypes {
    taskTitleValue: string;
    descriptionValue: string;
    priorityValue: { label: string, value: string };
    dateValue: string;
  }

  const [storedTodoItem, setStoredTodoItem] = React.useState<TodoTypes>({
    taskTitleValue: '',
    descriptionValue: '',
    priorityValue: { label: '', value: '' },
    dateValue: '',
  });

  const NewTodoGrabbing =  () => {

    //prints all the items stored in local storage -> use for printing todo items

    const storageKeys = Object.keys(localStorage);

    // Iterate through the keys and retrieve and log each item
    storageKeys.forEach((key) => {
      const storedItemString = localStorage.getItem(key);
      if (storedItemString) {
        const storedTodoValues = JSON.parse(storedItemString);
        console.log(`Key: ${key}, Value:`, storedTodoValues.descriptionValue);
      }
    });


//will be used for removing

    // Define the unique key you want to retrieve
    const keyToRetrieve = 'todoValues_1697470760955'; // Replace with the actual unique key

    // Retrieve the item from local storage
    const storedItemString = localStorage.getItem(keyToRetrieve);

    if (storedItemString) {
      // Parse the stored item from JSON
      const storedTodoValues = JSON.parse(storedItemString);
      
      // Log the retrieved todoValues
      console.log(storedTodoValues);

      // Set the priority label from the storedTodoValues in state
      setStoredTodoItem(storedTodoValues);
    } else {
      console.log("Item not found in local storage.");
    }  
  }

  useEffect(() => {
    // Call NewTodoGrabbing to retrieve and set the priority label when the component mounts
    NewTodoGrabbing();
  }, []);


  //form checker + modal
  
  
  const CloseModal = () => {
    onClose();
    resetTodoValues();
  }

  //sting value todo elements

  const descriptionStringChecker = () => {
    {storedTodoItem.descriptionValue.length > 120 ?
      `${storedTodoItem.descriptionValue.substring(0, 120)}...` :storedTodoItem.descriptionValue}
  }


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

          <NewTodoForm />

          {/* testing item */}
          <div className={styles.todo__item__elements}>

            <div className="flex items-center">
              <Checkbox color={selectedColor} radius="full" />
            </div>
            <div className={styles.todo__elements__cotent}>
              <div className='font-semibold'>
                {storedTodoItem.taskTitleValue}
              </div>

              <div className='font-extralight text-sm h-13'>
                {storedTodoItem.descriptionValue}
              </div>
            </div>

            <div className={styles.todo__elements__info}>
              <div className='font-medium'>
                Deadline
              </div>
              <div className='font-extralight truncate'>
                {storedTodoItem.dateValue}
              </div>


              <Chip className='capitalize' color={statusColorMap[storedTodoItem.priorityValue.value]} size="sm" variant="flat">
                  {storedTodoItem.priorityValue.label}
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
                  {storedTodoItem.priorityValue.label}
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
