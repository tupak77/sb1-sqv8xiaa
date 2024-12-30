import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

export function SaasStats() {
  const weeklyStats = [
    { name: 'Week 1', value: 45 },
    { name: 'Week 2', value: 78 },
    { name: 'Week 3', value: 65 },
    { name: 'Current', value: 89 }
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <BarChart3 className="w-6 h-6 text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">Weekly Performance</h3>
      </div>

      <div className="space-y-4">
        {weeklyStats.map((stat) => (
          <div key={stat.name}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">{stat.name}</span>
              <span className="text-sm font-medium text-gray-400">
                {stat.value}% completed
              </span>
            </div>
            <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                style={{ width: `${stat.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}