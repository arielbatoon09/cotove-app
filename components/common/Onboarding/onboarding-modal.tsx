"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MultiStepForm } from "@/components/common/Onboarding/multi-steo-form";
import { Sparkles } from "lucide-react";

interface OnboardingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OnboardingModal({ open, onOpenChange }: OnboardingModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <DialogTitle className="text-2xl font-bold">Welcome to Cotove!</DialogTitle>
          </div>
          <DialogDescription className="text-base text-muted-foreground">
            Let's create your perfect online store. We'll guide you through a few simple steps to get started.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 overflow-y-auto flex-1">
          <MultiStepForm onComplete={() => onOpenChange(false)} />
        </div>
      </DialogContent>
    </Dialog>
  )
} 