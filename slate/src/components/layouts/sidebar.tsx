"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FileText, 
  Receipt, 
  Users, 
  Settings,
  TrendingUp,
  PlusCircle
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Estimates", href: "/dashboard/estimates", icon: FileText },
  { name: "Invoices", href: "/dashboard/invoices", icon: Receipt },
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Analytics", href: "/dashboard/analytics", icon: TrendingUp },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 pb-4">
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 flex items-center justify-center">
            <span className="text-white dark:text-slate-900 font-bold text-sm">S</span>
          </div>
          <span className="font-semibold text-xl text-slate-900 dark:text-white">Slate</span>
        </div>

        {/* New Estimate Button */}
        <Link
          href="/dashboard/estimates/new"
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          New Estimate
        </Link>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex gap-x-3 rounded-lg p-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5 shrink-0",
                      isActive
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white"
                    )} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Margin Indicator */}
        <div className="rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-800/50 p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Avg. Margin</span>
            <span className="text-xs font-bold text-green-600 dark:text-green-400">↑ 2.3%</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">32.5%</div>
          <div className="mt-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Above your 30% target
          </p>
        </div>
      </div>
    </aside>
  );
}
