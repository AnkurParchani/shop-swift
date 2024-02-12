import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import Nav from "./components/nav/Nav";
import ThemeProvider from "./ThemeProvider";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shop-Swift",
  description: "One place to order anything",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ThemeProvider>
            <Nav />
            <NextTopLoader color="pink" />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
