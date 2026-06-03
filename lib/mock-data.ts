import demoData from "./demo-data.json";

export interface KpiMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  iconName: string;
  sparklineData: { value: number }[];
}

export interface RevenueData {
  month: string;
  revenue: number;
  target: number;
}

export interface Transaction {
  id: string;
  name: string;
  email: string;
  avatar: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  date: string;
}

export interface ProductData {
  name: string;
  revenue: number;
  percentage: number;
}

export interface QuickStat {
  label: string;
  value: string;
  percentage: number; // 0 to 100
  colorClass: string;
}

export interface ActivityEvent {
  id: string;
  userName: string;
  userAvatar: string;
  description: string;
  time: string;
}

export const kpiMetrics: KpiMetric[] = [
  {
    title: "Total Revenue",
    value: "$128,450.00",
    change: "+14.2%",
    isPositive: true,
    iconName: "DollarSign",
    sparklineData: [
      { value: 100 },
      { value: 120 },
      { value: 110 },
      { value: 130 },
      { value: 125 },
      { value: 140 },
      { value: 148 },
    ],
  },
  {
    title: "Active Users",
    value: "8,294",
    change: "+5.8%",
    isPositive: true,
    iconName: "Users",
    sparklineData: [
      { value: 400 },
      { value: 420 },
      { value: 410 },
      { value: 440 },
      { value: 430 },
      { value: 450 },
      { value: 462 },
    ],
  },
  {
    title: "New Signups",
    value: "642",
    change: "+22.1%",
    isPositive: true,
    iconName: "UserPlus",
    sparklineData: [
      { value: 30 },
      { value: 45 },
      { value: 40 },
      { value: 55 },
      { value: 50 },
      { value: 68 },
      { value: 72 },
    ],
  },
  {
    title: "Churn Rate",
    value: "1.84%",
    change: "-0.4%",
    isPositive: false, // negative change in churn is good, but value change indicator is negative
    iconName: "TrendingDown",
    sparklineData: [
      { value: 2.2 },
      { value: 2.1 },
      { value: 2.0 },
      { value: 1.95 },
      { value: 1.9 },
      { value: 1.86 },
      { value: 1.84 },
    ],
  },
];

export const revenue12Months: RevenueData[] = [
  { month: "Jan", revenue: 82000, target: 80000 },
  { month: "Feb", revenue: 85000, target: 82000 },
  { month: "Mar", revenue: 91000, target: 85000 },
  { month: "Apr", revenue: 95000, target: 90000 },
  { month: "May", revenue: 98000, target: 95000 },
  { month: "Jun", revenue: 104000, target: 100000 },
  { month: "Jul", revenue: 108000, target: 105000 },
  { month: "Aug", revenue: 112000, target: 110000 },
  { month: "Sep", revenue: 115000, target: 115000 },
  { month: "Oct", revenue: 120000, target: 120000 },
  { month: "Nov", revenue: 124000, target: 122000 },
  { month: "Dec", revenue: 128450, target: 125000 },
];

const hasSeededTransactions = demoData && (demoData as any).transactions && (demoData as any).transactions.length > 0;

