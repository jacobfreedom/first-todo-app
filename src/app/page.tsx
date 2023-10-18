"use client"

import autoprefixer from 'autoprefixer'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'





import {NewTaskIcon} from '@/icons/NewTaskIcon';
import {EditIcon} from "@/icons/EditIcon";
import {DeleteIcon} from "@/icons/DeleteIcon";
import {EyeIcon} from "@/icons/EyeIcon";

import React, { ChangeEvent, useEffect } from "react";
import {Button, Checkbox, Pagination,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
  Input, Textarea,
  Tooltip,
  Select, SelectItem,
  Chip, ChipProps
} from "@nextui-org/react";

import { useForm, SubmitHandler } from "react-hook-form"

import Nav from '@/components/NavigationBar';
import TodoInterface from '@/components/TodoInterface';
import { TaskProvider } from '@/providers/Context/TaskContext';

import { useTaskContext } from '@/providers/Context/TaskContext';
import { useColor } from './ColorContext';
import { todo } from 'node:test';
import { type } from 'node:os';
import NewTaskForm from '@/components/TodoInterface_Creation/TodoModal';


export default function Home() {
  const { selectedColor, setSelectedColor } = useColor();



  // import of the const

  return (

    <main className={styles.container}>
      <Nav />
      <TaskProvider>
        <TodoInterface />

    {/* <footer className='mt-auto absolute bottom-0 left-0 right-0'>
        <div className='w-full mx-auto max-w-screen p-4 flex items-center justify-center mt-6'>
            Made by Jakub ✌️
        </div>
    </footer> */}
    </TaskProvider>
    </main>
  )
}
