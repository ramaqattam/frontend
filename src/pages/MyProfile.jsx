import React, { useState, useEffect } from 'react';
import { colorTheme } from '../components/ColorTheme';

const MyProfile = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('/api/placeholder/150/150');
  
  // Sample user data
  const [userData, setUserData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1985-04-12',
    gender: 'Female',
    bloodType: 'B+',
    allergies: ['Penicillin', 'Peanuts'],
    medications: ['Lisinopril', 'Vitamin D'],
    height: '5\'7"',
    weight: '145 lbs',
    emergencyContact: {
      name: 'Michael Johnson',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543'
    },
    insurance: {
      provider: 'BlueCross BlueShield',
      policyNumber: 'BC1234567',
      groupNumber: 'GRP789012',
      expiryDate: '2025-12-31'
    },
    address: {
      street: '123 Main Street',
      city: 'Boston',
      state: 'MA',
      zipCode: '02108',
      country: 'USA'
    }
  });
  
  // Medical history data
  const medicalHistory = [
    {
      condition: 'Hypertension',
      diagnosedDate: '2018-06-15',
      status: 'Ongoing',
      notes: 'Controlled with medication'
    },
    {
      condition: 'Appendectomy',
      diagnosedDate: '2012-03-22',
      status: 'Resolved',
      notes: 'Surgical procedure with no complications'
    }
  ];
  
  // Recent activity data
  const recentActivity = [
    {
      type: 'appointment',
      doctor: 'Dr. Emily Chen',
      specialty: 'Cardiologist',
      date: '2023-11-15',
      status: 'Completed'
    },
    {
      type: 'prescription',
      medication: 'Lisinopril 10mg',
      doctor: 'Dr. Emily Chen',
      date: '2023-11-15',
      refills: 3
    },
    {
      type: 'test',
      name: 'Complete Blood Count',
      date: '2023-10-30',
      result: 'Normal',
      doctor: 'Dr. Michael Wong'
    },
    {
      type: 'appointment',
      doctor: 'Dr. James Wilson',
      specialty: 'General Practitioner',
      date: '2023-09-20',
      status: 'Completed'
    }
  ];
  


  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested objects
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setUserData({
        ...userData,
        [parent]: {
          ...userData[parent],
          [child]: value
        }
      });
    } else {
      setUserData({
        ...userData,
        [name]: value
      });
    }
  };
  
  const handleSaveProfile = () => {
    // In a real app, you would save to backend here
    setEditing(false);
    // Show success message
    alert('Profile updated successfully!');
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r ${colorTheme.primary.light} opacity-5 blur-3xl animate-pulse`} style={{animationDuration: '15s'}}></div>
        <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r ${colorTheme.secondary.light} opacity-5 blur-3xl animate-pulse`} style={{animationDuration: '20s', animationDelay: '2s'}}></div>
      </div>
      
      <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
              <div className={`p-6 bg-gradient-to-r ${colorTheme.primary.gradient} text-white`}>
                <div className="text-center">
                  <div className="relative inline-block mb-4 group">
                    <div className="w-24 h-24 rounded-full bg-white p-1 mx-auto overflow-hidden">
                      <img 
                        src={profileImage} 
                        alt={userData.name} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    {editing && (
                      <label htmlFor="profile-image" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                        <span className="text-white text-sm">Change</span>
                        <input 
                          type="file" 
                          id="profile-image" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </div>
                  <h2 className="text-xl font-bold">{userData.name}</h2>
                  <p className="text-white text-opacity-80 text-sm">{userData.email}</p>
                </div>
              </div>
              
              <div className="p-4">
                <nav className="space-y-1">
                  {[
                    { id: 'profile', name: 'Profile', icon: 'user' },
                    { id: 'medical', name: 'Medical History', icon: 'medical' },
                    { id: 'activity', name: 'Recent Activity', icon: 'activity' },
                    { id: 'documents', name: 'Documents', icon: 'document' },
                    { id: 'settings', name: 'Settings', icon: 'settings' }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                        activeTab === item.id 
                          ? `bg-gradient-to-r ${colorTheme.primary.gradient} text-white`
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {item.icon === 'user' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
                        {item.icon === 'medical' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m-6-8h6M5 8h.01M5 12h.01M5 16h.01M19 8h.01M19 12h.01M19 16h.01" />}
                        {item.icon === 'activity' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />}
                        {item.icon === 'chart' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />}
                        {item.icon === 'document' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />}
                        {item.icon === 'settings' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />}
                      </svg>
                      {item.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className={`p-4 bg-gradient-to-r ${colorTheme.secondary.gradient} text-white`}>
                <h3 className="font-medium">Quick Actions</h3>
              </div>
              <div className="p-4 space-y-2">
                <button className="w-full py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-all duration-300 text-left">
                  Book New Appointment
                </button>
                <button className="w-full py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-all duration-300 text-left">
                  Request Prescription Refill
                </button>
                <button className="w-full py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-all duration-300 text-left">
                  Message Your Doctor
                </button>
                <button className="w-full py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-all duration-300 text-left">
                  View Lab Results
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h1 className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${activeTab === 'profile' ? colorTheme.primary.gradient : activeTab === 'medical' ? colorTheme.secondary.gradient : colorTheme.primary.gradient}`}>
                  {activeTab === 'profile' && 'Personal Information'}
                  {activeTab === 'medical' && 'Medical History'}
                  {activeTab === 'activity' && 'Recent Activity'}
                  {activeTab === 'documents' && 'My Documents'}
                  {activeTab === 'settings' && 'Account Settings'}
                </h1>
                
                {activeTab === 'profile' && (
                  <button
                    onClick={() => editing ? handleSaveProfile() : setEditing(true)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      editing 
                        ? `bg-gradient-to-r ${colorTheme.primary.gradient} text-white` 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } transition-all duration-300`}
                  >
                    {editing ? 'Save Changes' : 'Edit Profile'}
                  </button>
                )}
              </div>
              
              <div className="p-6">
                {/* Profile Tab Content */}
                {activeTab === 'profile' && (
                  <div className="space-y-8">
                    {/* Personal Details Section */}
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Details</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          {editing ? (
                            <input
                              type="text"
                              name="name"
                              value={userData.name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          ) : (
                            <p className="text-gray-800">{userData.name}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          {editing ? (
                            <input
                              type="email"
                              name="email"
                              value={userData.email}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          ) : (
                            <p className="text-gray-800">{userData.email}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          {editing ? (
                            <input
                              type="tel"
                              name="phone"
                              value={userData.phone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          ) : (
                            <p className="text-gray-800">{userData.phone}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                          {editing ? (
                            <input
                              type="date"
                              name="dateOfBirth"
                              value={userData.dateOfBirth}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          ) : (
                            <p className="text-gray-800">{new Date(userData.dateOfBirth).toLocaleDateString()}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                          {editing ? (
                            <select
                              name="gender"
                              value={userData.gender}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                              <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                          ) : (
                            <p className="text-gray-800">{userData.gender}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
                          {editing ? (
                            <select
                              name="bloodType"
                              value={userData.bloodType}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            >
                              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          ) : (
                            <p className="text-gray-800">{userData.bloodType}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Medical Information Section */}
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-4">Medical Information</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
                          {editing ? (
                            <input
                              type="text"
                              placeholder="Separate by commas"
                              value={userData.allergies.join(', ')}
                              onChange={(e) => setUserData({...userData, allergies: e.target.value.split(', ')})}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          ) : (
                            <p className="text-gray-800">{userData.allergies.join(', ') || 'None'}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Current Medications</label>
                          {editing ? (
                            <input
                              type="text"
                              placeholder="Separate by commas"
                              value={userData.medications.join(', ')}
                              onChange={(e) => setUserData({...userData, medications: e.target.value.split(', ')})}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          ) : (
                            <p className="text-gray-800">{userData.medications.join(', ') || 'None'}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                          {editing ? (
                            <input
                              type="text"
                              name="height"
                              value={userData.height}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          ) : (
                            <p className="text-gray-800">{userData.height}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                          {editing ? (
                            <input
                              type="text"
                              name="weight"
                              value={userData.weight}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          ) : (
                            <p className="text-gray-800">{userData.weight}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Emergency Contact Section */}
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                          {editing ? (
                            <input
                              type="text"
                              name="emergencyContact.name"
                              value={userData.emergencyContact.name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          ) : (
                            <p className="text-gray-800">{userData.emergencyContact.name}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                          {editing ? (
                            <input
                              type="text"
                              name="emergencyContact.relationship"
                              value={userData.emergencyContact.relationship}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          ) : (
                            <p className="text-gray-800">{userData.emergencyContact.relationship}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          {editing ? (
                            <input
                              type="tel"
                              name="emergencyContact.phone"
                              value={userData.emergencyContact.phone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          ) : (
                            <p className="text-gray-800">{userData.emergencyContact.phone}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Insurance Information Section */}
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-4">Insurance Information</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                          {editing ? (
                            <input
                              type="text"
                              name="insurance.provider"
                              value={userData.insurance.provider}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          ) : (
                            <p className="text-gray-800">{userData.insurance.provider}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Policy Number</label>
                          {editing ? (
                            <input
                              type="text"
                              name="insurance.policyNumber"
                              value={userData.insurance.policyNumber}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          ) : (
                            <p className="text-gray-800">{userData.insurance.policyNumber}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Group Number</label>
                          {editing ? (
                            <input
                              type="text"
                              name="insurance.groupNumber"
                              value={userData.insurance.groupNumber}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          ) : (
                            <p className="text-gray-800">{userData.insurance.groupNumber}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                          {editing ? (
                            <input
                              type="date"
                              name="insurance.expiryDate"
                              value={userData.insurance.expiryDate}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          ) : (
                            <p className="text-gray-800">{new Date(userData.insurance.expiryDate).toLocaleDateString()}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Address Section */}
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-4">Address</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                          {editing ? (
                            <input
                              type="text"
                              name="address.street"
                              value={userData.address.street}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          ) : (
                            <p className="text-gray-800">{userData.address.street}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                          {editing ? (
                            <input
                            type="text"
                            name="address.city"
                            value={userData.address.city}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        ) : (
                          <p className="text-gray-800">{userData.address.city}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                        {editing ? (
                          <input
                            type="text"
                            name="address.state"
                            value={userData.address.state}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        ) : (
                          <p className="text-gray-800">{userData.address.state}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                        {editing ? (
                          <input
                            type="text"
                            name="address.zipCode"
                            value={userData.address.zipCode}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        ) : (
                          <p className="text-gray-800">{userData.address.zipCode}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        {editing ? (
                          <input
                            type="text"
                            name="address.country"
                            value={userData.address.country}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        ) : (
                          <p className="text-gray-800">{userData.address.country}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Medical History Tab Content */}
              {activeTab === 'medical' && (
                <div>
                  <div className="mb-6 flex justify-between items-center">
                    <p className="text-gray-600">Your medical history as recorded in our system.</p>
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r ${colorTheme.secondary.gradient} text-white hover:shadow-md transition-all duration-300`}>
                      Download History
                    </button>
                  </div>
                  
                  {medicalHistory.map((item, index) => (
                    <div 
                      key={index} 
                      className={`mb-4 p-6 bg-white border rounded-xl shadow-sm transition-all duration-300 hover:shadow-md ${
                        item.status === 'Ongoing' 
                          ? 'border-amber-200' 
                          : 'border-emerald-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900 text-lg">{item.condition}</h3>
                          <p className="text-sm text-gray-500">Diagnosed: {new Date(item.diagnosedDate).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          item.status === 'Ongoing' 
                            ? 'bg-amber-100 text-amber-700' 
                            : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-3 text-gray-600">{item.notes}</p>
                    </div>
                  ))}
                  
                  <button className="mt-4 text-sm text-emerald-600 font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Report New Condition
                  </button>
                </div>
              )}
              
              {/* Recent Activity Tab Content */}
              {activeTab === 'activity' && (
                <div>
                  <div className="mb-6 flex justify-between items-center">
                    <p className="text-gray-600">Your recent medical activities and interactions.</p>
                    <div className="flex items-center gap-2">
                      <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                        <option value="3months">Last 3 Months</option>
                        <option value="6months">Last 6 Months</option>
                        <option value="1year">Last Year</option>
                        <option value="all">All Time</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="relative pl-8 before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-3 before:w-0.5 before:bg-gray-200">
                    {recentActivity.map((activity, index) => (
                      <div 
                        key={index} 
                        className="relative mb-6 pl-6 pb-6"
                      >
                        <div className="absolute -left-8 mt-1.5">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            activity.type === 'appointment' 
                              ? 'bg-emerald-100 text-emerald-500' 
                              : activity.type === 'prescription' 
                                ? 'bg-amber-100 text-amber-500' 
                                : 'bg-indigo-100 text-indigo-500'
                          }`}>
                            {activity.type === 'appointment' && (
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            )}
                            {activity.type === 'prescription' && (
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            )}
                            {activity.type === 'test' && (
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                              </svg>
                            )}
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {activity.type === 'appointment' && `Appointment with ${activity.doctor}`}
                                {activity.type === 'prescription' && `Prescription for ${activity.medication}`}
                                {activity.type === 'test' && `${activity.name} Test`}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {new Date(activity.date).toLocaleDateString()}
                              </p>
                            </div>
                            {activity.type === 'appointment' && (
                              <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
                                {activity.status}
                              </span>
                            )}
                            {activity.type === 'test' && (
                              <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                                {activity.result}
                              </span>
                            )}
                          </div>
                          
                          <div className="mt-2">
                            {activity.type === 'appointment' && (
                              <p className="text-sm text-gray-600">
                                {activity.specialty}
                              </p>
                            )}
                            {activity.type === 'prescription' && (
                              <p className="text-sm text-gray-600">
                                Prescribed by {activity.doctor} • Refills: {activity.refills}
                              </p>
                            )}
                            {activity.type === 'test' && (
                              <p className="text-sm text-gray-600">
                                Ordered by {activity.doctor}
                              </p>
                            )}
                          </div>
                          
                          <div className="mt-3 flex gap-2">
                            <button className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-all duration-300">
                              View Details
                            </button>
                            {activity.type === 'test' && (
                              <button className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-all duration-300">
                                Download Results
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="mt-2 text-sm text-emerald-600 font-medium flex items-center mx-auto">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    Load More
                  </button>
                </div>
              )}

              
              {/* Documents Tab Content */}
              {activeTab === 'documents' && (
                <div>
                  <div className="mb-6 flex justify-between items-center">
                    <p className="text-gray-600">Access and manage your medical documents and records.</p>
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r ${colorTheme.primary.gradient} text-white hover:shadow-md transition-all duration-300`}>
                      Upload Document
                    </button>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-medium text-gray-900">Medical Records</h3>
                      <button className="text-sm text-emerald-600 hover:text-emerald-700">View All</button>
                    </div>
                    <div className="p-6 space-y-3">
                      {[
                        { name: 'Annual Physical Exam Results', date: '2023-10-15', type: 'PDF' },
                        { name: 'Blood Test Results', date: '2023-09-02', type: 'PDF' },
                        { name: 'Vaccination Record', date: '2023-05-20', type: 'PDF' }
                      ].map((doc, index) => (
                        <div key={index} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center mr-3">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{doc.name}</p>
                              <p className="text-xs text-gray-500">{new Date(doc.date).toLocaleDateString()} • {doc.type}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors duration-300">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors duration-300">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-medium text-gray-900">Prescriptions</h3>
                      <button className="text-sm text-emerald-600 hover:text-emerald-700">View All</button>
                    </div>
                    <div className="p-6 space-y-3">
                      {[
                        { name: 'Lisinopril 10mg', doctor: 'Dr. Emily Chen', date: '2023-11-15', refills: 3 },
                        { name: 'Vitamin D Supplement', doctor: 'Dr. James Wilson', date: '2023-09-20', refills: 5 }
                      ].map((prescription, index) => (
                        <div key={index} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{prescription.name}</p>
                              <p className="text-xs text-gray-500">
                                Prescribed by {prescription.doctor} • {new Date(prescription.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="mr-3 text-right">
                              <p className="text-xs text-gray-500">Refills</p>
                              <p className="font-medium text-gray-800">{prescription.refills}</p>
                            </div>
                            <button className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-400 text-white rounded-lg text-xs hover:shadow-md transition-all duration-300">
                              Request Refill
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Settings Tab Content */}
              {activeTab === 'settings' && (
                <div>
                  <div className="mb-6">
                    <p className="text-gray-600">Manage your account settings and preferences.</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Account Security</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                          <div>
                            <p className="font-medium text-gray-800">Password</p>
                            <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                          </div>
                          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-all duration-300">
                            Change Password
                          </button>
                        </div>
                        
                 
                
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                          <div>
                            <p className="font-medium text-gray-800">Email Notifications</p>
                            <p className="text-sm text-gray-500">Receive appointment reminders and updates</p>
                          </div>
                          <div className="relative inline-block w-12 h-6 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox" name="toggle-email" id="toggle-email" checked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-emerald-500 appearance-none cursor-pointer transition-all duration-300"/>
                            <label htmlFor="toggle-email" className="toggle-label block overflow-hidden h-6 rounded-full bg-emerald-500 cursor-pointer transition-all duration-300"></label>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                          <div>
                            <p className="font-medium text-gray-800">SMS Notifications</p>
                            <p className="text-sm text-gray-500">Receive text messages for important updates</p>
                          </div>
                          <div className="relative inline-block w-12 h-6 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox" name="toggle-sms" id="toggle-sms" checked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-emerald-500 appearance-none cursor-pointer transition-all duration-300"/>
                            <label htmlFor="toggle-sms" className="toggle-label block overflow-hidden h-6 rounded-full bg-emerald-500 cursor-pointer transition-all duration-300"></label>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <div>
                              <p className="font-medium text-gray-800">Profile Visibility</p>
                              <p className="text-sm text-gray-500">Control who can see your profile information</p>
                            </div>
                            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-all duration-300">
                              Manage Privacy
                            </button>
                          </div>
                          
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <div>
                              <p className="font-medium text-gray-800">Data Sharing</p>
                              <p className="text-sm text-gray-500">Control how your data is shared with doctors</p>
                            </div>
                            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-all duration-300">
                              Data Settings
                            </button>
                          </div>
                          
                          <div className="flex justify-between items-center py-3">
                            <div>
                              <p className="font-medium text-gray-800">Export Your Data</p>
                              <p className="text-sm text-gray-500">Download a copy of your personal data</p>
                            </div>
                            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-all duration-300">
                              Export Data
                            </button>
                          </div>
                        </div>
                      </div>
    
                      
                      <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                        <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
                        <p className="text-sm text-red-500 mb-4">Permanent actions that cannot be undone</p>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-800">Delete Account</p>
                            <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                          </div>
                          <button className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm transition-all duration-300">
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for toggle switches */}
      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #10B981;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #10B981;
        }
        .toggle-checkbox {
          right: 0;
          z-index: 10;
          transition: all 0.3s;
        }
        .toggle-label {
          transition: all 0.3s;
        }
      `}</style>
    </div>
  );
};

export default MyProfile;