import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import type { SaasTask } from '../lib/api/saasChallenge';

interface SaasTaskListProps {
  tasks: SaasTask[];
  onToggle: (taskId: string, completed: boolean) => void;
}

export function SaasTaskList({ tasks, onToggle }: SaasTaskListProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <h3 className="text-lg font-semibold text-white mb-6">Próximas Tareas</h3>
      
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.day}
            className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300
                     ${task.completed 
                       ? 'bg-green-500/10 border border-green-500/30' 
                       : 'bg-gray-700/30 border border-gray-600/30 hover:border-blue-500/30'}`}
            onClick={() => onToggle(task.id, !task.completed)}
          >
            {task.completed ? (
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-blue-400 flex-shrink-0" />
            )}
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <span className={`font-medium ${task.completed ? 'text-green-400' : 'text-white'}`}>
                  Día {task.day}
                </span>
              </div>
              <p className={`text-sm ${task.completed ? 'text-green-400' : 'text-gray-400'}`}>
                {task.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}