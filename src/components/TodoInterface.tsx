"use client"

import { Pagination } from "@nextui-org/react";


import { useColor } from '@/app/ColorContext';
import styles from '@/styles/Home.module.scss'

import NewTaskForm from './TodoInterface_Creation/TodoModal';
import { useTaskContext } from '@/providers/Context/TaskContext';




const TodoInterface = () => {

  const {selectedColor} = useColor();
  const {todoItems, handleTaskAdded} = useTaskContext();


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
