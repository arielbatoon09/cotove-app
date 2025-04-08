import { MultiStepForm } from "./components/multi-step-form"

export default function Onboarding() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center py-10">
      <div className="w-full">
        <div className="space-y-6 text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to Cotove!</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Let's set up your store. We'll guide you through the process step by step.
          </p>
        </div>
        <MultiStepForm />
      </div>
    </main>
  )
}