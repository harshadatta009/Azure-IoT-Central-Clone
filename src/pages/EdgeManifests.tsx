import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Server, 
  Download, 
  Upload,
  Search,
  MoreHorizontal,
  Cloud,
  HardDrive,
  Cpu,
  Activity
} from "lucide-react";
import { useState } from "react";

const EdgeManifests = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock edge manifests data
  const edgeManifests = [
    {
      id: "manifest-1",
      name: "Industrial Gateway Manifest",
      description: "Edge computing configuration for industrial sensors and controllers",
      version: "2.1.0",
      modules: [
        { name: "DataProcessor", version: "1.5.0", status: "running" },
        { name: "SecurityModule", version: "2.0.1", status: "running" },
        { name: "LocalStorage", version: "1.2.0", status: "running" }
      ],
      deployedDevices: 6,
      status: "deployed",
      lastUpdated: "2024-01-12T14:30:00Z",
      size: "156 MB",
      author: "Edge Team",
      runtime: "Azure IoT Edge",
      deployment: {
        successful: 6,
        failed: 0,
        pending: 0
      }
    },
    {
      id: "manifest-2",
      name: "Smart Building Edge Config",
      description: "Edge manifest for building automation and energy management",
      version: "1.8.3",
      modules: [
        { name: "HVACController", version: "1.3.0", status: "running" },
        { name: "EnergyOptimizer", version: "2.1.0", status: "running" },
        { name: "AlertProcessor", version: "1.0.5", status: "stopped" }
      ],
      deployedDevices: 12,
      status: "deploying",
      lastUpdated: "2024-01-15T09:15:00Z",
      size: "203 MB",
      author: "Building Systems",
      runtime: "Azure IoT Edge",
      deployment: {
        successful: 8,
        failed: 1,
        pending: 3
      }
    },
    {
      id: "manifest-3",
      name: "Security Gateway Manifest",
      description: "High-security edge configuration for critical infrastructure",
      version: "3.0.0-beta",
      modules: [
        { name: "SecurityAnalyzer", version: "3.0.0", status: "running" },
        { name: "EncryptionModule", version: "2.5.0", status: "running" },
        { name: "ThreatDetector", version: "1.8.0", status: "running" },
        { name: "AuditLogger", version: "2.2.0", status: "running" }
      ],
      deployedDevices: 3,
      status: "testing",
      lastUpdated: "2024-01-14T16:45:00Z",
      size: "298 MB",
      author: "Security Team",
      runtime: "Azure IoT Edge",
      deployment: {
        successful: 2,
        failed: 0,
        pending: 1
      }
    },
    {
      id: "manifest-4",
      name: "Environmental Monitoring Edge",
      description: "Lightweight edge configuration for environmental sensors",
      version: "1.4.2",
      modules: [
        { name: "SensorAggregator", version: "1.2.0", status: "running" },
        { name: "DataFilter", version: "1.1.0", status: "running" }
      ],
      deployedDevices: 15,
      status: "deployed",
      lastUpdated: "2024-01-10T11:20:00Z",
      size: "89 MB",
      author: "IoT Team",
      runtime: "Azure IoT Edge",
      deployment: {
        successful: 15,
        failed: 0,
        pending: 0
      }
    },
    {
      id: "manifest-5",
      name: "Manufacturing Edge Platform",
      description: "Edge configuration for manufacturing floor monitoring and control",
      version: "2.5.1",
      modules: [
        { name: "ProductionMonitor", version: "2.0.0", status: "error" },
        { name: "QualityAnalyzer", version: "1.8.0", status: "running" },
        { name: "MaintenancePredictor", version: "1.5.0", status: "running" },
        { name: "DataCollector", version: "2.1.0", status: "running" }
      ],
      deployedDevices: 0,
      status: "failed",
      lastUpdated: "2024-01-13T08:30:00Z",
      size: "342 MB",
      author: "Manufacturing Team",
      runtime: "Azure IoT Edge",
      deployment: {
        successful: 0,
        failed: 4,
        pending: 0
      }
    }
  ];

  const filteredManifests = edgeManifests.filter(manifest =>
    manifest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manifest.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed':
        return 'bg-device-online';
      case 'deploying':
        return 'bg-primary';
      case 'testing':
        return 'bg-device-warning';
      case 'failed':
        return 'bg-device-error';
      default:
        return 'bg-muted';
    }
  };

  const getModuleStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'text-device-online';
      case 'stopped':
        return 'text-device-warning';
      case 'error':
        return 'text-device-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const calculateDeploymentProgress = (deployment: any) => {
    const total = deployment.successful + deployment.failed + deployment.pending;
    return total > 0 ? (deployment.successful / total) * 100 : 0;
  };

  const statusCounts = {
    total: edgeManifests.length,
    deployed: edgeManifests.filter(m => m.status === 'deployed').length,
    deploying: edgeManifests.filter(m => m.status === 'deploying').length,
    failed: edgeManifests.filter(m => m.status === 'failed').length,
  };

  const totalDeployedDevices = edgeManifests.reduce((sum, manifest) => sum + manifest.deployedDevices, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Edge Manifests</h1>
            <p className="text-muted-foreground">Manage edge computing configurations and deployments</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Import Manifest
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Create Manifest
            </Button>
          </div>
        </div>

        {/* Search */}
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search edge manifests..."
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
              <Server className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Manifests</p>
                <p className="text-2xl font-bold">{statusCounts.total}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-device-online rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">Deployed</p>
                <p className="text-2xl font-bold text-device-online">{statusCounts.deployed}</p>
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
              <Cloud className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Edge Devices</p>
                <p className="text-2xl font-bold">{totalDeployedDevices}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Manifests List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            {filteredManifests.length} Manifest{filteredManifests.length !== 1 ? 's' : ''}
          </h2>
          
          {filteredManifests.map((manifest) => (
            <Card key={manifest.id} className="p-6 hover:shadow-elevated transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Server className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">{manifest.name}</h3>
                    <Badge className={getStatusColor(manifest.status)}>
                      {manifest.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4">{manifest.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-muted-foreground text-sm">Version:</span>
                      <p className="font-medium">{manifest.version}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm">Size:</span>
                      <p className="font-medium">{manifest.size}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm">Deployed Devices:</span>
                      <p className="font-medium">{manifest.deployedDevices}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm">Author:</span>
                      <p className="font-medium">{manifest.author}</p>
                    </div>
                  </div>

                  {/* Modules */}
                  <div className="mb-4">
                    <span className="text-sm text-muted-foreground mb-2 block">Modules:</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {manifest.modules.map((module, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div className="flex items-center space-x-2">
                            <Cpu className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm font-medium">{module.name}</span>
                            <span className="text-xs text-muted-foreground">v{module.version}</span>
                          </div>
                          <Badge variant="outline" className={`text-xs ${getModuleStatusColor(module.status)}`}>
                            {module.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deployment Progress */}
                  {manifest.status === 'deploying' && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Deployment Progress</span>
                        <span className="text-sm font-medium">
                          {manifest.deployment.successful}/{manifest.deployment.successful + manifest.deployment.failed + manifest.deployment.pending}
                        </span>
                      </div>
                      <Progress value={calculateDeploymentProgress(manifest.deployment)} className="h-2" />
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span className="text-device-online">✓ {manifest.deployment.successful} successful</span>
                        <span className="text-device-error">✗ {manifest.deployment.failed} failed</span>
                        <span className="text-device-warning">⏳ {manifest.deployment.pending} pending</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Activity className="w-3 h-3" />
                      <span>Runtime: {manifest.runtime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <HardDrive className="w-3 h-3" />
                      <span>Last updated: {formatDateTime(manifest.lastUpdated)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
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

export default EdgeManifests;