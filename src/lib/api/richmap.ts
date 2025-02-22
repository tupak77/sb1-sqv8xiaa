import { supabase } from '../supabase';

// Income Sources
export async function getIncomeSources() {
  const { data, error } = await supabase
    .from('richmap_income_sources')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function addIncomeSource(source: { name: string; amount: number; is_recurring: boolean }) {
  const { data, error } = await supabase
    .from('richmap_income_sources')
    .insert([source])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateIncomeSource(id: string, updates: Partial<{ name: string; amount: number; is_recurring: boolean }>) {
  const { error } = await supabase
    .from('richmap_income_sources')
    .update(updates)
    .eq('id', id);

  if (error) throw error;
}

export async function deleteIncomeSource(id: string) {
  const { error } = await supabase
    .from('richmap_income_sources')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Expenses
export async function getExpenses() {
  const { data, error } = await supabase
    .from('richmap_expenses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function addExpense(expense: {
  category: string;
  name: string;
  amount: number;
  due_date?: string;
  is_fixed: boolean;
  budget_limit?: number;
}) {
  const { data, error } = await supabase
    .from('richmap_expenses')
    .insert([expense])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateExpense(id: string, updates: Partial<{
  category: string;
  name: string;
  amount: number;
  due_date: string;
  is_fixed: boolean;
  budget_limit: number;
}>) {
  const { error } = await supabase
    .from('richmap_expenses')
    .update(updates)
    .eq('id', id);

  if (error) throw error;
}

export async function deleteExpense(id: string) {
  const { error } = await supabase
    .from('richmap_expenses')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Investments
export async function getInvestments() {
  const { data, error } = await supabase
    .from('richmap_investments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function addInvestment(investment: {
  type: string;
  name: string;
  amount: number;
  returns: number;
}) {
  const { data, error } = await supabase
    .from('richmap_investments')
    .insert([investment])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateInvestment(id: string, updates: Partial<{
  type: string;
  name: string;
  amount: number;
  returns: number;
}>) {
  const { error } = await supabase
    .from('richmap_investments')
    .update(updates)
    .eq('id', id);

  if (error) throw error;
}

export async function deleteInvestment(id: string) {
  const { error } = await supabase
    .from('richmap_investments')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Savings Goals
export async function getSavingsGoals() {
  const { data, error } = await supabase
    .from('richmap_savings_goals')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function addSavingsGoal(goal: {
  name: string;
  target: number;
  current: number;
}) {
  const { data, error } = await supabase
    .from('richmap_savings_goals')
    .insert([goal])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSavingsGoal(id: string, updates: Partial<{
  name: string;
  target: number;
  current: number;
}>) {
  const { error } = await supabase
    .from('richmap_savings_goals')
    .update(updates)
    .eq('id', id);

  if (error) throw error;
}

export async function deleteSavingsGoal(id: string) {
  const { error } = await supabase
    .from('richmap_savings_goals')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Scenarios
export async function getScenarios() {
  const { data, error } = await supabase
    .from('richmap_scenarios')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function addScenario(scenario: {
  name: string;
  income: number;
  expenses: number;
  savings: number;
  investments: number;
}) {
  const { data, error } = await supabase
    .from('richmap_scenarios')
    .insert([scenario])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateScenario(id: string, updates: Partial<{
  name: string;
  income: number;
  expenses: number;
  savings: number;
  investments: number;
}>) {
  const { error } = await supabase
    .from('richmap_scenarios')
    .update(updates)
    .eq('id', id);

  if (error) throw error;
}

export async function deleteScenario(id: string) {
  const { error } = await supabase
    .from('richmap_scenarios')
    .delete()
    .eq('id', id);

  if (error) throw error;
}