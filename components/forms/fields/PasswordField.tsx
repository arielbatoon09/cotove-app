import { useState } from "react"
import { Control, FieldValues, Path } from "react-hook-form"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface PasswordFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
  disabled?: boolean
}

export const PasswordField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled = false,
}: PasswordFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                disabled={disabled}
                {...field}
                aria-invalid={!!error}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="cursor-pointer absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
} 