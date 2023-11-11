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
  const [activeTab, setActiveTab] = useState('In Progress');

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
              selectedKey={activeTab}
              onSelectionChange={(key: React.Key) => {
                setActiveTab(key as string);
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
          </Select>
        </div>



          <div className="flex flex-col mx-6 relative">
      
            {/* styles.todo__items
              display: flex;
              flex-direction: column;
              margin: 0 25px;
              position: relative; */}
            
            {/* add new todo */}
            <div className="flex w-full m-0 my-6 justify-between
            after:absolute after:block after:h-px after:w-full after:self-end after:bg-[#EDF2F7] 
            after:m-0 after:-mb-6 after:-ml-6">


            {/* .todo__item__elements
            display: flex;
            width: 100%;
            // justify-content: space-between;
            margin: 25px 0;
            justify-content: space-between; 

            after
                        content: "";
                display: block;
                width: 800px;
                height: 1px;
                background: #EDF2F7;
                position: absolute;
                align-self: flex-end;
                margin: 0 0 -25px -25px;
            */}
              <>
                <NewTaskForm onTaskAdded={handleTaskAdded} />
              </>
            </div>
              {todoItems} {/* Render the array of TodoItem components */}
              {/* <TodoItem /> */}
          </div>

          
          {/* {activeTab === 'Finished' && (
            <div className="">
              This is when Finished is clicked
            </div>
          )} */}

        <div className='flex items-center justify-center m-3'>
          <Pagination loop showControls color={selectedColor} total={5} initialPage={1} />
        </div>
    </div>
    </ >
  );
};

export default TodoInterface;