import React, {useState} from 'react';
import { Checkbox, Chip } from '@nextui-org/react';
import { useTaskContext } from '@/providers/Context/TaskContext';
import { useUserContext } from '@/providers/Context/UserContext';
import { TodoItemData } from '@/providers/Types/Types';
import TaskViewModal from './Events/TaskViewModal';
import TaskEditModal from './Events/TaskEditModal';
import TaskDeleteModal from './Events/TaskDeleteModal';
import { motion } from "framer-motion";




const TodoItem: React.FC<{ todoItemData: TodoItemData; taskKey: string }> = ({ todoItemData, taskKey }) => {


  const {
    descriptionStringChecker,
    statusColorMap,
    titleStringChecker,
    refreshTaskList
  } = useTaskContext();

  const { selectedColor} = useUserContext();

  const [isChecked, setIsChecked] = React.useState(() => {
    const storedItem = localStorage.getItem(taskKey);
    return storedItem ? JSON.parse(storedItem).taskChecked : false;
  });

  const [isVisible, setIsVisible] = useState(true);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);

    const storedItemString = localStorage.getItem(taskKey);
    const storedItem = storedItemString ? JSON.parse(storedItemString) : {};
    storedItem.taskChecked = checked;
    localStorage.setItem(taskKey, JSON.stringify(storedItem));

    // Trigger the animation to hide the item
    setIsVisible(false);
  };

  const onAnimationComplete = () => {
    // Animation is complete, now refresh the task list
    refreshTaskList();
  };
  

  const show = {
    opacity: 1,
    display: "block"
  };
  
  const hide = {
    opacity: 0,
    transitionEnd: {
      display: "none"
    }
  };

  return (
    <motion.div animate={isVisible ? show : hide} onAnimationComplete={onAnimationComplete}>
      <div className="flex w-full my-6 justify-between
        after:absolute after:block after:h-px after:w-full after:self-end after:bg-[#EDF2F7] after:-mb-6">
        {/* todo__item__elements  */}
        <div className='flex ml-6'>
          <div className='flex items-center'>
            <Checkbox 
            color={selectedColor} 
            radius="full" 
            isSelected={isChecked} 
            onValueChange={handleCheckboxChange}
            onClick={() => setIsVisible(!isVisible)}
            />
          </div>
          <div className='flex flex-col my-0 mr-14 ml-6'>
          {/* display: flex;
              flex-direction: column;
              margin: 0 56px 0 25px; */}
            <div className='font-semibold'>
              {titleStringChecker(todoItemData.taskTitleValue)}
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
            <TaskViewModal   
            task={todoItemData}
            onUpdateStatus={(status) => handleCheckboxChange(status)}
            setIsChecked={setIsChecked}
            taskKey={taskKey}
            />

            <TaskEditModal task={todoItemData} taskKey={taskKey} />
              
            <TaskDeleteModal taskKey={taskKey} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TodoItem;