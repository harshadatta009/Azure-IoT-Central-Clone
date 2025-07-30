import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search,
  FileText,
  Download,
  Filter,
  Eye,
  Shield,
  Settings,
  User,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { useState } from "react";

const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState("all");
  const [selectedUser, setSelectedUser] = useState("all");

  // Mock audit log data
  const auditLogs = [
    {
      id: "audit-1",
      timestamp: "2024-01-15T10:45:23Z",
      user: "admin@azure.com",
      action: "device_configuration_changed",
      resource: "Temperature Sensor A",
      resourceType: "device",
      details: "Updated temperature threshold from 25°C to 30°C",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      severity: "medium",
      category: "configuration"
    },
    {
      id: "audit-2",
      timestamp: "2024-01-15T10:30:15Z",
      user: "john.smith@azure.com",
      action: "user_login",
      resource: "Dashboard",
      resourceType: "application",
      details: "User successfully logged in",
      ipAddress: "192.168.1.105",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      severity: "low",
      category: "authentication"
    },
    {
      id: "audit-3",
      timestamp: "2024-01-15T10:15:42Z",
      user: "system",
      action: "rule_triggered",
      resource: "High Temperature Alert",
      resourceType: "rule",
      details: "Temperature threshold exceeded: 32.5°C in Building A",
      ipAddress: "internal",
      userAgent: "IoT Central System",
      severity: "high",
      category: "alert"
    },
    {
      id: "audit-4",
      timestamp: "2024-01-15T09:58:30Z",
      user: "sarah.j@azure.com",
      action: "data_export_initiated",
      resource: "Monthly Report",
      resourceType: "export",
      details: "Initiated export of telemetry data for January 2024",
      ipAddress: "192.168.1.110",
      userAgent: "Mozilla/5.0 (MacOS)",
      severity: "medium",
      category: "data_access"
    },
    {
      id: "audit-5",
      timestamp: "2024-01-15T09:45:17Z",
      user: "admin@azure.com",
      action: "device_template_created",
      resource: "Smart Door Lock Template",
      resourceType: "template",
      details: "Created new device template with access control capabilities",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      severity: "medium",
      category: "configuration"
    },
    {
      id: "audit-6",
      timestamp: "2024-01-15T09:30:55Z",
      user: "system",
      action: "device_offline_detected",
      resource: "HVAC Controller B",
      resourceType: "device",
      details: "Device went offline - last heartbeat: 09:25:30Z",
      ipAddress: "internal",
      userAgent: "IoT Central System",
      severity: "high",
      category: "device_status"
    },
    {
      id: "audit-7",
      timestamp: "2024-01-15T09:15:08Z",
      user: "maintenance@azure.com",
      action: "job_executed",
      resource: "Firmware Update Job",
      resourceType: "job",
      details: "Firmware update completed on 8 devices successfully",
      ipAddress: "192.168.1.120",
      userAgent: "Mozilla/5.0 (Linux)",
      severity: "low",
      category: "maintenance"
    },
    {
      id: "audit-8",
      timestamp: "2024-01-15T09:00:22Z",
      user: "security@azure.com",
      action: "permission_modified",
      resource: "john.smith@azure.com",
      resourceType: "user",
      details: "Updated user permissions: added device configuration access",
      ipAddress: "192.168.1.115",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      severity: "medium",
      category: "security"
    }
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAction = selectedAction === "all" || log.category === selectedAction;
    const matchesUser = selectedUser === "all" || log.user === selectedUser;

    return matchesSearch && matchesAction && matchesUser;
  });

  const getActionIcon = (action: string) => {
    if (action.includes('login') || action.includes('auth')) {
      return <Shield className="w-4 h-4 text-primary" />;
    } else if (action.includes('configuration') || action.includes('template')) {
      return <Settings className="w-4 h-4 text-blue-500" />;
    } else if (action.includes('export') || action.includes('data')) {
      return <FileText className="w-4 h-4 text-green-500" />;
    } else if (action.includes('alert') || action.includes('rule')) {
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    } else if (action.includes('user') || action.includes('permission')) {
      return <User className="w-4 h-4 text-purple-500" />;
    }
    return <Eye className="w-4 h-4 text-muted-foreground" />;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-device-error';
      case 'medium':
        return 'bg-device-warning';
      case 'low':
        return 'bg-device-online';
      default:
        return 'bg-muted';
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(dateString));
  };

  const uniqueUsers = [...new Set(auditLogs.map(log => log.user))];
  const categories = [...new Set(auditLogs.map(log => log.category))];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Audit Logs</h1>
            <p className="text-muted-foreground">Track system activities and user actions</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Logs
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-80"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Select value={selectedAction} onValueChange={setSelectedAction}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.replace('_', ' ').toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Users" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {uniqueUsers.map(user => (
                    <SelectItem key={user} value={user}>
                      {user}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold">{auditLogs.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-device-error rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">High Severity</p>
                <p className="text-2xl font-bold text-device-error">
                  {auditLogs.filter(log => log.severity === 'high').length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{uniqueUsers.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-device-online" />
              <div>
                <p className="text-sm text-muted-foreground">Today's Events</p>
                <p className="text-2xl font-bold text-device-online">
                  {auditLogs.filter(log =>
                    new Date(log.timestamp).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Audit Logs Table */}
        <Card className="overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">
              {filteredLogs.length} Log Entr{filteredLogs.length !== 1 ? 'ies' : 'y'}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <div className="space-y-1 p-4">
              {filteredLogs.map((log) => (
                <div key={log.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      {getActionIcon(log.action)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-foreground">
                            {log.action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </h4>
                          <Badge className={getSeverityColor(log.severity)}>
                            {log.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">
                            {log.category.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{log.details}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Resource: <span className="font-medium">{log.resource}</span></span>
                          <span>User: <span className="font-medium">{log.user}</span></span>
                          <span>IP: <span className="font-medium">{log.ipAddress}</span></span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatDateTime(log.timestamp)}</p>
                      <p className="text-xs text-muted-foreground">{log.resourceType}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AuditLogs;