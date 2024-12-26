import { supabase } from '../supabase';
import type { Habit } from '../../types';

export async function getHabits(): Promise<Habit[]> {
  const { data, error } = await supabase
    .from('habits')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function addHabit(habit: Omit<Habit, 'id'>): Promise<Habit> {
  const { data, error } = await supabase
    .from('habits')
    .insert([habit])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateHabit(id: string, updates: Partial<Habit>) {
  // If updating notes, ensure they're properly formatted
  if (updates.notes) {
    updates.notes = updates.notes.map(note => ({
      date: note.date,
      content: note.content
    }));
  }

  const { error } = await supabase
    .from('habits')
    .update(updates)
    .eq('id', id);

  if (error) throw error;
}

export async function deleteHabit(id: string) {
  const { error } = await supabase
    .from('habits')
    .delete()
    .eq('id', id);

  if (error) throw error;
}