import Nav from "@/components/NavigationBar";
import TodoInterface from "@/components/TodoInterface/TodoInterface";
import { TaskProvider } from "@/providers/Context/TaskContext";

export default function Home() {
  return (
    <main className="flex flex-col mx-auto my-0 w-full">
      <Nav />
      <TaskProvider>
        <TodoInterface />
      </TaskProvider>
    </main>
  );
}
