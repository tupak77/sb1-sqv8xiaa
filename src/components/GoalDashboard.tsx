import React from 'react';
import { Target, Calendar, TrendingUp, Award } from 'lucide-react';
import { GoalTimeline } from './GoalTimeline';
import { GoalProgress } from './GoalProgress';
import { WeeklyGoalReview } from './WeeklyGoalReview';
import type { Goal } from '../types';

interface GoalDashboardProps {
  goals: Goal[];
  onUpdateGoal: (id: string, updates: Partial<Goal>) => void;
}

export function GoalDashboard({ goals, onUpdateGoal }: GoalDashboardProps) {
  const activeGoals = goals.filter(goal => !goal.completed);
  const completedGoals = goals.filter(goal => goal.completed);
  const overallProgress = goals.length > 0 
    ? (completedGoals.length / goals.length) * 100 
    : 0;

  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const topPriorityGoal = activeGoals.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  )[0];

  return (
    <div className="space-y-8">
      {/* Active Goal Highlight */}
      {topPriorityGoal && (
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm 
                     rounded-xl p-8 border border-blue-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/5 to-blue-500/0 
                       translate-x-[-100%] animate-shimmer" />
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Target className="w-8 h-8 text-blue-400" />
            </div>
            <div className="flex-grow">
              <h2 className="text-2xl font-bold text-white mb-2">{topPriorityGoal.title}</h2>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm border ${
                  topPriorityGoal.priority === 'high' 
                    ? 'text-red-400 border-red-400/30 bg-red-400/10'
                    : topPriorityGoal.priority === 'medium'
                      ? 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10'
                      : 'text-green-400 border-green-400/30 bg-green-400/10'
                }`}>
                  {topPriorityGoal.priority.charAt(0).toUpperCase() + topPriorityGoal.priority.slice(1)} Priority
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Active Goals</h3>
          </div>
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                     from-blue-400 to-purple-400">
            {activeGoals.length}
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Award className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Completed</h3>
          </div>
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                     from-green-400 to-emerald-400">
            {completedGoals.length}
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Overall Progress</h3>
          </div>
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                     from-purple-400 to-pink-400">
            {overallProgress.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Timeline and Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GoalTimeline goals={goals} onUpdateGoal={onUpdateGoal} />
        <GoalProgress goals={goals} />
      </div>

      {/* Weekly Review */}
      <WeeklyGoalReview goals={goals} onUpdateGoal={onUpdateGoal} />
    </div>
  );
}