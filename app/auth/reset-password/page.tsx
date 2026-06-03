"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Lock, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password confirmation is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const watchPassword = form.watch("password", "");

  // Calculate password strength score (0 to 5)
  const strengthScore = React.useMemo(() => {
    let score = 0;
    if (!watchPassword) return score;
    if (watchPassword.length >= 6) score += 1;
    if (watchPassword.length >= 10) score += 1; // Length bonus
    if (/[a-z]/.test(watchPassword) && /[A-Z]/.test(watchPassword)) score += 1; // Mixed case
    if (/[0-9]/.test(watchPassword)) score += 1; // Numeric check
    if (/[^A-Za-z0-9]/.test(watchPassword)) score += 1; // Symbols
    return Math.min(score, 5);
  }, [watchPassword]);

  const strengthDetails = React.useMemo(() => {
    switch (strengthScore) {
      case 0:
        return { label: "Too Short", color: "bg-muted", text: "text-muted-foreground" };
      case 1:
        return { label: "Weak", color: "bg-red-500", text: "text-red-500" };
      case 2:
        return { label: "Fair", color: "bg-orange-500", text: "text-orange-500" };
      case 3:
        return { label: "Good", color: "bg-amber-500", text: "text-amber-500" };
      case 4:
        return { label: "Strong", color: "bg-indigo-500", text: "text-indigo-500" };
      case 5:
        return { label: "Excellent", color: "bg-emerald-500", text: "text-emerald-500" };
      default:
        return { label: "Weak", color: "bg-red-500", text: "text-red-500" };
    }
  }, [strengthScore]);

  const onSubmit = (values: ResetPasswordFormValues) => {
    setIsLoading(true);
    console.log("Password reset credentials submitted:", values);
    setTimeout(() => {
      setIsLoading(false);
      alert("Password has been reset successfully! Redirecting to login...");
      router.push("/auth/login");
    }, 1500);
  };

  return (
    <Card className="border border-border/80 shadow-md bg-card">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">Set new password</CardTitle>
        <CardDescription>
          Create a fresh, highly secure password to protect your admin dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          
          {/* New Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...form.register("password")}
                className="w-full h-9 rounded-lg border border-border bg-background pl-9 pr-10 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground cursor-pointer flex items-center justify-center h-4 w-4 animate-none"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {form.formState.errors.password && (
              <p className="text-xs text-red-500 font-medium">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Password Strength Meter */}
          {watchPassword && (
            <div className="space-y-2 py-1 animate-in fade-in-25 duration-200">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-zinc-500 dark:text-zinc-400">Password Strength:</span>
                <span className={strengthDetails.text}>{strengthDetails.label}</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5 h-1.5">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className={`h-full rounded-full transition-all duration-350 ${
                      step <= strengthScore ? strengthDetails.color : "bg-muted dark:bg-zinc-800"
                    }`}
                  />
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground leading-normal mt-1">
                Combine uppercase & lowercase letters, numbers, and symbols for a stronger grade.
              </p>
            </div>
          )}

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                {...form.register("confirmPassword")}
                className="w-full h-9 rounded-lg border border-border bg-background pl-9 pr-10 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground cursor-pointer flex items-center justify-center h-4 w-4 animate-none"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {form.formState.errors.confirmPassword && (
              <p className="text-xs text-red-500 font-medium">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full font-semibold shadow-xs shadow-primary/20 py-2.5 h-auto text-sm cursor-pointer" disabled={isLoading}>
            {isLoading ? "Updating Credentials..." : "Reset Password"}
          </Button>
        </form>

        <Separator />

        <div className="text-center">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-indigo-500 transition-colors"
          >
            Back to Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
