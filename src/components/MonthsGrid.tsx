import React from 'react';
import type { MonthData } from '../types';
import { MonthCard } from './MonthCard';

interface MonthsGridProps {
  months: MonthData[];
  onUpdateMonth: (name: string, data: Partial<MonthData>) => void;
  onRemoveTrip: (tripId: string) => void;
}

export function MonthsGrid({ months, onUpdateMonth, onRemoveTrip }: MonthsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {months.map((month) => (
        <div key={month.name} className="w-full">
          <MonthCard
            month={month}
            onUpdateMonth={onUpdateMonth}
            onRemoveTrip={onRemoveTrip}
          />
        </div>
      ))}
    </div>
  );
}