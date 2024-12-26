import React, { useState } from 'react';
import { PenLine } from 'lucide-react';

interface DailyNoteFormProps {
  date: string;
  currentNote?: string;
  onSave: (note: string) => void;
}

export function DailyNoteForm({ date, currentNote = '', onSave }: DailyNoteFormProps) {
  const [note, setNote] = useState(currentNote);
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 280;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (note.trim()) {
      onSave(note.trim());
      setIsExpanded(false);
    }
  };

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 
                  hover:border-blue-500/30 transition-all duration-300 card-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <PenLine className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">Daily Reflection</h3>
        </div>
        <span className="text-sm text-gray-400">{formattedDate}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, maxLength))}
            onFocus={() => setIsExpanded(true)}
            placeholder="Write your daily reflection..."
            className={`w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl
                     focus:ring-2 focus:ring-purple-500 outline-none text-white transition-all
                     placeholder:text-gray-400 resize-none ${
                       isExpanded ? 'h-32' : 'h-16'
                     }`}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {note.length}/{maxLength}
          </div>
        </div>

        {isExpanded && (
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!note.trim()}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 
                       text-white font-medium rounded-lg shadow-md transition-all duration-300 
                       hover:shadow-lg hover:shadow-purple-500/20 disabled:opacity-50 
                       disabled:cursor-not-allowed"
            >
              Save Note
            </button>
          </div>
        )}
      </form>
    </div>
  );
}