"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  MoreHorizontal,
  Mail,
  Phone,
  Building2,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - will be replaced with real data
const clients = [
  {
    id: "1",
    name: "John Smith",
    email: "john@acmecorp.com",
    phone: "(555) 123-4567",
    companyName: "Acme Corporation",
    city: "New York",
    state: "NY",
    totalEstimates: 5,
    totalInvoices: 12,
    totalRevenue: 48500,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@techsolutions.io",
    phone: "(555) 234-5678",
    companyName: "Tech Solutions",
    city: "San Francisco",
    state: "CA",
    totalEstimates: 3,
    totalInvoices: 8,
    totalRevenue: 32000,
  },
  {
    id: "3",
    name: "Mike Williams",
    email: "mike@designstudio.co",
    phone: "(555) 345-6789",
    companyName: "Design Studio Co",
    city: "Austin",
    state: "TX",
    totalEstimates: 7,
    totalInvoices: 15,
    totalRevenue: 67200,
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@localbakery.com",
    phone: "(555) 456-7890",
    companyName: "Local Bakery",
    city: "Portland",
    state: "OR",
    totalEstimates: 2,
    totalInvoices: 4,
    totalRevenue: 8900,
  },
];

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Clients
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Manage your client directory and relationships
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search clients by name, company, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100"
        />
      </div>

      {/* Client Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center">
                  <span className="text-white font-medium">
                    {client.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {client.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {client.companyName}
                  </p>
                </div>
              </div>
              <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                <MoreHorizontal className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Mail className="w-4 h-4" />
                {client.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Phone className="w-4 h-4" />
                {client.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <MapPin className="w-4 h-4" />
                {client.city}, {client.state}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Revenue</span>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    ${client.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 dark:text-slate-400">Projects</span>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {client.totalEstimates + client.totalInvoices}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">
            No clients found
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            {searchQuery ? "Try a different search term" : "Add your first client to get started"}
          </p>
        </div>
      )}
    </div>
  );
}
