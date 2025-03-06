
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { TaskList } from "@/components/task/TaskList";
import { TaskForm } from "@/components/task/TaskForm";
import { tasks as initialTasks } from "@/lib/data";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Task, ViewMode } from "@/lib/types";
import CalendarView from "./Calendar";
import { toast } from "sonner";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  const handleAddTask = () => {
    setSelectedTask(undefined);
    setTaskFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setTaskFormOpen(true);
  };

  const handleSaveTask = (updatedTask: Task) => {
    const isNewTask = !tasks.some((task) => task.id === updatedTask.id);
    
    if (isNewTask) {
      setTasks([...tasks, updatedTask]);
      toast.success("Task created successfully");
    } else {
      setTasks(
        tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
      toast.success("Task updated successfully");
    }
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast.success("Task deleted successfully");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar 
          onCategorySelect={handleCategorySelect} 
          selectedCategory={selectedCategory} 
        />
        <div className="flex-1">
          <Navbar 
            onViewChange={setViewMode} 
            currentView={viewMode} 
            onAddTask={handleAddTask}
          />
          <main className="container py-6 flex-1">
            {viewMode === "list" ? (
              <TaskList
                tasks={tasks}
                selectedCategory={selectedCategory}
                onEditTask={handleEditTask}
                onToggleComplete={handleToggleComplete}
                onDeleteTask={handleDeleteTask}
              />
            ) : (
              <CalendarView
                tasks={tasks}
                onEditTask={handleEditTask}
                onToggleComplete={handleToggleComplete}
              />
            )}
          </main>
        </div>
      </div>

      <TaskForm
        task={selectedTask}
        isOpen={taskFormOpen}
        onClose={() => setTaskFormOpen(false)}
        onSave={handleSaveTask}
      />
    </SidebarProvider>
  );
};

export default Index;
