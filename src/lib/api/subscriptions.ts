import { supabase } from '../supabase';
import type { Subscription } from '../../types';

export async function getSubscriptions(): Promise<Subscription[]> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function addSubscription(subscription: Omit<Subscription, 'id'>): Promise<Subscription> {
  const { data, error } = await supabase
    .from('subscriptions')
    .insert([subscription])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSubscription(id: string, updates: Partial<Subscription>) {
  const { error } = await supabase
    .from('subscriptions')
    .update(updates)
    .eq('id', id);

  if (error) throw error;
}

export async function deleteSubscription(id: string) {
  const { error } = await supabase
    .from('subscriptions')
    .delete()
    .eq('id', id);

  if (error) throw error;
}