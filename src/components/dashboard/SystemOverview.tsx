import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Device } from "@/hooks/useDeviceData";
import { Cpu, Wifi, WifiOff, AlertTriangle, CheckCircle } from "lucide-react";

interface SystemOverviewProps {
  devices: Device[];
  isConnected: boolean;
}

const SystemOverview = ({ devices, isConnected }: SystemOverviewProps) => {
  const onlineDevices = devices.filter(d => d.status === 'online').length;
  const offlineDevices = devices.filter(d => d.status === 'offline').length;
  const warningDevices = devices.filter(d => d.status === 'warning').length;
  const errorDevices = devices.filter(d => d.status === 'error').length;

  const totalDevices = devices.length;
  const healthyDevices = onlineDevices;
  const systemHealth = totalDevices > 0 ? (healthyDevices / totalDevices) * 100 : 0;

  const stats = [
    {
      label: 'Total Devices',
      value: totalDevices,
      icon: <Cpu className="w-5 h-5 text-primary" />,
      color: 'text-foreground'
    },
    {
      label: 'Online',
      value: onlineDevices,
      icon: <CheckCircle className="w-5 h-5 text-device-online" />,
      color: 'text-device-online'
    },
    {
      label: 'Warning',
      value: warningDevices,
      icon: <AlertTriangle className="w-5 h-5 text-device-warning" />,
      color: 'text-device-warning'
    },
    {
      label: 'Offline',
      value: offlineDevices,
      icon: <WifiOff className="w-5 h-5 text-device-offline" />,
      color: 'text-device-offline'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {/* Connection Status */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Connection</p>
            <div className="flex items-center space-x-2 mt-1">
              {isConnected ? (
                <>
                  <Wifi className="w-4 h-4 text-device-online" />
                  <Badge variant="default" className="bg-device-online">Connected</Badge>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 text-device-error" />
                  <Badge variant="destructive">Disconnected</Badge>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Device Stats */}
      {stats.map((stat, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
            {stat.icon}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SystemOverview;