import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Devices from "./pages/Devices";
import DeviceGroups from "./pages/DeviceGroups";
import DeviceTemplates from "./pages/DeviceTemplates";
import EdgeManifests from "./pages/EdgeManifests";
import Analytics from "./pages/Analytics";
import Jobs from "./pages/Jobs";
import Rules from "./pages/Rules";
import DataExport from "./pages/DataExport";
import AuditLogs from "./pages/AuditLogs";
import Permissions from "./pages/Permissions";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/device-groups" element={<DeviceGroups />} />
          <Route path="/device-templates" element={<DeviceTemplates />} />
          <Route path="/edge-manifests" element={<EdgeManifests />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/data-export" element={<DataExport />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
