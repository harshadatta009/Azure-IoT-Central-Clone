import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Shield,
  Moon,
  Sun,
  Monitor
} from "lucide-react";

interface UserMenuProps {
  user?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
}

const UserMenu = ({ user = {
  name: "Admin User",
  email: "admin@azure.com",
  role: "Administrator"
} }: UserMenuProps) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    // Here you would implement theme switching logic
    console.log('Theme changed to:', newTheme);
  };

  const handleLogout = () => {
    // Implement logout logic
    console.log('User logged out');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 p-0 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0"
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center overflow-hidden">
              <span className="text-sm font-medium text-primary-foreground select-none">
                {getUserInitials(user.name)}
              </span>
            </div>
          )}
        </Button>

      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 p-0" align="end" forceMount>
        {/* User Info Header */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
              <span className="text-lg font-medium text-primary-foreground">
                {getUserInitials(user.name)}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
              <Badge variant="outline" className="mt-1 text-xs">
                {user.role}
              </Badge>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div className="p-2">
          <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-2">
            ACCOUNT
          </DropdownMenuLabel>

          <DropdownMenuItem className="cursor-pointer">
            <User className="w-4 h-4 mr-3" />
            <span>Profile Settings</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <Bell className="w-4 h-4 mr-3" />
            <span>Notifications</span>
            <Badge variant="destructive" className="ml-auto text-xs">
              3
            </Badge>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <Shield className="w-4 h-4 mr-3" />
            <span>Security</span>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        {/* Theme Section */}
        <div className="p-2">
          <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-2">
            APPEARANCE
          </DropdownMenuLabel>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleThemeChange('light')}
          >
            <Sun className="w-4 h-4 mr-3" />
            <span>Light Mode</span>
            {theme === 'light' && <Badge variant="outline" className="ml-auto text-xs">Active</Badge>}
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleThemeChange('dark')}
          >
            <Moon className="w-4 h-4 mr-3" />
            <span>Dark Mode</span>
            {theme === 'dark' && <Badge variant="outline" className="ml-auto text-xs">Active</Badge>}
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleThemeChange('system')}
          >
            <Monitor className="w-4 h-4 mr-3" />
            <span>System</span>
            {theme === 'system' && <Badge variant="outline" className="ml-auto text-xs">Active</Badge>}
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        {/* App Section */}
        <div className="p-2">
          <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-2">
            APPLICATION
          </DropdownMenuLabel>

          <DropdownMenuItem className="cursor-pointer">
            <Settings className="w-4 h-4 mr-3" />
            <span>App Settings</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <HelpCircle className="w-4 h-4 mr-3" />
            <span>Help & Support</span>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        {/* Logout */}
        <div className="p-2">
          <DropdownMenuItem
            className="cursor-pointer text-destructive focus:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-3" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;