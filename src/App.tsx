
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CartProvider } from "./contexts/CartContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Chatbot from "./components/Chatbot";
const Index = React.lazy(() => import("./pages/Index"));
const Vps = React.lazy(() => import("./pages/Vps"));
const Dedicated = React.lazy(() => import("./pages/Dedicated"));
const Hosting = React.lazy(() => import("./pages/Hosting"));
const Domain = React.lazy(() => import("./pages/Domain"));
const Network = React.lazy(() => import("./pages/Network"));
const License = React.lazy(() => import("./pages/License"));
const SSL = React.lazy(() => import("./pages/SSL"));
const Datacenter = React.lazy(() => import("./pages/Datacenter"));
const Blog = React.lazy(() => import("./pages/Blog"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Auth = React.lazy(() => import("./pages/Auth"));
const UserPanel = React.lazy(() => import("./pages/UserPanel"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const HostingPlans = React.lazy(() => import("./pages/HostingPlans"));
const VpsPlans = React.lazy(() => import("./pages/VpsPlans"));
const DedicatedPlans = React.lazy(() => import("./pages/DedicatedPlans"));
const HostingServices = React.lazy(() => import("./pages/HostingServices"));
const VpsServices = React.lazy(() => import("./pages/VpsServices"));
const VpsCustomOrder = React.lazy(() => import("./pages/VpsCustomOrder"));
const DedicatedServices = React.lazy(() => import("./pages/DedicatedServices"));
const DomainServices = React.lazy(() => import("./pages/DomainServices"));
const NetworkServices = React.lazy(() => import("./pages/NetworkServices"));
const NetworkStore = React.lazy(() => import("./pages/NetworkStore"));
const OAuthConsent = React.lazy(() => import("./pages/OAuthConsent"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <React.Suspense fallback={<p className="p-6" role="status">در حال بارگذاری…</p>}>
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
              <Route path="/auth" element={<Auth />} />
              <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
              <Route path="/user-panel" element={<UserPanel />} />
              <Route path="/hosting-plans" element={<HostingPlans />} />
              <Route path="/vps-plans" element={<VpsPlans />} />
              <Route path="/dedicated-plans" element={<DedicatedPlans />} />
              <Route path="/hosting-services" element={<HostingServices />} />
              <Route path="/vps-services" element={<VpsServices />} />
              <Route path="/vps-custom" element={<VpsCustomOrder />} />
              <Route path="/vps-hourly" element={<VpsCustomOrder />} />
              <Route path="/dedicated-services" element={<DedicatedServices />} />
              <Route path="/domain-services" element={<DomainServices />} />
              <Route path="/network-services" element={<NetworkServices />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </React.Suspense>
            <Chatbot />
          </BrowserRouter>
        </TooltipProvider>
          </CartProvider>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
