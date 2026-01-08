import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  targetSelector: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
  spotlightPadding?: number;
}

interface OnboardingContextType {
  isOnboardingActive: boolean;
  currentStep: number;
  totalSteps: number;
  currentStepData: OnboardingStep | null;
  hasCompletedOnboarding: boolean;
  startOnboarding: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipOnboarding: () => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  goToStep: (step: number) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const STORAGE_KEY = 'sleek_onboarding_completed';
const STEP_KEY = 'sleek_onboarding_step';

// Define the onboarding steps
export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to SleekInvoices! 🎉',
    description: 'Let\'s take a quick tour to help you get started with creating professional invoices in minutes.',
    targetSelector: '[data-onboarding="dashboard-title"]',
    placement: 'bottom',
    spotlightPadding: 20,
  },
  {
    id: 'stats-overview',
    title: 'Your Business at a Glance',
    description: 'Track your total revenue, outstanding payments, and invoice counts right from your dashboard.',
    targetSelector: '[data-onboarding="stats-grid"]',
    placement: 'bottom',
    spotlightPadding: 16,
  },
  {
    id: 'magic-invoice',
    title: 'Magic Invoice ✨',
    description: 'Describe your invoice in plain English and let AI create it for you instantly. It\'s the fastest way to create invoices!',
    targetSelector: '[data-onboarding="magic-invoice"]',
    placement: 'bottom',
    spotlightPadding: 12,
  },
  {
    id: 'new-invoice',
    title: 'Create New Invoice',
    description: 'Click here to create a new invoice using our guided builder or classic form.',
    targetSelector: '[data-onboarding="new-invoice-btn"]',
    placement: 'bottom',
    spotlightPadding: 8,
  },
  {
    id: 'navigation',
    title: 'Navigate Your Workspace',
    description: 'Access your invoices, clients, billing, and financial reports from the navigation menu.',
    targetSelector: '[data-onboarding="main-nav"]',
    placement: 'bottom',
    spotlightPadding: 12,
  },
  {
    id: 'search',
    title: 'Quick Search',
    description: 'Find any invoice or client instantly. Press ⌘K (or Ctrl+K) for quick access.',
    targetSelector: '[data-onboarding="search-bar"]',
    placement: 'bottom',
    spotlightPadding: 8,
  },
  {
    id: 'ai-assistant',
    title: 'Your AI Assistant',
    description: 'Need help? Click the floating orb to chat with your AI assistant. It can help you create invoices, analyze data, and more!',
    targetSelector: '[data-onboarding="ai-assistant"]',
    placement: 'left',
    spotlightPadding: 16,
  },
];

interface OnboardingProviderProps {
  children: ReactNode;
}

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const [isOnboardingActive, setIsOnboardingActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    const completed = localStorage.getItem(STORAGE_KEY);
    const savedStep = localStorage.getItem(STEP_KEY);
    
    if (completed === 'true') {
      setHasCompletedOnboarding(true);
      setIsOnboardingActive(false);
    } else {
      setHasCompletedOnboarding(false);
      // Auto-start onboarding for new users after a short delay
      const timer = setTimeout(() => {
        setIsOnboardingActive(true);
        if (savedStep) {
          setCurrentStep(parseInt(savedStep, 10));
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Save current step to localStorage
  useEffect(() => {
    if (isOnboardingActive) {
      localStorage.setItem(STEP_KEY, currentStep.toString());
    }
  }, [currentStep, isOnboardingActive]);

  const startOnboarding = useCallback(() => {
    setCurrentStep(0);
    setIsOnboardingActive(true);
    setHasCompletedOnboarding(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeOnboarding();
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const skipOnboarding = useCallback(() => {
    setIsOnboardingActive(false);
    setHasCompletedOnboarding(true);
    localStorage.setItem(STORAGE_KEY, 'true');
    localStorage.removeItem(STEP_KEY);
  }, []);

  const completeOnboarding = useCallback(() => {
    setIsOnboardingActive(false);
    setHasCompletedOnboarding(true);
    localStorage.setItem(STORAGE_KEY, 'true');
    localStorage.removeItem(STEP_KEY);
  }, []);

  const resetOnboarding = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STEP_KEY);
    setHasCompletedOnboarding(false);
    setCurrentStep(0);
    setIsOnboardingActive(true);
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < ONBOARDING_STEPS.length) {
      setCurrentStep(step);
    }
  }, []);

  const currentStepData = isOnboardingActive ? ONBOARDING_STEPS[currentStep] : null;

  return (
    <OnboardingContext.Provider
      value={{
        isOnboardingActive,
        currentStep,
        totalSteps: ONBOARDING_STEPS.length,
        currentStepData,
        hasCompletedOnboarding,
        startOnboarding,
        nextStep,
        prevStep,
        skipOnboarding,
        completeOnboarding,
        resetOnboarding,
        goToStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
