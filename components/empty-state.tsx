import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onActionClick,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 border border-dashed border-border/80 rounded-2xl bg-card/30 animate-in fade-in-50 duration-300">
      {/* Premium custom inline SVG Illustration */}
      <svg
        className="w-32 h-32 mb-6 text-muted-foreground/30 dark:text-muted-foreground/20"
        fill="none"
        viewBox="0 0 240 240"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="120" cy="120" r="80" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 6" />
        <path
          d="M90 100C90 94.4772 94.4772 90 100 90H140C145.523 90 150 94.4772 150 100V140C150 145.523 145.523 150 140 150H100C94.4772 150 90 145.523 90 140V100Z"
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx="120" cy="120" r="15" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
        <line x1="120" y1="70" x2="120" y2="90" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="120" y1="150" x2="120" y2="170" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="70" y1="120" x2="90" y2="120" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="150" y1="120" x2="170" y2="120" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <h3 className="text-lg font-bold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-sm leading-relaxed">
        {description}
      </p>

      {actionLabel && onActionClick && (
        <Button onClick={onActionClick} className="mt-6 gap-2" size="sm">
          <Plus className="h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
