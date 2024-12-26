import React from 'react';
import { Target } from 'lucide-react';
import { AddGoalForm } from '../components/AddGoalForm';
import { GoalCard } from '../components/GoalCard';
import { useGoals } from '../hooks/useGoals';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { DashboardLayout } from '../components/DashboardLayout';
import { ErrorMessage } from '../components/ErrorMessage';
import type { Goal, PriorityLevel } from '../types';

export function GoalsPage() {
  const {
    goals,
    loading,
    error,
    handleAddGoal,
    handleUpdateGoal,
    handleDeleteGoal,
    refresh
  } = useGoals();

  return (
    <DashboardLayout>
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Target size={40} className="text-blue-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 
                         bg-clip-text text-transparent gradient-animate">
              Goals
            </h1>
          </div>
          <p className="text-xl text-gray-400 font-medium tracking-wide">
            Track and achieve your objectives
          </p>
        </header>

        {error ? (
          <ErrorMessage message={error.message} onRetry={refresh} />
        ) : loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <AddGoalForm onAdd={handleAddGoal} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map(goal => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onUpdate={handleUpdateGoal}
                  onDelete={handleDeleteGoal}
                />
              ))}
            </div>
          </>
        )}
    </DashboardLayout>
  );
}