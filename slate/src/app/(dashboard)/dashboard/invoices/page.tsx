"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search,
  MoreHorizontal,
  Receipt,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
  CreditCard,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";

const statusConfig = {
  draft: { label: "Draft", color: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300", icon: Receipt },
  sent: { label: "Sent", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", icon: Send },
  viewed: { label: "Viewed", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400", icon: Clock },
  partially_paid: { label: "Partial", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: DollarSign },
  paid: { label: "Paid", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", icon: CheckCircle2 },
  overdue: { label: "Overdue", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: AlertCircle },
};

const invoices = [
  {
    id: "1",
    number: "INV-089",
    client: "Tech Solutions",
    clientContact: "Sarah Johnson",
    status: "paid",
    totalAmount: 12300,
    amountPaid: 12300,
    issueDate: "2024-04-01",
    dueDate: "2024-04-30",
    paidAt: "2024-04-15",
  },
  {
    id: "2",
    number: "INV-088",
    client: "Acme Corporation",
    clientContact: "John Smith",
    status: "sent",
    totalAmount: 8500,
    amountPaid: 0,
    issueDate: "2024-04-10",
    dueDate: "2024-05-10",
    paidAt: null,
  },
  {
    id: "3",
    number: "INV-087",
    client: "Design Studio Co",
    clientContact: "Mike Williams",
    status: "partially_paid",
    totalAmount: 5000,
    amountPaid: 2500,
    issueDate: "2024-03-25",
    dueDate: "2024-04-25",
    paidAt: null,
  },
  {
    id: "4",
    number: "INV-082",
    client: "Local Bakery",
    clientContact: "Emily Davis",
    status: "overdue",
    totalAmount: 1850,
    amountPaid: 0,
    issueDate: "2024-03-01",
    dueDate: "2024-03-31",
    paidAt: null,
  },
  {
    id: "5",
    number: "INV-090",
    client: "Mountain View LLC",
    clientContact: "David Brown",
    status: "draft",
    totalAmount: 15000,
    amountPaid: 0,
    issueDate: "2024-04-12",
    dueDate: "2024-05-12",
    paidAt: null,
  },
];

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate summary stats
  const stats = {
    outstanding: invoices.filter(i => ["sent", "viewed", "partially_paid"].includes(i.status)).reduce((acc, i) => acc + (i.totalAmount - i.amountPaid), 0),
    overdue: invoices.filter(i => i.status === "overdue").reduce((acc, i) => acc + i.totalAmount, 0),
    paidThisMonth: invoices.filter(i => i.status === "paid").reduce((acc, i) => acc + i.totalAmount, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Invoices
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Track payments and manage billing
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Invoice
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Outstanding</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                ${stats.outstanding.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Overdue</p>
              <p className="text-xl font-bold text-red-600 dark:text-red-400">
                ${stats.overdue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Paid (MTD)</p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">
                ${stats.paidThisMonth.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search invoices..."
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
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
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
                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
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
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-500 dark:text-slate-400">Invoice</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-500 dark:text-slate-400">Client</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-slate-500 dark:text-slate-400">Status</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-500 dark:text-slate-400">Amount</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-slate-500 dark:text-slate-400">Due Date</th>
                <th className="py-4 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice, index) => {
                const status = statusConfig[invoice.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;
                const remaining = invoice.totalAmount - invoice.amountPaid;
                return (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <span className="font-medium text-slate-900 dark:text-white">
                        {invoice.number}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{invoice.client}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{invoice.clientContact}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {status.label}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          ${invoice.totalAmount.toLocaleString()}
                        </span>
                        {remaining > 0 && remaining < invoice.totalAmount && (
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            ${remaining.toLocaleString()} remaining
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right text-sm text-slate-500 dark:text-slate-400">
                      {new Date(invoice.dueDate).toLocaleDateString()}
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
      </div>
    </div>
  );
}
