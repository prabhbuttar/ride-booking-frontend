import React, { useState } from 'react';
import { MapPin, Clock, CreditCard, User, History, LogOut, Navigation, Calendar, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Ride {
  id: string;
  from: string;
  to: string;
  date: string;
  status: 'completed' | 'cancelled' | 'ongoing' | 'pending';
  fare: number;
  distance?: string;
  duration?: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('request');
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  
  const [rides] = useState<Ride[]>([
    {
      id: '1',
      from: '123 Main St, Downtown',
      to: '456 Market St, Financial District',
      date: '2024-03-15 14:30',
      status: 'completed',
      fare: 25.50,
      distance: '3.2 miles',
      duration: '15 mins'
    },
    {
      id: '2',
      from: '789 Park Ave, Uptown',
      to: '321 Lake Rd, Westside',
      date: '2024-03-14 09:15',
      status: 'cancelled',
      fare: 0,
      distance: '4.5 miles',
      duration: '20 mins'
    }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Navigation */}
      <nav className="glass-effect sticky top-0 z-50 mb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                RideShare
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 bg-white/50 px-4 py-2 rounded-xl hover:bg-white/80 transition-all duration-200">
                <User className="h-5 w-5 text-gray-700" />
                <span className="text-gray-700 font-medium">{user?.email}</span>
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-xl hover:bg-white/80 transition-all duration-200"
              >
                <LogOut className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="col-span-1">
            <div className="card p-4">
              <button
                className={`nav-item ${activeTab === 'request' ? 'nav-item-active' : 'nav-item-inactive'}`}
                onClick={() => setActiveTab('request')}
              >
                <Navigation className="h-5 w-5 mr-3" />
                Request Ride
              </button>
              <button
                className={`nav-item ${activeTab === 'history' ? 'nav-item-active' : 'nav-item-inactive'}`}
                onClick={() => setActiveTab('history')}
              >
                <History className="h-5 w-5 mr-3" />
                Ride History
              </button>
              <button
                className={`nav-item ${activeTab === 'payments' ? 'nav-item-active' : 'nav-item-inactive'}`}
                onClick={() => setActiveTab('payments')}
              >
                <CreditCard className="h-5 w-5 mr-3" />
                Payments
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-3">
            <div className="card p-8">
              {activeTab === 'request' && (
                <div>
                  <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                    Request a Ride
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                      <input
                        type="text"
                        className="input-style"
                        placeholder="Enter your pickup location"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                      <input
                        type="text"
                        className="input-style"
                        placeholder="Enter your destination"
                      />
                    </div>
                    <button className="btn-primary w-full mt-4">
                      Request Ride Now
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div>
                  <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                    Ride History
                  </h2>
                  <div className="space-y-6">
                    {rides.map((ride) => (
                      <div key={ride.id} className="bg-white/50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200">
                        <div className="flex justify-between items-start">
                          <div className="space-y-4">
                            <div>
                              <div className="flex items-center space-x-2 text-gray-500 mb-2">
                                <Calendar className="h-4 w-4" />
                                <span>{ride.date}</span>
                              </div>
                              <div className="space-y-2">
                                <p className="font-medium flex items-center">
                                  <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                                  From: {ride.from}
                                </p>
                                <p className="font-medium flex items-center">
                                  <Navigation className="h-4 w-4 text-indigo-600 mr-2" />
                                  To: {ride.to}
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {ride.duration}
                              </span>
                              <span>{ride.distance}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                              ride.status === 'completed' ? 'bg-green-100 text-green-800' :
                              ride.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                            </span>
                            <p className="mt-4 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                              ${ride.fare.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'payments' && (
                <div>
                  <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                    Payment Methods
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-white/50 rounded-xl p-6 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-lg">
                          <CreditCard className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-lg">•••• •••• •••• 4242</p>
                          <p className="text-gray-500 flex items-center mt-1">
                            <Shield className="h-4 w-4 mr-1" />
                            Expires 12/25
                          </p>
                        </div>
                      </div>
                      <button className="px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-all duration-200">
                        Edit
                      </button>
                    </div>
                    <button className="btn-primary w-full flex items-center justify-center space-x-2">
                      <CreditCard className="h-5 w-5" />
                      <span>Add New Payment Method</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}