import React, { useState } from 'react';
import { Target, Trophy, Calendar, ArrowRight } from 'lucide-react';
import { AddHabitForm } from '../components/AddHabitForm';
import { HabitCard } from '../components/HabitCard';
import { HabitStats } from '../components/HabitStats';
import { HabitCalendar } from '../components/HabitCalendar';
import { WeeklyReview } from '../components/WeeklyReview';
import { HabitSlidingPanel } from '../components/HabitSlidingPanel';
import { useHabits } from '../hooks/useHabits';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { DashboardLayout } from '../components/DashboardLayout';
import { ErrorMessage } from '../components/ErrorMessage';
import type { Habit } from '../types';
import { ChallengeDates } from '../components/ChallengeDates';

export function HabitsPage() {
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  const {
    habits,
    loading,
    error,
    handleAddHabit,
    handleUpdateHabit,
    handleDeleteHabit,
    refresh
  } = useHabits();

  const handleUpdateNotes = (habitId: string, date: string, noteContent: string) => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    const existingNotes = habit.notes || [];
    const noteIndex = existingNotes.findIndex(note => note.date === date);

    let updatedNotes;
    if (noteIndex >= 0) {
      updatedNotes = [
        ...existingNotes.slice(0, noteIndex),
        { date, content: noteContent },
        ...existingNotes.slice(noteIndex + 1)
      ];
    } else {
      updatedNotes = [...existingNotes, { date, content: noteContent }];
    }

    handleUpdateHabit(habitId, { notes: updatedNotes });
  };

  const handleToggleHabit = (id: string, date: string) => {
    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    const completedDates = new Set(habit.completedDates);
    if (completedDates.has(date)) {
      completedDates.delete(date);
    } else {
      completedDates.add(date);
    }

    handleUpdateHabit(id, {
      completedDates: Array.from(completedDates)
    });
    
    // Update the selected habit if it's the one being modified
    if (selectedHabit?.id === id) {
      setSelectedHabit(prev => prev ? {
        ...prev,
        completedDates: Array.from(completedDates)
      } : null);
    }
  };

  const handleHabitClick = (habit: Habit) => {
    setSelectedHabit(habit);
  };

  return (
    <DashboardLayout>
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Target size={40} className="text-blue-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 
                         bg-clip-text text-transparent gradient-animate">
              90 Day Challenge
            </h1>
          </div>
          <p className="text-xl text-gray-400 font-medium tracking-wide mb-8">
            Transform your life through consistent daily actions
          </p>
        </header>

        <ChallengeDates />

        {error ? (
          <ErrorMessage message={error.message} onRetry={refresh} />
        ) : loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <AddHabitForm onAdd={handleAddHabit} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {habits.map(habit => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onToggle={handleToggleHabit}
                  onClick={() => handleHabitClick(habit)}
                  onUpdateNotes={handleUpdateNotes}
                  onDelete={handleDeleteHabit}
                />
              ))}
            </div>
            <div className="h-8"></div>
            
            {habits.length > 0 && habits[0].notes?.length > 0 && (
              <NotesHistory notes={habits[0].notes} />
            )}
            
            <HabitCalendar habits={habits} />
            <div className="h-8"></div>
            
            <WeeklyReview habits={habits} />
            <div className="h-8"></div>
            
            <div className="h-8"></div>
            <HabitStats habits={habits} />
            
            <HabitSlidingPanel
              habit={selectedHabit}
              isOpen={selectedHabit !== null}
              onClose={() => setSelectedHabit(null)}
              onToggleDate={handleToggleHabit}
              onUpdateNotes={handleUpdateNotes}
            />
          </>
        )}
    </DashboardLayout>
  );
}