"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle2, ChevronRight, Circle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { onboardingTasks } from "@/data/onboarding"
import { OnboardingTask } from "@/types/onboarding"

export default function AppDashboard() {
  const [tasks, setTasks] = useState<OnboardingTask[]>(onboardingTasks)
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
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/20">
        <div className="flex-1 py-8">
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
    )
  }

  return (
    <div className="space-y-8 p-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Stats Cards */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Sales</h3>
          <p className="mt-2 text-2xl font-bold">$0.00</p>
          <p className="text-xs text-muted-foreground">+0% from last month</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Orders</h3>
          <p className="mt-2 text-2xl font-bold">0</p>
          <p className="text-xs text-muted-foreground">+0% from last month</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Products</h3>
          <p className="mt-2 text-2xl font-bold">0</p>
          <p className="text-xs text-muted-foreground">Active products</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Customers</h3>
          <p className="mt-2 text-2xl font-bold">0</p>
          <p className="text-xs text-muted-foreground">Total customers</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Orders */}
        <div className="rounded-lg border bg-card">
          <div className="p-6">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
          </div>
          <div className="p-6 pt-0">
            <p className="text-sm text-muted-foreground">No orders yet</p>
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-lg border bg-card">
          <div className="p-6">
            <h2 className="text-lg font-semibold">Top Products</h2>
          </div>
          <div className="p-6 pt-0">
            <p className="text-sm text-muted-foreground">No products yet</p>
          </div>
        </div>
      </div>
    </div>
  )
} 