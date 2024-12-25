import React, { useState } from 'react';
import { CheckCircle2, Circle, Pencil, Save, Trash2, X } from 'lucide-react';
import type { Goal, PriorityLevel } from '../types';

interface GoalCardProps {
  goal: Goal;
  onUpdate: (id: string, updates: Partial<Goal>) => void;
  onDelete: (id: string) => void;
}

export function GoalCard({ goal, onUpdate, onDelete }: GoalCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(goal.title);
  const [editedPriority, setEditedPriority] = useState<PriorityLevel>(goal.priority);

  const priorityColors = {
    high: 'text-red-400 border-red-400/30 bg-red-400/10',
    medium: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    low: 'text-green-400 border-green-400/30 bg-green-400/10'
  };

  const handleSave = () => {
    onUpdate(goal.id, {
      title: editedTitle,
      priority: editedPriority
    });
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    onUpdate(goal.id, { completed: !goal.completed });
  };

  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 
                    hover:border-blue-500/30 transition-all duration-300 card-shadow
                    ${goal.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-grow">
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
                autoFocus
              />
              <select
                value={editedPriority}
                onChange={(e) => setEditedPriority(e.target.value as PriorityLevel)}
                className="px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleComplete}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                {goal.completed ? (
                  <CheckCircle2 size={24} className="text-green-400" />
                ) : (
                  <Circle size={24} />
                )}
              </button>
              <div>
                <h3 className={`text-xl font-semibold ${goal.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                  {goal.title}
                </h3>
                <span className={`inline-block px-3 py-1 rounded-full text-sm border mt-2 
                              ${priorityColors[goal.priority]}`}>
                  {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)} Priority
                </span>
              </div>
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
                onClick={() => setIsEditing(true)}
                className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={() => onDelete(goal.id)}
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