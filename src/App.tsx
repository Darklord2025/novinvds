
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
