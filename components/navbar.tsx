"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor, Bell, Search, Menu, LayoutGrid, Columns, Languages } from "lucide-react";
import { useSidebar } from "@/components/sidebar";
import { useLayout } from "@/components/layout-context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function Navbar() {
  const { setTheme, theme } = useTheme();
  const { isMobileOpen, setMobileOpen } = useSidebar();
  const { layoutMode, setLayoutMode, layoutDirection, setLayoutDirection } = useLayout();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch by waiting for mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
      {/* Left: Mobile Toggle & Automatic Route Breadcrumbs */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 md:hidden text-muted-foreground"
          onClick={() => setMobileOpen(!isMobileOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Dynamic Route Breadcrumbs */}
        <Breadcrumbs />
      </div>

      {/* Right: Actions (Search, Layout Toggle, Theme, Notification, Profile) */}
      <div className="flex items-center gap-4">
        {/* Mock Search Trigger */}
        <button className="hidden md:flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground transition-all-custom hover:bg-muted cursor-pointer w-48">
          <Search className="h-3.5 w-3.5" />
          <span>Search dashboard...</span>
          <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100">
            <span>⌘</span>K
          </kbd>
        </button>

        {/* Small Search Trigger for Mobile */}
        <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden text-muted-foreground">
          <Search className="h-4 w-4" />
        </Button>

        {/* Layout Switcher (Persists in LocalStorage via Context) */}
        {mounted && (
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:bg-secondary hover:text-foreground"
                onClick={() => setLayoutMode(layoutMode === "vertical" ? "horizontal" : "vertical")}
              >
                {layoutMode === "vertical" ? (
                  <LayoutGrid className="h-4 w-4" />
                ) : (
                  <Columns className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="font-medium">
              Switch to {layoutMode === "vertical" ? "Horizontal" : "Vertical"} Layout
            </TooltipContent>
          </Tooltip>
        )}

        {/* RTL / LTR Toggle */}
        {mounted && (
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:bg-secondary hover:text-foreground"
                onClick={() => setLayoutDirection(layoutDirection === "ltr" ? "rtl" : "ltr")}
                aria-label="Toggle text direction"
              >
                <Languages className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="font-medium">
              Switch to {layoutDirection === "ltr" ? "Right-to-Left (RTL)" : "Left-to-Right (LTR)"} Layout
            </TooltipContent>
          </Tooltip>
        )}

        {/* Theme Toggle Button */}
        {mounted && (
          <div className="flex items-center rounded-lg border border-border bg-muted/30 p-1">
            <Button
              variant="ghost"
              size="icon"
              className={`h-7 w-7 rounded-md p-0 ${
                theme === "light"
                  ? "bg-background text-primary shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setTheme("light")}
            >
              <Sun className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-7 w-7 rounded-md p-0 ${
                theme === "dark"
                  ? "bg-background text-primary shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setTheme("dark")}
            >
              <Moon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-7 w-7 rounded-md p-0 ${
                theme === "system"
                  ? "bg-background text-primary shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setTheme("system")}
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Notifications Trigger */}
        <div className="relative">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground relative">
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          </Button>
        </div>

        {/* Profile Avatar */}
        <div className="flex items-center gap-3 border-s border-border ps-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop" alt="User profile photo" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
