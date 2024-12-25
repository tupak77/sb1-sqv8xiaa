import React from 'react';
import { Calculator, TrendingUp, Map } from 'lucide-react';
import type { MonthData } from '../types';

interface SummaryCardsProps {
  months: MonthData[];
}

export function SummaryCards({ months }: SummaryCardsProps) {
  const BASE_BUDGET = 2250;
  const MULTIPLIER = 25;

  const calculateTotals = () => {
    return months.reduce((acc, month) => {
      const additionalValue = (month.clubValue || 0) + (month.templateValue || 0);
      const monthlyTotal = BASE_BUDGET + (additionalValue * MULTIPLIER);
      const tripsCount = month.trips.length;
      
      return {
        annualTotal: acc.annualTotal + monthlyTotal,
        tripsCount: acc.tripsCount + tripsCount,
      };
    }, { annualTotal: 0, tripsCount: 0 });
  };

  const { annualTotal, tripsCount } = calculateTotals();
  const monthlyAverage = annualTotal / 12;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 card-shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Calculator className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-300">Annual Total</h3>
        </div>
        <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          €{annualTotal.toLocaleString()}
        </p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 card-shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-300">Monthly Average</h3>
        </div>
        <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          €{monthlyAverage.toLocaleString()}
        </p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 card-shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-emerald-500/20 rounded-lg">
            <Map className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-300">Total Trips</h3>
        </div>
        <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
          {tripsCount}
        </p>
      </div>
    </div>
  );
}