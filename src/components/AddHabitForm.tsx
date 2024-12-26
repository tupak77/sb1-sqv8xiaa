import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Habit, HabitFrequency } from '../types';

interface AddHabitFormProps {
  onAdd: (habit: Omit<Habit, 'id'>) => void;
}

export function AddHabitForm({ onAdd }: AddHabitFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<HabitFrequency>('daily');
  const [category, setCategory] = useState('personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        description: description.trim(),
        frequency,
        category,
        startDate: new Date().toISOString(),
        completedDates: [],
        active: true
      });
      setTitle('');
      setDescription('');
      setFrequency('daily');
      setCategory('personal');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New habit..."
            className="flex-grow px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl
                     focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all
                     placeholder:text-gray-400"
          />
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as HabitFrequency)}
            className="px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl
                     focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl
                     focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
          >
            <option value="personal">Personal</option>
            <option value="health">Health</option>
            <option value="career">Career</option>
            <option value="learning">Learning</option>
          </select>
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="flex-grow px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl
                     focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all
                     placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 
                     text-white font-medium rounded-xl shadow-md transition-all duration-300 
                     hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] 
                     active:scale-[0.98] transform-gpu flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={20} />
            Add Habit
          </button>
        </div>
      </div>
    </form>
  );
}