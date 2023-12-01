import Head from 'next/head';
import Nav from '@/components/NavigationBar';
import TodoInterface from '@/components/TodoInterface/TodoInterface';
import { TaskProvider } from '@/providers/Context/TaskContext';

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
      </Head>
      <main className="flex flex-col mx-auto my-0 w-full">
        <Nav />
        <TaskProvider>
          <TodoInterface />
        </TaskProvider>
      </main>
    </>
  );
}
