import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/hooks/useDeviceData";
import { cn } from "@/lib/utils";
import { AlertTriangle, Info, X, Check } from "lucide-react";

interface AlertsPanelProps {
  alerts: Alert[];
  onAcknowledge: (alertId: string) => void;
}

const AlertsPanel = ({ alerts, onAcknowledge }: AlertsPanelProps) => {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'info':
        return <Info className="w-4 h-4 text-primary" />;
    }
  };

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'error':
        return 'border-l-destructive';
      case 'warning':
        return 'border-l-warning';
      case 'info':
        return 'border-l-primary';
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged);
  const acknowledgedAlerts = alerts.filter(alert => alert.acknowledged);

  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">System Alerts</h3>
        <Badge variant={unacknowledgedAlerts.length > 0 ? "destructive" : "default"}>
          {unacknowledgedAlerts.length} Active
        </Badge>
      </div>

      <div className="flex-1 overflow-auto space-y-3">
        {unacknowledgedAlerts.length === 0 && acknowledgedAlerts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No alerts to display</p>
          </div>
        )}

        {/* Unacknowledged alerts */}
        {unacknowledgedAlerts.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              "p-3 border-l-4 bg-card rounded-r-md shadow-sm animate-slide-up",
              getAlertColor(alert.type)
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-2 flex-1">
                {getAlertIcon(alert.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.deviceName}</p>
                  <p className="text-xs text-muted-foreground">{formatTime(alert.timestamp)}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onAcknowledge(alert.id)}
                className="ml-2"
              >
                <Check className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}

        {/* Acknowledged alerts (last 5) */}
        {acknowledgedAlerts.slice(0, 5).map((alert) => (
          <div
            key={alert.id}
            className={cn(
              "p-3 border-l-4 bg-muted/50 rounded-r-md opacity-60",
              getAlertColor(alert.type)
            )}
          >
            <div className="flex items-start space-x-2">
              {getAlertIcon(alert.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground line-through">{alert.message}</p>
                <p className="text-xs text-muted-foreground">{alert.deviceName}</p>
                <p className="text-xs text-muted-foreground">{formatTime(alert.timestamp)}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                Acknowledged
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AlertsPanel;