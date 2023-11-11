import React from 'react';
import { Checkbox, Chip } from '@nextui-org/react';
import styles from '@/styles/Home.module.scss'

import { useTaskContext } from '@/providers/Context/TaskContext';
import { useColor } from '@/app/ColorContext';
import { TodoItemData } from '@/providers/Types/Types';
import TaskViewModal from './Events/TaskViewModal';
import TaskEditModal from './Events/TaskEditModal';
import TaskDeleteModal from './Events/TaskDeleteModal';



const TodoItem: React.FC<{ todoItemData: TodoItemData; taskKey: string }> = ({ todoItemData, taskKey }) => {


  const {
    descriptionStringChecker,
    statusColorMap,
  } = useTaskContext();

  const { selectedColor} = useColor();

  return (
    <div className="flex w-full my-6 justify-between
    after:absolute after:block after:h-px after:w-full after:self-end after:bg-[#EDF2F7] after:-mb-6">
      {/* todo__item__elements  */}
      <div className='flex ml-6'>
        <div className='flex items-center'>
          <Checkbox color={selectedColor} radius="full" />
        </div>
        <div className='flex flex-col my-0 mr-14 ml-6'>
        {/* display: flex;
            flex-direction: column;
            margin: 0 56px 0 25px; */}
          <div className='font-semibold'>
            {todoItemData.taskTitleValue}
          </div>
          <div className='font-extralight text-sm h-13'>
            {descriptionStringChecker(todoItemData.descriptionValue)}
          </div>
        </div>
      </div>
      <div className='flex'>
        <div className="flex flex-col mr-[20px] items-center">
        {/* display: flex;
            flex-direction: column;
            margin-right: 20px;
            align-items: center; */}
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
        <div className="flex mr-6">
          <TaskViewModal task={todoItemData} />

          <TaskEditModal task={todoItemData} taskKey={taskKey} />
            
          <TaskDeleteModal taskKey={taskKey} />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;