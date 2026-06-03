# Aether SaaS - Premium Next.js Admin Dashboard Template

Aether SaaS is a premium, developer-friendly, and modern admin dashboard template engineered using **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS v4**. Built for startups, developers, and creators, it features rich visual aesthetics, stateful components, flawless text/layout direction (RTL) mirroring, and highly customizable structure layers.

---

## 🛠️ Technology Stack & Dependencies

*   **Framework**: Next.js 16 (Turbopack, App Router)
*   **Library**: React 19 (Server Components + Client Hooks)
*   **Styling**: Tailwind CSS v4 (CSS-first configurations)
*   **Validation**: React Hook Form + Zod Schemas
*   **Icons**: Lucide React
*   **Charts**: Recharts (Responsive, Dark Mode aware)
*   **Drag & Drop**: @dnd-kit/core (Kanban project boards)
*   **Mockups Database**: local mock JSON files seeded via `@faker-js/faker`

---

## ✨ Features Breakdown

1.  **Layout Modifiers**:
    *   **Horizontal Layout**: Switch to a top-header navigation viewport dynamically.
    *   **Vertical Collapsible Sidebar**: Collapsible left sidebar navigation drawer.
    *   **Padding Densities**: Toggle compact, normal, and spacious spacing scales.
2.  **Stateful Modules**:
    *   **Operational Dashboard**: Responsive Recharts area charts, KPI metrics widgets, and sortable ledger tables.
    *   **CRM Contacts Page**: Table with pagination, sheet form validators, delete boundaries, and Illustrated Empty States.
    *   **Kanban Projects Page**: Draggable columns (Backlog, In Progress, Review, Done) with avatar bubbles, priority badges, and comments.
    *   **Stateful Calendar**: Day block grids, prev/next month togglers, category labels, and Zod event creation form modals.
    *   **Real-time Chat**: List of users, responsive stream layout, text sender, and collapsible profile details panel.
    *   **Billing Invoices Ledger**: Renders paid/pending/failed logs, itemized views, and interactive PDF triggers.
    *   **Interactive Analytics**: Metric trend columns and Double-Series Recharts bars.
3.  **RTL Support**:
    *   One-click dynamic RTL direction mirroring (`dir="rtl"` applied to `<html>`).
    *   Built using CSS logical properties (`ps-`, `pe-`, `border-s`, `border-e`, `text-start`, `text-end`) for mirror compliance.
4.  **Submission Checklist Standard**:
    *   Responsive design.
    *   Focus states compliance for accessibility.
    *   Suspense and loading boundaries on every route segment.
    *   Error capture fallback screens.

---

## 📁 Folder Architecture

```text
admin-dashboard/
├── app/                  # Next.js App Router (Pages, layouts, routers)
│   ├── analytics/        # Analytical charts metrics
│   ├── apps/             # Integrated Apps
│   │   ├── calendar/     # Scheduler page & Add Event schemas
│   │   ├── chat/         # Stateful websocket messaging mockups
│   │   ├── crm/          # Client listing & inline sheet rosters
│   │   ├── invoice/      # PDF logs view & Detail view pages
│   │   └── projects/     # Kanban lists (dnd-kit cards)
│   ├── auth/             # Login, register, strength reset portals
│   ├── dashboard/        # Default KPI dashboard view
│   ├── docs/             # Technical reference documentation console
│   ├── globals.css       # Tailwind imports & variables base layer
│   ├── layout.tsx        # Global theme and provider allocations
│   └── page.tsx          # Root Redirect segment
├── components/           # Reusable Client / Server Elements
│   ├── ui/               # Radix & Lucide base buttons, cards, sheets
│   ├── sidebar.tsx       # Vertical navigation left drawer
│   ├── navbar.tsx        # Top operational actions console
│   └── layout-wrapper.tsx# Directional & horizontal switches wrapper
├── lib/                  # Helper utilities and data seeds
│   ├── mock-data.ts      # Offline database files
│   └── seed.ts           # JSON mockup generator files
└── tsconfig.json         # TypeScript configuration
```

---

## 🚀 Getting Started & Installation

### 1. Install Dependencies
Run the installation script in the project directory root:
```bash
pnpm install
```

### 2. Run the Mock Data Seeder
Populate the local mock JSON datastores with 100 realistic contacts, 50 project cards, and 200 invoice transactions:
```bash
npx tsx lib/seed.ts
```

### 3. Start the Development Server
Launch the compiler and boot localhost port:
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) inside your web browser.

### 4. Build for Production
Pre-compile and bundle optimized code assets:
```bash
pnpm build
```

---

## ⚙️ Configuration Variables

| Variable | Description | Default |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_NAME` | Browser window title name | `Aether SaaS` |
| `NEXT_PUBLIC_APP_URL` | Application root viewport link | `http://localhost:3000` |

---

## 🖌️ Theme Color Variables Customization

Aether uses Tailwind CSS v4's CSS-first theme configuration. To change colors, navigate to `app/globals.css` and update the raw coordinates under `:root` and `.dark` selectors:

```css
:root {
  --primary: 243.4 75.4% 58.6%; /* Primary brand HSL coordinates */
  --background: 0 0% 100%;       /* Light background color */
}

.dark {
  --primary: 243.4 75.4% 58.6%;
  --background: 240 10% 3.9%;   /* Dark background color */
}
```

---

## 📄 License & Credits

*   **Asset Credits**: All visual portrait placeholder graphics are sourced from license-free resources (Unsplash).
*   **Design Ownership**: Custom designed SVG visuals are compiled natively without dependency overheads.
*   **License**:
    *   **Regular License**: For end product single domain distributions.
    *   **Extended License**: For multi-client software integration packaging.

---

*Handcrafted for [Envato Buyer Placeholder] by the Engineering Development Team.*
