
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Task } from "@/lib/types";
import { categories } from "@/lib/data";
import { CheckCircle2, Circle, Clock, Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onToggleComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export function TaskCard({ task, onEdit, onToggleComplete, onDelete }: TaskCardProps) {
  const category = categories.find((c) => c.id === task.categoryId);
  
  const priorityColorClass = {
    low: "text-priority-low",
    medium: "text-priority-medium",
    high: "text-priority-high",
  }[task.priority];
  
  const priorityBgClass = {
    low: "bg-priority-low/10",
    medium: "bg-priority-medium/10",
    high: "bg-priority-high/10",
  }[task.priority];

  return (
    <div 
      className={cn(
        "task-card",
        task.completed && "opacity-70"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 p-0 rounded-full -ml-1"
            onClick={() => onToggleComplete(task.id)}
          >
            {task.completed ? (
              <CheckCircle2 className="h-5 w-5 text-primary" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
          </Button>
          
          <div className="space-y-1.5">
            <h3 className={cn(
              "text-base font-medium transition-colors",
              task.completed && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {task.description}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {category && (
                <div 
                  className="tag"
                  style={{ 
                    backgroundColor: `${category.color}20`, 
                    color: category.color 
                  }}
                >
                  {category.name}
                </div>
              )}
              
              <div className={cn("tag", priorityBgClass, priorityColorClass)}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </div>
              
              {task.dueDate && (
                <div className="tag bg-gray-100 text-gray-600 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {format(task.dueDate, "MMM d")}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => onEdit(task)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggleComplete(task.id)}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              {task.completed ? "Mark Incomplete" : "Mark Complete"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => onDelete(task.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
