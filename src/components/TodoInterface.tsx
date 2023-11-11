"use client"

import React, { useState } from "react";
import { Pagination, Tabs, Tab, Card, CardBody, CardHeader, Select, SelectItem } from "@nextui-org/react";
import { useColor } from '@/app/ColorContext';
import styles from '@/styles/Home.module.scss'
import NewTaskForm from './TodoInterface_Creation/TodoCreationModal';
import { useTaskContext } from '@/providers/Context/TaskContext';




const TodoInterface = () => {

  const {selectedColor} = useColor();
  const {todoItems, handleTaskAdded, handleSortChange} = useTaskContext();
  const [sortOption, setSortOption] = useState(''); // State to track selected sorting option

  const handleSortSelection = (selectedOption: string) => {
    setSortOption(selectedOption); // Update the state with the selected sorting option
    handleSortChange(selectedOption); // Call the sorting function from the context based on the selected option
  };

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
            >
              <Tab
                key="photos"
                title="In Progress"
              />
              <Tab
                key="music"
                title="Finished"
              />
            </Tabs>
          </div>

          <Select
              variant="underlined"
              label="Sort by"
              placeholder="Created Time"
              size="sm"
              className="max-w-[200px] m-3"
              color={selectedColor}
              onChange={(e) => handleSortSelection(e.target.value)}
            >
              <SelectItem key="createdTimestamp" value="createdTimestamp">Created Time</SelectItem>
              <SelectItem key="title" value="title">Title</SelectItem>
              <SelectItem key="priority" value="priority">Priority</SelectItem>
              <SelectItem key="date" value="date">Date</SelectItem>
              {/* Additional sorting criteria as needed */}
          </Select>
        </div>

        <div className={styles.todo__items}>
        
          {/* add new todo */}
          <div className={styles.todo__item__elements}>
            <>
              <NewTaskForm onTaskAdded={handleTaskAdded} />
            </>
          </div>
            {todoItems} {/* Render the array of TodoItem components */}
            {/* <TodoItem /> */}
        </div>

        <div className="">
          This is when Finished is clicked
        </div>

        <div className='flex items-center justify-center m-3'>
          <Pagination loop showControls color={selectedColor} total={5} initialPage={1} />
        </div>
    </div>
    </ >
  );
};

export default TodoInterface;