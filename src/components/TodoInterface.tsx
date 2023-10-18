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

import { EyeIcon } from '@/icons/EyeIcon';
import { EditIcon } from '@/icons/EditIcon';
import { DeleteIcon } from '@/icons/DeleteIcon';
import { NewTaskIcon } from '@/icons/NewTaskIcon';
import { useTaskContext } from '@/providers/Context/TaskContext';
import { useColor } from '@/app/ColorContext';
import styles from '@/styles/Home.module.scss'

import NewTaskForm from './TodoInterface_Creation/TodoModal';

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
                
                {descriptionStringChecker(storedTodoItem.descriptionValue)}
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
    </ >
  );
};

export default TodoInterface;
