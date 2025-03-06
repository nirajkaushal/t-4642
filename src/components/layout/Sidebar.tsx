
import { cn } from "@/lib/utils";
import { Category } from "@/lib/types";
import { categories } from "@/lib/data";
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Book,
  Briefcase,
  DollarSign,
  Heart,
  Home,
  Inbox,
  Plus,
  Tag,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SidebarProps {
  onCategorySelect: (categoryId: string | null) => void;
  selectedCategory: string | null;
}

const getIconForCategory = (category: Category) => {
  switch (category.icon) {
    case "briefcase":
      return <Briefcase className="h-4 w-4" style={{ color: category.color }} />;
    case "user":
      return <User className="h-4 w-4" style={{ color: category.color }} />;
    case "heart":
      return <Heart className="h-4 w-4" style={{ color: category.color }} />;
    case "dollar-sign":
      return <DollarSign className="h-4 w-4" style={{ color: category.color }} />;
    case "book":
      return <Book className="h-4 w-4" style={{ color: category.color }} />;
    case "home":
      return <Home className="h-4 w-4" style={{ color: category.color }} />;
    default:
      return <Tag className="h-4 w-4" style={{ color: category.color }} />;
  }
};

export function Sidebar({ onCategorySelect, selectedCategory }: SidebarProps) {
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  return (
    <SidebarContainer className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Task Views</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  active={!selectedCategory}
                  onClick={() => onCategorySelect(null)}
                >
                  <Inbox className="h-4 w-4 text-primary" />
                  <span>All Tasks</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <div className="flex items-center justify-between mb-2">
            <SidebarGroupLabel>Categories</SidebarGroupLabel>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-5 w-5 rounded-full hover:bg-secondary"
              onClick={() => setIsAddingCategory(!isAddingCategory)}
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.id}>
                  <SidebarMenuButton
                    active={selectedCategory === category.id}
                    onClick={() => onCategorySelect(category.id)}
                  >
                    {getIconForCategory(category)}
                    <span>{category.name}</span>
                    <div 
                      className="ml-auto h-2 w-2 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarContainer>
  );
}
