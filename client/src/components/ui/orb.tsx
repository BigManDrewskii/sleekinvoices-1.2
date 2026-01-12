"use client";

import { cn } from "@/lib/utils";
import { SleekyAvatar, type SleekyAvatarState } from "@/components/SleekyAvatar";

export type OrbState = "idle" | "listening" | "thinking" | "talking";

interface OrbProps {
  state?: OrbState;
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

// Map Orb states to SleekyAvatar states
const stateMap: Record<OrbState, SleekyAvatarState> = {
  idle: "idle",
  listening: "idle",
  thinking: "thinking",
  talking: "talking",
};

// Map Orb sizes to SleekyAvatar sizes
const sizeMap: Record<"sm" | "md" | "lg", "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

/**
 * Orb component - AI Assistant floating button using Sleeky avatar
 * Now uses the unified SleekyAvatar component for consistent styling
 */
export function Orb({
  state = "idle",
  size = "md",
  className,
  onClick,
}: OrbProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Glow effect */}
      <div
        className="absolute inset-[-8px] rounded-full opacity-50 blur-xl animate-pulse pointer-events-none"
        style={{
          background: `radial-gradient(circle, hsl(var(--primary) / 0.5) 0%, transparent 70%)`,
        }}
      />

      {/* Sleeky Avatar with card-matching border */}
      <SleekyAvatar
        size={sizeMap[size]}
        state={stateMap[state]}
        bordered={true}
        glow={true}
        onClick={onClick}
        alt="Sleeky AI Assistant"
      />
    </div>
  );
}

export default Orb;
