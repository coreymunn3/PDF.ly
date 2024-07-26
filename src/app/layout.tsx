import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "simplebar-react/dist/simplebar.min.css";
import { cn } from "@/lib/utils";
import Provider from "@/components/Provider";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <Provider>
        <body
          className={cn(
            "min-h-screen font-sans antialiased grainy",
            inter.className
          )}
        >
          <Toaster />
          <Navbar /> {children}
        </body>
      </Provider>
    </html>
  );
}
