import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ProjectDetail from "@/pages/ProjectDetail";
import { VideoLoader } from "@/components/VideoLoader";
import { BrowserRouter } from "react-router-dom";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/work/:id" component={ProjectDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <div className="relative">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipProvider>
            <VideoLoader>
              <Toaster />
              <Router />
            </VideoLoader>
          </TooltipProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;