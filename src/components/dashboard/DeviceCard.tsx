import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Device } from "@/hooks/useDeviceData";
import { cn } from "@/lib/utils";
import { 
  Thermometer, 
  Droplets, 
  Gauge, 
  Zap, 
  MapPin, 
  Clock,
  MoreHorizontal 
} from "lucide-react";

interface DeviceCardProps {
  device: Device;
  onClick?: () => void;
}

const DeviceCard = ({ device, onClick }: DeviceCardProps) => {
  const getStatusColor = (status: Device['status']) => {
    switch (status) {
      case 'online':
        return 'bg-device-online';
      case 'offline':
        return 'bg-device-offline';
      case 'warning':
        return 'bg-device-warning';
      case 'error':
        return 'bg-device-error';
      default:
        return 'bg-muted';
    }
  };

  const getStatusText = (status: Device['status']) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'offline':
        return 'Offline';
      case 'warning':
        return 'Warning';
      case 'error':
        return 'Error';
      default:
        return 'Unknown';
    }
  };

  const formatValue = (value: number, unit: string) => {
    return `${value.toFixed(1)}${unit}`;
  };

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <Card 
      className={cn(
        "p-6 hover:shadow-elevated transition-all duration-200 cursor-pointer animate-slide-up",
        device.status === 'online' && "hover:shadow-glow"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg text-foreground mb-1">{device.name}</h3>
          <p className="text-sm text-muted-foreground">{device.type}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={cn("w-3 h-3 rounded-full", getStatusColor(device.status))} />
          <Badge variant={device.status === 'online' ? 'default' : 'secondary'}>
            {getStatusText(device.status)}
          </Badge>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Thermometer className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">
            {formatValue(device.currentValues.temperature, '°C')}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Droplets className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium">
            {formatValue(device.currentValues.humidity, '%')}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Gauge className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium">
            {formatValue(device.currentValues.pressure, ' hPa')}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium">
            {formatValue(device.currentValues.energyUsage, 'W')}
          </span>
        </div>
      </div>

      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <MapPin className="w-3 h-3" />
          <span>{device.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-3 h-3" />
          <span>Last seen {formatLastSeen(device.lastSeen)}</span>
        </div>
      </div>
    </Card>
  );
};

export default DeviceCard;