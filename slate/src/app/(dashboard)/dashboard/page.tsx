import { createClient } from "@/lib/auth/server";
import { 
  FileText, 
  Receipt, 
  DollarSign, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const stats = [
  { 
    name: "Outstanding Estimates", 
    value: "$24,500", 
    change: "+12%",
    trend: "up",
    icon: FileText,
  },
  { 
    name: "Unpaid Invoices", 
    value: "$18,200", 
    change: "-8%",
    trend: "down",
    icon: Receipt,
  },
  { 
    name: "Revenue (MTD)", 
    value: "$42,800", 
    change: "+23%",
    trend: "up",
    icon: DollarSign,
  },
  { 
    name: "Avg. Margin", 
    value: "32.5%", 
    change: "+2.3%",
    trend: "up",
    icon: TrendingUp,
  },
];

const recentActivity = [
  {
    id: 1,
    title: "Estimate #EST-047 sent",
    client: "Acme Corp",
    amount: "$8,500",
    time: "2 hours ago",
    icon: FileText,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: 2,
    title: "Invoice #INV-089 paid",
    client: "Tech Solutions",
    amount: "$12,300",
    time: "5 hours ago",
    icon: CheckCircle2,
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: 3,
    title: "Estimate #EST-045 approved",
    client: "Design Studio",
    amount: "$3,200",
    time: "1 day ago",
    icon: CheckCircle2,
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: 4,
    title: "Invoice #INV-082 overdue",
    client: "Local Bakery",
    amount: "$1,850",
    time: "3 days ago",
    icon: AlertCircle,
    iconColor: "text-red-600",
    bgColor: "bg-red-100",
  },
];

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  const userName = user?.user_metadata?.name || user?.email?.split("@")[0] || "there";

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Welcome back, {userName}
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Here&apos;s what&apos;s happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-700">
                <stat.icon className="h-6 w-6 text-slate-600 dark:text-slate-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1">
              {stat.trend === "up" ? (
                <ArrowUpRight className="h-4 w-4 text-green-600" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-600" />
              )}
              <span className={`text-sm font-medium ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-slate-500">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${activity.bgColor} dark:bg-opacity-20`}>
                  <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {activity.client} • {activity.amount}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="h-3 w-3" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="/dashboard/estimates/new"
              className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <FileText className="h-8 w-8 text-slate-400 mb-2" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                New Estimate
              </span>
            </a>
            <a
              href="/dashboard/invoices/new"
              className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <Receipt className="h-8 w-8 text-slate-400 mb-2" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                New Invoice
              </span>
            </a>
            <a
              href="/dashboard/clients/new"
              className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <svg className="h-8 w-8 text-slate-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Add Client
              </span>
            </a>
            <a
              href="/dashboard/analytics"
              className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <TrendingUp className="h-8 w-8 text-slate-400 mb-2" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                View Analytics
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
