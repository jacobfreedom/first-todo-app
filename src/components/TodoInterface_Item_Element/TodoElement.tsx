import React from 'react';
import { Checkbox, Button, Tooltip, Chip } from '@nextui-org/react';
import { EyeIcon } from '@/icons/EyeIcon';
import { EditIcon } from '@/icons/EditIcon';
import { DeleteIcon } from '@/icons/DeleteIcon';
import styles from '@/styles/Home.module.scss'

import { useTaskContext } from '@/providers/Context/TaskContext';
import { useColor } from '@/app/ColorContext';

const TodoItem = () => {


//   const descriptionStringChecker = (descriptionString: string) => {
//     return descriptionString.length > 120
//       ? `${descriptionString.substring(0, 120)}...`
//       : descriptionString;
//   };

  const {
    storedTodoItem,
    descriptionStringChecker,
    priorities,
    resetTodoValues,
    statusColorMap
  } = useTaskContext();

  const { selectedColor} = useColor();

  return (
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
        <Chip
          className='capitalize'
          color={statusColorMap[storedTodoItem.priorityValue.value as keyof typeof statusColorMap] || 'default'}
          size="sm"
          variant="flat"
        >
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
  );
};

export default TodoItem;
