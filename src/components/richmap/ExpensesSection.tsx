import React, { useState } from 'react';
import { Receipt, AlertCircle, Plus, Trash2, Calendar } from 'lucide-react';

interface Expense {
  id: string;
  category: string;
  name: string;
  amount: number;
  dueDate?: string;
  isFixed: boolean;
  limit?: number;
}

export function ExpensesSection() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState({
    category: '',
    name: '',
    amount: '',
    dueDate: '',
    isFixed: true,
    limit: ''
  });

  const categories = {
    fixed: ['Rent', 'Utilities', 'Transport', 'Subscriptions'],
    variable: ['Food', 'Entertainment', 'Shopping', 'Health']
  };

  const handleAddExpense = () => {
    if (newExpense.name && newExpense.amount) {
      setExpenses(prev => [...prev, {
        id: crypto.randomUUID(),
        category: newExpense.category || 'Other',
        name: newExpense.name,
        amount: Number(newExpense.amount),
        dueDate: newExpense.dueDate,
        isFixed: newExpense.isFixed,
        limit: Number(newExpense.limit) || undefined
      }]);
      setNewExpense({
        category: '',
        name: '',
        amount: '',
        dueDate: '',
        isFixed: true,
        limit: ''
      });
    }
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const totalFixed = expenses
    .filter(e => e.isFixed)
    .reduce((acc, e) => acc + e.amount, 0);

  const totalVariable = expenses
    .filter(e => !e.isFixed)
    .reduce((acc, e) => acc + e.amount, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Fixed Expenses */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Receipt className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Fixed Expenses</h2>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <select
              value={newExpense.category}
              onChange={(e) => setNewExpense(prev => ({ ...prev, category: e.target.value }))}
              className="flex-grow px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg
                       focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
            >
              <option value="">Select Category</option>
              {categories.fixed.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="text"
              value={newExpense.name}
              onChange={(e) => setNewExpense(prev => ({ ...prev, name: e.target.value }))}
              className="flex-grow px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg
                       focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
              placeholder="Expense name"
            />
            <input
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
              className="w-32 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg
                       focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
              placeholder="Amount"
            />
            <button
              onClick={handleAddExpense}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 
                       text-white font-medium rounded-lg shadow-md transition-all duration-300"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="space-y-2">
            {expenses
              .filter(e => e.isFixed)
              .map(expense => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">{expense.category}</span>
                    <span className="text-white">{expense.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-blue-400">€{expense.amount}</span>
                    <button
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div className="pt-4 border-t border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Fixed Expenses</span>
              <span className="text-xl font-bold text-blue-400">
                €{totalFixed.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Variable Expenses */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Receipt className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Variable Expenses</h2>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <select
              value={newExpense.category}
              onChange={(e) => setNewExpense(prev => ({ ...prev, category: e.target.value, isFixed: false }))}
              className="flex-grow px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg
                       focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
            >
              <option value="">Select Category</option>
              {categories.variable.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="text"
              value={newExpense.name}
              onChange={(e) => setNewExpense(prev => ({ ...prev, name: e.target.value }))}
              className="flex-grow px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg
                       focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
              placeholder="Expense name"
            />
            <input
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
              className="w-32 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg
                       focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
              placeholder="Amount"
            />
            <button
              onClick={handleAddExpense}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 
                       text-white font-medium rounded-lg shadow-md transition-all duration-300"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="space-y-2">
            {expenses
              .filter(e => !e.isFixed)
              .map(expense => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">{expense.category}</span>
                    <span className="text-white">{expense.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-purple-400">€{expense.amount}</span>
                    <button
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div className="pt-4 border-t border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Variable Expenses</span>
              <span className="text-xl font-bold text-purple-400">
                €{totalVariable.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}