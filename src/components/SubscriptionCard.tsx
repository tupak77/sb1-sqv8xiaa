import React, { useState } from 'react';
import { Pencil, Save, Trash2, X, ToggleLeft, ToggleRight } from 'lucide-react';
import type { Subscription, SubscriptionCategory } from '../types';

interface SubscriptionCardProps {
  subscription: Subscription;
  onUpdate: (id: string, updates: Partial<Subscription>) => void;
  onDelete: (id: string) => void;
}

export function SubscriptionCard({ subscription, onUpdate, onDelete }: SubscriptionCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(subscription.name);
  const [editedAmount, setEditedAmount] = useState(subscription.amount.toString());
  const [editedCategory, setEditedCategory] = useState(subscription.category);

  const categoryColors = {
    entertainment: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
    utilities: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
    services: 'text-green-400 border-green-400/30 bg-green-400/10',
    other: 'text-gray-400 border-gray-400/30 bg-gray-400/10'
  };

  const handleSave = () => {
    onUpdate(subscription.id, {
      name: editedName,
      amount: parseFloat(editedAmount),
      category: editedCategory
    });
    setIsEditing(false);
  };

  const handleToggleActive = () => {
    onUpdate(subscription.id, { active: !subscription.active });
  };

  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 
                    hover:border-blue-500/30 transition-all duration-300 card-shadow
                    ${!subscription.active ? 'opacity-75' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-grow">
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
                autoFocus
              />
              <input
                type="number"
                value={editedAmount}
                onChange={(e) => setEditedAmount(e.target.value)}
                step="0.01"
                min="0"
                className="w-32 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
              />
              <select
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value as SubscriptionCategory)}
                className="px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
              >
                <option value="entertainment">Entertainment</option>
                <option value="utilities">Utilities</option>
                <option value="services">Services</option>
                <option value="other">Other</option>
              </select>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold text-white">{subscription.name}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-sm border
                              ${categoryColors[subscription.category]}`}>
                  {subscription.category.charAt(0).toUpperCase() + subscription.category.slice(1)}
                </span>
              </div>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                          from-blue-400 to-purple-500 mt-2">
                €{subscription.amount.toFixed(2)}
              </p>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-2 text-green-400 hover:text-green-300 transition-colors"
              >
                <Save size={20} />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 text-red-400 hover:text-red-300 transition-colors"
              >
                <X size={20} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleToggleActive}
                className={`p-2 ${subscription.active ? 'text-green-400 hover:text-green-300' : 'text-gray-400 hover:text-gray-300'} transition-colors`}
              >
                {subscription.active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={() => onDelete(subscription.id)}
                className="p-2 text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}