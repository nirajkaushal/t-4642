
import { useState } from "react";
import { format, startOfWeek, endOfWeek, startOfDay, addDays, isSameDay } from "date-fns";
import { Task } from "@/lib/types";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskForm } from "@/components/task/TaskForm";

interface CalendarViewProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onToggleComplete: (taskId: string) => void;
}

export default function CalendarView({ tasks, onEditTask, onToggleComplete }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  
  const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const endDate = endOfWeek(selectedDate, { weekStartsOn: 1 });
  
  const weekDays = Array.from({ length: 7 }).map((_, index) => 
    addDays(startDate, index)
  );
  
  const handlePrevWeek = () => {
    setSelectedDate(addDays(startDate, -7));
  };
  
  const handleNextWeek = () => {
    setSelectedDate(addDays(startDate, 7));
  };
  
  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
    setTaskFormOpen(true);
  };
  
  const handleTaskSave = (updatedTask: Task) => {
    onEditTask(updatedTask);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Calendar</h2>
          <p className="text-muted-foreground">
            {format(startDate, "MMMM d")} - {format(endDate, "MMMM d, yyyy")}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handlePrevWeek}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setSelectedDate(new Date())}
          >
            Today
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleNextWeek}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day) => (
          <div key={format(day, "yyyy-MM-dd")} className="text-center">
            <div className="mb-2 text-sm font-medium">{format(day, "EEE")}</div>
            <div 
              className={cn(
                "rounded-full h-8 w-8 flex items-center justify-center mx-auto text-sm",
                isSameDay(day, new Date()) && "bg-primary text-primary-foreground"
              )}
            >
              {format(day, "d")}
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-4 mt-2">
        {weekDays.map((day) => {
          const dayTasks = tasks.filter((task) => 
            task.dueDate && 
            isSameDay(startOfDay(task.dueDate), day)
          );
          
          return (
            <div
              key={`tasks-${format(day, "yyyy-MM-dd")}`}
              className={cn(
                "border rounded-xl min-h-[200px] p-3",
                isSameDay(day, new Date()) && "border-primary/50 bg-primary/5"
              )}
            >
              {dayTasks.length > 0 ? (
                <div className="space-y-2">
                  {dayTasks.map((task) => {
                    const category = categories.find(c => c.id === task.categoryId);
                    return (
                      <div
                        key={task.id}
                        onClick={() => handleTaskSelect(task)}
                        className={cn(
                          "p-2 rounded-lg cursor-pointer border-l-4 text-left",
                          `border-l-[${category?.color || '#3B82F6'}]`,
                          task.completed ? "opacity-60 bg-muted/50" : "hover:bg-muted/30",
                          "transition-all duration-200"
                        )}
                        style={{ borderLeftColor: category?.color }}
                      >
                        <div className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={(e) => {
                              e.stopPropagation();
                              onToggleComplete(task.id);
                            }}
                            className="mt-1 rounded-full"
                          />
                          <div>
                            <h4 className={cn(
                              "text-sm font-medium",
                              task.completed && "line-through text-muted-foreground"
                            )}>
                              {task.title}
                            </h4>
                            {task.priority === 'high' && (
                              <span className="inline-block h-1.5 w-1.5 rounded-full bg-priority-high mt-1"></span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                  No tasks
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <TaskForm
        task={selectedTask}
        isOpen={taskFormOpen}
        onClose={() => {
          setTaskFormOpen(false);
          setSelectedTask(undefined);
        }}
        onSave={handleTaskSave}
      />
    </div>
  );
}
