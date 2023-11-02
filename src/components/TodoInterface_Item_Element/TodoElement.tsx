import React from 'react';
import { Checkbox, Button, Tooltip, Chip } from '@nextui-org/react';
import { EditIcon } from '@/icons/EditIcon';
import { DeleteIcon } from '@/icons/DeleteIcon';
import styles from '@/styles/Home.module.scss'

import { useTaskContext } from '@/providers/Context/TaskContext';
import { useColor } from '@/app/ColorContext';
import { TodoItemData } from '@/providers/Types/Types';
import TaskViewModal from './Events/TaskViewModal';



const TodoItem: React.FC<{ todoItemData: TodoItemData }> = ({ todoItemData }) => {


  const {
    descriptionStringChecker,
    statusColorMap,
    onViewTask, 
    onEditTask, 
    onDeleteTask
  } = useTaskContext();

  const { selectedColor} = useColor();

    if (!todoItemData || !todoItemData.priorityValue) {
    return null; // Handle missing or invalid data
  }

  return (
    <div className={styles.todo__item__elements}>
      <div className='flex'>
        <div className='flex items-center'>
          <Checkbox color={selectedColor} radius="full" />
        </div>
        <div className={styles.todo__elements__cotent}>
          <div className='font-semibold'>
            {todoItemData.taskTitleValue}
          </div>
          <div className='font-extralight text-sm h-13'>
            {descriptionStringChecker(todoItemData.descriptionValue)}
          </div>
        </div>
      </div>
      <div className='flex'>
        <div className={styles.todo__elements__info}>
          <div className='font-medium'>
            Deadline
          </div>
          <div className='font-extralight truncate'>
            {todoItemData.dateValue}
          </div>
          <Chip
            className='capitalize'
            color={statusColorMap[todoItemData.priorityValue.value]}
            size="sm"
            variant="flat"
          >
            {todoItemData.priorityValue.label}
          </Chip>
        </div>
        <div className="flex">
          <Tooltip color={selectedColor} content="View">
            <TaskViewModal task={todoItemData} />
          </Tooltip>
          <Tooltip color={selectedColor} content="Edit">
            <Button
              isIconOnly
              variant="light"
              color={selectedColor}
              className="text-lg"
              onClick={() => onEditTask(todoItemData)} // Call edit task function
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
              onClick={() => onDeleteTask(todoItemData)} // Call delete task function
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
