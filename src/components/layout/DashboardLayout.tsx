import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import GlobalSearch from "@/components/ui/search";
import UserMenu from "@/components/ui/user-menu";
import { 
  Menu, 
  X, 
  Home, 
  Layers, 
  AlertTriangle, 
  Settings, 
  BarChart3,
  Cpu,
  Bell,
  Users,
  FileText,
  Cloud,
  Play,
  Download,
  Shield,
  FileSearch,
  Server
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', icon: Home, href: '/', current: location.pathname === '/' },
    { name: 'Devices', icon: Cpu, href: '/devices', current: location.pathname === '/devices' },
    { name: 'Device Groups', icon: Users, href: '/device-groups', current: location.pathname === '/device-groups' },
    { name: 'Device Templates', icon: FileText, href: '/device-templates', current: location.pathname === '/device-templates' },
    { name: 'Edge Manifests', icon: Server, href: '/edge-manifests', current: location.pathname === '/edge-manifests' },
    { name: 'Analytics', icon: BarChart3, href: '/analytics', current: location.pathname === '/analytics' },
    { name: 'Jobs', icon: Play, href: '/jobs', current: location.pathname === '/jobs' },
    { name: 'Rules', icon: Layers, href: '/rules', current: location.pathname === '/rules' },
    { name: 'Data Export', icon: Download, href: '/data-export', current: location.pathname === '/data-export' },
    { name: 'Audit Logs', icon: FileSearch, href: '/audit-logs', current: location.pathname === '/audit-logs' },
    { name: 'Permissions', icon: Shield, href: '/permissions', current: location.pathname === '/permissions' },
    { name: 'Settings', icon: Settings, href: '/settings', current: location.pathname === '/settings' },
  ];

  return (
    <div className="h-screen flex bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Cpu className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-semibold text-foreground">IoT Central</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                item.current 
                  ? "bg-primary text-primary-foreground shadow-card" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="w-4 h-4 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h2 className="text-xl font-semibold text-foreground hidden sm:block">
              {navigation.find(item => item.current)?.name || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <GlobalSearch className="hidden md:block w-80" />
            
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-destructive-foreground rounded-full"></span>
              </span>
            </Button>
            
            <UserMenu />
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;