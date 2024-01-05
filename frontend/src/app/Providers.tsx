"use client";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <div className="pink-dark bg-background text-foreground">
          {children}
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          newestOnTop
          theme="dark"
          transition={Slide}
        />
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default Providers;
