import { useState, useEffect, useCallback } from 'react';
import type { Goal, PriorityLevel } from '../types';
import { getGoals, addGoal, updateGoal, deleteGoal } from '../lib/api/goals';

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchGoals = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getGoals();
      setGoals(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch goals'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const handleAddGoal = async (title: string, priority: PriorityLevel) => {
    try {
      // Create temporary ID for optimistic update
      const tempId = crypto.randomUUID();
      const tempGoal = { id: tempId, title, priority, completed: false };
      
      // Optimistic update
      setGoals(prevGoals => [...prevGoals, tempGoal]);

      await addGoal(title, priority);
      // Fetch to get the real ID and any server-side changes
      await fetchGoals();
    } catch (err) {
      // Revert on error
      await fetchGoals();
      setError(err instanceof Error ? err : new Error('Failed to add goal'));
    }
  };

  const handleUpdateGoal = async (id: string, updates: Partial<Goal>) => {
    try {
      // Optimistic update
      setGoals(prevGoals =>
        prevGoals.map(goal =>
          goal.id === id
            ? { ...goal, ...updates }
            : goal
        )
      );

      await updateGoal(id, updates);
    } catch (err) {
      // Revert on error
      await fetchGoals();
      setError(err instanceof Error ? err : new Error('Failed to update goal'));
    }
  };

  const handleDeleteGoal = async (id: string) => {
    try {
      // Optimistic update
      setGoals(prevGoals => prevGoals.filter(goal => goal.id !== id));

      await deleteGoal(id);
    } catch (err) {
      // Revert on error
      await fetchGoals();
      setError(err instanceof Error ? err : new Error('Failed to delete goal'));
    }
  };

  return {
    goals,
    loading,
    error,
    handleAddGoal,
    handleUpdateGoal,
    handleDeleteGoal,
    refresh: fetchGoals
  };
}