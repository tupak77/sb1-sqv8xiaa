import { useState, useEffect } from 'react';
import { getOrCreateChallenge, updateChallenge, getTasks, toggleTask, initializeTasks } from '../lib/api/saasChallenge';
import type { SaasChallenge, SaasTask } from '../lib/api/saasChallenge';

export function useSaasChallenge() {
  const [challenge, setChallenge] = useState<SaasChallenge | null>(null);
  const [tasks, setTasks] = useState<SaasTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function initialize() {
      try {
        setLoading(true);
        const challengeData = await getOrCreateChallenge();
        setChallenge(challengeData);

        const tasksData = await getTasks(challengeData.id);
        if (tasksData.length === 0) {
          await initializeTasks(challengeData.id);
          const newTasks = await getTasks(challengeData.id);
          setTasks(newTasks);
        } else {
          setTasks(tasksData);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize challenge'));
      } finally {
        setLoading(false);
      }
    }

    initialize();
  }, []);

  const handleUpdateChallenge = async (updates: Partial<SaasChallenge>) => {
    if (!challenge) return;

    try {
      await updateChallenge(challenge.id, updates);
      setChallenge(prev => prev ? { ...prev, ...updates } : null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update challenge'));
    }
  };

  const handleToggleTask = async (taskId: string, completed: boolean) => {
    try {
      await toggleTask(taskId, completed);
      setTasks(prev => 
        prev.map(task => 
          task.id === taskId ? { ...task, completed } : task
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to toggle task'));
    }
  };

  return {
    challenge,
    tasks,
    loading,
    error,
    updateChallenge: handleUpdateChallenge,
    toggleTask: handleToggleTask
  };
}