// import { Button, Checkbox, Chip, Tooltip } from '@nextui-org/react';
// import styles from '../styles/Home.module.scss'

// import { EditIcon } from '@/icons/EditIcon';
// import { DeleteIcon } from '@/icons/DeleteIcon';
// import { EyeIcon } from '@/icons/EyeIcon';

// import { ColorContext } from '@/app/ColorContext';

// function Todo() {
//   const selectedColor = React.useContext(ColorContext);

//     return (
        
//         <div className={styles.todo__item__elements}>

//         <div className="flex items-center">
//           <Checkbox color={selectedColor} radius="full" />
//         </div>
//         <div className={styles.todo__elements__cotent}>
//           <div className='font-semibold'>
//             An example To Do Title
//           </div>

//           <div className='font-extralight text-sm h-13'>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius enim sed orci pellentesque, ut ornare justo vulputate. Cras tristique ante ut mauris sagittis, sit amet volutpat justo aliquet. Pellentesque pulvinar eleifend dignissim. 
//           </div>
//         </div>

//         <div className={styles.todo__elements__info}>
//           <div className='font-medium'>
//             Deadline
//           </div>
//           <div className='font-extralight truncate'>
//             01. 13. 2028
//           </div>


//           <Chip className='capitalize' color={statusColorMap[priorities.value]} size="sm" variant="flat">
//                 {priorityValue}
//           </Chip>
//         </div>  
//         <div className="flex">
     
//               <Tooltip color={selectedColor} content="View">
//                 <Button 
//                   isIconOnly
//                   variant="light"
//                   color={selectedColor} 
//                   className="text-lg"
//                 >
//                   <EyeIcon className={selectedColor}/>
//                 </Button>
//               </Tooltip>
              
//               <Tooltip color={selectedColor} content="Edit">
//                 <Button 
//                   isIconOnly
//                   variant="light"
//                   color={selectedColor}
//                   className="text-lg" 
//                 >
//                   <EditIcon className={selectedColor}/>
//                 </Button>
//               </Tooltip>

//               <Tooltip color="danger" content="Delete">
//                 <Button 
//                   isIconOnly
//                   variant="light"
//                   color="danger" 
//                   className="text-lg"
//                 >
//                   <DeleteIcon />
//                 </Button>
//               </Tooltip>

            
//         </div>
//       </div>
//     );
//   }
  
//   export default Todo;