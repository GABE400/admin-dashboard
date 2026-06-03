"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/app/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { navigationData, NavItem } from "./navigation-data";
import { useLayout } from "@/components/layout-context";

// Sidebar context to share state with layout
interface SidebarContextType {
  isCollapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(
  undefined
);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setCollapsed] = React.useState(false);
  const [isMobileOpen, setMobileOpen] = React.useState(false);

  return (
    <SidebarContext.Provider
      value={{ isCollapsed, setCollapsed, isMobileOpen, setMobileOpen }}
    >
      <TooltipProvider>{children}</TooltipProvider>
    </SidebarContext.Provider>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, setCollapsed, isMobileOpen, setMobileOpen } = useSidebar();
  const { sidebarDensity, layoutMode } = useLayout();
  
  // Track open state of submenus (e.g. Auth Pages, UI Components)
  const [openSubmenus, setOpenSubmenus] = React.useState<Record<string, boolean>>({});

  // Auto-expand active submenus on mount or path change
  React.useEffect(() => {
    navigationData.forEach((section) => {
      section.items.forEach((item) => {
        if (item.children) {
          const hasActiveChild = item.children.some((child) => child.href === pathname);
          if (hasActiveChild) {
            setOpenSubmenus((prev) => ({ ...prev, [item.label]: true }));
          }
        }
      });
    });
  }, [pathname]);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const renderNavItem = (item: NavItem) => {
    const isParentActive = pathname.startsWith(item.href) && item.href !== "/";
    const isActive = pathname === item.href || isParentActive;
    const Icon = item.icon;
    const hasChildren = !!item.children;
    const isSubmenuOpen = !!openSubmenus[item.label];

    // Click handler for links
    const handleLinkClick = (e: React.MouseEvent) => {
      if (hasChildren) {
        e.preventDefault();
        if (isCollapsed) {
          // If collapsed, expand sidebar and open submenu
          setCollapsed(false);
          setOpenSubmenus((prev) => ({ ...prev, [item.label]: true }));
        } else {
          toggleSubmenu(item.label);
        }
      } else {
        setMobileOpen(false);
      }
    };

    const densityPaddings = {
      compact: "py-1.5",
      normal: "py-2.5",
      spacious: "py-3.5",
    };
    const paddingClass = densityPaddings[sidebarDensity] || "py-2.5";

    const linkContent = (
      <Link
        href={hasChildren ? "#" : item.href}
        onClick={handleLinkClick}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 text-sm font-medium transition-all-custom cursor-pointer",
          paddingClass,
          isActive && !hasChildren
            ? "bg-primary text-primary-foreground shadow-xs shadow-primary/25"
            : isParentActive && hasChildren
            ? "text-primary bg-primary/5 dark:bg-primary/10"
            : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          isCollapsed && "justify-center px-2"
        )}
      >
        <Icon className={cn("h-4 w-4 shrink-0", isActive && !hasChildren ? "text-white" : "text-current")} />
        
        {!isCollapsed && (
          <>
            <span className="truncate flex-1">{item.label}</span>
            {item.badge !== undefined && (
              <Badge
                variant={item.badgeVariant || "default"}
                className="ml-auto text-[10px] h-4.5 px-1.5"
              >
                {item.badge}
              </Badge>
            )}
            {hasChildren && (
              isSubmenuOpen ? (
                <ChevronUp className="h-3.5 w-3.5 text-muted-foreground/80" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/80" />
              )
            )}
          </>
        )}
      </Link>
    );

    // If collapsed, render tooltip
    if (isCollapsed) {
      const tooltipLabel = hasChildren
        ? `${item.label} (${item.children?.map((c) => c.label).join(", ")})`
        : item.label;

      return (
        <div key={item.label} className="w-full">
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <div className="w-full">{linkContent}</div>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium">
              {tooltipLabel}
            </TooltipContent>
          </Tooltip>
        </div>
      );
    }

    return (
      <div key={item.label} className="w-full space-y-1">
        {linkContent}
        {/* Render child elements if folders are expanded */}
        {hasChildren && isSubmenuOpen && !isCollapsed && (
          <div className="ps-6 pe-2 py-1 space-y-1 border-s border-sidebar-border/60 ms-5 animate-in slide-in-from-top-1 duration-200">
            {item.children?.map((child) => {
              const isChildActive = pathname === child.href;
              const ChildIcon = child.icon;

              const childDensityPaddings = {
                compact: "py-1",
                normal: "py-1.5",
                spacious: "py-2",
              };
              const childPaddingClass = childDensityPaddings[sidebarDensity] || "py-1.5";

              return (
                <Link
                  key={child.label}
                  href={child.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 text-xs font-medium transition-all-custom cursor-pointer",
                    childPaddingClass,
                    isChildActive
                      ? "text-primary bg-primary/5 dark:bg-primary/10"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <ChildIcon className="h-3 w-3 shrink-0" />
                  <span className="truncate">{child.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-xs md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Frame Container */}
      <aside
        className={cn(
          "fixed inset-y-0 start-0 z-50 flex flex-col border-e border-sidebar-border bg-sidebar-background text-sidebar-foreground transition-sidebar",
          isCollapsed ? "w-[72px]" : "w-[280px]",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          layoutMode === "vertical"
            ? "md:relative md:translate-x-0"
            : "md:-translate-x-full md:hidden"
        )}
      >
        {/* Sidebar Brand Header */}
        <div
          className={cn(
            "flex h-16 items-center border-b border-sidebar-border px-6",
            isCollapsed ? "justify-center px-2" : "justify-between"
          )}
        >
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md shadow-primary/30">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-base tracking-tight bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
                Aether SaaS
              </span>
            )}
          </Link>

          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:bg-sidebar-accent"
              onClick={() => setCollapsed(true)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Grouped Nav Navigation content */}
        <div className="flex-1 overflow-y-auto px-3 py-6 space-y-6">
          {navigationData.map((section) => (
            <div key={section.title} className="space-y-1.5">
              {!isCollapsed && (
                <p className="px-3 text-[10px] font-bold tracking-wider text-muted-foreground/60 uppercase mb-2">
                  {section.title}
                </p>
              )}
              <div className="space-y-1">
                {section.items.map(renderNavItem)}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer layout controls */}
        <div className="border-t border-sidebar-border p-4 flex items-center justify-between">
          {!isCollapsed ? (
            <>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  AC
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold leading-none">Aether Corp</span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">Scale Plan</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:bg-sidebar-accent"
                onClick={() => setCollapsed(true)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 mx-auto text-muted-foreground hover:bg-sidebar-accent"
              onClick={() => setCollapsed(false)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </aside>
    </>
  );
}
