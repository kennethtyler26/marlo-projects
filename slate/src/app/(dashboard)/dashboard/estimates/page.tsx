"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Send,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const statusConfig = {
  draft: { label: "Draft", color: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300", icon: FileText },
  sent: { label: "Sent", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", icon: Send },
  viewed: { label: "Viewed", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400", icon: Clock },
  approved: { label: "Approved", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", icon: CheckCircle2 },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: XCircle },
  converted: { label: "Converted", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: ArrowRight },
};

const estimates = [
  {
    id: "1",
    number: "EST-047",
    client: "Acme Corporation",
    clientContact: "John Smith",
    status: "sent",
    totalPrice: 8500,
    totalCost: 5780,
    marginPercent: 32,
    issueDate: "2024-04-10",
    validUntil: "2024-05-10",
  },
  {
    id: "2",
    number: "EST-046",
    client: "Tech Solutions",
    clientContact: "Sarah Johnson",
    status: "approved",
    totalPrice: 12300,
    totalCost: 8200,
    marginPercent: 33.3,
    issueDate: "2024-04-08",
    validUntil: "2024-05-08",
  },
  {
    id: "3",
    number: "EST-045",
    client: "Design Studio Co",
    clientContact: "Mike Williams",
    status: "converted",
    totalPrice: 3200,
    totalCost: 2100,
    marginPercent: 34.4,
    issueDate: "2024-04-05",
    validUntil: "2024-05-05",
  },
  {
    id: "4",
    number: "EST-044",
    client: "Local Bakery",
    clientContact: "Emily Davis",
    status: "draft",
    totalPrice: 1850,
    totalCost: 1295,
    marginPercent: 30,
    issueDate: "2024-04-12",
    validUntil: "2024-05-12",
  },
  {
    id: "5",
    number: "EST-043",
    client: "Mountain View LLC",
    clientContact: "David Brown",
    status: "rejected",
    totalPrice: 15000,
    totalCost: 10500,
    marginPercent: 30,
    issueDate: "2024-04-01",
    validUntil: "2024-05-01",
  },
];

export default function EstimatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredEstimates = estimates.filter((estimate) => {
    const matchesSearch =
      estimate.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      estimate.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || estimate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Estimates
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Create and manage project estimates
          </p>
        </div>
        <Link href="/dashboard/estimates/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Estimate
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search estimates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          <button
            onClick={() => setStatusFilter(null)}
            className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              !statusFilter
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            All
          </button>
          {Object.entries(statusConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                statusFilter === key
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {config.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Estimate
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Client
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Status
                </th>
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Amount
                </th>
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Margin
                </th>
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Date
                </th>
                <th className="py-4 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {filteredEstimates.map((estimate, index) => {
                const status = statusConfig[estimate.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;
                return (
                  <motion.tr
                    key={estimate.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <Link href={`/dashboard/estimates/${estimate.id}`} className="font-medium text-slate-900 dark:text-white hover:underline">
                        {estimate.number}
                      </Link>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {estimate.client}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {estimate.clientContact}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {status.label}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        ${estimate.totalPrice.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className={`font-medium ${
                        estimate.marginPercent >= 30 
                          ? "text-green-600 dark:text-green-400" 
                          : "text-amber-600 dark:text-amber-400"
                      }`}>
                        {estimate.marginPercent.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right text-sm text-slate-500 dark:text-slate-400">
                      {new Date(estimate.issueDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-slate-400" />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredEstimates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">
              No estimates found
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              {searchQuery || statusFilter ? "Try adjusting your filters" : "Create your first estimate to get started"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
