import React from 'react';
import { Checkbox, Button, Tooltip, Chip } from '@nextui-org/react';
import { EyeIcon } from '@/icons/EyeIcon';
import { EditIcon } from '@/icons/EditIcon';
import { DeleteIcon } from '@/icons/DeleteIcon';
import styles from '@/styles/Home.module.scss'

import { useTaskContext } from '@/providers/Context/TaskContext';
import { useColor } from '@/app/ColorContext';

interface TodoItemData {
  taskTitleValue: string;
  descriptionValue: string;
  priorityValue: { label: string; value: string };
  dateValue: string;
}

const TodoItem: React.FC<{ todoItemData: TodoItemData }> = ({ todoItemData }) => {
  // ... rest of your component remains the same

  const {
    descriptionStringChecker,
    statusColorMap
  } = useTaskContext();

  const { selectedColor} = useColor();

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
            {/* {descriptionStringChecker(todoItemData.descriptionValue)} */}
            {todoItemData.descriptionValue}
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
    </div>
  );
};

export default TodoItem;
