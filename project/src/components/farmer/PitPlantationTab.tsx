import React, { useState } from 'react';
import { Camera, MapPin, Plus, TreePine, Upload, CheckCircle, Clock } from 'lucide-react';
import { User } from '../../types/auth';
import { PitRecord } from '../../types/claims';
import { useToast } from '../ui/Toast';

interface PitPlantationTabProps {
  user: User;
}

export function PitPlantationTab({ user }: PitPlantationTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    pitCount: '',
    saplingCount: '',
    latitude: '',
    longitude: '',
    photos: [] as File[]
  });
  const { showToast } = useToast();

  // Mock pit records
  const [records] = useState<PitRecord[]>([
    {
      id: 'pit-1',
      farmerId: user.id,
      farmerName: user.name,
      village: user.village!,
      latitude: 17.2493,
      longitude: 81.1308,
      photos: ['pit_photo_1.jpg', 'pit_photo_2.jpg'],
      pitCount: 25,
      saplingCount: 23,
      year1SurvivalPhotos: ['year1_survival.jpg'],
      year1SurvivalRate: 92,
      incentiveCalculated: 460, // ₹20 per pit
      status: 'active',
      submittedAt: new Date('2024-01-20'),
      lastUpdated: new Date('2024-02-15')
    },
    {
      id: 'pit-2',
      farmerId: user.id,
      farmerName: user.name,
      village: user.village!,
      latitude: 17.2513,
      longitude: 81.1328,
      photos: ['new_pit_1.jpg', 'new_pit_2.jpg', 'new_pit_3.jpg'],
      pitCount: 15,
      saplingCount: 15,
      status: 'active',
      submittedAt: new Date('2024-02-01'),
      lastUpdated: new Date('2024-02-01')
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
          setFormData({
            ...formData,
            latitude: '17.2503',
            longitude: '81.1318'
          });
          showToast('Using demo location (GPS not available)', 'warning');
        }
      );
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData({ ...formData, photos: [...formData.photos, ...files] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Pit & plantation record submitted successfully', 'success');
    setShowForm(false);
    setFormData({ pitCount: '', saplingCount: '', latitude: '', longitude: '', photos: [] });
  };

  const calculateIncentive = (pitCount: number) => pitCount * 20; // ₹20 per pit

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Pits & Plantation Tracking</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Record
        </button>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">40</div>
          <div className="text-sm text-green-800">Total Pits</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">38</div>
          <div className="text-sm text-blue-800">Saplings Planted</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600">92%</div>
          <div className="text-sm text-purple-800">Survival Rate</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-600">₹460</div>
          <div className="text-sm text-yellow-800">Incentive Earned</div>
        </div>
      </div>

      {/* Pit Records */}
      <div className="grid gap-4 mb-6">
        {records.map(record => (
          <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {record.pitCount} Pits, {record.saplingCount} Saplings
                </h3>
                <p className="text-sm text-gray-500">
                  Lat: {record.latitude}, Long: {record.longitude}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-green-600">
                  ₹{calculateIncentive(record.pitCount)} incentive
                </div>
                {record.year1SurvivalRate && (
                  <div className="text-xs text-gray-500">
                    {record.year1SurvivalRate}% survival (Year 1)
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Camera className="h-4 w-4" />
                {record.photos.length} Photos
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {record.submittedAt.toLocaleDateString()}
              </div>
              {record.year1SurvivalRate && (
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Year 1 Complete
                </div>
              )}
            </div>

            {/* Progress Timeline */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Initial Plantation - Completed</span>
              </div>
              {record.year1SurvivalRate && (
                <div className="flex items-center gap-2 text-sm mt-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Year 1 Survival Check - {record.year1SurvivalRate}%</span>
                </div>
              )}
              {!record.year2SurvivalRate && (
                <div className="flex items-center gap-2 text-sm mt-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-500">Year 2 Survival Check - Pending</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Record Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add Pit & Plantation Record</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pits Dug
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.pitCount}
                    onChange={(e) => setFormData({ ...formData, pitCount: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Saplings Planted
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.saplingCount}
                    onChange={(e) => setFormData({ ...formData, saplingCount: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="23"
                  />
                </div>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="17.2503"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="81.1318"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleGetLocation}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-green-300 text-green-700 rounded-lg hover:bg-green-50"
              >
                <MapPin className="h-4 w-4" />
                Get Current Location
              </button>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Photos (720p or higher)
                </label>
                <input
                  type="file"
                  multiple
                  required
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload clear photos of pits and planted saplings
                </p>
              </div>

              {formData.photos.length > 0 && (
                <div className="space-y-2">
                  {formData.photos.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <Camera className="h-4 w-4" />
                      {file.name}
                    </div>
                  ))}
                </div>
              )}

              {formData.pitCount && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-800">
                    💰 Estimated incentive: ₹{calculateIncentive(parseInt(formData.pitCount) || 0)}
                    <span className="text-xs block text-green-600">@ ₹20 per verified pit</span>
                  </p>
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
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  Submit Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}