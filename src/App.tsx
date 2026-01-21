import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import PlantLibrary from "./pages/PlantLibrary";
import PlantDetail from "./pages/PlantDetail";
import DiseaseDetection from "./pages/DiseaseDetection";
import CareRecommendations from "./pages/CareRecommendations";
import NearbyStores from "./pages/NearbyStores";
import CommunityChat from "./pages/CommunityChat";
import History from "./pages/History";
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
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/library" element={<PlantLibrary />} />
          <Route path="/plant/:id" element={<PlantDetail />} />
          <Route path="/detect" element={<DiseaseDetection />} />
          <Route path="/care" element={<CareRecommendations />} />
          <Route path="/stores" element={<NearbyStores />} />
          <Route path="/community" element={<CommunityChat />} />
          <Route path="/history" element={<History />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
