import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface SpotlightPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function OnboardingTour() {
  const {
    isOnboardingActive,
    currentStep,
    totalSteps,
    currentStepData,
    nextStep,
    prevStep,
    skipOnboarding,
    completeOnboarding,
  } = useOnboarding();

  const [spotlightPosition, setSpotlightPosition] = useState<SpotlightPosition | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Find and position the spotlight on the target element
  useEffect(() => {
    if (!isOnboardingActive || !currentStepData) {
      setIsVisible(false);
      return;
    }

    const findAndPositionTarget = () => {
      const targetElement = document.querySelector(currentStepData.targetSelector);
      
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const padding = currentStepData.spotlightPadding || 8;
        
        setSpotlightPosition({
          top: rect.top - padding + window.scrollY,
          left: rect.left - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
        });

        // Calculate tooltip position based on placement
        const tooltipWidth = 340;
        const tooltipHeight = 180;
        const gap = 16;

        let tooltipTop = 0;
        let tooltipLeft = 0;

        switch (currentStepData.placement) {
          case 'top':
            tooltipTop = rect.top - tooltipHeight - gap + window.scrollY;
            tooltipLeft = rect.left + rect.width / 2 - tooltipWidth / 2;
            break;
          case 'bottom':
            tooltipTop = rect.bottom + gap + window.scrollY;
            tooltipLeft = rect.left + rect.width / 2 - tooltipWidth / 2;
            break;
          case 'left':
            tooltipTop = rect.top + rect.height / 2 - tooltipHeight / 2 + window.scrollY;
            tooltipLeft = rect.left - tooltipWidth - gap;
            break;
          case 'right':
            tooltipTop = rect.top + rect.height / 2 - tooltipHeight / 2 + window.scrollY;
            tooltipLeft = rect.right + gap;
            break;
        }

        // Keep tooltip within viewport
        tooltipLeft = Math.max(16, Math.min(tooltipLeft, window.innerWidth - tooltipWidth - 16));
        tooltipTop = Math.max(16, tooltipTop);

        setTooltipPosition({ top: tooltipTop, left: tooltipLeft });
        setIsVisible(true);
      } else {
        // If target not found, try again after a short delay
        setTimeout(findAndPositionTarget, 100);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(findAndPositionTarget, 100);
    
    // Reposition on resize
    window.addEventListener('resize', findAndPositionTarget);
    window.addEventListener('scroll', findAndPositionTarget);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', findAndPositionTarget);
      window.removeEventListener('scroll', findAndPositionTarget);
    };
  }, [isOnboardingActive, currentStepData, currentStep]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOnboardingActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skipOnboarding();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        nextStep();
      } else if (e.key === 'ArrowLeft') {
        prevStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOnboardingActive, nextStep, prevStep, skipOnboarding]);

  if (!isOnboardingActive || !currentStepData || !isVisible) {
    return null;
  }

  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  return createPortal(
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Overlay with spotlight cutout */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ minHeight: document.documentElement.scrollHeight }}
      >
        <defs>
          <mask id="spotlight-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {spotlightPosition && (
              <rect
                x={spotlightPosition.left}
                y={spotlightPosition.top}
                width={spotlightPosition.width}
                height={spotlightPosition.height}
                rx="12"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 0.75)"
          mask="url(#spotlight-mask)"
          className="transition-all duration-300"
        />
      </svg>

      {/* Spotlight border glow */}
      {spotlightPosition && (
        <div
          className="absolute rounded-xl ring-2 ring-primary/50 ring-offset-2 ring-offset-transparent animate-pulse pointer-events-none"
          style={{
            top: spotlightPosition.top,
            left: spotlightPosition.left,
            width: spotlightPosition.width,
            height: spotlightPosition.height,
          }}
        />
      )}

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className={cn(
          "absolute w-[340px] pointer-events-auto",
          "bg-card border border-border/50 rounded-2xl shadow-2xl",
          "animate-in fade-in slide-in-from-bottom-4 duration-300"
        )}
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              Step {currentStep + 1} of {totalSteps}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg hover:bg-muted/80"
            onClick={skipOnboarding}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>

        {/* Content */}
        <div className="px-5 pb-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {currentStepData.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {currentStepData.description}
          </p>
        </div>

        {/* Progress bar */}
        <div className="px-5 pb-3">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 pb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={skipOnboarding}
            className="text-muted-foreground hover:text-foreground"
          >
            Skip tour
          </Button>
          <div className="flex items-center gap-2">
            {!isFirstStep && (
              <Button
                variant="outline"
                size="sm"
                onClick={prevStep}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            <Button
              size="sm"
              onClick={isLastStep ? completeOnboarding : nextStep}
              className="gap-1"
            >
              {isLastStep ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Finish
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
