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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const fulfillmentMethods = [
  {
    id: "self",
    label: "Ship Yourself",
    icon: Box,
    description: "Handle packaging and shipping on your own",
    details: "Perfect for small businesses with manageable order volumes"
  },
  {
    id: "service",
    label: "Fulfillment Service",
    icon: Truck,
    description: "Use a third-party fulfillment service",
    details: "Ideal for scaling businesses with high order volumes"
  },
  {
    id: "digital",
    label: "Digital Delivery",
    icon: CloudCog,
    description: "Automatic delivery for digital products",
    details: "Best for digital products like software, e-books, or courses"
  },
  {
    id: "undecided",
    label: "Undecided",
    icon: HelpCircle,
    description: "I'll decide this later",
    details: "You can set this up later in your store settings"
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
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label>Fulfillment Method</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Choose how you'll deliver products to your customers</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-sm text-muted-foreground">
          Select the fulfillment method that best suits your business needs
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {fulfillmentMethods.map((method) => {
          const Icon = method.icon
          const isSelected = formData.fulfillmentMethod === method.id

          return (
            <Card
              key={method.id}
              className={cn(
                "p-6 cursor-pointer transition-all hover:shadow-md",
                "border-2",
                isSelected ? "border-primary bg-primary/5" : "border-transparent hover:border-primary/20"
              )}
              onClick={() => handleInputChange("fulfillmentMethod", method.id)}
            >
              <div className="flex items-start space-x-4">
                <div className={cn(
                  "p-3 rounded-lg",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">{method.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {method.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {method.details}
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