import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { HabitProgress } from './HabitProgress';
import type { Habit } from '../types';

interface HabitStatsProps {
  habits: Habit[];
}

export function HabitStats({ habits }: HabitStatsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-6 py-4 bg-gray-800/50 
                 backdrop-blur-sm rounded-xl border border-gray-700/50 
                 hover:border-blue-500/30 transition-all duration-300 mb-2"
      >
        <span className="text-lg font-semibold text-white">Detailed Statistics</span>
        {isExpanded ? (
          <ChevronUp className="text-gray-400" />
        ) : (
          <ChevronDown className="text-gray-400" />
        )}
      </button>

      <div className={`transition-all duration-300 overflow-hidden ${
        isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <HabitProgress habits={habits} />
      </div>
    </div>
  );
}