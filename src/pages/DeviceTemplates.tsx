import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  FileText, 
  Cpu, 
  MoreHorizontal,
  Search,
  Download,
  Upload
} from "lucide-react";
import { useState } from "react";

const DeviceTemplates = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock device templates data
  const deviceTemplates = [
    {
      id: "template-1",
      name: "Environmental Sensor Template",
      description: "Template for temperature, humidity, and pressure sensors",
      version: "1.2.0",
      deviceCount: 15,
      capabilities: ["Temperature", "Humidity", "Pressure", "Battery Level"],
      lastModified: "2 days ago",
      status: "published",
      author: "Admin User"
    },
    {
      id: "template-2",
      name: "HVAC Controller Template",
      description: "Smart thermostat and climate control systems",
      version: "2.1.0",
      deviceCount: 8,
      capabilities: ["Temperature Control", "Fan Speed", "Mode Selection", "Energy Usage"],
      lastModified: "1 week ago",
      status: "published",
      author: "System Engineer"
    },
    {
      id: "template-3",
      name: "Smart Door Lock Template",
      description: "Electronic door locks with access control",
      version: "1.0.0",
      deviceCount: 0,
      capabilities: ["Lock Status", "Access Logs", "Battery Level", "Tamper Detection"],
      lastModified: "3 hours ago",
      status: "draft",
      author: "Security Team"
    },
    {
      id: "template-4",
      name: "Industrial Motor Template",
      description: "Industrial motor monitoring and control",
      version: "1.5.2",
      deviceCount: 6,
      capabilities: ["RPM", "Temperature", "Vibration", "Power Consumption", "Operational Status"],
      lastModified: "5 days ago",
      status: "published",
      author: "Industrial Engineer"
    }
  ];

  const filteredTemplates = deviceTemplates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-device-online';
      case 'draft':
        return 'bg-device-warning';
      default:
        return 'bg-muted';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Device Templates</h1>
            <p className="text-muted-foreground">Define device capabilities and data models</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </div>
        </div>

        {/* Search */}
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search device templates..."
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
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Templates</p>
                <p className="text-2xl font-bold">{deviceTemplates.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-device-online rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-2xl font-bold text-device-online">
                  {deviceTemplates.filter(t => t.status === 'published').length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-device-warning rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold text-device-warning">
                  {deviceTemplates.filter(t => t.status === 'draft').length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Active Devices</p>
                <p className="text-2xl font-bold">
                  {deviceTemplates.reduce((sum, template) => sum + template.deviceCount, 0)}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Templates List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            {filteredTemplates.length} Template{filteredTemplates.length !== 1 ? 's' : ''}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="p-6 hover:shadow-elevated transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{template.name}</h3>
                      <Badge className={getStatusColor(template.status)}>
                        {template.status}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-3">{template.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Version:</span>
                        <span className="ml-2 font-medium">{template.version}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Devices:</span>
                        <span className="ml-2 font-medium">{template.deviceCount}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Author:</span>
                        <span className="ml-2 font-medium">{template.author}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Modified:</span>
                        <span className="ml-2 font-medium">{template.lastModified}</span>
                      </div>
                    </div>
                  </div>

                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Capabilities:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.capabilities.map((capability, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DeviceTemplates;