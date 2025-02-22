import { useState, useEffect, useCallback } from 'react';
import {
  getIncomeSources,
  addIncomeSource,
  updateIncomeSource,
  deleteIncomeSource,
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  getInvestments,
  addInvestment,
  updateInvestment,
  deleteInvestment,
  getSavingsGoals,
  addSavingsGoal,
  updateSavingsGoal,
  deleteSavingsGoal,
  getScenarios,
  addScenario,
  updateScenario,
  deleteScenario
} from '../lib/api/richmap';

export function useRichMap() {
  const [incomeSources, setIncomeSources] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [
        incomeData,
        expensesData,
        investmentsData,
        savingsData,
        scenariosData
      ] = await Promise.all([
        getIncomeSources(),
        getExpenses(),
        getInvestments(),
        getSavingsGoals(),
        getScenarios()
      ]);

      setIncomeSources(incomeData);
      setExpenses(expensesData);
      setInvestments(investmentsData);
      setSavingsGoals(savingsData);
      setScenarios(scenariosData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch data'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Income Sources
  const handleAddIncomeSource = async (source: { name: string; amount: number; is_recurring: boolean }) => {
    try {
      const newSource = await addIncomeSource(source);
      setIncomeSources(prev => [...prev, newSource]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add income source'));
    }
  };

  const handleUpdateIncomeSource = async (id: string, updates: Partial<{ name: string; amount: number; is_recurring: boolean }>) => {
    try {
      await updateIncomeSource(id, updates);
      setIncomeSources(prev =>
        prev.map(source =>
          source.id === id ? { ...source, ...updates } : source
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update income source'));
    }
  };

  const handleDeleteIncomeSource = async (id: string) => {
    try {
      await deleteIncomeSource(id);
      setIncomeSources(prev => prev.filter(source => source.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete income source'));
    }
  };

  // Expenses
  const handleAddExpense = async (expense: {
    category: string;
    name: string;
    amount: number;
    due_date?: string;
    is_fixed: boolean;
    budget_limit?: number;
  }) => {
    try {
      const newExpense = await addExpense(expense);
      setExpenses(prev => [...prev, newExpense]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add expense'));
    }
  };

  const handleUpdateExpense = async (id: string, updates: Partial<{
    category: string;
    name: string;
    amount: number;
    due_date: string;
    is_fixed: boolean;
    budget_limit: number;
  }>) => {
    try {
      await updateExpense(id, updates);
      setExpenses(prev =>
        prev.map(expense =>
          expense.id === id ? { ...expense, ...updates } : expense
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update expense'));
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      await deleteExpense(id);
      setExpenses(prev => prev.filter(expense => expense.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete expense'));
    }
  };

  // Investments
  const handleAddInvestment = async (investment: {
    type: string;
    name: string;
    amount: number;
    returns: number;
  }) => {
    try {
      const newInvestment = await addInvestment(investment);
      setInvestments(prev => [...prev, newInvestment]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add investment'));
    }
  };

  const handleUpdateInvestment = async (id: string, updates: Partial<{
    type: string;
    name: string;
    amount: number;
    returns: number;
  }>) => {
    try {
      await updateInvestment(id, updates);
      setInvestments(prev =>
        prev.map(investment =>
          investment.id === id ? { ...investment, ...updates } : investment
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update investment'));
    }
  };

  const handleDeleteInvestment = async (id: string) => {
    try {
      await deleteInvestment(id);
      setInvestments(prev => prev.filter(investment => investment.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete investment'));
    }
  };

  // Savings Goals
  const handleAddSavingsGoal = async (goal: {
    name: string;
    target: number;
    current: number;
  }) => {
    try {
      const newGoal = await addSavingsGoal(goal);
      setSavingsGoals(prev => [...prev, newGoal]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add savings goal'));
    }
  };

  const handleUpdateSavingsGoal = async (id: string, updates: Partial<{
    name: string;
    target: number;
    current: number;
  }>) => {
    try {
      await updateSavingsGoal(id, updates);
      setSavingsGoals(prev =>
        prev.map(goal =>
          goal.id === id ? { ...goal, ...updates } : goal
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update savings goal'));
    }
  };

  const handleDeleteSavingsGoal = async (id: string) => {
    try {
      await deleteSavingsGoal(id);
      setSavingsGoals(prev => prev.filter(goal => goal.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete savings goal'));
    }
  };

  // Scenarios
  const handleAddScenario = async (scenario: {
    name: string;
    income: number;
    expenses: number;
    savings: number;
    investments: number;
  }) => {
    try {
      const newScenario = await addScenario(scenario);
      setScenarios(prev => [...prev, newScenario]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add scenario'));
    }
  };

  const handleUpdateScenario = async (id: string, updates: Partial<{
    name: string;
    income: number;
    expenses: number;
    savings: number;
    investments: number;
  }>) => {
    try {
      await updateScenario(id, updates);
      setScenarios(prev =>
        prev.map(scenario =>
          scenario.id === id ? { ...scenario, ...updates } : scenario
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update scenario'));
    }
  };

  const handleDeleteScenario = async (id: string) => {
    try {
      await deleteScenario(id);
      setScenarios(prev => prev.filter(scenario => scenario.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete scenario'));
    }
  };

  return {
    incomeSources,
    expenses,
    investments,
    savingsGoals,
    scenarios,
    loading,
    error,
    handleAddIncomeSource,
    handleUpdateIncomeSource,
    handleDeleteIncomeSource,
    handleAddExpense,
    handleUpdateExpense,
    handleDeleteExpense,
    handleAddInvestment,
    handleUpdateInvestment,
    handleDeleteInvestment,
    handleAddSavingsGoal,
    handleUpdateSavingsGoal,
    handleDeleteSavingsGoal,
    handleAddScenario,
    handleUpdateScenario,
    handleDeleteScenario,
    refresh: fetchData
  };
}