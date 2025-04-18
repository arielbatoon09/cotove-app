"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { StoreSetupForm } from "./steps/store-setup-form"
import { StoreCategoryForm } from "./steps/store-category-form"
import { DesignPreferencesForm } from "./steps/design-preferences-form"
import { BusinessGoalsForm } from "./steps/business-goals-form"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface MultiStepFormProps {
  onComplete?: () => void
}

export function MultiStepForm({ onComplete }: MultiStepFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Store Setup & Type
    storeName: "",
    storeUrl: "",
    productType: "",

    // Step 2: Design Preferences
    selectedTemplates: ["homepage", "shop", "cart"] as string[],

    // Step 3: Business Goals
    selectedGoals: [] as string[],

    // Step 4: Fulfillment
    fulfillmentMethod: "",
  })

  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  const stepTitles = [
    "Store Basics",
    "Store Design",
    "Business Goals",
    "Fulfillment"
  ]

  const stepDescriptions = [
    "Tell us about your store and what you'll be selling",
    "Choose your store's look and feel",
    "Set your business objectives",
    "Configure how you'll handle orders"
  ]

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.storeName && formData.storeUrl && formData.productType
      case 2:
        return true
      case 3:
        return formData.selectedGoals.length > 0
      case 4:
        return formData.fulfillmentMethod
      default:
        return false
    }
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      onComplete?.()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <StoreSetupForm formData={formData} setFormData={setFormData} />
      case 2:
        return <DesignPreferencesForm formData={formData} setFormData={setFormData} />
      case 3:
        return <BusinessGoalsForm formData={formData} setFormData={setFormData} />
      case 4:
        return <StoreCategoryForm formData={formData} setFormData={setFormData} />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-[600px]">
      <div className="space-y-4 mb-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            {stepTitles[step - 1]}
          </h2>
          <p className="text-sm text-muted-foreground">
            {stepDescriptions[step - 1]}
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="flex-1">
        {renderStepContent()}
      </div>

      <div className="flex justify-between mt-6 pt-6 border-t">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === 1}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!validateStep()}
          className="gap-2"
        >
          {step === totalSteps ? "Complete Setup" : "Continue"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 