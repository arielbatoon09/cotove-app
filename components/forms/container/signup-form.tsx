"use client"

// Dependencies
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";

// Components
import { SignupFormType, signupSchema } from "@/validations/auth";
import { InputField, PasswordField, CheckboxField } from "../fields";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/ui/icons";
import { Loader2 } from "lucide-react";

// Services
import { useSignup } from "@/services/auth/signup-service";
import { SignupSuccessData } from "@/types/auth-types";
import { ApiError } from "@/types";

export function SignupForm() {
  const [error, setError] = useState<string | null>(null);

  // Initialize Form
  const form = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      agreeToTerms: false,
    },
  });

  // Initialize Signup Service
  const { signup, isMutating } = useSignup({ reset: form.reset });

  // Process Form Submission
  async function onSubmit(data: SignupFormType) {
    try {
      const response = await signup(data);
      
      if (response.status === "success") {
        const successData = response.data as SignupSuccessData;
        setError(null);
        toast.success(successData.message);
      } else {
        const errorData = response.data as unknown as ApiError;
        setError(errorData.message);
      }
    } catch (error) {
      console.log("Error", error);
      if (error && typeof error === 'object' && 'message' in error) {
        const apiError = error as { message: string };
        setError(apiError.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  }

  // Render Form
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 text-sm text-red-600 bg-red-50 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {/* Fields */}
        <InputField control={form.control} name="name" label="Full Name" type="text" placeholder="Enter your full name" />
        <InputField control={form.control} name="email" label="Email" type="email" placeholder="Enter your email" />
        <PasswordField control={form.control} name="password" label="Password" placeholder="Enter your password" />
        <CheckboxField control={form.control} name="agreeToTerms" label="I agree to the terms and conditions" />

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isMutating}>
          {isMutating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create an account"
          )}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Button */}
        <Button variant="outline" type="button" className="w-full">
          <GoogleIcon className="mr-2 h-4 w-4" />
          Google
        </Button>

        {/* Login Link */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account? <Link href="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </form>
    </Form>
  );
}