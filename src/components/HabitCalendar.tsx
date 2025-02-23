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
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return day === 0 ? 6 : day - 1; // Convert to Monday-based (0 = Monday, 6 = Sunday)
  };

  const getDayStatus = (date: string) => {
    const utcDate = new Date(date + 'T00:00:00Z').toISOString().split('T')[0];
    const habitOrder = [
      'Rezar',
      'No FAP',
      'Ejercicio',
      'Proyecto',
      'Mezquita',
      'Leer'
    ];
    
    // Only show status for dates from Feb 23, 2025 onwards
    if (new Date(utcDate) < new Date('2025-02-23')) {
      return habitOrder.map(() => '·');
    }

    const orderedHabits = [...habits].sort((a, b) => {
      const aIndex = habitOrder.indexOf(a.title);
      const bIndex = habitOrder.indexOf(b.title);
      if (aIndex === -1 && bIndex === -1) return 0;
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });

    return orderedHabits.map(habit => 
      habit.completedDates.includes(utcDate) ? '✓' : '·'
    );
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
      const date = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), day))
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

  return (
    <div className="space-y-8">
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
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="text-center text-sm text-gray-400">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
}