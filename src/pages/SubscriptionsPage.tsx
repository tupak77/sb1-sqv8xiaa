import React from 'react';
import { Receipt, CreditCard } from 'lucide-react';
import { AddSubscriptionForm } from '../components/AddSubscriptionForm';
import { SubscriptionCard } from '../components/SubscriptionCard';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { DashboardLayout } from '../components/DashboardLayout';
import { ErrorMessage } from '../components/ErrorMessage';
import type { Subscription } from '../types';

export function SubscriptionsPage() {
  const {
    subscriptions,
    loading,
    error,
    handleAddSubscription,
    handleUpdateSubscription,
    handleDeleteSubscription,
    refresh
  } = useSubscriptions();

  const totalMonthly = subscriptions
    .filter(sub => sub.active)
    .reduce((total, sub) => total + sub.amount, 0);

  const totalYearly = totalMonthly * 12;

  return (
    <DashboardLayout>
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Receipt size={40} className="text-blue-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 
                         bg-clip-text text-transparent gradient-animate">
              Subscriptions
            </h1>
          </div>
          <p className="text-xl text-gray-400 font-medium tracking-wide">
            Track your monthly expenses
          </p>
        </header>

        {error ? (
          <ErrorMessage message={error.message} onRetry={refresh} />
        ) : loading ? (
          <LoadingSpinner />
        ) : (
          <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 
                       hover:border-blue-500/30 transition-all duration-300 card-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <CreditCard className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-300">Monthly Total</h3>
            </div>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                       from-blue-400 to-purple-500">
              €{totalMonthly.toFixed(2)}
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 
                       hover:border-blue-500/30 transition-all duration-300 card-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Receipt className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-300">Yearly Total</h3>
            </div>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                       from-purple-400 to-pink-500">
              €{totalYearly.toFixed(2)}
            </p>
          </div>
        </div>

        <AddSubscriptionForm onAdd={handleAddSubscription} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions.map(subscription => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              onUpdate={handleUpdateSubscription}
              onDelete={handleDeleteSubscription}
            />
          ))}
        </div>
          </>
        )}
    </DashboardLayout>
  );
}