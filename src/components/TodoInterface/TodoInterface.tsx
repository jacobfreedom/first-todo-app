"use client"

import React, { useState } from "react";
import { Tabs, Tab, Select, SelectItem, Button, CircularProgress } from "@nextui-org/react";
import { useUserContext } from '@/providers/Context/UserContext';
import NewTaskForm from './NewTaskForm/NewTaskForm';
import { useTaskContext } from '@/providers/Context/TaskContext';
import { FaSortAmountDownAlt, FaSortAmountUp } from "react-icons/fa";
import { motion } from "framer-motion";
import { TodoItemData } from "@/providers/Types/Types";
import InfiniteScroll from 'react-infinite-scroll-component';

const TodoInterface = () => {

  const {selectedColor, selectedTab, handleSelectedTabChange } = useUserContext();
  const { handleSortChange, todoItems, refreshTaskList } = useTaskContext();

  const [reversed, setReversed] = useState(false); // State to track sorting direction
  const [itemsToShow, setItemsToShow] = useState(10); // Change the initial value as needed
  const [selectedSort, setSelectedSort] = useState("createdTimestamp");



  const handleSortDirection = () => {
    setReversed(!reversed);
    handleSortChange(selectedSort, !reversed); 
  };

  const handleSortSelection = (selectedSortOption: string) => {
    setSelectedSort(selectedSortOption);
    handleSortChange(selectedSortOption, reversed);
  };

  //filters the checked and unchecked todoitems for splitting inbetween tabs
  const filterTodoItems = (items: React.ReactNode[], condition: (todoData: TodoItemData) => boolean) => {
    return items.filter((item) => {
      if (React.isValidElement(item)) {
        const todoData = item.props.todoItemData;
        return todoData && condition(todoData);
      }
      return false;
    });
  };

  // Rendinring of filtered items + infinite scroll component setup
  const renderFilteredItems = (filterCondition: (todoData: TodoItemData) => boolean) => {
    const filteredItems = filterTodoItems(todoItems, filterCondition);

    const fetchMoreData = () => {
      setTimeout(() => {
        setItemsToShow(itemsToShow + 5)
      }, 1500);
    };

    return (
      <InfiniteScroll
        dataLength={itemsToShow}
        next={fetchMoreData} // Increase the number of items to show on scroll
        hasMore={itemsToShow < filteredItems.length} //if itemstoshow is lower than the lenght of filtered items the loader button will be show
        className="flex flex-col"
        loader={<CircularProgress label="Loading..." className="self-center my-6" color={selectedColor} />}
      >
        <motion.div
          key={selectedTab}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col relative"
        >
          {filteredItems.slice(0, itemsToShow)}
        </motion.div>
      </InfiniteScroll>
    );
  };

  //saves the selected tab to localstorage and also sets the itemstoshow to the default value in oder to trigger the loading animation again
  const handleTabChange = (selectedTab: React.Key) => {
    setItemsToShow(10);
    handleSelectedTabChange(selectedTab as string);

    // Reset the selectedSort state and the Select component
    setSelectedSort("createdTimestamp");

    refreshTaskList();
  };

  return (
    <div className="flex flex-col self-center 
    rounded-3xl border-solid border-1 border-[#EDF2F7] 
    w-full md:w-[800px]
    mt-10 mb-0 md:mb-10">

      <div className="flex items-center justify-between relative 
        flex-col sm:flex-row
        after:absolute after:hidden after:sm:block after:h-px after:w-full after:self-end after:bg-[#EDF2F7]">

        <div className="m-3">
          <Tabs 
            aria-label="Options"
            color={selectedColor}
            variant="underlined"
            size="lg"
            selectedKey={selectedTab} // Use context state for selected key
            onSelectionChange={(key: React.Key) => handleTabChange(key)}
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
            {reversed ? <FaSortAmountUp /> : <FaSortAmountDownAlt />}
          </motion.div>
          </Button>
          <Select
              defaultSelectedKeys={["createdTimestamp"]}
              selectedKeys={[selectedSort]}
              variant="underlined"
              label="Sort by"
              placeholder="Created Time"
              size="sm"
              className="mr-2 w-52"
              color={selectedColor}
              onChange={(e) => handleSortSelection(e.target.value)}
              disabledKeys={[selectedSort]}
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
            <NewTaskForm />
          </>
        </div>

        {/* rendering of filtedered items based on selected tab */}
        {selectedTab === 'In Progress' && renderFilteredItems((todoData) => !todoData.taskChecked)}
        {selectedTab === 'Finished' && renderFilteredItems((todoData) => todoData.taskChecked)}

      </div>

      <div className='flex items-center justify-center m-3'>
        Made by Jakub
      </div>
    </div>
  );
};

export default TodoInterface;