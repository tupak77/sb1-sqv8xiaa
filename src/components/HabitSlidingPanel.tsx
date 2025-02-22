import React from 'react';
import { X, Calendar } from 'lucide-react';
import type { Habit } from '../types';
import { HabitHistoryEditor } from './HabitHistoryEditor';
import { calculateBestStreak } from '../utils/streaks';

interface HabitSlidingPanelProps {
  habit: Habit | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleDate: (habitId: string, date: string) => void;
  onUpdateNotes: (habitId: string, date: string, note: string) => void;
}

export function HabitSlidingPanel({ 
  habit, 
  isOpen, 
  onClose,
  onToggleDate,
  onUpdateNotes
}: HabitSlidingPanelProps) {
  if (!habit) return null;

  const startDate = new Date('2025-02-22');
  const totalDays = habit.completedDates.length;
  const currentStreak = calculateStreak(habit.completedDates);
  const bestStreak = calculateBestStreak(habit.completedDates, startDate);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40
                   ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`fixed right-0 top-0 h-full w-[40rem] max-w-[90vw] bg-gray-900/95 backdrop-blur-md
                   border-l border-gray-700/50 shadow-2xl transform transition-transform duration-300
                   ease-out z-50 overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-md z-10 px-6 py-4 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {habit.title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          {habit.description && (
            <p className="mt-2 text-gray-400">{habit.description}</p>
          )}
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="text-sm text-gray-400 mb-1">Best Streak</div>
            <div className="text-2xl font-bold text-yellow-400">{bestStreak} days</div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
              <div className="text-sm text-gray-400 mb-1">Total Days</div>
              <div className="text-2xl font-bold text-blue-400">{totalDays}</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
              <div className="text-sm text-gray-400 mb-1">Current Streak</div>
              <div className="text-2xl font-bold text-purple-400">{currentStreak} days</div>
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">History</h3>
            </div>
            <HabitHistoryEditor
              habit={habit}
              onToggle={onToggleDate}
              onUpdateNotes={onUpdateNotes}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function calculateStreak(dates: string[]): number {
  if (dates.length === 0) return 0;
  
  const sortedDates = [...dates].sort();
  const today = new Date().toISOString().split('T')[0];
  let streak = 0;
  let currentDate = new Date(sortedDates[sortedDates.length - 1]);
  
  // If the last completion wasn't today or yesterday, streak is 0
  if (sortedDates[sortedDates.length - 1] < today) {
    const lastDate = new Date(sortedDates[sortedDates.length - 1]);
    const diffTime = Math.abs(new Date().getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 1) return 0;
  }

  for (let i = sortedDates.length - 1; i >= 0; i--) {
    const date = new Date(sortedDates[i]);
    const diffTime = Math.abs(currentDate.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) {
      streak++;
      currentDate = date;
    } else {
      break;
    }
  }
  
  return streak;
}