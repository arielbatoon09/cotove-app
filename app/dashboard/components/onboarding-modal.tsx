"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MultiStepForm } from "@/app/(auth)/onboarding/components/multi-step-form"

interface OnboardingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OnboardingModal({ open, onOpenChange }: OnboardingModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] h-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl">Welcome to Cotove!</DialogTitle>
          <DialogDescription className="text-lg">
            Let's set up your store. We'll guide you through the process step by step.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 overflow-y-auto flex-1">
          <MultiStepForm onComplete={() => onOpenChange(false)} />
        </div>
      </DialogContent>
    </Dialog>
  )
} 