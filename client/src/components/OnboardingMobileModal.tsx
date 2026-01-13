import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { ChevronLeft, ChevronRight, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function OnboardingMobileModal() {
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

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe left = next
      if (currentStep === totalSteps - 1) {
        completeOnboarding();
      } else {
        nextStep();
      }
    }
    if (isRightSwipe && currentStep > 0) {
      // Swipe right = previous
      prevStep();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOnboardingActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skipOnboarding();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        if (currentStep === totalSteps - 1) {
          completeOnboarding();
        } else {
          nextStep();
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOnboardingActive, currentStep, totalSteps, nextStep, prevStep, skipOnboarding, completeOnboarding]);

  if (!isOnboardingActive || !currentStepData) {
    return null;
  }

  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  return (
    <Dialog open={isOnboardingActive} onOpenChange={() => skipOnboarding()}>
      <DialogContent
        className="max-w-[90vw] w-full sm:max-w-md p-0 gap-0"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {currentStep + 1} / {totalSteps}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-md"
            onClick={skipOnboarding}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Content Card */}
        <div className="px-4 py-6 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {currentStepData.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {currentStepData.description}
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-1.5 py-3">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200",
                i === currentStep
                  ? "w-6 bg-primary"
                  : i < currentStep
                    ? "w-1.5 bg-primary/50"
                    : "w-1.5 bg-muted-foreground/30"
              )}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border/40 px-4 py-3">
          <button
            onClick={skipOnboarding}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip
          </button>
          <div className="flex items-center gap-2">
            {!isFirstStep && (
              <Button
                variant="ghost"
                size="sm"
                onClick={prevStep}
                className="h-8 px-3 text-muted-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            <Button
              size="sm"
              onClick={isLastStep ? completeOnboarding : nextStep}
              className="h-8 px-4 gap-1.5"
            >
              {isLastStep ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Done
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

        {/* Swipe hint (only on first step) */}
        {isFirstStep && (
          <div className="text-center text-xs text-muted-foreground pb-3 px-4">
            Swipe left/right to navigate
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
