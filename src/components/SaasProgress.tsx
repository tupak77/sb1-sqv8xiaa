import React, { useState } from 'react';
import { DollarSign, Users, LineChart, Target } from 'lucide-react';
import type { SaasChallenge } from '../lib/api/saasChallenge';

interface SaasProgressProps {
  challenge: SaasChallenge;
  onUpdate: (updates: Partial<SaasChallenge>) => void;
}

export function SaasProgress({ challenge, onUpdate }: SaasProgressProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    currentMrr: challenge.currentMrr,
    activeUsers: challenge.activeUsers,
    conversionRate: challenge.conversionRate,
    churnRate: challenge.churnRate
  });

  const targetMRR = 15000;
  const progress = (challenge.currentMrr / targetMRR) * 100;

  const handleSave = () => {
    onUpdate(editValues);
    setIsEditing(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 
                    hover:border-blue-500/30 transition-all duration-300 card-shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <DollarSign className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-300">Current MRR</h3>
        </div>
        {isEditing ? (
          <input
            type="number"
            value={editValues.currentMrr}
            onChange={(e) => setEditValues(prev => ({ ...prev, currentMrr: parseFloat(e.target.value) }))}
            className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg 
                     text-white text-xl font-bold mb-2"
          />
        ) : (
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            ${challenge.currentMrr.toLocaleString()}
          </p>
        )}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Progress</span>
            <span className="text-gray-400">{progress.toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 
                    hover:border-blue-500/30 transition-all duration-300 card-shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Users className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-300">Active Users</h3>
        </div>
        {isEditing ? (
          <input
            type="number"
            value={editValues.activeUsers}
            onChange={(e) => setEditValues(prev => ({ ...prev, activeUsers: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg 
                     text-white text-xl font-bold mb-2"
          />
        ) : (
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            {challenge.activeUsers}
          </p>
        )}
        <p className="mt-2 text-sm text-gray-400">
          Growing steadily
        </p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 
                    hover:border-blue-500/30 transition-all duration-300 card-shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <LineChart className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-300">Conversion Rate</h3>
        </div>
        {isEditing ? (
          <input
            type="number"
            value={editValues.conversionRate}
            onChange={(e) => setEditValues(prev => ({ ...prev, conversionRate: parseFloat(e.target.value) }))}
            className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg 
                     text-white text-xl font-bold mb-2"
            step="0.1"
          />
        ) : (
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
            {challenge.conversionRate}%
          </p>
        )}
        <p className="mt-2 text-sm text-gray-400">
          Trial to paid
        </p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 
                    hover:border-blue-500/30 transition-all duration-300 card-shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-500/20 rounded-lg">
            <Target className="w-6 h-6 text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-300">Churn Rate</h3>
        </div>
        {isEditing ? (
          <input
            type="number"
            value={editValues.churnRate}
            onChange={(e) => setEditValues(prev => ({ ...prev, churnRate: parseFloat(e.target.value) }))}
            className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg 
                     text-white text-xl font-bold mb-2"
            step="0.1"
          />
        ) : (
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">
            {challenge.churnRate}%
          </p>
        )}
        <p className="mt-2 text-sm text-gray-400">
          Monthly churn
        </p>
      </div>
      
      {isEditing ? (
        <button
          onClick={handleSave}
          className="col-span-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 
                   text-white font-medium rounded-lg shadow-md transition-all duration-300"
        >
          Save Changes
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="col-span-full px-4 py-2 bg-gray-700/50 text-gray-300 
                   font-medium rounded-lg shadow-md transition-all duration-300
                   hover:bg-gray-600/50"
        >
          Edit Values
        </button>
      )}
    </div>
  );
}