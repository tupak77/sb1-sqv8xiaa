import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signIn(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
          <div className="relative px-8 py-12 bg-gray-800/90 backdrop-blur-xl ring-1 ring-gray-700/50 rounded-lg leading-none">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-blue-500/10 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <LogIn className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="mt-2 text-gray-400">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm animate-fade-in">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-blue-400 transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 focus:border-blue-500 rounded-lg
                             outline-none ring-0 focus:ring-2 ring-blue-500/20 text-white placeholder-gray-400
                             transition-all duration-300 peer"
                    placeholder="Email address"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-blue-400 transition-colors" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 focus:border-blue-500 rounded-lg
                             outline-none ring-0 focus:ring-2 ring-blue-500/20 text-white placeholder-gray-400
                             transition-all duration-300 peer"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link
                  to="/register"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  Create account
                </Link>
                <Link
                  to="/reset-password"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="relative w-full py-3 px-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500 
                         text-white font-medium rounded-lg shadow-lg shadow-blue-500/20
                         hover:shadow-xl hover:shadow-blue-500/30 focus:shadow-none
                         transform hover:scale-[1.02] focus:scale-[0.98] 
                         transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed
                         overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/25 to-blue-400/0 
                               translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      Sign in
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}