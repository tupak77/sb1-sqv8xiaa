import React from 'react';
import { BarChart3, TrendingUp, Calendar } from 'lucide-react';
import type { Habit } from '../types';

interface HabitProgressProps {
  habits: Habit[];
}

export function HabitProgress({ habits }: HabitProgressProps) {
  const calculateProgress = () => {
    const now = new Date();
    const last7Days = new Array(7).fill(0).map((_, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    });

    const last4Weeks = new Array(4).fill(0).map((_, i) => {
      const startDate = new Date(now);
      startDate.setDate(startDate.getDate() - (i * 7 + 6));
      const endDate = new Date(now);
      endDate.setDate(endDate.getDate() - (i * 7));
      return { startDate, endDate };
    });

    const dailyProgress = last7Days.map(date => ({
      date,
      completed: habits.reduce((acc, habit) => 
        acc + (habit.completedDates.includes(date) ? 1 : 0), 0),
      total: habits.length
    }));

    const weeklyProgress = last4Weeks.map(({ startDate, endDate }) => {
      const daysInRange = [];
      const currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        daysInRange.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      return {
        range: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
        completed: habits.reduce((acc, habit) => 
          acc + habit.completedDates.filter(date => 
            daysInRange.includes(date)).length, 0),
        total: habits.length * 7
      };
    });

    return { dailyProgress, weeklyProgress };
  };

  const { dailyProgress, weeklyProgress } = calculateProgress();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Daily Progress */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-6 h-6 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Daily Progress</h3>
        </div>
        <div className="space-y-4">
          {dailyProgress.map(({ date, completed, total }) => (
            <div key={date} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className="text-gray-400">{completed}/{total}</span>
              </div>
              <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${(completed / total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Weekly Overview</h3>
        </div>
        <div className="space-y-4">
          {weeklyProgress.map(({ range, completed, total }) => (
            <div key={range} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{range}</span>
                <span className="text-gray-400">
                  {((completed / total) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  style={{ width: `${(completed / total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}