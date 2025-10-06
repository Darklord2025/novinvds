
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "./contexts/LanguageContext";
import Chatbot from "./components/Chatbot";
import Index from "./pages/Index";
import Vps from "./pages/Vps";
import Dedicated from "./pages/Dedicated";
import Hosting from "./pages/Hosting";
import Domain from "./pages/Domain";
import Network from "./pages/Network";
import License from "./pages/License";
import SSL from "./pages/SSL";
import Datacenter from "./pages/Datacenter";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import UserPanel from "./pages/UserPanel";
import NotFound from "./pages/NotFound";
import HostingPlans from "./pages/HostingPlans";
import VpsPlans from "./pages/VpsPlans";
import DedicatedPlans from "./pages/DedicatedPlans";
import HostingServices from "./pages/HostingServices";
import VPSServices from "./pages/VPSServices";
import DedicatedServices from "./pages/DedicatedServices";
import DomainServices from "./pages/DomainServices";
import NetworkServices from "./pages/NetworkServices";
import NetworkStore from "./pages/NetworkStore";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/vps" element={<Vps />} />
              <Route path="/dedicated" element={<Dedicated />} />
              <Route path="/hosting" element={<Hosting />} />
              <Route path="/domain" element={<Domain />} />
              <Route path="/network" element={<Network />} />
              <Route path="/network-store" element={<NetworkStore />} />
              <Route path="/license" element={<License />} />
              <Route path="/ssl" element={<SSL />} />
              <Route path="/datacenter" element={<Datacenter />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/user-panel" element={<UserPanel />} />
              <Route path="/hosting-plans" element={<HostingPlans />} />
              <Route path="/vps-plans" element={<VpsPlans />} />
              <Route path="/dedicated-plans" element={<DedicatedPlans />} />
              <Route path="/hosting-services" element={<HostingServices />} />
              <Route path="/vps-services" element={<VPSServices />} />
              <Route path="/dedicated-services" element={<DedicatedServices />} />
              <Route path="/domain-services" element={<DomainServices />} />
              <Route path="/network-services" element={<NetworkServices />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Chatbot />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
