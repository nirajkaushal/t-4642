
import { Task } from "@/lib/types";
import { TaskCard } from "./TaskCard";
import { Button } from "@/components/ui/button";
import { ArrowDownAZ, ArrowUpZA, Calendar, FilterX, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/lib/data";

interface TaskListProps {
  tasks: Task[];
  selectedCategory: string | null;
  onEditTask: (task: Task) => void;
  onToggleComplete: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TaskList({
  tasks,
  selectedCategory,
  onEditTask,
  onToggleComplete,
  onDeleteTask,
}: TaskListProps) {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"name_asc" | "name_desc" | "date_asc" | "date_desc">("date_desc");
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    let result = [...tasks];
    
    // Filter by category if selected
    if (selectedCategory) {
      result = result.filter((task) => task.categoryId === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          (task.description?.toLowerCase().includes(query) || false)
      );
    }
    
    // Filter completed tasks
    if (!showCompleted) {
      result = result.filter((task) => !task.completed);
    }
    
    // Sort tasks
    result.sort((a, b) => {
      switch (sortOrder) {
        case "name_asc":
          return a.title.localeCompare(b.title);
        case "name_desc":
          return b.title.localeCompare(a.title);
        case "date_asc":
          return (a.dueDate?.getTime() || 0) - (b.dueDate?.getTime() || 0);
        case "date_desc":
          return (b.dueDate?.getTime() || 0) - (a.dueDate?.getTime() || 0);
        default:
          return 0;
      }
    });
    
    setFilteredTasks(result);
  }, [tasks, selectedCategory, searchQuery, sortOrder, showCompleted]);

  const currentCategory = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)
    : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {currentCategory ? currentCategory.name : "All Tasks"}
          </h2>
          <span className="text-muted-foreground">
            {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}
          </span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  {sortOrder.includes("name") ? (
                    sortOrder === "name_asc" ? (
                      <ArrowDownAZ className="h-4 w-4" />
                    ) : (
                      <ArrowUpZA className="h-4 w-4" />
                    )
                  ) : (
                    <Calendar className="h-4 w-4" />
                  )}
                  {sortOrder.includes("name")
                    ? "Name"
                    : "Due Date"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortOrder("name_asc")}>
                  <ArrowDownAZ className="mr-2 h-4 w-4" />
                  Name (A-Z)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("name_desc")}>
                  <ArrowUpZA className="mr-2 h-4 w-4" />
                  Name (Z-A)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("date_asc")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Due Date (Earliest)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("date_desc")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Due Date (Latest)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button
              variant={showCompleted ? "default" : "outline"}
              size="sm"
              onClick={() => setShowCompleted(!showCompleted)}
              className="gap-2"
            >
              {showCompleted ? (
                <FilterX className="h-4 w-4" />
              ) : (
                <FilterX className="h-4 w-4" />
              )}
              {showCompleted ? "All" : "Incomplete"}
            </Button>
          </div>
        </div>
      </div>
      
      {filteredTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-secondary p-3 mb-3">
            <FilterX className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No tasks found</h3>
          <p className="text-muted-foreground mt-1 mb-4">
            {searchQuery
              ? "Try adjusting your search or filters"
              : "Get started by adding your first task"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onToggleComplete={onToggleComplete}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}
