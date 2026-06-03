"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Monitor,
  Bell,
  Search,
  Menu,
  Zap,
  ChevronDown,
  LayoutGrid,
  Columns,
  Languages,
} from "lucide-react";
import { useSidebar } from "@/components/sidebar";
import { useLayout } from "@/components/layout-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { navigationData, NavItem } from "./navigation-data";
import { cn } from "@/app/utils";

export function HorizontalNavbar() {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const { isMobileOpen, setMobileOpen } = useSidebar();
  const { layoutMode, setLayoutMode, layoutDirection, setLayoutDirection } = useLayout();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
      {/* Left: Brand Identity & Mobile Hamburger */}
      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 lg:hidden text-muted-foreground"
          onClick={() => setMobileOpen(!isMobileOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md shadow-primary/30">
            <Zap className="h-5 w-5 fill-current" />
          </div>
          <span className="font-bold text-base tracking-tight bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
            Aether SaaS
          </span>
        </Link>
      </div>

      {/* Middle: Horizontal Nav Category items (Hidden on mobile) */}
      <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Horizontal Navigation">
        {navigationData.map((section) => {
          // Check if any route under this section is active
          const isSectionActive = section.items.some((item) => {
            if (item.href === "/" && pathname === "/") return true;
            if (item.href !== "/" && pathname.startsWith(item.href)) return true;
            if (item.children) {
              return item.children.some((child) => pathname === child.href);
            }
            return false;
          });

          return (
            <div key={section.title} className="relative group/menu py-4">
              <button
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-all-custom cursor-pointer",
                  isSectionActive
                    ? "text-primary bg-primary/5 dark:bg-primary/10"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                )}
              >
                <span>{section.title}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover/menu:rotate-180" />
              </button>

              {/* Dropdown Box Menu */}
              <div className="absolute left-0 top-full mt-1 w-56 rounded-xl border border-border bg-popover p-2 shadow-lg opacity-0 invisible translate-y-2 transition-all duration-200 group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 z-50">
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const isItemActive = pathname === item.href || (item.children && item.children.some(c => c.href === pathname));
                    const ItemIcon = item.icon;

                    return (
                      <div key={item.label} className="relative group/subitem">
                        {item.children ? (
                          // If item has sub-links, show dropdown trigger
                          <div className="w-full">
                            <span className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground/80">
                              <ItemIcon className="h-4 w-4" />
                              <span>{item.label}</span>
                            </span>
                            <div className="pl-6 space-y-0.5">
                              {item.children.map((child) => {
                                const isChildActive = pathname === child.href;
                                return (
                                  <Link
                                    key={child.label}
                                    href={child.href}
                                    className={cn(
                                      "flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all-custom cursor-pointer",
                                      isChildActive
                                        ? "text-primary bg-primary/5 dark:bg-primary/10"
                                        : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                                    )}
                                  >
                                    <span>{child.label}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          // Normal link
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium transition-all-custom cursor-pointer",
                              isItemActive
                                ? "bg-primary text-primary-foreground shadow-xs shadow-primary/20"
                                : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                            )}
                          >
                            <ItemIcon className="h-4 w-4 shrink-0" />
                            <span>{item.label}</span>
                            {item.badge !== undefined && (
                              <Badge
                                variant={item.badgeVariant || "default"}
                                className="ml-auto text-[9px] h-4 px-1"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      {/* Right: Actions (Search, Layout Switch, Theme Switch, Profile) */}
      <div className="flex items-center gap-4">
        {/* Mock Search Trigger */}
        <button className="hidden md:flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground transition-all-custom hover:bg-muted cursor-pointer w-48">
          <Search className="h-3.5 w-3.5" />
          <span>Search Console...</span>
        </button>

        {/* Layout Switcher Trigger */}
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

        {/* Theme Select buttons */}
        {mounted && (
          <div className="hidden sm:flex items-center rounded-lg border border-border bg-muted/30 p-1">
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
          </div>
        )}

        {/* Notification indicator */}
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
        <div className="flex items-center ps-4 border-s border-border">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop" alt="User profile photo" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
