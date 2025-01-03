import React from 'react';
import { Calendar, CheckCircle2, Circle } from 'lucide-react';
import type { Goal } from '../types';

interface GoalTimelineProps {
  goals: Goal[];
  onUpdateGoal: (id: string, updates: Partial<Goal>) => void;
}

export function GoalTimeline({ goals, onUpdateGoal }: GoalTimelineProps) {
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const sortedGoals = [...goals].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Calendar className="w-6 h-6 text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">Goal Timeline</h3>
      </div>

      <div className="space-y-4">
        {sortedGoals.map((goal) => (
          <div
            key={goal.id}
            className={`relative flex items-center gap-4 p-4 rounded-lg transition-all duration-300
                     ${goal.completed 
                       ? 'bg-green-500/10 border border-green-500/30' 
                       : 'bg-gray-700/30 border border-gray-600/30 hover:border-blue-500/30'}`}
            onClick={() => onUpdateGoal(goal.id, { completed: !goal.completed })}
          >
            {goal.completed ? (
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-blue-400 flex-shrink-0" />
            )}
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <span className={`font-medium ${goal.completed ? 'text-green-400' : 'text-white'}`}>
                  {goal.title}
                </span>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs border ${
                  goal.priority === 'high'
                    ? 'text-red-400 border-red-400/30 bg-red-400/10'
                    : goal.priority === 'medium'
                      ? 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10'
                      : 'text-green-400 border-green-400/30 bg-green-400/10'
                }`}>
                  {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}