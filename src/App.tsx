import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import Landing from "./pages/Landing";
import FarmerAuth from "./pages/auth/FarmerAuth";
import VetAuth from "./pages/auth/VetAuth";
import AdminAuth from "./pages/auth/AdminAuth";
import FarmerDashboard from "./pages/dashboards/FarmerDashboard";
import VetDashboard from "./pages/dashboards/VetDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="livestock-ui-theme">
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth/farmer" element={<FarmerAuth />} />
              <Route path="/auth/vet" element={<VetAuth />} />
              <Route path="/auth/admin" element={<AdminAuth />} />
              <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
              <Route path="/vet/dashboard" element={<VetDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
