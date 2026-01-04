import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        `px-3 py-1 rounded-full text-xs font-medium status-${status.toLowerCase()}`,
        className
      )}
    >
      {status.toUpperCase()}
    </span>
  );
}
