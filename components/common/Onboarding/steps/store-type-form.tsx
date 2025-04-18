"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { 
  ShoppingBag, 
  Laptop, 
  Coffee, 
  Download, 
  Paintbrush, 
  Sparkles,
  Store,
  Gift
} from "lucide-react"

const storeTypes = [
  {
    id: "fashion",
    label: "Fashion & Apparel",
    icon: ShoppingBag,
    description: "Clothing, accessories, and footwear"
  },
  {
    id: "electronics",
    label: "Electronics",
    icon: Laptop,
    description: "Gadgets, devices, and accessories"
  },
  {
    id: "food",
    label: "Food & Beverage",
    icon: Coffee,
    description: "Food products, drinks, and ingredients"
  },
  {
    id: "digital",
    label: "Digital Products",
    icon: Download,
    description: "Software, ebooks, and digital content"
  },
  {
    id: "handmade",
    label: "Handmade Items",
    icon: Paintbrush,
    description: "Crafts, artwork, and custom pieces"
  },
  {
    id: "beauty",
    label: "Beauty & Cosmetics",
    icon: Sparkles,
    description: "Skincare, makeup, and personal care"
  },
  {
    id: "general",
    label: "General Store",
    icon: Store,
    description: "Multiple product categories"
  },
  {
    id: "other",
    label: "Something Else",
    icon: Gift,
    description: "Tell us about your unique store"
  }
]

interface StoreTypeFormProps {
  formData: any
  setFormData: (data: any) => void
}

export function StoreTypeForm({ formData, setFormData }: StoreTypeFormProps) {
  const handleSelect = (typeId: string) => {
    setFormData({
      ...formData,
      storeType: typeId
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {storeTypes.map((type) => {
        const Icon = type.icon
        const isSelected = formData.storeType === type.id

        return (
          <Card
            key={type.id}
            className={cn(
              "p-4 cursor-pointer transition-all hover:shadow-md",
              "border-2",
              isSelected ? "border-primary bg-primary/5" : "border-transparent"
            )}
            onClick={() => handleSelect(type.id)}
          >
            <div className="flex items-start space-x-4">
              <div className={cn(
                "p-2 rounded-lg",
                isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
              )}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">{type.label}</h3>
                <p className="text-sm text-muted-foreground">
                  {type.description}
                </p>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
} 