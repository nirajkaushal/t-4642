
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Bell, Database, Moon, Shield, User } from "lucide-react";

export default function Settings() {
  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Settings 1</h1>
      <p className="text-muted-foreground mb-6">Manage your preferences and account settings</p>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <User className="h-5 w-5" /> Account
          </h2>
          <Separator className="mb-4" />
          
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Profile Information</h3>
                <p className="text-sm text-muted-foreground">
                  Update your name and personal details
                </p>
              </div>
              <Button variant="outline">Edit</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Address</h3>
                <p className="text-sm text-muted-foreground">
                  Change your email address
                </p>
              </div>
              <Button variant="outline">Change</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Password</h3>
                <p className="text-sm text-muted-foreground">
                  Update your password
                </p>
              </div>
              <Button variant="outline">Update</Button>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <Database className="h-5 w-5" /> Data Management
          </h2>
          <Separator className="mb-4" />
          
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Export Tasks</h3>
                <p className="text-sm text-muted-foreground">
                  Export all your tasks and categories as JSON
                </p>
              </div>
              <Button variant="outline">Export</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Import Tasks</h3>
                <p className="text-sm text-muted-foreground">
                  Import tasks from a JSON file
                </p>
              </div>
              <Button variant="outline">Import</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-destructive">Delete All Data</h3>
                <p className="text-sm text-muted-foreground">
                  Permanently delete all your tasks and categories
                </p>
              </div>
              <Button variant="destructive">Delete</Button>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <Bell className="h-5 w-5" /> Notifications
          </h2>
          <Separator className="mb-4" />
          
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications for upcoming tasks
                </p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Push Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications for due tasks
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Daily Digest</h3>
                <p className="text-sm text-muted-foreground">
                  Receive a daily summary of your tasks
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <Moon className="h-5 w-5" /> Appearance
          </h2>
          <Separator className="mb-4" />
          
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Dark Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark theme
                </p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Compact View</h3>
                <p className="text-sm text-muted-foreground">
                  Show more tasks in a single view
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5" /> Privacy & Security
          </h2>
          <Separator className="mb-4" />
          
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant="outline">Enable</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Session Management</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your active sessions
                </p>
              </div>
              <Button variant="outline">View</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
