"use client";

import * as React from "react";
import { Check, X, ChevronDown, ChevronUp, Sparkles, HelpCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/app/utils";

interface PricingTier {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: { name: string; included: boolean }[];
  isPopular?: boolean;
  ctaText: string;
}

const tiers: PricingTier[] = [
  {
    name: "Starter",
    description: "Essential dashboard tooling for individual developers or early-stage SaaS prototypes.",
    monthlyPrice: 29,
    annualPrice: 23,
    ctaText: "Start Starter Plan",
    features: [
      { name: "Up to 3 Active Projects", included: true },
      { name: "10,000 monthly API queries", included: true },
      { name: "5-day Audit log history", included: true },
      { name: "Shared Kanban boards", included: false },
      { name: "Invoice PDF downloads", included: false },
      { name: "Staff Collaborator accounts", included: false },
      { name: "Priority SLA Support response", included: false },
    ],
  },
  {
    name: "Pro",
    description: "Highly robust console resources designed for growing product agencies or SaaS squads.",
    monthlyPrice: 79,
    annualPrice: 63,
    isPopular: true,
    ctaText: "Upgrade to Pro",
    features: [
      { name: "Up to 15 Active Projects", included: true },
      { name: "100,000 monthly API queries", included: true },
      { name: "30-day Audit log history", included: true },
      { name: "Shared Kanban boards", included: true },
      { name: "Invoice PDF downloads", included: true },
      { name: "Up to 5 staff accounts", included: true },
      { name: "Priority SLA Support response", included: false },
    ],
  },
  {
    name: "Enterprise",
    description: "Scale-first configurations for high-volume developer suites and corporate platforms.",
    monthlyPrice: 149,
    annualPrice: 119,
    ctaText: "Contact Enterprise",
    features: [
      { name: "Unlimited Active Projects", included: true },
      { name: "Unlimited monthly API queries", included: true },
      { name: "Infinite Audit log history", included: true },
      { name: "Shared Kanban boards", included: true },
      { name: "Invoice PDF downloads", included: true },
      { name: "Unlimited staff accounts", included: true },
      { name: "Dedicated 24/7 SLA Support", included: true },
    ],
  },
];

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Can I adjust plans or cancel my subscription at any time?",
    answer: "Absolutely. You can upgrade, downgrade, or cancel your active subscription directly inside the Billing tab under Settings. Downgrades or cancellations will trigger at the end of your current billing cycle.",
  },
  {
    question: "What happens if our API query counts exceed the monthly plan limits?",
    answer: "If query limits are breached, we notify you immediately. For Pro users, we provide a 10% query buffer. Beyond that, Aether blocks additional queries until you upgrade or enter the next billing cycle.",
  },
  {
    question: "Do you offer a free developer sandbox environment?",
    answer: "Yes, registering an account grants immediate access to the Aether Free Developer Sandbox. You can connect up to 2 CRM mock contacts and test local drag-and-drop actions without entering credit card details.",
  },
  {
    question: "Are there any hidden setup or data maintenance fees?",
    answer: "None. All prices outlined on our pricing cards are final and comprehensive of cloud compute costs and dashboard updates. Applicable sales taxes based on jurisdiction are calculated during checkout.",
  },
];

export default function PricingPage() {
  const [billingInterval, setBillingInterval] = React.useState<"monthly" | "annual">("monthly");
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="space-y-12">
      {/* Page Header branding block */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <Badge variant="outline" className="text-xs py-0.5 px-2 bg-primary/10 text-primary border-primary/20 font-bold mx-auto">
          Flexible Pricing Framework
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
          Select the layout plan built for your operations.
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Scale dashboard pipelines, telemetry limits, and user configurations dynamically. Cancel at any time.
        </p>

        {/* Stateful billing toggle selector */}
        <div className="flex items-center justify-center gap-3 pt-4 select-none">
          <span className={cn("text-xs font-semibold", billingInterval === "monthly" ? "text-foreground" : "text-muted-foreground")}>
            Billed Monthly
          </span>
          <button
            type="button"
            onClick={() => setBillingInterval(billingInterval === "monthly" ? "annual" : "monthly")}
            className={cn(
              "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-hidden",
              billingInterval === "annual" ? "bg-primary" : "bg-zinc-200 dark:bg-zinc-800"
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out",
                billingInterval === "annual" ? "translate-x-5" : "translate-x-0"
              )}
            />
          </button>
          <div className="flex items-center gap-1.5">
            <span className={cn("text-xs font-semibold", billingInterval === "annual" ? "text-foreground" : "text-muted-foreground")}>
              Billed Annually
            </span>
            <Badge className="bg-emerald-500 border-none text-white text-[9px] py-0 px-1.5 font-bold shrink-0 animate-pulse">
              Save 20%
            </Badge>
          </div>
        </div>
      </div>

      {/* Grid of pricing cards */}
      <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
        {tiers.map((tier) => {
          const price = billingInterval === "monthly" ? tier.monthlyPrice : tier.annualPrice;
          
          return (
            <Card
              key={tier.name}
              className={cn(
                "relative flex flex-col justify-between border transition-all duration-300 hover:shadow-lg w-full bg-card",
                tier.isPopular
                  ? "border-primary shadow-md shadow-primary/5 ring-1 ring-primary/25 md:scale-105 z-10"
                  : "border-border/80"
              )}
            >
              {tier.isPopular && (
                <span className="absolute -top-3 left-[50%] translate-x-[-50%] flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-wider shadow-xs shadow-primary/20 select-none">
                  <Sparkles className="h-3.5 w-3.5 fill-current" /> Most Popular
                </span>
              )}
              
              <div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold">{tier.name}</CardTitle>
                  <CardDescription className="text-xs leading-normal mt-1.5">{tier.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Cost metric */}
                  <div className="space-y-1">
                    <p className="text-3xl font-black text-foreground">
                      ${price}
                      <span className="text-xs font-medium text-muted-foreground lowercase"> / month</span>
                    </p>
                    <p className="text-[10px] text-muted-foreground font-semibold">
                      {billingInterval === "annual" ? `Billed $${price * 12} annually` : "Billed monthly"}
                    </p>
                  </div>

                  <Separator />

                  {/* Checklist features */}
                  <div className="space-y-3 select-none">
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Features included:</h4>
                    <ul className="space-y-2.5 text-xs text-foreground">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 leading-tight">
                          {feat.included ? (
                            <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground/40 shrink-0 mt-0.5" />
                          )}
                          <span className={cn(feat.included ? "text-foreground" : "text-muted-foreground/50")}>
                            {feat.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </div>

              <CardFooter className="pt-4 pb-6">
                <Button
                  className={cn("w-full font-semibold cursor-pointer shadow-xs", !tier.isPopular && "border-border/80")}
                  variant={tier.isPopular ? "default" : "outline"}
                  onClick={() => alert(`Subscribing to: ${tier.name} Plan`)}
                >
                  {tier.ctaText}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <Separator className="max-w-4xl mx-auto" />

      {/* Accordion FAQ section */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-2 justify-center">
          <HelpCircle className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold tracking-tight text-center">Frequently Asked Queries</h2>
        </div>
        
        <div className="divide-y divide-border/60 border border-border/80 rounded-xl overflow-hidden bg-card">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="bg-card">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex items-center justify-between w-full p-4 font-bold text-xs sm:text-sm text-foreground hover:bg-muted/10 transition-colors text-left cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 ml-4" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed bg-muted/5 animate-in slide-in-from-top-1 duration-150 select-text border-t border-border/10">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
