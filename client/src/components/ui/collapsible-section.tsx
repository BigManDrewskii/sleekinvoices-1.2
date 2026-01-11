import * as React from "react";
import { ChevronUp, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  disabledMessage?: string;
}

export function CollapsibleSection({
  title,
  defaultOpen = true,
  children,
  className,
  disabled = false,
  disabledMessage,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className={cn(
      "rounded-lg bg-card/50 border border-border/50",
      disabled && "opacity-60",
      className
    )}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3 text-left rounded-t-lg transition-colors",
          disabled ? "cursor-not-allowed" : "hover:bg-muted/30"
        )}
      >
        <span className="text-sm font-medium text-foreground">{title}</span>
        <ChevronUp
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            !isOpen && "rotate-180"
          )}
        />
      </button>

      {disabled && disabledMessage && (
        <div className="px-4 pb-3 pt-0">
          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{disabledMessage}</p>
          </div>
        </div>
      )}

      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen && !disabled ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className={cn("px-4 pb-4 pt-1", disabled && "pointer-events-none")}>
          {children}
        </div>
      </div>
    </div>
  );
}

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  showSwap?: boolean;
}

export function ColorInput({ label, value, onChange, showSwap }: ColorInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs text-muted-foreground">{label}</label>
      <div className="flex items-center gap-2 bg-muted/30 rounded-lg p-1.5">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent border-0 text-sm font-mono text-foreground focus:outline-none"
          placeholder="#000000"
        />
        {showSwap && (
          <button
            type="button"
            className="p-1.5 hover:bg-muted rounded transition-colors"
            title="Swap colors"
          >
            <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}

export function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "",
}: SliderInputProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm text-foreground">{label}</label>
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            min={min}
            max={max}
            step={step}
            className="w-16 bg-muted/30 border border-border/50 rounded px-2 py-1 text-sm text-right font-mono focus:outline-none focus:border-primary"
          />
          {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
        </div>
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-full h-1.5 bg-muted/50 rounded-full appearance-none cursor-pointer accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background"
      />
    </div>
  );
}
