import { useState, useEffect, useCallback } from 'react';
import { MonthData, Trip } from '../types';
import { getMonths, updateMonth, addTrip, removeTrip, initializeMonths } from '../lib/api/months';

export function useMonthsData() {
  const [months, setMonths] = useState<MonthData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMonths = useCallback(async () => {
    try {
      setLoading(true);
      await initializeMonths();
      const data = await getMonths();
      setMonths(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch months'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMonths();
  }, [fetchMonths]);

  const handleUpdateMonth = async (name: string, data: Partial<MonthData>) => {
    try {
      // Optimistically update the UI
      setMonths(prevMonths =>
        prevMonths.map(month =>
          month.name === name
            ? { ...month, ...data }
            : month
        )
      );

      // If it's a trip update
      if (data.trips) {
        const lastTrip = data.trips[data.trips.length - 1];
        await addTrip(name, {
          destination: lastTrip.destination,
          dates: lastTrip.dates
        });
      } else {
        // For club/template value updates
        await updateMonth(name, data);
      }
    } catch (err) {
      console.error('Update failed:', err);
      // Revert on error
      await fetchMonths();
      setError(err instanceof Error ? err : new Error('Failed to update month'));
    }
  };

  const handleRemoveTrip = async (tripId: string) => {
    try {
      // Optimistically update UI
      setMonths(prevMonths =>
        prevMonths.map(month => ({
          ...month,
          trips: month.trips.filter(trip => trip.id !== tripId)
        }))
      );

      await removeTrip(tripId);
    } catch (err) {
      // Revert on error
      await fetchMonths();
      setError(err instanceof Error ? err : new Error('Failed to remove trip'));
    }
  };

  return {
    months,
    loading,
    error,
    handleUpdateMonth,
    handleRemoveTrip,
    refresh: fetchMonths
  };
}