"use client";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <div className="pink-dark bg-background text-foreground">
          {children}
        </div>
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default Providers;
