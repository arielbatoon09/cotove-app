"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { 
  Rocket, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Megaphone, 
  Heart,
  Sparkles,
  HelpCircle
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const businessGoals = [
  {
    id: "launch",
    label: "Launch a new product line",
    icon: Rocket,
    description: "Get your products to market",
    details: "Perfect for new businesses or expanding product offerings"
  },
  {
    id: "audience",
    label: "Grow my audience",
    icon: Users,
    description: "Expand your customer base",
    details: "Reach more potential customers and build loyalty"
  },
  {
    id: "scale",
    label: "Scale operations",
    icon: TrendingUp,
    description: "Streamline and grow your business",
    details: "Optimize processes and increase efficiency"
  },
  {
    id: "sales",
    label: "Increase sales",
    icon: DollarSign,
    description: "Boost your revenue",
    details: "Implement strategies to drive more sales"
  },
  {
    id: "brand",
    label: "Build brand awareness",
    icon: Megaphone,
    description: "Make your brand stand out",
    details: "Create a strong brand identity and recognition"
  },
  {
    id: "experience",
    label: "Improve customer experience",
    icon: Heart,
    description: "Enhance customer satisfaction",
    details: "Create memorable shopping experiences"
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
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label>Business Goals</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the goals that align with your business objectives</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-sm text-muted-foreground">
          Choose all that apply to help us customize your store experience
        </p>
      </div>

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
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">{goal.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {goal.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {goal.details}
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
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-medium">AI-Powered Assistance</h3>
            <p className="text-sm text-muted-foreground">
              Let AI help you create product descriptions and visuals
            </p>
            <p className="text-xs text-muted-foreground">
              Save time with AI-generated content and optimization suggestions
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
} 