export const recentTransactions: Transaction[] = hasSeededTransactions
  ? ((demoData as any).transactions as any[]).slice(0, 10).map((tx) => ({
      id: tx.id,
      name: tx.name,
      email: tx.email,
      avatar: tx.avatar,
      amount: tx.amount,
      status: tx.status as "paid" | "pending" | "failed",
      date: tx.date,
    }))
  : [
      {
        id: "tx-1",
        name: "Alex Rivera",
        email: "alex.r@aether.com",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=64",
        amount: 1250.0,
        status: "paid",
        date: "2026-06-03T09:40:00Z",
      },
      {
        id: "tx-2",
        name: "Sarah Chen",
        email: "s.chen@aether.com",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=64",
        amount: 320.5,
        status: "pending",
        date: "2026-06-02T16:15:00Z",
      },
      {
        id: "tx-3",
        name: "Marcus Vance",
        email: "m.vance@aether.com",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=64",
        amount: 150.0,
        status: "failed",
        date: "2026-06-02T11:04:00Z",
      },
      {
        id: "tx-4",
        name: "Elena Rostova",
        email: "e.rostova@aether.com",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=64",
        amount: 2450.0,
        status: "paid",
        date: "2026-06-01T15:20:00Z",
      },
      {
        id: "tx-5",
        name: "Tariq Malik",
        email: "t.malik@aether.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=64",
        amount: 99.0,
        status: "paid",
        date: "2026-05-31T08:45:00Z",
      },
      {
        id: "tx-6",
        name: "Sofia Geller",
        email: "s.geller@aether.com",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=64",
        amount: 450.0,
        status: "paid",
        date: "2026-05-30T17:30:00Z",
      },
      {
        id: "tx-7",
        name: "Liam O'Connor",
        email: "l.oconnor@aether.com",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=64",
        amount: 180.0,
        status: "pending",
        date: "2026-05-30T10:12:00Z",
      },
      {
        id: "tx-8",
        name: "Yuki Tanaka",
        email: "y.tanaka@aether.com",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=64",
        amount: 890.0,
        status: "paid",
        date: "2026-05-29T13:24:00Z",
      },
      {
        id: "tx-9",
        name: "Marcus Vance",
        email: "m.vance@aether.com",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=64",
        amount: 75.0,
        status: "failed",
        date: "2026-05-28T09:15:00Z",
      },
      {
        id: "tx-10",
        name: "Chloe Dupont",
        email: "c.dupont@aether.com",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=64",
        amount: 350.0,
        status: "paid",
        date: "2026-05-27T14:02:00Z",
      },
    ];

export const topProducts: ProductData[] = [
  { name: "Aether API Core", revenue: 54200, percentage: 42.2 },
  { name: "Aether Agent Analytics", revenue: 32150, percentage: 25.0 },
  { name: "Compute Server Nodes", revenue: 21850, percentage: 17.0 },
  { name: "Global Edge DNS", revenue: 12845, percentage: 10.0 },
  { name: "Audit Logging Vault", revenue: 7405, percentage: 5.8 },
];

export const quickStats: QuickStat[] = [
  {
    label: "Server Uptime",
    value: "99.98%",
    percentage: 99.98,
    colorClass: "stroke-emerald-500",
  },
  {
    label: "Open Tickets",
    value: "12 / 85",
    percentage: 14.1, // 12 divided by 85
    colorClass: "stroke-indigo-500",
  },
  {
    label: "Conversion Rate",
    value: "3.42%",
    percentage: 34.2, // scaled for display
    colorClass: "stroke-violet-500",
  },
];

export const activityEvents: ActivityEvent[] = [
  {
    id: "evt-1",
    userName: "Alex Rivera",
    userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=64",
    description: "initiated a deployment to production environment cluster (us-west-2)",
    time: "2 mins ago",
  },
  {
    id: "evt-2",
    userName: "Sarah Chen",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=64",
    description: "upgraded team billing plan to Enterprise Scale Tier",
    time: "24 mins ago",
  },
  {
    id: "evt-3",
    userName: "Elena Rostova",
    userAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=64",
    description: "generated a new set of API master developer keys",
    time: "1 hr ago",
  },
  {
    id: "evt-4",
    userName: "System Daemon",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=64",
    description: "triggered auto-reboot of cluster proxy nodes (node-ams-3)",
    time: "2 hrs ago",
  },
  {
    id: "evt-5",
    userName: "Marcus Vance",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=64",
    description: "submitted a critical system ticket: routing latency error",
    time: "4 hrs ago",
  },
  {
    id: "evt-6",
    userName: "Kenji Sato",
    userAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=64",
    description: "added two team members: devops-1@aether.com and sec-ops@aether.com",
    time: "1 day ago",
  },
];

export interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: "active" | "lead" | "customer";
  lastContact: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export interface DetailedInvoice {
  id: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  clientAddress: string;
  invoiceDate: string;
  dueDate: string;
  status: "draft" | "sent" | "paid" | "overdue";
  items: InvoiceItem[];
  taxRate: number;
  discount: number;
}

export interface KanbanCard {
  id: string;
  title: string;
  assignees: { name: string; avatar: string }[];
  priority: "low" | "medium" | "high";
  dueDate: string;
  comments: number;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

const hasSeededContacts = demoData && (demoData as any).contacts && (demoData as any).contacts.length > 0;

export const mockContacts: Contact[] = hasSeededContacts
  ? ((demoData as any).contacts as any[]).map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      company: c.company,
      phone: c.phone,
      status: c.status as "active" | "lead" | "customer",
      lastContact: c.lastContact,
    }))
  : [
      {
        id: "c-1",
        name: "Alex Rivera",
        email: "alex.r@aether.com",
        company: "Acme Corp",
        phone: "+1 (555) 123-4567",
        status: "active",
        lastContact: "2026-06-01",
      },
      {
        id: "c-2",
        name: "Sarah Chen",
        email: "s.chen@aether.com",
        company: "Stark Industries",
        phone: "+1 (555) 987-6543",
        status: "customer",
        lastContact: "2026-05-28",
      },
      {
        id: "c-3",
        name: "Marcus Vance",
        email: "m.vance@aether.com",
        company: "Wayne Enterprises",
        phone: "+1 (555) 345-6789",
        status: "lead",
        lastContact: "2026-06-02",
      },
      {
        id: "c-4",
        name: "Elena Rostova",
        email: "e.rostova@aether.com",
        company: "Tyrell Corp",
        phone: "+1 (555) 765-4321",
        status: "active",
        lastContact: "2026-05-30",
      },
      {
        id: "c-5",
        name: "Tariq Malik",
        email: "t.malik@aether.com",
        company: "LexCorp",
        phone: "+1 (555) 234-5678",
        status: "customer",
        lastContact: "2026-06-03",
      },
      {
        id: "c-6",
        name: "Emma Watson",
        email: "e.watson@aether.com",
        company: "Hogwarts Ltd",
        phone: "+1 (555) 345-6789",
        status: "lead",
        lastContact: "2026-05-31",
      },
      {
        id: "c-7",
        name: "Kenji Sato",
        email: "k.sato@aether.com",
        company: "Cyberdyne Systems",
        phone: "+1 (555) 765-4321",
        status: "active",
        lastContact: "2026-05-29",
      },
      {
        id: "c-8",
        name: "Lisa Anderson",
        email: "l.anderson@aether.com",
        company: "Tyrell Corp",
        phone: "+1 (555) 678-9012",
        status: "customer",
        lastContact: "2026-06-03",
      },
    ];

