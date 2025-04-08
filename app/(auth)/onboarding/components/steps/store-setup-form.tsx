"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Package, Download, Box } from "lucide-react"

interface StoreSetupFormProps {
  formData: any
  setFormData: (data: any) => void
}

const productTypes = [
  {
    id: "physical",
    label: "Physical Products",
    icon: Package,
    description: "Tangible items that need to be shipped"
  },
  {
    id: "digital",
    label: "Digital Products",
    icon: Download,
    description: "Downloadable items like software or content"
  },
  {
    id: "both",
    label: "Both",
    icon: Box,
    description: "A mix of physical and digital products"
  }
]

export function StoreSetupForm({ formData, setFormData }: StoreSetupFormProps) {
  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="storeName">What's the name of your store?</Label>
          <Input
            id="storeName"
            placeholder="Enter your store name"
            value={formData.storeName}
            onChange={(e) => handleInputChange("storeName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="storeUrl">What's your preferred store URL?</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="storeUrl"
              placeholder="mystore"
              value={formData.storeUrl}
              onChange={(e) => handleInputChange("storeUrl", e.target.value)}
            />
            <span className="text-muted-foreground">.cotove.app</span>
          </div>
        </div>

        <div className="space-y-4">
          <Label>What type of products will you sell?</Label>
          <div className="grid grid-cols-3 gap-6">
            {productTypes.map((type) => {
              const Icon = type.icon
              const isSelected = formData.productType === type.id

              return (
                <Card
                  key={type.id}
                  className={cn(
                    "p-8 cursor-pointer transition-all hover:shadow-md",
                    "border border-border",
                    isSelected ? "border-primary bg-primary/5" : "hover:border-primary/20"
                  )}
                  onClick={() => handleInputChange("productType", type.id)}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={cn(
                      "p-4 rounded-xl bg-muted",
                      isSelected && "bg-primary text-primary-foreground"
                    )}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">{type.label}</h3>
                      <p className="text-sm text-muted-foreground">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
} 