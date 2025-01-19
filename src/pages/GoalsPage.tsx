import React from 'react';
import { Target } from 'lucide-react';
import { AddGoalForm } from '../components/AddGoalForm';
import { GoalCard } from '../components/GoalCard';
import { useGoals } from '../hooks/useGoals';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { DashboardLayout } from '../components/DashboardLayout';
import { ErrorMessage } from '../components/ErrorMessage';
import { Particles } from '../components/ui/particles';

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
      <div className="relative">
        <Particles
          className="absolute inset-0 -z-10"
          quantity={100}
          ease={80}
          color="#3b82f6"
          refresh={false}
        />
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
            
            <div className="grid grid-cols-1 gap-4">
              {goals
                .sort((a, b) => {
                  // Sort by completion status first
                  if (a.completed !== b.completed) {
                    return a.completed ? 1 : -1;
                  }
                  // Then by priority
                  const priorityOrder = { high: 0, medium: 1, low: 2 };
                  return priorityOrder[a.priority] - priorityOrder[b.priority];
                })
                .map(goal => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    onUpdate={handleUpdateGoal}
                    onDelete={handleDeleteGoal}
                  />
                ))
              }
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}