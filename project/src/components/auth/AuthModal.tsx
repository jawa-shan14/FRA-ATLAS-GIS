import React, { useState } from 'react';
import { X, Phone, User as UserIcon } from 'lucide-react';
import { User, UserRole, LoginCredentials } from '../../types/auth';
import { useToast } from '../ui/Toast';

interface AuthModalProps {
  role: UserRole;
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export function AuthModal({ role, onClose, onSuccess }: AuthModalProps) {
  const [credentials, setCredentials] = useState<LoginCredentials>({});
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  // Demo users
  const demoUsers = {
    farmer: {
      id: 'farmer-1',
      name: 'Ramesh Kumar',
      phone: '+91-9876543210',
      role: 'farmer' as UserRole,
      village: 'Khammam',
      district: 'Khammam',
      state: 'Telangana'
    },
    guard: {
      id: 'guard-1',
      name: 'Forest Officer Sharma',
      email: 'guard@forestdept.gov.in',
      role: 'guard' as UserRole,
      village: 'Forest Division Office',
      district: 'Khammam',
      state: 'Telangana'
    },
    admin: {
      id: 'admin-1',
      name: 'District Collector',
      email: 'admin@district.gov.in',
      role: 'admin' as UserRole,
      village: 'Collectorate',
      district: 'Khammam',
      state: 'Telangana'
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    
    if (role === 'farmer') {
      if (step === 'login') {
        // Simulate OTP sending
        setTimeout(() => {
          setStep('otp');
          setLoading(false);
          showToast('OTP sent to your mobile number', 'success');
        }, 1000);
      } else {
        // Verify OTP (demo: any 4 digits work)
        if (credentials.otp && credentials.otp.length === 4) {
          setTimeout(() => {
            onSuccess(demoUsers.farmer);
            setLoading(false);
            showToast('Login successful!', 'success');
          }, 1000);
        } else {
          setLoading(false);
          showToast('Please enter a valid 4-digit OTP', 'error');
        }
      }
    } else {
      // Guard/Admin login with credentials
      const isValidLogin = (
        (role === 'guard' && credentials.username === 'guard' && credentials.password === 'guard123') ||
        (role === 'admin' && credentials.username === 'admin' && credentials.password === 'admin123')
      );

      setTimeout(() => {
        if (isValidLogin) {
          onSuccess(demoUsers[role]);
          showToast('Login successful!', 'success');
        } else {
          showToast('Invalid username or password', 'error');
        }
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {role === 'farmer' ? 'Farmer' : role === 'guard' ? 'Forest Guard' : 'Admin'} Login
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {role === 'farmer' ? (
            step === 'login' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      value={credentials.phone || ''}
                      onChange={(e) => setCredentials({ ...credentials, phone: e.target.value })}
                      placeholder="+91-9876543210"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Demo: Use +91-9876543210</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={credentials.otp || ''}
                    onChange={(e) => setCredentials({ ...credentials, otp: e.target.value })}
                    placeholder="1234"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-center text-2xl tracking-widest"
                  />
                  <p className="text-xs text-gray-500 mt-1">Demo: Enter any 4 digits</p>
                </div>
              </>
            )
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={credentials.username || ''}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    placeholder={role === 'guard' ? 'guard' : 'admin'}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={credentials.password || ''}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder={role === 'guard' ? 'guard123' : 'admin123'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <p className="text-xs text-gray-500">
                Demo credentials: {role === 'guard' ? 'guard/guard123' : 'admin/admin123'}
              </p>
            </>
          )}
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              {role === 'farmer' && step === 'login' ? 'Sending OTP...' : 'Verifying...'}
            </>
          ) : (
            role === 'farmer' && step === 'login' ? 'Send OTP' : 'Login'
          )}
        </button>

        {role === 'farmer' && step === 'otp' && (
          <button
            onClick={() => setStep('login')}
            className="w-full mt-3 text-emerald-600 hover:text-emerald-700 font-medium"
          >
            ← Back to phone number
          </button>
        )}
      </div>
    </div>
  );
}