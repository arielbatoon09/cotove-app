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
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters long",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  agreeToTerms: z.boolean().default(false).optional(),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
})

export type LoginFormType = z.infer<typeof loginSchema>
export type SignupFormType = z.infer<typeof signupSchema>
export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema> 