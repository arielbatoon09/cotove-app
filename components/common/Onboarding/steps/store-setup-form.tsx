"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Package, Download, Box, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface StoreSetupFormProps {
  formData: any
  setFormData: (data: any) => void
}

const productTypes = [
  {
    id: "physical",
    label: "Physical Products",
    icon: Package,
    description: "Tangible items that need to be shipped",
    examples: "Clothing, electronics, books, etc."
  },
  {
    id: "digital",
    label: "Digital Products",
    icon: Download,
    description: "Downloadable items like software or content",
    examples: "E-books, courses, software, etc."
  },
  {
    id: "both",
    label: "Both",
    icon: Box,
    description: "A mix of physical and digital products",
    examples: "Books with digital downloads, etc."
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
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="storeName">Store Name</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Choose a name that reflects your brand and is easy to remember</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="storeName"
            placeholder="e.g., My Awesome Store"
            value={formData.storeName}
            onChange={(e) => handleInputChange("storeName", e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            This will be displayed to your customers and used in communications
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="storeUrl">Store URL</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>This will be your store's web address</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              id="storeUrl"
              placeholder="my-awesome-store"
              value={formData.storeUrl}
              onChange={(e) => handleInputChange("storeUrl", e.target.value)}
            />
            <span className="text-muted-foreground">.cotove.app</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Use lowercase letters, numbers, and hyphens only
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Label>Product Type</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Select the type of products you plan to sell</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {productTypes.map((type) => {
              const Icon = type.icon
              const isSelected = formData.productType === type.id

              return (
                <Card
                  key={type.id}
                  className={cn(
                    "p-6 cursor-pointer transition-all hover:shadow-md",
                    "border border-border",
                    isSelected ? "border-primary bg-primary/5" : "hover:border-primary/20"
                  )}
                  onClick={() => handleInputChange("productType", type.id)}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={cn(
                      "p-3 rounded-xl bg-muted",
                      isSelected && "bg-primary text-primary-foreground"
                    )}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">{type.label}</h3>
                      <p className="text-sm text-muted-foreground">
                        {type.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Examples: {type.examples}
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