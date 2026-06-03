"use client";

import * as React from "react";
import { DndContext, DragEndEvent, useDraggable, useDroppable } from "@dnd-kit/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Plus,
  MessageSquare,
  Calendar,
  Layers,
  ChevronDown,
  UserPlus,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { mockKanbanBoard, KanbanColumn, KanbanCard } from "@/lib/mock-data";
import { cn } from "@/app/utils";

// Zod Schema for Project Creation
const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string().min(1, "Due date is required"),
  columnId: z.enum(["backlog", "in-progress", "review", "done"]),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

// --- DROPPABLE COLUMN ---
function BoardColumn({
  column,
  children,
}: {
  column: KanbanColumn;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex flex-col flex-1 min-w-[280px] bg-secondary/10 dark:bg-zinc-950/20 border border-border/60 rounded-xl p-4 space-y-4">
      {/* Column Title Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-sm text-foreground">{column.title}</h3>
          <Badge variant="outline" className="h-5 text-[10px] px-1.5 font-bold">
            {column.cards.length}
          </Badge>
        </div>
      </div>

      {/* Cards list container */}
      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 min-h-[450px] rounded-lg transition-colors p-1 space-y-3",
          isOver && "bg-secondary/40 border border-dashed border-primary/20"
        )}
      >
        {children}
        {column.cards.length === 0 && (
          <div className="flex h-40 flex-col items-center justify-center border border-dashed border-border/60 rounded-lg text-center p-4">
            <span className="text-[11px] text-muted-foreground">Drop task cards here</span>
          </div>
        )}
      </div>
    </div>
  );
}

// --- DRAGGABLE CARD ---
function BoardCard({ card }: { card: KanbanCard }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: card.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "bg-card text-card-foreground border border-border/80 rounded-lg p-4 shadow-xs hover:shadow-md cursor-grab active:cursor-grabbing hover:border-primary/20 transition-all duration-200 select-none space-y-3",
        isDragging && "opacity-40 border-primary"
      )}
    >
      {/* Title */}
      <h4 className="text-xs font-semibold leading-normal text-foreground group-hover:text-primary">
        {card.title}
      </h4>

      {/* Footer Meta Row */}
      <div className="flex items-center justify-between gap-2 pt-1">
        {/* Avatars group overlapping */}
        <div className="flex -space-x-1.5 overflow-hidden">
          {card.assignees.map((as, idx) => (
            <Avatar key={idx} className="h-5.5 w-5.5 border-2 border-card">
              <AvatarImage src={as.avatar} alt={as.name} />
              <AvatarFallback className="text-[8px] font-bold">
                {as.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>

        {/* Priority and Meta info */}
        <div className="flex items-center gap-2">
          {/* Comments badge */}
          {card.comments > 0 && (
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <MessageSquare className="h-3 w-3" />
              {card.comments}
            </span>
          )}

          {/* Due date */}
          <span className="flex items-center gap-0.5 text-[9px] text-muted-foreground font-medium">
            <Calendar className="h-3 w-3 mr-0.5" />
            {new Date(card.dueDate).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </span>

          {/* Priority badge */}
          <Badge
            variant={
              card.priority === "high"
                ? "destructive"
                : card.priority === "medium"
                ? "default"
                : "secondary"
            }
            className="text-[9px] h-4.5 py-0 px-1.5 capitalize font-semibold shadow-none border-0"
          >
            {card.priority}
          </Badge>
        </div>
      </div>
    </div>
  );
}

// --- MAIN KANBAN PAGE ---
export default function ProjectsPage() {
  const [boardColumns, setBoardColumns] = React.useState<KanbanColumn[]>(mockKanbanBoard);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Zod form initialization
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      columnId: "backlog",
    },
  });

  // Handle Drag Ending
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const cardId = active.id as string;
    const overColId = over.id as string;

    // Find if the card is in a different column
    let sourceCol: KanbanColumn | null = null;
    let targetCard: KanbanCard | null = null;

    boardColumns.forEach((col) => {
      const found = col.cards.find((c) => c.id === cardId);
      if (found) {
        sourceCol = col;
        targetCard = found;
      }
    });

    if (!sourceCol || !targetCard || (sourceCol as KanbanColumn).id === overColId) {
      return; // No drop target, or dropped in same column
    }

    // Update board columns state
    const updated = boardColumns.map((col) => {
      // Remove from source
      if (col.id === (sourceCol as unknown as KanbanColumn).id) {
        return {
          ...col,
          cards: col.cards.filter((c) => c.id !== cardId),
        };
      }
      // Add to target
      if (col.id === overColId) {
        return {
          ...col,
          cards: [...col.cards, targetCard as unknown as KanbanCard],
        };
      }
      return col;
    });

    setBoardColumns(updated);
  };

  // Handle Project Form Submission
  const onSubmit = (values: ProjectFormValues) => {
    const newCard: KanbanCard = {
      id: `proj-${Date.now()}`,
      title: values.title,
      assignees: [
        {
          name: "Emma Watson",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=64",
        },
      ],
      priority: values.priority,
      dueDate: values.dueDate,
      comments: 0,
    };

    const updated = boardColumns.map((col) => {
      if (col.id === values.columnId) {
        return {
          ...col,
          cards: [...col.cards, newCard],
        };
      }
      return col;
    });

    setBoardColumns(updated);
    setIsModalOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Project Boards</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track product milestones, task backlogs, and cross-team development tickets.
          </p>
        </div>
        <div>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" /> New Project Task
          </Button>
        </div>
      </div>

      {/* DndContext drag drop boundary */}
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col lg:flex-row gap-5 overflow-x-auto pb-4 select-none">
          {boardColumns.map((col) => (
            <BoardColumn key={col.id} column={col}>
              {col.cards.map((card) => (
                <BoardCard key={card.id} card={card} />
              ))}
            </BoardColumn>
          ))}
        </div>
      </DndContext>

      {/* ================= NEW PROJECT TASK MODAL (DIALOG) ================= */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" /> Create Project Task
            </DialogTitle>
            <DialogDescription>
              Submit a new milestone ticket. Validations verify fields on submit.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-3">
            {/* Title Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Task Title
              </label>
              <input
                type="text"
                placeholder="Database replication sync script"
                {...form.register("title")}
                className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
              />
              {form.formState.errors.title && (
                <p className="text-xs text-red-500 font-medium">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            {/* Column select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Board Status Column
              </label>
              <select
                {...form.register("columnId")}
                className="w-full h-9 rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
              >
                <option value="backlog">Backlog</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
            </div>

            {/* Priority and Due Date in row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Priority Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Task Priority
                </label>
                <select
                  {...form.register("priority")}
                  className="w-full h-9 rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Due Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Target Due Date
                </label>
                <input
                  type="date"
                  {...form.register("dueDate")}
                  className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
                />
                {form.formState.errors.dueDate && (
                  <p className="text-xs text-red-500 font-medium">
                    {form.formState.errors.dueDate.message}
                  </p>
                )}
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex items-center gap-3 justify-end pt-2">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Task</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
