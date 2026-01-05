import { cn } from "@/lib/utils";

interface ResponsiveLogoProps {
  logoUrl?: string | null;
  monogramUrl?: string | null;
  logoWidth?: number;
  monogramWidth?: number;
  logoPosition?: "left" | "center" | "right";
  className?: string;
  showBrand?: boolean;
}

/**
 * ResponsiveLogo component that displays full logo on desktop and monogram on mobile/tablet
 * - Desktop (md and up): Shows full logo with optional brand name
 * - Mobile/Tablet (below md): Shows monogram icon only
 */
export function ResponsiveLogo({
  logoUrl,
  monogramUrl,
  logoWidth = 120,
  monogramWidth = 40,
  logoPosition = "left",
  className,
  showBrand = true,
}: ResponsiveLogoProps) {
  const positionClass = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  }[logoPosition];

  return (
    <div className={cn("flex items-center gap-2", positionClass, className)}>
      {/* Desktop Logo - Hidden on mobile/tablet */}
      {logoUrl && (
        <div className="hidden md:flex items-center gap-2">
          <img
            src={logoUrl}
            alt="Logo"
            style={{
              width: `${logoWidth}px`,
              maxHeight: "60px",
              objectFit: "contain",
            }}
          />
          {showBrand && (
            <span className="text-sm font-semibold text-foreground whitespace-nowrap">
              SleekInvoices
            </span>
          )}
        </div>
      )}

      {/* Monogram Icon - Visible on mobile/tablet, hidden on desktop */}
      {monogramUrl && (
        <div className="md:hidden flex items-center">
          <img
            src={monogramUrl}
            alt="Logo"
            style={{
              width: `${monogramWidth}px`,
              height: `${monogramWidth}px`,
              objectFit: "contain",
            }}
          />
        </div>
      )}

      {/* Fallback when no logo provided */}
      {!logoUrl && !monogramUrl && (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">SI</span>
          </div>
          {showBrand && (
            <span className="hidden md:inline text-sm font-semibold text-foreground">
              SleekInvoices
            </span>
          )}
        </div>
      )}
    </div>
  );
}
