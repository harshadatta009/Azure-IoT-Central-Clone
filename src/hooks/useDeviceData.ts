import { useState, useEffect, useCallback } from 'react';

export interface TelemetryData {
  timestamp: Date;
  temperature: number;
  humidity: number;
  pressure: number;
  energyUsage: number;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'online' | 'offline' | 'warning' | 'error';
  lastSeen: Date;
  telemetry: TelemetryData[];
  currentValues: {
    temperature: number;
    humidity: number;
    pressure: number;
    energyUsage: number;
  };
}

export interface Alert {
  id: string;
  deviceId: string;
  deviceName: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

// Simulate realistic IoT device data
const generateTelemetryData = (deviceType: string): TelemetryData => {
  const now = new Date();
  
  let baseTemp = 22;
  let baseHumidity = 45;
  let basePressure = 1013;
  let baseEnergy = 50;
  
  // Adjust base values based on device type
  switch (deviceType) {
    case 'Temperature Sensor':
      baseTemp = 20 + Math.sin(Date.now() / 600000) * 5; // Slow sine wave
      break;
    case 'HVAC Controller':
      baseTemp = 22 + Math.sin(Date.now() / 300000) * 3;
      baseEnergy = 100 + Math.sin(Date.now() / 400000) * 30;
      break;
    case 'Environmental Monitor':
      baseHumidity = 50 + Math.sin(Date.now() / 800000) * 15;
      break;
  }
  
  return {
    timestamp: now,
    temperature: baseTemp + (Math.random() - 0.5) * 4,
    humidity: Math.max(0, Math.min(100, baseHumidity + (Math.random() - 0.5) * 10)),
    pressure: basePressure + (Math.random() - 0.5) * 20,
    energyUsage: Math.max(0, baseEnergy + (Math.random() - 0.5) * 20),
  };
};

const createInitialDevices = (): Device[] => {
  const deviceTypes = ['Temperature Sensor', 'HVAC Controller', 'Environmental Monitor', 'Smart Thermostat'];
  const locations = ['Building A - Floor 1', 'Building A - Floor 2', 'Building B - Lab', 'Building C - Office'];
  const statuses: Device['status'][] = ['online', 'online', 'online', 'warning', 'offline'];
  
  return Array.from({ length: 12 }, (_, i) => {
    const deviceType = deviceTypes[i % deviceTypes.length];
    const initialData = generateTelemetryData(deviceType);
    
    return {
      id: `device-${i + 1}`,
      name: `${deviceType} ${String.fromCharCode(65 + i)}`,
      type: deviceType,
      location: locations[i % locations.length],
      status: statuses[i % statuses.length],
      lastSeen: new Date(Date.now() - Math.random() * 300000), // Last seen within 5 minutes
      telemetry: [initialData],
      currentValues: {
        temperature: initialData.temperature,
        humidity: initialData.humidity,
        pressure: initialData.pressure,
        energyUsage: initialData.energyUsage,
      },
    };
  });
};

const generateAlert = (devices: Device[]): Alert | null => {
  // 10% chance to generate an alert
  if (Math.random() > 0.1) return null;
  
  const alertTypes: Alert['type'][] = ['warning', 'error', 'info'];
  const alertMessages = [
    'Temperature threshold exceeded',
    'Device connectivity lost',
    'Battery level low',
    'Maintenance required',
    'Firmware update available',
    'Sensor calibration needed',
  ];
  
  const device = devices[Math.floor(Math.random() * devices.length)];
  const type = alertTypes[Math.floor(Math.random() * alertTypes.length)];
  const message = alertMessages[Math.floor(Math.random() * alertMessages.length)];
  
  return {
    id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    deviceId: device.id,
    deviceName: device.name,
    type,
    message,
    timestamp: new Date(),
    acknowledged: false,
  };
};

export const useDeviceData = () => {
  const [devices, setDevices] = useState<Device[]>(createInitialDevices);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isConnected, setIsConnected] = useState(true);

  // Simulate real-time data updates
  const updateDeviceData = useCallback(() => {
    setDevices(prevDevices =>
      prevDevices.map(device => {
        // Randomly change device status (including bringing offline devices back online)
        let newStatus = device.status;
        if (Math.random() < 0.02) { // 2% chance to change status
          const statuses: Device['status'][] = ['online', 'offline', 'warning', 'error'];
          newStatus = statuses[Math.floor(Math.random() * statuses.length)];
        }
        
        // Skip telemetry updates for offline devices, but still update status
        if (device.status === 'offline' && newStatus === 'offline') {
          return { ...device, status: newStatus };
        }
        
        const newTelemetry = generateTelemetryData(device.type);
        
        return {
          ...device,
          status: newStatus,
          lastSeen: new Date(),
          telemetry: [...device.telemetry.slice(-29), newTelemetry], // Keep last 30 readings
          currentValues: {
            temperature: newTelemetry.temperature,
            humidity: newTelemetry.humidity,
            pressure: newTelemetry.pressure,
            energyUsage: newTelemetry.energyUsage,
          },
        };
      })
    );
    
    // Generate alerts
    setDevices(currentDevices => {
      const newAlert = generateAlert(currentDevices);
      if (newAlert) {
        setAlerts(prevAlerts => [newAlert, ...prevAlerts.slice(0, 49)]); // Keep last 50 alerts
      }
      return currentDevices;
    });
  }, []);

  // Simulate connection status changes
  useEffect(() => {
    const connectionInterval = setInterval(() => {
      if (Math.random() < 0.05) { // 5% chance to toggle connection
        setIsConnected(prev => !prev);
        setTimeout(() => setIsConnected(true), 2000); // Reconnect after 2 seconds
      }
    }, 10000);

    return () => clearInterval(connectionInterval);
  }, []);

  // Update device data every 2 seconds
  useEffect(() => {
    if (!isConnected) return;
    
    const interval = setInterval(updateDeviceData, 2000);
    return () => clearInterval(interval);
  }, [updateDeviceData, isConnected]);

  const acknowledgeAlert = useCallback((alertId: string) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  }, []);

  const getDeviceById = useCallback((deviceId: string) => {
    return devices.find(device => device.id === deviceId);
  }, [devices]);

  return {
    devices,
    alerts,
    isConnected,
    acknowledgeAlert,
    getDeviceById,
  };
};