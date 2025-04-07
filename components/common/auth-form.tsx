import { SignupForm } from "../forms/container/signup-form";
import { LoginForm } from "../forms/container/login-form";
import { ForgotPasswordForm } from "../forms/container/forgot-password-form";

export function AuthForm({ type }: { type: "login" | "signup" | "forgot-password" }) {
  return (
    <section className="flex h-screen">
      <div className="hidden lg:flex w-1/2 bg-gray-50 items-center justify-center p-12 relative">
        <div className="absolute inset-0 grid-background opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-transparent to-gray-50"></div>
        <div className="max-w-md relative">
          Left Panel
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>
          {type === "login" ? <LoginForm /> : type === "signup" ? <SignupForm /> : <ForgotPasswordForm />}
        </div>
      </div>
    </section>
  );
}