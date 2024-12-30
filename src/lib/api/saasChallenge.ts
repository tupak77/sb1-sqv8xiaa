import { supabase } from '../supabase';

export interface SaasChallenge {
  id: string;
  startDate: Date;
  currentMrr: number;
  activeUsers: number;
  conversionRate: number;
  churnRate: number;
}

export interface SaasTask {
  id: string;
  challengeId: string;
  day: number;
  title: string;
  completed: boolean;
}

export async function getOrCreateChallenge(): Promise<SaasChallenge> {
  // Try to get existing challenge
  const { data: challenges } = await supabase
    .from('saas_challenges')
    .select('*')
    .limit(1);

  if (challenges && challenges.length > 0) {
    return {
      id: challenges[0].id,
      startDate: new Date(challenges[0].start_date),
      currentMrr: challenges[0].current_mrr,
      activeUsers: challenges[0].active_users,
      conversionRate: challenges[0].conversion_rate,
      churnRate: challenges[0].churn_rate
    };
  }

  // Create new challenge if none exists
  const { data: newChallenge, error } = await supabase
    .from('saas_challenges')
    .insert([{
      start_date: new Date().toISOString(),
      current_mrr: 0,
      active_users: 0,
      conversion_rate: 0,
      churn_rate: 0
    }])
    .select()
    .single();

  if (error) throw error;

  return {
    id: newChallenge.id,
    startDate: new Date(newChallenge.start_date),
    currentMrr: newChallenge.current_mrr,
    activeUsers: newChallenge.active_users,
    conversionRate: newChallenge.conversion_rate,
    churnRate: newChallenge.churn_rate
  };
}

export async function updateChallenge(id: string, updates: Partial<SaasChallenge>) {
  const { error } = await supabase
    .from('saas_challenges')
    .update({
      current_mrr: updates.currentMrr,
      active_users: updates.activeUsers,
      conversion_rate: updates.conversionRate,
      churn_rate: updates.churnRate
    })
    .eq('id', id);

  if (error) throw error;
}

export async function getTasks(challengeId: string): Promise<SaasTask[]> {
  const { data, error } = await supabase
    .from('saas_tasks')
    .select('*')
    .eq('challenge_id', challengeId)
    .order('day', { ascending: true });

  if (error) throw error;
  return data;
}

export async function toggleTask(id: string, completed: boolean) {
  const { error } = await supabase
    .from('saas_tasks')
    .update({ completed })
    .eq('id', id);

  if (error) throw error;
}

export async function initializeTasks(challengeId: string) {
  const defaultTasks = [
    { day: 1, title: 'Define 3 posibles ideas de SaaS' },
    { day: 2, title: 'Investigar competencia para cada idea' },
    { day: 3, title: 'Seleccionar la idea final' },
    { day: 4, title: 'Crear user personas' },
    { day: 5, title: 'Diseñar customer journey' },
    { day: 6, title: 'Definir MVP features' },
    { day: 7, title: 'Crear wireframes básicos' },
    { day: 8, title: 'Setup inicial del proyecto' },
    { day: 9, title: 'Implementar auth y DB' },
    { day: 10, title: 'Crear landing page' }
  ];

  const { error } = await supabase
    .from('saas_tasks')
    .insert(defaultTasks.map(task => ({
      ...task,
      challenge_id: challengeId
    })));

  if (error) throw error;
}