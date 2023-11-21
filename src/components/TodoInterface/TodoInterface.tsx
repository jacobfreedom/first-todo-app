"use client"

import React, { useState, useEffect } from "react";
import { Tabs, Tab, Select, SelectItem, Button, CircularProgress } from "@nextui-org/react";
import { useUserContext } from '@/providers/Context/UserContext';
import styles from '@/styles/Home.module.scss'
import NewTaskForm from './NewTaskForm/NewTaskForm';
import { useTaskContext } from '@/providers/Context/TaskContext';
import { FaSortAmountDownAlt, FaSortAmountUp } from "react-icons/fa";
import { motion } from "framer-motion";

const TodoInterface = () => {

  const {selectedColor, selectedTab, handleSelectedTabChange } = useUserContext();
  const {
    handleTaskAdded, handleSortChange, inProgressItems, finishedItems, itemsToShowInProgress, 
    itemsToShowFinished, loadMoreItems, isLoading, setIsLoading, sortAndSetItems, setSelectedTabContext
  } = useTaskContext();

  const [reversed, setReversed] = useState(false); // State to track sorting direction

  const handleSortDirection = () => {
    setReversed(!reversed);
  };

  const handleSortSelection = (selectedSortOption: string) => {
    handleSortChange(selectedSortOption, reversed);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight
      ) {
        if (
          selectedTab === "In Progress" &&
          itemsToShowInProgress < inProgressItems.length
        ) {
          loadMoreItems("In Progress");
        } else if (
          selectedTab === "Finished" &&
          itemsToShowFinished < finishedItems.length
        ) {
          loadMoreItems("Finished");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    setIsLoading(false);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [selectedTab, loadMoreItems]);

  const handleSortTabSelection = () => {
      if (selectedTab === 'In Progress') {
        setSelectedTabContext('In Progress');
      } else if (selectedTab === 'Finished') {
        setSelectedTabContext('Finished');
      }
  };
  

  // // Add this useEffect to reset loading state when items are refreshed
  // useEffect(() => {
  //   setIsLoading(false);
  // }, [inProgressItems, finishedItems]);
  

  return (
    <div className="flex flex-col self-center 
    rounded-3xl border-solid border-1 border-[#EDF2F7] 
    w-full
    mt-10 mb-0 md:mb-10">
      {/* .todo__interface {
      display: flex;
      flex-direction: column;
      width: 800px;
      margin: 0 auto;
      border-radius: 28px;
      box-shadow: 0 0 10px #d3dbe0; */}

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
        {/* <AnimatePresence> */}
          <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.4 }}
          >
            <FaSortAmountDownAlt />
          </motion.div>

          {/* <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.4 }}
          >
            <FaSortAmountUp />
          </motion.div>
        </AnimatePresence> */}
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
            <motion.div
            key={selectedTab}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col relative"
            >
              {inProgressItems.slice(0, itemsToShowInProgress)}
              {isLoading && itemsToShowInProgress < inProgressItems.length && 
              <CircularProgress label="Loading..." className="self-center my-6" color={selectedColor}/>}
            </motion.div>
          )}
          {selectedTab === 'Finished' && (
            <motion.div
            key={selectedTab}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col relative"
            >
              {finishedItems.slice(0, itemsToShowFinished)}
              {isLoading && itemsToShowFinished < finishedItems.length && 
              <CircularProgress label="Loading..." className="self-center my-6" color={selectedColor}/>}
            </motion.div>
          )}
      </div>

      <div className='flex items-center justify-center m-3'>
        Made by Jakub
      </div>
    </div>
  );
};

export default TodoInterface;