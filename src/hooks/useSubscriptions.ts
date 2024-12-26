import { useState, useEffect, useCallback } from 'react';
import type { Subscription } from '../types';
import { getSubscriptions, addSubscription, updateSubscription, deleteSubscription } from '../lib/api/subscriptions';

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSubscriptions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getSubscriptions();
      setSubscriptions(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch subscriptions'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const handleAddSubscription = async (subscription: Omit<Subscription, 'id'>) => {
    try {
      // Create temporary ID for optimistic update
      const tempId = crypto.randomUUID();
      const tempSubscription = { ...subscription, id: tempId };
      
      // Optimistic update
      setSubscriptions(prevSubscriptions => [...prevSubscriptions, tempSubscription]);

      await addSubscription(subscription);
      // Fetch to get the real ID and any server-side changes
      await fetchSubscriptions();
    } catch (err) {
      // Revert on error
      await fetchSubscriptions();
      setError(err instanceof Error ? err : new Error('Failed to add subscription'));
    }
  };

  const handleUpdateSubscription = async (id: string, updates: Partial<Subscription>) => {
    try {
      // Optimistic update
      setSubscriptions(prevSubscriptions =>
        prevSubscriptions.map(subscription =>
          subscription.id === id
            ? { ...subscription, ...updates }
            : subscription
        )
      );

      await updateSubscription(id, updates);
    } catch (err) {
      // Revert on error
      await fetchSubscriptions();
      setError(err instanceof Error ? err : new Error('Failed to update subscription'));
    }
  };

  const handleDeleteSubscription = async (id: string) => {
    try {
      // Optimistic update
      setSubscriptions(prevSubscriptions => 
        prevSubscriptions.filter(subscription => subscription.id !== id));

      await deleteSubscription(id);
    } catch (err) {
      // Revert on error
      await fetchSubscriptions();
      setError(err instanceof Error ? err : new Error('Failed to delete subscription'));
    }
  };

  return {
    subscriptions,
    loading,
    error,
    handleAddSubscription,
    handleUpdateSubscription,
    handleDeleteSubscription,
    refresh: fetchSubscriptions
  };
}