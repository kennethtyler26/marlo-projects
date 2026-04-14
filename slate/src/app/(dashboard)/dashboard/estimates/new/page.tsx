"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Sparkles,
  AlertTriangle,
  Save,
  Send,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  markupPercent: number;
}

interface Segment {
  id: string;
  name: string;
  collapsed: boolean;
  lineItems: LineItem[];
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const defaultLineItem = (): LineItem => ({
  id: generateId(),
  description: "",
  quantity: 1,
  unit: "each",
  costPerUnit: 0,
  markupPercent: 30,
});

const defaultSegment = (name: string = "New Section"): Segment => ({
  id: generateId(),
  name,
  collapsed: false,
  lineItems: [defaultLineItem()],
});

export default function NewEstimatePage() {
  const router = useRouter();
  const [client, setClient] = useState("");
  const [segments, setSegments] = useState<Segment[]>([defaultSegment("Materials")]);
  const [targetMargin, setTargetMargin] = useState(30);
  const [showMarginWarning, setShowMarginWarning] = useState(false);

  // Calculate line item totals
  const calculateLineItem = (item: LineItem) => {
    const totalCost = item.costPerUnit * item.quantity;
    const pricePerUnit = item.costPerUnit * (1 + item.markupPercent / 100);
    const totalPrice = pricePerUnit * item.quantity;
    const profit = totalPrice - totalCost;
    return { totalCost, pricePerUnit, totalPrice, profit };
  };

  // Calculate segment totals
  const calculateSegmentTotals = (segment: Segment) => {
    return segment.lineItems.reduce(
      (acc, item) => {
        const calc = calculateLineItem(item);
        return {
          totalCost: acc.totalCost + calc.totalCost,
          totalPrice: acc.totalPrice + calc.totalPrice,
          profit: acc.profit + calc.profit,
        };
      },
      { totalCost: 0, totalPrice: 0, profit: 0 }
    );
  };

  // Calculate grand totals
  const grandTotals = segments.reduce(
    (acc, segment) => {
      const segmentTotals = calculateSegmentTotals(segment);
      return {
        totalCost: acc.totalCost + segmentTotals.totalCost,
        totalPrice: acc.totalPrice + segmentTotals.totalPrice,
        profit: acc.profit + segmentTotals.profit,
      };
    },
    { totalCost: 0, totalPrice: 0, profit: 0 }
  );

  const overallMargin = grandTotals.totalPrice > 0 
    ? ((grandTotals.profit / grandTotals.totalPrice) * 100) 
    : 0;

  // Segment operations
  const addSegment = () => {
    setSegments([...segments, defaultSegment()]);
  };

  const removeSegment = (segmentId: string) => {
    if (segments.length > 1) {
      setSegments(segments.filter((s) => s.id !== segmentId));
    }
  };

  const updateSegmentName = (segmentId: string, name: string) => {
    setSegments(
      segments.map((s) => (s.id === segmentId ? { ...s, name } : s))
    );
  };

  const toggleSegmentCollapse = (segmentId: string) => {
    setSegments(
      segments.map((s) =>
        s.id === segmentId ? { ...s, collapsed: !s.collapsed } : s
      )
    );
  };

  // Line item operations
  const addLineItem = (segmentId: string) => {
    setSegments(
      segments.map((s) =>
        s.id === segmentId
          ? { ...s, lineItems: [...s.lineItems, defaultLineItem()] }
          : s
      )
    );
  };

  const removeLineItem = (segmentId: string, itemId: string) => {
    setSegments(
      segments.map((s) =>
        s.id === segmentId
          ? {
              ...s,
              lineItems:
                s.lineItems.length > 1
                  ? s.lineItems.filter((i) => i.id !== itemId)
                  : s.lineItems,
            }
          : s
      )
    );
  };

  const updateLineItem = (
    segmentId: string,
    itemId: string,
    field: keyof LineItem,
    value: string | number
  ) => {
    setSegments(
      segments.map((s) =>
        s.id === segmentId
          ? {
              ...s,
              lineItems: s.lineItems.map((i) =>
                i.id === itemId ? { ...i, [field]: value } : i
              ),
            }
          : s
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/estimates"
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              New Estimate
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Build your estimate with cost tracking
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button>
            <Send className="w-4 h-4 mr-2" />
            Send Estimate
          </Button>
        </div>
      </div>

      {/* Margin Alert */}
      {overallMargin < targetMargin && grandTotals.totalPrice > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-center gap-3"
        >
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <div className="flex-1">
            <p className="font-medium text-amber-800 dark:text-amber-200">
              Below target margin
            </p>
            <p className="text-sm text-amber-600 dark:text-amber-400">
              This estimate is at {overallMargin.toFixed(1)}% margin, below your {targetMargin}% target.
            </p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Selection */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Client
            </label>
            <select
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100"
            >
              <option value="">Select a client...</option>
              <option value="1">Acme Corporation - John Smith</option>
              <option value="2">Tech Solutions - Sarah Johnson</option>
              <option value="3">Design Studio Co - Mike Williams</option>
            </select>
          </div>

          {/* Segments */}
          {segments.map((segment, segmentIndex) => {
            const segmentTotals = calculateSegmentTotals(segment);
            return (
              <motion.div
                key={segment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                {/* Segment Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-5 h-5 text-slate-400 cursor-grab" />
                    <input
                      type="text"
                      value={segment.name}
                      onChange={(e) => updateSegmentName(segment.id, e.target.value)}
                      className="font-semibold text-slate-900 dark:text-white bg-transparent border-none focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      ${segmentTotals.totalPrice.toLocaleString()}
                    </span>
                    <button
                      onClick={() => toggleSegmentCollapse(segment.id)}
                      className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
                    >
                      {segment.collapsed ? (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      )}
                    </button>
                    {segments.length > 1 && (
                      <button
                        onClick={() => removeSegment(segment.id)}
                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Line Items */}
                <AnimatePresence>
                  {!segment.collapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Column Headers */}
                      <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800/30 text-xs font-medium text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                        <div className="col-span-4">Description</div>
                        <div className="col-span-1">Qty</div>
                        <div className="col-span-1">Unit</div>
                        <div className="col-span-2 text-right">Cost</div>
                        <div className="col-span-1 text-right">Markup</div>
                        <div className="col-span-2 text-right">Price</div>
                        <div className="col-span-1"></div>
                      </div>

                      {/* Items */}
                      <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                        {segment.lineItems.map((item) => {
                          const calc = calculateLineItem(item);
                          return (
                            <div
                              key={item.id}
                              className="grid grid-cols-12 gap-2 px-4 py-3 items-center"
                            >
                              <div className="col-span-4">
                                <input
                                  type="text"
                                  value={item.description}
                                  onChange={(e) =>
                                    updateLineItem(segment.id, item.id, "description", e.target.value)
                                  }
                                  placeholder="Item description"
                                  className="w-full px-2 py-1.5 text-sm rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-400"
                                />
                              </div>
                              <div className="col-span-1">
                                <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateLineItem(segment.id, item.id, "quantity", parseFloat(e.target.value) || 0)
                                  }
                                  min="0"
                                  step="0.5"
                                  className="w-full px-2 py-1.5 text-sm rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-400"
                                />
                              </div>
                              <div className="col-span-1">
                                <select
                                  value={item.unit}
                                  onChange={(e) =>
                                    updateLineItem(segment.id, item.id, "unit", e.target.value)
                                  }
                                  className="w-full px-1 py-1.5 text-sm rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-400"
                                >
                                  <option value="each">ea</option>
                                  <option value="hour">hr</option>
                                  <option value="sqft">sqft</option>
                                  <option value="linear">lf</option>
                                </select>
                              </div>
                              <div className="col-span-2">
                                <div className="relative">
                                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                                  <input
                                    type="number"
                                    value={item.costPerUnit}
                                    onChange={(e) =>
                                      updateLineItem(segment.id, item.id, "costPerUnit", parseFloat(e.target.value) || 0)
                                    }
                                    min="0"
                                    step="0.01"
                                    className="w-full pl-5 pr-2 py-1.5 text-sm text-right rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-400"
                                  />
                                </div>
                              </div>
                              <div className="col-span-1">
                                <div className="relative">
                                  <input
                                    type="number"
                                    value={item.markupPercent}
                                    onChange={(e) =>
                                      updateLineItem(segment.id, item.id, "markupPercent", parseFloat(e.target.value) || 0)
                                    }
                                    min="0"
                                    max="500"
                                    className="w-full px-2 py-1.5 text-sm text-right rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-400"
                                  />
                                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs">%</span>
                                </div>
                              </div>
                              <div className="col-span-2 text-right">
                                <span className="font-medium text-slate-900 dark:text-white">
                                  ${calc.totalPrice.toFixed(2)}
                                </span>
                              </div>
                              <div className="col-span-1 flex justify-end">
                                <button
                                  onClick={() => removeLineItem(segment.id, item.id)}
                                  className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                                >
                                  <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Add Item Button */}
                      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                        <button
                          onClick={() => addLineItem(segment.id)}
                          className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Add line item
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* Add Segment Button */}
          <button
            onClick={addSegment}
            className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Section
          </button>
        </div>

        {/* Sidebar - Summary */}
        <div className="space-y-6">
          {/* Totals Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sticky top-24">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Estimate Summary
            </h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Total Cost</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  ${grandTotals.totalCost.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Profit</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  +${grandTotals.profit.toLocaleString()}
                </span>
              </div>
              <div className="h-px bg-slate-200 dark:bg-slate-700" />
              <div className="flex justify-between">
                <span className="font-medium text-slate-900 dark:text-white">Total Price</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  ${grandTotals.totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Margin Indicator */}
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Margin
                </span>
                <span className={`text-lg font-bold ${
                  overallMargin >= targetMargin 
                    ? "text-green-600 dark:text-green-400" 
                    : "text-amber-600 dark:text-amber-400"
                }`}>
                  {overallMargin.toFixed(1)}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-600 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    overallMargin >= targetMargin 
                      ? "bg-gradient-to-r from-green-500 to-emerald-500" 
                      : "bg-gradient-to-r from-amber-500 to-orange-500"
                  }`}
                  style={{ width: `${Math.min(overallMargin * 2, 100)}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Target: {targetMargin}%
              </p>
            </div>

            {/* AI Summary Button */}
            <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500 transition-colors">
              <Sparkles className="w-4 h-4" />
              Generate AI Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
