import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import type { DailyNote } from '../types';

interface NotesHistoryProps {
  notes: DailyNote[];
}

export function NotesHistory({ notes }: NotesHistoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const sortedNotes = [...notes].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-6 py-4 bg-gray-800/50 
                 backdrop-blur-sm rounded-xl border border-gray-700/50 
                 hover:border-blue-500/30 transition-all duration-300 mb-2"
      >
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-purple-400" />
          <span className="text-lg font-semibold text-white">Previous Notes</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="text-gray-400" />
        ) : (
          <ChevronDown className="text-gray-400" />
        )}
      </button>

      <div className={`transition-all duration-300 space-y-4 overflow-hidden ${
        isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        {sortedNotes.map((note) => (
          <div
            key={note.date}
            className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-gray-400">
                {new Date(note.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <p className="text-gray-300 whitespace-pre-wrap">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}