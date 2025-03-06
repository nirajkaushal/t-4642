
import { Bell, Calendar, CheckSquare, Menu, Plus, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ViewMode } from "@/lib/types";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface NavbarProps {
  onViewChange: (view: ViewMode) => void;
  currentView: ViewMode;
  onAddTask: () => void;
}

export function Navbar({ onViewChange, currentView, onAddTask }: NavbarProps) {
  const location = useLocation();
  const [notifications, setNotifications] = useState(3);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2 md:gap-6">
          <div className="block md:hidden">
            <SidebarTrigger />
          </div>
          <Link to="/" className="flex items-center gap-2">
            <CheckSquare className="h-6 w-6 text-primary" />
            <span className="text-xl font-medium">TaskFlow</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewChange("list")}
              className={cn(
                "px-4 transition-all duration-300 hover:bg-secondary",
                currentView === "list" && "bg-secondary text-foreground"
              )}
            >
              <CheckSquare className="h-4 w-4 mr-2" />
              Tasks
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewChange("calendar")}
              className={cn(
                "px-4 transition-all duration-300 hover:bg-secondary",
                currentView === "calendar" && "bg-secondary text-foreground"
              )}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </Button>
            <Link to="/settings">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "px-4 transition-all duration-300 hover:bg-secondary",
                  isActive("/settings") && "bg-secondary text-foreground"
                )}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button
            className="hidden md:flex animate-in slide-in-right duration-300 gap-2 shadow-subtle"
            size="sm"
            onClick={onAddTask}
          >
            <Plus className="h-4 w-4" /> Add Task
          </Button>
          <Button
            className="md:hidden w-9 h-9 p-0 rounded-full"
            size="icon"
            onClick={onAddTask}
          >
            <Plus className="h-4 w-4" />
          </Button>

          {/* Notification Button */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifications"
            className="relative w-9 h-9 rounded-full"
          >
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground animate-in scale-in">
                {notifications}
              </span>
            )}
          </Button>

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="User menu"
                className="overflow-hidden rounded-full transition-shadow hover:shadow-md"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 overflow-hidden rounded-xl p-0 shadow-glass"
            >
              <DropdownMenuLabel className="px-4 py-3 font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Jane Doe</p>
                  <p className="text-xs text-muted-foreground">
                    jane.doe@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-accent py-2 transition-colors">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-accent py-2 transition-colors">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-accent py-2 transition-colors">
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile menu button (for smaller screens) */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Menu"
            className="md:hidden rounded-full"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
