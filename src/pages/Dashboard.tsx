import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { MonthsGrid } from '../components/MonthsGrid';
import { SummaryCards } from '../components/SummaryCards';
import { useMonthsData } from '../hooks/useMonthsData';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { sortMonths } from '../utils/months';
import { Particles } from '../components/ui/particles';

export function Dashboard() {
  const { months, loading, error, handleUpdateMonth, handleRemoveTrip, refresh } = useMonthsData();


  return (

    <DashboardLayout>
        {error ? (
          <ErrorMessage message={error.message} onRetry={refresh} />
        ) : loading ? (
          <LoadingSpinner />
        ) : (
          <div className="relative">
            <Particles
              className="absolute inset-0 -z-10"
              quantity={100}
              ease={80}
              color="#3b82f6"
              refresh={false}
            />
            <header className="text-center mb-12">
              <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 
                           bg-clip-text text-transparent mb-4 gradient-animate title-glow transition-all 
                           duration-300 tracking-tight">
                PRIME 2025
              </h1>
              <p className="text-2xl text-gray-400 font-medium tracking-wide">
                WHY NOT YOU
              </p>
            </header>

            <SummaryCards months={months} />
            <MonthsGrid 
              months={sortMonths(months)} 
              onUpdateMonth={handleUpdateMonth}
              onRemoveTrip={handleRemoveTrip}
            />
          </div>
        )}
    </DashboardLayout>
  );
}