import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { PriorityLevel } from '../types';

interface AddGoalFormProps {
  onAdd: (title: string, priority: PriorityLevel) => void;
}

export function AddGoalForm({ onAdd }: AddGoalFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), priority);
      setTitle('');
      setPriority('medium');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your goal..."
          className="flex-grow px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl
                   focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all
                   placeholder:text-gray-400"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as PriorityLevel)}
          className="px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl
                   focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
        >
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
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
  );
}