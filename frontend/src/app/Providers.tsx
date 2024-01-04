"use client";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <div className="pink-dark bg-background text-foreground">
          {children}
        </div>
        <ToastContainer />
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default Providers;
