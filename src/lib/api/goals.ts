import { supabase } from '../supabase';
import type { Goal, PriorityLevel } from '../../types';

export async function getGoals(): Promise<Goal[]> {
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function addGoal(title: string, priority: PriorityLevel): Promise<Goal> {
  const { data, error } = await supabase
    .from('goals')
    .insert([{ title, priority }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateGoal(id: string, updates: Partial<Goal>) {
  const { error } = await supabase
    .from('goals')
    .update(updates)
    .eq('id', id);

  if (error) throw error;
}

export async function deleteGoal(id: string) {
  const { error } = await supabase
    .from('goals')
    .delete()
    .eq('id', id);

  if (error) throw error;
}