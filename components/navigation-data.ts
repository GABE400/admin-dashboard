import {
  LayoutDashboard,
  BarChart3,
  FileSpreadsheet,
  Users,
  Briefcase,
  Calendar,
  MessageSquare,
  Receipt,
  User,
  Settings,
  CreditCard,
  ShieldCheck,
  Grid,
  SquareDot,
  MousePointerClick,
  PanelTop,
  HelpCircle,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeVariant?: "default" | "secondary" | "destructive" | "success";
  children?: Omit<NavItem, "children">[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigationData: NavSection[] = [
  {
    title: "Dashboard",
    items: [
      { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
      { label: "Analytics", href: "/analytics", icon: BarChart3 },
      { label: "Reports", href: "/reports", icon: FileSpreadsheet },
    ],
  },
  {
    title: "Apps",
    items: [
      { label: "CRM", href: "/apps/crm", icon: Users },
      { label: "Projects", href: "/apps/projects", icon: Briefcase },
      { label: "Calendar", href: "/apps/calendar", icon: Calendar },
      {
        label: "Chat",
        href: "/apps/chat",
        icon: MessageSquare,
        badge: 3,
        badgeVariant: "default",
      },
      { label: "Invoice", href: "/apps/invoice", icon: Receipt },
    ],
  },
  {
    title: "Pages",
    items: [
      { label: "User Profile", href: "/profile", icon: User },
      { label: "Settings", href: "/settings", icon: Settings },
      { label: "Pricing", href: "/pricing", icon: CreditCard },
      {
        label: "Auth Pages",
        href: "/auth",
        icon: ShieldCheck,
        children: [
          { label: "Login", href: "/auth/login", icon: SquareDot },
          { label: "Register", href: "/auth/register", icon: SquareDot },
          { label: "Forgot Password", href: "/auth/forgot-password", icon: SquareDot },
          { label: "Reset Password", href: "/auth/reset-password", icon: SquareDot },
        ],
      },
    ],
  },
  {
    title: "UI Elements",
    items: [
      {
        label: "Components",
        href: "/ui",
        icon: Grid,
        children: [
          { label: "Buttons", href: "/ui/buttons", icon: MousePointerClick },
          { label: "Badges", href: "/ui/badges", icon: SquareDot },
          { label: "Cards", href: "/ui/cards", icon: PanelTop },
          { label: "Tooltips", href: "/ui/tooltips", icon: HelpCircle },
        ],
      },
    ],
  },
];
