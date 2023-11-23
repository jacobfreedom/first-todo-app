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
    <main className="flex flex-col mx-auto my-0 w-full">
      <Nav />
      <TaskProvider>
        <TodoInterface />
      </TaskProvider>
    </main>
  )
}
