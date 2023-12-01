import React, { useState } from "react";
import { motion } from "framer-motion";
import { CircularProgress } from "@nextui-org/react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { TodoItemData } from "@/providers/Types/Types";
import { useUserContext } from "@/providers/Context/UserContext";
import { useTaskContext } from "@/providers/Context/TaskContext";

const TodoList: React.FC<{ itemsToShow: number; setItemsToShow: React.Dispatch<React.SetStateAction<number>> }> = ({ itemsToShow, setItemsToShow }) => {
    const { selectedColor, selectedTab } = useUserContext();
  const { todoItems } = useTaskContext(); // Ensure that useTaskContext returns the expected structure


  const renderFilteredItems = (filterCondition: (todoData: TodoItemData) => boolean) => {
    const filteredItems = filterTodoItems(todoItems, filterCondition);

    const fetchMoreData = () => {
      setTimeout(() => {
        setItemsToShow(itemsToShow + 5);
      }, 1500);
    };

    return (
      <InfiniteScroll
        dataLength={itemsToShow}
        next={fetchMoreData}
        hasMore={itemsToShow < filteredItems.length}
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

  const filterTodoItems = (items: React.ReactNode[], condition: (todoData: TodoItemData) => boolean) => {
    return items.filter((item) => {
      if (React.isValidElement(item)) {
        const todoData = (item as React.ReactElement<{ todoItemData: TodoItemData }>).props.todoItemData;
        return todoData && condition(todoData);
      }
      return false;
    });
  };

  return (
    <div className="flex flex-col relative">
      {selectedTab === 'In Progress' && renderFilteredItems((todoData) => !todoData.taskChecked)}
      {selectedTab === 'Finished' && renderFilteredItems((todoData) => todoData.taskChecked)}
    </div>
  );
};

export default TodoList;
