import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TelemetryData } from "@/hooks/useDeviceData";

interface MetricsChartProps {
  title: string;
  data: TelemetryData[];
  metric: keyof Omit<TelemetryData, 'timestamp'>;
  color: string;
  unit: string;
  icon: React.ReactNode;
}

const MetricsChart = ({ title, data, metric, color, unit, icon }: MetricsChartProps) => {
  const chartData = data.slice(-20).map((item, index) => ({
    time: index,
    value: Number(item[metric].toFixed(1)),
    timestamp: item.timestamp,
  }));

  const currentValue = chartData[chartData.length - 1]?.value || 0;
  const previousValue = chartData[chartData.length - 2]?.value || 0;
  const change = currentValue - previousValue;
  const percentChange = previousValue !== 0 ? ((change / previousValue) * 100) : 0;

  const formatTooltip = (value: any, name: any, props: any) => {
    if (props.payload) {
      const timestamp = new Date(props.payload.timestamp);
      return [
        `${value}${unit}`,
        `${title} at ${timestamp.toLocaleTimeString()}`
      ];
    }
    return [`${value}${unit}`, title];
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {icon}
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{currentValue}{unit}</div>
          {percentChange !== 0 && (
            <Badge 
              variant={percentChange > 0 ? "destructive" : "default"}
              className="text-xs"
            >
              {percentChange > 0 ? '+' : ''}{percentChange.toFixed(1)}%
            </Badge>
          )}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Tooltip 
              formatter={formatTooltip}
              labelStyle={{ display: 'none' }}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
                fontSize: '12px'
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: color }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default MetricsChart;