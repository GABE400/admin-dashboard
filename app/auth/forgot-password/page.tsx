"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, CheckCircle2, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [submittedEmail, setSubmittedEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmittedEmail(values.email);
      setIsSubmitted(true);
    }, 1200);
  };

  if (isSubmitted) {
    return (
      <Card className="border border-border/80 shadow-md bg-card animate-in fade-in-50 duration-200">
        <CardContent className="pt-8 pb-6 px-6 text-center space-y-5">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-500">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold">Check your inbox</CardTitle>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We have dispatched a password recovery token link to: <br />
              <strong className="text-foreground font-semibold">{submittedEmail}</strong>
            </p>
          </div>

          <p className="text-xs text-muted-foreground leading-normal">
            Didn't receive the email? Check spam directories or{" "}
            <button
              onClick={() => alert("Simulation: Reset link resent!")}
              className="font-bold text-primary hover:underline focus:outline-hidden cursor-pointer"
            >
              resend link
            </button>
          </p>

          <div className="pt-2">
            <Link href="/auth/login" className="inline-block w-full">
              <Button className="w-full gap-2 py-2 h-auto text-sm cursor-pointer" variant="outline">
                <ArrowLeft className="h-4 w-4" /> Back to Sign In
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-border/80 shadow-md bg-card">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">Recover Password</CardTitle>
        <CardDescription>
          Provide your registered email address to receive a recovery link
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="developer@aether.com"
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

          <Button type="submit" className="w-full font-semibold shadow-xs shadow-primary/20 py-2.5 h-auto text-sm cursor-pointer" disabled={isLoading}>
            {isLoading ? "Dispatching Token..." : "Send Reset Authorization"}
          </Button>
        </form>

        <div className="text-center pt-2">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-indigo-500 transition-colors"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
