"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle2, ChevronRight, Circle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { onboardingTasks } from "@/data/onboarding"
import { OnboardingTask } from "@/types/onboarding"
import { Button } from "@/components/ui/button"
import { OnboardingModal } from "./components/onboarding-modal"
import { Card } from "@/components/ui/card"

export default function DashboardPage() {
  const [tasks, setTasks] = useState<OnboardingTask[]>(onboardingTasks)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const isOnboardingComplete = tasks.every(task => task.isCompleted)

  const handleTaskComplete = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, isCompleted: true } : task
      )
    )
  }

  if (!isOnboardingComplete) {
    return (
      <>
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/20">
          <div className="flex-1 pt-6 pb-8">
            {/* Header */}
            <div className="mx-auto mb-16 max-w-2xl space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tight">Welcome to Your Store!</h1>
              <p className="text-lg text-muted-foreground">
                Let's get your store up and running. Follow these steps to set up your online business.
              </p>
            </div>

            <div className="mx-auto w-full max-w-5xl space-y-12 px-4 md:px-6 lg:px-8">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Setup Progress</span>
                  <span className="text-muted-foreground">
                    {tasks.filter(t => t.isCompleted).length} of {tasks.length} completed
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div 
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ 
                      width: `${(tasks.filter(t => t.isCompleted).length / tasks.length) * 100}%` 
                    }}
                  />
                </div>
              </div>

              {/* Tasks Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {tasks.map((task, index) => (
                  <div
                    key={task.id}
                    className={cn(
                      "group relative overflow-hidden rounded-xl border bg-card p-8 transition-all hover:border-primary/50",
                      task.isCompleted ? "border-green-200 bg-green-50/50" : "border-border"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                        task.isCompleted 
                          ? "bg-green-100 text-green-600" 
                          : "bg-muted text-muted-foreground"
                      )}>
                        {task.isCompleted ? (
                          <CheckCircle2 className="h-6 w-6" />
                        ) : (
                          <span className="text-lg font-medium">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="text-lg font-medium">{task.title}</h3>
                        <p className="text-muted-foreground">{task.description}</p>
                        {task.id === 'setup-store' ? (
                          <div
                            className={cn(
                              "p-0 h-auto inline-flex items-center gap-2 font-medium transition-colors cursor-pointer hover:text-primary/80",
                              task.isCompleted 
                                ? "text-green-600 hover:text-green-700" 
                                : "text-primary hover:text-primary/80"
                            )}
                            onClick={() => setShowOnboarding(true)}
                          >
                            {task.isCompleted ? "View" : "Get Started"}
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        ) : (
                          <Link
                            href={task.href}
                            className={cn(
                              "inline-flex items-center gap-2 font-medium transition-colors",
                              task.isCompleted 
                                ? "text-green-600 hover:text-green-700" 
                                : "text-primary hover:text-primary/80"
                            )}
                          >
                            {task.isCompleted ? "View" : "Get Started"}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Help Section */}
              <div className="mx-auto w-full">
                <div className="rounded-xl border bg-card p-8 text-center">
                  <h3 className="text-lg font-medium">Need Help?</h3>
                  <p className="mt-2 text-muted-foreground">
                    Our support team is here to help you get started.
                  </p>
                  <Link
                    href="/dashboard/help"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Contact Support
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <OnboardingModal 
          open={showOnboarding} 
          onOpenChange={setShowOnboarding} 
        />
      </>
    )
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">Getting Started</h1>
        <div className="grid gap-4">
          <Card className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-muted rounded-full p-2 mt-1">
                <span className="text-lg font-medium">1</span>
              </div>
              <div className="space-y-1 flex-1">
                <h3 className="text-lg font-medium">Setup Your Store</h3>
                <p className="text-muted-foreground">
                  Configure your store settings, branding, and preferences
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-normal text-primary"
                  onClick={() => setShowOnboarding(true)}
                >
                  Get Started <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </Card>
          {/* Add other getting started cards here */}
        </div>
      </div>

      <OnboardingModal 
        open={showOnboarding} 
        onOpenChange={setShowOnboarding} 
      />
    </div>
  )
} 