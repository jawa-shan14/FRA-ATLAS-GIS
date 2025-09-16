import React, { useState } from 'react';
import { Upload, Plus, FileText, Clock, CheckCircle, XCircle, Map } from 'lucide-react';
import { User } from '../../types/auth';
import { CRClaim } from '../../types/claims';
import { useToast } from '../ui/Toast';

interface CRTabProps {
  user: User;
}

export function CRTab({ user }: CRTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    documents: [] as File[],
    shapefile: null as File | null
  });
  const { showToast } = useToast();

  // Mock existing CR claims
  const [claims] = useState<CRClaim[]>([
    {
      id: 'cr-1',
      farmerId: user.id,
      farmerName: user.name,
      village: user.village!,
      documents: ['community_resolution.pdf', 'gram_sabha_minutes.pdf'],
      shapefile: 'village_boundary.shp',
      status: 'pending',
      submittedAt: new Date('2024-02-05')
    }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'documents' | 'shapefile') => {
    const files = Array.from(e.target.files || []);
    if (type === 'documents') {
      setFormData({ ...formData, documents: [...formData.documents, ...files] });
    } else {
      setFormData({ ...formData, shapefile: files[0] || null });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Community Rights claim submitted successfully', 'success');
    setShowForm(false);
    setFormData({ documents: [], shapefile: null });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Community Forest Rights (CFR)</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Claim
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">About Community Forest Rights</h3>
        <p className="text-sm text-blue-800">
          Community Forest Rights (CFR) are collective rights over forest resources that allow 
          villages to protect, manage, and use forest areas sustainably for their livelihood needs.
        </p>
      </div>

      {/* Existing Claims */}
      <div className="grid gap-4 mb-6">
        {claims.map(claim => (
          <div key={claim.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{claim.village} Community Rights</h3>
                <p className="text-sm text-gray-500">Village-wide forest management rights</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(claim.status)}
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(claim.status)}`}>
                  {claim.status}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                {claim.documents.length} Documents
              </div>
              {claim.shapefile && (
                <div className="flex items-center gap-1">
                  <Map className="h-4 w-4" />
                  Shapefile included
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Submitted {claim.submittedAt.toLocaleDateString()}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-700">
                📋 Documents: {claim.documents.join(', ')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* New Claim Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Submit Community Rights Claim</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-800">
                  This claim will be submitted for the entire {user.village} village community.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Community Documents
                </label>
                <input
                  type="file"
                  multiple
                  required
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, 'documents')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Required: Gram Sabha resolution, community consent documents
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Village Shapefile (Optional)
                </label>
                <input
                  type="file"
                  accept=".shp,.zip"
                  onChange={(e) => handleFileUpload(e, 'shapefile')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload village boundary shapefile for better mapping
                </p>
              </div>

              {formData.documents.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Uploaded Documents:</p>
                  {formData.documents.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <FileText className="h-4 w-4" />
                      {file.name}
                    </div>
                  ))}
                </div>
              )}

              {formData.shapefile && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Map className="h-4 w-4" />
                  {formData.shapefile.name}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Submit Claim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}