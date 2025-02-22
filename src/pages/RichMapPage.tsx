import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Wallet, TrendingUp, Landmark, Receipt, PiggyBank, LineChart, Target } from 'lucide-react';
import { Particles } from '../components/ui/particles';
import { IncomeSection } from '../components/richmap/IncomeSection';
import { ExpensesSection } from '../components/richmap/ExpensesSection';
import { InvestmentsSection } from '../components/richmap/InvestmentsSection';
import { CashFlowSection } from '../components/richmap/CashFlowSection';
import { FuturePlanningSection } from '../components/richmap/FuturePlanningSection';

export function RichMapPage() {
  return (
    <DashboardLayout>
      <div className="relative">
        <Particles
          className="absolute inset-0 -z-10"
          quantity={100}
          ease={80}
          color="#3b82f6"
          refresh={false}
        />
        
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Wallet size={40} className="text-blue-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 
                         bg-clip-text text-transparent gradient-animate">
              RichMap
            </h1>
          </div>
          <p className="text-xl text-gray-400 font-medium tracking-wide">
            Your personal wealth building dashboard
          </p>
        </header>

        <div className="space-y-8">
          <IncomeSection />
          <ExpensesSection />
          <InvestmentsSection />
          <CashFlowSection />
          <FuturePlanningSection />
        </div>
      </div>
    </DashboardLayout>
  );
}