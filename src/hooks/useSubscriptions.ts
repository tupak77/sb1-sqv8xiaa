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
      await addSubscription(subscription);
      await fetchSubscriptions();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add subscription'));
    }
  };

  const handleUpdateSubscription = async (id: string, updates: Partial<Subscription>) => {
    try {
      await updateSubscription(id, updates);
      await fetchSubscriptions();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update subscription'));
    }
  };

  const handleDeleteSubscription = async (id: string) => {
    try {
      await deleteSubscription(id);
      await fetchSubscriptions();
    } catch (err) {
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