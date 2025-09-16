import React, { useEffect, useRef } from 'react';
import { MapPin, TreePine, FileText } from 'lucide-react';
import { User } from '../../types/auth';

interface MapViewProps {
  user: User;
}

export function MapView({ user }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current && !mapInstanceRef.current) {
      // Simulate Leaflet map (since we don't have the actual library)
      initializeMap();
    }
  }, []);

  const initializeMap = () => {
    // This would be the actual Leaflet implementation
    // For now, we'll show a static representation
    console.log('Map initialized for', user.village);
  };

  // Mock data for demonstration
  const mapData = {
    ifrClaims: [
      { id: 'ifr-1', lat: 17.2403, lng: 81.1299, status: 'approved', hectares: 2.5 },
      { id: 'ifr-2', lat: 17.2423, lng: 81.1319, status: 'pending', hectares: 1.8 }
    ],
    pitRecords: [
      { id: 'pit-1', lat: 17.2493, lng: 81.1308, pitCount: 25, status: 'active' },
      { id: 'pit-2', lat: 17.2513, lng: 81.1328, pitCount: 15, status: 'active' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100 border-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'rejected': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Interactive Map View</h2>
        <div className="text-sm text-gray-500">
          {user.village}, {user.district}
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-gray-100 rounded-2xl overflow-hidden mb-6">
        <div
          ref={mapRef}
          className="h-96 bg-gradient-to-br from-green-100 to-green-200 relative flex items-center justify-center"
        >
          <div className="text-center text-gray-600">
            <MapPin className="h-12 w-12 mx-auto mb-3 text-gray-400" />
            <p className="text-lg font-medium">Interactive Map</p>
            <p className="text-sm">Leaflet.js integration would render here</p>
            <p className="text-xs mt-2">Showing {user.village} area with GPS markers</p>
          </div>

          {/* Simulated Map Markers */}
          <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2">
            <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
          </div>
          <div className="absolute top-1/3 right-1/3 transform translate-x-1/2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-lg"></div>
          </div>
          <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2">
            <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
          </div>
        </div>
      </div>

      {/* Map Legend */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* IFR Claims */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-600" />
            IFR Claims
          </h3>
          <div className="space-y-3">
            {mapData.ifrClaims.map(claim => (
              <div key={claim.id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${claim.status === 'approved' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                  <div>
                    <div className="font-medium text-gray-900">{claim.hectares} hectares</div>
                    <div className="text-xs text-gray-500">
                      {claim.lat.toFixed(4)}, {claim.lng.toFixed(4)}
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(claim.status)}`}>
                  {claim.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pit Records */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <TreePine className="h-5 w-5 text-green-600" />
            Plantation Sites
          </h3>
          <div className="space-y-3">
            {mapData.pitRecords.map(record => (
              <div key={record.id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <div>
                    <div className="font-medium text-gray-900">{record.pitCount} pits</div>
                    <div className="text-xs text-gray-500">
                      {record.lat.toFixed(4)}, {record.lng.toFixed(4)}
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(record.status)}`}>
                  {record.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Controls Info */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Map Features</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 🟢 Green markers - Approved IFR claims</li>
          <li>• 🟡 Yellow markers - Pending IFR claims</li>
          <li>• 🔵 Blue markers - Active plantation sites</li>
          <li>• Click on markers for detailed information</li>
          <li>• Use zoom controls to explore different areas</li>
        </ul>
      </div>
    </div>
  );
}