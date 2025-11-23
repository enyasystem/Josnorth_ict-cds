"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageLayout } from "@/components/page-layout";
import { authApi } from "@/lib/api/auth";
import { toast } from "sonner";
import dynamic from "next/dynamic";
const FloatingNav = dynamic(() => import("@/components/floating-nav"), {
  ssr: false,
});

export default function PasswordResetPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authApi.passwordReset({ email });
      setIsSubmitted(true);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (err: any) {
      toast.error(
        err.message || "Failed to send reset email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout showHeader={false}>
      <FloatingNav />
      <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">N</span>
            </div>
            <CardTitle className="text-2xl font-bold text-green-800">
              Reset Password
            </CardTitle>
            <CardDescription>
              Enter your email to receive a password reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 text-green-800 text-sm p-4 rounded-md">
                  <p className="font-semibold mb-2">Check your email!</p>
                  <p>
                    We've sent a password reset link to <strong>{email}</strong>
                    . Please check your inbox and follow the instructions.
                  </p>
                </div>
                <Button
                  onClick={() => router.push("/login")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Back to Login
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            )}

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <Link
                href="/login"
                className="text-green-600 hover:text-green-700 underline"
              >
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
