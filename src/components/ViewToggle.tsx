import React from 'react';
import { LayoutGrid, ScrollText } from 'lucide-react';

interface ViewToggleProps {
  isGridView: boolean;
  onToggle: () => void;
}

export function ViewToggle({ isGridView, onToggle }: ViewToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full backdrop-blur-sm 
                 border border-gray-700/50 text-gray-300 hover:text-white transition-all duration-300
                 hover:scale-105 hover:border-blue-500/50 hover:bg-gray-700/50"
    >
      {isGridView ? (
        <>
          <ScrollText size={20} />
          <span>Carousel View</span>
        </>
      ) : (
        <>
          <LayoutGrid size={20} />
          <span>Grid View</span>
        </>
      )}
    </button>
  );
}