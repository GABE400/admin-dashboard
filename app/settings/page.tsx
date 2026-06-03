"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTheme as useNextTheme } from "next-themes";
import {
  User,
  Settings as SettingsIcon,
  Bell,
  Palette,
  CreditCard,
  Save,
  Upload,
  Sun,
  Moon,
  Laptop,
  Download,
  AlertCircle,
  Lock,
} from "lucide-react";

import { useLayout } from "@/components/layout-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mockInvoices } from "@/lib/mock-data";
import { cn } from "@/app/utils";

// --- VALIDATION SCHEMAS ---
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  bio: z.string().max(160, "Bio must be under 160 characters").optional(),
  timezone: z.string().min(1, "Please select a timezone"),
});

const accountSchema = z.object({
  currentPassword: z.string().min(6, "Current password must be at least 6 characters"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirmation is required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "New passwords do not match",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type AccountFormValues = z.infer<typeof accountSchema>;

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState<"profile" | "account" | "notifications" | "appearance" | "billing">("profile");
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);

  const { layoutMode, setLayoutMode, fontSize, setFontSize, sidebarDensity, setSidebarDensity, layoutDirection, setLayoutDirection } = useLayout();
  const { theme, setTheme } = useNextTheme();

  // --- Profile Form setup ---
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Emma Watson",
      email: "emma.watson@aether.com",
      bio: "Senior Product Engineering Lead at Aether Corporation. Exploring reactive grid structures and client-side visualization mechanics.",
      timezone: "America/New_York",
    },
  });

  // --- Account Form setup ---
  const accountForm = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // --- Notifications states ---
  const [notifications, setNotifications] = React.useState({
    emailDigest: true,
    emailSecurity: true,
    emailProduct: false,
    pushSystem: true,
    pushActivity: false,
    smsMfa: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (values: ProfileFormValues) => {
    setSaveSuccess(true);
    console.log("Saving profile configuration data:", values);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleSaveAccount = (values: AccountFormValues) => {
    setSaveSuccess(true);
    console.log("Saving account credential modifications:", values);
    accountForm.reset({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleSaveNotifications = () => {
    setSaveSuccess(true);
    console.log("Saving user notification preferences:", notifications);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Helper Switch UI
  const RenderSwitch = ({
    value,
    onChange,
  }: {
    value: boolean;
    onChange: () => void;
  }) => (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden",
        value ? "bg-primary" : "bg-zinc-200 dark:bg-zinc-800"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out",
          value ? "translate-x-4" : "translate-x-0"
        )}
      />
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">User Preferences</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your account profiles, visual layouts, alert triggers, and invoice logs.
          </p>
        </div>
        
        {saveSuccess && (
          <div className="bg-emerald-500/10 border border-emerald-500/35 text-emerald-600 dark:text-emerald-500 rounded-lg px-4 py-2 text-xs font-semibold animate-pulse h-fit">
            ✓ Modifications saved successfully!
          </div>
        )}
      </div>

      {/* Main Grid settings wrap */}
      <div className="grid gap-6 md:grid-cols-4">
        {/* Navigation Sidebar Panel */}
        <div className="flex flex-row md:flex-col overflow-x-auto gap-1 border-b md:border-b-0 md:border-r border-border pb-3 md:pb-0 md:pr-4 select-none shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveTab("profile")}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all-custom cursor-pointer text-left whitespace-nowrap md:w-full",
              activeTab === "profile"
                ? "bg-primary/5 dark:bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
            )}
          >
            <User className="h-4 w-4" /> User Profile
          </button>
          
          <button
            onClick={() => setActiveTab("account")}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all-custom cursor-pointer text-left whitespace-nowrap md:w-full",
              activeTab === "account"
                ? "bg-primary/5 dark:bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
            )}
          >
            <Lock className="h-4 w-4" /> Credentials & Security
          </button>
          
          <button
            onClick={() => setActiveTab("notifications")}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all-custom cursor-pointer text-left whitespace-nowrap md:w-full",
              activeTab === "notifications"
                ? "bg-primary/5 dark:bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
            )}
          >
            <Bell className="h-4 w-4" /> Alert Notifications
          </button>
          
          <button
            onClick={() => setActiveTab("appearance")}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all-custom cursor-pointer text-left whitespace-nowrap md:w-full",
              activeTab === "appearance"
                ? "bg-primary/5 dark:bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
            )}
          >
            <Palette className="h-4 w-4" /> Visual Appearance
          </button>
          
          <button
            onClick={() => setActiveTab("billing")}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all-custom cursor-pointer text-left whitespace-nowrap md:w-full",
              activeTab === "billing"
                ? "bg-primary/5 dark:bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
            )}
          >
            <CreditCard className="h-4 w-4" /> Subscription & Invoices
          </button>
        </div>

        {/* Dynamic Form View Container */}
        <div className="md:col-span-3 space-y-6">
          
          {/* ================= PROFILE TAB ================= */}
          {activeTab === "profile" && (
            <Card className="border border-border/80 bg-card">
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
                <CardDescription>
                  Modify your public identity layout parameters and professional details.
                </CardDescription>
              </CardHeader>
              <form onSubmit={profileForm.handleSubmit(handleSaveProfile)}>
                <CardContent className="space-y-6">
                  {/* Avatar Upload */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl border border-dashed border-border bg-muted/10">
                    <div className="relative h-20 w-20 rounded-full border border-border bg-muted flex items-center justify-center overflow-hidden shrink-0">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Preview" className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-xl font-bold bg-primary/10 text-primary">
                          EW
                        </div>
                      )}
                    </div>
                    <div className="space-y-2 text-center sm:text-left flex-1">
                      <h4 className="text-sm font-bold text-foreground">Profile Avatar</h4>
                      <p className="text-xs text-muted-foreground max-w-sm leading-normal">
                        Supports PNG, JPG, or GIF images up to 2MB. Drag and drop a file or upload from files.
                      </p>
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <label className="relative flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border text-xs font-semibold rounded-lg hover:bg-secondary/60 transition-colors cursor-pointer text-foreground shadow-xs">
                          <Upload className="h-3 w-3" /> Upload image
                          <input type="file" className="sr-only" accept="image/*" onChange={handleAvatarChange} />
                        </label>
                        {avatarPreview && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-xs text-red-500 hover:text-red-600 hover:bg-red-500/10 cursor-pointer"
                            onClick={() => setAvatarPreview(null)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Info details */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Display Name
                      </label>
                      <input
                        type="text"
                        {...profileForm.register("name")}
                        className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                      {profileForm.formState.errors.name && (
                        <p className="text-xs text-red-500 font-medium">
                          {profileForm.formState.errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Email Address
                      </label>
                      <input
                        type="email"
                        {...profileForm.register("email")}
                        className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                      {profileForm.formState.errors.email && (
                        <p className="text-xs text-red-500 font-medium">
                          {profileForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Timezone */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        System Timezone
                      </label>
                      <select
                        {...profileForm.register("timezone")}
                        className="w-full h-9 rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
                      >
                        <option value="America/New_York">Eastern Time (ET) - New York</option>
                        <option value="America/Chicago">Central Time (CT) - Chicago</option>
                        <option value="America/Denver">Mountain Time (MT) - Denver</option>
                        <option value="America/Los_Angeles">Pacific Time (PT) - Los Angeles</option>
                        <option value="Europe/London">London (GMT)</option>
                        <option value="Europe/Paris">Paris (CET)</option>
                        <option value="Asia/Tokyo">Tokyo (JST)</option>
                      </select>
                      {profileForm.formState.errors.timezone && (
                        <p className="text-xs text-red-500 font-medium">
                          {profileForm.formState.errors.timezone.message}
                        </p>
                      )}
                    </div>

                    {/* Bio */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Professional Bio
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about yourself..."
                        {...profileForm.register("bio")}
                        className="w-full rounded-lg border border-border bg-background p-3 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary resize-none leading-relaxed"
                      />
                      {profileForm.formState.errors.bio && (
                        <p className="text-xs text-red-500 font-medium">
                          {profileForm.formState.errors.bio.message}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-border/80 px-6 py-4 flex justify-end">
                  <Button type="submit" className="gap-2 cursor-pointer font-semibold shadow-xs">
                    <Save className="h-4 w-4" /> Save Profile Details
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}

          {/* ================= SECURITY & CREDENTIALS TAB ================= */}
          {activeTab === "account" && (
            <Card className="border border-border/80 bg-card">
              <CardHeader>
                <CardTitle>Credentials & Authentication</CardTitle>
                <CardDescription>
                  Modify and secure your password credentials.
                </CardDescription>
              </CardHeader>
              <form onSubmit={accountForm.handleSubmit(handleSaveAccount)}>
                <CardContent className="space-y-4">
                  {/* Current Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      {...accountForm.register("currentPassword")}
                      className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                    {accountForm.formState.errors.currentPassword && (
                      <p className="text-xs text-red-500 font-medium">
                        {accountForm.formState.errors.currentPassword.message}
                      </p>
                    )}
                  </div>

                  <Separator />

                  {/* New Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      {...accountForm.register("newPassword")}
                      className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                    {accountForm.formState.errors.newPassword && (
                      <p className="text-xs text-red-500 font-medium">
                        {accountForm.formState.errors.newPassword.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      {...accountForm.register("confirmPassword")}
                      className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                    {accountForm.formState.errors.confirmPassword && (
                      <p className="text-xs text-red-500 font-medium">
                        {accountForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-border/80 px-6 py-4 flex justify-end">
                  <Button type="submit" className="gap-2 cursor-pointer font-semibold shadow-xs">
                    <Save className="h-4 w-4" /> Update Credentials
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}

          {/* ================= NOTIFICATIONS TAB ================= */}
          {activeTab === "notifications" && (
            <Card className="border border-border/80 bg-card">
              <CardHeader>
                <CardTitle>Notifications Settings</CardTitle>
                <CardDescription>
                  Choose how and when Aether communicates with you. Toggle specific categories.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Email notifications group */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-foreground">Email Communications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/10">
                      <div className="space-y-1 max-w-[80%]">
                        <span className="text-xs font-bold text-foreground block">Weekly Activity Digest</span>
                        <span className="text-[11px] text-muted-foreground leading-normal block">
                          Receive consolidated reports outlining server health statistics, CRM milestones, and Kanban velocities.
                        </span>
                      </div>
                      <RenderSwitch value={notifications.emailDigest} onChange={() => toggleNotification("emailDigest")} />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/10">
                      <div className="space-y-1 max-w-[80%]">
                        <span className="text-xs font-bold text-foreground block">Security & Access Audits</span>
                        <span className="text-[11px] text-muted-foreground leading-normal block">
                          Receive notifications immediately on new logins, session invalidations, or key additions.
                        </span>
                      </div>
                      <RenderSwitch value={notifications.emailSecurity} onChange={() => toggleNotification("emailSecurity")} />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/10">
                      <div className="space-y-1 max-w-[80%]">
                        <span className="text-xs font-bold text-foreground block">Product Updates & Features</span>
                        <span className="text-[11px] text-muted-foreground leading-normal block">
                          Receive occasional announcements about new tools and system integrations.
                        </span>
                      </div>
                      <RenderSwitch value={notifications.emailProduct} onChange={() => toggleNotification("emailProduct")} />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Push alerts notifications group */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-foreground">Push Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/10">
                      <div className="space-y-1 max-w-[80%]">
                        <span className="text-xs font-bold text-foreground block">System Health Errors</span>
                        <span className="text-[11px] text-muted-foreground leading-normal block">
                          Triggers push notifications when API response thresholds or cpu spikes breach alert parameters.
                        </span>
                      </div>
                      <RenderSwitch value={notifications.pushSystem} onChange={() => toggleNotification("pushSystem")} />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/10">
                      <div className="space-y-1 max-w-[80%]">
                        <span className="text-xs font-bold text-foreground block">User Event Timeline Feeds</span>
                        <span className="text-[11px] text-muted-foreground leading-normal block">
                          Triggers push notifications when project cards are dropped in columns or invoice updates occur.
                        </span>
                      </div>
                      <RenderSwitch value={notifications.pushActivity} onChange={() => toggleNotification("pushActivity")} />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* SMS alerts notifications group */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-foreground">SMS Alerts</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/10">
                      <div className="space-y-1 max-w-[80%]">
                        <span className="text-xs font-bold text-foreground block">Two-Factor Authentication Alerts</span>
                        <span className="text-[11px] text-muted-foreground leading-normal block">
                          Receive code verification SMS immediately when authenticating sessions.
                        </span>
                      </div>
                      <RenderSwitch value={notifications.smsMfa} onChange={() => toggleNotification("smsMfa")} />
                    </div>
                  </div>
                </div>

              </CardContent>
              <CardFooter className="border-t border-border/80 px-6 py-4 flex justify-end">
                <Button onClick={handleSaveNotifications} className="gap-2 cursor-pointer font-semibold shadow-xs">
                  <Save className="h-4 w-4" /> Save Notifications
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* ================= APPEARANCE TAB ================= */}
          {activeTab === "appearance" && (
            <Card className="border border-border/80 bg-card">
              <CardHeader>
                <CardTitle>Appearance & Themes</CardTitle>
                <CardDescription>
                  Modify the layout mode, font size scale, color theme, and sidebar density.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* 1. Theme Selector */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-foreground">Color Palette Mode</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {/* Light Theme Option */}
                    <button
                      type="button"
                      onClick={() => setTheme("light")}
                      className={cn(
                        "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/10 text-zinc-900 cursor-pointer w-full text-center transition-all duration-200",
                        theme === "light" ? "border-primary shadow-xs ring-1 ring-primary/20" : "border-border"
                      )}
                    >
                      <Sun className="h-5 w-5 text-amber-500" />
                      <span className="text-xs font-bold">Light mode</span>
                    </button>

                    {/* Dark Theme Option */}
                    <button
                      type="button"
                      onClick={() => setTheme("dark")}
                      className={cn(
                        "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 bg-zinc-900 hover:bg-zinc-950 text-zinc-100 cursor-pointer w-full text-center transition-all duration-200",
                        theme === "dark" ? "border-primary shadow-xs ring-1 ring-primary/20" : "border-border"
                      )}
                    >
                      <Moon className="h-5 w-5 text-indigo-400" />
                      <span className="text-xs font-bold">Dark mode</span>
                    </button>

                    {/* System Theme Option */}
                    <button
                      type="button"
                      onClick={() => setTheme("system")}
                      className={cn(
                        "relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 bg-background hover:bg-secondary/40 text-foreground cursor-pointer w-full text-center transition-all duration-200",
                        theme === "system" ? "border-primary shadow-xs ring-1 ring-primary/20" : "border-border"
                      )}
                    >
                      <Laptop className="h-5 w-5 text-muted-foreground" />
                      <span className="text-xs font-bold">System Default</span>
                    </button>
                  </div>
                </div>

                <Separator />

                {/* 2. Root Font Size Scale */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-foreground">Global Font Size Scale</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Scales root rem multipliers, sizing borders, text ranges, and components across the entire view.
                  </p>
                  <div className="flex bg-muted/40 rounded-lg p-1 border border-border/80 w-fit gap-1">
                    {(["sm", "base", "lg"] as const).map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setFontSize(size)}
                        className={cn(
                          "px-4 py-1.5 rounded-md text-xs font-bold cursor-pointer transition-all duration-250 select-none",
                          fontSize === size
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {size === "sm" ? "Small (14px)" : size === "base" ? "Medium (16px)" : "Large (18px)"}
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* 3. Sidebar Padding Density */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-foreground">Sidebar Padding Density</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Adjust item line spacing and paddings inside the Collapsible Navigation Frame.
                  </p>
                  <div className="flex bg-muted/40 rounded-lg p-1 border border-border/80 w-fit gap-1">
                    {(["compact", "normal", "spacious"] as const).map((density) => (
                      <button
                        key={density}
                        type="button"
                        onClick={() => setSidebarDensity(density)}
                        className={cn(
                          "px-4 py-1.5 rounded-md text-xs font-bold cursor-pointer transition-all duration-250 select-none capitalize",
                          sidebarDensity === density
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {density}
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* 4. Layout mode Frame selector */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-foreground">Dashboard Layout Framework</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Choose between a vertical sidebar configuration or a top-header horizontal grid.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setLayoutMode("vertical")}
                      className={cn(
                        "flex flex-col items-start p-4 rounded-xl border-2 transition-all duration-250 bg-card cursor-pointer w-full text-left",
                        layoutMode === "vertical" ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/35"
                      )}
                    >
                      <span className="text-xs font-bold text-foreground">Vertical Sidebar Layout</span>
                      <span className="text-[10px] text-muted-foreground mt-1 leading-normal">
                        Renders the collapsible left sidebar navigation alongside top header metrics bars.
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLayoutMode("horizontal")}
                      className={cn(
                        "flex flex-col items-start p-4 rounded-xl border-2 transition-all duration-250 bg-card cursor-pointer w-full text-left",
                        layoutMode === "horizontal" ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/35"
                      )}
                    >
                      <span className="text-xs font-bold text-foreground">Horizontal Header Layout</span>
                      <span className="text-[10px] text-muted-foreground mt-1 leading-normal">
                        Renders horizontal categories and submenu options inside the top header viewport.
                      </span>
                    </button>
                  </div>
                </div>

                <Separator />

                {/* 5. Layout Direction (LTR/RTL) */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-foreground">Text & Layout Direction</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Select direction formatting. Mirror layouts instantly for languages like Arabic, Hebrew, or Persian.
                  </p>
                  <div className="flex bg-muted/40 rounded-lg p-1 border border-border/80 w-fit gap-1">
                    {(["ltr", "rtl"] as const).map((dir) => (
                      <button
                        key={dir}
                        type="button"
                        onClick={() => setLayoutDirection(dir)}
                        className={cn(
                          "px-4 py-1.5 rounded-md text-xs font-bold cursor-pointer transition-all duration-250 select-none uppercase",
                          layoutDirection === dir
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {dir}
                      </button>
                    ))}
                  </div>
                </div>

              </CardContent>
              <CardFooter className="border-t border-border/80 px-6 py-4">
                <p className="text-[10px] text-muted-foreground">
                  * Appearance tokens are cached inside the browser's <code>localStorage</code> to resolve flashes on reload.
                </p>
              </CardFooter>
            </Card>
          )}

          {/* ================= BILLING & SUBSCRIPTIONS TAB ================= */}
          {activeTab === "billing" && (
            <div className="space-y-6">
              
              {/* Plan Card & Usage Row */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Active Plan info */}
                <Card className="border border-border/85 bg-card relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-primary/30 to-transparent blur-xl" />
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-primary/10 border-primary/20 text-primary hover:bg-primary/25 font-bold text-[10px]">
                        Active Account
                      </Badge>
                      <span className="text-xs text-muted-foreground font-semibold">Scale Premium Plan</span>
                    </div>
                    <CardTitle className="text-2xl font-extrabold mt-1 text-primary">Aether Enterprise</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 pb-4">
                    <p className="text-3xl font-extrabold text-foreground">
                      $129.00 <span className="text-xs font-medium text-muted-foreground">/ month</span>
                    </p>
                    <p className="text-[11px] text-muted-foreground pt-1.5">
                      Renews automatically on <strong className="font-semibold text-foreground/80">June 28, 2026</strong>.
                    </p>
                  </CardContent>
                  <CardFooter className="border-t border-border/60 bg-muted/10 py-3 flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">Upgrade for higher bandwidth.</span>
                    <Button size="sm" className="text-xs h-7 px-3 cursor-pointer" onClick={() => alert("Simulation: Upgrading plans...")}>
                      Upgrade Plan
                    </Button>
                  </CardFooter>
                </Card>

                {/* API Request Usage Card */}
                <Card className="border border-border/85 bg-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-bold text-foreground">API Usage Ledger (Monthly)</CardTitle>
                    <CardDescription>Metrics refresh on renewal dates.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-muted-foreground">API Queries Dispatched:</span>
                        <span className="text-foreground font-bold">84,200 / 100,000 requests (84.2%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-muted dark:bg-zinc-800 overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-500 w-[84.2%]" />
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2 text-xs text-muted-foreground leading-normal p-3 rounded-lg border border-yellow-500/25 bg-yellow-500/5">
                      <AlertCircle className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
                      <span>
                        You have breached 80% of your allocated monthly API requests. Upgrading guarantees buffer headroom.
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Invoice list History */}
              <Card className="border border-border/80 bg-card">
                <CardHeader>
                  <CardTitle>Invoicing Records History</CardTitle>
                  <CardDescription>
                    Download and inspect receipts from past billing runs.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/80 bg-muted/20 text-left text-muted-foreground font-semibold">
                          <th className="p-4 pl-6">Invoice ID</th>
                          <th className="p-4">Date</th>
                          <th className="p-4">Billing Amount</th>
                          <th className="p-4">Receipt Status</th>
                          <th className="p-4 pr-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        {mockInvoices.map((inv) => (
                          <tr key={inv.id} className="hover:bg-muted/10 transition-colors">
                            <td className="p-4 pl-6 font-semibold text-primary">{inv.id}</td>
                            <td className="p-4 text-xs text-muted-foreground">
                              {new Date(inv.invoiceDate).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </td>
                            <td className="p-4 font-semibold text-foreground">
                              ${(inv.items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0) + 
                                 (inv.items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0) * inv.taxRate) / 100 - 
                                 inv.discount).toFixed(2)}
                            </td>
                            <td className="p-4">
                              <Badge
                                variant={inv.status === "paid" ? "success" : inv.status === "overdue" ? "destructive" : "secondary"}
                                className="capitalize text-[9px] py-0 px-1.5 h-4.5"
                              >
                                {inv.status}
                              </Badge>
                            </td>
                            <td className="p-4 pr-6 text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-muted-foreground hover:text-primary cursor-pointer"
                                onClick={() => alert(`Downloading Invoice Details: ${inv.id}`)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
