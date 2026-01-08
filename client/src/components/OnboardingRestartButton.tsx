import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { PlayCircle, RotateCcw } from 'lucide-react';

interface OnboardingRestartButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export function OnboardingRestartButton({ 
  variant = 'outline', 
  size = 'default',
  className 
}: OnboardingRestartButtonProps) {
  const { resetOnboarding, hasCompletedOnboarding } = useOnboarding();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={resetOnboarding}
      className={className}
    >
      {hasCompletedOnboarding ? (
        <>
          <RotateCcw className="h-4 w-4 mr-2" />
          Restart Tour
        </>
      ) : (
        <>
          <PlayCircle className="h-4 w-4 mr-2" />
          Start Tour
        </>
      )}
    </Button>
  );
}
