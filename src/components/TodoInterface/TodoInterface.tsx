"use client"

import React, { useState, useRef, useEffect } from "react";
import { Tabs, Tab, Select, SelectItem, Button, CircularProgress } from "@nextui-org/react";
import { useUserContext } from '@/providers/Context/UserContext';
import styles from '@/styles/Home.module.scss'
import NewTaskForm from './NewTaskForm/NewTaskForm';
import { useTaskContext } from '@/providers/Context/TaskContext';
import { BiSort } from "react-icons/bi";

const TodoInterface = () => {

  const {selectedColor, selectedTab, handleSelectedTabChange } = useUserContext();
  const {handleTaskAdded, handleSortChange, inProgressItems, finishedItems, itemsToShowInProgress, itemsToShowFinished, loadMoreItems, isLoading, setIsLoading } = useTaskContext();
  const [reversed, setReversed] = useState(false); // State to track sorting direction

  const handleSortDirection = () => {
    setReversed(!reversed);
  };

  const handleSortSelection = (selectedSortOption: string) => {
    handleSortChange(selectedSortOption, reversed);
  };

  // // Filter the items based on their checked status
  // const uncheckedItems = todoItems.filter((item) => {
  //   if (React.isValidElement(item)) {
  //     const todoData = item.props.todoItemData;
  //     return todoData && !todoData.taskChecked;
  //   }
  //   return false;
  // });

  // const checkedItems = todoItems.filter((item) => {
  //   if (React.isValidElement(item)) {
  //     const todoData = item.props.todoItemData;
  //     return todoData && todoData.taskChecked;
  //   }
  //   return false;
  // });
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // User has scrolled to the bottom, load more items based on the selected tab
        if (selectedTab === 'In Progress' && itemsToShowInProgress < inProgressItems.length) {
          loadMoreItems('In Progress');
        } else if (selectedTab === 'Finished' && itemsToShowFinished < finishedItems.length) {
          loadMoreItems('Finished');
        }
      }
      console.log('scrolling');
    };
    
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selectedTab, loadMoreItems]);
  
  // Add this useEffect to handle the updated items
  useEffect(() => {
    console.log('In Progress Items:', inProgressItems);
    console.log('Finished Items:', finishedItems);
  }, [inProgressItems, finishedItems]);
  
  useEffect(() => {
    console.log('In Progress Items:', inProgressItems);
    console.log('Finished Items:', finishedItems);
  }, [inProgressItems, finishedItems]);

  // Add this useEffect to reset loading state when items are refreshed
  useEffect(() => {
    setIsLoading(false);
  }, [inProgressItems, finishedItems]);
  

  return (
    <>
    <div className='my-10'>
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
          onPress={() => handleSortDirection()} // Utilize the toggle function on button click
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
                {inProgressItems.slice(0, itemsToShowInProgress)}
                {isLoading && itemsToShowInProgress < inProgressItems.length && 
                <CircularProgress label="Loading..." className="self-center my-6" color={selectedColor}/>}
              </>
            )}
            {selectedTab === 'Finished' && (
              <>
                {finishedItems.slice(0, itemsToShowFinished)}
                {isLoading && itemsToShowFinished < finishedItems.length && 
                <CircularProgress label="Loading..." className="self-center my-6" color={selectedColor}/>}
              </>
            )}
          </div>
        <div className='flex items-center justify-center m-3'>
          <Button>Load More</Button>
        </div>
      </div>
    </div>
    </ >
  );
};

export default TodoInterface;