"use client";

import * as React from "react";
import { useLayout } from "@/components/layout-context";
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { HorizontalNavbar } from "@/components/horizontal-navbar";
import { usePathname } from "next/navigation";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { layoutMode, mounted } = useLayout();
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");

  if (isAuthPage) {
    return (
      <div className="h-screen w-screen overflow-y-auto bg-zinc-50 dark:bg-zinc-900/40">
        {children}
      </div>
    );
  }

  // SSR / Hydration Fallback: Render standard vertical layout to prevent Cumulative Layout Shift (CLS)
  if (!mounted) {
    return (
      <div className="flex h-screen w-screen overflow-hidden bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto bg-zinc-50/50 p-6 dark:bg-zinc-950/20 md:p-8 animate-page-entrance">
            <div className="mx-auto max-w-7xl space-y-6">{children}</div>
          </main>
        </div>
      </div>
    );
  }

  if (layoutMode === "horizontal") {
    return (
      <div className="flex h-screen w-screen flex-col overflow-hidden bg-background">
        {/* Horizontal Header Navbar */}
        <HorizontalNavbar />

        {/* Mobile Sidebar overlay wrapper (hidden on desktop, slider drawer on mobile) */}
        <Sidebar />

        {/* Main Work Content Viewport */}
        <main className="flex-1 overflow-y-auto bg-zinc-50/50 p-6 dark:bg-zinc-950/20 md:p-8 animate-page-entrance">
          <div className="mx-auto max-w-7xl space-y-6">{children}</div>
        </main>
      </div>
    );
  }

  // Vertical layout mode (Default)
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* Left Collapsible Sidebar */}
      <Sidebar />

      {/* Main workspace container */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Sticky top navbar */}
        <Navbar />

        {/* main scroll area */}
        <main className="flex-1 overflow-y-auto bg-zinc-50/50 p-6 dark:bg-zinc-950/20 md:p-8 animate-page-entrance">
          <div className="mx-auto max-w-7xl space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
