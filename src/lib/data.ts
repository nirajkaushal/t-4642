
import { Category, Task } from "./types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Work",
    color: "#3B82F6",
    icon: "briefcase",
  },
  {
    id: "2",
    name: "Personal",
    color: "#10B981",
    icon: "user",
  },
  {
    id: "3",
    name: "Health",
    color: "#EF4444",
    icon: "heart",
  },
  {
    id: "4",
    name: "Finance",
    color: "#F59E0B",
    icon: "dollar-sign",
  },
  {
    id: "5",
    name: "Learning",
    color: "#8B5CF6",
    icon: "book",
  },
  {
    id: "6",
    name: "Home",
    color: "#EC4899",
    icon: "home",
  },
];

export const tasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Draft the proposal for the new client project",
    completed: false,
    dueDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
    priority: "high",
    categoryId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Grocery shopping",
    description: "Buy fruits, vegetables, and other essentials",
    completed: false,
    dueDate: new Date(Date.now() + 86400000), // 1 day from now
    priority: "medium",
    categoryId: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Morning workout",
    description: "30 minutes cardio and 15 minutes strength training",
    completed: true,
    dueDate: new Date(),
    priority: "low",
    categoryId: "3",
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "Pay utility bills",
    description: "Electricity, water, and internet bills",
    completed: false,
    dueDate: new Date(Date.now() + 86400000 * 5), // 5 days from now
    priority: "high",
    categoryId: "4",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    title: "Study React hooks",
    description: "Learn about useEffect, useCallback, and useMemo",
    completed: false,
    dueDate: new Date(Date.now() + 86400000 * 3), // 3 days from now
    priority: "medium",
    categoryId: "5",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    title: "Fix kitchen sink",
    description: "Call the plumber if needed",
    completed: false,
    dueDate: new Date(Date.now() + 86400000 * 1), // 1 day from now
    priority: "low",
    categoryId: "6",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "7",
    title: "Team meeting",
    description: "Weekly team sync-up",
    completed: false,
    dueDate: new Date(Date.now() + 86400000 * 1), // 1 day from now
    priority: "medium",
    categoryId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "8",
    title: "Dentist appointment",
    description: "Regular checkup",
    completed: false,
    dueDate: new Date(Date.now() + 86400000 * 7), // 7 days from now
    priority: "high",
    categoryId: "3",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
