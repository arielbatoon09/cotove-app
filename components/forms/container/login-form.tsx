"use client"

// Dependencies
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
// Components
import { loginSchema } from "@/validations/auth";
import { InputField, PasswordField, CheckboxField } from "../fields";
import { LoginFormType } from "@/validations/auth";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/ui/icons";
import { Loader2 } from "lucide-react";

// Services
import { useLogin } from "@/services/auth/login-service";
import { LoginSuccessData } from "@/types/auth-types";
import { ApiError } from "@/types";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  // Initialize Form
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Initialize Login Service
  const { login, isMutating } = useLogin({ reset: form.reset });

  // Process Form Submission
  async function onSubmit(data: LoginFormType) {
    try {
      const response = await login(data);
      
      if (response.status === "success") {
        const successData = response.data as LoginSuccessData;
        toast.success(successData.message);
      } else {
        const errorData = response.data as unknown as ApiError;
        setError(errorData.message);
      }
    } catch (error) {
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
        <InputField control={form.control} name="email" label="Email" type="email" placeholder="Enter your email" />
        <PasswordField control={form.control} name="password" label="Password" placeholder="Enter your password" />
        <div className="flex items-center justify-between">
          <CheckboxField control={form.control} name="rememberMe" label="Remember me" />
          <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" className="w-full" disabled={isMutating}>
          {isMutating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
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

        {/* Signup Link */}
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account? <Link href="/signup" className="text-primary hover:underline">Get started</Link>
        </p>
      </form>
    </Form>
  );
}