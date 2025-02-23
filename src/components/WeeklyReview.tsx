import React, { useState, useMemo } from 'react';
import { BarChart3, TrendingUp, Target, Brain, Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import type { Habit } from '../types';

interface WeeklyReviewProps {
  habits: Habit[];
}

export function WeeklyReview({ habits }: WeeklyReviewProps) {
  const [selectedWeek, setSelectedWeek] = useState<number>(0);

  const weeklyData = useMemo(() => {
    const weeks = [];
    
    // Set start date to February 23rd, 2025
    const startDate = new Date('2025-02-23');
    
    for (let i = 0; i < 4; i++) {
      const weekStart = new Date(startDate);
      weekStart.setDate(weekStart.getDate() + (7 * i));
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
        weekNumber: i + 1,
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
  const previousWeek = selectedWeek > 0 ? weeklyData[selectedWeek - 1] : null;
  
  const weekProgress = currentWeek.averageCompletion - (previousWeek?.averageCompletion || 0);
  const topPerformers = [...currentWeek.stats].sort((a, b) => b.percentage - a.percentage).slice(0, 3);
  const needsImprovement = [...currentWeek.stats].sort((a, b) => a.percentage - b.percentage).slice(0, 3);

  const generateSuggestions = () => {
    const suggestions = [];
    
    needsImprovement.forEach(habit => {
      if (habit.percentage < 30) {
        suggestions.push({
          title: habit.title,
          type: 'improvement',
          message: `Consider breaking down "${habit.title}" into smaller, more manageable steps.`
        });
      }
    });

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
            className={`px-4 py-3 rounded-lg whitespace-nowrap transition-all duration-300 flex flex-col items-center gap-1 ${
              selectedWeek === index
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'bg-gray-800/50 text-gray-400 hover:text-white'
            }`}
          >
            <span className="text-sm font-semibold">Week {week.weekNumber}</span>
            <span className="text-xs opacity-80">
              {week.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
              {week.endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </button>
        ))}
      </div>

      {/* Rest of the component remains the same */}
      {/* ... */}
    </div>
  );
}