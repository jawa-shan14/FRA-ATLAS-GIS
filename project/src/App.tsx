import React, { useState, useEffect } from 'react';
import { User, UserRole, AuthState } from './types/auth';
import { LandingPage } from './components/LandingPage';
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { GuardDashboard } from './components/guard/GuardDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AuthModal } from './components/auth/AuthModal';
import { Header } from './components/layout/Header';
import { ToastProvider } from './components/ui/Toast';

function App() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authRole, setAuthRole] = useState<UserRole | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('fra-user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({ isAuthenticated: true, user, loading: false });
      } catch (error) {
        localStorage.removeItem('fra-user');
        setAuthState({ isAuthenticated: false, user: null, loading: false });
      }
    } else {
      setAuthState({ isAuthenticated: false, user: null, loading: false });
    }
  }, []);

  const handleLogin = (role: UserRole) => {
    setAuthRole(role);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (user: User) => {
    setAuthState({ isAuthenticated: true, user, loading: false });
    localStorage.setItem('fra-user', JSON.stringify(user));
    setShowAuthModal(false);
    setAuthRole(null);
  };

  const handleLogout = () => {
    setAuthState({ isAuthenticated: false, user: null, loading: false });
    localStorage.removeItem('fra-user');
  };

  if (authState.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
        {authState.isAuthenticated && (
          <Header user={authState.user!} onLogout={handleLogout} />
        )}
        
        {!authState.isAuthenticated ? (
          <LandingPage onLogin={handleLogin} />
        ) : (
          <>
            {authState.user?.role === 'farmer' && <FarmerDashboard user={authState.user} />}
            {authState.user?.role === 'guard' && <GuardDashboard user={authState.user} />}
            {authState.user?.role === 'admin' && <AdminDashboard user={authState.user} />}
          </>
        )}

        {showAuthModal && (
          <AuthModal
            role={authRole!}
            onClose={() => {
              setShowAuthModal(false);
              setAuthRole(null);
            }}
            onSuccess={handleAuthSuccess}
          />
        )}
      </div>
    </ToastProvider>
  );
}

export default App;