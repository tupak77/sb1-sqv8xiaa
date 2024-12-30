import React, { useState, useMemo } from 'react';
import { BarChart3, TrendingUp, Target, Brain, Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import type { Habit } from '../types';

interface WeeklyReviewProps {
  habits: Habit[];
}

export function WeeklyReview({ habits }: WeeklyReviewProps) {
  const [selectedWeek, setSelectedWeek] = useState<number>(0);

  const weeklyData = useMemo(() => {
    const now = new Date();
    const weeks = [];
    
    for (let i = 0; i < 4; i++) {
      const weekStart = new Date(now);
      weekStart.setDate(weekStart.getDate() - (weekStart.getDay() + 7 * i));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      const weekDates = [];
      const currentDate = new Date(weekStart);
      while (currentDate <= weekEnd) {
        weekDates.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      const habitStats = habits.map(habit => {
        const completedDays = habit.completedDates.filter(date => 
          weekDates.includes(date)
        ).length;
        
        return {
          title: habit.title,
          completedDays,
          percentage: (completedDays / 7) * 100,
          category: habit.category
        };
      });
      
      weeks.push({
        startDate: weekStart,
        endDate: weekEnd,
        stats: habitStats,
        totalCompletions: habitStats.reduce((acc, stat) => acc + stat.completedDays, 0),
        averageCompletion: habitStats.reduce((acc, stat) => acc + stat.percentage, 0) / habits.length
      });
    }
    
    return weeks;
  }, [habits]);

  const currentWeek = weeklyData[selectedWeek];
  const previousWeek = weeklyData[selectedWeek + 1];
  
  const weekProgress = currentWeek.averageCompletion - (previousWeek?.averageCompletion || 0);
  const topPerformers = [...currentWeek.stats].sort((a, b) => b.percentage - a.percentage).slice(0, 3);
  const needsImprovement = [...currentWeek.stats].sort((a, b) => a.percentage - b.percentage).slice(0, 3);

  const generateSuggestions = () => {
    const suggestions = [];
    
    // Analyze completion patterns
    needsImprovement.forEach(habit => {
      if (habit.percentage < 30) {
        suggestions.push({
          title: habit.title,
          type: 'improvement',
          message: `Consider breaking down "${habit.title}" into smaller, more manageable steps.`
        });
      }
    });

    // Look for positive trends
    topPerformers.forEach(habit => {
      if (habit.percentage > 80) {
        suggestions.push({
          title: habit.title,
          type: 'strength',
          message: `Great work on "${habit.title}"! Try increasing the challenge or adding a related habit.`
        });
      }
    });

    return suggestions;
  };

  return (
    <div className="space-y-6">
      {/* Week Selection */}
      <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
        {weeklyData.map((week, index) => (
          <button
            key={week.startDate.toISOString()}
            onClick={() => setSelectedWeek(index)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300 ${
              selectedWeek === index
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'bg-gray-800/50 text-gray-400 hover:text-white'
            }`}
          >
            {week.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
            {week.endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overall Progress */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Weekly Overview</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Average Completion</span>
                <span className="text-2xl font-bold text-transparent bg-clip-text 
                               bg-gradient-to-r from-blue-400 to-purple-400">
                  {currentWeek.averageCompletion.toFixed(1)}%
                </span>
              </div>
              <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${currentWeek.averageCompletion}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-400">Week over Week</span>
              <div className={`flex items-center gap-1 ${
                weekProgress > 0 ? 'text-green-400' : weekProgress < 0 ? 'text-red-400' : 'text-gray-400'
              }`}>
                {weekProgress > 0 ? (
                  <ArrowUp size={16} />
                ) : weekProgress < 0 ? (
                  <ArrowDown size={16} />
                ) : null}
                <span>{Math.abs(weekProgress).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Habit Performance */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Habit Performance</h3>
          </div>
          
          <div className="space-y-4">
            {currentWeek.stats.map(stat => (
              <div key={stat.title}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-400">{stat.title}</span>
                  <span className="text-sm font-medium text-gray-400">
                    {stat.completedDays}/7 days
                  </span>
                </div>
                <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths & Areas for Improvement */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Target className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Performance Analysis</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-green-400 font-medium mb-2">Top Performers</h4>
              <ul className="space-y-2">
                {topPerformers.map((habit, index) => (
                  <li key={habit.title} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-gray-300">{habit.title}</span>
                    <span className="text-gray-400 text-sm ml-auto">
                      {habit.completedDays} days
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-yellow-400 font-medium mb-2">Areas for Improvement</h4>
              <ul className="space-y-2">
                {needsImprovement.map((habit, index) => (
                  <li key={habit.title} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span className="text-gray-300">{habit.title}</span>
                    <span className="text-gray-400 text-sm ml-auto">
                      {habit.completedDays} days
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Personalized Suggestions */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Brain className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Personalized Insights</h3>
          </div>
          
          <div className="space-y-4">
            {generateSuggestions().map((suggestion, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  suggestion.type === 'strength'
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-yellow-500/10 border-yellow-500/30'
                }`}
              >
                <p className={`text-sm ${
                  suggestion.type === 'strength' ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {suggestion.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}