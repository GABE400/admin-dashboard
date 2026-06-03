"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  Tag,
  AlignLeft,
  Info,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/app/utils";

// --- VALIDATION SCHEMA ---
const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  category: z.enum(["meetings", "work", "personal", "urgent"]),
  description: z.string().optional(),
});

type EventFormValues = z.infer<typeof eventSchema>;

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  category: "meetings" | "work" | "personal" | "urgent";
  description?: string;
}

// Initial Events Mock
const initialEvents: CalendarEvent[] = [
  {
    id: "ev-1",
    title: "API Design Refactoring sync",
    date: "2026-06-03",
    startTime: "10:00",
    endTime: "11:30",
    category: "meetings",
    description: "Review endpoints structure and path mapping parameters with development leads."
  },
  {
    id: "ev-2",
    title: "Deploy V4 Core Grid engine",
    date: "2026-06-05",
    startTime: "14:00",
    endTime: "15:00",
    category: "work",
    description: "Push dashboard layouts and v4 layout persistence configs to staging servers."
  },
  {
    id: "ev-3",
    title: "Sarah Watson 1-on-1 checkin",
    date: "2026-06-03",
    startTime: "16:00",
    endTime: "16:45",
    category: "meetings",
    description: "Quarterly alignment, reviews, and developer performance milestones review."
  },
  {
    id: "ev-4",
    title: "Renew Domain Registrations",
    date: "2026-06-12",
    startTime: "09:00",
    endTime: "09:30",
    category: "personal",
    description: "Auto renewal verification check for aether-saas.com."
  },
  {
    id: "ev-5",
    title: "CRITICAL: Database Backup Migration",
    date: "2026-06-20",
    startTime: "01:00",
    endTime: "03:00",
    category: "urgent",
    description: "Copy cold shards over to backup cluster replicas during low traffic hours."
  }
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = React.useState(new Date(2026, 5, 1)); // June 2026
  const [events, setEvents] = React.useState<CalendarEvent[]>(initialEvents);
  const [activeFilters, setActiveFilters] = React.useState<string[]>(["meetings", "work", "personal", "urgent"]);
  
  // Selection/Modal states
  const [selectedEvent, setSelectedEvent] = React.useState<CalendarEvent | null>(null);
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [selectedDateStr, setSelectedDateStr] = React.useState("");

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      date: "",
      startTime: "09:00",
      endTime: "10:00",
      category: "work",
      description: "",
    },
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Navigation handlers
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date(2026, 5, 1)); // Default back to June 2026 template anchor
  };

  // Toggle Filters
  const handleToggleFilter = (cat: string) => {
    setActiveFilters((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Create event submission
  const onSubmitEvent = (values: EventFormValues) => {
    const newEvent: CalendarEvent = {
      id: `ev-${Date.now()}`,
      title: values.title,
      date: values.date,
      startTime: values.startTime,
      endTime: values.endTime,
      category: values.category,
      description: values.description,
    };
    setEvents((prev) => [...prev, newEvent]);
    setIsCreateOpen(false);
    form.reset();
  };

  // Open Create Dialog on day click
  const handleDayClick = (dateStr: string) => {
    setSelectedDateStr(dateStr);
    form.setValue("date", dateStr);
    setIsCreateOpen(true);
  };

  // Open Event Details
  const handleEventClick = (e: React.MouseEvent, eventItem: CalendarEvent) => {
    e.stopPropagation(); // Avoid triggering day click
    setSelectedEvent(eventItem);
    setIsDetailOpen(true);
  };

  // Generate Month Grid days
  const days = React.useMemo(() => {
    const daysArr = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday, 1 is Monday...
    const prevMonthDays = new Date(year, month, 0).getDate();

    // Fill preceding days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      const mStr = String(month === 0 ? 12 : month).padStart(2, "0");
      const yStr = month === 0 ? year - 1 : year;
      daysArr.push({
        day: d,
        isCurrentMonth: false,
        dateString: `${yStr}-${mStr}-${String(d).padStart(2, "0")}`,
      });
    }

    // Fill current month days
    for (let i = 1; i <= daysInMonth; i++) {
      daysArr.push({
        day: i,
        isCurrentMonth: true,
        dateString: `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`,
      });
    }

    // Pad remaining slots
    const totalSlots = daysArr.length <= 35 ? 35 : 42;
    const remaining = totalSlots - daysArr.length;
    for (let i = 1; i <= remaining; i++) {
      const mStr = String(month === 11 ? 1 : month + 2).padStart(2, "0");
      const yStr = month === 11 ? year + 1 : year;
      daysArr.push({
        day: i,
        isCurrentMonth: false,
        dateString: `${yStr}-${mStr}-${String(i).padStart(2, "0")}`,
      });
    }

    return daysArr;
  }, [year, month]);

  const monthLabel = currentDate.toLocaleString(undefined, {
    month: "long",
    year: "numeric",
  });

  const categoryThemes = {
    meetings: { bg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/25", dot: "bg-indigo-500" },
    work: { bg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25", dot: "bg-blue-500" },
    personal: { bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25", dot: "bg-emerald-500" },
    urgent: { bg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25", dot: "bg-rose-500" },
  };

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Schedule Calendar</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Organize meetings, schedule sprint milestones, and track deadlines.
          </p>
        </div>
        <Button onClick={() => {
          setSelectedDateStr("");
          form.reset();
          setIsCreateOpen(true);
        }} className="gap-2 cursor-pointer">
          <Plus className="h-4 w-4" /> New Event task
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {/* Sidebar Filter Panel */}
        <div className="space-y-6 md:col-span-1">
          {/* Category Filter Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold">Event Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {(["meetings", "work", "personal", "urgent"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleToggleFilter(cat)}
                  className={cn(
                    "flex items-center justify-between w-full p-2.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all duration-200 text-left",
                    activeFilters.includes(cat)
                      ? "bg-secondary/40 border-border/80 text-foreground"
                      : "border-transparent text-muted-foreground opacity-60 hover:opacity-100"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className={cn("h-2.5 w-2.5 rounded-full shrink-0", categoryThemes[cat].dot)} />
                    <span className="capitalize">{cat}</span>
                  </div>
                  <Badge variant="outline" className="text-[9px] py-0 px-1 font-bold">
                    {events.filter((ev) => ev.category === cat).length}
                  </Badge>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Event list */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold">Upcoming Agenda</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/60 max-h-96 overflow-y-auto px-4 pb-4">
                {events
                  .filter((ev) => activeFilters.includes(ev.category))
                  .map((ev) => (
                    <div
                      key={ev.id}
                      onClick={() => {
                        setSelectedEvent(ev);
                        setIsDetailOpen(true);
                      }}
                      className="py-3 hover:bg-muted/10 cursor-pointer transition-colors group space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className={cn("capitalize text-[9px] py-0 px-1.5 font-bold shadow-none", categoryThemes[ev.category].bg)}
                        >
                          {ev.category}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground font-semibold">
                          {ev.startTime}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                        {ev.title}
                      </h4>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {ev.date}
                      </p>
                    </div>
                  ))}
                {events.length === 0 && (
                  <p className="p-4 text-center text-xs text-muted-foreground">No events recorded.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Calendar Viewport Grid */}
        <div className="md:col-span-3">
          <Card className="border border-border/80">
            <CardHeader className="pb-4 border-b border-border/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-extrabold text-foreground">{monthLabel}</CardTitle>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" onClick={handlePrevMonth} className="h-8 w-8 p-0 cursor-pointer">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleToday} className="h-8 text-xs font-bold cursor-pointer">
                  Today
                </Button>
                <Button variant="outline" size="sm" onClick={handleNextMonth} className="h-8 w-8 p-0 cursor-pointer">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Day Titles Header */}
              <div className="grid grid-cols-7 border-b border-border text-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted/15 py-2">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              {/* Calendar Grid Day cells */}
              <div className="grid grid-cols-7 divide-x divide-y divide-border/60 border-b border-border">
                {days.map((day, idx) => {
                  const dayEvents = events.filter(
                    (ev) => ev.date === day.dateString && activeFilters.includes(ev.category)
                  );
                  return (
                    <div
                      key={idx}
                      onClick={() => handleDayClick(day.dateString)}
                      className={cn(
                        "min-h-24 sm:min-h-28 p-2 transition-colors cursor-pointer select-none relative hover:bg-muted/10 group flex flex-col justify-between",
                        day.isCurrentMonth ? "bg-card" : "bg-muted/20 text-muted-foreground/50",
                        day.dateString === "2026-06-03" && "bg-primary/5 dark:bg-primary/10 border-2 border-primary/40"
                      )}
                    >
                      {/* Day count header */}
                      <div className="flex items-center justify-between">
                        <span
                          className={cn(
                            "text-xs font-extrabold rounded-full flex h-6 w-6 items-center justify-center",
                            day.dateString === "2026-06-03" && "bg-primary text-primary-foreground font-black shadow-xs shadow-primary/20",
                            !day.isCurrentMonth && "text-muted-foreground/40"
                          )}
                        >
                          {day.day}
                        </span>
                        
                        {/* Event count badges on small mobile screens */}
                        {dayEvents.length > 0 && (
                          <span className="sm:hidden h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>

                      {/* Events wrapper */}
                      <div className="hidden sm:block space-y-1 mt-2 flex-1 overflow-hidden">
                        {dayEvents.slice(0, 3).map((ev) => (
                          <div
                            key={ev.id}
                            onClick={(e) => handleEventClick(e, ev)}
                            className={cn(
                              "text-[10px] font-bold p-1 rounded-sm border truncate leading-none capitalize",
                              categoryThemes[ev.category].bg
                            )}
                          >
                            {ev.title}
                          </div>
                        ))}
                        {dayEvents.length > 3 && (
                          <span className="text-[9px] text-muted-foreground font-semibold pl-1 block">
                            +{dayEvents.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ================= ADD EVENT MODAL ================= */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" /> Add Calendar Event
            </DialogTitle>
            <DialogDescription>
              Create a new agenda item. Submissions are client validated via Zod.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmitEvent)} className="space-y-4 py-2">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Event Title</label>
              <input
                type="text"
                placeholder="Product strategy checkpoint"
                {...form.register("title")}
                className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary"
              />
              {form.formState.errors.title && (
                <p className="text-xs text-red-500 font-medium">{form.formState.errors.title.message}</p>
              )}
            </div>

            {/* Date and category in row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Date</label>
                <input
                  type="date"
                  {...form.register("date")}
                  className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary"
                />
                {form.formState.errors.date && (
                  <p className="text-xs text-red-500 font-medium">{form.formState.errors.date.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Category</label>
                <select
                  {...form.register("category")}
                  className="w-full h-9 rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  <option value="work">Work</option>
                  <option value="meetings">Meetings</option>
                  <option value="personal">Personal</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            {/* Start and End Times in row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Start Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="time"
                    {...form.register("startTime")}
                    className="w-full h-9 rounded-lg border border-border bg-background pl-9 pr-3 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary"
                  />
                </div>
                {form.formState.errors.startTime && (
                  <p className="text-xs text-red-500 font-medium">{form.formState.errors.startTime.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">End Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="time"
                    {...form.register("endTime")}
                    className="w-full h-9 rounded-lg border border-border bg-background pl-9 pr-3 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary"
                  />
                </div>
                {form.formState.errors.endTime && (
                  <p className="text-xs text-red-500 font-medium">{form.formState.errors.endTime.message}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Description</label>
              <textarea
                rows={3}
                placeholder="Include agenda scope, participants, or call links..."
                {...form.register("description")}
                className="w-full rounded-lg border border-border bg-background p-3 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary resize-none"
              />
            </div>

            <Separator />

            <DialogFooter className="pt-2">
              <Button type="button" variant="ghost" onClick={() => setIsCreateOpen(false)} className="cursor-pointer">
                Cancel
              </Button>
              <Button type="submit" className="cursor-pointer font-semibold shadow-xs">
                Create Event
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ================= EVENT DETAILS MODAL ================= */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        {selectedEvent && (
          <DialogContent>
            <DialogHeader>
              <div className="flex items-center justify-between pr-6">
                <Badge
                  variant="outline"
                  className={cn("capitalize text-[9px] py-0 px-2 font-bold shadow-none", categoryThemes[selectedEvent.category].bg)}
                >
                  {selectedEvent.category}
                </Badge>
              </div>
              <DialogTitle className="text-base font-extrabold text-foreground mt-2 leading-tight">
                {selectedEvent.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Task detailed scope view.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2 text-sm text-foreground">
              {/* Timing */}
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <span className="font-semibold text-foreground/90 block">Date and Duration</span>
                  <span className="text-xs text-muted-foreground">
                    {selectedEvent.date} @ {selectedEvent.startTime} - {selectedEvent.endTime}
                  </span>
                </div>
              </div>

              {/* Description */}
              {selectedEvent.description && (
                <div className="flex items-start gap-3">
                  <AlignLeft className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-semibold text-foreground/90 block">Agenda & Scope</span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {selectedEvent.description}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            <DialogFooter className="pt-2 flex items-center justify-between">
              <Button
                type="button"
                variant="ghost"
                className="text-red-500 hover:text-red-600 hover:bg-red-500/10 text-xs cursor-pointer h-8 px-3"
                onClick={() => {
                  setEvents((prev) => prev.filter((ev) => ev.id !== selectedEvent.id));
                  setIsDetailOpen(false);
                }}
              >
                Delete Event
              </Button>
              <Button type="button" onClick={() => setIsDetailOpen(false)} className="cursor-pointer h-8 px-4 font-semibold shadow-xs">
                Dismiss
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
