import React, { useState } from 'react';
import { FileText, Map, TreePine } from 'lucide-react';
import { User } from '../../types/auth';
import { IFRTab } from './IFRTab';
import { CRTab } from './CRTab';
import { PitPlantationTab } from './PitPlantationTab';
import { MapView } from './MapView';

interface FarmerDashboardProps {
  user: User;
}

type TabType = 'ifr' | 'cr' | 'pits' | 'map';

export function FarmerDashboard({ user }: FarmerDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('ifr');

  const tabs = [
    { id: 'ifr' as TabType, name: 'IFR Claims', icon: FileText, color: 'emerald' },
    { id: 'cr' as TabType, name: 'Community Rights', icon: FileText, color: 'blue' },
    { id: 'pits' as TabType, name: 'Pits & Plantation', icon: TreePine, color: 'green' },
    { id: 'map' as TabType, name: 'Map View', icon: Map, color: 'purple' }
  ];

  const getTabStyles = (tabId: TabType, color: string) => {
    const isActive = activeTab === tabId;
    const baseStyles = "flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200";
    
    if (isActive) {
      const activeStyles = {
        emerald: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
        blue: 'bg-blue-100 text-blue-700 border border-blue-200',
        green: 'bg-green-100 text-green-700 border border-green-200',
        purple: 'bg-purple-100 text-purple-700 border border-purple-200'
      };
      return `${baseStyles} ${activeStyles[color as keyof typeof activeStyles]}`;
    }
    
    return `${baseStyles} text-gray-600 hover:bg-gray-100`;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome, {user.name}
        </h1>
        <p className="text-gray-600">
          Manage your forest rights claims and track plantation progress from {user.village}, {user.district}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={getTabStyles(tab.id, tab.color)}
            >
              <tab.icon className="h-5 w-5" />
              <span className="hidden sm:inline">{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {activeTab === 'ifr' && <IFRTab user={user} />}
          {activeTab === 'cr' && <CRTab user={user} />}
          {activeTab === 'pits' && <PitPlantationTab user={user} />}
          {activeTab === 'map' && <MapView user={user} />}
        </div>
      </div>
    </div>
  );
}