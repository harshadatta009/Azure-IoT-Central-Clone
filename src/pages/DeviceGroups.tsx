import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Users, 
  Cpu, 
  MoreHorizontal,
  Filter,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const DeviceGroups = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock device groups data
  const deviceGroups = [
    {
      id: "group-1",
      name: "Building A Sensors",
      description: "All temperature and humidity sensors in Building A",
      deviceCount: 8,
      onlineDevices: 7,
      type: "query",
      lastModified: "2 hours ago",
      rules: ["Temperature Alert", "Humidity Monitoring"]
    },
    {
      id: "group-2", 
      name: "HVAC Controllers",
      description: "Central air conditioning and heating systems",
      deviceCount: 4,
      onlineDevices: 4,
      type: "static",
      lastModified: "1 day ago",
      rules: ["Energy Efficiency", "Maintenance Schedule"]
    },
    {
      id: "group-3",
      name: "Environmental Monitors",
      description: "Air quality and environmental monitoring devices",
      deviceCount: 6,
      onlineDevices: 5,
      type: "query",
      lastModified: "3 hours ago",
      rules: ["Air Quality Alert"]
    },
    {
      id: "group-4",
      name: "Security Devices",
      description: "Door sensors and access control systems",
      deviceCount: 12,
      onlineDevices: 11,
      type: "static",
      lastModified: "5 minutes ago",
      rules: ["Access Control", "Security Breach"]
    }
  ];

  const filteredGroups = deviceGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Device Groups</h1>
            <p className="text-muted-foreground">Organize and manage device collections</p>
          </div>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Create Group
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 flex-1">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search device groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Groups</p>
                <p className="text-2xl font-bold">{deviceGroups.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-device-online" />
              <div>
                <p className="text-sm text-muted-foreground">Total Devices</p>
                <p className="text-2xl font-bold">
                  {deviceGroups.reduce((sum, group) => sum + group.deviceCount, 0)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-device-online rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">Online Devices</p>
                <p className="text-2xl font-bold text-device-online">
                  {deviceGroups.reduce((sum, group) => sum + group.onlineDevices, 0)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">Active Rules</p>
                <p className="text-2xl font-bold text-primary">
                  {deviceGroups.reduce((sum, group) => sum + group.rules.length, 0)}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Device Groups List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            {filteredGroups.length} Group{filteredGroups.length !== 1 ? 's' : ''}
          </h2>
          
          {filteredGroups.map((group) => (
            <Card key={group.id} className="p-6 hover:shadow-elevated transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{group.name}</h3>
                    <Badge variant={group.type === 'query' ? 'default' : 'secondary'}>
                      {group.type === 'query' ? 'Dynamic' : 'Static'}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{group.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Cpu className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        {group.deviceCount} device{group.deviceCount !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-device-online rounded-full" />
                      <span className="text-sm">
                        {group.onlineDevices} online
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Updated {group.lastModified}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Active Rules:</span>
                    <div className="flex flex-wrap gap-1">
                      {group.rules.map((rule, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {rule}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DeviceGroups;