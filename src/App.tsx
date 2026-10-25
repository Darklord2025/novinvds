import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CartProvider } from "./contexts/CartContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
const Chatbot = React.lazy(() => import("./components/Chatbot"));
const Vps = React.lazy(() => import("./pages/Vps"));
const Dedicated = React.lazy(() => import("./pages/Dedicated"));
const Hosting = React.lazy(() => import("./pages/Hosting"));
const Domain = React.lazy(() => import("./pages/Domain"));
const Network = React.lazy(() => import("./pages/Network"));
const License = React.lazy(() => import("./pages/License"));
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

const Recover = React.lazy(() => import("./pages/Recover"));
const Services = React.lazy(() => import("./pages/Services"));
const Addons = React.lazy(() => import("./pages/Addons"));
const Support = React.lazy(() => import("./pages/Support"));
const Knowledge = React.lazy(() => import("./pages/Knowledge"));
const FAQ = React.lazy(() => import("./pages/FAQ"));
const Downloads = React.lazy(() => import("./pages/Downloads"));
const Affiliate = React.lazy(() => import("./pages/Affiliate"));
const Calculator = React.lazy(() => import("./pages/Calculator"));
const routes = import.meta.glob(["./pages/*.tsx", "!./pages/Index.tsx"]);
function RoutePreload() {
  React.useEffect(() => {
    const ref = new URLSearchParams(location.search).get("ref");
    if (ref && /^[A-Za-z0-9_-]{3,40}$/.test(ref))
      localStorage.setItem("novin.referral", ref);
    const preload = (event: Event) => {
      const link = (event.target as Element)?.closest?.("a");
      if (!link) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin) return;
      const name = (
        {
          "/auth": "Auth",
          "/user-panel": "UserPanel",
          "/recover": "Recover",
          "/blog": "Blog",
          "/vps": "Vps",
          "/dedicated": "Dedicated",
          "/hosting": "Hosting",
          "/domain": "Domain",
          "/services": "Services",
          "/addons": "Addons",
          "/support": "Support",
          "/knowledge": "Knowledge",
          "/faq": "FAQ",
          "/calculator": "Calculator",
          "/datacenter": "Datacenter",
          "/contact": "Contact",
          "/downloads": "Downloads",
          "/affiliate": "Affiliate",
        } as Record<string, string>
      )[url.pathname];
      if (name) void routes["./pages/" + name + ".tsx"]?.();
    };
    document.addEventListener("pointerover", preload);
    document.addEventListener("focusin", preload);
    const idle = setTimeout(() => {
      void import("./pages/Auth");
    }, 1200);
    return () => {
      clearTimeout(idle);
      document.removeEventListener("pointerover", preload);
      document.removeEventListener("focusin", preload);
    };
  }, []);
  return null;
}
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
                <RoutePreload />
                <React.Suspense
                  fallback={
                    <div
                      className="min-h-[65vh] bg-background"
                      aria-busy="true"
                    />
                  }
                >
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/addons" element={<Addons />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/knowledge" element={<Knowledge />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/downloads" element={<Downloads />} />
                    <Route path="/affiliate" element={<Affiliate />} />
                    <Route path="/calculator" element={<Calculator />} />
                    <Route path="/vps" element={<Vps />} />
                    <Route path="/dedicated" element={<Dedicated />} />
                    <Route path="/hosting" element={<Hosting />} />
                    <Route path="/domain" element={<Domain />} />
                    <Route path="/network" element={<Network />} />
                    <Route path="/network-store" element={<NetworkStore />} />
                    <Route path="/license" element={<License />} />
                    <Route path="/datacenter" element={<Datacenter />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<Blog />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route
                      path="/activate-account"
                      element={<Auth activation />}
                    />
                    <Route path="/recover" element={<Recover />} />
                    <Route path="/forgot-password" element={<Recover />} />
                    <Route path="/reset-password" element={<Recover reset />} />
                    <Route
                      path="/.lovable/oauth/consent"
                      element={<OAuthConsent />}
                    />
                    <Route path="/user-panel" element={<UserPanel />} />
                    <Route path="/hosting-plans" element={<HostingPlans />} />
                    <Route path="/vps-plans" element={<VpsPlans />} />
                    <Route
                      path="/dedicated-plans"
                      element={<DedicatedPlans />}
                    />
                    <Route
                      path="/hosting-services"
                      element={<HostingServices />}
                    />
                    <Route path="/vps-services" element={<VpsServices />} />
                    <Route path="/vps-custom" element={<VpsCustomOrder />} />
                    <Route path="/vps-hourly" element={<VpsCustomOrder />} />
                    <Route
                      path="/dedicated-services"
                      element={<DedicatedServices />}
                    />
                    <Route
                      path="/domain-services"
                      element={<DomainServices />}
                    />
                    <Route
                      path="/network-services"
                      element={<NetworkServices />}
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </React.Suspense>

                <React.Suspense fallback={null}>
                  <Chatbot />
                </React.Suspense>
              </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
