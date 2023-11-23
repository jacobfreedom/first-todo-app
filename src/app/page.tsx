"use client"

import autoprefixer from 'autoprefixer'
import styles from '../styles/Home.module.scss'

import Nav from '@/components/NavigationBar';
import TodoInterface from '@/components/TodoInterface/TodoInterface';
import { TaskProvider } from '@/providers/Context/TaskContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="max-w-[1000px] px-[25px] flex flex-col mx-auto my-0 p-0">
      <Nav />
      <TaskProvider>
        <TodoInterface />
      </TaskProvider>
        {/* <footer className='mt-auto absolute bottom-0 left-0 right-0'>
        <div className='w-full mx-auto max-w-screen p-4 flex items-center justify-center mt-6'>
            Made by Jakub ✌️
        </div>
    </footer> */}
    </main>
  )
}
