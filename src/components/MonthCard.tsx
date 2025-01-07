import React, { useState } from 'react';
import { Plane, Euro, Plus, X } from 'lucide-react';
import { PlaneAnimation } from './PlaneAnimation';
import { NumberInput } from './NumberInput';
import type { MonthData, Trip } from '../types';
import { useClickAnimation } from '../hooks/useClickAnimation';

interface MonthCardProps {
  month: MonthData;
  onUpdateMonth: (name: string, data: Partial<MonthData>) => void;
  onRemoveTrip: (tripId: string) => void;
}

export function MonthCard({ month, onUpdateMonth, onRemoveTrip }: MonthCardProps) {
  const [newTrip, setNewTrip] = useState('');
  const [showAddTrip, setShowAddTrip] = useState(false);
  const { handleClick, animationClass } = useClickAnimation();
  const BASE_BUDGET = 2250;

  const handleAddTripClick = () => {
    setShowAddTrip(true);
  };

  const handleClubValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const templateValue = month.templateValue || 0;
    const additionalValue = value + templateValue;
    onUpdateMonth(month.name, { 
      clubValue: value,
      templateValue: templateValue,
      clubMultiplier: month.clubMultiplier || 25,
      additionalValue: additionalValue
    });
  };

  const handleTemplateValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const clubValue = month.clubValue || 0;
    const additionalValue = clubValue + value;
    onUpdateMonth(month.name, { 
      clubValue: clubValue,
      templateValue: value,
      templateMultiplier: month.templateMultiplier || 25,
      additionalValue: additionalValue
    });
  };

  const handleClubMultiplierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : parseInt(e.target.value) || 25;
    onUpdateMonth(month.name, { clubMultiplier: value });
  };

  const handleTemplateMultiplierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : parseInt(e.target.value) || 25;
    onUpdateMonth(month.name, { templateMultiplier: value });
  };

  const handleAddTrip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrip.trim()) return;

    const trip: Trip = {
      id: crypto.randomUUID(),
      destination: newTrip,
      dates: new Date().toISOString(),
    };
    
    onUpdateMonth(month.name, {
      trips: [...(month.trips || []), trip],
    });

    setNewTrip('');
    setShowAddTrip(false);
  };

  const totalBudget = BASE_BUDGET + (month.clubValue || 0) * (month.clubMultiplier || 25) + 
                      (month.templateValue || 0) * (month.templateMultiplier || 25);

  return (
    <div className="w-full h-[32rem] bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 flex flex-col snap-center card-shadow border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">{month.name}</h3>
      
      <div className="space-y-4 flex-grow min-h-0">
        <div className="flex items-center gap-2 text-gray-300">
          <Euro size={20} />
          <span className="font-semibold">Base: €{BASE_BUDGET}</span>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div>
                <label htmlFor={`club-${month.name}`} className="block text-sm text-gray-400 mb-1">Club</label>
                <div className="flex gap-2 items-center">
                  <NumberInput
                    id={`club-${month.name}`}
                    value={month.clubValue || ''}
                    onChange={handleClubValueChange}
                    min="0"
                    className="w-24"
                  />
                  <span className="text-gray-400">×</span>
                  <NumberInput
                    id={`club-multiplier-${month.name}`}
                    value={month.clubMultiplier ?? ''}
                    onChange={handleClubMultiplierChange}
                    min="1"
                    className="w-20"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div>
                <label htmlFor={`template-${month.name}`} className="block text-sm text-gray-400 mb-1">Template</label>
                <div className="flex gap-2 items-center">
                  <NumberInput
                    id={`template-${month.name}`}
                    value={month.templateValue || ''}
                    onChange={handleTemplateValueChange}
                    min="0"
                    className="w-24"
                  />
                  <span className="text-gray-400">×</span>
                  <NumberInput
                    id={`template-multiplier-${month.name}`}
                    value={month.templateMultiplier ?? ''}
                    onChange={handleTemplateMultiplierChange}
                    min="1"
                    className="w-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-300 flex items-center gap-2">
              <Plane size={20} />
              Planned Trips
            </h4>
            <button
              onClick={handleAddTripClick}
              className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 
                         text-white font-medium rounded-lg shadow-md
                         transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 
                         hover:scale-[1.02] active:scale-[0.98] transform-gpu ${animationClass}
                         relative overflow-hidden group`}
              onMouseDown={handleClick}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/25 to-blue-400/0 
                             translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              <Plus size={18} className="transition-transform group-hover:rotate-90 duration-300" />
              <span className="relative">Add Trip</span>
            </button>
          </div>

          {showAddTrip && (
            <form onSubmit={handleAddTrip} className="relative">
              <input
                type="text"
                autoFocus
                value={newTrip}
                onChange={(e) => setNewTrip(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTrip(e);
                  }
                  if (e.key === 'Escape') {
                    setShowAddTrip(false);
                  }
                }}
                placeholder="Enter destination"
                className="w-full px-3 py-2 pr-20 bg-gray-700/50 border border-gray-600 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all
                         placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={(e) => handleAddTrip(e)}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5
                         bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium
                         rounded-md hover:opacity-90 transition-all duration-300
                         hover:shadow-lg hover:shadow-blue-500/20"
              >
                Add
              </button>
            </form>
          )}
          
          <div className="h-[calc(100%-6rem)] overflow-y-auto custom-scrollbar pr-2">
            <ul className="space-y-2">
              {month.trips.map((trip) => (
                <li
                  key={trip.id}
                  className="flex items-center justify-between bg-gray-700/30 px-3 py-2 rounded-lg border border-gray-600/50 group hover:border-blue-500/30 transition-all duration-300"
                >
                  <span className="truncate mr-2">{trip.destination}</span>
                  <button
                    onClick={() => onRemoveTrip(trip.id)}
                    className="text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-700 mt-auto">
        <div className="flex items-center justify-between text-lg">
          <span className="font-semibold text-gray-300">Monthly Total:</span>
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">€{totalBudget}</span>
        </div>
      </div>
    </div>
  );
}