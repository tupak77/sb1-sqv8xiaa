import { useState, useEffect, useCallback } from 'react';
import type { Habit } from '../types';
import { getHabits, addHabit, updateHabit, deleteHabit } from '../lib/api/habits';

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchHabits = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getHabits();
      setHabits(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch habits'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const handleAddHabit = async (habit: Omit<Habit, 'id'>) => {
    try {
      // Create temporary ID for optimistic update
      const tempId = crypto.randomUUID();
      const tempHabit = { ...habit, id: tempId };
      
      // Optimistic update
      setHabits(prevHabits => [...prevHabits, tempHabit]);

      await addHabit(habit);
      // Fetch to get the real ID and any server-side changes
      await fetchHabits();
    } catch (err) {
      // Revert on error
      await fetchHabits();
      setError(err instanceof Error ? err : new Error('Failed to add habit'));
    }
  };

  const handleUpdateHabit = async (id: string, updates: Partial<Habit>) => {
    try {
      // Optimistic update
      setHabits(prevHabits =>
        prevHabits.map(habit =>
          habit.id === id
            ? { ...habit, ...updates }
            : habit
        )
      );

      await updateHabit(id, updates);
    } catch (err) {
      // Revert on error
      await fetchHabits();
      setError(err instanceof Error ? err : new Error('Failed to update habit'));
    }
  };

  const handleDeleteHabit = async (id: string) => {
    try {
      // Optimistic update
      setHabits(prevHabits => prevHabits.filter(habit => habit.id !== id));

      await deleteHabit(id);
    } catch (err) {
      // Revert on error
      await fetchHabits();
      setError(err instanceof Error ? err : new Error('Failed to delete habit'));
    }
  };

  return {
    habits,
    loading,
    error,
    handleAddHabit,
    handleUpdateHabit,
    handleDeleteHabit,
    refresh: fetchHabits
  };
}