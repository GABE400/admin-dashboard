"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/app/utils";

const segmentNames: Record<string, string> = {
  apps: "Apps",
  crm: "CRM",
  ui: "UI Elements",
  auth: "Authentication",
  signin: "Sign In",
  signup: "Sign Up",
  profile: "Profile",
  settings: "Settings",
  pricing: "Pricing",
  analytics: "Analytics",
  reports: "Reports",
};

function formatSegment(segment: string) {
  if (segmentNames[segment]) return segmentNames[segment];
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function Breadcrumbs() {
  const pathname = usePathname();
  
  const pathSegments = React.useMemo(() => {
    return pathname.split("/").filter((segment) => segment !== "");
  }, [pathname]);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground select-none">
      <Link
        href="/"
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Home className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Console</span>
      </Link>

      {pathSegments.length > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground/60" />}

      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const isLast = index === pathSegments.length - 1;
        const label = formatSegment(segment);

        return (
          <React.Fragment key={href}>
            {index > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground/60" />}
            {isLast ? (
              <span className="font-semibold text-foreground truncate max-w-[120px] sm:max-w-none">
                {label}
              </span>
            ) : (
              <Link
                href={href}
                className="hover:text-foreground transition-colors truncate max-w-[120px] sm:max-w-none"
              >
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
