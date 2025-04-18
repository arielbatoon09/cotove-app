"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { 
  Rocket, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Megaphone, 
  Heart,
  Sparkles
} from "lucide-react"

const businessGoals = [
  {
    id: "launch",
    label: "Launch a new product line",
    icon: Rocket,
    description: "Get your products to market"
  },
  {
    id: "audience",
    label: "Grow my audience",
    icon: Users,
    description: "Expand your customer base"
  },
  {
    id: "scale",
    label: "Scale operations",
    icon: TrendingUp,
    description: "Streamline and grow your business"
  },
  {
    id: "sales",
    label: "Increase sales",
    icon: DollarSign,
    description: "Boost your revenue"
  },
  {
    id: "brand",
    label: "Build brand awareness",
    icon: Megaphone,
    description: "Make your brand stand out"
  },
  {
    id: "experience",
    label: "Improve customer experience",
    icon: Heart,
    description: "Enhance customer satisfaction"
  }
]

interface BusinessGoalsFormProps {
  formData: any
  setFormData: (data: any) => void
}

export function BusinessGoalsForm({ formData, setFormData }: BusinessGoalsFormProps) {
  const handleGoalToggle = (goalId: string) => {
    const currentGoals = formData.selectedGoals || []
    const newGoals = currentGoals.includes(goalId)
      ? currentGoals.filter((id: string) => id !== goalId)
      : [...currentGoals, goalId]
    
    setFormData({
      ...formData,
      selectedGoals: newGoals
    })
  }

  const toggleAIAssistance = () => {
    setFormData({
      ...formData,
      needAIAssistance: !formData.needAIAssistance
    })
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        Choose all that apply to your business goals
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {businessGoals.map((goal) => {
          const Icon = goal.icon
          const isSelected = (formData.selectedGoals || []).includes(goal.id)

          return (
            <Card
              key={goal.id}
              className={cn(
                "p-4 cursor-pointer transition-all hover:shadow-md",
                "border-2",
                isSelected ? "border-primary bg-primary/5" : "border-transparent hover:border-primary/20"
              )}
              onClick={() => handleGoalToggle(goal.id)}
            >
              <div className="flex items-start space-x-4">
                <div className={cn(
                  "p-2 rounded-lg",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                )}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">{goal.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {goal.description}
                  </p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <Card
        className={cn(
          "p-4 cursor-pointer transition-all hover:shadow-md",
          "border-2",
          formData.needAIAssistance ? "border-primary bg-primary/5" : "border-transparent hover:border-primary/20"
        )}
        onClick={toggleAIAssistance}
      >
        <div className="flex items-start space-x-4">
          <div className={cn(
            "p-2 rounded-lg",
            formData.needAIAssistance ? "bg-primary text-primary-foreground" : "bg-muted"
          )}>
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-medium">AI-Powered Assistance</h3>
            <p className="text-sm text-muted-foreground">
              Let AI help you create product descriptions and visuals
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
} 