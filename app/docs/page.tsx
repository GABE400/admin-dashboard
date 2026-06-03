"use client";

import * as React from "react";
import { BookOpen, FolderTree, Palette, Menu, Globe, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function DocsPage() {
  const [activeSection, setActiveSection] = React.useState<"overview" | "structure" | "customization" | "api">("overview");

  const sidebarItems = [
    { id: "overview", label: "Overview & Stack", icon: BookOpen },
    { id: "structure", label: "Folder Architecture", icon: FolderTree },
    { id: "customization", label: "Theme Customization", icon: Palette },
    { id: "api", label: "API Integration Guide", icon: ShieldCheck },
  ] as const;

  return (
    <div className="space-y-6 animate-page-entrance">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Technical Reference Documentation</h1>
        <p className="text-sm text-muted-foreground mt-1">
          A guide to customizing, scaling, and deploying the Aether SaaS dashboard template.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {/* Sidebar Nav */}
        <div className="md:col-span-1 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-semibold rounded-lg transition-all-custom cursor-pointer text-start ${
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground shadow-xs shadow-primary/20"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Viewer */}
        <div className="md:col-span-3">
          <Card className="border border-border/80">
            <CardContent className="p-6 space-y-6">
              
              {/* SECTION 1: OVERVIEW */}
              {activeSection === "overview" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Badge variant="default" className="bg-primary/10 border-primary/20 text-primary font-bold text-[10px]">
                      Core Platform
                    </Badge>
                    <h2 className="text-xl font-bold text-foreground">Overview & Technology Stack</h2>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Aether SaaS is a premium admin dashboard engineered using Next.js App Router (Turbopack compiler), React 19, and Tailwind CSS v4.
                    </p>
                  </div>
                  <Separator />
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-border/50 bg-muted/20 p-4 space-y-2">
                      <span className="text-xs font-bold text-foreground">Core Architecture</span>
                      <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                        <li>Next.js 16 (App Router compilation)</li>
                        <li>React 19 (Server + Client transitions)</li>
                        <li>TypeScript (Strict typing check)</li>
                        <li>PostCSS & Tailwind v4 layout styling</li>
                      </ul>
                    </div>

                    <div className="rounded-xl border border-border/50 bg-muted/20 p-4 space-y-2">
                      <span className="text-xs font-bold text-foreground">UX Components Library</span>
                      <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                        <li>Radix UI Primitive Portals (dialogs/sheets)</li>
                        <li>Lucide-react modern icon matrix</li>
                        <li>Zod + React Hook Form schema validation</li>
                        <li>next-themes local context providers</li>
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border/50 bg-muted/20 p-4 space-y-2">
                    <span className="text-xs font-bold text-foreground">Sub-page Modules Built</span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      The template compiles ready-to-use workflows: Operational Dashboard, CRM Roster grids, Stateful Event Calendars, Collaborative Chat streams, Billing Invoices ledger, Kanban task boards, User settings profiles, and Interactive reports charts.
                    </p>
                  </div>
                </div>
              )}

              {/* SECTION 2: STRUCTURE */}
              {activeSection === "structure" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Badge variant="default" className="bg-primary/10 border-primary/20 text-primary font-bold text-[10px]">
                      Architecture
                    </Badge>
                    <h2 className="text-xl font-bold text-foreground">Folder Architecture Map</h2>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Aether's structural directory follows standard Next.js conventions:
                    </p>
                  </div>
                  <Separator />

                  <pre className="rounded-xl bg-muted/50 p-4 text-xs font-mono text-muted-foreground border border-border/60 overflow-x-auto whitespace-pre leading-relaxed">
{`admin-dashboard/
├── app/                  # Next.js App Router (Pages, layouts, routers)
│   ├── analytics/        # Analytical charts metrics
│   ├── apps/             # Integrated Apps
│   │   ├── calendar/     # Scheduler page & Add Event schemas
│   │   ├── chat/         # Stateful websocket messaging mockups
│   │   ├── crm/          # Client listing & inline sheet rosters
│   │   ├── invoice/      # PDF logs view & Detail view pages
│   │   └── projects/     # Kanban lists (dnd-kit cards)
│   ├── auth/             # Login, register, strength reset portals
│   ├── dashboard/        # Default KPI dashboard view
│   ├── globals.css       # Tailwind imports & variables base layer
│   ├── layout.tsx        # Global theme and provider allocations
│   └── page.tsx          # Root Redirect segment
├── components/           # Reusable Client / Server Elements
│   ├── ui/               # Radix & Lucide base buttons, cards, sheets
│   ├── sidebar.tsx       # Vertical navigation left drawer
│   ├── navbar.tsx        # Top operational actions console
│   └── layout-wrapper.tsx# Directional & horizontal switches wrapper
├── lib/                  # Helper utilities and data seeds
│   ├── mock-data.ts      # Offline database files
│   └── seed.ts           # JSON mockup generator files
└── tailwind.config.ts    # Tailwind customization assets`}
                  </pre>
                </div>
              )}

              {/* SECTION 3: CUSTOMIZATION */}
              {activeSection === "customization" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Badge variant="default" className="bg-primary/10 border-primary/20 text-primary font-bold text-[10px]">
                      Design Tokens
                    </Badge>
                    <h2 className="text-xl font-bold text-foreground">Theme Customization (Tailwind v4)</h2>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Aether utilizes Tailwind CSS v4's CSS-first layout configuration. Styles are defined as CSS variables under <code>app/globals.css</code>.
                    </p>
                  </div>
                  <Separator />

                  <div className="space-y-3 text-xs text-muted-foreground">
                    <h3 className="font-bold text-foreground">1. Customizing Colors</h3>
                    <p className="leading-relaxed">
                      To change colors, update the HSL values in the `:root` and `.dark` blocks in <code>app/globals.css</code>:
                    </p>
                    <pre className="rounded-lg bg-muted/50 p-3 font-mono text-muted-foreground border border-border/50 overflow-x-auto">
{`:root {
  --primary: 243.4 75.4% 58.6%; /* Custom HSL values */
  --background: 0 0% 100%;
}
.dark {
  --primary: 243.4 75.4% 58.6%;
  --background: 240 10% 3.9%;
}`}
                    </pre>

                    <h3 className="font-bold text-foreground pt-2">2. Adding Navigation Links</h3>
                    <p className="leading-relaxed">
                      Navigation arrays are defined inside <code>components/navigation-data.ts</code>. Add elements to this array to dynamically render items:
                    </p>
                    <pre className="rounded-lg bg-muted/50 p-3 font-mono text-muted-foreground border border-border/50 overflow-x-auto">
{`export const navigationData = [
  {
    title: "System Navigation",
    items: [
      { label: "New Route", href: "/new-page", icon: Globe }
    ]
  }
];`}
                    </pre>
                  </div>
                </div>
              )}

              {/* SECTION 4: API */}
              {activeSection === "api" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Badge variant="default" className="bg-primary/10 border-primary/20 text-primary font-bold text-[10px]">
                      Integrations
                    </Badge>
                    <h2 className="text-xl font-bold text-foreground">Connecting a Real API</h2>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      To swap mock data files (<code>lib/mock-data.ts</code>) with real RESTful database calls, execute the following implementation paths:
                    </p>
                  </div>
                  <Separator />

                  <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
                    <h3 className="font-bold text-foreground">1. Creating API Route Handlers</h3>
                    <p>
                      Create Next.js Route handlers in <code>app/api/contacts/route.ts</code> to fetch from external servers:
                    </p>
                    <pre className="rounded-lg bg-muted/50 p-3 font-mono text-muted-foreground border border-border/50 overflow-x-auto">
{`import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.yourdomain.com/v1/contacts", {
    headers: { "Authorization": \`Bearer \${process.env.API_SECRET_KEY}\` }
  });
  const data = await res.json();
  return NextResponse.json(data);
}`}
                    </pre>

                    <h3 className="font-bold text-foreground pt-2">2. Client-Side Data Swapping</h3>
                    <p>
                      Replace static variables with client `fetch()` calls or libraries like TanStack Query (React Query) inside page files:
                    </p>
                    <pre className="rounded-lg bg-muted/50 p-3 font-mono text-muted-foreground border border-border/50 overflow-x-auto">
{`React.useEffect(() => {
  async function loadData() {
    setIsLoading(true);
    const res = await fetch("/api/contacts");
    const json = await res.json();
    setContacts(json);
    setIsLoading(false);
  }
  loadData();
}, []);`}
                    </pre>
                  </div>
                </div>
              )}

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
