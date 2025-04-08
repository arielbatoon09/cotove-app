"use client"

import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { 
  Box, 
  Truck, 
  CloudCog, 
  HelpCircle 
} from "lucide-react"

const fulfillmentMethods = [
  {
    id: "self",
    label: "Ship Yourself",
    icon: Box,
    description: "Handle packaging and shipping on your own"
  },
  {
    id: "service",
    label: "Fulfillment Service",
    icon: Truck,
    description: "Use a third-party fulfillment service"
  },
  {
    id: "digital",
    label: "Digital Delivery",
    icon: CloudCog,
    description: "Automatic delivery for digital products"
  },
  {
    id: "undecided",
    label: "Undecided",
    icon: HelpCircle,
    description: "I'll decide this later"
  }
]

interface StoreCategoryFormProps {
  formData: any
  setFormData: (data: any) => void
}

export function StoreCategoryForm({ formData, setFormData }: StoreCategoryFormProps) {
  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  return (
    <div className="space-y-4">
      <Label>How do you want to fulfill orders?</Label>
      <div className="grid grid-cols-2 gap-6">
        {fulfillmentMethods.map((method) => {
          const Icon = method.icon
          const isSelected = formData.fulfillmentMethod === method.id

          return (
            <Card
              key={method.id}
              className={cn(
                "p-8 cursor-pointer transition-all hover:shadow-md",
                "border border-border",
                isSelected ? "border-primary bg-primary/5" : "hover:border-primary/20"
              )}
              onClick={() => handleInputChange("fulfillmentMethod", method.id)}
            >
              <div className="flex items-start space-x-4">
                <div className={cn(
                  "p-4 rounded-xl bg-muted",
                  isSelected && "bg-primary text-primary-foreground"
                )}>
                  <Icon className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-lg">{method.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {method.description}
                  </p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
} 