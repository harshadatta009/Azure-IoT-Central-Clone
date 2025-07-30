import DashboardLayout from "@/components/layout/DashboardLayout";
import SystemOverview from "@/components/dashboard/SystemOverview";
import DeviceCard from "@/components/dashboard/DeviceCard";
import MetricsChart from "@/components/dashboard/MetricsChart";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import { useDeviceData } from "@/hooks/useDeviceData";
import { Thermometer, Droplets, Gauge, Zap } from "lucide-react";

const Index = () => {
  const { devices, alerts, isConnected, acknowledgeAlert } = useDeviceData();

  // Calculate average metrics from all online devices
  const onlineDevices = devices.filter(d => d.status === 'online');
  const averageMetrics = onlineDevices.length > 0 ? {
    temperature: onlineDevices.reduce((sum, d) => sum + d.currentValues.temperature, 0) / onlineDevices.length,
    humidity: onlineDevices.reduce((sum, d) => sum + d.currentValues.humidity, 0) / onlineDevices.length,
    pressure: onlineDevices.reduce((sum, d) => sum + d.currentValues.pressure, 0) / onlineDevices.length,
    energyUsage: onlineDevices.reduce((sum, d) => sum + d.currentValues.energyUsage, 0) / onlineDevices.length,
  } : { temperature: 0, humidity: 0, pressure: 0, energyUsage: 0 };

  // Get combined telemetry data for charts (from first few devices for demo)
  const chartDevices = devices.slice(0, 3);
  const combinedTelemetry = chartDevices.length > 0 ? 
    chartDevices[0].telemetry.map((_, index) => {
      const timestamp = chartDevices[0].telemetry[index]?.timestamp || new Date();
      return {
        timestamp,
        temperature: chartDevices.reduce((sum, device) => 
          sum + (device.telemetry[index]?.temperature || 0), 0) / chartDevices.length,
        humidity: chartDevices.reduce((sum, device) => 
          sum + (device.telemetry[index]?.humidity || 0), 0) / chartDevices.length,
        pressure: chartDevices.reduce((sum, device) => 
          sum + (device.telemetry[index]?.pressure || 0), 0) / chartDevices.length,
        energyUsage: chartDevices.reduce((sum, device) => 
          sum + (device.telemetry[index]?.energyUsage || 0), 0) / chartDevices.length,
      };
    }) : [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* System Overview */}
        <SystemOverview devices={devices} isConnected={isConnected} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MetricsChart
            title="Temperature"
            data={combinedTelemetry}
            metric="temperature"
            color="#3b82f6"
            unit="°C"
            icon={<Thermometer className="w-5 h-5 text-primary" />}
          />
          <MetricsChart
            title="Humidity"
            data={combinedTelemetry}
            metric="humidity"
            color="#06b6d4"
            unit="%"
            icon={<Droplets className="w-5 h-5 text-cyan-500" />}
          />
          <MetricsChart
            title="Pressure"
            data={combinedTelemetry}
            metric="pressure"
            color="#10b981"
            unit=" hPa"
            icon={<Gauge className="w-5 h-5 text-green-500" />}
          />
          <MetricsChart
            title="Energy Usage"
            data={combinedTelemetry}
            metric="energyUsage"
            color="#f59e0b"
            unit="W"
            icon={<Zap className="w-5 h-5 text-yellow-500" />}
          />
        </div>

        {/* Devices and Alerts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Devices Grid */}
          <div className="xl:col-span-3">
            <h2 className="text-xl font-semibold mb-4">Connected Devices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {devices.map((device) => (
                <DeviceCard
                  key={device.id}
                  device={device}
                  onClick={() => console.log('Device clicked:', device.id)}
                />
              ))}
            </div>
          </div>

          {/* Alerts Panel */}
          <div className="xl:col-span-1">
            <AlertsPanel alerts={alerts} onAcknowledge={acknowledgeAlert} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
