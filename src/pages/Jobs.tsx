import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Play, 
  Pause, 
  Square, 
  Clock, 
  CheckCircle, 
  XCircle,
  Search,
  MoreHorizontal,
  Zap
} from "lucide-react";
import { useState } from "react";

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock jobs data
  const jobs = [
    {
      id: "job-1",
      name: "Firmware Update - Building A",
      description: "Update firmware for all temperature sensors in Building A",
      type: "firmware_update",
      status: "running",
      progress: 65,
      targetDevices: 8,
      completedDevices: 5,
      failedDevices: 0,
      startTime: "2024-01-15T10:30:00Z",
      estimatedCompletion: "2024-01-15T11:45:00Z",
      createdBy: "System Admin"
    },
    {
      id: "job-2",
      name: "Configuration Sync",
      description: "Synchronize configuration across HVAC controllers",
      type: "configuration",
      status: "completed",
      progress: 100,
      targetDevices: 4,
      completedDevices: 4,
      failedDevices: 0,
      startTime: "2024-01-15T09:00:00Z",
      estimatedCompletion: "2024-01-15T09:30:00Z",
      createdBy: "Device Manager"
    },
    {
      id: "job-3",
      name: "Diagnostic Scan",
      description: "Run comprehensive diagnostics on all environmental monitors",
      type: "diagnostic",
      status: "failed",
      progress: 45,
      targetDevices: 6,
      completedDevices: 2,
      failedDevices: 1,
      startTime: "2024-01-15T08:00:00Z",
      estimatedCompletion: "2024-01-15T08:30:00Z",
      createdBy: "Maintenance Team"
    },
    {
      id: "job-4",
      name: "Security Patch Deployment",
      description: "Deploy security patches to all connected devices",
      type: "security_update",
      status: "scheduled",
      progress: 0,
      targetDevices: 12,
      completedDevices: 0,
      failedDevices: 0,
      startTime: "2024-01-15T14:00:00Z",
      estimatedCompletion: "2024-01-15T16:00:00Z",
      createdBy: "Security Team"
    },
    {
      id: "job-5",
      name: "Data Export - Monthly Report",
      description: "Export telemetry data for monthly performance report",
      type: "data_export",
      status: "pending",
      progress: 0,
      targetDevices: 12,
      completedDevices: 0,
      failedDevices: 0,
      startTime: "2024-01-15T18:00:00Z",
      estimatedCompletion: "2024-01-15T18:30:00Z",
      createdBy: "Analytics Team"
    }
  ];

  const filteredJobs = jobs.filter(job =>
    job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Play className="w-4 h-4 text-primary" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-device-online" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-device-error" />;
      case 'scheduled':
        return <Clock className="w-4 h-4 text-device-warning" />;
      case 'pending':
        return <Pause className="w-4 h-4 text-muted-foreground" />;
      default:
        return <Square className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-primary';
      case 'completed':
        return 'bg-device-online';
      case 'failed':
        return 'bg-device-error';
      case 'scheduled':
        return 'bg-device-warning';
      case 'pending':
        return 'bg-muted-foreground';
      default:
        return 'bg-muted';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'firmware_update':
      case 'security_update':
        return <Zap className="w-4 h-4 text-primary" />;
      default:
        return <Play className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const statusCounts = {
    total: jobs.length,
    running: jobs.filter(j => j.status === 'running').length,
    completed: jobs.filter(j => j.status === 'completed').length,
    failed: jobs.filter(j => j.status === 'failed').length,
    scheduled: jobs.filter(j => j.status === 'scheduled').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Jobs</h1>
            <p className="text-muted-foreground">Manage device operations and bulk actions</p>
          </div>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Create Job
          </Button>
        </div>

        {/* Search */}
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Play className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Jobs</p>
                <p className="text-2xl font-bold">{statusCounts.total}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">Running</p>
                <p className="text-2xl font-bold text-primary">{statusCounts.running}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-device-online rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-device-online">{statusCounts.completed}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-device-error rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold text-device-error">{statusCounts.failed}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-device-warning rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold text-device-warning">{statusCounts.scheduled}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''}
          </h2>
          
          {filteredJobs.map((job) => (
            <Card key={job.id} className="p-6 hover:shadow-elevated transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getTypeIcon(job.type)}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{job.name}</h3>
                    <p className="text-muted-foreground text-sm">{job.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(job.status)}
                    <Badge className={getStatusColor(job.status)}>
                      {job.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Progress Bar for Running/Failed Jobs */}
              {(job.status === 'running' || job.status === 'failed') && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium">{job.progress}%</span>
                  </div>
                  <Progress value={job.progress} className="h-2" />
                </div>
              )}

              {/* Job Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Target Devices:</span>
                  <span className="ml-2 font-medium">{job.targetDevices}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Completed:</span>
                  <span className="ml-2 font-medium text-device-online">{job.completedDevices}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Failed:</span>
                  <span className="ml-2 font-medium text-device-error">{job.failedDevices}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Created by:</span>
                  <span className="ml-2 font-medium">{job.createdBy}</span>
                </div>
              </div>

              {/* Timing Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <span>Started:</span>
                  <span className="ml-2">{formatDateTime(job.startTime)}</span>
                </div>
                <div>
                  <span>Est. Completion:</span>
                  <span className="ml-2">{formatDateTime(job.estimatedCompletion)}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Jobs;