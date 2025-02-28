import React, { useState } from 'react';
import { Moon, Star, Calendar, CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Particles } from '../components/ui/particles';

interface RamadanGoal {
  id: string;
  title: string;
  completed: boolean;
}

export function RamadanPage() {
  const [goals, setGoals] = useState<RamadanGoal[]>([]);
  const [newGoal, setNewGoal] = useState('');

  const startDate = new Date('2025-03-02');
  const endDate = new Date('2025-03-31');
  const today = new Date();
  const daysPassed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalDays = 30;
  const progress = Math.min(Math.max(0, daysPassed), totalDays);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim()) {
      setGoals(prev => [...prev, {
        id: crypto.randomUUID(),
        title: newGoal.trim(),
        completed: false
      }]);
      setNewGoal('');
    }
  };

  const handleToggleGoal = (id: string) => {
    setGoals(prev => prev.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="relative">
        <Particles
          className="absolute inset-0 -z-10"
          quantity={100}
          ease={80}
          color="#3b82f6"
          refresh={false}
        />
        
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Moon size={40} className="text-blue-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 
                         bg-clip-text text-transparent gradient-animate">
              Ramadan 2025
            </h1>
          </div>
          <p className="text-xl text-gray-400 font-medium tracking-wide">
            Set and track your spiritual goals for Ramadan
          </p>
        </header>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Start Date</h3>
                  <p className="text-gray-400">{startDate.toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Star className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">End Date</h3>
                  <p className="text-gray-400">{endDate.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-gray-400">{progress}/{totalDays} days</span>
                </div>
                <div className="h-4 bg-gray-700/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 
                             transition-all duration-300"
                    style={{ width: `${(progress / totalDays) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleAddGoal} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Add a new Ramadan goal..."
              className="flex-grow px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl
                       focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all
                       placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 
                       text-white font-medium rounded-xl shadow-md transition-all duration-300 
                       hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] 
                       active:scale-[0.98] transform-gpu flex items-center gap-2"
            >
              <Plus size={20} />
              Add Goal
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 gap-4">
          {goals.map(goal => (
            <div
              key={goal.id}
              className={`flex items-center justify-between p-6 bg-gray-800/50 backdrop-blur-sm 
                       rounded-xl border transition-all duration-300 ${
                         goal.completed
                           ? 'border-green-500/30 bg-green-500/10'
                           : 'border-gray-700/50 hover:border-blue-500/30'
                       }`}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleToggleGoal(goal.id)}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {goal.completed ? (
                    <CheckCircle2 size={24} className="text-green-400" />
                  ) : (
                    <Circle size={24} />
                  )}
                </button>
                <span className={`text-lg ${goal.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                  {goal.title}
                </span>
              </div>
              <button
                onClick={() => handleDeleteGoal(goal.id)}
                className="p-2 text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}