import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { AIAssistant, AIAssistantTrigger } from "@/components/AIAssistant";

interface AIAssistantContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const AIAssistantContext = createContext<AIAssistantContextType | null>(null);

export function useAIAssistant() {
  const context = useContext(AIAssistantContext);
  if (!context) {
    throw new Error("useAIAssistant must be used within AIAssistantProvider");
  }
  return context;
}

interface AIAssistantProviderProps {
  children: ReactNode;
}

export function AIAssistantProvider({ children }: AIAssistantProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <AIAssistantContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
      <AIAssistant isOpen={isOpen} onClose={close} />
      {!isOpen && <AIAssistantTrigger onClick={open} />}
    </AIAssistantContext.Provider>
  );
}
