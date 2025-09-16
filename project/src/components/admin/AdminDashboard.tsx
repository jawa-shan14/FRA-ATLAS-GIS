import React, { useState } from 'react';
import { BarChart3, Download, Filter, Map, TreePine, Users, FileText, TrendingUp } from 'lucide-react';
import { User } from '../../types/auth';
import { useToast } from '../ui/Toast';

interface AdminDashboardProps {
  user: User;
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [dateRange, setDateRange] = useState('30days');
  const { showToast } = useToast();

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalFarmers: 247,
      totalIFRClaims: 89,
      totalCRClaims: 12,
      totalPits: 1250,
      totalSaplings: 1187,
      survivalRate: 94.9,
      incentivesPaid: 28640
    },
    recentActivity: [
      { id: 1, type: 'IFR Approved', farmer: 'Ramesh Kumar', village: 'Khammam', date: '2024-02-20' },
      { id: 2, type: 'Pit Record', farmer: 'Lakshmi Devi', village: 'Yellandu', date: '2024-02-19' },
      { id: 3, type: 'CR Submitted', farmer: 'Village Committee', village: 'Manuguru', date: '2024-02-18' },
      { id: 4, type: 'Survival Check', farmer: 'Govind Rao', village: 'Bhadrachalam', date: '2024-02-17' }
    ],
    villageData: [
      { village: 'Khammam', farmers: 45, claims: 23, pits: 280, survival: 96 },
      { village: 'Yellandu', farmers: 38, claims: 19, pits: 195, survival: 94 },
      { village: 'Manuguru', farmers: 42, claims: 21, pits: 315, survival: 93 },
      { village: 'Bhadrachalam', farmers: 33, claims: 15, pits: 185, survival: 95 },
      { village: 'Kothagudem', farmers: 29, claims: 11, pits: 275, survival: 97 }
    ]
  };

  const handleExportData = (format: 'csv' | 'pdf') => {
    showToast(`Exporting data as ${format.toUpperCase()}...`, 'info');
    // Simulate export
    setTimeout(() => {
      showToast(`${format.toUpperCase()} export completed successfully`, 'success');
    }, 2000);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'IFR Approved': return <FileText className="h-4 w-4 text-green-500" />;
      case 'Pit Record': return <TreePine className="h-4 w-4 text-blue-500" />;
      case 'CR Submitted': return <Users className="h-4 w-4 text-purple-500" />;
      case 'Survival Check': return <BarChart3 className="h-4 w-4 text-orange-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Comprehensive overview of forest rights management across {user.district}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">All Villages</option>
              <option value="khammam">Khammam</option>
              <option value="yellandu">Yellandu</option>
              <option value="manuguru">Manuguru</option>
            </select>
            
            <button
              onClick={() => handleExportData('csv')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalFarmers}</div>
              <div className="text-sm text-gray-600">Active Farmers</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-emerald-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalIFRClaims}</div>
              <div className="text-sm text-gray-600">IFR Claims</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <TreePine className="h-8 w-8 text-green-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalPits.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Pits Monitored</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-purple-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{analyticsData.overview.survivalRate}%</div>
              <div className="text-sm text-gray-600">Survival Rate</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Financial Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Incentives Paid</span>
              <span className="text-lg font-bold text-green-600">
                ₹{analyticsData.overview.incentivesPaid.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average per Farmer</span>
              <span className="font-semibold text-gray-900">
                ₹{Math.round(analyticsData.overview.incentivesPaid / analyticsData.overview.totalFarmers)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending Payments</span>
              <span className="font-semibold text-yellow-600">₹4,280</span>
            </div>
          </div>
        </div>

        {/* Program Performance */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Program Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">IFR Claims Progress</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Plantation Target</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Community Participation</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => handleExportData('pdf')}
              className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-3"
            >
              <Download className="h-5 w-5 text-gray-500" />
              <span className="font-medium">Export PDF Report</span>
            </button>
            <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-3">
              <Map className="h-5 w-5 text-gray-500" />
              <span className="font-medium">View District Map</span>
            </button>
            <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-3">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="font-medium">Advanced Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Village Performance Table */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Village Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left">
                  <th className="px-4 py-2 text-sm font-medium text-gray-900">Village</th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-900">Farmers</th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-900">Claims</th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-900">Pits</th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-900">Survival</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {analyticsData.villageData.map((village, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-900">{village.village}</td>
                    <td className="px-4 py-2 text-gray-600">{village.farmers}</td>
                    <td className="px-4 py-2 text-gray-600">{village.claims}</td>
                    <td className="px-4 py-2 text-gray-600">{village.pits}</td>
                    <td className="px-4 py-2">
                      <span className={`font-medium ${village.survival >= 95 ? 'text-green-600' : village.survival >= 90 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {village.survival}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {analyticsData.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                {getActivityIcon(activity.type)}
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{activity.type}</div>
                  <div className="text-sm text-gray-600">
                    {activity.farmer} • {activity.village}
                  </div>
                  <div className="text-xs text-gray-500">{activity.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blockchain Activity Log */}
      <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Blockchain Activity Ledger</h3>
        <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Block #1247</span>
              <span className="text-gray-500">2024-02-20 14:32:15</span>
            </div>
            <div className="text-gray-800">
              Hash: 0x4a7b9c2d8e1f3g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z
            </div>
            <div className="text-green-700">✓ IFR Claim Approved: Lakshmi Devi, Yellandu</div>
          </div>
          
          <hr className="my-3 border-gray-300" />
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Block #1246</span>
              <span className="text-gray-500">2024-02-19 11:18:42</span>
            </div>
            <div className="text-gray-800">
              Hash: 0x9b8a7c6d5e4f3g2h1i0j9k8l7m6n5o4p3q2r1s0t9u8v7w6x5y4z
            </div>
            <div className="text-blue-700">✓ Pit Record Submitted: Govind Rao, 15 pits</div>
          </div>
        </div>
      </div>
    </div>
  );
}