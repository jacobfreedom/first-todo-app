import React from 'react';
// import { Checkbox, Chip, Button, Tooltip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Pagination, useDisclosure } from "@nextui-org/react";
import {Button, Checkbox, Pagination,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    useDisclosure,
    Tooltip,
    Chip, ChipProps
  } from "@nextui-org/react";


import { NewTaskIcon } from '@/icons/NewTaskIcon';
import { useTaskContext } from '@/providers/Context/TaskContext';
import { useColor } from '@/app/ColorContext';
import styles from '@/styles/Home.module.scss'

import NewTaskForm from './TodoInterface_Creation/TodoModal';
import TodoItem from './TodoInterface_Item_Element/TodoElement';

const TodoInterface = () => {
  const {
    storedTodoItem,
    descriptionStringChecker,
    priorities,
    resetTodoValues,
    
  } = useTaskContext();

  const { selectedColor} = useColor();

  const statusColorMap = {
    none: "default",
    low: "success",
    medium: "warning",
    high: "danger",
  };

    //form checker + modal
  
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    const CloseModal = () => {
      onClose();
      resetTodoValues();
    }

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
              <Button fullWidth onPress={onOpen} variant='light'
              className='border-1 border-content3 text-default-400 py-6' startContent={<NewTaskIcon />}
              >
                New Task
              </Button>
              <NewTaskForm
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onClose={onClose}
                CloseModal={CloseModal}
              />
            </>
          </div>

          <TodoItem />
        </div>

        <div className='flex items-center justify-center m-3'>
          <Pagination loop showControls color={selectedColor} total={5} initialPage={1} />
        </div>

    </div>
    </ >
  );
};

export default TodoInterface;
