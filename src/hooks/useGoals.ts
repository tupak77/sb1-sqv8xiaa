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
      await addGoal(title, priority);
      await fetchGoals();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add goal'));
    }
  };

  const handleUpdateGoal = async (id: string, updates: Partial<Goal>) => {
    try {
      await updateGoal(id, updates);
      await fetchGoals();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update goal'));
    }
  };

  const handleDeleteGoal = async (id: string) => {
    try {
      await deleteGoal(id);
      await fetchGoals();
    } catch (err) {
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