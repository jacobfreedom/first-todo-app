import React, {useState} from 'react';
import { Checkbox, Chip } from '@nextui-org/react';
import { useTaskContext } from '@/providers/Context/TaskContext';
import { useUserContext } from '@/providers/Context/UserContext';
import { TodoItemData } from '@/providers/Types/Types';
import TaskViewModal from './Events/TaskViewModal';
import TaskEditModal from './Events/TaskEditModal';
import TaskDeleteModal from './Events/TaskDeleteModal';
import { motion } from "framer-motion";
import { MdOutlineDateRange } from "react-icons/md";

const TodoItemElement: React.FC<{ todoItemData: TodoItemData; taskKey: string }> = ({ todoItemData, taskKey }) => {

  const {
    descriptionStringChecker,
    statusColorMap,
    titleStringChecker,
  } = useTaskContext();

  const { selectedColor} = useUserContext();

  const [isChecked, setIsChecked] = useState(() => {
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
  
  const handleDelete = () => {
    // Trigger the animation to hide the item
    setIsVisible(false);
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
    <motion.div animate={isVisible ? show : hide}>
      <div className="flex w-full my-6
        after:absolute after:block after:h-px after:w-full after:self-end after:bg-[#EDF2F7] after:-mb-6">
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
        </div>
        
        <div className='flex mx-6 w-full justify-between'>

          <div className='flex flex-col sm:flex-row w-full justify-between'>  
          
            <div className='flex flex-col'>
              <div className='font-semibold'>
                {titleStringChecker(todoItemData.taskTitleValue)}
              </div>
              <div className='font-extralight text-sm'>
                {descriptionStringChecker(todoItemData.descriptionValue)}
              </div>
            </div>

            <div className='flex self-center ml-0 sm:ml-6'>
              <div className="flex flex-col items-center justify-center mt-2 sm:mt-0 gap-2">
                <Chip
                  className='capitalize mx-6'
                  color={statusColorMap[todoItemData.priorityValue.value]}
                  size="sm"
                  variant="flat"
                >
                  {todoItemData.priorityValue.label}
                </Chip>
                <div className='flex flex-row font-extralight truncate items-center'>
                  <MdOutlineDateRange /> 
                  {new Date(todoItemData.dateValue).toLocaleDateString('en-GB', { month: 'numeric', day: 'numeric', year: 'numeric' })}
                </div>


                
              </div>

              <div className='hidden sm:flex'>

                <TaskViewModal   
                task={todoItemData}
                onUpdateStatus={(status) => handleCheckboxChange(status)}
                setIsChecked={setIsChecked}
                taskKey={taskKey}
                />

                <TaskEditModal task={todoItemData} taskKey={taskKey} />
                  
                <TaskDeleteModal taskKey={taskKey} onDelete={handleDelete}/>
              </div>
            </div>
          </div>


            <div className="flex sm:hidden flex-col justify-center">
              <TaskViewModal   
              task={todoItemData}
              onUpdateStatus={(status) => handleCheckboxChange(status)}
              setIsChecked={setIsChecked}
              taskKey={taskKey}
              />

              <TaskEditModal task={todoItemData} taskKey={taskKey} />
                
              <TaskDeleteModal taskKey={taskKey} onDelete={handleDelete}/>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TodoItemElement;