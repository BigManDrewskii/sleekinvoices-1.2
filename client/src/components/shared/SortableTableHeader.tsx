import { TableHead } from "@/components/ui/table";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortableTableHeaderProps {
  label: string;
  sortKey: string;
  currentSort?: { key: string; direction: "asc" | "desc" };
  onSort: (key: string) => void;
  className?: string;
  align?: "left" | "center" | "right";
}

export function SortableTableHeader({
  label,
  sortKey,
  currentSort,
  onSort,
  className,
  align = "left",
}: SortableTableHeaderProps) {
  const isActive = currentSort?.key === sortKey;
  const isAscending = currentSort?.direction === "asc";

  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  return (
    <TableHead
      className={cn(
        alignClass,
        className
      )}
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={cn(
          "w-full text-left px-0 bg-transparent border-0",
          "cursor-pointer select-none hover:bg-muted/50 transition-colors",
          "flex items-center gap-2"
        )}
        aria-label={`Sort by ${label}${isActive ? (isAscending ? ', currently ascending' : ', currently descending') : ''}`}
      >
        <span>{label}</span>
        {isActive && (
          <span className="inline-flex" aria-hidden="true">
            {isAscending ? (
              <ChevronUp className="h-4 w-4 text-primary" />
            ) : (
              <ChevronDown className="h-4 w-4 text-primary" />
            )}
          </span>
        )}
      </button>
    </TableHead>
  );
}
