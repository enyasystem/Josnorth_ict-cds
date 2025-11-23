"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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

function PasswordResetConfirmForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uid, setUid] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const uidParam = searchParams.get("uid");
    const tokenParam = searchParams.get("token");

    if (!uidParam || !tokenParam) {
      toast.error("Invalid reset link. Please request a new one.");
      router.push("/password-reset");
      return;
    }

    setUid(uidParam);
    setToken(tokenParam);
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      await authApi.passwordResetConfirm({
        uid,
        token,
        new_password: newPassword,
      });
      setIsSuccess(true);
      toast.success("Password reset successful!");
    } catch (err: any) {
      toast.error(err.message || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <PageLayout showHeader={false}>
        <FloatingNav />
        <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">✓</span>
              </div>
              <CardTitle className="text-2xl font-bold text-green-800">
                Password Reset Successful
              </CardTitle>
              <CardDescription>
                Your password has been reset successfully
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => router.push("/login")}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Go to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }

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
              Set New Password
            </CardTitle>
            <CardDescription>Enter your new password below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={8}
                />
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters long
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={8}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={isLoading || !uid || !token}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>

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

export default function PasswordResetConfirmPage() {
  return (
    <Suspense
      fallback={
        <PageLayout showHeader={false}>
          <FloatingNav />
          <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
            <Card className="w-full max-w-md shadow-lg">
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">Loading...</p>
              </CardContent>
            </Card>
          </div>
        </PageLayout>
      }
    >
      <PasswordResetConfirmForm />
    </Suspense>
  );
}
