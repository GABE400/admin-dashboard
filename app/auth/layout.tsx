import * as React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left side: Branding (hidden on mobile) */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-zinc-950 p-10 text-white md:flex">
        {/* Backdrop Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-indigo-600 to-violet-850 opacity-95" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-indigo-500/25 blur-3xl" />
        
        {/* Brand Header */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-lg shadow-black/10">
              <Zap className="h-6 w-6 fill-current" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              Aether SaaS
            </span>
          </Link>
        </div>

        {/* Product Tagline & Value Props */}
        <div className="relative z-10 space-y-6 my-auto max-w-lg">
          <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
            Command your cloud metrics with next-gen agentic analytics.
          </h2>
          <p className="text-sm text-zinc-200/80">
            Integrate all CRM data pools, build multi-stage Kanban project pipelines, and generate client-ready invoices with state-of-the-art visuals.
          </p>
          
          <div className="pt-6 border-t border-white/10">
            <p className="text-sm italic text-zinc-300">
              "Aether has completely transformed our agency operations. The speed of layout rendering and state syncing feels instantaneous."
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-xs font-bold text-white">
                SR
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-none">Sarah Rogers</p>
                <p className="text-[10px] text-zinc-400 mt-1 leading-none">Director of DevOps, Tyrell Corp</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-xs text-zinc-400">
          &copy; {new Date().getFullYear()} Aether Corporation. All rights reserved.
        </div>
      </div>

      {/* Right side: Auth Form card viewport */}
      <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          {/* Logo showing on mobile */}
          <div className="flex justify-center md:hidden mb-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md shadow-primary/30">
                <Zap className="h-5 w-5 fill-current" />
              </div>
              <span className="font-bold text-base tracking-tight text-foreground">
                Aether SaaS
              </span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
