import DashboardLayout from "@/components/layout/DashboardLayout";
import MetricsChart from "@/components/dashboard/MetricsChart";
import { useDeviceData } from "@/hooks/useDeviceData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  Thermometer,
  Droplets,
  Gauge,
  Zap,
  Filter
} from "lucide-react";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Analytics = () => {
  const { devices } = useDeviceData();
  const [timeRange, setTimeRange] = useState("24h");
  const [selectedMetric, setSelectedMetric] = useState("all");

  // Aggregate data for analytics
  const onlineDevices = devices.filter(d => d.status === 'online');
  const combinedTelemetry = onlineDevices.length > 0 ? 
    onlineDevices[0].telemetry.map((_, index) => {
      const timestamp = onlineDevices[0].telemetry[index]?.timestamp || new Date();
      return {
        timestamp,
        temperature: onlineDevices.reduce((sum, device) => 
          sum + (device.telemetry[index]?.temperature || 0), 0) / onlineDevices.length,
        humidity: onlineDevices.reduce((sum, device) => 
          sum + (device.telemetry[index]?.humidity || 0), 0) / onlineDevices.length,
        pressure: onlineDevices.reduce((sum, device) => 
          sum + (device.telemetry[index]?.pressure || 0), 0) / onlineDevices.length,
        energyUsage: onlineDevices.reduce((sum, device) => 
          sum + (device.telemetry[index]?.energyUsage || 0), 0),
      };
    }) : [];

  // Device type distribution data
  const deviceTypeData = devices.reduce((acc, device) => {
    const type = device.type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const deviceTypeChartData = Object.entries(deviceTypeData).map(([type, count]) => ({
    type: type.replace(' ', '\n'),
    count,
    status: 'active'
  }));

  // Status distribution data
  const statusData = devices.reduce((acc, device) => {
    acc[device.status] = (acc[device.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusChartData = Object.entries(statusData).map(([status, count]) => ({
    status: status.charAt(0).toUpperCase() + status.slice(1),
    count,
    color: status === 'online' ? '#10b981' : 
           status === 'warning' ? '#f59e0b' : 
           status === 'error' ? '#ef4444' : '#6b7280'
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Analytics & Data Explorer</h1>
            <p className="text-muted-foreground">Analyze telemetry data and device performance</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Data Points</p>
                <p className="text-2xl font-bold">{combinedTelemetry.length * devices.length}K</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-device-online" />
                  <span className="text-xs text-device-online">+12.5%</span>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Temperature</p>
                <p className="text-2xl font-bold">
                  {onlineDevices.length > 0 ? 
                    (onlineDevices.reduce((sum, d) => sum + d.currentValues.temperature, 0) / onlineDevices.length).toFixed(1) 
                    : '0'}°C
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Energy</p>
                <p className="text-2xl font-bold">
                  {devices.reduce((sum, d) => sum + d.currentValues.energyUsage, 0).toFixed(0)}W
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-device-online rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">Uptime</p>
                <p className="text-2xl font-bold">
                  {((onlineDevices.length / devices.length) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Telemetry Charts */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Telemetry Trends</h2>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Metrics</SelectItem>
                  <SelectItem value="temperature">Temperature</SelectItem>
                  <SelectItem value="humidity">Humidity</SelectItem>
                  <SelectItem value="pressure">Pressure</SelectItem>
                  <SelectItem value="energy">Energy Usage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(selectedMetric === "all" || selectedMetric === "temperature") && (
            <MetricsChart
              title="Temperature Trends"
              data={combinedTelemetry}
              metric="temperature"
              color="#3b82f6"
              unit="°C"
              icon={<Thermometer className="w-5 h-5 text-primary" />}
            />
          )}

          {(selectedMetric === "all" || selectedMetric === "humidity") && (
            <MetricsChart
              title="Humidity Trends"
              data={combinedTelemetry}
              metric="humidity"
              color="#06b6d4"
              unit="%"
              icon={<Droplets className="w-5 h-5 text-cyan-500" />}
            />
          )}

          {(selectedMetric === "all" || selectedMetric === "pressure") && (
            <MetricsChart
              title="Pressure Trends"
              data={combinedTelemetry}
              metric="pressure"
              color="#10b981"
              unit=" hPa"
              icon={<Gauge className="w-5 h-5 text-green-500" />}
            />
          )}

          {(selectedMetric === "all" || selectedMetric === "energy") && (
            <MetricsChart
              title="Energy Usage Trends"
              data={combinedTelemetry}
              metric="energyUsage"
              color="#f59e0b"
              unit="W"
              icon={<Zap className="w-5 h-5 text-yellow-500" />}
            />
          )}
        </div>

        {/* Distribution Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Device Type Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Device Type Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deviceTypeChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="type" 
                    tick={{ fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Device Status Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Device Status Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="status" 
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;