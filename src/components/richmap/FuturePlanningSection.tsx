import React, { useState } from 'react';
import { Target, Calculator, ArrowRight } from 'lucide-react';

interface Scenario {
  id: string;
  name: string;
  income: number;
  expenses: number;
  savings: number;
  investments: number;
}

export function FuturePlanningSection() {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [newScenario, setNewScenario] = useState({
    name: '',
    income: '',
    expenses: '',
    savings: '',
    investments: ''
  });

  const handleAddScenario = () => {
    if (newScenario.name && newScenario.income) {
      setScenarios(prev => [...prev, {
        id: crypto.randomUUID(),
        name: newScenario.name,
        income: Number(newScenario.income),
        expenses: Number(newScenario.expenses),
        savings: Number(newScenario.savings),
        investments: Number(newScenario.investments)
      }]);
      setNewScenario({
        name: '',
        income: '',
        expenses: '',
        savings: '',
        investments: ''
      });
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Target className="w-6 h-6 text-blue-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">Future Planning</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scenario Builder */}
        <div>
          <h3 className="text-lg font-medium text-gray-300 mb-4">Financial Scenario Builder</h3>
          
          <div className="space-y-4">
            <input
              type="text"
              value={newScenario.name}
              onChange={(e) => setNewScenario(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg
                       focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
              placeholder="Scenario name"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Monthly Income</label>
                <input
                  type="number"
                  value={newScenario.income}
                  onChange={(e) => setNewScenario(prev => ({ ...prev, income: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg
                           focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
                  placeholder="€"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Monthly Expenses</label>
                <input
                  type="number"
                  value={newScenario.expenses}
                  onChange={(e) => setNewScenario(prev => ({ ...prev, expenses: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg
                           focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
                  placeholder="€"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Monthly Savings</label>
                <input
                  type="number"
                  value={newScenario.savings}
                  onChange={(e) => setNewScenario(prev => ({ ...prev, savings: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg
                           focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
                  placeholder="€"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Monthly Investments</label>
                <input
                  type="number"
                  value={newScenario.investments}
                  onChange={(e) => setNewScenario(prev => ({ ...prev, investments: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg
                           focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
                  placeholder="€"
                />
              </div>
            </div>

            <button
              onClick={handleAddScenario}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 
                       text-white font-medium rounded-lg shadow-md transition-all duration-300"
            >
              Add Scenario
            </button>
          </div>
        </div>

        {/* Scenarios List */}
        <div>
          <h3 className="text-lg font-medium text-gray-300 mb-4">Your Scenarios</h3>
          
          <div className="space-y-4">
            {scenarios.map(scenario => (
              <div
                key={scenario.id}
                className="p-4 bg-gray-700/30 rounded-lg space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">{scenario.name}</span>
                  <Calculator className="w-5 h-5 text-blue-400" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Income:</span>
                    <span className="ml-2 text-green-400">€{scenario.income}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Expenses:</span>
                    <span className="ml-2 text-red-400">€{scenario.expenses}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Savings:</span>
                    <span className="ml-2 text-blue-400">€{scenario.savings}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Investments:</span>
                    <span className="ml-2 text-purple-400">€{scenario.investments}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-600">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Monthly Balance</span>
                    <span className="text-lg font-semibold text-white">
                      €{scenario.income - scenario.expenses}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-400">Yearly Projection</span>
                    <span className="text-lg font-semibold text-white">
                      €{(scenario.income - scenario.expenses) * 12}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {scenarios.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No scenarios created yet. Start by adding one above!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}