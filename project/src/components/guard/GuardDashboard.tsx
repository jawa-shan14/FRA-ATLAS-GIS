import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, FileText, TreePine, Users, BarChart3 } from 'lucide-react';
import { User } from '../../types/auth';
import { IFRClaim, CRClaim, PitRecord } from '../../types/claims';
import { useToast } from '../ui/Toast';

interface GuardDashboardProps {
  user: User;
}

export function GuardDashboard({ user }: GuardDashboardProps) {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected' | 'analytics'>('pending');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<IFRClaim | null>(null);
  const [reviewDecision, setReviewDecision] = useState<'approve' | 'reject'>('approve');
  const [rejectionReason, setRejectionReason] = useState('');
  const { showToast } = useToast();

  // Mock data
  const [pendingClaims] = useState<IFRClaim[]>([
    {
      id: 'ifr-pending-1',
      farmerId: 'farmer-2',
      farmerName: 'Lakshmi Devi',
      village: 'Yellandu',
      hectares: 3.2,
      latitude: 17.2593,
      longitude: 81.1408,
      documents: ['land_record.pdf', 'survey_doc.pdf'],
      status: 'pending',
      submittedAt: new Date('2024-02-20')
    },
    {
      id: 'ifr-pending-2',
      farmerId: 'farmer-3',
      farmerName: 'Govind Rao',
      village: 'Manuguru',
      hectares: 2.1,
      latitude: 17.2613,
      longitude: 81.1428,
      documents: ['patta_copy.pdf'],
      status: 'pending',
      submittedAt: new Date('2024-02-18')
    }
  ]);

  const [approvedClaims] = useState<IFRClaim[]>([
    {
      id: 'ifr-approved-1',
      farmerId: 'farmer-1',
      farmerName: 'Ramesh Kumar',
      village: 'Khammam',
      hectares: 2.5,
      latitude: 17.2403,
      longitude: 81.1299,
      documents: ['patta_doc.pdf', 'survey_settlement.pdf'],
      status: 'approved',
      submittedAt: new Date('2024-01-15'),
      reviewedAt: new Date('2024-01-20'),
      reviewedBy: user.name
    }
  ]);

  const [pitRecords] = useState<PitRecord[]>([
    {
      id: 'pit-review-1',
      farmerId: 'farmer-1',
      farmerName: 'Ramesh Kumar',
      village: 'Khammam',
      latitude: 17.2493,
      longitude: 81.1308,
      photos: ['year1_photo1.jpg', 'year1_photo2.jpg'],
      pitCount: 25,
      saplingCount: 23,
      year1SurvivalPhotos: ['survival_check.jpg'],
      status: 'active',
      submittedAt: new Date('2024-01-20'),
      lastUpdated: new Date('2024-02-15')
    }
  ]);

  const handleReviewClaim = (claim: IFRClaim) => {
    setSelectedClaim(claim);
    setShowReviewModal(true);
  };

  const handleSubmitReview = () => {
    if (reviewDecision === 'reject' && !rejectionReason.trim()) {
      showToast('Rejection reason is required', 'error');
      return;
    }

    showToast(
      `Claim ${reviewDecision === 'approve' ? 'approved' : 'rejected'} successfully`,
      reviewDecision === 'approve' ? 'success' : 'warning'
    );
    
    setShowReviewModal(false);
    setSelectedClaim(null);
    setReviewDecision('approve');
    setRejectionReason('');
  };

  const updateSurvivalStatus = (recordId: string, survivalRate: number) => {
    showToast(`Survival status updated: ${survivalRate}%`, 'success');
  };

  const calculateIncentive = (pitCount: number, survivalRate: number) => {
    return Math.round(pitCount * survivalRate * 0.2); // ₹20 per surviving plant
  };

  const getTabColor = (tab: string) => {
    switch (tab) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      case 'analytics': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Forest Guard Dashboard</h1>
        <p className="text-gray-600">Review claims, monitor plantation progress, and manage forest rights</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-yellow-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{pendingClaims.length}</div>
              <div className="text-sm text-gray-600">Pending Reviews</div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{approvedClaims.length}</div>
              <div className="text-sm text-gray-600">Approved Claims</div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <TreePine className="h-8 w-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">40</div>
              <div className="text-sm text-gray-600">Active Pits</div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">Active Farmers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'pending', label: 'Pending Reviews', icon: Clock },
            { id: 'approved', label: 'Approved Claims', icon: CheckCircle },
            { id: 'rejected', label: 'Rejected Claims', icon: XCircle },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 border ${
                activeTab === tab.id ? getTabColor(tab.id) : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {/* Pending Reviews */}
          {activeTab === 'pending' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Claims Awaiting Review</h3>
              {pendingClaims.map(claim => (
                <div key={claim.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{claim.farmerName}</h4>
                      <p className="text-sm text-gray-600">{claim.village} • {claim.hectares} hectares</p>
                      <p className="text-xs text-gray-500">
                        Submitted {claim.submittedAt.toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleReviewClaim(claim)}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Review
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {claim.documents.length} documents
                    </div>
                    <div className="text-xs">
                      GPS: {claim.latitude}, {claim.longitude}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Approved Claims */}
          {activeTab === 'approved' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Approved Claims</h3>
              {approvedClaims.map(claim => (
                <div key={claim.id} className="border border-green-200 bg-green-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{claim.farmerName}</h4>
                      <p className="text-sm text-gray-600">{claim.village} • {claim.hectares} hectares</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-green-700 font-medium">Approved</span>
                    </div>
                  </div>
                  <p className="text-sm text-green-700">
                    Approved on {claim.reviewedAt?.toLocaleDateString()} by {claim.reviewedBy}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Analytics */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Performance Analytics</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Claims Summary */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">Claims Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Submitted</span>
                      <span className="font-semibold">{pendingClaims.length + approvedClaims.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Approved</span>
                      <span className="font-semibold text-green-600">{approvedClaims.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pending</span>
                      <span className="font-semibold text-yellow-600">{pendingClaims.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Approval Rate</span>
                      <span className="font-semibold text-blue-600">
                        {Math.round((approvedClaims.length / (pendingClaims.length + approvedClaims.length)) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Plantation Progress */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">Plantation Progress</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Pits Monitored</span>
                      <span className="font-semibold">40</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Saplings Planted</span>
                      <span className="font-semibold text-green-600">38</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Year 1 Survival Rate</span>
                      <span className="font-semibold text-blue-600">92%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Incentives Calculated</span>
                      <span className="font-semibold text-purple-600">₹1,240</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedClaim && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Review Claim</h3>
            
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900">{selectedClaim.farmerName}</h4>
              <p className="text-sm text-gray-600">
                {selectedClaim.village} • {selectedClaim.hectares} hectares
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Documents: {selectedClaim.documents.join(', ')}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Decision
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setReviewDecision('approve')}
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      reviewDecision === 'approve' 
                        ? 'bg-green-100 border-green-300 text-green-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => setReviewDecision('reject')}
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      reviewDecision === 'reject' 
                        ? 'bg-red-100 border-red-300 text-red-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    ❌ Reject
                  </button>
                </div>
              </div>

              {reviewDecision === 'reject' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rejection Reason *
                  </label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    rows={3}
                    placeholder="Please provide a clear reason for rejection..."
                    required
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowReviewModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}