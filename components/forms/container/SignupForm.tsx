"use client"

// Dependencies
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import { LoginFormType, SignupFormType, signupSchema } from "@/lib/validations/auth";
import { InputField, PasswordField, CheckboxField } from "../fields";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/ui/icons";

export function SignupForm() {
  // Initialize Form
  const form = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      agreeToTerms: false,
    },
  });

  // Process Form Submission
  async function onSubmit(data: SignupFormType) {
    console.log(data);
  }

  // Render Form
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputField control={form.control} name="fullName" label="Full Name" type="text" placeholder="Enter your full name" />
        <InputField control={form.control} name="email" label="Email" type="email" placeholder="Enter your email" />
        <PasswordField control={form.control} name="password" label="Password" placeholder="Enter your password" />
        <CheckboxField control={form.control} name="agreeToTerms" label="I agree to the terms and conditions" />

        <Button type="submit" className="w-full">Create an account</Button>

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
          Already have an account? <Link href="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </form>
    </Form>
  );
}