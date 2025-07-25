import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientOnly from "@/components/ClientOnly";
import BrowserExtensionCleanup from "@/components/BrowserExtensionCleanup";
import HydrationErrorBoundary from "@/components/HydrationErrorBoundary";

export const metadata: Metadata = {
  title: "MORENT - Car Rental Platform",
  description: "The Best Platform for Car Rental",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent browser extensions from modifying the DOM */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <HydrationErrorBoundary>
          <BrowserExtensionCleanup />
          <ClientOnly
            fallback={
              <div className="h-16 bg-white border-b border-gray-100" />
            }>
            <Header />
          </ClientOnly>
          <main className="min-h-screen">{children}</main>
          <ClientOnly
            fallback={
              <div className="h-32 bg-white border-t border-gray-100" />
            }>
            <Footer />
          </ClientOnly>
        </HydrationErrorBoundary>
      </body>
    </html>
  );
}
