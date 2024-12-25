import { useState, useEffect } from 'react';

export function useViewPreference() {
  const [isGridView, setIsGridView] = useState(() => {
    const saved = localStorage.getItem('viewPreference');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('viewPreference', JSON.stringify(isGridView));
  }, [isGridView]);

  return [isGridView, setIsGridView] as const;
}