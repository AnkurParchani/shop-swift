"use client";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
import { Slide, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <NextUIProvider>
          <div className="bg-background text-foreground pink-dark">
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
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default Providers;
