import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Circle, Download, Lightbulb } from 'lucide-react';
import type { Goal } from '../types';

interface WeeklyGoalReviewProps {
  goals: Goal[];
  onUpdateGoal: (id: string, updates: Partial<Goal>) => void;
}

export function WeeklyGoalReview({ goals, onUpdateGoal }: WeeklyGoalReviewProps) {
  const [achievements, setAchievements] = useState('');
  const [strategy, setStrategy] = useState('');

  const weeklyQuotes = [
    "Progress is not achieved by luck or accident, but by working on yourself daily.",
    "Small steps every day lead to big achievements over time.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The only way to do great work is to love what you do."
  ];

  const currentQuote = weeklyQuotes[Math.floor(Math.random() * weeklyQuotes.length)];

  const handleExport = () => {
    const reviewData = {
      date: new Date().toLocaleDateString(),
      goals: goals.map(g => ({
        title: g.title,
        status: g.completed ? 'Completed' : 'In Progress',
        priority: g.priority
      })),
      achievements,
      strategy,
      quote: currentQuote
    };

    const blob = new Blob([JSON.stringify(reviewData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `weekly-review-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <BookOpen className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">Weekly Review</h3>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 
                   rounded-lg hover:bg-blue-500/20 transition-colors"
        >
          <Download size={18} />
          Export Review
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Analysis */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-300">Task Progress</h4>
          <div className="space-y-2">
            {goals.map(goal => (
              <div
                key={goal.id}
                className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg"
              >
                <button
                  onClick={() => onUpdateGoal(goal.id, { completed: !goal.completed })}
                  className="flex-shrink-0"
                >
                  {goal.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-blue-400" />
                  )}
                </button>
                <span className={goal.completed ? 'text-gray-400 line-through' : 'text-white'}>
                  {goal.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Achievements */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-300">Weekly Achievements</h4>
          <textarea
            value={achievements}
            onChange={(e) => setAchievements(e.target.value)}
            placeholder="Document your wins this week..."
            className="w-full h-32 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl
                     focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all
                     placeholder:text-gray-400 resize-none"
          />
        </div>

        {/* Strategy Adjustment */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-300">Strategy Adjustment</h4>
          <textarea
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            placeholder="Note any changes or improvements needed..."
            className="w-full h-32 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl
                     focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all
                     placeholder:text-gray-400 resize-none"
          />
        </div>

        {/* Motivational Quote */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            <h4 className="font-medium text-gray-300">Weekly Inspiration</h4>
          </div>
          <p className="text-gray-300 italic">"{currentQuote}"</p>
        </div>
      </div>
    </div>
  );
}