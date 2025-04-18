import { AuthWrapper } from "@/components/providers/auth-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Your App Name",
  description: "Login or signup to access your account",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthWrapper variant="auth">
      <main className="w-full min-h-screen overflow-x-hidden">
        {children}
      </main>
    </AuthWrapper>
  );
}