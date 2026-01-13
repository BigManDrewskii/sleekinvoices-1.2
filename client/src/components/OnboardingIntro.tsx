import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';

export function OnboardingIntro() {
  const {
    hasSeenIntro,
    startOnboarding,
    dismissIntro,
    dismissIntroForever
  } = useOnboarding();
  const [neverShowChecked, setNeverShowChecked] = useState(false);
  const [open, setOpen] = useState(!hasSeenIntro);

  const handleShowMeAround = () => {
    if (neverShowChecked) {
      dismissIntroForever();
    } else {
      dismissIntro();
    }
    setOpen(false);
    startOnboarding();
  };

  const handleSkip = () => {
    if (neverShowChecked) {
      dismissIntroForever();
    } else {
      dismissIntro();
    }
    setOpen(false);
  };

  if (hasSeenIntro) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[480px] p-0 gap-0">
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 px-6 pt-8 pb-6 border-b border-border/50">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4 mx-auto">
            <Sparkles className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">
            Welcome to SleekInvoices!
          </h2>
          <p className="text-center text-muted-foreground">
            Create professional invoices in minutes with AI-powered tools
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-4">
          <div className="space-y-3">
            <Feature icon="✨" title="AI Magic Invoice" description="Describe your invoice in plain English" />
            <Feature icon="📊" title="Analytics Dashboard" description="Track revenue, payments, and insights" />
            <Feature icon="🔍" title="Quick Search" description="Find any invoice or client instantly" />
            <Feature icon="🤖" title="AI Assistant" description="Get help creating invoices and more" />
          </div>

          {/* Never show checkbox */}
          <div className="flex items-start space-x-3 pt-2">
            <Checkbox
              id="never-show"
              checked={neverShowChecked}
              onCheckedChange={(checked) => setNeverShowChecked(checked === true)}
            />
            <label
              htmlFor="never-show"
              className="text-sm text-muted-foreground leading-tight cursor-pointer"
            >
              Don't show this intro again
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6 pt-2">
          <Button
            variant="outline"
            onClick={handleSkip}
            className="flex-1"
          >
            Skip
          </Button>
          <Button
            onClick={handleShowMeAround}
            className="flex-1 gap-2"
          >
            Show me around
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Feature({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-2xl flex-shrink-0">{icon}</div>
      <div>
        <h3 className="font-medium text-sm">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
