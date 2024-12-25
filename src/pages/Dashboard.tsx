import React from 'react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Target, Calendar, Receipt } from 'lucide-react';
import { MonthsGrid } from '../components/MonthsGrid';
import { SummaryCards } from '../components/SummaryCards';
import { GoalsPage } from './GoalsPage';
import { SubscriptionsPage } from './SubscriptionsPage';
import { useMonthsData } from '../hooks/useMonthsData';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { sortMonths } from '../utils/months';

export function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { months, loading, error, handleUpdateMonth, handleRemoveTrip, refresh } = useMonthsData();
  const [currentPage, setCurrentPage] = useState<'budget' | 'goals' | 'subscriptions'>('budget');

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <div className="min-h-screen py-12 px-6 text-white">
      <div className="max-w-screen-xl mx-auto">
        <nav className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentPage('budget')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300
                       ${currentPage === 'budget' 
                         ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 text-white' 
                         : 'bg-gray-800/50 text-gray-400 hover:text-white'}`}
            >
              <Calendar size={20} />
              <span>Budget</span>
            </button>
            <button
              onClick={() => setCurrentPage('goals')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300
                       ${currentPage === 'goals' 
                         ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 text-white' 
                         : 'bg-gray-800/50 text-gray-400 hover:text-white'}`}
            >
              <Target size={20} />
              <span>Goals</span>
            </button>
            <button
              onClick={() => setCurrentPage('subscriptions')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300
                       ${currentPage === 'subscriptions' 
                         ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 text-white' 
                         : 'bg-gray-800/50 text-gray-400 hover:text-white'}`}
            >
              <Receipt size={20} />
              <span>Subscriptions</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Welcome, {user?.email}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 
                       rounded-lg hover:bg-red-500/20 transition-colors"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </nav>

        {error ? (
          <ErrorMessage message={error.message} onRetry={refresh} />
        ) : loading ? (
          <LoadingSpinner />
        ) : currentPage === 'budget' ? (
          <>
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
          </>
        ) : currentPage === 'goals' ? (
          <GoalsPage />
        ) : (
          <SubscriptionsPage />
        )}
      </div>
    </div>
  );
}