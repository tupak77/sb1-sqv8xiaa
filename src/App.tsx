import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { GoalsPage } from './pages/GoalsPage';
import { SubscriptionsPage } from './pages/SubscriptionsPage';
import { HabitsPage } from './pages/HabitsPage';
import { RamadanPage } from './pages/RamadanPage';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/goals" element={
            <ProtectedRoute>
              <GoalsPage />
            </ProtectedRoute>
          } />
          <Route path="/subscriptions" element={
            <ProtectedRoute>
              <SubscriptionsPage />
            </ProtectedRoute>
          } />
          <Route path="/habits" element={
            <ProtectedRoute>
              <HabitsPage />
            </ProtectedRoute>
          } />
          <Route path="/ramadan" element={
            <ProtectedRoute>
              <RamadanPage />
            </ProtectedRoute>
          } />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;