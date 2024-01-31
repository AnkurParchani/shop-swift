"use client";

import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
import { Slide, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import BreadCrumbProvider from "./contexts/BreadCrumbProvider";
import { useEffect, useState } from "react";

function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  const [inBrowser, setInBrowser] = useState(false);

  // For Internal Error: Document is not defined
  useEffect(() => {
    const isBrowser = typeof window !== "undefined";
    if (isBrowser) setInBrowser(true);
  }, []);

  if (!inBrowser) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CookiesProvider>
          <BreadCrumbProvider>
            <NextUIProvider>
              <div className="min-h-screen bg-background text-foreground pink-dark">
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
          </BreadCrumbProvider>
        </CookiesProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default Providers;
