import React from 'react';
import { LineChart, BarChart3, ArrowUp, ArrowDown } from 'lucide-react';

export function CashFlowSection() {
  const monthlyData = [
    { month: 'Jan', income: 5000, expenses: 3500 },
    { month: 'Feb', income: 5200, expenses: 3600 },
    { month: 'Mar', income: 5100, expenses: 3400 },
    { month: 'Apr', income: 5300, expenses: 3800 }
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <LineChart className="w-6 h-6 text-purple-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">Cash Flow Analytics</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-300">Monthly Overview</h3>
            <select
              className="px-3 py-1.5 bg-gray-700/50 border border-gray-600 rounded-lg
                       text-gray-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="3">Last 3 months</option>
              <option value="6">Last 6 months</option>
              <option value="12">Last 12 months</option>
            </select>
          </div>

          <div className="h-64 flex items-end justify-between gap-2">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex-1 space-y-2">
                <div className="relative h-full flex items-end gap-1">
                  <div
                    className="w-1/2 bg-green-500/20 rounded-t-lg transition-all duration-300"
                    style={{ height: `${(data.income / 6000) * 100}%` }}
                  >
                    <div className="absolute bottom-full mb-1 text-xs text-green-400">
                      €{data.income}
                    </div>
                  </div>
                  <div
                    className="w-1/2 bg-red-500/20 rounded-t-lg transition-all duration-300"
                    style={{ height: `${(data.expenses / 6000) * 100}%` }}
                  >
                    <div className="absolute bottom-full mb-1 text-xs text-red-400">
                      €{data.expenses}
                    </div>
                  </div>
                </div>
                <div className="text-center text-sm text-gray-400">{data.month}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500/20 rounded-sm" />
              <span className="text-gray-400">Income</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500/20 rounded-sm" />
              <span className="text-gray-400">Expenses</span>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="space-y-4">
          <div className="p-4 bg-gray-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Monthly Average</span>
              <span className="text-lg font-semibold text-white">€4,800</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ArrowUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400">+5.2%</span>
              <span className="text-gray-400">vs last month</span>
            </div>
          </div>

          <div className="p-4 bg-gray-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Savings Rate</span>
              <span className="text-lg font-semibold text-white">32%</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ArrowUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400">+2.1%</span>
              <span className="text-gray-400">vs last month</span>
            </div>
          </div>

          <div className="p-4 bg-gray-700/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Expense Ratio</span>
              <span className="text-lg font-semibold text-white">68%</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ArrowDown className="w-4 h-4 text-red-400" />
              <span className="text-red-400">-1.3%</span>
              <span className="text-gray-400">vs last month</span>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              <span className="text-gray-300">AI Insights</span>
            </div>
            <p className="text-sm text-gray-400">
              Based on your spending patterns, you could increase your savings rate by 8% by optimizing
              your entertainment expenses and subscription services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}