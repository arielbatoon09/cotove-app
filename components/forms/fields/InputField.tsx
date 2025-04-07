import { Control, FieldValues, Path } from "react-hook-form"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface InputFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  type?: string
  placeholder?: string
  disabled?: boolean
}

export const InputField = <T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  disabled = false,
}: InputFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              {...field}
              aria-invalid={!!error}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
} 