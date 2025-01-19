import React from 'react';
import { Calendar, Flag, Clock, Target } from 'lucide-react';

export function ChallengeDates() {
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 74); // 75 days after start date
  const today = new Date();
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateProgress = () => {
    const totalDays = 75;
    const daysPassed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return Math.min(Math.max(0, daysPassed), totalDays);
  };

  const getDayOfChallenge = () => {
    const daysPassed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    if (daysPassed < 0) return 'Not started';
    if (daysPassed > 75) return 'Completed';
    return `Day ${daysPassed + 1}`;
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 
                    hover:border-blue-500/30 transition-all duration-300 card-shadow mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Start Date</h3>
              <p className="text-gray-400">{formatDate(startDate)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Flag className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">End Date</h3>
              <p className="text-gray-400">{formatDate(endDate)}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Clock className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Today</h3>
              <p className="text-gray-400">{formatDate(today)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Target className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Challenge Status</h3>
              <p className={`font-bold ${
                getDayOfChallenge() === 'Not started'
                  ? 'text-gray-400'
                  : getDayOfChallenge() === 'Completed'
                    ? 'text-green-400'
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'
              }`}>{getDayOfChallenge()}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col justify-center">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Challenge Progress</span>
              <span className="text-gray-400">{calculateProgress()}/90 days</span>
            </div>
            <div className="h-4 bg-gray-700/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 
                         transition-all duration-300"
                style={{ width: `${(calculateProgress() / 90) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}