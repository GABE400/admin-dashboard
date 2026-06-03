"use client";

import * as React from "react";
import Link from "next/link";
import {
  User,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  GitPullRequest,
  CheckSquare,
  MessageSquare,
  Globe,
  Settings,
  PlusCircle,
  ExternalLink,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/app/utils";

interface Activity {
  id: string;
  type: "code" | "task" | "comment" | "project";
  description: string;
  target: string;
  time: string;
}

interface AssignedProject {
  id: string;
  title: string;
  company: string;
  progress: number;
  status: "active" | "completed" | "delayed";
}

const activities: Activity[] = [
  { id: "act-1", type: "code", description: "Merged pull request", target: "PR #142 - Refactor Recharts hydration client-check", time: "2 hours ago" },
  { id: "act-2", type: "task", description: "Created backlog milestone ticket", target: "Configure layout density persist tokens", time: "5 hours ago" },
  { id: "act-3", type: "comment", description: "Commented on invoice details bug", target: "Receipt PDF mockup rendering layout", time: "1 day ago" },
  { id: "act-4", type: "project", description: "Completed project phase", target: "CRM Filters & Pagination modules release", time: "3 days ago" },
  { id: "act-5", type: "code", description: "Pushed updates to AWS pipeline", target: "Branch master - build compilation checks", time: "4 days ago" },
];

const assignedProjects: AssignedProject[] = [
  { id: "p-1", title: "Aether SaaS Console Integration", company: "Aether Corporation", progress: 84.2, status: "active" },
  { id: "p-2", title: "Global DNS Routing Edge", company: "Wayne Enterprises", progress: 100, status: "completed" },
  { id: "p-3", title: "Cyberdyne Systems API Audit", company: "Cyberdyne Systems", progress: 35.5, status: "delayed" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState<"timeline" | "projects">("timeline");

  return (
    <div className="space-y-6">
      {/* 1. Header Cover and Avatar container */}
      <div className="space-y-4">
        {/* Cover Banner */}
        <div className="h-44 w-full bg-gradient-to-r from-primary via-indigo-600 to-violet-850 relative overflow-hidden rounded-xl shadow-inner">
          {/* Glowing Graphic elements */}
          <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 left-1/4 h-24 w-48 bg-indigo-500/30 rounded-full blur-xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px]" />
        </div>

        {/* Profile Info Row Overlay */}
        <div className="relative px-4 sm:px-6 flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 sm:-mt-12">
          <div className="relative h-28 w-28 rounded-full border-4 border-card bg-card overflow-hidden shadow-lg shrink-0">
            <Avatar className="h-full w-full">
              <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256" alt="Emma Watson" />
              <AvatarFallback className="text-xl font-bold">EW</AvatarFallback>
            </Avatar>
            <span className="absolute bottom-1 right-2 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-card" />
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1.5 pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2 className="text-xl font-extrabold text-foreground leading-none">Emma Watson</h2>
              <Badge variant="secondary" className="w-fit mx-auto sm:mx-0 text-[10px] py-0 px-2 font-bold bg-primary/10 text-primary border-primary/10">
                Staff Administrator
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground font-semibold flex items-center justify-center sm:justify-start gap-1 leading-none">
              <Briefcase className="h-3 w-3 text-muted-foreground" /> Senior Product Engineering Lead
            </p>
            <p className="text-xs text-muted-foreground flex items-center justify-center sm:justify-start gap-1 leading-none">
              <MapPin className="h-3 w-3 text-muted-foreground" /> New York, NY (EST)
            </p>
          </div>

          <div className="pb-2">
            <Link href="/settings">
              <Button variant="outline" className="gap-2 cursor-pointer font-semibold shadow-xs">
                <Settings className="h-4 w-4" /> Edit Profile Console
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Core Statistics Row */}
      <div className="grid gap-4 grid-cols-3">
        <Card className="border border-border/80 text-center">
          <CardContent className="p-4 sm:p-6 space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-primary">12</span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
              Active Projects
            </span>
          </CardContent>
        </Card>

        <Card className="border border-border/80 text-center">
          <CardContent className="p-4 sm:p-6 space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-primary">1,240</span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
              Hours Logged
            </span>
          </CardContent>
        </Card>

        <Card className="border border-border/80 text-center">
          <CardContent className="p-4 sm:p-6 space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-primary">94%</span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
              Task Velocity
            </span>
          </CardContent>
        </Card>
      </div>

      {/* 3. Main Split Column Grid Layout */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column: Profile Card Mocks */}
        <div className="space-y-6 md:col-span-1">
          {/* Personal Bio details */}
          <Card className="border border-border/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold">About Emma</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <p className="text-muted-foreground leading-relaxed">
                Emma Watson leads Core System Integrations and Visual layouts at Aether SaaS. Focuses on TypeScript validation mechanisms, real-time charts hydration, and layout optimization.
              </p>
              
              <Separator />
              
              <div className="space-y-3 leading-tight font-medium text-foreground">
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="truncate">emma.watson@aether.com</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>+1 (555) 482-9210</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-primary hover:underline cursor-pointer truncate flex items-center gap-0.5">
                    aether.com/emma <ExternalLink className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skillset list tags */}
          <Card className="border border-border/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold">Primary Skills</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1.5 pt-1">
              {["Next.js", "React 19", "Tailwind CSS v4", "TypeScript 5", "Zod Schema", "GraphQL", "AWS Lambda", "PostgreSQL", "Data Vis / Recharts"].map((skill) => (
                <Badge key={skill} variant="outline" className="text-[10px] py-0.5 px-2 bg-muted/30 border-border/60 text-muted-foreground font-semibold">
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Stateful tab panels */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Navigation Toggle Tab Header */}
          <div className="flex bg-muted/40 rounded-lg p-1 border border-border/60 w-fit gap-1 select-none">
            <button
              onClick={() => setActiveTab("timeline")}
              className={cn(
                "px-4 py-1.5 rounded-md text-xs font-bold cursor-pointer transition-all duration-200",
                activeTab === "timeline"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Recent Timeline
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={cn(
                "px-4 py-1.5 rounded-md text-xs font-bold cursor-pointer transition-all duration-200",
                activeTab === "projects"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Assigned Projects
            </button>
          </div>

          {/* Tab Content Display */}
          <Card className="border border-border/80">
            <CardContent className="p-6">
              
              {/* TIMELINE TAB */}
              {activeTab === "timeline" && (
                <div className="space-y-6 relative border-l border-border pl-6 ml-4 py-2 select-none">
                  {activities.map((act) => (
                    <div key={act.id} className="relative space-y-1.5">
                      {/* Timeline dot icon indicator */}
                      <span className="absolute -left-10 top-0.5 h-7 w-7 rounded-full bg-card border border-border flex items-center justify-center text-primary shadow-xs">
                        {act.type === "code" && <GitPullRequest className="h-3.5 w-3.5" />}
                        {act.type === "task" && <PlusCircle className="h-3.5 w-3.5" />}
                        {act.type === "comment" && <MessageSquare className="h-3.5 w-3.5" />}
                        {act.type === "project" && <CheckSquare className="h-3.5 w-3.5" />}
                      </span>

                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-bold text-foreground">
                          {act.description}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-semibold">
                          {act.time}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {act.target}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* PROJECTS TAB */}
              {activeTab === "projects" && (
                <div className="space-y-4">
                  {assignedProjects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-4 rounded-xl border border-border/80 hover:border-primary/20 transition-all duration-200 space-y-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h4 className="text-xs font-extrabold text-foreground leading-tight">{proj.title}</h4>
                          <span className="text-[10px] text-muted-foreground font-semibold leading-none mt-1 block">{proj.company}</span>
                        </div>
                        <Badge
                          variant={proj.status === "completed" ? "success" : proj.status === "delayed" ? "destructive" : "default"}
                          className="capitalize text-[9px] py-0 px-2 h-fit"
                        >
                          {proj.status}
                        </Badge>
                      </div>

                      {/* Progress bar info */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground">
                          <span>Sprint Progress</span>
                          <span className="text-foreground">{proj.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-muted dark:bg-zinc-800 overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              proj.status === "completed" ? "bg-emerald-500" : proj.status === "delayed" ? "bg-rose-500" : "bg-primary"
                            )}
                            style={{ width: `${proj.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
