import React, { useState } from 'react';
import { Euro, Plus, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

interface IncomeSource {
  id: string;
  name: string;
  amount: number;
  isRecurring: boolean;
}

export function IncomeSection() {
  const [salary, setSalary] = useState('');
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([]);
  const [newSource, setNewSource] = useState({ name: '', amount: '' });

  const totalIncome = Number(salary) + incomeSources.reduce((acc, source) => acc + source.amount, 0);

  const handleAddSource = () => {
    if (newSource.name && newSource.amount) {
      setIncomeSources(prev => [...prev, {
        id: crypto.randomUUID(),
        name: newSource.name,
        amount: Number(newSource.amount),
        isRecurring: true
      }]);
      setNewSource({ name: '', amount: '' });
    }
  };

  const handleToggleRecurring = (id: string) => {
    setIncomeSources(prev => prev.map(source =>
      source.id === id ? { ...source, isRecurring: !source.isRecurring } : source
    ));
  };

  const handleDeleteSource = (id: string) => {
    setIncomeSources(prev => prev.filter(source => source.id !== id));
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-500/20 rounded-lg">
          <Euro className="w-6 h-6 text-green-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">Income Overview</h2>
      </div>

      <div className="space-y-6">
        {/* Monthly Salary */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Monthly Salary</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg
                     focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
            placeholder="Enter your monthly salary"
          />
        </div>

        {/* Additional Income Sources */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Additional Income Sources</label>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newSource.name}
              onChange={(e) => setNewSource(prev => ({ ...prev, name: e.target.value }))}
              className="flex-grow px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg
                       focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
              placeholder="Source name"
            />
            <input
              type="number"
              value={newSource.amount}
              onChange={(e) => setNewSource(prev => ({ ...prev, amount: e.target.value }))}
              className="w-32 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg
                       focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
              placeholder="Amount"
            />
            <button
              onClick={handleAddSource}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 
                       text-white font-medium rounded-lg shadow-md transition-all duration-300"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="space-y-2">
            {incomeSources.map(source => (
              <div
                key={source.id}
                className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggleRecurring(source.id)}
                    className={source.isRecurring ? 'text-green-400' : 'text-gray-400'}
                  >
                    {source.isRecurring ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                  </button>
                  <span className="text-white">{source.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-400">€{source.amount}</span>
                  <button
                    onClick={() => handleDeleteSource(source.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total Income */}
        <div className="pt-4 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Total Monthly Income</span>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                           from-green-400 to-emerald-500">
              €{totalIncome.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}