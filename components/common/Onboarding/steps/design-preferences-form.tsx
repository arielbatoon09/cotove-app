"use client"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { 
  LayoutGrid, 
  ShoppingCart, 
  Info, 
  Contact2, 
  FileText,
  HelpCircle
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DesignPreferencesFormProps {
  formData: any
  setFormData: (data: any) => void
}

const templates = [
  {
    id: "homepage",
    label: "Homepage",
    description: "Your store's main landing page",
    details: "Showcase your products and brand story",
    icon: LayoutGrid,
    required: true
  },
  {
    id: "shop",
    label: "Shop Page",
    description: "Product listing and filtering",
    details: "Display your products in a grid or list view",
    icon: ShoppingCart,
    required: true
  },
  {
    id: "cart",
    label: "Shopping Cart",
    description: "Cart and checkout process",
    details: "Secure and streamlined checkout experience",
    icon: ShoppingCart,
    required: true
  },
  {
    id: "about",
    label: "About Us",
    description: "Share your brand story",
    details: "Build trust with your customers",
    icon: Info,
    required: false
  },
  {
    id: "contact",
    label: "Contact",
    description: "Customer support and inquiries",
    details: "Help customers reach you easily",
    icon: Contact2,
    required: false
  },
  {
    id: "blog",
    label: "Blog",
    description: "Share updates and articles",
    details: "Engage customers with content marketing",
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
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label>Store Pages</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Choose which pages you want in your store</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-sm text-muted-foreground">
          Required pages are pre-selected. Select additional pages to enhance your store.
        </p>
      </div>

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
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{template.label}</h3>
                  {template.required && (
                    <span className="text-xs text-muted-foreground">(Required)</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {template.details}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 