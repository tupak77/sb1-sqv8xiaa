import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LogOut, Target, Calendar, Receipt, Dumbbell } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const isCurrentPage = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen py-12 px-6 text-white">
      <div className="max-w-screen-xl mx-auto">
        <nav className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <Link
              to="/"
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300
                       ${isCurrentPage('/') 
                         ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 text-white' 
                         : 'bg-gray-800/50 text-gray-400 hover:text-white'}`}
            >
              <Calendar size={20} />
              <span>Budget</span>
            </Link>
            <Link
              to="/goals"
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300
                       ${location.pathname.includes('/goals')
                         ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 text-white' 
                         : 'bg-gray-800/50 text-gray-400 hover:text-white'}`}
            >
              <Target size={20} />
              <span>Goals</span>
            </Link>
            <Link
              to="/subscriptions"
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300
                       ${location.pathname.includes('/subscriptions')
                         ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 text-white' 
                         : 'bg-gray-800/50 text-gray-400 hover:text-white'}`}
            >
              <Receipt size={20} />
              <span>Subscriptions</span>
            </Link>
            <Link
              to="/habits"
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300
                       ${location.pathname.includes('/habits')
                         ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 text-white' 
                         : 'bg-gray-800/50 text-gray-400 hover:text-white'}`}
            >
              <Dumbbell size={20} />
              <span>Habits</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Welcome, {user?.email}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 
                       rounded-lg hover:bg-red-500/20 transition-colors"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </nav>

        {children}
      </div>
    </div>
  );
}