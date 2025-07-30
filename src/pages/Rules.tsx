import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Settings, 
  AlertTriangle, 
  Mail, 
  Webhook,
  Search,
  MoreHorizontal,
  Zap,
  Clock
} from "lucide-react";
import { useState } from "react";

const Rules = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock rules data
  const rules = [
    {
      id: "rule-1",
      name: "High Temperature Alert",
      description: "Trigger when temperature exceeds 30°C for more than 5 minutes",
      condition: "temperature > 30 AND duration > 5min",
      actions: ["Send Email", "SMS Alert"],
      targetDevices: "Building A Sensors",
      status: "enabled",
      triggerCount: 12,
      lastTriggered: "2 hours ago",
      severity: "high",
      createdBy: "System Admin"
    },
    {
      id: "rule-2",
      name: "HVAC Energy Efficiency",
      description: "Monitor energy consumption and optimize HVAC operations",
      condition: "energyUsage > 150W AND efficiency < 80%",
      actions: ["Adjust Settings", "Log Event"],
      targetDevices: "HVAC Controllers",
      status: "enabled",
      triggerCount: 5,
      lastTriggered: "6 hours ago",
      severity: "medium",
      createdBy: "Energy Manager"
    },
    {
      id: "rule-3",
      name: "Device Offline Detection",
      description: "Alert when critical devices go offline",
      condition: "status = 'offline' AND deviceType = 'critical'",
      actions: ["Send Email", "Create Ticket"],
      targetDevices: "Critical Infrastructure",
      status: "enabled",
      triggerCount: 3,
      lastTriggered: "1 day ago",
      severity: "critical",
      createdBy: "Operations Team"
    },
    {
      id: "rule-4",
      name: "Humidity Control",
      description: "Maintain optimal humidity levels in sensitive areas",
      condition: "humidity < 40% OR humidity > 70%",
      actions: ["Adjust HVAC", "Send Notification"],
      targetDevices: "Environmental Monitors",
      status: "enabled",
      triggerCount: 8,
      lastTriggered: "30 minutes ago",
      severity: "medium",
      createdBy: "Facility Manager"
    },
    {
      id: "rule-5",
      name: "Security Breach Protocol",
      description: "Immediate response to unauthorized access attempts",
      condition: "unauthorizedAccess = true OR tampering = detected",
      actions: ["Lock Down", "Alert Security", "Record Video"],
      targetDevices: "Security Devices",
      status: "disabled",
      triggerCount: 0,
      lastTriggered: "Never",
      severity: "critical",
      createdBy: "Security Team"
    }
  ];

  const [rulesState, setRulesState] = useState(
    rules.reduce((acc, rule) => {
      acc[rule.id] = rule.status === 'enabled';
      return acc;
    }, {} as Record<string, boolean>)
  );

  const filteredRules = rules.filter(rule =>
    rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-device-error';
      case 'high':
        return 'bg-device-warning';
      case 'medium':
        return 'bg-device-warning/60';
      case 'low':
        return 'bg-muted';
      default:
        return 'bg-muted';
    }
  };

  const getActionIcon = (action: string) => {
    if (action.toLowerCase().includes('email') || action.toLowerCase().includes('sms')) {
      return <Mail className="w-3 h-3" />;
    } else if (action.toLowerCase().includes('webhook') || action.toLowerCase().includes('api')) {
      return <Webhook className="w-3 h-3" />;
    } else {
      return <Zap className="w-3 h-3" />;
    }
  };

  const toggleRule = (ruleId: string) => {
    setRulesState(prev => ({
      ...prev,
      [ruleId]: !prev[ruleId]
    }));
  };

  const enabledRules = Object.values(rulesState).filter(Boolean).length;
  const totalTriggers = rules.reduce((sum, rule) => sum + rule.triggerCount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Rules</h1>
            <p className="text-muted-foreground">Automate device responses and alerts</p>
          </div>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Create Rule
          </Button>
        </div>

        {/* Search */}
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search rules..."
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
              <Settings className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Rules</p>
                <p className="text-2xl font-bold">{rules.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-device-online rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">Enabled</p>
                <p className="text-2xl font-bold text-device-online">{enabledRules}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-device-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Total Triggers</p>
                <p className="text-2xl font-bold">{totalTriggers}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-device-error rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">Critical Rules</p>
                <p className="text-2xl font-bold text-device-error">
                  {rules.filter(r => r.severity === 'critical').length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Rules List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            {filteredRules.length} Rule{filteredRules.length !== 1 ? 's' : ''}
          </h2>
          
          {filteredRules.map((rule) => (
            <Card key={rule.id} className="p-6 hover:shadow-elevated transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{rule.name}</h3>
                    <Badge className={getSeverityColor(rule.severity)}>
                      {rule.severity.toUpperCase()}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={rulesState[rule.id]}
                        onCheckedChange={() => toggleRule(rule.id)}
                      />
                      <span className="text-sm text-muted-foreground">
                        {rulesState[rule.id] ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-3">{rule.description}</p>
                  
                  <div className="bg-muted/50 rounded-md p-3 mb-4">
                    <span className="text-xs text-muted-foreground font-medium">CONDITION:</span>
                    <p className="text-sm font-mono mt-1">{rule.condition}</p>
                  </div>
                </div>

                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              {/* Actions */}
              <div className="mb-4">
                <span className="text-sm text-muted-foreground mb-2 block">Actions:</span>
                <div className="flex flex-wrap gap-2">
                  {rule.actions.map((action, index) => (
                    <Badge key={index} variant="outline" className="flex items-center space-x-1">
                      {getActionIcon(action)}
                      <span>{action}</span>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Rule Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Target:</span>
                  <span className="ml-2 font-medium">{rule.targetDevices}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Triggers:</span>
                  <span className="ml-2 font-medium">{rule.triggerCount}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Last triggered:</span>
                  <span className="font-medium">{rule.lastTriggered}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Created by:</span>
                  <span className="ml-2 font-medium">{rule.createdBy}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Rules;