import * as z from "zod"

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  rememberMe: z.boolean().default(false).optional(),
})

export const signupSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter your full name",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
})

export type LoginFormType = z.infer<typeof loginSchema>
export type SignupFormType = z.infer<typeof signupSchema>
export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema> 