export const mockInvoices: DetailedInvoice[] = [
  {
    id: "INV-1001",
    clientName: "Alex Rivera",
    clientEmail: "alex.r@aether.com",
    clientCompany: "Acme Corp",
    clientAddress: "123 Innovation Way, Suite 400, Tech City, TC 94016",
    invoiceDate: "2026-05-15",
    dueDate: "2026-06-15",
    status: "paid",
    items: [
      { description: "Aether API Core Subscription (Monthly)", quantity: 1, price: 950.0 },
      { description: "Compute Server Nodes Usage (Overage)", quantity: 3, price: 100.0 },
    ],
    taxRate: 8,
    discount: 50.0,
  },
  {
    id: "INV-1002",
    clientName: "Sarah Chen",
    clientEmail: "s.chen@aether.com",
    clientCompany: "Stark Industries",
    clientAddress: "10880 Wilshire Blvd, Los Angeles, CA 90024",
    invoiceDate: "2026-05-20",
    dueDate: "2026-06-20",
    status: "paid",
    items: [
      { description: "Aether Agent Analytics Licensing", quantity: 1, price: 3200.0 },
    ],
    taxRate: 8,
    discount: 0,
  },
  {
    id: "INV-1003",
    clientName: "Marcus Vance",
    clientEmail: "m.vance@aether.com",
    clientCompany: "Lex Corp",
    clientAddress: "350 Fifth Ave, New York, NY 10118",
    invoiceDate: "2026-05-25",
    dueDate: "2026-06-10",
    status: "sent",
    items: [
      { description: "Aether API Core Setup & Consulting", quantity: 3, price: 150.0 },
    ],
    taxRate: 8,
    discount: 0,
  },
  {
    id: "INV-1004",
    clientName: "Elena Rostova",
    clientEmail: "e.rostova@aether.com",
    clientCompany: "Oscorp",
    clientAddress: "725 Fifth Ave, New York, NY 10022",
    invoiceDate: "2026-05-01",
    dueDate: "2026-06-01",
    status: "overdue",
    items: [
      { description: "Global Edge DNS Enterprise Plan", quantity: 1, price: 5400.0 },
    ],
    taxRate: 8,
    discount: 0,
  },
  {
    id: "INV-1005",
    clientName: "Tariq Malik",
    clientEmail: "t.malik@aether.com",
    clientCompany: "Wayne Enterprises",
    clientAddress: "1007 Mountain Drive, Gotham City, NJ 07001",
    invoiceDate: "2026-05-28",
    dueDate: "2026-06-28",
    status: "draft",
    items: [
      { description: "Audit Logging Vault setup", quantity: 1, price: 980.0 },
    ],
    taxRate: 8,
    discount: 0,
  },
];

const getSeededKanbanBoard = (): KanbanColumn[] => {
  if (!demoData || !(demoData as any).projects) return [];
  const cols = ["backlog", "in-progress", "review", "done"] as const;
  return cols.map((colId) => {
    const cards = ((demoData as any).projects as any[])
      .filter((p) => p.column === colId)
      .map((p) => ({
        id: p.id,
        title: p.title,
        priority: p.priority as "low" | "medium" | "high",
        dueDate: p.dueDate,
        comments: p.comments,
        assignees: (p.assignees as string[]).map((avatar, idx) => ({
          name: `User ${idx + 1}`,
          avatar,
        })),
      }));

    const titles = {
      "backlog": "Backlog",
      "in-progress": "In Progress",
      "review": "Review",
      "done": "Done"
    };

    return {
      id: colId,
      title: titles[colId],
      cards,
    };
  });
};

const hasSeededProjects = demoData && (demoData as any).projects && (demoData as any).projects.length > 0;

export const mockKanbanBoard: KanbanColumn[] = hasSeededProjects ? getSeededKanbanBoard() : [
  {
    id: "backlog",
    title: "Backlog",
    cards: [
      {
        id: "proj-1",
        title: "Docker container security vulnerability scan",
        assignees: [
          { name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=64" },
        ],
        priority: "medium",
        dueDate: "2026-06-15",
        comments: 2,
      },
      {
        id: "proj-2",
        title: "Integrate Stripe billing webhooks inside server core",
        assignees: [
          { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=64" },
          { name: "Marcus Vance", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=64" },
        ],
        priority: "high",
        dueDate: "2026-06-10",
        comments: 5,
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [
      {
        id: "proj-3",
        title: "Upgrade Tailwind package configs to version 4 rules",
        assignees: [
          { name: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=64" },
        ],
        priority: "low",
        dueDate: "2026-06-08",
        comments: 1,
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    cards: [
      {
        id: "proj-4",
        title: "Optimize SVG sparklines rendering performance in metrics row",
        assignees: [
          { name: "Tariq Malik", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=64" },
        ],
        priority: "low",
        dueDate: "2026-06-05",
        comments: 0,
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      {
        id: "proj-5",
        title: "Establish Layout Persisting Context in local storage",
        assignees: [
          { name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=64" },
          { name: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=64" },
        ],
        priority: "high",
        dueDate: "2026-06-02",
        comments: 4,
      },
    ],
  },
];
