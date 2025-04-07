import { Control, FieldValues, Path } from "react-hook-form"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

interface CheckboxFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  disabled?: boolean
}

export const CheckboxField = <T extends FieldValues>({
  control,
  name,
  label,
  disabled = false,
}: CheckboxFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex items-center space-x-2">
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={disabled}
          />
        </FormControl>
        <FormLabel className="text-sm font-normal">{label}</FormLabel>
      </FormItem>
    )}
  />
) 