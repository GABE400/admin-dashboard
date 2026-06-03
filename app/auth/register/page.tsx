"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Lock, Mail, User, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password confirmation is required"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Terms of Service and Privacy Policy",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    setIsLoading(true);
    console.log("Registering user credentials:", values);
    setTimeout(() => {
      setIsLoading(false);
      alert("Account registration simulated successfully! Redirecting to sign in...");
      router.push("/auth/login");
    }, 1500);
  };

  return (
    <Card className="border border-border/80 shadow-md bg-card">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">Create your account</CardTitle>
        <CardDescription>
          Get started with Aether SaaS platform in minutes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Marcus Aurelius"
                {...form.register("name")}
                className="w-full h-9 rounded-lg border border-border bg-background pl-9 pr-4 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>
            {form.formState.errors.name && (
              <p className="text-xs text-red-500 font-medium">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Email address */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="philosopher@aether.com"
                {...form.register("email")}
                className="w-full h-9 rounded-lg border border-border bg-background pl-9 pr-4 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>
            {form.formState.errors.email && (
              <p className="text-xs text-red-500 font-medium">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Password
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
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground cursor-pointer flex items-center justify-center h-4 w-4"
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
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground cursor-pointer flex items-center justify-center h-4 w-4"
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

          {/* Terms checkbox */}
          <div className="space-y-1.5">
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                {...form.register("terms")}
                className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer accent-primary"
              />
              <label
                htmlFor="terms"
                className="text-xs font-semibold text-muted-foreground hover:text-foreground select-none cursor-pointer leading-tight"
              >
                I agree to Aether's{" "}
                <Link href="#" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {form.formState.errors.terms && (
              <p className="text-xs text-red-500 font-medium leading-none mt-1">
                {form.formState.errors.terms.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <Button type="submit" className="w-full font-semibold shadow-xs shadow-primary/20 py-2.5 h-auto text-sm cursor-pointer" disabled={isLoading}>
            {isLoading ? "Provisioning Sandbox Account..." : "Create Free Account"}
          </Button>
        </form>

        <Separator />

        {/* Link to Login */}
        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-bold text-primary hover:text-indigo-500 transition-colors"
          >
            Sign in instead
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
