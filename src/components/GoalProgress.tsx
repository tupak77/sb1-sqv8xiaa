import React from 'react';
import { BarChart3 } from 'lucide-react';
import type { Goal } from '../types';

interface GoalProgressProps {
  goals: Goal[];
}

export function GoalProgress({ goals }: GoalProgressProps) {
  const priorityGroups = {
    high: goals.filter(g => g.priority === 'high'),
    medium: goals.filter(g => g.priority === 'medium'),
    low: goals.filter(g => g.priority === 'low')
  };

  const calculateProgress = (goals: Goal[]) => {
    if (goals.length === 0) return 0;
    return (goals.filter(g => g.completed).length / goals.length) * 100;
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <BarChart3 className="w-6 h-6 text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">Progress by Priority</h3>
      </div>

      <div className="space-y-6">
        {/* High Priority */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-red-400">High Priority</span>
            <span className="text-sm text-gray-400">
              {priorityGroups.high.filter(g => g.completed).length}/{priorityGroups.high.length} completed
            </span>
          </div>
          <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-500"
              style={{ width: `${calculateProgress(priorityGroups.high)}%` }}
            />
          </div>
        </div>

        {/* Medium Priority */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-yellow-400">Medium Priority</span>
            <span className="text-sm text-gray-400">
              {priorityGroups.medium.filter(g => g.completed).length}/{priorityGroups.medium.length} completed
            </span>
          </div>
          <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 transition-all duration-500"
              style={{ width: `${calculateProgress(priorityGroups.medium)}%` }}
            />
          </div>
        </div>

        {/* Low Priority */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-green-400">Low Priority</span>
            <span className="text-sm text-gray-400">
              {priorityGroups.low.filter(g => g.completed).length}/{priorityGroups.low.length} completed
            </span>
          </div>
          <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
              style={{ width: `${calculateProgress(priorityGroups.low)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}