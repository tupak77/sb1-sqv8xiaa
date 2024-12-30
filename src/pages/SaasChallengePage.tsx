import React, { useEffect } from 'react';
import { Rocket, Target, Calendar, TrendingUp, CheckCircle2, Circle } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { ChallengeDates } from '../components/ChallengeDates';
import { SaasTaskList } from '../components/SaasTaskList';
import { SaasProgress } from '../components/SaasProgress';
import { SaasStats } from '../components/SaasStats';
import { useSaasChallenge } from '../hooks/useSaasChallenge';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

export function SaasChallengePage() {
  const {
    challenge,
    tasks,
    loading,
    error,
    updateChallenge,
    toggleTask
  } = useSaasChallenge();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!challenge) return null;

  return (
    <DashboardLayout>
      <header className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Rocket size={40} className="text-blue-400" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 
                       bg-clip-text text-transparent gradient-animate">
            90 Days to $15k MRR
          </h1>
        </div>
        <p className="text-xl text-gray-400 font-medium tracking-wide mb-4">
          Construye tu SaaS y cambia tu vida
        </p>
        <p className="max-w-2xl mx-auto text-gray-400">
          En los próximos 90 días, seguirás pasos claros y accionables para idear, construir, 
          lanzar y escalar un SaaS hasta alcanzar $15k MRR. No es solo un reto, es un plan probado.
        </p>
      </header>

      <ChallengeDates />
      <SaasProgress challenge={challenge} onUpdate={updateChallenge} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <SaasStats />
        <SaasTaskList tasks={tasks} onToggle={toggleTask} />
      </div>
    </DashboardLayout>
  );
}