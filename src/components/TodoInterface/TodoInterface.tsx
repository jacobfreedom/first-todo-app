"use client"

import React, { useState } from "react";
import { Pagination, Tabs, Tab, Select, SelectItem, Button } from "@nextui-org/react";
import { useUserContext } from '@/providers/Context/UserContext';
import styles from '@/styles/Home.module.scss'
import NewTaskForm from './NewTaskForm/NewTaskForm';
import { useTaskContext } from '@/providers/Context/TaskContext';
import { BiSort } from "react-icons/bi";




const TodoInterface = () => {

  const {selectedColor, selectedTab, handleSelectedTabChange, setSelectedSortingOption} = useUserContext();
  const {todoItems, handleTaskAdded, handleSortChange } = useTaskContext();
  const [sortOption, setSortOption] = useState(''); // State to track selected sorting option
  const [reversed, setReversed] = useState(false); // State to track sorting direction


  const handleSortSelection = (selectedOption: string) => {
    setSortOption(selectedOption); // Update the state with the selected sorting option
    handleSortChange(selectedOption); // Call the sorting function from the context based on the selected option
    setSelectedSortingOption(selectedOption); // Use the setter function

  };

  const handleSortToggle = () => {
    let newSortOption;
    if (sortOption.endsWith('Reverse')) {
      // If the current option is reversed, switch to the regular option
      newSortOption = sortOption.slice(0, -7); // Removing the 'Reverse' at the end
    } else {
      // If it's a regular option, switch to the reversed option
      newSortOption = `${sortOption}Reverse`; // Appending 'Reverse'
    }
    setSortOption(newSortOption);
    handleSortChange(newSortOption);
    setSelectedSortingOption(newSortOption); // Use the setter function
  };
  
    // Filter the items based on their checked status
    const uncheckedItems = todoItems.filter((item) => {
      if (React.isValidElement(item)) {
        const todoData = item.props.todoItemData;
        return todoData && !todoData.taskChecked;
      }
      return false;
    });

    const checkedItems = todoItems.filter((item) => {
      if (React.isValidElement(item)) {
        const todoData = item.props.todoItemData;
        return todoData && todoData.taskChecked;
      }
      return false;
    });


  return (
    <>
    <div className='mt-10'></div>
      <div className={styles.todo__interface}>

        <div className="flex items-center justify-between relative 
          after:absolute after:block after:h-px after:w-full after:self-end after:bg-[#EDF2F7]">

          <div className="m-3">
            <Tabs 
              aria-label="Options"
              color={selectedColor}
              variant="underlined"
              size="lg"
              selectedKey={selectedTab} // Use context state for selected key
              onSelectionChange={(key: React.Key) => {
                handleSelectedTabChange(key as string); // Update both local and context values
              }}
            >
              <Tab
                key="In Progress"
                title="In Progress"
              />
              <Tab
                key="Finished"
                title="Finished"
              />
            </Tabs>
          </div>

          <div className="flex m-3 items-center">
          <Button 
          isIconOnly 
          color={selectedColor} 
          className="mr-2"
          onPress={() => handleSortToggle()} // Utilize the toggle function on button click
          >
            <BiSort />
          </Button>
          <Select
              variant="underlined"
              label="Sort by"
              placeholder="Created Time"
              size="sm"
              className="w-[200px]"
              color={selectedColor}
              onChange={(e) => handleSortSelection(e.target.value)}
            >
              <SelectItem key="createdTimestamp" value="createdTimestamp">Created Time</SelectItem>
              <SelectItem key="title" value="title">Title</SelectItem>
              <SelectItem key="priority" value="priority">Priority</SelectItem>
              <SelectItem key="date" value="date">Date</SelectItem>
          </Select>
          </div>
        </div>
        
          <div className="flex flex-col relative">
            {/* add new todo */}
            <div className="flex w-full my-6 justify-between
            after:absolute after:block after:h-px after:w-full after:self-end after:bg-[#EDF2F7] after:-mb-6">
              <>
                <NewTaskForm onTaskAdded={handleTaskAdded} />
              </>
            </div>
            {selectedTab === 'In Progress' && (
              <>
              {uncheckedItems} {/* Render the array of TodoItem components */}
              </>
            )}
            {selectedTab === 'Finished' && (
            <>
            {checkedItems}
            </>
            )}
          </div>
        <div className='flex items-center justify-center m-3'>
          <Pagination loop showControls color={selectedColor} total={5} initialPage={1} />
        </div>
    </div>
    </ >
  );
};

export default TodoInterface;