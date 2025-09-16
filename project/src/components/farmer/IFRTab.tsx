import React, { useState } from 'react';
import { MapPin, Upload, Plus, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { User } from '../../types/auth';
import { IFRClaim } from '../../types/claims';
import { useToast } from '../ui/Toast';

interface IFRTabProps {
  user: User;
}

export function IFRTab({ user }: IFRTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    hectares: '',
    latitude: '',
    longitude: '',
    documents: [] as File[]
  });
  const { showToast } = useToast();

  // Mock existing claims
  const [claims] = useState<IFRClaim[]>([
    {
      id: 'ifr-1',
      farmerId: user.id,
      farmerName: user.name,
      village: user.village!,
      hectares: 2.5,
      latitude: 17.2403,
      longitude: 81.1299,
      documents: ['patta_doc.pdf', 'survey_settlement.pdf'],
      status: 'approved',
      submittedAt: new Date('2024-01-15'),
      reviewedAt: new Date('2024-01-20'),
      reviewedBy: 'Forest Officer Sharma'
    },
    {
      id: 'ifr-2',
      farmerId: user.id,
      farmerName: user.name,
      village: user.village!,
      hectares: 1.8,
      latitude: 17.2423,
      longitude: 81.1319,
      documents: ['land_record.pdf'],
      status: 'pending',
      submittedAt: new Date('2024-02-10')
    }
  ]);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6)
          });
          showToast('Location captured successfully', 'success');
        },
        () => {
          // Demo coordinates for Khammam, Telangana
          setFormData({
            ...formData,
            latitude: '17.2473',
            longitude: '81.1288'
          });
          showToast('Using demo location (GPS not available)', 'warning');
        }
      );
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData({ ...formData, documents: [...formData.documents, ...files] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    showToast('IFR claim submitted successfully', 'success');
    setShowForm(false);
    setFormData({ hectares: '', latitude: '', longitude: '', documents: [] });
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
        <h2 className="text-xl font-bold text-gray-900">Individual Forest Rights (IFR)</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Claim
        </button>
      </div>

      {/* Existing Claims */}
      <div className="grid gap-4 mb-6">
        {claims.map(claim => (
          <div key={claim.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{claim.hectares} Hectares</h3>
                <p className="text-sm text-gray-500">
                  Lat: {claim.latitude}, Long: {claim.longitude}
                </p>
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
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Submitted {claim.submittedAt.toLocaleDateString()}
              </div>
            </div>

            {claim.status === 'approved' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-800">
                  ✅ Approved by {claim.reviewedBy} on {claim.reviewedAt?.toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Claim Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Submit New IFR Claim</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Land Area (Hectares)
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={formData.hectares}
                  onChange={(e) => setFormData({ ...formData, hectares: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Latitude
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="17.2473"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Longitude
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="81.1288"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleGetLocation}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-emerald-300 text-emerald-700 rounded-lg hover:bg-emerald-50"
              >
                <MapPin className="h-4 w-4" />
                Get Current Location
              </button>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Documents
                </label>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload land records, survey documents (PDF, JPG, PNG)
                </p>
              </div>

              {formData.documents.length > 0 && (
                <div className="space-y-2">
                  {formData.documents.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <Upload className="h-4 w-4" />
                      {file.name}
                    </div>
                  ))}
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
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
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