# Slate — Architecture Document

## Vision
A profit-first estimate and invoice platform. Know your margin before you hit send.

## Core Principles
1. **Modular by default** — Every feature is a self-contained module
2. **Type-safe end-to-end** — TypeScript everywhere, Zod validation
3. **Database-first design** — Schema drives the app, not vice versa
4. **Component isolation** — UI components are pure, business logic lives in hooks/services
5. **API-first** — Every feature works via API before UI exists

## Tech Stack

### Frontend
- **Next.js 14** (App Router) — React framework with SSR/SSG
- **TypeScript** — Strict mode, no any
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Subtle micro-interactions
- **Radix UI** — Accessible primitives (we style them)
- **React Hook Form + Zod** — Form handling with validation
- **TanStack Query** — Server state management

### Backend
- **Next.js API Routes** — Serverless functions
- **Prisma** — Type-safe ORM
- **PostgreSQL** (via Supabase) — Primary database
- **Supabase Auth** — Authentication + Row Level Security

### Payments
- **Stripe Connect** — White-label payment processing
- **Stripe Checkout** — Hosted payment pages

### Email
- **Resend** — Transactional emails
- **React Email** — Email templates as components

### Infrastructure
- **Vercel** or **Replit** — Hosting + CI/CD
- **Supabase** — Database + Auth + Storage

---

## Module Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login, signup)
│   ├── (dashboard)/       # Protected app pages
│   │   ├── clients/
│   │   ├── estimates/
│   │   ├── invoices/
│   │   └── settings/
│   └── api/               # API routes
│       ├── clients/
│       ├── estimates/
│       ├── invoices/
│       └── webhooks/
├── components/
│   ├── ui/                # Base UI components (Button, Input, etc.)
│   ├── forms/             # Form components
│   ├── layouts/           # Page layouts
│   └── features/          # Feature-specific components
├── lib/
│   ├── db/                # Prisma client + helpers
│   ├── auth/              # Auth utilities
│   ├── stripe/            # Stripe integration
│   ├── email/             # Email sending
│   └── utils/             # Shared utilities
├── hooks/                 # Custom React hooks
├── services/              # Business logic layer
├── types/                 # Shared TypeScript types
└── config/                # App configuration
```

---

## Database Schema (Core Entities)

### Organization
- Company profile, branding, settings
- Stripe Connect account ID
- Default margins, tax rates

### User
- Belongs to Organization
- Auth via Supabase
- Role-based permissions

### Client
- Belongs to Organization
- Contact info, billing address
- Payment terms, tax exempt status

### Estimate
- Belongs to Organization + Client
- Status: draft | sent | approved | rejected | converted
- Segments containing line items
- Version history

### EstimateSegment
- Belongs to Estimate
- Category name (e.g., "Woodworking")
- AI-generated summary for client view
- Display order

### LineItem
- Belongs to EstimateSegment
- Description, quantity, unit
- Cost (internal), markup %, price (calculated)
- Category: labor | materials | subcontractor | overhead

### Invoice
- Belongs to Organization + Client
- Optionally linked to Estimate
- Status: draft | sent | viewed | paid | overdue | void
- Payment link, due date

### Payment
- Belongs to Invoice
- Stripe payment intent ID
- Amount, status, timestamp

---

## Key Features (MVP)

### 1. Estimate Builder
- Segment-based organization
- Cost → Markup → Price calculation
- AI summary generation per segment
- Margin warnings (below target alert)
- Preview mode (client view vs internal view)

### 2. Invoice Generation
- One-click convert from estimate
- Manual invoice creation
- Payment link generation
- Status tracking

### 3. Client Management
- Client directory
- Contact details + billing info
- Client portal link (view their estimates/invoices)

### 4. White-Label Branding
- Logo upload
- Brand colors (primary, secondary)
- Custom email templates
- PDF styling

### 5. Dashboard
- Outstanding estimates/invoices
- Revenue tracking
- Average margin analysis
- Recent activity

---

## Security Considerations
- Row Level Security on all tables
- API routes protected by auth middleware
- Stripe webhooks verified by signature
- Sensitive data encrypted at rest
- CSRF protection on forms

---

## Future Integrations (Planned)
- QuickBooks sync
- Xero sync
- Zapier/Make webhooks
- Custom domain for client portal
- Multi-currency support
- Team collaboration features

