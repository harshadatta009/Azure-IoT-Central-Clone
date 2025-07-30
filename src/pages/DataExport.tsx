import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Download, 
  Database, 
  Calendar,
  Clock,
  FileText,
  Settings,
  MoreHorizontal,
  Play,
  Pause
} from "lucide-react";
import { useState } from "react";

const DataExport = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data export configurations
  const exports = [
    {
      id: "export-1",
      name: "Daily Telemetry Export",
      description: "Export all device telemetry data daily to Azure Blob Storage",
      destination: "Azure Blob Storage",
      format: "JSON",
      schedule: "Daily at 2:00 AM",
      status: "active",
      lastRun: "2024-01-15T02:00:00Z",
      nextRun: "2024-01-16T02:00:00Z",
      recordsExported: 45672,
      dataTypes: ["Temperature", "Humidity", "Pressure"],
      devices: "All Environmental Sensors",
      retention: "90 days"
    },
    {
      id: "export-2",
      name: "Energy Usage Report",
      description: "Weekly energy consumption data for cost analysis",
      destination: "Power BI",
      format: "CSV",
      schedule: "Weekly on Monday",
      status: "active",
      lastRun: "2024-01-14T08:00:00Z",
      nextRun: "2024-01-21T08:00:00Z",
      recordsExported: 1234,
      dataTypes: ["Energy Usage", "Power Consumption"],
      devices: "HVAC Controllers",
      retention: "1 year"
    },
    {
      id: "export-3",
      name: "Security Logs Export",
      description: "Export security and access logs for compliance",
      destination: "SIEM System",
      format: "JSON",
      schedule: "Real-time",
      status: "active",
      lastRun: "2024-01-15T10:45:00Z",
      nextRun: "Continuous",
      recordsExported: 892,
      dataTypes: ["Access Logs", "Tamper Alerts", "Status Changes"],
      devices: "Security Devices",
      retention: "7 years"
    },
    {
      id: "export-4",
      name: "Monthly Analytics Export",
      description: "Comprehensive monthly report for stakeholders",
      destination: "SharePoint",
      format: "Excel",
      schedule: "Monthly on 1st",
      status: "paused",
      lastRun: "2024-01-01T06:00:00Z",
      nextRun: "2024-02-01T06:00:00Z",
      recordsExported: 156789,
      dataTypes: ["All Telemetry", "Device Status", "Alerts"],
      devices: "All Devices",
      retention: "Indefinite"
    },
    {
      id: "export-5",
      name: "Maintenance Data Export",
      description: "Export device health and maintenance data",
      destination: "External API",
      format: "XML",
      schedule: "Every 6 hours",
      status: "error",
      lastRun: "2024-01-15T06:00:00Z",
      nextRun: "2024-01-15T12:00:00Z",
      recordsExported: 0,
      dataTypes: ["Device Health", "Diagnostic Data", "Error Logs"],
      devices: "Industrial Equipment",
      retention: "5 years"
    }
  ];

  const filteredExports = exports.filter(exportConfig =>
    exportConfig.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exportConfig.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-device-online';
      case 'paused':
        return 'bg-device-warning';
      case 'error':
        return 'bg-device-error';
      default:
        return 'bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play className="w-4 h-4 text-device-online" />;
      case 'paused':
        return <Pause className="w-4 h-4 text-device-warning" />;
      case 'error':
        return <Settings className="w-4 h-4 text-device-error" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const formatDateTime = (dateString: string) => {
    if (dateString === "Continuous") return dateString;
    return new Date(dateString).toLocaleString();
  };

  const statusCounts = {
    total: exports.length,
    active: exports.filter(e => e.status === 'active').length,
    paused: exports.filter(e => e.status === 'paused').length,
    error: exports.filter(e => e.status === 'error').length,
  };

  const totalRecords = exports.reduce((sum, exp) => sum + exp.recordsExported, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Data Export</h1>
            <p className="text-muted-foreground">Configure and manage data export destinations</p>
          </div>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Export
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search exports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-80"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Destinations</SelectItem>
                  <SelectItem value="azure">Azure Blob Storage</SelectItem>
                  <SelectItem value="powerbi">Power BI</SelectItem>
                  <SelectItem value="sharepoint">SharePoint</SelectItem>
                  <SelectItem value="api">External API</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Exports</p>
                <p className="text-2xl font-bold">{statusCounts.total}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-device-online rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-device-online">{statusCounts.active}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-device-error rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">Errors</p>
                <p className="text-2xl font-bold text-device-error">{statusCounts.error}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Records Exported</p>
                <p className="text-2xl font-bold">{totalRecords.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Export Configurations */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            {filteredExports.length} Export Configuration{filteredExports.length !== 1 ? 's' : ''}
          </h2>
          
          {filteredExports.map((exportConfig) => (
            <Card key={exportConfig.id} className="p-6 hover:shadow-elevated transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(exportConfig.status)}
                    <h3 className="text-lg font-semibold text-foreground">{exportConfig.name}</h3>
                    <Badge className={getStatusColor(exportConfig.status)}>
                      {exportConfig.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4">{exportConfig.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-muted-foreground text-sm">Destination:</span>
                      <p className="font-medium">{exportConfig.destination}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm">Format:</span>
                      <p className="font-medium">{exportConfig.format}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm">Schedule:</span>
                      <p className="font-medium">{exportConfig.schedule}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm">Records:</span>
                      <p className="font-medium">{exportConfig.recordsExported.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-muted-foreground text-sm">Data Types:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {exportConfig.dataTypes.map((type, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm">Target Devices:</span>
                      <p className="font-medium text-sm">{exportConfig.devices}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>Last run: {formatDateTime(exportConfig.lastRun)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Next run: {formatDateTime(exportConfig.nextRun)}</span>
                    </div>
                    <div>
                      <span>Retention: {exportConfig.retention}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Now
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DataExport;