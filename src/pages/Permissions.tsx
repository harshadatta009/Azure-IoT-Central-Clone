import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Shield,
  Users,
  Key,
  Search,
  MoreHorizontal,
  UserCheck,
  Settings,
  Lock,
  Eye
} from "lucide-react";
import { useState } from "react";

const Permissions = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock users data
  const users = [
    {
      id: "user-1",
      name: "Admin User",
      email: "admin@azure.com",
      role: "Administrator",
      status: "active",
      lastLogin: "2024-01-15T10:45:00Z",
      permissions: {
        deviceRead: true,
        deviceWrite: true,
        deviceDelete: true,
        rulesRead: true,
        rulesWrite: true,
        userManagement: true,
        systemSettings: true,
        dataExport: true
      }
    },
    {
      id: "user-2",
      name: "John Smith",
      email: "john.smith@azure.com",
      role: "Device Operator",
      status: "active",
      lastLogin: "2024-01-15T09:30:00Z",
      permissions: {
        deviceRead: true,
        deviceWrite: true,
        deviceDelete: false,
        rulesRead: true,
        rulesWrite: false,
        userManagement: false,
        systemSettings: false,
        dataExport: true
      }
    },
    {
      id: "user-3",
      name: "Sarah Johnson",
      email: "sarah.j@azure.com",
      role: "Viewer",
      status: "active",
      lastLogin: "2024-01-14T16:20:00Z",
      permissions: {
        deviceRead: true,
        deviceWrite: false,
        deviceDelete: false,
        rulesRead: true,
        rulesWrite: false,
        userManagement: false,
        systemSettings: false,
        dataExport: false
      }
    },
    {
      id: "user-4",
      name: "Mike Wilson",
      email: "mike.w@azure.com",
      role: "Maintenance",
      status: "inactive",
      lastLogin: "2024-01-10T14:15:00Z",
      permissions: {
        deviceRead: true,
        deviceWrite: true,
        deviceDelete: false,
        rulesRead: false,
        rulesWrite: false,
        userManagement: false,
        systemSettings: false,
        dataExport: false
      }
    }
  ];

  // Mock roles data
  const roles = [
    {
      id: "role-1",
      name: "Administrator",
      description: "Full access to all system features and settings",
      userCount: 1,
      permissions: [
        "Device Management",
        "User Management",
        "System Settings",
        "Data Export",
        "Rule Management",
        "Security Settings"
      ]
    },
    {
      id: "role-2",
      name: "Device Operator",
      description: "Can manage devices and view analytics",
      userCount: 1,
      permissions: [
        "Device Management",
        "View Analytics",
        "Data Export",
        "View Rules"
      ]
    },
    {
      id: "role-3",
      name: "Viewer",
      description: "Read-only access to dashboard and reports",
      userCount: 1,
      permissions: [
        "View Devices",
        "View Analytics",
        "View Rules"
      ]
    },
    {
      id: "role-4",
      name: "Maintenance",
      description: "Access to device maintenance and diagnostics",
      userCount: 1,
      permissions: [
        "Device Management",
        "View Diagnostics",
        "Job Management"
      ]
    }
  ];

  const [userPermissions, setUserPermissions] = useState(
    users.reduce((acc, user) => {
      acc[user.id] = user.permissions;
      return acc;
    }, {} as Record<string, any>)
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserPermission = (userId: string, permission: string) => {
    setUserPermissions(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [permission]: !prev[userId][permission]
      }
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-device-online';
      case 'inactive':
        return 'bg-device-offline';
      default:
        return 'bg-muted';
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const permissionLabels = {
    deviceRead: "View Devices",
    deviceWrite: "Manage Devices",
    deviceDelete: "Delete Devices",
    rulesRead: "View Rules",
    rulesWrite: "Manage Rules",
    userManagement: "User Management",
    systemSettings: "System Settings",
    dataExport: "Data Export"
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Permissions</h1>
            <p className="text-muted-foreground">Manage user access and role-based permissions</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Role
            </Button>
            <Button size="sm">
              <Users className="w-4 h-4 mr-2" />
              Invite User
            </Button>
          </div>
        </div>

        {/* Search */}
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users or roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-device-online rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-device-online">
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Roles</p>
                <p className="text-2xl font-bold">{roles.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Key className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Permissions</p>
                <p className="text-2xl font-bold">{Object.keys(permissionLabels).length}</p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Roles</span>
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <h2 className="text-lg font-semibold">
              {filteredUsers.length} User{filteredUsers.length !== 1 ? 's' : ''}
            </h2>

            {filteredUsers.map((user) => (
              <Card key={user.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-foreground">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{user.name}</h3>
                      <p className="text-muted-foreground text-sm">{user.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline">{user.role}</Badge>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Last login:</p>
                    <p className="text-sm font-medium">{formatDateTime(user.lastLogin)}</p>
                    <Button variant="ghost" size="sm" className="mt-2">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">Permissions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {Object.entries(permissionLabels).map(([key, label]) => (
                      <div key={key} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{label}</span>
                        <Switch
                          checked={userPermissions[user.id]?.[key] || false}
                          onCheckedChange={() => toggleUserPermission(user.id, key)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Roles Tab */}
          <TabsContent value="roles" className="space-y-4">
            <h2 className="text-lg font-semibold">
              {filteredRoles.length} Role{filteredRoles.length !== 1 ? 's' : ''}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredRoles.map((role) => (
                <Card key={role.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{role.name}</h3>
                        <p className="text-muted-foreground text-sm">{role.description}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <UserCheck className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {role.userCount} user{role.userCount !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-muted-foreground">Included Permissions</h4>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permission, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Permissions;