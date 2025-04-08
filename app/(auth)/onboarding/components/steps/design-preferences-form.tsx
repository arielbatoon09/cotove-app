"use client"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { 
  LayoutGrid, 
  ShoppingCart, 
  Info, 
  Contact2, 
  FileText 
} from "lucide-react"

interface DesignPreferencesFormProps {
  formData: any
  setFormData: (data: any) => void
}

const templates = [
  {
    id: "homepage",
    label: "Homepage",
    description: "Your store's main landing page",
    icon: LayoutGrid,
    required: true
  },
  {
    id: "shop",
    label: "Shop Page",
    description: "Product listing and filtering",
    icon: ShoppingCart,
    required: true
  },
  {
    id: "cart",
    label: "Shopping Cart",
    description: "Cart and checkout process",
    icon: ShoppingCart,
    required: true
  },
  {
    id: "about",
    label: "About Us",
    description: "Share your brand story",
    icon: Info,
    required: false
  },
  {
    id: "contact",
    label: "Contact",
    description: "Customer support and inquiries",
    icon: Contact2,
    required: false
  },
  {
    id: "blog",
    label: "Blog",
    description: "Share updates and articles",
    icon: FileText,
    required: false
  }
]

export function DesignPreferencesForm({ formData, setFormData }: DesignPreferencesFormProps) {
  const toggleTemplate = (templateId: string) => {
    const isRequired = templates.find(t => t.id === templateId)?.required
    if (isRequired) return // Don't allow toggling required templates

    const currentTemplates = formData.selectedTemplates || []
    const newTemplates = currentTemplates.includes(templateId)
      ? currentTemplates.filter((id: string) => id !== templateId)
      : [...currentTemplates, templateId]

    setFormData({
      ...formData,
      selectedTemplates: newTemplates
    })
  }

  const isSelected = (templateId: string) => {
    return formData.selectedTemplates?.includes(templateId)
  }

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Required templates are pre-selected. Choose additional pages you'd like to include.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {templates.map((template) => {
          const Icon = template.icon
          const selected = isSelected(template.id)

          return (
            <div
              key={template.id}
              className={cn(
                "flex items-start space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all",
                template.required ? "bg-muted cursor-not-allowed" : "hover:border-primary/20",
                selected && !template.required && "border-primary bg-primary/5",
                !selected && !template.required && "border-transparent"
              )}
              onClick={() => !template.required && toggleTemplate(template.id)}
            >
              <div className={cn(
                "p-2 rounded-lg",
                template.required ? "bg-muted-foreground/20" : selected ? "bg-primary text-primary-foreground" : "bg-muted"
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{template.label}</h3>
                  {template.required && (
                    <span className="text-xs text-muted-foreground">(Required)</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 