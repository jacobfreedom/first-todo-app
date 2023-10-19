// import React from 'react';

// // ... (imports and context)

// const TodoItemList = () => {
//   const { statusColorMap } = useTaskContext();
//   const { selectedColor } = useColor();
//   const todoItems = [];

//   // Retrieve all the keys from local storage
//   const storageKeys = Object.keys(localStorage);

//   storageKeys.forEach((key) => {
//     const storedItemString = localStorage.getItem(key);
//     if (storedItemString) {
//       const storedTodoValues = JSON.parse(storedItemString);
      
//       // Render a <TodoItem /> component for each item, passing its data as a prop
//       todoItems.push(
//         <TodoItem
//           key={key}
//           todoItemData={storedTodoValues}
//         />
//       );
//     } else {
//       console.log("Item not found in local storage.");
//     }
//   });

//   return (
//     <div>
//       {todoItems}
//     </div>
//   );
// };

// export default TodoItemList;
