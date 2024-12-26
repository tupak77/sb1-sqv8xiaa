import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BarChart3 } from 'lucide-react';
import type { Habit } from '../types';

interface HabitCalendarProps {
  habits: Habit[];
}

export function HabitCalendar({ habits }: HabitCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getDayStatus = (date: string) => {
    const habitOrder = [
      'Rezar',
      'No FAP',
      'Ejercicio',
      'Proyecto',
      'Mezquita',
      'Leer'
    ];

    const orderedHabits = [...habits].sort((a, b) => {
      const aIndex = habitOrder.indexOf(a.title);
      const bIndex = habitOrder.indexOf(b.title);
      if (aIndex === -1 && bIndex === -1) return 0;
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });

    return orderedHabits.map(habit => 
      habit.completedDates.includes(date) ? '✓' : '·'
    );
  };

  const getActivityHeatmap = () => {
    const activityByHour = new Array(24).fill(0);
    
    habits.forEach(habit => {
      habit.completedDates.forEach(date => {
        const hour = new Date(date).getHours();
        activityByHour[hour]++;
      });
    });

    const maxActivity = Math.max(...activityByHour);
    return activityByHour.map(count => count / (maxActivity || 1));
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        .toISOString().split('T')[0];
      const status = getDayStatus(date);
      const completedCount = status.filter(s => s === '✓').length;
      const isAllCompleted = completedCount === 6;
      const isAlmostCompleted = completedCount >= 4;
      
      days.push(
        <div
          key={day}
          className={`relative h-16 border border-gray-700/50 rounded-lg flex flex-col items-center justify-center
                     transition-all duration-300 overflow-hidden
                     ${isAllCompleted 
                       ? 'bg-gradient-to-br from-green-500/30 to-emerald-500/30 border-green-500/50 shadow-lg shadow-green-500/20' 
                       : isAlmostCompleted
                         ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30'
                         : completedCount > 0
                           ? 'bg-gray-800/50'
                           : 'bg-gray-800/30'}`}
        >
          {isAllCompleted && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                          animate-shimmer pointer-events-none" />
          )}
          <span className="text-sm font-medium text-gray-400 mb-1">
            {day}
          </span>
          <div className="flex gap-1">
            {status.map((s, i) => (
              <span key={i} className={`transition-all duration-300 ${
                s === '✓' 
                  ? isAllCompleted
                    ? 'text-green-300 animate-pulse'
                    : 'text-green-400'
                  : 'text-gray-600'
              }`}>
                {s}
              </span>
            ))}
          </div>
          {isAllCompleted && (
            <div className="absolute top-0 right-0 w-4 h-4 flex items-center justify-center">
              <span className="text-yellow-400 text-xs animate-bounce">⭐</span>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const activityHeatmap = getActivityHeatmap();

  return (
    <div className="space-y-8">
      {/* Calendar */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <h3 className="text-lg font-semibold text-white">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h3>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm text-gray-400">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {renderCalendar()}
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <BarChart3 className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r 
                       from-blue-400 to-purple-400">
            Daily Activity Pattern
          </h3>
        </div>
        <div className="grid grid-cols-24 gap-1">
          {activityHeatmap.map((intensity, hour) => (
            <div key={hour} className="space-y-2 group">
              <div
                className="h-20 rounded-lg relative overflow-hidden transition-all duration-300 
                         hover:scale-105 transform cursor-pointer group-hover:shadow-lg 
                         group-hover:shadow-blue-500/20"
                style={{
                  backgroundColor: `rgba(59, 130, 246, ${intensity * 0.5})`,
                  transition: 'background-color 0.3s ease'
                }}
              >
                {intensity > 0 && (
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                {intensity > 0.7 && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent 
                               via-white/10 to-transparent animate-shimmer" />
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 
                             group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-medium text-white bg-black/50 px-2 py-1 rounded-full">
                    {Math.round(intensity * 100)}%
                  </span>
                </div>
              </div>
              <div className="text-center text-xs text-gray-400">
                {hour.toString().padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500/20" />
            <span className="text-xs text-gray-400">Low Activity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500/50" />
            <span className="text-xs text-gray-400">Medium Activity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-xs text-gray-400">High Activity</span>
          </div>
        </div>
      </div>
    </div>
  );
}