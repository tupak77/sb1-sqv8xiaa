import React, { useState } from 'react';
import { CheckCircle2, Circle, Trash2, Trophy, Calendar, PenLine } from 'lucide-react';
import { HabitCompletionAnimation } from './HabitCompletionAnimation';
import { DailyNoteForm } from './DailyNoteForm';
import type { Habit } from '../types';

import { toUTCDateString } from '../utils/dates';

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string, date: string) => void;
  onUpdateNotes: (id: string, date: string, note: string) => void;
  onClick: () => void;
  onDelete: (id: string) => void;
}

export function HabitCard({ habit, onToggle, onUpdateNotes, onClick, onDelete }: HabitCardProps) {
  const today = new Date();
  const todayStr = toUTCDateString(today);
  const isCompletedToday = habit.completedDates.includes(todayStr);
  const [showAnimation, setShowAnimation] = useState<'confetti' | 'checkmark' | null>(null);
  const [showNoteForm, setShowNoteForm] = useState(false);

  const handleToggle = () => {
    if (!isCompletedToday) {
      setShowAnimation(Math.random() > 0.5 ? 'confetti' : 'checkmark');
    }
    onToggle(habit.id, todayStr);
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleToggle();
  };
  
  const calculateStreak = () => {
    let streak = 0;
    const sortedDates = [...habit.completedDates].sort();
    const lastDate = new Date(sortedDates[sortedDates.length - 1] + 'T00:00:00Z');
    
    for (let i = sortedDates.length - 1; i >= 0; i--) {
      const currentDate = new Date(sortedDates[i] + 'T00:00:00Z');
      const expectedDate = new Date(lastDate);
      expectedDate.setDate(lastDate.getDate() - (sortedDates.length - 1 - i));
      
      if (currentDate.toISOString().split('T')[0] === expectedDate.toISOString().split('T')[0]) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const todayNote = habit.notes?.find(note => note.date === todayStr);
  const streak = calculateStreak();

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 
                    hover:border-blue-500/30 transition-all duration-300 card-shadow
                    cursor-pointer"
         onClick={onClick}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-grow">
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleClick}
              className={`transition-transform duration-300 ${
                isCompletedToday ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              {isCompletedToday ? (
                <CheckCircle2 size={24} className="text-green-400" />
              ) : (
                <Circle size={24} className="text-blue-400" />
              )}
            </button>
            <div>
              <h3 className="text-xl font-semibold text-white">{habit.title}</h3>
              {habit.description && (
                <p className="text-gray-400 mt-1">{habit.description}</p>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2 text-yellow-400">
              <Trophy size={18} />
              <span className="text-sm font-medium">{streak} day streak</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <Calendar size={18} />
              <span className="text-sm font-medium">
                {habit.completedDates.length} total days
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNoteForm(!showNoteForm);
              }}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors ml-auto"
            >
              <PenLine size={18} />
              <span className="text-sm font-medium">
                {todayNote ? 'Edit Note' : 'Add Note'}
              </span>
            </button>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(habit.id);
          }}
          className="p-2 text-red-400 hover:text-red-300 transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="mt-4 h-2 bg-gray-700/50 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${(habit.completedDates.length / 90) * 100}%` }}
        />
      </div>
      
      {showNoteForm && (
        <div className="mt-4">
          <DailyNoteForm
            date={todayStr}
            currentNote={todayNote?.content}
            onSave={(note) => {
              onUpdateNotes(habit.id, todayStr, note);
              setShowNoteForm(false);
            }}
          />
        </div>
      )}
      
      {showAnimation && (
        <HabitCompletionAnimation
          type={showAnimation}
          onComplete={() => setShowAnimation(null)}
        />
      )}
    </div>
  );
}