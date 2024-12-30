import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import type { Habit } from '../types';

import { createUTCDate } from '../utils/dates';

interface HabitHistoryEditorProps {
  habit: Habit;
  onToggle: (id: string, date: string) => void;
  onUpdateNotes: (id: string, date: string, note: string) => void;
}

export function HabitHistoryEditor({ habit, onToggle, onUpdateNotes }: HabitHistoryEditorProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState('');

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return day === 0 ? 6 : day - 1; // Convert to Monday-based (0 = Monday, 6 = Sunday)
  };

  const formatDateString = (year: number, month: number, day: number) => {
    const monthStr = String(month + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${monthStr}-${dayStr}`;
  };

  const handleDateClick = (dateStr: string) => {
    setSelectedDate(dateStr);
    const note = habit.notes?.find(n => n.date === dateStr);
    setNoteContent(note?.content || '');
  };

  const handleToggleDate = (dateStr: string) => {
    onToggle(habit.id, dateStr);
  };

  const handleSaveNote = () => {
    if (selectedDate && noteContent.trim()) {
      onUpdateNotes(habit.id, selectedDate, noteContent.trim());
    }
    setSelectedDate(null);
    setNoteContent('');
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendar = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDateString(year, month, day);
      const isCompleted = habit.completedDates.includes(dateStr);
      const hasNote = habit.notes?.some(note => note.date === dateStr);
      const isSelected = dateStr === selectedDate;
      
      days.push(
        <div
          key={day}
          className={`relative h-16 border rounded-lg flex flex-col items-center justify-center
                     transition-all duration-300 cursor-pointer
                     ${isSelected 
                       ? 'border-blue-500 bg-blue-500/20' 
                       : isCompleted
                         ? 'border-green-500/30 bg-green-500/10'
                         : 'border-gray-700/50 bg-gray-800/50'}`}
          onClick={() => handleDateClick(dateStr)}
        >
          <span className="text-sm font-medium text-gray-400 mb-1">
            {day}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleDate(dateStr);
            }}
            className="transition-transform hover:scale-110"
          >
            {isCompleted ? (
              <CheckCircle2 size={20} className="text-green-400" />
            ) : (
              <Circle size={20} className="text-gray-400" />
            )}
          </button>
          {hasNote && (
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-400" />
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <CalendarIcon className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{habit.title}</h3>
              <p className="text-sm text-gray-400">Edit History</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <h3 className="text-lg font-semibold text-white">
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="text-center text-sm text-gray-400">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {renderCalendar()}
        </div>
      </div>

      {selectedDate && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h4 className="text-lg font-semibold text-white mb-4">
            {new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h4>
          <div className="space-y-4">
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Add a note for this day..."
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl
                       focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all
                       placeholder:text-gray-400 resize-none h-32"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedDate(null)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 
                         text-white font-medium rounded-lg shadow-md transition-all duration-300"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}