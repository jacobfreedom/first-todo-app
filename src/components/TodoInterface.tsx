"use client"

import React, {useState, useEffect} from 'react';
import { Pagination } from "@nextui-org/react";


import { useColor } from '@/app/ColorContext';
import styles from '@/styles/Home.module.scss'

import NewTaskForm from './TodoInterface_Creation/TodoModal';
import TodoItem from './TodoInterface_Item_Element/TodoElement';
import { useTaskContext } from '@/providers/Context/TaskContext';




const TodoInterface = () => {

  const {selectedColor} = useColor();
  const {todoItems, handleTaskAdded} = useTaskContext();

  
  // const [todoItems, setTodoItems] = useState<React.ReactNode[]>([]);

  // const refreshTaskList = () => {
  //   const storageKeys = Object.keys(localStorage);
  //   const newTodoItems: React.ReactNode[] = [];

  //   storageKeys.forEach((key) => {
  //     const storedItemString = localStorage.getItem(key);
  //     if (storedItemString) {
  //       const storedTodoValues = JSON.parse(storedItemString);
  //       newTodoItems.push(
  //         <TodoItem
  //           key={key}
  //           todoItemData={storedTodoValues}
  //         />
  //       );
  //     } else {
  //       console.log("Item not found in local storage.");
  //     }
  //   });

  //   setTodoItems(newTodoItems);
  // };

  // useEffect(() => {
  //   // Call the refreshTaskList function initially
  //   refreshTaskList();
  // }, []);

  // const handleTaskAdded = () => {
  //   // Trigger the refresh of the task list
  //   refreshTaskList();
  // };


  return (
    <>
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
              <NewTaskForm onTaskAdded={handleTaskAdded} />
            </>
          </div>
            {todoItems} {/* Render the array of TodoItem components */}
            {/* <TodoItem /> */}
        </div>

        <div className='flex items-center justify-center m-3'>
          <Pagination loop showControls color={selectedColor} total={5} initialPage={1} />
        </div>

    </div>
    </ >
  );
};

export default TodoInterface;
