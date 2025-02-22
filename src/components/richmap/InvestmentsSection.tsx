import React, { useState } from 'react';
import { PiggyBank, TrendingUp, Plus, Trash2 } from 'lucide-react';

interface Investment {
  id: string;
  type: string;
  name: string;
  amount: number;
  returns: number;
}

interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
}

export function InvestmentsSection() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
  const [newInvestment, setNewInvestment] = useState({
    type: '',
    name: '',
    amount: '',
    returns: ''
  });
  const [newGoal, setNewGoal] = useState({
    name: '',
    target: '',
    current: ''
  });

  const investmentTypes = ['Crypto', 'Stocks', 'Index Funds', 'Real Estate'];

  const handleAddInvestment = () => {
    if (newInvestment.name && newInvestment.amount) {
      setInvestments(prev => [...prev, {
        id: crypto.randomUUID(),
        type: newInvestment.type || 'Other',
        name: newInvestment.name,
        amount: Number(newInvestment.amount),
        returns: Number(newInvestment.returns) || 0
      }]);
      setNewInvestment({ type: '', name: '', amount: '', returns: '' });
    }
  };

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.target) {
      setSavingsGoals(prev => [...prev, {
        id: crypto.randomUUID(),
        name: newGoal.name,
        target: Number(newGoal.target),
        current: Number(newGoal.current) || 0
      }]);
      setNewGoal({ name: '', target: '', current: '' });
    }
  };

  const totalInvested = investments.reduce((acc, inv) => acc + inv.amount, 0);
  const totalReturns = investments.reduce((acc, inv) => acc + (inv.amount * (inv.returns / 100)), 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Investments */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Investments</h2>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <select
              value={newInvestment.type}
              onChange={(e) => setNewInvestment(prev => ({ ...prev, type: e.target.value }))}
              className="w-40 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg
                       focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
            >
              <option value="">Type</option>
              {investmentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <input
              type="text"
              value={newInvestment.name}
              onChange={(e) => setNewInvestment(prev => ({ ...prev, name: e.target.value }))}
              className="flex-grow px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg
                       focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
              placeholder="Investment name"
            />
            <input
              type="number"
              value={newInvestment.amount}
              onChange={(e) => setNewInvestment(prev => ({ ...prev, amount: e.target.value }))}
              className="w-32 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg
                       focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
              placeholder="Amount"
            />
            <input
              type="number"
              value={newInvestment.returns}
              onChange={(e) => setNewInvestment(prev => ({ ...prev, returns: e.target.value }))}
              className="w-24 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg
                       focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
              placeholder="ROI %"
            />
            <button
              onClick={handleAddInvestment}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 
                       text-white font-medium rounded-lg shadow-md transition-all duration-300"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="space-y-2">
            {investments.map(investment => (
              <div
                key={investment.id}
                className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">{investment.type}</span>
                    <span className="text-white">{investment.name}</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    ROI: {investment.returns}%
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-400">€{investment.amount}</span>
                  <button
                    onClick={() => setInvestments(prev => prev.filter(i => i.id !== investment.id))}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-700 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Invested</span>
              <span className="text-xl font-bold text-green-400">
                €{totalInvested.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Expected Returns</span>
              <span className="text-xl font-bold text-emerald-400">
                €{totalReturns.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Goals */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <PiggyBank className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Savings Goals</h2>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newGoal.name}
              onChange={(e) => setNewGoal(prev => ({ ...prev, name: e.target.value }))}
              className="flex-grow px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg
                       focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
              placeholder="Goal name"
            />
            <input
              type="number"
              value={newGoal.target}
              onChange={(e) => setNewGoal(prev => ({ ...prev, target: e.target.value }))}
              className="w-32 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg
                       focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
              placeholder="Target"
            />
            <input
              type="number"
              value={newGoal.current}
              onChange={(e) => setNewGoal(prev => ({ ...prev, current: e.target.value }))}
              className="w-32 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg
                       focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
              placeholder="Current"
            />
            <button
              onClick={handleAddGoal}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 
                       text-white font-medium rounded-lg shadow-md transition-all duration-300"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {savingsGoals.map(goal => (
              <div
                key={goal.id}
                className="p-4 bg-gray-700/30 rounded-lg space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white">{goal.name}</span>
                  <button
                    onClick={() => setSavingsGoals(prev => prev.filter(g => g.id !== goal.id))}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Progress: {((goal.current / goal.target) * 100).toFixed(1)}%</span>
                  <span>€{goal.current} / €{goal.target}</span>
                </div>
                <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                    style={{ width: `${(goal.current / goal.target) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}