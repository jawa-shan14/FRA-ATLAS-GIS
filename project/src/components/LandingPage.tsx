import React from 'react';
import { Trees, Shield, Users, MapPin, FileCheck, Camera } from 'lucide-react';
import { UserRole } from '../types/auth';

interface LandingPageProps {
  onLogin: (role: UserRole) => void;
}

export function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-emerald-600 rounded-full p-4">
              <Trees className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            FRA Atlas Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Empowering forest communities through digital rights management. 
            Submit claims, track progress, and protect forest heritage with transparency and efficiency.
          </p>
          
          {/* Login Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <button
              onClick={() => onLogin('farmer')}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-3"
            >
              <Users className="h-5 w-5" />
              Farmer Login
            </button>
            <button
              onClick={() => onLogin('guard')}
              className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-3"
            >
              <Shield className="h-5 w-5" />
              Forest Guard Login
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <FileCheck className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Digital Claims</h3>
            <p className="text-gray-600">
              Submit IFR and Community Rights claims digitally with GPS coordinates and document uploads.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">GPS Mapping</h3>
            <p className="text-gray-600">
              Interactive maps with precise location tracking for all forest rights and plantation activities.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Camera className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Progress Tracking</h3>
            <p className="text-gray-600">
              Upload geotagged photos to track pit digging, plantation progress, and survival rates.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Making a Difference
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">250+</div>
              <div className="text-gray-600">Active Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1,200</div>
              <div className="text-gray-600">Hectares Protected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">5,000+</div>
              <div className="text-gray-600">Saplings Planted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600">Transparency Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}