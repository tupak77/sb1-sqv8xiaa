import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Subscription, SubscriptionCategory } from '../types';

interface AddSubscriptionFormProps {
  onAdd: (subscription: Omit<Subscription, 'id'>) => void;
}

export function AddSubscriptionForm({ onAdd }: AddSubscriptionFormProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<SubscriptionCategory>('other');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && amount) {
      onAdd({
        name: name.trim(),
        amount: parseFloat(amount),
        category,
        active: true
      });
      setName('');
      setAmount('');
      setCategory('other');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Subscription name..."
          className="flex-grow px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl
                   focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all
                   placeholder:text-gray-400"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount..."
          step="0.01"
          min="0"
          className="w-32 px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl
                   focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all
                   placeholder:text-gray-400"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as SubscriptionCategory)}
          className="px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl
                   focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
        >
          <option value="entertainment">Entertainment</option>
          <option value="utilities">Utilities</option>
          <option value="services">Services</option>
          <option value="other">Other</option>
        </select>
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 
                   text-white font-medium rounded-xl shadow-md transition-all duration-300 
                   hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] 
                   active:scale-[0.98] transform-gpu flex items-center gap-2"
        >
          <Plus size={20} />
          Add Subscription
        </button>
      </div>
    </form>
  );
}